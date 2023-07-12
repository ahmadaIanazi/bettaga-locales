import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import React, { useContext } from 'react';
import { getPassImageByTemplateId } from '../../operations/get';
import themeContext from '../../themes/theme';
import { colorIsDark } from '../../utils/validate';

const { width } = Dimensions.get('screen');
export default function Pass({ card }) {
  const cardWidth = width * 0.8;
  const passImageLevel = getPassImageByTemplateId(card?.templateId, 1);
  const backgroundColor = card?.passJson?.backgroundColor;
  const textColor = card?.passJson?.foregroundColor;
  const labelColor = card?.passJson?.labelColor;
  const color = useContext(themeContext);
  const theme = color.theme;
  const isDark = colorIsDark(backgroundColor);
  const isThemeAndCardDark = isDark && theme === 'dark';

  return (
    <View
      style={{
        width: cardWidth,
        height: cardWidth,
        backgroundColor: backgroundColor,
        borderColor: 'white',
        borderWidth: isThemeAndCardDark ? 1 : 0,
        zIndex: 100,
        borderRadius: 20,
        marginBottom: 50,
        opacity: 1,
        elevation: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 20,
      }}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image style={styles.logo} source={{ uri: card?.logo }} />
        </View>
        <View style={styles.logoTextWrap}>
          <Text style={{ color: textColor, fontSize: 12, textAlign: 'left', fontWeight: 'bold' }}>{card?.passJson?.logoText}</Text>
        </View>

        <View style={styles.headerFieldWrap}>
          <Text style={[styles.label, { color: labelColor }]}>{card?.passJson?.storeCard?.headerFields[0].label}</Text>
          <Text style={{ color: textColor }}>{card?.passJson?.storeCard?.headerFields[0].value}</Text>
        </View>
      </View>
      <View style={styles.strip}>
        <Image style={styles.strip} source={passImageLevel} />
      </View>
      <View style={styles.primaryFieldRow}>
        <Text style={[styles.label, { color: labelColor }]}>{card?.passJson?.storeCard?.secondaryFields[0].label}</Text>
        <Text style={[styles.label, { color: labelColor }]}>{card?.passJson?.storeCard?.secondaryFields[1].label}</Text>
      </View>
      <View style={styles.primaryFieldRow}>
        <Text  style={{ color: textColor }}>{card?.passJson?.storeCard?.secondaryFields[0].value}</Text>
        <Text  style={{ color: textColor }}>{card?.passJson?.storeCard?.secondaryFields[1].value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  logo: {
    minWidth: 34,
    resizeMode: 'contain',
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
