import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useCardStore } from '../../state/useCardStore';

const { height, width } = Dimensions.get('screen');

export default function PaywallBullets({ showMore, offerData, handleShowMore}) {
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
  

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        {!showMore &&
          offerData.map((feature) => {
            return (
              <View key={feature.id} style={styles.feature}>
                <View style={styles.icon}>
                  <Ionicons name='arrow-forward' size={20} color={textColor} />
                </View>
                <View style={{ justifyContent: 'flex-start', flex: 4 }}>
                  <Text style={[styles.text, { color: textColor }]}>{feature.subject}</Text>
                </View>
              </View>
            );
          })}
      </View>
      {showMore && (
        <>
          <TouchableOpacity
            onPress={handleShowMore}
            style={[styles.closeShowmore, { backgroundColor: buttonColor }]}
          >
            <Ionicons name='arrow-down' size={50} color={buttonTextColor} />
          </TouchableOpacity>
          <ScrollView style={{ marginTop: 20 }}>
            {offerData.map((feature) => {
              return (
                <View key={feature.id} style={styles.feature}>
                  <View style={styles.icon}>
                    <Ionicons name='arrow-forward' size={20} color={textColor} />
                  </View>
                  <View style={{ justifyContent: 'flex-start', flex: 4 }}>
                    <Text style={{ color: textColor }}>{feature.text}</Text>
                  </View>
                </View>
              );
            })}
            <View style={{ height: 400 }} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  feature: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  icon: { flex: 1, alignItems: 'flex-end', paddingEnd: 15 },
  closeShowmore: {
    borderRadius: 30,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
