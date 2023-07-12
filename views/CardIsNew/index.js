import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useCardStore } from '../../state/useCardStore';
import { useNavigation } from '@react-navigation/native';
import { getPassImageByTemplateId } from '../../operations/get';
import Pass from '../../components/pass';

export default function ScreenCardIsNew({ card }) {
  const navigation = useNavigation();
  const {
    setIntroducing,
    cardState,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const [textAFadeAnim] = useState(new Animated.Value(0));
  const [cardFadeAnim] = useState(new Animated.Value(0));
  const [cardMoveAnim] = useState(new Animated.Value(0));
  const [textBFadeAnim] = useState(new Animated.Value(0));
  const [buttonFadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    animateComponents();
  }, []);

  const animateComponents = () => {
    Animated.sequence([
      // Text A and Card fade in
      Animated.timing(textAFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(cardFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      // Text A fade out
      Animated.timing(textAFadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 1600,
        useNativeDriver: true,
      }),

      // Card animate smoothly to the top
      Animated.timing(cardMoveAnim, {
        toValue: -150,
        duration: 2000,
        useNativeDriver: true,
      }),

      // Text B fade in
      Animated.timing(textBFadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }),

      // Button fade in
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /** UI */
  const cardId = card?.id;

  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;
  
  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkBlack;
  const buttonTextColor = isDarkWhite;
  const textColor = isDarkBlack;
  
  const imageSource = getPassImageByTemplateId(card?.templateId, 1);

  const main_label = 'Your card is live!'
  const Subtext_label = 'Now you can share it.'
  const button_label = 'Send to customers'
  const small_button_label = 'later'

  const navigateToPayment = () => {
    navigation.navigate('Paywall', { offer: 'giftOffer', cardId: cardId });
  };

  const navigateToSendCard = () => {
    setIntroducing(false)
    navigation.navigate('CardShareSend', { card: card });
  };

  const navigateToCardProfile = () => {
    setIntroducing(false)
  };


  /** RENDER */
    const SendToCustomerButton = () => {
        return (
          <TouchableOpacity
            onPress={navigateToSendCard}
            style={[
              styles.button,
              {
                backgroundColor: buttonColor,
              },
            ]}
          >
            <Text style={{ color: buttonTextColor, fontWeight: 'bold' }}>{button_label}</Text>
            <Ionicons name='share' size={24} color={buttonTextColor} />
          </TouchableOpacity>
        );
    };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundImageColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImageBackground
        source={imageSource}
        style={styles.backgroundImage}
        resizeMode='stretch'
        blurRadius={20} // Adjust the value for the desired blur intensity
      >
        <View
          style={{
            flex: 1,
            position: 'absolute',
            backgroundColor: backgroundOpacityColor,
            opacity: 0.6,
            ...StyleSheet.absoluteFill,
          }}
        />
        <Animated.View
          style={{
            opacity: textAFadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            top: 200,
          }}
        >
          <View
            style={{
              backgroundColor: 'lightgreen',
              marginEnd: 10,
              height: 20,
              width: 20,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: textColor }}>{main_label}</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: cardFadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateY: cardMoveAnim }],
            top: 250,
          }}
        >
          <Pass card={card} />
        </Animated.View>

        <Animated.View
          style={{
            opacity: textBFadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '60%',
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 24, color: textColor, opacity: 0.8 }}>{Subtext_label}</Text>
        </Animated.View>

        <Animated.View
          style={{
            opacity: buttonFadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            flex: 1,
          }}
        >
          <SendToCustomerButton />
          <TouchableOpacity onPress={navigateToCardProfile}>
            <Text style={{ fontSize: 24, color: textColor, opacity: 0.8 }}>
              {small_button_label}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        {/* Your content */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bttns: {
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
  },
  button: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    width: '70%',
    backgroundColor: 'black',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
});
