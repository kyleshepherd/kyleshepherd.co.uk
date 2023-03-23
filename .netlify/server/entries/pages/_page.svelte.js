import { c as create_ssr_component, e as escape, v as validate_component } from "../../chunks/index2.js";
import { P as PageHeader } from "../../chunks/PageHeader.js";
const DetailBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { header } = $$props;
  let { content } = $$props;
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  return `<div><h2 class="${"mb-2 font-serif text-3xl md:text-4xl"}">${escape(header)}</h2>
  <p class="${"text-3xl md:text-4xl"}">${escape(content)}</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex flex-col justify-center flex-grow basis-full"}">${validate_component(PageHeader, "PageHeader").$$render($$result, { header: "Frontend Engineer" }, {}, {})}
  <div class="${"mb-8"}">${validate_component(DetailBlock, "DetailBlock").$$render(
    $$result,
    {
      header: "Currently",
      content: "Senior Software Engineer @ SOON_"
    },
    {},
    {}
  )}</div>
  <div class="${"mb-8"}">${validate_component(DetailBlock, "DetailBlock").$$render(
    $$result,
    {
      header: "Building with",
      content: "Svelte & Go"
    },
    {},
    {}
  )}</div>
  <div class="${"mb-8"}">${validate_component(DetailBlock, "DetailBlock").$$render(
    $$result,
    {
      header: "Based in",
      content: "London, UK"
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
