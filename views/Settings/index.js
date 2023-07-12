import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';

import { useUserStore } from '../../state/useUserStore';
import { signout } from '../../data/auth/signout';
import SettingsItemsSettings from '../../components/SettingsItemsSettings';
import SettingsItemsAccount from '../../components/SettingsItemsAccount';
import SettingsItemsAbout from '../../components/SettingsItemsAbout';
import SaudiBuilt from '../../widgets/SaudiBuilt';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const ModalSettings = () => {
  const color = useContext(themeContext);
  const user = useUserStore((state) => state.user);
  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';

  const displayName = user.displayName;
  const navigation = useNavigation();
  const logoSource = require('../../../assets/brand/Bettaga_Brand_v2-07.png');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenEdit = () => {};

  const handleSignout = () => {
    signout();
  };

  const ProfileHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name={'arrow-back-ios'} size={32} color={color.text} />
        </TouchableOpacity>
      </View>
    );
  };

  const ProfileCard = () => {
    return (
      <View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[txt.h2c, { color: color.text }]}>{displayName}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
        >
          <TouchableOpacity onPress={handleOpenEdit}>
            <View>
              <View style={[styles.imageUser, { backgroundColor: color.action }]}>
                {/* <Text style={[txt.h4c, { color: color.light }]}>Edit</Text> */}
                <Image style={styles.logo} source={logoSource} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ScrollViewItems = () => {
    return (
      <ScrollView style={{ backgroundColor: color.light, marginTop: 34 }}>
        <SettingsItemsSettings />
        <SettingsItemsAbout />
        <SettingsItemsAccount />
        <SaudiBuilt />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={{ zIndex: 1, flex: 1, backgroundColor: color.light }}>
      <ProfileHeader />
      <ProfileCard />
      <ScrollViewItems />
    </SafeAreaView>
  );
};

export default ModalSettings;

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
  logo:{
    height: 50,
    resizeMode:'contain'
  },
});
