/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// hooks/useThemeColor.ts
import { useColorScheme } from 'react-native';
import { Colors, ThemeColorKey } from '@/constants/theme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ThemeColorKey
): string {
  const theme = useColorScheme() ?? 'light';
  return props[theme] ?? Colors[theme][colorName];
}
