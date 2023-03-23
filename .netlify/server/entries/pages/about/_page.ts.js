import { g as getAbout } from "../../../chunks/sanity.js";
const load = async () => {
  const about = await getAbout();
  if (about) {
    return {
      about: about[0]
    };
  }
};
export {
  load
};
