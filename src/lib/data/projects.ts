export type Project = {
	name: string;
	body: string;
	projectUrl?: string;
	techTags: string[];
};

export const projects: Project[] = [
	{
		name: "Tom Dixon (SOON_)",
		body: `This project was a large-scale e-commerce transformation at SOON_, built on Shopify and powered by our custom in-house platform, SOON_CMS.<br/><br/>I was responsible for building pages and functionality for the site using SvelteKit, whilst also working on our in-house Shopify GraphQL library in Go. Along with this, I built functionality for CMS users to add Promo Blocks to any PDP, which allowed the client to have better control on content curation.<br/><br/>One of the more interesting challenges came with the PDP, where a significant amount of product data needed to be displayed in the Details Tray. To handle this efficiently, I used our Go-based GraphQL API to structure and streamline the data from Shopify before consuming it within the SvelteKit frontend.<br/><br/>The site went on to win a <a href="https://www.w3award.com/winners/gallery/?event=1092&search=tom%20dixon&id=352007" target="_blank" rel="noopener noreferrer">handful of w3 Awards</a>, including a Gold Award for General Website (Consumer Goods).`,
		projectUrl: "http://tomdixon.net/",
		techTags: [
			"SvelteKit",
			"Go",
			"React",
			"E-commerce",
			"Shopify",
			"GCP",
			"Terraform",
			"TailwindCSS",
		],
	},
	{
		name: "SOON_ E-commerce",
		body: "I've worked on internal projects as part of SOON_'s e-commerce accelerator products -  including frontend libraries, custom CMS and e-commerce tools and asset services.<br/><br/>I have led full-stack development on projects such as adding an Asset Manager and Image Focal Points to our CMS, both from feature design to deployment. This involved me creating components and functionality using React and MUI, and then implementing the backend using Protocol Buffers, Go and gRPC.<br/><br/> I also led the development of adding a new resource, Campaign Blocks, to our CMS. This involved me adding new object and function definitions in Protocol Buffers, and then implementing these functions as gRPC calls in our Go-based backend, whilst ensuring backwards compatibility. This allowed our CMS users to add a variety of content blocks to product list pages and product detail pages across their site, in order to enable the client to wholly curate their frontend experience to the end-users.",
		techTags: [
			"Go",
			"React",
			"E-commerce",
			"Shopify",
			"gRPC",
			"Protobuf",
			"MUI",
			"Terraform",
			"GCP",
			"GraphQL",
		],
		projectUrl: "https://thisissoon.com/",
	},
	{
		name: "White Cube (SOON_)",
		body: "SOON_ were brought in to help White Cube prepare their bespoke inventory web-app for release to their internal team, after they were let down by another agency. The application was created to take their inventory system away from a Microsoft Access database that required a VPN to access and port it into a web-app.<br/><br/>The majority of my work on the inventory project involved adding functionality and fixing bugs in their React.js frontend and Node.js-powered GraphQL backend. This was an interesting challenge, as it required picking up a sizeable codebase that had been written by various outsourcers, so it was imperative that we quickly gained knowledge and refactored part of the project in order to improve the developer experience for the rest of the project.<br/><br/>I also recently led the development of a suite of image tools; an AWS Lambda function that handled resizing and converting images uploaded via the frontend, and authenticated endpoint deployed via ECS that would allow the client to access/embed images from their private S3 bucket into other platforms. This allowed me to learn more about the AWS ecosystem, and work with Terraform and Docker to deploy these applications.",
		techTags: ["React", "Node.js", "AWS", "Terraform", "Sequelize", "TailwindCSS", "GraphQL"],
	},
	{
		name: "Belstaff (SOON_)",
		body: "A full replatforming of luxury British fashion brand Belstaff's e-commerce website. I was responsible for building responsive components and pages, as well as integrating Shopify and our custom CMS into the Sapper/Svelte frontend.<br/><br/>Later, I contributed to the migration of the project to SvelteKit and updates to the site's original design. The website is now maintained by Belstaff's internal tech team, who have since taken over ongoing development.",
		projectUrl: "https://www.belstaff.com/",
		techTags: [
			"Svelte",
			"Sapper",
			"Go",
			"E-commerce",
			"Shopify",
			"GCP",
			"Terraform",
			"React",
			"GraphQL",
		],
	},
	{
		name: "Pagesmith (SOON_)",
		body: "A collaborative project between SOON_, Wonderbly and Faber & Faber. The goal was to create a web app to allow users to create customised poetry gift books for their loved ones.<br/><br/>I was the lead frontend developer on the project, my responsibilities were building the customisation experience using Svelte + Sapper, and integrating the frontend with Shopify to place orders, our Firebase backend and Wonderbly's REST API to fetch book details.<br/><br/>The project has since been shut down by the client.",
		techTags: ["Svelte", "Sapper", "E-commerce", "Shopify", "Firebase", "REST"],
	},
	{
		name: "Beddows Design",
		body: "A freelance project for Alex Beddows, a multi-disciplinary artist working across 3D game art and photography. He needed a portfolio site that could showcase both disciplines in a cohesive and flexible way.<br/><br/>The site is built with SvelteKit and Sanity, giving Alex full control over his content and allowing him to customise each project to suit his creative vision.",
		projectUrl: "https://beddowsdesign.com/",
		techTags: ["SvelteKit", "Sanity CMS", "Vercel"],
	},
	{
		name: "Appare Yosakoi Vancouver",
		body: "A freelance project for Appare Yosakoi, a Vancouver-based dance group. They needed a website to showcase their performances and provide a way for events and organizations to enquire about bookings.<br/><br/>The site is built with SvelteKit and uses Sanity as a CMS, allowing the team to easily manage content, adding new performances, updating gallery images, and editing text across the site without needing developer input.",
		projectUrl: "https://yosakoivancouver.com/",
		techTags: ["SvelteKit", "Sanity CMS", "Netlify"],
	},
];
