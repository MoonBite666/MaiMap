const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|card|link|select|slider|ripple|spinner|listbox|divider|popover|scroll-shadow).js",
  ],
  theme: {
    extend: {
      borderRadius: {
        "right-only": "0 0.5rem 0.5rem 0",
      },
    },
  },
  plugins: [nextui()],
};
