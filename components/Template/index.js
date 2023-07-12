import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useCardStore } from '../../state/useCardStore';
import { useEffect, useState } from 'react';
import { colorIsDark } from '../../utils/colorIsDark';

export default function Template({ item, cardMargin, cardWidth, translateX, opacity , setBackgroundColor}) {
  const cardColor = useCardStore((state) => state.cardColor);
  const cardName = useCardStore((state) => state.cardName);
  const cardLogo = useCardStore((state) => state.cardLogo);
  const logoSrc = item.logo;
  const stripSrc = item.strip;
  const [cardColorAvailable, setCardColorAvailable] = useState(false);
  const [cardNameAvailable, setCardNameAvailable] = useState(false);
  const [cardLogoAvailable, setCardLogoAvailable] = useState(false);
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (cardColor?.length >= 3) {
      setCardColorAvailable(true);
      setBackgroundColor(cardColor);
      setDark(colorIsDark(cardColor));
    } else {
      setBackgroundColor(item.backgroundColor);
    }
    if (cardName){
      setCardNameAvailable(true)
    }
    if(cardLogo){
      setCardLogoAvailable(true)
    }
  }, [cardColor, cardName, cardLogo]);

  return (
    <View style={styles.main}>
      <Animated.View
        style={{
          width: cardWidth,
          height: cardWidth,
          backgroundColor: cardColorAvailable ? cardColor : item.backgroundColor,
          zIndex: 1,
          borderRadius: 20,
          marginHorizontal: cardMargin,
          marginBottom: 50,
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
            <Image style={styles.logo} source={cardLogoAvailable ? { uri: cardLogo} : logoSrc } />
          </View>
          <View style={styles.logoTextWrap}>
            <Text
              style={{
                color: dark ? 'white' : 'black',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 12,
              }}
            >
              {cardNameAvailable ? cardName : item.logoText}
            </Text>
          </View>
          <View style={styles.headerFieldWrap}>
            <Text style={[styles.label, { color: dark ? 'white' : 'black' }]}>
              {item.headerlabel}
            </Text>
            <Text style={[styles.content, { color: dark ? 'white' : 'black' }]}>
              {item.headervalue}
            </Text>
          </View>
        </View>
        <View style={styles.strip}>
          <Image style={styles.strip} source={stripSrc} />
        </View>
        <View style={styles.primaryFieldRow}>
          <Text style={[styles.label, { color: dark ? 'white' : 'black' }]}>
            {item.secondlabel}
          </Text>
          <Text style={[styles.label, { color: dark ? 'white' : 'black' }]}>{item.thirdlabel}</Text>
        </View>
        <View style={styles.primaryFieldRow}>
          <Text style={[styles.content, { color: dark ? 'white' : 'black' }]}>
            {item.secondvalue}
          </Text>
          <Text style={[styles.content, { color: dark ? 'white' : 'black' }]}>
            {item.thirdvalue}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },
  logo: {
    margin: 4,
    width: 24,
    height: 24,
    resizeMode: 'contain',
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    resizeMode: 'contain',
    height: 92,
  },
  primaryFieldRow: {
    marginVertical: 2,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 8,
  },
  content: {
    fontSize: 10,
  },
});
