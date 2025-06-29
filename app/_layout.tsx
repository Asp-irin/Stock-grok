import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useThemeStore } from '@/store/useThemeStore';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const { theme } = useThemeStore();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
  <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="stockDetail" options={{ headerShown: false }} />
        <Stack.Screen
          name="view-all"
          options={{ headerShown: false, title: 'View All' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={theme=== "dark" ? "light" : "dark"} />
      </>
  );
}
