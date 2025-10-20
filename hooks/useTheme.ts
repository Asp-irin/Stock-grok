import { useThemeStore } from '@/store/useThemeStore';
import { Colors, Theme } from '@/constants/theme';

export const useTheme = (): typeof Colors.dark & { theme: Theme } => {
  const theme = useThemeStore((state) => state.theme);
  return {
    ...Colors[theme],
    theme,
  };
};
