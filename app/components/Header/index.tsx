import styles from "./styles.css"

function links() {
	return [{ rel: "stylesheet", href: styles }]
}

function Header(){
	return (
		<div className="header">
			Header
			<span className="gStyle">Global style</span>
		</div>
	)
}

export { links as headerStyle, Header }