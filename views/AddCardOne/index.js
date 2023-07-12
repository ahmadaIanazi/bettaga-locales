import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Header from '../../widgets/header';
import CircleColorPicker from '../../widgets/circleColorPicker';
import CircleColorPick from '../../widgets/circleColorPick';

import bttns from '../../themes/buttons';
import txts from '../../themes/texts';

import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';
import { useUserStore } from '../../state/useUserStore';
import CircleButtonLogo from '../../widgets/circleButtonLogo';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useCardStore } from '../../state/useCardStore';
import CardInput from '../../widgets/cardInput';
import themeContext from '../../themes/theme';

export default function ScreenAddCardOne() {
  const color = useContext(themeContext)
  const { height, width } = Dimensions.get('screen');
  const user = useUserStore((state) => state.user);
  const cardName = useCardStore((state) => state.cardName);
  const cardLogo = useCardStore((state) => state.cardLogo);
  const cardColor = useCardStore((state) => state.cardColor);
  const cardColorLight = useCardStore((state) => state.cardColorLight);
  const cardColorDark = useCardStore((state) => state.cardColorDark);
  const cardColorIsDark = useCardStore((state) => state.cardColorIsDark);

  const widthProgress = '25%';
  const [submitButtonText, setsubmitButtonText] = useState('Skip');
  const navigation = useNavigation();
  const keyboardOpen = useKeyboard() > 0;

  useEffect(() => {
    if (!cardLogo && !cardName) {
      setsubmitButtonText('Skip');
    } else {
      setsubmitButtonText('Next');
    }
  }, [cardName, cardColor, cardLogo]);


  const navigateToCardTwo = () => {
    navigation.navigate('AddCardTwo');
  };

  return (
    <View style={{ backgroundColor: color.background, flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={'Your brand'} subtitle={'Setup your brand'} back={true} />
        <View style={{ marginHorizontal: 20, paddingVertical: 20 }}>
          {/* {!keyboardOpen && <Text style={{marginBottom: 10, textAlign:'center'}}>Upload logo transparent Background work best</Text>} */}
          <View style={[styles.cardBox, { backgroundColor: cardColor }]}>
            <View style={{ flexDirection: 'row' }}>
              <CircleButtonLogo />
              <CardInput />
            </View>
            <CircleColorPick />
            {!keyboardOpen && (
              <Text style={{ color: cardColorIsDark ? cardColorLight : cardColorDark }}>
                Tap to change color code
              </Text>
            )}
          </View>
        </View>
        <CircleColorPicker />
        <TouchableOpacity
          onPress={navigateToCardTwo}
          style={[bttns.dynamic, styles.bttns, { backgroundColor: color.primary }]}
        >
          <Text style={txts.action}>{submitButtonText}</Text>
          <FontAwesome style={styles.bttnIcon} name='arrow-right' size={24} color='white' />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    borderRadius: 40,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  progressWrap: {
    height: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressBar: { height: 5, backgroundColor: 'lightgrey', borderRadius: 5 },
  progressBarActive: { height: 5, backgroundColor: 'black', borderRadius: 5 },
  bttns: {
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    bottom: 60,
    width: '80%',
    alignSelf:'center',
    position:'absolute',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
});
