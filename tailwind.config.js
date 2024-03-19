/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': {
          100: '#646c9a',
          400: "#8d55d6",
          600: '#3384ff'
        },
        'gray': {
          1000:'#E5E7EB' , 
        } ,
        custom: {
          btn: '#5236ff',
        },
        // 'custom' : {
        //      100:'#5236ff'
             
        // }
      },
      nthChild: ['last', 'first', 'even', 'odd', 'nth-last-child'],
    }
  },
  plugins: [],
}
