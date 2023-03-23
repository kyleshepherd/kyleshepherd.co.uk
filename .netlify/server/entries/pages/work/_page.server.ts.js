import { e as error } from "../../../chunks/index.js";
import { a as getProjects } from "../../../chunks/sanity.js";
const load = async () => {
  const projects = await getProjects();
  if (projects) {
    return {
      projects
    };
  }
  throw error(500, "internal server error");
};
export {
  load
};
