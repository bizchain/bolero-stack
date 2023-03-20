import styles from "./styles.css"

function links() {
	return [{ rel: "stylesheet", href: styles }]
}

function Footer(){
	return (
		<div className="footer">
			Footer
			<span className="gStyle">Global style</span>
		</div>
	)
}

export { links as footerStyle, Footer }