/** @type {import('tailwindcss').Config} */
module.exports = {

  //Searches for files
  content: ["./**/*.{html,js,ts}"],

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
          secondary: "#20325f",
          accent: "#2a4076",
          "--darkblue": "#0e172c",
        }
      },

    ],
    darkTheme: "night", // name of one of the included themes for dark mode
  },
}