import * as React from "react"

import clsx from "clsx"

function Modal({ isOpen, closeModal, title, children }: {
	isOpen: boolean
	closeModal: () => void
	title: string
	children: React.ReactNode
}) {
	return (
		<div className={clsx("modal modal-bottom sm:modal-middle", isOpen ? "modal-open" : "")}>
			<div className="modal-box">
				<h3 className="text-lg font-bold">{title}</h3>
				<div className="py-4">
					{children}
				</div>
				<div className="modal-action">
					<button onClick={() => { closeModal() }}>
						<label htmlFor="my-modal-6" className="text-white bg-blue-500 btn btn-ghost hover:bg-blue-600">OK</label>
					</button>
				</div>
			</div>
		</div>
	)
}

export default function useModal(defaultState?: boolean) {
	const [isOpen, setIsOpen] = React.useState(defaultState ?? false)

	const handles = React.useMemo(() => ({
		closeModal: () => { setIsOpen(false) },
		openModal: () => { setIsOpen(true) }
	}), [])

	return ({
		Modal,
		isOpen,
		closeModal: handles.closeModal,
		openModal: handles.openModal
	})
}

// export function ModalButton(){
// 	return (
// 		<>
// 			<input type="checkbox" id="my-modal-6" class="modal-toggle" />
// 		</>
// 	)
// }