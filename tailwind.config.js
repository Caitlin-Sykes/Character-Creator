/** @type {import('tailwindcss').Config} */
module.exports = {
  //Searches for files
  content: ["./**/*.{html,js,ts}"],

  theme: {
    extend: {},
  },

  //Plugins
  plugins: [require("daisyui")],

  //DaisyUI Config
  daisyui: {
    themes: [
      {
        //Overrides for Daisy's night theme
        night: {
          ...require("daisyui/src/theming/themes")["night"],
          primary: "#1a2335",
          secondary: "teal",
        }
        //"#6620b4"

      },

    ], // false: only light + dark | true: all | array - specific themes
    darkTheme: "dark", // name of one of the included themes for dark mode
    themeRoot: "*", // The element that receives theme color CSS variables
  },
}

