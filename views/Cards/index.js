import React, { useContext, useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, View, Animated } from 'react-native';
import CardAdd from '../../components/cardAdd';
import Header from '../../widgets/header';

import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/card';
import { useUserStore } from '../../state/useUserStore';
import themeContext from '../../themes/theme';

const { width, height } = Dimensions.get('screen');
export default function ScreenCards() {

  const color = useContext(themeContext)
  const scrollY = useRef(new Animated.Value(0)).current;
  const cardHeight = 160; // Set your desired card width
  const cardMargin = 50; // Set your desired card width

  const cards = useUserStore((state) => state.cards);
  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  const renderAddCard = () =>
    SHOW ? (
      <View
        style={{
          width,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardAdd />
      </View>
    ) : (
      <></>
    );
  const renderCards = ({ item, index }) => {
    const inputRange = [
      (index - 3) * cardHeight,
      (index - 2) * cardHeight,
      (index - 1) * cardHeight,
      index * cardHeight,
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 0.9, 0.8, 1.2],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 1],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [-300 - cardMargin, -150 - cardMargin, - cardMargin + 50, 0],
      extrapolate: 'clamp',
    });

    const centeredIndex = Math.floor(scrollY._value / cardHeight); // Get the index of the centered item

    const zIndex = centeredIndex === index ? 1 : 0; // Set zIndex to 1 for centered card, otherwise 0

    const disable = false; // Disable the card if it's not the centered item

    return (
      <Animated.View
        style={[
          {
            // marginLeft: index === 0 ? 15 : 0,
            width,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ scale }, { translateY }],
            opacity,
            zIndex,
            marginBottom: cardMargin,
          },
        ]}
      >
        <Card item={item} disable={disable} />
      </Animated.View>
    );
  };
  // const renderListEnd = () => <View style={{ height: 120 }} />;
  const snapToAlignment = (index) => {
    const offset = index * cardHeight;

    Animated.spring(scrollY, {
      toValue: offset,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: color.background }]}>
      <Header title={'Cards'} subtitle={'Your Available Cards'} />
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        style={styles.cards}
        data={cards}
        renderItem={renderCards}
        ListEmptyComponent={renderAddCard}
        ListHeaderComponent={cards?.length > 0 ? renderAddCard() : null}
        snapToInterval={cardHeight}
        decelerationRate={0.9}
        onMomentumScrollEnd={(event) => {
          const offsetY = event.nativeEvent.contentOffset.y;
          snapToAlignment(Math.round(offsetY / cardHeight));
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cards: {
    width: width,
  },
});
