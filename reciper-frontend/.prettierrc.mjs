/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prettierConfigStandard = require("prettier-config-standard");
const Belt = require("@mobily/ts-belt");

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = Belt.D.merge(prettierConfigStandard, {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["cn", "cva"],
});

export default config;
