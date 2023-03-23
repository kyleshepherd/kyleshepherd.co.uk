import sanityClient from "@sanity/client";
let client;
const setClient = () => {
  client = sanityClient({
    projectId: "d3y2fj3e",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: false
  });
};
const getProjects = async () => {
  if (!client) {
    setClient();
  }
  return await client.fetch(`*[_type == "project"] | order(projectDate desc){
    name,
    description,
    project,
    repo,
    "imageUrl": image.asset->url,
    showServerCount,
  }`);
};
const getAbout = async () => {
  if (!client) {
    setClient();
  }
  return await client.fetch(`*[_type == "about"]`);
};
export {
  getProjects as a,
  getAbout as g,
  setClient as s
};
