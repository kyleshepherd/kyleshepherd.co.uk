import adapter from "@sveltejs/adapter-netlify";
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer()],
    },
    aliases: [["ts", "typescript"]],
  }),

  kit: {
    adapter: adapter(),
  },
};

export default config;
