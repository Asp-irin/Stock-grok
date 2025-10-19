export const Colors = {
  light: {
    background: '#FFFFFF',
    card: '#F9F9F9',
    text: '#1E2329',
    secondaryText: '#5F6368',
    primary: '#3D5AFE',       // Light mode primary (highlight blue)
    success: '#00C853',       // Bright green (gains)
    danger: '#E53935',        // Standard red
    border: '#E0E0E0',
    icon: '#1E2329',
  },
  dark: {
    background: '#0E0F13',
    card: '#1C1D21',
    text: '#FFFFFF',
    secondaryText: '#A0A3AD',
    primary: '#3D5AFE',       // Groww blue accent
    success: '#00C853',       // Bright green (gains)
    danger: '#EF5350',        // Vibrant red (losses)
    border: '#2C2D31',
    icon: '#FFFFFF',
  },
} as const;

export type Theme = 'light' | 'dark';
export type ThemeColorKey = keyof typeof Colors.light;
