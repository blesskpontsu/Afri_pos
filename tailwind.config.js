/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary: {
          default: 'var(--theme-color-primary)',
          contrast: 'var(--theme-color-primary-contrast)',
          shade: 'var(--theme-color-primary-shade)',
          tint: 'var(--theme-color-primary-tint)',
        },
        secondary: {
          default: 'var(--theme-color-secondary)',
          contrast: 'var(--theme-color-secondary-contrast)',
          shade: 'var(--theme-color-secondary-shade)',
          tint: 'var(--theme-color-secondary-tint)',
        },
        tertiary: {
          default: 'var(--theme-color-tertiary)',
          contrast: 'var(--theme-color-tertiary-contrast)',
          shade: 'var(--theme-color-tertiary-shade)',
          tint: 'var(--theme-color-tertiary-tint)',
        },
      }
    }
  },
  plugins: [],
}
