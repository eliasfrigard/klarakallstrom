/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#F2F2F2',
        black: '#000000',
        primary: {
          500: '#F2F2F2',
        },
        secondary: {
          500: '#28323c',
        },
        accent: {
          500: '#dea46f',
        },
      },
      aspectRatio: {
        '9/16': '9 / 16',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
