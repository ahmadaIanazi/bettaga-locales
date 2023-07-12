import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import themeContext from '../../themes/theme';
import { useCardStore } from '../../state/useCardStore';

export default function PhoneForm({ card }) {
  const color = useContext(themeContext);
  const {
    cardState,
    cardProfileColor,
    cardProfileColorIsDark,
    cardProfileColorLight,
    cardProfileColorDark,
  } = useCardStore();

  const imageSource = require('../../../assets/img/mobile.png');
  const CARD_LOGO_SRC = card?.logo;
  const GET_COLOR = cardProfileColorIsDark ? cardProfileColorLight : cardProfileColorDark;

  /** UI */
  const WEBSITE_PLACEHOLDER = 'enroll.bettaga.com'; // This is for UI use only.
  const Card_Color = card?.cardColor;
  const Text_Color = card?.textColor;
  const Label_Welcome = card?.labelWelcome;
  const Label_Text = card?.labelText;
  const Placeholder_Name = card?.placeholderName;
  const Placeholder_Code = '+966';
  const Placeholder_Phone = card?.placeholderPhone;
  const Submit_Background = card?.submitBackground;
  const Submit_Text = card?.submitText;
  const Submit_Text_Color = card?.submitTextColor;
  const Thankyou_Text = card?.thankyouText;
  const Waiting_Text = card?.creatingCardText;

  return (
    <View style={styles.previewWrap}>
      <Image
        onError={() => <ActivityIndicator size='large' color='black' />}
        onProgress={() => <ActivityIndicator size='large' color='black' />}
        onLoad={() => <ActivityIndicator size='large' color='black' />}
        onLayout={() => <ActivityIndicator size='large' color='black' />}
        source={imageSource}
        style={styles.image}
      />
      <View style={[styles.iphone, { backgroundColor: Card_Color }]}>
        <View style={styles.iphoneHero}>
          <Image style={styles.hero} source={{ uri: CARD_LOGO_SRC }} />
        </View>
        <View style={styles.form}>
          <Text style={{ color: Text_Color, fontWeight: 'bold', fontSize: 12 }}>
            {Label_Welcome}
          </Text>
          <Text style={{ color: Text_Color, fontSize: 8 }}>{Label_Text}</Text>
          <View style={[styles.inputName, { backgroundColor: Text_Color }]}>
            <Text style={{ color: Card_Color, fontSize: 8 }}>{Placeholder_Name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.inputCode, { backgroundColor: Text_Color }]}>
              <Text style={{ color: Card_Color, fontSize: 8 }}>{Placeholder_Code}</Text>
            </View>
            <View style={[styles.inputPhone, { backgroundColor: Text_Color }]}>
              <Text style={{ color: Card_Color, fontSize: 8 }}>{Placeholder_Phone}</Text>
            </View>
          </View>
          <View style={[styles.submit, { backgroundColor: GET_COLOR }]}>
            <Text style={{ color: Card_Color, fontSize: 10 }}>{Submit_Text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iphone: {
    position: 'absolute',
    height: 340,
    borderRadius: 30,
    width: 151,
    paddingHorizontal: 4,
  },
  iphoneTop: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 10,
  },
  iphoneBar: {
    width: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  iphoneHero: {
    marginTop: 40,
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
  },
  hero: {
    width: '100%',
    resizeMode: 'contain',
    height: 60,
  },
  form: {
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  inputName: {
    marginTop: 10,
    width: '90%',
    borderRadius: 20,
    justifyContent: 'flex-start',
    marginVertical: 4,
    padding: 2,
    paddingVertical: 5,
    paddingStart: 5,
  },
  inputCode: {
    width: '20%',
    paddingVertical: 5,

    justifyContent: 'flex-start',
    marginVertical: 4,
    padding: 2,
    paddingStart: 5,
    marginEnd: 2,
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
  },
  inputPhone: {
    width: '70%',
    paddingVertical: 5,

    justifyContent: 'flex-start',
    marginVertical: 4,
    padding: 2,
    paddingStart: 5,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  submit: {
    alignSelf: 'center',
    position: 'absolute',
    width: '90%',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 5,
  },
  image: {
    resizeMode: 'contain',
    zIndex: 10,
    height: 340,
  },
  previewWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
