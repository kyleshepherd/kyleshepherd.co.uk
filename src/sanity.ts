import type { SanityClient } from "@sanity/client";
import sanityClient from "@sanity/client";

let client: SanityClient;

export const setClient = () => {
  client = sanityClient({
    projectId: "d3y2fj3e",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: false,
  });
};

export const getProjects = async () => {
  if (!client) {
    setClient();
  }
  return await client.fetch(`*[_type == "project"] | order(projectDate desc){
    name,
    description,
    project,
    repo,
    "imageUrl": image.asset->url
  }`);
};
