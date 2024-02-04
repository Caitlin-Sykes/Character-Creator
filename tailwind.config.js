/** @type {import('tailwindcss').Config} */
module.exports = {

  //Searches for files
  content: ['./**/*.{html,js,ts}'],

  //Plugins
  plugins: [require('daisyui')],

  //DaisyUI Config
  daisyui: {
    themes: [
      {
        //Overrides for Daisy's night theme
        night: {
          ...require('daisyui/src/theming/themes')['night'],
          primary: '#1A1A1A',
          'primary-content': "#2B1236",
          secondary: '#25112c',
          "secondary-content": '#52275f',
          accent: '#2a4076',
    }
       
      },
    ],
    darkTheme: 'night', // name of one of the included themes for dark mode
  },
}