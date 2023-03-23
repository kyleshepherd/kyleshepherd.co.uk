export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","icons/plus.svg","imgs/.DS_Store","imgs/Kyle.jpg","imgs/belstaff.png","imgs/favicon.png","imgs/meta.png","imgs/pagesmith.png","imgs/reasons.png","imgs/rhythm-skate.jpeg","imgs/statify.png","imgs/tarkov.jpeg","imgs/whoop-this.jpeg","manifest.json"]),
	mimeTypes: {".svg":"image/svg+xml",".jpg":"image/jpeg",".png":"image/png",".jpeg":"image/jpeg",".json":"application/json"},
	_: {
		entry: {"file":"_app/immutable/start-b447e75d.js","imports":["_app/immutable/start-b447e75d.js","_app/immutable/chunks/index-4b27f0c8.js","_app/immutable/chunks/singletons-b808fef1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/work",
				pattern: /^\/work\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
