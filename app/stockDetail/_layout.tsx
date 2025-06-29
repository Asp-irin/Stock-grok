import { Stack } from 'expo-router';

export default function StockDetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[symbol]"
        options={{ title: '', headerShown: false }}
      />
    </Stack>
  );
}
