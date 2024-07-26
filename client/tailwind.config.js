/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: '#1a202c', // Replace with your desired dark blue color code
        lightblue: '#002D62', // Define light blue with the desired hex code
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
