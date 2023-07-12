import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCardStore } from '../../state/useCardStore';
import { usePaywallStore } from '../../state/usePaywallStore';
import { hexOrRgbToRgba } from '../../utils/hexOrRgbToRgba';

const { height, width } = Dimensions.get('screen');

export default function PaywallAction({
  handlePurchase,
  handleRestore,
  loading,
}) {
  const navigateToTerms = () => navigation.navigate('Terms');
  const currentOffering = usePaywallStore((state) => state.currentOffering);
  const packages = currentOffering.availablePackages;

  const [picked, setPicked] = useState(1); // set the index of the ANNUAL option as default
  const navigation = useNavigation();

  /** CARD STATE */
  const {
    cardState,
    askForPayment,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const cardId = cardState.id;
  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;

  const backgroundColor = cardProfileColor;
  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkWhite;
  const buttonTextColor = isDarkBlack;
  const textColor = isDarkWhite;
  const opacityColor = hexOrRgbToRgba(buttonColor, 0.4);


  const handlePicked = (index) => {
    setPicked(index);
    const selectedOption = getSelectedOption(packages, index);
    console.log('Selected option:', selectedOption.identifier);
  };

  const getSelectedOption = (currentOffering, picked) => {
    return packages.find((offer, index) => index === picked);
  };

  const RadioButtons = () => {
    const availablePackages = currentOffering.availablePackages;
    return availablePackages.map((offer, index) => {
      const packageType = offer.packageType;
      const price = offer.product.price;
      const currency = offer.product.currencyCode;
      const priceToFixed = price.toFixed(2);
      const isPicked = index === picked;

      return (
        <View key={offer.identifier} style={styles.radioContainer}>
          <TouchableOpacity
            onPress={() => handlePicked(index)}
            style={[styles.radio, { backgroundColor: isPicked ? opacityColor : null }]}
          >
            <View
              style={[
                isPicked ? styles.check : styles.NotCheck,
                { backgroundColor: isPicked ? null : opacityColor, borderColor: buttonColor },
              ]}
            >
              {isPicked && <Ionicons name='checkmark-circle' size={20} color={buttonColor} />}
            </View>
            <View style={styles.radioText}>
              <Text
                style={{ color: isPicked ? buttonTextColor : buttonColor }}
              >{`${packageType}: `}</Text>
              <Text
                style={{ color: isPicked ? buttonTextColor : buttonColor }}
              >{`${priceToFixed} ${currency}`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const PurhaseButton = () => {
    return (
      <TouchableOpacity
        onPress={() => handlePurchase(picked, packages)}
        style={[styles.button, { backgroundColor: buttonColor }]}
      >
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: buttonTextColor }}>Continue</Text>
        <Text style={{ fontSize: 12, color: buttonTextColor }}>With 7 days free trail</Text>
      </TouchableOpacity>
    );
  };

  const Restore = () => {
    return (
      <TouchableOpacity
        onPress={() => handleRestore()}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 10,
          opacity: 0.8
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: textColor, marginHorizontal: 5 }}>
          Restore Purchase
        </Text>
        <Ionicons name='chevron-forward-circle' size={15} color={textColor} />
      </TouchableOpacity>
    );
  };

  const Terms = () => {
    return (
      <TouchableOpacity
        onPress={navigateToTerms}
        style={{
          marginHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          opacity: 0.5
        }}
      >
        <Text style={{ fontSize: 10, color: textColor }}>
          By using our service, you agree to our Terms and Policy.
        </Text>
        <Ionicons name='arrow-forward' size={15} color={textColor} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={textColor} />
        </View>
      ) : (
        <>
          <RadioButtons />
          <PurhaseButton />
          <Restore />
          <Terms />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    width: '80%',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'center',
  },
  radio: {
    flexDirection: 'row',
    borderRadius: 20,
    width: '60%',
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    alignSelf: 'center',
  },
  NotCheck: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginEnd: 15,
  },
  check: {
    marginEnd: 15,
  },
  radioText: {
    flex: 1,
    flexDirection: 'row',
  },
  radioContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
