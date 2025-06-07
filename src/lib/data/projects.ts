export type Project = {
	name: string;
	body: string;
	projectUrl: string;
	imagePath: string;
};

export const projects: Project[] = [
	{
		name: "Tom Dixon (SOON_)",
		imagePath: "/tomdixon.png",
		body: "This project was a large-scale eCommerce transformation at SOON_, built on Shopify and powered by our custom in-house platform, SOON_CMS.<br/><br/>I joined the team in the final stages to help deliver key areas of the site, including the product detail page (PDP) and static pages. My work involved building new components and integrating them with SOON_CMS, enabling the client to easily manage static page content without developer input.<br/><br/>One of the more interesting challenges came with the PDP, where a significant amount of product data needed to be displayed in the Details Tray. To handle this efficiently, we used our Go-based GraphQL API to structure and streamline the data from Shopify before consuming it within the SvelteKit frontend.",
		projectUrl: "http://tomdixon.net/",
	},
	{
		name: "Beddows Design",
		imagePath: "/beddows.png",
		body: "A freelance project for Alex Beddows, a multi-disciplinary artist working across 3D game art and photography. He needed a portfolio site that could showcase both disciplines in a cohesive and flexible way.<br/><br/>The site is built with SvelteKit and Sanity, giving Alex full control over his content and allowing him to customise each project to suit his creative vision.",
		projectUrl: "https://beddowsdesign.com/",
	},
	{
		name: "Appare Yosakoi Vancouver",
		imagePath: "/appare.png",
		body: "A freelance project for Appare Yosakoi, a Vancouver-based dance group. They needed a website to showcase their performances and provide a way for events and organizations to enquire about bookings.<br/><br/>The site is built with SvelteKit and uses Sanity as a CMS, allowing the team to easily manage content—adding new performances, updating gallery images, and editing text across the site without needing developer input.",
		projectUrl: "https://yosakoivancouver.com/",
	},
	{
		name: "Belstaff (SOON_)",
		imagePath: "/belstaff.png",
		body: "My first project at SOON_ was the full replatforming of luxury British fashion brand Belstaff's eCommerce website. I was responsible for building responsive components and pages, as well as integrating Shopify and our custom CMS into the Sapper/Svelte frontend.<br/><br/>Later, I contributed to the migration of the project to SvelteKit and supported updates to the site's original design. The website is now maintained by Belstaff’s internal tech team, who have since taken over ongoing development.",
		projectUrl: "https://www.belstaff.com/",
	},
];
