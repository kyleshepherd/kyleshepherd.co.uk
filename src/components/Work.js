import React from 'react'
import PageHeader from './PageHeader'
import Project from './Project'
import './Work.css'

function Work() {
	return (
		<React.Fragment>
			<PageHeader pageTitle="Work" />
			<div className="workContainer">
				<h2 className="projectCatHeader">Web Development</h2>
        <Project
					projectTitle="Smile At Ur Phone"
					imageSrc="/images/saup.png"
					imageAlt="Smile At Ur Phone homepage"
					projectText={
						`I walked past someone and saw them smile at their phone and thought to myself what they could be smiling at. I then decided to make a site to catalogue the various reasons people smile at their phone. \n Users can submit their reason(s) and also view other random reasons that have been submitted. The site is built using Svelte + Sapper and uses Firestore for the storage of reasons.`
					}
          projectLink="https://smileaturphone.com"
					linkText="View Project"
					repoLink="https://github.com/kyleshepherd/smileaturphone-frontend"
				/>
        <Project
					projectTitle="SOON_"
					imageSrc="/images/soon.jpeg"
					imageAlt="SOON_ Logo"
					projectText={
						`I'm currently working at SOON_, a London-based digital agency with a variety of international clients, as a Frontend Engineer. My role involves building components and pages for projects using Svelte or React, whilst also reviewing peers code before conducting merges and deploys.`
					}
				/>
				<Project
					projectTitle="Statify"
					imageSrc="/images/statify.png"
					imageAlt="Statify"
					projectText={
						"I've wanted to make something using the Spotify API for a while and finally got around to it with this project. The project is built using React and the idea is that it takes a users Top Tracks from the last 6 months and uses the `/audio-features` API endpoint to analyse your music taste." +
						' \n' +
						'I posted about the project on Twitter and it ended up getting over 800 views in one evening which was a great response'
					}
					projectLink="https://common-film-finder.kyleshepherd.co.uk"
					linkText="View Project"
					repoLink="https://github.com/kyleshepherd/spotify-analyser"
				/>
				<Project
					projectTitle="Common Film Finder"
					imageSrc="/images/cff.png"
					imageAlt="Common Film Finder"
					projectText={
						"First little project I worked on whilst learning React. Using the TMDB API to allow users to enter two actors and find all of the films they've starred together in." +
						' \n' +
						'This was a nice and simple first project to wrap my head around React whilst also making something from start to finish.'
					}
					projectLink="https://common-film-finder.kyleshepherd.co.uk"
					linkText="View Project"
					repoLink="https://github.com/kyleshepherd/common-film-finder"
				/>
				<Project
					projectTitle="Tarkov TK Discord Bot"
					imageSrc="/images/tarkov.jpg"
					imageAlt="Tarkov TK Discord Bot"
					projectText={
						'My favourite game of recent years has to be Escape From Tarkov. I’ve played hours and hours with friends, and if you know the game you know how hard it is tell the difference between squad mates and enemies. Many team kills ensue. I stumbled upon a tutorial for creating Discord bots and thought it’d be good fun to make a bot to track and log team kills that have taken place when playing. At first myself and my friends used it on our Discord, but after posting it on the EFT subreddit and getting an amazing reaction, I built it out to support multi-server installations.\n' +
						' \n' +
						'The bot allows users to log team kills with a killer, victim and reason, view scoreboards of deaths, kills and a whole server log of every TK to take place. As of writing this (Jun 20), the bot has been installed on over 150 Discord servers and is now a Discord Verified Bot!'
					}
					projectLink="https://github.com/kyleshepherd/discord-tk-bot"
					linkText="View on Github"
				/>
				<Project
					projectTitle="Builtbycactus"
					imageSrc="/images/bbc.jpeg"
					imageAlt="Builtbycactus Logo"
					projectText={
						'I previously worked at Builtbycactus as a web developer. Whilst here, the main client I worked on Zoomz, a coffee pre-ordering app launching in New Zealand. For this client, I worked on a Laravel backend system and web-app, a WooCommerce shop and a mobile app built using Ionic. I learnt a great deal of new languages and frameworks since starting at Builtbycactus and it really opened my eyes to new methods and approaches to problems.\n'
					}
				/>
				<Project
					projectTitle="Eight Wire"
					imageSrc="/images/ew.svg"
					imageAlt="Eight Wire Logo"
					projectText={
						'I started at Eight Wire as an intern web developer in January 2019 whilst in my final year of university, working on creating Wordpress websites for a variety of clients, some sites being sprawling eCommerce and others simple brochure sites. The internship turned into a full time job where I worked until the start of 2020. At Eight Wire I really got to stick my teeth into projects and learn as I went, which is something I love to do. I learnt Wordpress, PHP, jQuery, MySQL and so much more.\n' +
						' \n' +
						'Some of the highlights from my time working at Eight Wire were building the Falmouth Week and Tour of Britain: Cornwall websites.'
					}
				/>
				<h2 className="projectCatHeader">Game Development</h2>
				<Project
					projectTitle="Still"
					imageSrc="/images/still.gif"
					imageAlt="Still - A photography exploration game"
					projectText={
						'Still is a personal project I’ve been working on on-and-off for the last 2 years. The game is aimed to be a photographic exploration game, think Firewatch’s photography mechanics meets Animal Crossing. I love photography and games that incorporate it, so it felt natural to try and work on this as my first proper personal project. The project is currently built in Unity and allows the player to take photos in game using the player’s camera and save them to their computer, identify plants by taking a photo of them to save it to their log book and use a hot air balloon to get an eagle eye view of the landscape. \n' +
						'\n' +
						'This game is very much a passion project, and whilst I don’t believe there is a huge market for it, I feel it’s the sort of game to resonate with a small group of people who enjoy playing relaxing, no-risk games.'
					}
				/>
				<Project
					projectTitle="Scramble: Battle of Britain"
					imageSrc="/images/scramble.jpeg"
					imageAlt="Scramble at EGX 2019"
					projectText={
						'The premise behind Scramble: Battle of Britain is simulating WW2 aerial dogfights using turn based strategy gameplay. A match would involve two players facing off each other, each given a squadron of planes and a set amount of time to plan each planes movement for the next action phase. Once that time had expired, all the planes would begin to fly at once, taking shots at the enemy if the pilots were a keen enough shot. The winner would be the last man standing after a set amount of turns. A match could be played locally using a “hotseat” game mode, or over a network.\nThe project was built in Unity 4.6 originally by the creator, James of James Makes Games. Part of my job was getting the game working in Unity 2019 and then creating new gameplay features and multiplayer functionality. This was my first time working on networking, which was done using simple TCP packets, so it was quite the challenge. I was responsible for quite a lot over the 6 months working on Scramble, such as building match settings screens, round replay functionality and improving the networking to allow for async so as to prevent large game hitches.\nThe game was lucky enough to be funded via the UKGF and as a result we were able to present the game to the public at EGX 2019 which was a great experience and provided some incredible feedback, as well as reassurance that the game had a market.'
					}
					projectLink="http://www.jamesmakesgames.co.uk/Current-Projects/"
					linkText="More about Scramble"
				/>
				<Project
					projectTitle="Ryoko"
					imageSrc="/images/ryoko.jpg"
					imageAlt="Ryoko"
					projectText={
						'‘Ryoko’ was the final game I worked on at university, a third-person shooter aimed at pairing the typical mechanics of the genre with elements from various other games such as telegraphed attacks, and dodging mechanics.We aimed to create an experience as closely paired to AAA as possible, setting up pipelines from the start to help achieve this. We also used Unity 2018’s High Definition Render Pipeline in order to achieve high graphic fidelity on this project, again aiming to align ourselves with the AAA market.\n' +
						' \n' +
						'The project was very interesting, as we were able to completely choose our teams for the year, so I was able to work with close friends who were extremely talented at their chosen routes.I was one of two programmers on this project, and I focused on gameplay and UI programming. ‘Ryoko’ was an extremely useful learning process, as it taught us that having talent doesn’t mean you’ll make a great game, but there is a whole lot more that goes into the process to create something exceptional.'
					}
					projectLink="https://youtu.be/k7678jNEsVU"
					linkText="View Trailer"
				/>
				<Project
					projectTitle="Whoop This Arcade"
					imageSrc="/images/whoop-this.jpg"
					imageAlt="Whoop This Arcade at House of Vans"
					projectText={
						'In October 2018, I stumbled upon a tweet from WHOOPI (Ashten) asking for a Unity Developer for an upcoming project. I got in touch and started working the same day on his project; a rhythm based infinite runner featuring skateboarding. For the project, Ashten wanted 3 game modes; flip tricks, grinds and manuals. Each one having the same gameplay loop but with different visuals and music. I was provided with the sprite sheets and art, and worked on getting everything implemented.\n' +
						' \n' +
						'I used an Asset Store package called ‘Rhythm Tool’ which helped to save hours with track analysis and beat spawning/speed, this was incredibly useful and meant I could focus on other elements due to the game having a tight turnaround of a month. I set up all the sprite sheet animations in Photoshop and brought them into Unity where they were then wired into an Animator Controller and set to transition depending on the beat that was hit.\n' +
						' \n' +
						'For the environment, I created a base class that was able to alter the position of any sprite and detect when it was off the screen to the left and then move it back to off the screen on the right. This was a great performance saver as the game is running on Raspberry Pi-style computers in custom arcade cabinets made by Ashten. I also created a high score tracking system so when the game is being exhibited, people can compete for the highest score and create a bit of competition and more excitement around the game.\n' +
						' \n' +
						'The project was in collaboration with Vans and was shown at their House of Vans venue in London, UK from the 16th November to the 6th of December.'
					}
					projectLink="https://www.kotaku.co.uk/2018/11/20/going-from-drake-to-skate-with-whoop-this-arcade"
					linkText="Read more about the project"
				/>
				<Project
					projectTitle="Sqvishy"
					imageSrc="/images/sqvishy.jpg"
					imageAlt="Sqvishy"
					projectText={
						'Whilst working for Big Robot, myself and a designer – James Carey – were tasked with making a mini-game that was going to be playable via an arcade machine in Big Robots latest game ‘The Light Keeps Us Safe’. The mini-game was simple, a puzzle game requiring the player to navigate coloured cubes to a coloured tile to “exit” them from the board.\n' +
						' \n' +
						'After completing my internship with Big Robot, James reached out to ask for my assistance in completing Sqvishy for a Steam release under his new company, James Makes Games. We worked over some elements and created more levels before publishing the game on Steam! This would be my first game that I have worked on to be released on the platform.\n' +
						' \n' +
						'My role in the project was the lead programmer, focusing on building systems and gameplay mechanics, as well as working with various third party plugins for Unity such as Rewired.'
					}
					projectLink="https://store.steampowered.com/app/1049720/Sqvishy/"
					linkText="View the game on Steam"
				/>
				<Project
					projectTitle="Big Robot"
					imageSrc="/images/big-robot.jpg"
					imageAlt="Big Robot Logo"
					projectText={
						'From May to September of 2018, I was a programming intern at UK game studio Big Robot Ltd . I was the lead programmer on a prototype being made in Unity 2017, and also worked on two other projects during my time there. I worked remotely from home and communicated with the team via Slack.\n' +
						' \n' +
						"The main project won't ever see the light of day sadly, but my main focuses on the project were UI, gameplay and working with middleware. I faced some difficult issues during this project, most commonly with middleware plug ins. However, I feel as though this has helped to improve my ability to read and understand code written by other people, which has proved incredibly useful so far."
					}
				/>
			</div>
		</React.Fragment>
	)
}

export default Work
