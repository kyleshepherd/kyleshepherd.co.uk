import React from 'react'
import './Footer.css'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

function Footer () {
  return (
    <div className="footerContainer">
      <a href="https://github.com/kyleshepherd" target="_blank" rel="noreferrer">
        <FaGithub/>
      </a>
      <a href="https://twitter.com/kyleshepherddev" target="_blank" rel="noreferrer">
        <FaTwitter/>
      </a>
      <a href="https://www.linkedin.com/in/kyleshepherddev/" target="_blank" rel="noreferrer">
        <FaLinkedin/>
      </a>
    </div>
  )
}

export default Footer