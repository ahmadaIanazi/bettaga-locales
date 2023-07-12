import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CardSettingsUploadLogo from '../../widgets/cardSettingsUploadLogo';

import bttns from '../../themes/buttons';
import txts from '../../themes/texts';

import { FontAwesome } from '@expo/vector-icons';
import {
  Alert,
  Box,
  Div,
  Divider,
  Input,
  L,
  P,
  ShadeBottom,
  T,
  Tap,
  Toast
} from '../../../customized';
import Pass from '../../components/pass';
import { toNameFromTemplateId } from '../../operations/to';
import { updateCard } from '../../operations/update';
import { useCardStore } from '../../state/useCardStore';
import themeContext from '../../themes/theme';
import { hexOrRgbToRgb } from '../../utils/hexOrRgbToRgb';
import { formatColorCode } from '../../utils/formatColorCode';
import { validateColorCode } from '../../utils/validate';
import LOCALIZATION from '../../locales';

export default function CardSettingsDesign() {
  const color = useContext(themeContext);
  const l = useContext(LOCALIZATION)

  const { cardState, cardName, cardLogo, cardColor, setCardName, setCardColor } = useCardStore();

  const [submitButtonText, setsubmitButtonText] = useState('Skip');

  const scrollViewRef = useRef(null);
  const ref_input_name = useRef(null);
  const ref_input_unit = useRef(null);
  const ref_input_logo = useRef(null);
  const ref_input_cardColor = useRef(null);
  const ref_input_labelColor = useRef(null);
  const ref_input_valueColor = useRef(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState(false);

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [cardLogoURI, setCardLogoURI] = useState('')
  const placeholder_input_name = cardState?.cardName || '';
  const placeholder_input_logo = cardLogo || '';
  const placeholder_input_unit = cardState?.cardUnit || '';

  useEffect(() => {
    if (!cardLogo && !cardName) {
      setsubmitButtonText('Update Card Info');
    } else {
      setsubmitButtonText('Submit Update');
    }
  }, [cardName, cardColor, cardLogo]);

  const [setInput_cardColor, setSetInput_cardColor] = useState(
    cardState?.passJson?.backgroundColor || ''
  );
  const [setInput_labelColor, setSetInput_labelColor] = useState(
    cardState?.passJson?.labelColor || ''
  );
  const [setInput_valueColor, setSetInput_valueColor] = useState(
    cardState?.passJson?.foregroundColor || ''
  );
  const [cardColorRGB, setCardColorRGB] = useState('');
  const [labelColorRGB, setLabelColorRGB] = useState('');
  const [valueColorRGB, setValueColorRGB] = useState('');

  const placeholder_input_cardColor = cardColorRGB || '';
  const placeholder_input_labelColor = labelColorRGB || '';
  const placeholder_input_valueColor = valueColorRGB || '';

  useEffect(() => {
    const validate = validateColorCode(setInput_cardColor);
    if (validate) {
      const format = formatColorCode(setInput_cardColor);
      const toRGB = hexOrRgbToRgb(format);
      setCardColorRGB(toRGB);
      setCardColor(toRGB);
    }
  }, [setInput_cardColor]);

  useEffect(() => {
    const validate = validateColorCode(setInput_labelColor);
    if (validate) {
      const format = formatColorCode(setInput_labelColor);
      const toRGB = hexOrRgbToRgb(format);
      setLabelColorRGB(toRGB);
    }
  }, [setInput_labelColor]);

  useEffect(() => {
    const validate = validateColorCode(setInput_valueColor);
    if (validate) {
      const format = formatColorCode(setInput_valueColor);
      const toRGB = hexOrRgbToRgb(format);
      setValueColorRGB(toRGB);
    }
  }, [setInput_valueColor]);

  useEffect(()=>{
    setCardName(name || cardName);
  },[name])

  const cardTemplate = toNameFromTemplateId(cardState?.templateId);

  const handleUpdateDesign = () => {
    //
    const type = 'design';
    const value = [
      {
        key: 'unit',
        value: unit || placeholder_input_unit,
      },
      {
        key: 'logo',
        value: cardLogoURI,
      },
      {
        key: 'name',
        value: name || cardName,
      },
      {
        key: 'backgroundColor',
        value: cardColorRGB || placeholder_input_cardColor,
      },
      {
        key: 'labelColor',
        value: labelColorRGB || placeholder_input_labelColor,
      },
      {
        key: 'valueColor',
        value: valueColorRGB || placeholder_input_valueColor,
      },
    ];

    if(!loading){
      setloading(true);
      setError(false);
      setToast(false);
      
      onPressCancel();
      updateCard(cardState, type, value)
      .then(() => {
        setToast(true);
        setError(false);
        setloading(false);
      })
      .catch(() => {
        setError(true);
        setloading(false);
      });
    }
  };

  const [Warning, setWarning] = useState(false);

  const handleWarning = () => {
    setWarning(true);
  };

  const onPressCancel = () => {
    setWarning(false);
  };

  const handleOnPressToRef = (a) => {
    let inputRef;

    switch (a) {
      case 0:
        inputRef = ref_input_unit;
        break;
      case 1:
        inputRef = ref_input_logo;
        break;
      case 2:
        inputRef = ref_input_cardColor;
        break;
      case 3:
        inputRef = ref_input_labelColor;
        break;
      case 4:
        inputRef = ref_input_valueColor;
        break;
      case 5:
        inputRef = ref_input_name;
        break;
      default:
        break;
    }

    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <View style={{ backgroundColor: color.background, flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Div>
            <L s='center mv-20'>{l.preview}</L>
            <Div s='c'>
              <Pass card={cardState} />
            </Div>
            <Box s='row -mt-20'>
              <T color={color.placeholder}>Theme: </T>
              <T color={color.placeholder}>{cardTemplate}</T>
            </Box>
            <Tap s='row' onPress={() => handleOnPressToRef(5)}>
              <Box s='row f'>
                <T>Name: </T>
                <Input
                  refer={ref_input_name}
                  placeholder={placeholder_input_name}
                  onChange={setName}
                />
              </Box>
            </Tap>
            <Tap s='row' onPress={() => handleOnPressToRef(0)}>
              <Box s='row f'>
                <T>Unit: </T>
                <Input
                  refer={ref_input_unit}
                  placeholder={placeholder_input_unit}
                  onChange={setUnit}
                />
              </Box>
            </Tap>
            <P s='center' color={color.placeholder}>
              This will effect all cards.
            </P>
            <Divider />
            <T s='center mt-20 row'>Tap to change colors or logo</T>
            {/* ==== */}
            <Tap s='row ac js mh-20' disabled={false}>
              <CardSettingsUploadLogo setCardLogoURI={setCardLogoURI} cardSettings={true} />
              <Box s='row jb f'>
                <Div s='row ac'>
                  <T>Logo</T>
                </Div>
              </Box>
            </Tap>
            {/* ==== */}
            {/* ==== */}
            <Tap s='row ac js mh-20' onPress={() => handleOnPressToRef(2)}>
              <Div s='c h-40 w-40 br-5 ja' color={placeholder_input_cardColor}>
                <Div s='h-10 w-100% mv-5 t-2' color={'white'} />
                <Div>
                  <Div s='h-3 w-20' />
                  <Div s='h-3 w-20 mv-2' />
                </Div>
              </Div>
              <Box s='row jb f'>
                <Div s='row ac'>
                  <T>Background: </T>
                  <Input
                    refer={ref_input_cardColor}
                    placeholder={placeholder_input_cardColor}
                    onChange={setSetInput_cardColor}
                  />
                </Div>
                <Div color={cardColorRGB} s='w-20 h-20 br-10' />
              </Box>
            </Tap>
            {/* ==== */}
            {/* ==== */}
            <Tap s='row ac js mh-20' onPress={() => handleOnPressToRef(3)}>
              <Div s='c h-40 w-40 br-5 ja' color={placeholder_input_cardColor}>
                <Div s='h-10 w-100% mv-5 t-2' color={'white'} />
                <Div>
                  <Div s='h-3 w-20' color={placeholder_input_labelColor} />
                  <Div s='h-3 w-30 mv-2' />
                </Div>
              </Div>
              <Box s='row jb f'>
                <Div s='row ac'>
                  <T>Title Color: </T>
                  <Input
                    refer={ref_input_labelColor}
                    placeholder={placeholder_input_labelColor}
                    onChange={setSetInput_labelColor}
                  />
                </Div>
                <Div color={labelColorRGB} s='w-20 h-20 br-10' />
              </Box>
            </Tap>
            {/* ==== */}
            {/* ==== */}
            <Tap s='row ac js mh-20' onPress={() => handleOnPressToRef(4)}>
              <Div s='c h-40 w-40 br-5 ja' color={placeholder_input_cardColor}>
                <Div s='h-10 w-100% mv-5 t-2' color={'white'} />
                <Div>
                  <Div s='h-3 w-20' color={placeholder_input_labelColor} />
                  <Div s='h-2 w-30 mv-2' color={placeholder_input_valueColor} />
                </Div>
              </Div>
              <Box s='row jb f'>
                <Div s='row ac'>
                  <T>Text Color: </T>
                  <Input
                    refer={ref_input_valueColor}
                    placeholder={placeholder_input_valueColor}
                    onChange={setSetInput_valueColor}
                  />
                </Div>
                <Div color={valueColorRGB} s='w-20 h-20 br-10' />
              </Box>
            </Tap>
            {/* ==== */}
            <View style={{ height: 400 }} />
          </Div>
        </ScrollView>
        <TouchableOpacity
          onPress={handleWarning}
          style={[bttns.dynamic, styles.bttns, { backgroundColor: color.primary }]}
        >
          {loading ? (
            <ActivityIndicator size={'large'} color={color.text} />
          ) : (
            <>
              <Text style={txts.action}>{submitButtonText}</Text>
              <FontAwesome style={styles.bttnIcon} name='refresh' size={24} color='white' />
            </>
          )}
        </TouchableOpacity>
        <ShadeBottom />
      </View>
      {Warning && (
        <Alert
          onPressCancel={onPressCancel}
          onPressOk={handleUpdateDesign}
          title='Are you sure?'
          message='This cannot be un-done ! No backsies !!'
        />
      )}
      <Toast message='Your design has been updated successfully.' type='success' trigger={toast} />
      <Toast message='Oops something went wrong try again later.' type='error' trigger={error} />
    </>
  );
}

const styles = StyleSheet.create({
  cardBox: {
    borderRadius: 40,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  progressWrap: {
    height: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressBar: { height: 5, backgroundColor: 'lightgrey', borderRadius: 5 },
  progressBarActive: { height: 5, backgroundColor: 'black', borderRadius: 5 },
  bttns: {
    zIndex: 9,
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    bottom: 60,
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
  linearDown: {
    zIndex: 1,
    bottom: 0,
    position: 'absolute',
    height: 200,
    width: '100%',
  },
});
