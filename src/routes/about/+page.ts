import { getAbout } from "../../sanity";

export const load = async () => {
  const about = await getAbout();

  if (about) {
    return {
      about: about[0],
    };
  }
};
