import dayjs from "dayjs"
import { orderBy } from "lodash"
import { EXCHANGE_RATE_USD_VND } from "~/data/static"

import { TCartItem, TCoupon, TDiscountMethod, TProductFilters, TLanguage, TLicense, TProduct, TUser } from "~/types/default"

export function hasDiscount(product?: TProduct): boolean {
	if (product === undefined) return false

	return product.discount
		? dayjs(product.discount.validTo).valueOf() > dayjs().valueOf()
		: false
}

export function getAppliedCouponPrice({ price, type, discount }: {
	price: number
	type: TDiscountMethod
	discount: number
}): number {

	let res = 0

	if (type === "percentage") {
		res = (price * (100 - discount) / 100)
	}

	if (type === "fixed") {
		res = (price - discount)
	}

	return res
}

/**
 * Determine the selling price based on TLicense
 * No discount or coupon applied because this is the original price
 */
export function sellingPrice(cartItem: TCartItem): number {
	if (cartItem.product === undefined) return 0
	return (cartItem.license === "Regular License")
		? cartItem.product?.regularLicense
		: cartItem.product?.extendedLicense
}

/**
 * Determine the default upgrade price.
 * So, there is no discount of coupon applied
 * Note: the defaut upgrade is `50% of item's selling price`
 */
export function upgradePrice(cartItem: TCartItem) {
	return sellingPrice(cartItem) / 2
}

/**
 * Giá bán căn cứ theo `TLicense`
 * - Giá bán thông thường (giá theo đúng selllingPrice)
 * - Giá khi có coupon
 * - Giá khi có chiết khấu
 */
export function sellingPriceWithDiscount({ cartItem, coupon }: {
	cartItem: TCartItem
	coupon?: TCoupon
}): number {
	if (cartItem.product === undefined) return 0

	const _sellingPrice = sellingPrice(cartItem)

	const appliedCouponItem = coupon?.appliedProducts.find(p => p.filename === cartItem?.product?.filename)

	/**
	 * Đang tính là `sellingPrice`
	 * nên chỉ quan tâm đến `category` là `TLicense` thôi
	 * mà không cần quan tâm đến `TSupportTerm`
	 */
	if (appliedCouponItem !== undefined) {
		switch (appliedCouponItem.category) {
			case "Regular License":
				if (cartItem.license === "Regular License")
					return getAppliedCouponPrice({
						price: _sellingPrice,
						type: appliedCouponItem.type,
						discount: appliedCouponItem.discount
					})
				break
			case "Extended License":
				if (cartItem.license === "Extended License")
					return getAppliedCouponPrice({
						price: _sellingPrice,
						type: appliedCouponItem.type,
						discount: appliedCouponItem.discount
					})
				break
			default:
				break
		}
	}

	return hasDiscount(cartItem.product)
		? cartItem.license === "Regular License"
			? cartItem.product?.discount?.price ?? 0
			: _sellingPrice
		: _sellingPrice
}

/**
 * `updatePrice with discount` depends on `selling price with discount`
 */
export function upgradePriceWithDiscount({ cartItem, coupon }: {
	cartItem: TCartItem
	coupon?: TCoupon
}): number {
	const _upgradePrice = upgradePrice(cartItem)
	const _sellingPriceWithDiscount = sellingPriceWithDiscount({ cartItem, coupon })
	const couponDetails = coupon?.appliedProducts.find(p => p.filename === cartItem.filename)

	/**
	 * if `coupon` not applied, discount only be applied to `Regular License`
	 */
	const regularUpgradePrice = hasDiscount(cartItem.product)
		? cartItem.license === "Regular License"
			? _sellingPriceWithDiscount / 2
			: _upgradePrice
		: _upgradePrice

	if (couponDetails === undefined) return regularUpgradePrice

	if (couponDetails.category === "support_12m" && cartItem.supportTerm === "support_12m")
		return getAppliedCouponPrice({
			price: _sellingPriceWithDiscount,
			type: couponDetails.type,
			discount: couponDetails.discount
		})

	return regularUpgradePrice
}

/**
 * Unstable
 */
export function getSupportExtensionCost({
	product, license, expiredDate, lang = "vi", coupon
}: {
	product: TProduct
	expiredDate?: string
	license: TLicense
	lang?: TLanguage
	coupon: string
}): { cost: number, saving: number } {

	let result = 0

	const _sellingPrice = convertAndRoundPrice(sellingPrice({
		cartItemId: "",
		filename: "",
		license,
		couponName: "",
		supportTerm: "support_6m",
		product
	}), lang)

	//with item purchase
	if (expiredDate === undefined) {
		if (hasDiscount(product)) result = convertAndRoundPrice(product?.discount?.price ?? 0, lang) * 0.4
		result = _sellingPrice * 0.4
	} else if (dayjs() <= dayjs(expiredDate)) {	//during support period
		result = _sellingPrice * 0.6
	} else if (dayjs() > dayjs(expiredDate)) {	//support expired
		result = _sellingPrice * 0.9
	}

	return ({
		cost: result,
		saving: _sellingPrice * 0.9 - result
	})
}

