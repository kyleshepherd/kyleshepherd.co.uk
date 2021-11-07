import React from "react";
import PageHeader from "./PageHeader";
import "./About.css";

function About() {
  return (
    <React.Fragment>
      <PageHeader pageTitle="About" />
      <div className="aboutContent">
        <div className="aboutText">
          <p>
            I’m Kyle, a Front End Engineer currently based in Falmouth, UK. I
            studied Games Development at Falmouth University, specialising in
            Programming and graduating in 2019. During my time at university, I
            worked on 5 game projects in interdisciplinary teams, these projects
            varied from first person puzzle games to couch competitive
            multiplayer games to third person shooters. <br />
            <br />
            During my final year of university, I moved into web development,
            using online courses and tutorials to learn the basics before
            starting an internship.
            <br />
            <br />
            I'm currently at London-based digital agency SOON_, working on
            projects using Svelte and React as our main frontend frameworks.
          </p>

          <div className="skillList">
            <h3>Skills & Technologies</h3>
            <ul>
              <li>Svelte</li>
              <li>React.js</li>
              <li>Go (a lil bit)</li>
              <li>HTML/CSS/SCSS/PHP/ES6 (all that fun stuff!)</li>
              <li>Tailwind CSS</li>
              <li>Version Control (Git + Subversion)</li>
              <li>Agile</li>
            </ul>
          </div>

          <a
            className="cvBtn"
            href="/Kyle-Shepherd-CV.pdf"
            target="_blank"
            rel="noopener"
          >
            View my CV
          </a>
        </div>

        <div>
          <img src="/images/me.jpeg" className="portrait" alt="Kyle Shepherd" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;
