import { View } from 'react-native';
import Passes from '../../components/Passes';
import { useContext } from 'react';
import themeContext from '../../themes/theme'

export default function ModalScanned({ route: { params: { passes }} }) {
  const color = useContext(themeContext)

  return (
    <View style={{ flex: 1, backgroundColor: color.background }}>
      <Passes passes={passes} />
    </View>
  );
}
