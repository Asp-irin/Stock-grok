import { Text, TouchableOpacity, View } from 'react-native';

type CustomCheckboxProps = {
    checked: boolean;
    onPress: () => void;
};


const CustomCheckbox = ({ checked, onPress }: CustomCheckboxProps) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#000',
      backgroundColor: checked ? '#007AFF' : 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8
    }}>
      {checked && <Text style={{ color: 'white' }}>✓</Text>}
    </View>
  </TouchableOpacity>
);

export default CustomCheckbox;