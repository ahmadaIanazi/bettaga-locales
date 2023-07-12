import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import themeContext from '../../Theme/theme';
import txt from '../../Theme/txt';
import { useModalStore } from '../../Zustand/useModalStore';
import { useUserStore } from '../../Zustand/useUserStore';
import FlagItemsRowHide from '../../Components/FlagItemsRowHide';
import FlagItemsRowReport from '../../Components/FlagItemsRowReport';

const FlagScreen = ({ setModalHeaderColor, closeModal, personData }) => {
  const color = useContext(themeContext);
  const user = useUserStore((state) => state.user);

  const modalOpen = useModalStore((state) => state.modalOpen);
  const modalData = useModalStore((state) => state.modalData);
  const modalType = useModalStore((state) => state.modalType);
  const [displayName, setdisplayName] = useState('');
  const [personColor, setPersonColor] = useState('#FFF');

  useEffect(() => {
    setModalHeaderColor(color.light);
    if (personData != null) {

      setPersonColor(personData?.color);
      setdisplayName(personData?.displayName);
    }
  }, []);

  const handleGoBack = () => {
    closeModal();
  };

  const openModalEditItem = (title) => {
    modalOpen(true);
    modalData(title);
    modalType(5); // EditItem
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
          <MaterialIcons name={'arrow-back-ios'} size={32} color='black' />
        </TouchableOpacity>
      </View>
    );
  };

  const PersonCard = () => {
    return (
      <View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[txt.h2c, { color: color.text }]}>{displayName}</Text>
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}
        >
          <View>
            <TouchableOpacity>
              <View style={[styles.imageUser, { backgroundColor: personColor }]}></View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const FlagRow = () => {
    return (
      <ScrollView style={{ marginTop: 34 }}>
        <FlagItemsRowHide personId={personData.uid} />
        <FlagItemsRowReport />
      </ScrollView>
    );
  };

  return (
    <View style={{ zIndex: 1, flex: 1, backgroundColor: color.light }}>
      <ProfileHeader />
      <PersonCard />
      <FlagRow />
    </View>
  );
};

export default FlagScreen;

const styles = StyleSheet.create({
  imageUser: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 111,
    height: 111,
    borderRadius: 62,
  },
  changeColorView: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 3,
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
