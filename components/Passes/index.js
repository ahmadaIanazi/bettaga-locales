import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { useKeyboard } from '../../hooks/useKeyboard';
import { toNameFromTemplateId } from '../../operations/to';
import { getPassImageByTemplateId } from '../../operations/get';
import { getPassCategoryByTemplateId } from '../../operations/get';
import PassAction from '../PassAction';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeContext from '../../themes/theme';
import { colorIsDark } from '../../utils/validate';

const { height, width } = Dimensions.get('screen');
export default function Passes({ passes }) {
  const color = useContext(themeContext)
  const theme = color.theme;
  const [data, setData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const keyboard = useKeyboard();
  const keyboardOpen = keyboard > 0;

  useLayoutEffect(() => {
    setData(passes);
  }, [passes]);

  const cardWidth = width * 0.8;
  const cardMargin = (width - cardWidth) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollIndicatorX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView>
      <Animated.FlatList
        data={data}
        horizontal
        style={{ top: -20, height: 40, marginTop: 20, alignSelf: 'center'}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.serialNumber}
        renderItem={({ item, index }) => {
          const opacity = index === selectedCardIndex ? 1 : 0.4;
          const borderWidth = index === selectedCardIndex ? 2 : 0;

          return (
            <Animated.View
              style={{
                width: 30,
                height: 30,
                backgroundColor: item?.passJson?.backgroundColor,
                zIndex: 1,
                borderRadius: 20,
                marginHorizontal: 20,
                marginBottom: 20,
                opacity,
                borderWidth,
                borderColor: color.border
              }}
            />
          );
        }}
      />

      <Animated.FlatList
        data={data}
        style={{ height: '100%' }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item?.serialNumber}
        snapToAlignment='center'
        snapToInterval={cardWidth + cardMargin * 2}
        decelerationRate={0.9}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
          listener: (event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / (cardWidth + cardMargin * 2));
            setSelectedCardIndex(index);
          },
        })}
        renderItem={({ item, index }) => {
          const passTypeHuman = toNameFromTemplateId(item?.passType);
          const passImageLevel = getPassImageByTemplateId(item?.passType, item?.level);
          const passCategory = getPassCategoryByTemplateId(item?.passType);
          const backgroundColor = item?.passJson?.backgroundColor;
          const isDark = colorIsDark(backgroundColor)
          const textColor = item?.passJson?.foregroundColor;
          const labelColor = item?.passJson?.labelColor
          const isThemeAndCardDark = isDark && theme === 'dark';

          console.log('PASSES ACTION ITEM PASS IS DARK?', isDark, backgroundColor)
          const inputRange = [
            (index - 1) * (cardWidth + cardMargin * 2),
            index * (cardWidth + cardMargin * 2),
            (index + 1) * (cardWidth + cardMargin * 2),
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-cardWidth / 5, 0, cardWidth / 5],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
          });

          return (
            <>
              <View style={styles.main}>
                <View style={styles.passTypeWrap}>
                  <Text style={{ color: textColor, fontWeight: 'bold' }}>{passTypeHuman}</Text>
                </View>
                <Animated.View
                  style={{
                    width: cardWidth,
                    height: cardWidth,
                    backgroundColor: backgroundColor,
                    borderColor: 'white',
                    borderWidth: isThemeAndCardDark ? 1 : 0,
                    zIndex: 1,
                    borderRadius: 20,
                    marginHorizontal: cardMargin,
                    marginBottom: 20,
                    transform: [{ translateX }],
                    opacity,
                    elevation: 5,
                    shadowColor: '#000000',
                    shadowOpacity: 0.1,
                    shadowOffset: {
                      width: 0,
                      height: 10,
                    },
                    shadowRadius: 10,
                  }}
                >
                  <View style={styles.header}>
                    <View style={styles.logo}>
                      <Image style={styles.logo} source={{ uri: item?.logo }} />
                    </View>
                    <View style={styles.logoTextWrap}>
                      <Text style={{ textAlign: 'left', color: textColor, fontWeight: 'bold' }}>
                        {item?.passJson?.logoText}
                      </Text>
                    </View>
                    <View style={styles.headerFieldWrap}>
                      <Text style={[styles.label, { color: labelColor }]}>
                        {item?.passJson?.storeCard?.headerFields[0].label}
                      </Text>
                      <Text style={{ color: textColor }}>
                        {item?.passJson?.storeCard?.headerFields[0].value}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.strip}>
                    <Image style={styles.strip} source={passImageLevel} />
                  </View>
                  <View style={styles.primaryFieldRow}>
                    <Text style={[styles.label, { color: labelColor }]}>
                      {item?.passJson?.storeCard?.secondaryFields[0].label}
                    </Text>
                    <Text style={[styles.label, { color: labelColor }]}>
                      {item?.passJson?.storeCard?.secondaryFields[1].label}
                    </Text>
                  </View>
                  <View style={styles.primaryFieldRow}>
                    <Text style={{ color: textColor }}>
                      {item?.passJson?.storeCard?.secondaryFields[0].value}
                    </Text>
                    <Text style={{ color: textColor }}>
                      {item?.passJson?.storeCard?.secondaryFields[1].value}
                    </Text>
                  </View>
                </Animated.View>
                <View
                  style={[
                    styles.actionWrap,
                    {
                      backgroundColor: color.background,
                      bottom: keyboardOpen ? keyboard + 0 : 30,
                      shadowOpacity: keyboardOpen ? 0.5 : 0,
                    },
                  ]}
                >
                  <PassAction item={item} passCategory={passCategory} />
                </View>
              </View>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative',
  },
  passTypeWrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionWrap: {
    position: 'absolute',
    zIndex: 99,
    width: width,
    paddingVertical: 10,
    alignSelf: 'center',

    backgroundColor: 'white',

    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -50,
    },
    shadowRadius: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  logo: {
    width: 34,
    height: 34,
  },
  logoTextWrap: {
    paddingStart: 10,
    flex: 1,
  },
  headerFieldWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  strip: {
    height: 100,
    width: '100%',
  },
  primaryFieldRow: {
    marginVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 10,
  },
});
