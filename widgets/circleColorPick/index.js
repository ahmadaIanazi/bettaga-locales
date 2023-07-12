import { StyleSheet, View, Dimensions, Text, TouchableOpacity, TextInput } from 'react-native';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useContext, useEffect, useState } from 'react';
import themeContext from '../../themes/theme';
import { Ionicons } from '@expo/vector-icons';
import { useCardStore } from '../../state/useCardStore';
import { colorIsDark } from '../../utils/colorIsDark';
import { validateColorCode } from '../../utils/validate';

const { height, width } = Dimensions.get('window');

const CircleColorPick = () => {
  const { cardState, cardColor, setCardColor, cardColorLight, cardColorDark, cardColorIsDark } =
    useCardStore();

  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [colorInput, setColorInput] = useState('#');
  const color = useContext(themeContext);
  const keyboardHeight = useKeyboard();
  const keyboardVisible = keyboardHeight > 0 ? true : false;
  const colorBackground = color.action;
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (colorInput?.length > 3) {
      setCardColor(colorInput);
    }
    if (colorInput?.length > 6) {
      const done = validateColorCode(colorInput);
      setDone(done);
    } else {
      setDone(false);
    }
  }, [colorInput]);

  return (
    <View>
      {openColorPicker ? (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={[
              styles.hero,
              {
                color: cardColorIsDark ? 'white' : 'black',
                backgroundColor: cardColor ? cardColor : colorBackground,
                height: keyboardVisible ? height / 8 : height / 4,
                width: keyboardVisible ? height / 8 : height / 4,
                fontSize: 24,
                fontWeight: 'bold',
                opacity: done ? 0.1 : 1,
              },
            ]}
            value={colorInput}
            onChangeText={setColorInput}
            placeholder='#HEX'
            maxLength={7}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setOpenColorPicker(true)}
          style={[
            styles.hero,
            {
              backgroundColor: cardColor ? cardColor : colorBackground,
              height: keyboardVisible ? height / 14 : height / 4,
              width: keyboardVisible ? height / 14 : height / 4,
            },
          ]}
        >
          <Ionicons name='contrast' size={34} color='black' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CircleColorPick;

const styles = StyleSheet.create({
  hero: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'black',
  },
});
