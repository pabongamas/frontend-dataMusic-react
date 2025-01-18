import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
			cardAlbum:'#353535',
  			liked: '#191414',
  			sub: '#b3b3b3',
  			rowList: '#121212',
  			rowListH: '#2A2A2A',
  			principalH: '#1f1f1f',
  			principal: {
  				'100': '#010101',
  				'200': '#010101',
  				'300': '#020202',
  				'400': '#020202',
  				'500': '#020202',
  				'550': '#191414',
  				'580': '#282828',
  				'600': '#353535',
  				'700': '#686868',
  				'800': '#9a9a9a',
  				'900': '#cdcdcd',
  				DEFAULT: '#020202'
  			},
  			dark_green: {
  				'100': '#020805',
  				'200': '#050f09',
  				'300': '#07170e',
  				'400': '#0a1f12',
  				'500': '#0d2818',
  				'600': '#236c40',
  				'700': '#39b169',
  				'800': '#74d29a',
  				'900': '#bae9cc',
  				DEFAULT: '#0d2818'
  			},
  			pakistan_green: {
  				'100': '#010e06',
  				'200': '#021d0b',
  				'300': '#032b11',
  				'400': '#033a16',
  				'500': '#04471c',
  				'600': '#099a3c',
  				'700': '#0eec5c',
  				'800': '#5bf591',
  				'900': '#adfac8',
  				DEFAULT: '#04471c'
  			},
  			sea_green: {
  				'100': '#011c0d',
  				'200': '#02371a',
  				'300': '#035327',
  				'400': '#046e34',
  				'500': '#058c42',
  				'600': '#08d162',
  				'700': '#2af787',
  				'800': '#71faaf',
  				'900': '#b8fcd7',
  				DEFAULT: '#058c42'
  			},
  			like: {
  				'100': '#042c14',
  				'200': '#095728',
  				'300': '#0d833c',
  				'400': '#11af50',
  				'500': '#16db65',
  				'600': '#3aec81',
  				'700': '#6bf0a1',
  				'800': '#9df5c0',
  				'900': '#cefae0',
  				DEFAULT: '#16db65'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		padding: {
  			'bottom-full': '100%'
  		},
  		screens: {
  			mobil: '50px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
