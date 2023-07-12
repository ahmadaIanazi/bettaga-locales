import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import themeContext from '../../themes/theme';
import { hexOrRgbToRgba } from '../../utils/hexOrRgbToRgba';

export default function LivepreviewButtons({ buttonColor, textColor}) {

  const color = useContext(themeContext);
  const opacityColor = hexOrRgbToRgba(buttonColor, 0.4);
  console.log('opacityColor', opacityColor);

  return (
    <View style={styles.buttonsContainer}>
      <View style={[styles.button, { backgroundColor: buttonColor }]}>
        <Ionicons name='create-outline' size={24} color={textColor} />
        <Text style={{ color: textColor }}>Edit</Text>
      </View>
      <View style={[styles.circleButton, { backgroundColor: opacityColor }]}>
        <Ionicons name='eye' size={24} color={textColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    marginHorizontal:10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  circleButton: {
    marginHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});