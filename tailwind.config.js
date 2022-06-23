module.exports = {
    darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
       container: {
      center: true,
        padding: '2rem',
    },
    extend: {
      colors:{
        primary:'#8960CB',
        secondary:'#DD5DB6',
        accent:'#B7A0D4',
        custom_black:'#1B1C1E',
        custom_white:'#FDF7FF',
        
      
      }
    },
  },
  plugins: [
        require('@tailwindcss/line-clamp'),
  ],
}
