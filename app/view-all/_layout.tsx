import { Stack, useLocalSearchParams } from 'expo-router';

export default function ViewAllLayout() {
  const { type } = useLocalSearchParams();

return (
    <Stack
        screenOptions={{
            headerShown: true,
            headerStyle: { backgroundColor: '#121212'}, // set your desired background color here
            title: type === 'movers' ? 'Top Movers' : type === 'losers' ? 'Top Losers' : 'Stocks',
        }}
    />
);
}
