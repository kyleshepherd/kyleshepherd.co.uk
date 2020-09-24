import React from 'react'
import './Project.css'

function Project(props) {
	const projectText = props.projectText.split('\n').map((item, i) => {
		return <p key={i}>{item}</p>
	})

	const projectLink = props.projectLink

	return (
		<div className="projectContainer">
			<h2>{props.projectTitle}</h2>
			<div className="projectContent">
				<div className="projectImg">
					<img src={props.imageSrc} alt={props.imageAlt} />
				</div>

				<div className="projectText">
					{projectText}
					{props.projectLink && (
						<div className="btnContainer">
							<a
								className="projectBtn"
								href={props.projectLink}
								target="_blank"
								rel="noreferrer noopener"
							>
								{props.linkText}
							</a>
						</div>
					)}
					{props.repoLink && (
						<div>
							<a
								className="projectBtn"
								href={props.repoLink}
								target="_blank"
								rel="noreferrer noopener"
							>
								View Repo
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Project
