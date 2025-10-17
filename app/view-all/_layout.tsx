import { Stack } from 'expo-router';

export default function ViewAllLayout() {
  return (
    <Stack>
      <Stack.Screen name="[type]" options={{ headerShown: true, title: 'Some' }} />
    </Stack>
  );
}
