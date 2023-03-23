import { c as create_ssr_component, e as escape, b as add_attribute, v as validate_component, f as each } from "../../../chunks/index2.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
const WorkBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { image } = $$props;
  let { body } = $$props;
  let { repoLink } = $$props;
  let { projectLink } = $$props;
  let { guildCount } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0)
    $$bindings.image(image);
  if ($$props.body === void 0 && $$bindings.body && body !== void 0)
    $$bindings.body(body);
  if ($$props.repoLink === void 0 && $$bindings.repoLink && repoLink !== void 0)
    $$bindings.repoLink(repoLink);
  if ($$props.projectLink === void 0 && $$bindings.projectLink && projectLink !== void 0)
    $$bindings.projectLink(projectLink);
  if ($$props.guildCount === void 0 && $$bindings.guildCount && guildCount !== void 0)
    $$bindings.guildCount(guildCount);
  return `<div class="${"mb-12 flex flex-wrap gap-12 sm:flex-nowrap"}"><div class="${"basis-full items-start sm:basis-1/2"}"><h2 class="${"mb-1 font-serif text-3xl md:text-4xl"}">${escape(title)}</h2>
    <img class="${"w-full"}"${add_attribute("src", image, 0)}${add_attribute("alt", title, 0)} loading="${"lazy"}"></div>
  <div class="${"basis-full items-start sm:basis-1/2"}"><p class="${"mb-4 text-lg sm:text-xl md:mt-8"}"><!-- HTML_TAG_START -->${body}<!-- HTML_TAG_END --></p>
    ${guildCount ? `<p class="${"mb-4 text-lg font-bold sm:text-xl"}">Currently installed on ${escape(guildCount)} servers!
      </p>` : ``}
    <div class="${"flex flex-wrap md:flex-nowrap md:gap-4"}">${projectLink ? `<a${add_attribute("href", projectLink, 0)} target="${"_blank"}" rel="${"noreferrer"}" class="${"mb-3 basis-full rounded-lg border-2 border-orange px-4 py-3 text-center font-serif text-xl transition-colors hover:bg-orange hover:text-light md:basis-1/2 md:text-2xl"}">View Project
        </a>` : ``}
      ${repoLink ? `<a${add_attribute("href", repoLink, 0)} target="${"_blank"}" rel="${"noreferrer"}" class="${"mb-3 basis-full rounded-lg border-2 border-orange px-4 py-3 text-center font-serif text-xl transition-colors hover:bg-orange hover:text-light md:basis-1/2 md:text-2xl"}">View Repo
        </a>` : ``}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let projects;
  let { data } = $$props;
  let guildCount;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ projects } = data);
  return `<div class="${"mb-8 flex flex-grow basis-full flex-col justify-center"}">${validate_component(PageHeader, "PageHeader").$$render($$result, { header: "Work" }, {}, {})}
  ${each(projects, (project) => {
    return `${validate_component(WorkBlock, "WorkBlock").$$render(
      $$result,
      {
        title: project.name,
        image: project.imageUrl + "?w=752&auto=format",
        body: project.description,
        repoLink: project.repo || "",
        projectLink: project.project || "",
        guildCount: project.showServerCount ? guildCount : void 0
      },
      {},
      {}
    )}`;
  })}</div>`;
});
export {
  Page as default
};
