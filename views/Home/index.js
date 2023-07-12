import { Animated, Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/card';
import CardAdd from '../../components/cardAdd';
import Push from '../../components/push';
import StatSmall from '../../components/statSmall';
import { getTotalFromCards } from '../../operations/get';
import { useUserStore } from '../../state/useUserStore';
import { getOnlyNumber } from '../../utils/getOnlyNumber';
import Header from '../../widgets/header';
import Section from '../../widgets/section';
import { Div, Divider, H, Icon, P, ProgressBar } from '../../../customized';
import { useContext, useEffect, useRef } from 'react';
import LOCALIZATION from '../../locales';
import themeContext from '../../themes/theme';

const { height, width } = Dimensions.get('screen');

export default function ScreenHome() {
  const l = useContext(LOCALIZATION);
  const color = useContext(themeContext);
  const scrollX = useRef(new Animated.Value(0)).current;
  const cardWidth = 270; // Set your desired card width
  const cardMargin = 10; // Set your desired card margin

  const renderAddCard = () => (SHOW ? <CardAdd /> : <></>);

  const renderCards = ({ item, index }) => {
    const inputRange = [
      (index - 3) * cardWidth,
      (index - 2) * cardWidth,
      (index - 1) * cardWidth,
      index * cardWidth,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.9, 0.8, 0.85],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 1],
      extrapolate: 'clamp',
    });

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [-width - 20, -240, 20, 0],
      extrapolate: 'clamp',
    });

    const centeredIndex = Math.floor(scrollX._value / cardWidth); // Get the index of the centered item

    const zIndex = centeredIndex === index ? 1 : 0; // Set zIndex to 1 for centered card, otherwise 0

    const disable = false; // Disable the card if it's not the centered item

    return (
      <Animated.View
        style={[
          {
            marginLeft: index === 0 ? 15 : 0,
            transform: [{ scale }, { translateX }],
            opacity,
            zIndex,
          },
        ]}
      >
        <Card item={item} disable={disable} />
      </Animated.View>
    );
  };

  const user = useUserStore((state) => state.user);
  const cards = useUserStore((state) => state.cards);

  /** CARD STATS */
  // Extract cardStats from the cards array
  const cardStats = cards.map((card) => {
    return {
      cardId: card.id,
      cardName: card.cardName,
      cardColor: card.cardColor,
      backgroundColor: card.backgroundColor,
      customersCount: card.customersCount,
      transactionCount: card.transactionCount,
      messagesCount: card.messagesCount,
      expired: card.expired,
      expiryDate: card.expiryDate,
      active: card.active,
      initialValue: card.initialValue,
      cardMaxValue: card.cardMaxValue,
      unit: card.cardUnit,
      trial: card.trial,
      templateId: card.templateId,
      totalMaxValueCount: card.totalMaxValueCount,
      totalValueCount: card.totalValueCount,
      trialDuration: card.trialDuration,
      paid: card.paid,
    };
  });

  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  const TotalCustomers = getTotalFromCards(cards, 'customersCount');
  const TotalTransactions = getTotalFromCards(cards, 'transactionCount');

  const snapToAlignment = (index) => {
    const offset = index * cardWidth;

    Animated.spring(scrollX, {
      toValue: offset,
      useNativeDriver: true,
    }).start();
  };

  const StatsA = () => {
    const totalCustomersCount = cardStats.reduce((total, card) => total + card.customersCount, 0);

    return (
      <Div>
        <H>Total Customers Count: {totalCustomersCount}</H>
      </Div>
    );
  };

  const StatsB = () => {
    const totalTransactionsCount = cardStats.reduce(
      (total, card) => total + card.transactionCount,
      0
    );

    return (
      <Div>
        <H>Total Transactions Count: {totalTransactionsCount}</H>
      </Div>
    );
  };

  const StatsC = () => {
    const totalMessagesCount = cardStats.reduce((total, card) => total + card.messagesCount, 0);

    return (
      <Div color={color.secondary} s='p-10 pt-20 br-20 ms-20 me-20 h-240 nw-100 jb ac'>
        <Icon name='bell' />

        <H>{totalMessagesCount}</H>

        <P s='xs'>MESSAGES</P>
      </Div>
    );
  };

  const StatsD = () => {
    const expiredCards = cardStats.filter((card) => card.expired);

    return (
      <Div s='row'>
        {expiredCards?.length > 0
          ? expiredCards.map((card) => (
              <Div color={card.backgroundColor} s='p-10 pt-20 br-20 me-20 h-240 nw-100 jb ac'>
                <Icon size={32} name='close' />
                <H key={card.cardName}>{card.cardName}</H>
                <P s='xs'>Expired</P>
              </Div>
            ))
          : null}
      </Div>
    );
  };

  const StatsE = () => {
    const deactivatedCards = cardStats.filter((card) => !card.active);

    return (
      <Div s='row'>
        {deactivatedCards?.length > 0
          ? deactivatedCards.map((card) => (
              <Div color={card.backgroundColor} s='p-10 pt-20 br-20 me-20 h-240 nw-100 jb ac'>
                <Icon name='power-off' />
                <H key={card.cardName}>{card.cardName}</H>
                <P s='xs'>Deactivated</P>
              </Div>
            ))
          : null}
      </Div>
    );
  };

  const StatsF = () => {
    return (
      <Div s='row'>
        {cardStats.map((card) => (
          <Div color={card.backgroundColor} s='p-10 pt-20 br-20 mh-10 h-240 nw-100 jb ac'>
            <Div s='row ac'>
              <Icon name='pie-chart' />
            </Div>
            <ProgressBar total={card.initialValue} value={card.initialValue} />
            <Div s='row ac'>
              <H s='me-5'>{card.totalMaxValueCount}</H>
              <P>{card.unit}</P>
            </Div>
            <P s='xs'>{card.cardName}</P>
          </Div>
        ))}
      </Div>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: color.background, direction: l.direction }}>
      <SafeAreaView style={styles.main}>
        <Header
          title={l.welcome}
          subtitle={user.email}
          buttonName={l.settings}
          buttonIcon={'settings'}
          to={'settings'}
          data={user}
        />
        {SHOW && <Push cards={cards} />}
        <View>
          <Section title={l.stats} subtitle={l.home_section_subtitle} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <StatSmall state={'customers'} value={TotalCustomers} />
            <StatSmall state={'transactions'} value={TotalTransactions} />
            {/* 
            <StatsA />
            <StatsB />
            */}
            <StatsC />
            <StatsD />
            <StatsE />
            <StatsF />
          </ScrollView>
        </View>
        <View>
          <Section title={'Cards'} subtitle={'Your Cards'} />
          <Animated.FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            style={styles.cards}
            data={cards}
            renderItem={renderCards}
            ListEmptyComponent={renderAddCard}
            ListFooterComponent={cards?.length > 0 ? renderAddCard() : null}
            snapToInterval={cardWidth}
            decelerationRate={0.9}
            onMomentumScrollEnd={(event) => {
              const offsetX = event.nativeEvent.contentOffset.x;
              snapToAlignment(Math.round(offsetX / cardWidth));
            }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
              useNativeDriver: true,
            })}
            scrollEventThrottle={16}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
    height: height,
  },
  cards: {
    width: width,
    paddingBottom: 10,
  },
});
