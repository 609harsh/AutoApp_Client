/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 47.4% 11.2%)',
        muted: 'hsl(210 40% 96.1%)',
        mutedForeground: 'hsl(215.4 16.3% 46.9%)',
        primary: '#475569',
        secondary: '#CBD5E1',
        border: 'hsl(214.3 31.8% 91.4%)'
      }
    },
    screens: {
      // max-width
      'max-2xl': { max: '1367px' },
      'max-xl': { max: '1280px' },
      'max-lg': { max: '1024px' },
      'max-md': { max: '768px' },
      'max-sm': { max: '640px' },

      //min-width
      xs: '480px',
      sm: '641px',
      md: '769px',
      lg: '1025px',
      xl: '1281px',
      '2xl': '1537px'
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: ['prettier-plugin-tailwindcss']
};
