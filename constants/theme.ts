export const Colors = {
  light: {
    background: '#FFFFFF',
    card: '#FFF',
    border: '#E0E0E0',
    text: '#121212',
    secondaryText: '#757575',
    primary: '#5367ff',         // Teal-blue
    success: '#00C853',         // Green for gains
    danger: '#D32F2F',          // Red for losses
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    border: '#2C2C2C',
    text: '#F5F5F5',
    secondaryText: '#A0A0A0',
    primary: '#5367ff',
    success: '#00E676',
    danger: '#EF5350',
  },
} satisfies Record<Theme, Record<string, string>>;

export type Theme = 'light' | 'dark';
export type ThemeColorKey = keyof typeof Colors.light;
