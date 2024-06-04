import { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  // algorithm: theme.darkAlgorithm,
  components: {
    Button: {
      fontWeight: '500'
    }
  },
  token: {
    colorText: 'hsl(222.2 47.4% 11.2%)',
    colorTextSecondary: 'hsl(215.4 16.3% 46.9%)',
    colorBorder: 'hsl(214.3 31.8% 91.4%)',
    fontFamily:
      "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
  }
};
