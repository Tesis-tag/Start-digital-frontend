/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      robot:['Roboto Slab']
    },
    extend: {
      colors: {
        danger: "#ff0000",
        feliz:"#5356FF",
        azule:"#2464ec",
        mora:"#8E7AB5",
        blancoscuro: "#EFEFEF",
        nav:"#102b44",
        blanopaco:"#eeeee4",
        sule:"#102a83",
        bentos:"#E1E1E1",
        backsule:"#005d8d"
    },
  },
  plugins: [],
}
}

