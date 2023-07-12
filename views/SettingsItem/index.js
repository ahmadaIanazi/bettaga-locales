import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';

import Subscriptions from '../../components/Subscriptions';
import Subusers from '../../components/Subusers';
import { useUserStore } from '../../state/useUserStore';

const ModalSettingsItem = ({route : { params : { action, title }}}) => {
  const color = useContext(themeContext);
  const user = useUserStore((state) => state.user);
  const dark = useUserStore((state) => state.dark);
  const arabic = useUserStore((state) => state.arabic);
  const setDark = useUserStore((state) => state.setDark);
  const setArabic = useUserStore((state) => state.setArabic);
  const TITLE_LABEL = title;
  const [availableUpdate, setAvailableUpdate] = useState(false);
  const displayName = user.displayName;
  const navigation = useNavigation()


  useEffect(() => {
    async () => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        setAvailableUpdate(true);
      } else {
        setAvailableUpdate(false);
      }
    };
  }, []);

  const handleGoBack = () => {
    navigation.goBack()
  };



  const TopHeader = () => {
    return (
      <View
        style={{
          margin: 34,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name={'arrow-back-ios'} size={32} color={color.text} />
        </TouchableOpacity>
      </View>
    );
  };

  const TopCard = () => {
    return (
      <View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[txt.h2c, { color: color.text }]}>{TITLE_LABEL}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
        ></View>
      </View>
    );
  };

  const SubscriptionAction = () => {
    if (action == 'subscriptions') {
      return <Subscriptions />
    }
  };

  const SubuserAction = () => {
    if (action == 'subusers') {
      return <Subusers />
    }
  };

  const Password = () => {
    if (action == 'password') {
      /** LABELS AND TEXT */
      const Header = 'Password';
      const Label_change_password = 'Change email';
      const Label_Success_password_change = 'Successful email change';
      const Label_Error_password_change = 'Error email change';
      const Label_password_change_info = 'Email change info';
      return (
        <View
          style={{
            backgroundColor: color.light,
            marginTop: 34,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[txt.h1c, { color: color.text }]}>{Header}</Text>
        </View>
      );
    }
  };

  const Email = () => {
    if (action == 'email') {
      /** LABELS AND TEXT */
      const Header = 'Email Change';
      const Label_change_email = 'Change email';
      const Label_Success_email_change = 'Successful email change';
      const Label_Error_email_change = 'Error email change';
      const Label_Email_change_info = 'Email change info';
      return (
        <View
          style={{
            backgroundColor: color.light,
            marginTop: 34,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[txt.h1c, { color: color.text }]}>{Header}</Text>
        </View>
      );
    }
  };


  const Payments = () => {
    if (action == 'payments') {
      /** LABELS AND TEXT */
      const Header = 'Payments History';
      const Invoices_lable = 'All invoices';
      const Payments_lable = 'All payments';
      return (
        <View
          style={{
            backgroundColor: color.light,
            marginTop: 34,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[txt.h1c, { color: color.text }]}>Dark ?</Text>
        </View>
      );
    }
  };

  const Appearance = () => {
    if (action == 'appearance') {
      return (
        <View
          style={{
            backgroundColor: color.light,
            marginTop: 34,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[txt.h1c, { color: color.text }]}>Dark ?</Text>
          <Switch
            style={{ marginHorizontal: 20 }}
            ios_backgroundColor={color.placeholder}
            trackColor={{ false: color.placeholder, true: color.secondary }}
            thumbColor={color.light}
            value={dark}
            onValueChange={(value) => setDark(value)}
          />
        </View>
      );
    }
  };

  const Language = () => {
    if (action == 'language') {
      return (
        <View
          style={{
            backgroundColor: color.light,
            marginTop: 34,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={[txt.h1c, { color: color.text }]}>عربي؟</Text>
          <Switch
            style={{ marginHorizontal: 20 }}
            ios_backgroundColor={color.placeholder}
            trackColor={{ false: color.placeholder, true: color.secondary }}
            thumbColor={color.light}
            value={arabic}
            onValueChange={(value) => setArabic(value)}
          />
        </View>
      );
    }
  };

  const Update = () => {
    const handleUpdateNow = () => {
      Updates.reloadAsync();
    };
    if (action == 'update') {
      return availableUpdate ? (
        <View style={{ backgroundColor: color.light, marginTop: 34 }}>
          <Text>Update Available</Text>
          <TouchableOpacity onPress={handleUpdateNow}>
            <Text>UPDATE NOW</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: color.light, marginTop: 34 }}>
          <Text>No Update Available</Text>
        </View>
      );
    }
  };

  return (
    <View style={{ zIndex: 1, flex: 1, backgroundColor: color.light }}>
      <TopHeader />
      <TopCard />
      <SubscriptionAction/>
      <SubuserAction/>
      <Password />
      <Email />
      <Payments/> 
      <Appearance />
      <Language />
      <Update />
    </View>
  );
};

export default ModalSettingsItem;

const styles = StyleSheet.create({
  imageUser: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 111,
    height: 111,
    borderRadius: 62,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginStart: 20,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  centerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