/**
 * Final price which user must pay
 */
export function cartTotal(cart: TCartItem[], lang: TLanguage, coupon?: TCoupon): number {
	return cart.reduce((total, curr) => {
		const _sellingPriceWithDiscount = convertAndRoundPrice(sellingPriceWithDiscount({
			cartItem: curr,
			coupon
		}), lang)
		const _upgradePriceWithDiscount = convertAndRoundPrice(upgradePriceWithDiscount({
			cartItem: curr,
			coupon
		}), lang)
		if (curr.supportTerm === "support_6m")
			return total + _sellingPriceWithDiscount
		return total + _sellingPriceWithDiscount + _upgradePriceWithDiscount
	}, 0)
}

export function cartTotalNoDiscount(cart: TCartItem[], lang: TLanguage): number {
	return cart.reduce((total, curr) => {
		const _sellingPrice = convertAndRoundPrice(sellingPrice(curr), lang)
		const _upgradePrice = convertAndRoundPrice(upgradePrice(curr), lang)
		if (curr.supportTerm === "support_6m")
			return total + _sellingPrice
		return total + _sellingPrice + _upgradePrice
	}, 0)
}

/**
 * Lấy đơn vị rút gọn cho tiền VND
 * Tối thiểu number > 10_000 mới tính,
 * như vậy, dùng cái này chung cho USD vẫn ok
 * vì dữ liệu không đổi
 */
export function shortenCurrency(number: number): { short: string, long: string, number: number } {
	if (number < 1_000_000 && number > 10_000)
		return ({
			short: "k",
			long: "ngàn đồng",
			number: number / 1_000
		})

	if (number >= 1_000_000)
		return ({
			short: "tr",
			long: "triệu đồng",
			number: number / 1_000_000
		})

	return ({
		short: "",
		long: "",
		number: number
	})
}

/**
 * Convert the currency & Round the currency
 * Nếu là USD thì làm tròn xx.x0 USD
 * Nếu là VND thì làm tròn xx0,000 VND
 */
export function convertAndRoundPrice(number: number, lang: TLanguage): number {
	switch (lang) {
		case "en":
			return Math.round(number * 10) / 10
		case "vi":
			return Math.round(number * EXCHANGE_RATE_USD_VND / 10_000) * 10_000
		default:
			return Math.round(number * 10) / 10
	}
}

/**
 * Sort an Array<ProductType>
 * BEST_SELLING_ITEMS | NEWEST_ITEMS | RECENTLY_UPDATED_ITEMS | HIGHEST_PRICE | LOWEST_PRICE
 */
export function sortProductBy(products: TProduct[], activeFilter?: TProductFilters): TProduct[] {
	switch (activeFilter) {
		case "Best selling":
			//TODO: Implement this filter after implementing selling records
			//Currently, just return back supplied products
			return products
		case "Newest":
			return orderBy(products, ["publishedDate"], ["desc"])
		case "Recently Updated":
			return orderBy(products, ["lastUpdate"], ["desc"])
		case "Highest price":
			return orderBy(products, ["regularLicense"], ["desc"])
		case "Lowest price":
			return orderBy(products, ["regularLicense"], ["asc"])
		default:
			return orderBy(products, ["publishedDate"], ["desc"])
	}
}

/**
 * Check whether provided product is recently updated
 */
export function isRecentlyUpdate({ product, days }: { product?: TProduct, days: number }): boolean {
	if (product === undefined) return false
	return (dayjs().diff(dayjs(product.lastUpdate)) / 86_400_000) < days
}

/**
 * Password hashing
 */
export async function passwordHash(password: string): Promise<string> {
	const enc = new TextEncoder().encode(password)
	const hash = await crypto.subtle.digest({ name: "SHA-256" }, enc)
	const hashStr = new TextDecoder().decode(new Uint8Array(hash))
	return hashStr
}

export function removeHTMLTags(str: string): string {
	return str.replace(/<[^>]*>/g, "")
}

export function findUser(uid: string, allUsers?: TUser[]){
	if (allUsers === undefined) return null
	return allUsers.find(user => user?.uid === uid)
}