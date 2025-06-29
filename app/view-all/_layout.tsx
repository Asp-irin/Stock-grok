import { Stack } from 'expo-router';
import { useTheme } from '../../hooks/useStyle';

export default function ViewAllLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="[type]"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
          },
          headerTintColor: theme.text, // For back icon and buttons
        }}
      />
    </Stack>
  );
}
