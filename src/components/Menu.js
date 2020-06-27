import React from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'
import { GoX } from 'react-icons/go'

function Menu (props) {
  return (
    <div className={'menu' + (props.isOpen ? ' active' : '')}>
      <div className="menuCloseContainer">
        <button className="menuCloseBtn" onClick={props.closeMenu}>
          <GoX/>
        </button>
      </div>
      
      <div className="menuContent">
        <ul className="menuNav">
          <li>
            <Link to="/" onClick={props.closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={props.closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/work" onClick={props.closeMenu}>
              Work
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={props.closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu