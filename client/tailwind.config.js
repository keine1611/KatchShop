const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    fontFamily:{
      Pacifico:['Dancing Script', 'cursive'],
    },
    colors: {
      transparent: 'transparent',
      greyButton: '#BDCDD6',  
      bgyellow: '#EEE9DA',
      lightBlue: '#93BFCF',
      bluee: '#6096B4'
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
    // require('daisyui'),
    require('flowbite/plugin')

  ],
  daisyui: {
    themes: ["light", "dark", "cupcake","fantasy"],
  },
});