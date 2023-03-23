import { c as create_ssr_component, v as validate_component } from "../../../chunks/index2.js";
import { P as PageHeader } from "../../../chunks/PageHeader.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex-1 mb-8"}">${validate_component(PageHeader, "PageHeader").$$render($$result, { header: "Contact" }, {}, {})}
  <p class="${"text-lg sm:text-xl"}">If you&#39;d like to get in touch, please send an email to <a class="${"underline"}" href="${"mailto:kyleshepherddev@gmail.com"}">kyleshepherddev@gmail.com</a> and I&#39;ll get back to you ASAP!
  </p></div>`;
});
export {
  Page as default
};
