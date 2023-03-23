import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let about;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  ({ about } = data);
  return `<div class="${"flex-grow basis-full mb-8 flex flex-col justify-center"}">${validate_component(PageHeader, "PageHeader").$$render($$result, { header: "About" }, {}, {})}
  <div class="${"flex flex-wrap justify-start gap-8 sm:flex-nowrap"}"><div class="${"basis-full sm:basis-1/2"}"><p class="${"text-lg sm:text-xl"}"><!-- HTML_TAG_START -->${about.aboutBody}<!-- HTML_TAG_END --></p></div>
    <div class="${"basis-full sm:basis-1/2"}"><img class="${"w-full max-w-lg rounded-full mx-auto"}" src="${"/imgs/Kyle.jpg"}" alt="${"Lil piccy of me innit"}"></div></div></div>`;
});
export {
  Page as default
};
