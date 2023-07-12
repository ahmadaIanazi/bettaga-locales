import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Header from '../../widgets/header';

import bttns from '../../themes/buttons';
import txts from '../../themes/texts';

import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/native';

import { TEMPLATES_ARRAY } from '../../K/Templates/templates_array';
import Templates from '../../components/Templates';
import TemplatesCategories from '../../components/templatesCategories';
import { addCard } from '../../data/add/addCard';
import { useCardStore } from '../../state/useCardStore';
import { useUserStore } from '../../state/useUserStore';
import { rgbToRgba } from '../../utils/rgbToRgba';
import themeContext from '../../themes/theme';

export default function ScreenAddCardTwo() {
  const color = useContext(themeContext)
  const user = useUserStore((state) => state.user);
  const setRefresh = useUserStore((state) => state.setRefresh);
  const refresh = useUserStore((state) => state.refresh);
  const cardName = useCardStore((state) => state.cardName);
  const cardColor = useCardStore((state) => state.cardColor);
  const cardLogo = useCardStore((state) => state.cardLogo);
  const setIntroducing = useCardStore((state) => state.setIntroducing);
  const setAskForPayment = useCardStore((state) => state.setAskForPayment);
  const navigation = useNavigation();
  const widthProgress = '25%';
  const SubmitButtonText = 'Create';
  const [templates, setTemplates] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(color.background);
  const [itemsCodes, setItemsCodes] = useState('');
  const [categoryCodes, setCategoryCodes] = useState('');

  const [loading, setLoading] = useState(false);

  const check = cardLogo != undefined && cardLogo != null && cardLogo != '';
  cardName != undefined &&
    cardName != null &&
    cardName != '' &&
    useEffect(() => {
      if (!itemsCodes && !categoryCodes) {
        const filteredTemplates = TEMPLATES_ARRAY.filter(
          (template) => template.templateId === 'stamps-a1'
        );
        setTemplates(filteredTemplates);
      } else if (categoryCodes) {
        const filteredTemplates = TEMPLATES_ARRAY.filter(
          (template) => template.categoryId === categoryCodes
        );
        setTemplates(filteredTemplates);
        console.log('CATEGORY CODE:', categoryCodes);
      } else if (itemsCodes) {
        const filteredTemplates = TEMPLATES_ARRAY.filter(
          (template) => template.templateId === itemsCodes
        );
        setTemplates(filteredTemplates);
      }
    }, [itemsCodes, categoryCodes]);
  

  const handleSelectItem = (itemcode) => {
    setCategoryCodes('');
    setItemsCodes(itemcode);
  };
  const handleSelectCategory = (categorycode) => {
    // setItemsCodes('');
    setCategoryCodes(categorycode);
  };

  const handleCreateCard = async () => {
    const userId = user.uid;
    const cardTemplate = templates[0].templateId;
    const cardCategory = templates[0].categoryId;
    const cardLevels = templates[0].levels;
    const cardMaxValue = templates[0].maxValue;
    const cardUnit = templates[0].unit;
    const initialValue = templates[0].value;
    const cardColorCheck = cardColor ? cardColor : templates[0].backgroundColor;

    console.log('TEMPLATES:', cardTemplate);
    console.log('cardCategory:', cardCategory);
    console.log('CardName:', cardName);
    console.log('CardColor:', cardColor);
    console.log('UserID:', userId);

    if (check) {
      setLoading(true);

      try {
        const card = await addCard(
          userId,
          cardCategory,
          cardTemplate,
          cardName,
          cardColorCheck,
          cardLogo,
          cardLevels,
          cardMaxValue,
          cardUnit,
          initialValue
        );

        navigation.navigate('CardProfileNavigation', { card });

        setIntroducing(true);
        setAskForPayment(true);
        setRefresh(!refresh);

        setLoading(false);
      } catch (error) {
        console.error('Error creating card:', error);
        setLoading(false);
      }
    }
  };

  const templateAvailable = templates?.length > 0;
  const backgroundColorOpacity = color.background
  // const backgroundColorOpacity = rgbToRgba(backgroundColor, 0.2)

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColorOpacity }}>
      {loading ? (
        <SafeAreaView style={{ top: 230, flex: 1 }}>
          <View>
            <View>
              <Templates templates={templates} setBackgroundColor={setBackgroundColor} />
            </View>
          </View>
          <ActivityIndicator size='large' style={{ alignSelf: 'center' }} />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <Header title={'Template'} subtitle={'Choose a card template'} back={true} />
          <View>
            <TemplatesCategories
              handleSelectItem={handleSelectItem}
              handleSelectCategory={handleSelectCategory}
            />
          </View>
          <View>
              <Templates templates={templates} setBackgroundColor={setBackgroundColor} />
          </View>
          {templateAvailable ? (
            check ? (
              <TouchableOpacity onPress={handleCreateCard} style={[bttns.dynamic, styles.bttns, { backgroundColor: color.primary }]}>
                <Text style={txts.action}>{SubmitButtonText}</Text>
                <FontAwesome style={styles.bttnIcon} name='arrow-right' size={24} color='white' />
              </TouchableOpacity>
            ) : (
              <View style={[bttns.dynamic, styles.bttns, { backgroundColor: 'lightgrey' }]}>
                <FontAwesome style={styles.bttnIcon} name='arrow-left' size={18} color='white' />
                <Text style={{ color: 'white' }}>Upload Logo and Name first</Text>
              </View>
            )
          ) : (
            <View
              style={{
                alignSelf: 'center',
                height: 200,
                width: 200,
                borderRadius: 20,
                backgroundColor: 'lightgrey',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}> No Template Available </Text>
            </View>
          )}
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progressWrap: {
    height: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressBar: { height: 5, backgroundColor: 'lightgrey', borderRadius: 5 },
  progressBarActive: { height: 5, backgroundColor: 'black', borderRadius: 5 },
  bttns: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    alignSelf: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
});
