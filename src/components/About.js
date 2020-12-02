import React from 'react'
import PageHeader from './PageHeader'
import './About.css'

function About () {
  return (
    <React.Fragment>
      <PageHeader pageTitle="About"/>
      <div className="aboutContent">
        <div className="aboutText">
          <p>
            I’m Kyle, a full stack web developer currently based in Falmouth, UK. I studied Games Development:
            Programming at Falmouth University, graduating in 2019. During my time at university, I worked on 5 game
            projects in interdisciplinary teams, these projects varied from first person puzzle games to couch
            competitive multiplayer games to third person shooters. <br/><br/>
            During my final year of university, I secured a web development internship with a local agency and proceeded
            to work there full time after graduating, working on large scale Wordpress websites for a variety of
            clients. I have recently joined Builtbycactus, a Cornish development agency creating a multitude of
            applications using Laravel, React, Ionic and Wordpress.
          </p>

          <div className="skillList">
            <h3>Skills & Technologies</h3>
            <ul>
              <li>HTML/CSS/PHP/ES6</li>
              <li>React.js + Gatsby.js</li>
              <li>Tailwind CSS</li>
              <li>AWS</li>
              <li>WordPress</li>
              <li>Laravel</li>
              <li>Version Control (Git + SVN)</li>
              <li>Scrum + Agile</li>
              <li>Trello</li>
            </ul>
          </div>

          <a className="cvBtn" href="/Kyle-Shepherd-CV.pdf" target="_blank" rel="noopener">View my CV</a>
        </div>

        <div>
          <img src="/images/me.jpeg" className="portrait" alt="Photo of Kyle"/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default About
