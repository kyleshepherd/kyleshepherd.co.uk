type Work = {
  title: string;
  image: string;
  body: string;
  repoLink?: string;
  projectLink?: string;
};

export const workData: Work[] = [
  {
    title: "Belstaff (SOON_)",
    image: "belstaff.png",
    body: "One of the main projects I've been a part of whilst at SOON_ has been the full-replatforming of luxury British fashion brand Belstaff's eCommerce. We've worked alongside Belstaff to migrate from their previous eCommerce solution to a headless frontend built with Sapper and Svelte, with Shopify and our custom CMS handling the backend.<br/><br/>This was a great project to pick up SOON_'s tools and build process, and it's continued past the initial build with bug fixing and additional features.",
    projectLink: "https://www.belstaff.com",
  },
  {
    title: "Pagesmith (SOON_)",
    image: "pagesmith.png",
    body: "Pagesmith was another exciting project, a collaboration between custom-book company Wonderbly and esteemed British publisher Faber & Faber. This website allows users to create a personalised poetry book by selecting themes and having poems chosen for them. I was the sole frontend engineer working on Pagesmith, so it was great to take the project from prototype to release.<br/><br/>This project also used Sapper and Svelte for the frontend, with Shopify handling the backend.",
    projectLink: "https://pagesmithbooks.com/",
  },
  {
    title: "Rhythm Skate - First NFT iOS game",
    image: "rhythm-skate.jpeg",
    body: "After collaborating with Whoopi on Whoop This Arcade, we spoke about porting the game to mobile devices at the time, but life took over for a while. At the end of 2020 we got back into it due to a partnership between Whoopi's agency, IAMSOUND, and NFT martetplace ZORA.<br/><br/>The plan was to port the game to iOS using Testflight to sell access to the game as an NFT. It was a bit of a wild ride with having to learn about NFTs and the blockchain whilst rewriting 2 year old code and adding new features we didn't have time for in 2018.<br/><br/>We managed to get it done by the short deadline and were happy to have a bunch of bids on day 1. It was a great experience working with Whoopi and Myk again, and seeing the game a bit more out in the wild made the hard work worth it.",
    projectLink: "https://zora.co/whoopi/999",
  },
  {
    title: "Tarkov TK Discord Bot",
    image: "tarkov.jpeg",
    body: "My favourite game of recent years has to be Escape From Tarkov. I’ve played hours and hours with friends, and if you know the game you know how hard it is tell the difference between squad mates and enemies. Many team kills ensue. I stumbled upon a tutorial for creating Discord bots and thought it’d be good fun to make a bot to track and log team kills that have taken place when playing. At first myself and my friends used it on our Discord, but after posting it on the EFT subreddit and getting an amazing reaction, I built it out to support multi-server installations.<br/><br/>The bot allows users to log team kills with a killer, victim and reason, view scoreboards of deaths, kills and a whole server log of every TK to take place. As of writing this (Jun 22), the bot has been installed on over 650 Discord servers and is now a Discord Verified Bot!",
    projectLink: "https://www.patreon.com/tarkovtk",
    repoLink: "https://github.com/kyleshepherd/discord-tk-bot",
  },
  {
    title: "Reasons To Smile At Your Phone",
    image: "reasons.png",
    body: "I walked past someone and saw them smile at their phone and thought to myself what they could be smiling at. I then decided to make a site to catalogue the various reasons people smile at their phone.<br/><br/>Users can submit their reason(s) and also view other random reasons that have been submitted. The site is built using Svelte + Sapper and uses Firestore for the storage of reasons.",
    projectLink: "https://smileaturphone.com/",
    repoLink: "https://github.com/kyleshepherd/smileaturphone-frontend",
  },
  {
    title: "Statify",
    image: "statify.png",
    body: "I've wanted to make something using the Spotify API for a while and finally got around to it with this project. The project is built using React and the idea is that it takes a users Top Tracks from the last 6 months and uses the `/audio-features` API endpoint to analyse your music taste.<br/><br/>I posted about the project on Twitter and it ended up getting over 800 views in one evening which was a great response",
    projectLink: "https://statify.kyleshepherd.co.uk/",
    repoLink: "https://github.com/kyleshepherd/spotify-analyser",
  },
];
