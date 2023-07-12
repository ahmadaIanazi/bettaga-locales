import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { updatePass } from '../../operations/update';
import { useUserStore } from '../../state/useUserStore';
import themeContext from '../../themes/theme';
import PassActionGiftcard from '../passActionGiftcard';
import PassActionLoader from '../passActionLoader';
import PassActionStamps from '../passActionStamps';

export default function PassAction({ item, passCategory }) {
  const color = useContext(themeContext);
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  const userId = user.uid;
  const unit = item?.unit;

  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    navigation.goBack();
  };

  const type = passCategory;
  let buttons;

  switch (type) {
    case 'stamps':
      buttons = 'stamps';
      break;
    case 'giftcard':
      buttons = 'giftcard';

      break;
    case 'loader':
      buttons = 'loader';

      break;
    case 'counter':
      buttons = 'counter';

      break;
    case 'coupon':
      buttons = 'coupon';
      break;
    default:
      buttons = '';
      break;
  }

  const handleAction = (headerValue, newLevel, newValue, oldValue) => {
    const typeToReplace = 'updatePass';
    const isValueMaxed = newValue == item?.maxValue;
    setLoading(true);

    const valueToChange = [
      {
        key: 'header',
        value: headerValue,
      },
      {
        key: 'unit',
        value: unit,
      },
      {
        key: 'completed',
        value: isValueMaxed,
      },
    ];
    updatePass(item, typeToReplace, valueToChange, newLevel, newValue, oldValue, userId, closeModal)
      .then(() => {
        console.log('UPDATING SUCCESS.');
        closeModal();
      })
      .catch(() => {
        closeModal();
        console.log('UPDATING FAILED.');
        setLoading(false);
      });
  };

  return (
    <View style={[styles.main, { backgroundColor: color.background }]}>
      {loading ? (
        <ActivityIndicator color={color.text} size='large' />
      ) : (
        <>
          {buttons == 'stamps' && <PassActionStamps item={item} handleAction={handleAction} />}
          {buttons == 'giftcard' && <PassActionGiftcard item={item} handleAction={handleAction} />}
          {buttons == 'loader' && <PassActionLoader item={item} handleAction={handleAction} />}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    zIndex: 99,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
