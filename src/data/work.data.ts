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
    body: "The biggest project I have worked on whilst at SOON_ has been the full replatforming of luxury British fashion brand Belstaff's eCommerce website. I was responsible for creating responsive components and pages. I also worked on integrating Shopify and our custom CMS into the Sapper and Svelte frontend.<br/><br/>This is an on-going project which has continued past the initial build with me taking responsibility for bug fixing and additional features such as a tool for syncing Belstaff's email templates to Shopify.",
    projectLink: "https://www.belstaff.com",
  },
  {
    title: "Pagesmith (SOON_)",
    image: "pagesmith.png",
    body: "Another project I have had involvement with whilst at SOON_ was Pagesmith. Pagesmith is a collaboration between custom-book company Wonderbly and esteemed British publisher Faber & Faber. <br/><br/>As the sole frontend engineer of this project;  I was responsible for creating the customer-facing web app including the personalisation flow. We used Sapper and Svelte for the frontend, with Shopify handling the backend.",
    projectLink: "https://pagesmithbooks.com/",
  },
  {
    title: "Rhythm Skate - First NFT iOS game",
    image: "rhythm-skate.jpeg",
    body: "Rhythm Skate is an NFT iOS app that I worked on as the lead engineer in collaboration with multimedia artist, Whoopi. I took ownership of porting a previous project Whoopi and I had created to iOS, replacing art assets, adding new features and optimising the code.",
    projectLink: "https://zora.co/whoopi/999",
  },
  {
    title: "Tarkov TK Discord Bot",
    image: "tarkov.jpeg",
    body: "The Tarkov TK Discord bot is a personal project created for users of the game Escape From Tarkov. It allows players to log team kills and view stats for their server. I built the bot using Node.js and the Discord.js package, with the data being stored on Firestore. Currently, the bot has been installed on over 650 Discord servers and is now a Discord Verified Bot!",
    projectLink: "https://www.patreon.com/tarkovtk",
    repoLink: "https://github.com/kyleshepherd/discord-tk-bot",
  },
  {
    title: "Reasons To Smile At Your Phone",
    image: "reasons.png",
    body: "Reasons To Smile At Your Phone is another personal project. The concept for the site was inspired by walking past somebody smiling at their phone and my curiosity of what they could be smiling at. The site is a catalogue of user-submitted reasons which are randomly displayed on the website.",
    projectLink: "https://smileaturphone.com/",
    repoLink: "https://github.com/kyleshepherd/smileaturphone-frontend",
  },
];
