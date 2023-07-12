import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';
import { useUserStore } from '../../state/useUserStore';

const ModalSettingsEdit = () => {
  const color = useContext(themeContext);
  const user = useUserStore((state) => state.user);

  const displayName = user.displayName;
  const [colorChanged, setColorChanged] = useState(user.color);
  const colorNew = colorChanged == user.color ? null : 'Tap to save'

  // useEffect(() => {
  //   setModalHeaderColor(color.light);
  // }, []);

  const handleGoBack = () => {
    // modalOpen(true);
    // modalData(null);
    // modalType(1); // SettingsScreen
  };
  const openModalEditItem = (title) => {
    // modalOpen(true);
    // modalData(title);
    // modalType(5); // EditItem
  };

  const changeColor = () => {
    // setColorChanged(generateColor());
  };

  const saveNewColor = () =>{
    // saveUserField(user.uid, 'color', colorChanged).then(()=>{
    //   setUserColor(colorChanged);
    //   // modalOpen(true);
    //   // modalData(null);
    //   // modalType(0); // ProfileScreen
    // })
  }

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
          <View>
            <TouchableOpacity onPress={saveNewColor}>
              <View style={[styles.imageUser, { backgroundColor: colorChanged }]}>
                <Text style={[txt.h6c, { color: color.text }]}>{colorNew}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changeColor}
              style={[styles.changeColorView, { backgroundColor: color.contrast, borderColor: color.border }]}
            >
              <FontAwesome name='refresh' size={24} color={color.contrast} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const EditRow = () => {
    const settingsView = [
      {
        id: 1,
        title: 'Display Name',
        field: 'displayName',
        detail: user.displayName,
        icon: 'person',
      },
      {
        id: 2,
        title: 'Phone Number',
        field: 'phoneNumber',
        detail: user.phoneNumber,
        icon: 'phone',
      },
      // { id: 2, title: 'Email', field: 'email', detail: user.email, icon: 'email' },
    ];

    return (
      <ScrollView style={{backgroundColor: color.light, marginTop: 34 }}>
        {settingsView.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => openModalEditItem(item.field)}
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <MaterialIcons name={item.icon} size={24} color={color.text} />
                <Text style={[txt.h3, { color:color.text, marginStart: 10 }]}>{item.title}</Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
              >
                <Text style={[txt.h6,{color: color.placeholder}]}>{item.detail}</Text>
                <MaterialIcons name='keyboard-arrow-right' size={24} color={color.text} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={{ zIndex: 1, flex: 1, backgroundColor: color.light }}>
      <ProfileHeader />
      <ProfileCard />
      <EditRow />
    </View>
  );
};

export default ModalSettingsEdit;

const styles = StyleSheet.create({
  imageUser: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 111,
    height: 111,
    borderRadius: 62,
  },
  changeColorView: {

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
