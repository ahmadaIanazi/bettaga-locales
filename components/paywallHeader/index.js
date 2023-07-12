import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getPassImageByTemplateId } from '../../operations/get';
import { toNameFromTemplateId } from '../../operations/to';
import { useCardStore } from '../../state/useCardStore';
import { hexToRgba } from '../../utils/hexToRgba';
import Header from '../../widgets/header';

const { width, height } = Dimensions.get('screen');

export default function PaywallHeader({ offerTitle, showMore, handleShowMore }) {
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
  const cardTemplate = cardState.templateId;
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

  const imageSource = getPassImageByTemplateId(cardTemplate, 1);
  const offerName = toNameFromTemplateId(cardTemplate) + ' Card Builder';
  const actionButon = 'Learn More';

  const linear = [hexToRgba(backgroundColor, 0), backgroundColor];

  return (
    <>
      <Image
        style={[styles.image, { opacity: showMore ? 0.1 : 1, height: showMore ? height : 300 }]}
        onLoad={() => <ActivityIndicator />}
        onError={() => <></>}
        source={imageSource}
      />
      {!showMore && <LinearGradient colors={linear} style={styles.linear} />}
      {!showMore && <Header to={'goBack'} buttonIcon={'close-circle'} />}
      {!showMore && (
        <View style={{ marginTop: 160 }}>
          <Text style={[styles.title, { color: textColor }]}>{offerName}</Text>
          <Text style={[styles.subtext, { color: textColor }]}>{offerTitle.subtitle}</Text>
          <TouchableOpacity
            onPress={handleShowMore}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={[styles.learnMore, { color: textColor, opacity: 0.5 }]}>
              {actionButon}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    top: 0,
    height: 300,
    position: 'absolute',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  linear: {
    position: 'absolute',
    height: 200,
    width: width,
    top: 100,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  learnMore: {
    fontWeight: 'bold',
  },
  subtext: {
    textAlign: 'center',
  },
});
