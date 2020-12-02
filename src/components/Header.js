import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import Menu from './Menu'

function Header() {
	const [showMenu, setShowMenu] = useState(false)

	const handleClose = () => setShowMenu(false)
	const handleOpen = () => setShowMenu(true)

	return (
		<React.Fragment>
			<header>
				<div className="headerContainer">
					<div className="siteTitle">
						<h1>
							<Link to="/">Kyle Shepherd</Link>
						</h1>
					</div>

					<button className="navBtn" onClick={handleOpen}>
						<div className="navBtnIcon" />
						<p>MENU</p>
					</button>
				</div>
			</header>
			<Menu isOpen={showMenu} closeMenu={handleClose} />
		</React.Fragment>
	)
}

export default Header
