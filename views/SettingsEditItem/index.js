import { MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import { useUserStore } from '../../state/useUserStore';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';

import { useKeyboard } from '../../hooks/useKeyboard';

const { height, width } = Dimensions.get('window');

const ModalSettingsEditItem = ({ data, closeModal, setModalHeaderColor }) => {
  const color = useContext(themeContext);
  const user = useUserStore((state) => state.user);
  const keyboardHeight = useKeyboard();

  const [textInput, setTextInput] = useState('');
  const [textDisplay, settextDisplay] = useState('');

  useEffect(() => {
    data == 'displayName' ? settextDisplay(user.displayName) : null;
    data == 'phoneNumber' ? settextDisplay(user.phoneNumber) : null;
  }, []);


  const handleGoBack = () => {
    // modalOpen(true);
    // modalData(null);
    // modalType(4); //Edit Screen
  };

  const onSave = () => {
    // saveUserField(user.uid, data, textInput)
    //   .then(() => {
    //     if (data == 'displayName') {
    //       setUserDisplayName(textInput);
    //     }
    //     modalOpen(true);
    //     modalData(null);
    //     modalType(4);
    //   })
    //   .catch(() => console.log('On Save Error !'));
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

  return (
    <View style={{ zIndex: 1, flex: 1, backgroundColor: color.light }}>
      <ProfileHeader />
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={[txt.h4, { color: color.placeholder }]}>Edit:</Text>
        <Text style={[txt.h1, { color: color.text }]}>{textDisplay}</Text>
      </View>
      <View style={[styles.sendContainer, { bottom: Platform.OS === 'ios' ? keyboardHeight : 0 }]}>
        <View
          style={[
            styles.sendView,
            {
              height: keyboardHeight > 0 ? 60 : 100,
            },
          ]}
        >
          <TextInput
            style={[
              styles.textInput,
              { backgroundColor: color.light, color: color.text, borderColor: user.color },
            ]}
            placeholder={`${textDisplay}`}
            placeholderTextColor={color.text}
            value={textInput}
            onChangeText={(t) => setTextInput(t)}
          />
          <TouchableHighlight
            onPress={onSave}
            style={[styles.sendButton, { backgroundColor: user.color }]}
          >
            <Text style={txt.h4c}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default ModalSettingsEditItem;

const styles = StyleSheet.create({
  sendContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: width,
  },
  sendView: {
    flexDirection: 'row',
    padding: 7,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  textInput: {
    flex: 1,
    borderRadius: 15,
    borderWidth: 2,
    paddingHorizontal: 10,
    height: 45,
    width: '100%',
  },
  sendButton: {
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 45,
    borderRadius: 15,
  },
});
