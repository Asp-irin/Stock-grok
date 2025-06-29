import { useThemeStore } from '@/store/useThemeStore';
import { Colors, ThemeColorKey } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorKey
): string {
  const theme = useThemeStore((state) => state.theme);
  return props[theme] ?? Colors[theme][colorName];
}
