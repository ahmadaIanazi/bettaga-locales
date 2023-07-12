import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useCardStore } from '../../state/useCardStore';
import themeContext from '../../themes/theme';

const { height, width } = Dimensions.get('screen');

export default function PushLatest({ seeAllPush, cards }) {
  const color = useContext(themeContext)
  const { cardState, messages, cardProfileColorIsDark, cardProfileColorLight, cardProfileColorDark } =
    useCardStore();

  // UI //
  const cardName = cardState?.cardName
  const isDarkBlack = cardProfileColorIsDark ? 'black' : 'white';
  const isDarkWhite = cardProfileColorIsDark ? 'white' : 'black';
  const isDarkLight = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;
  const isDarkDark = cardProfileColorIsDark ? cardProfileColorDark : cardProfileColorLight;

  const backgroundColor = isDarkLight;
  const backgroundImageColor = isDarkLight;
  const backgroundOpacityColor = isDarkLight;
  const buttonColor = isDarkBlack;
  const buttonTextColor = isDarkWhite;
  const textColor = isDarkBlack;

  const EMPTY_TEXT = 'Send your first notification !';

  const LatestPush = ({ item }) => {

    return (
          <View style={styles.pushlatest}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View
                style={{ height: 20, width: 20, backgroundColor: color.light, marginEnd: 10 }}
              />
              <Text style={{ fontWeight: 'bold', color: textColor }}>{cardName}</Text>
            </View>
            <Text style={{ color: textColor , margin: 5}}>{item.message}</Text>
          </View>
    )
  }
  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      <FlatList
        horizontal={seeAllPush ? false : true }
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.9}
        style={styles.flatlist}
        data={messages}
        ListEmptyComponent={() => (
          <Text style={{ color: textColor, textAlign: 'center' }}>{EMPTY_TEXT}</Text>
        )}
        renderItem={LatestPush}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    width,
  },
  pushlatest:{
    width: width,
    padding: 20,
    justifyContent:'center',
    alignItems:'flex-start',
  },
});
