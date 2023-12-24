import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export const ANTD_THEME = {
  hashed: false,
  token: {
    borderRadius: 4,
    colorBgLayout: colors.white,
    colorError: '#e29578',
    colorFillSecondary: '#FFE870',
    colorPrimary: '#EBA930',
    colorSuccess: '#83c5be',
    colorWarning: '#ffddd2',
    controlHeight: 36,
    fontFamily: ['Inter', ...defaultTheme.fontFamily.sans].join(', '),
    fontSize: 16,
  },
  components: {
    Form: {
      fontSize: 14,
      margin: 32,
    },
  },
}
