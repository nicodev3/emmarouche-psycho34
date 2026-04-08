import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "public/**",
      "src/extracted/**",
      "**/*.min.js",
    ],
  },
  ...eslintPluginAstro.configs.recommended,
];
