import { error } from "@sveltejs/kit";
import { getProjects } from "../../sanity";

export const load = async () => {
  let guildCount = 0;

  const res = await fetch(
    "https://tarkov-tk-server-count-d55njyagta-ew.a.run.app/count",
  );
  const data = await res.json();

  guildCount = data?.count ? data.count : 0;

  const projects = await getProjects();

  if (projects) {
    return {
      projects,
      guildCount,
    };
  }

  throw error(500, "internal server error");
};
