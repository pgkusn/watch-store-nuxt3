module.exports = {
  theme: {
    extend: {
      colors: ({ colors }) => ({
        'default-gray': colors.gray,
        gray: '#E0E0E0',
        'dark-gray': '#8D8D8D',
        'blue-gray': '#818A91',
        'coral-black': '#59656F',
        'raisin-black': '#1D1E2C',
        'border-color': '#CED4DA',
      }),
      container: {
        center: true,
        padding: '15px',
      },
      spacing: {
        15: '3.75rem',
      },
      backgroundPosition: {
        '-top-140px': 'center top -140px',
        'top-60%': 'center top 60%',
      },
    },
  },
}
