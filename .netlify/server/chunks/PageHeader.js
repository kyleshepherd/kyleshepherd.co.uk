import { c as create_ssr_component, e as escape } from "./index2.js";
const PageHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { header } = $$props;
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  return `<h1 class="${"font-serif text-6xl mb-12 sm:text-7xl sm:mb-16 lg:text-8xl"}">${escape(header)}</h1>`;
});
export {
  PageHeader as P
};
