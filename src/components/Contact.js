import React from 'react'
import PageHeader from './PageHeader'
import './Contact.css'

function Contact () {
  return (
    <React.Fragment>
      <PageHeader pageTitle="Contact"/>
      <div className="contactContent">
        <p>If you'd like to get in touch, please send an email to <a
          href="mailto:kyleshepherddev@gmail.com">kyleshepherddev@gmail.com</a> and I'll get back to you ASAP!</p>
      </div>
    </React.Fragment>
  )
}

export default Contact
