import { error } from "@sveltejs/kit";
import { getProjects } from "../../sanity";

export const load = async () => {
  const projects = await getProjects();

  if (projects) {
    return {
      projects,
    };
  }

  throw error(500, "internal server error");
};
