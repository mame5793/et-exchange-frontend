/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'mainGreen': '#00FF00',
        'custom-green': 'rgb(30, 255, 0)', 
        'custom-dark': 'hsl(216, 100%, 13%)', 
        'border-money': 'rgba(255, 255, 255, 0.1)',
      },
      borderWidth: {
        '1': '1px', 
      },
    },
  },
  plugins: [],
}

