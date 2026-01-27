module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)', /* indigo-500 */
          foreground: 'var(--color-primary-foreground)' /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* violet-500 */
          foreground: 'var(--color-secondary-foreground)' /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* amber-500 */
          foreground: 'var(--color-accent-foreground)' /* gray-800 */
        },
        background: 'var(--color-background)', /* gray-50 */
        foreground: 'var(--color-foreground)', /* gray-900 */
        card: {
          DEFAULT: 'var(--color-card)', /* white */
          foreground: 'var(--color-card-foreground)' /* gray-700 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white */
          foreground: 'var(--color-popover-foreground)' /* gray-900 */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100 */
          foreground: 'var(--color-muted-foreground)' /* gray-500 */
        },
        border: 'var(--color-border)', /* gray-500 with opacity */
        input: 'var(--color-input)', /* white */
        ring: 'var(--color-ring)', /* indigo-500 */
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500 */
          foreground: 'var(--color-success-foreground)' /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500 */
          foreground: 'var(--color-warning-foreground)' /* gray-800 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500 */
          foreground: 'var(--color-error-foreground)' /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500 */
          foreground: 'var(--color-destructive-foreground)' /* white */
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'h1': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'h5': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'primary': '0 4px 12px rgba(99, 102, 241, 0.15), 0 2px 4px rgba(0, 0, 0, 0.04)',
        'primary-lg': '0 8px 24px rgba(99, 102, 241, 0.2), 0 4px 8px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px rgba(107, 114, 128, 0.1)',
        'card-hover': '0 4px 12px rgba(107, 114, 128, 0.15)'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      zIndex: {
        '900': '900',
        '1000': '1000',
        '1050': '1050',
        '1100': '1100'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ]
}