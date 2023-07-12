import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COUNTRY_FLAGS } from '../../K/country_flags';
import { getScannedBarCode } from '../../operations/scan';
import { getScannedPhone } from '../../operations/scan';
import { useUserStore } from '../../state/useUserStore';
import txts from '../../themes/texts';
import themeContext from '../../themes/theme';
import ScanPlaceholder from '../../widgets/scanPlaceholder';
import Section from '../../widgets/section';
import usePhoneNumberValidation from '../../yup/usePhoneValidation';

export default function ScreenScan() {
  const userId = useUserStore((state) => state.user.uid);
  const inputRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [phone, setPhone] = useState('');
  const color = useContext(themeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = COUNTRY_FLAGS;
  const submitButtonLabel = 'ok';
  const { isPhoneNumber, handlePhoneNumberChange } = usePhoneNumberValidation();

  const navigation = useNavigation();
  const [modalimageSource, setImageSource] = useState(COUNTRY_FLAGS[0].icon);
  const [areaCode, setAreaCode] = useState(COUNTRY_FLAGS[0].code);

  useEffect(() => {
    if (selectedOption != null) {
      setImageSource(selectedOption.icon);
      setAreaCode(selectedOption.code);
    }
  }, [selectedOption]);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    getScannedBarCode(data, userId)
      .then((passes) => {
        if (passes?.length > 0) {
          setScanned(false);
          navigation.navigate('ModalScanned', { passes: passes });
        } else {
          setScanned(false);
        }
      })
      .catch(() => {
        setScanned(false);
      });
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  const handlePhoneSubmit = () => {
    setScanned(true);
    Keyboard.dismiss();
    if (isPhoneNumber) {
      getScannedPhone(phone, userId)
        .then((passes) => {
          if (passes?.length > 0) {
            setScanned(false);
            navigation.navigate('ModalScanned', { passes: passes });
          } else {
            setScanned(false);
          }
        })
        .catch(() => {
          setScanned(false);
        });
    } else {
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleToRef = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject]}
      />
      {scanned ? (
        <ActivityIndicator color='white' size='large' />
      ) : (
        <>
          <SafeAreaView>
            <Section
              title={'Scan'}
              subtitle={'Scan your customers Card or enter phone number'}
              light={true}
            />
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => setModalVisible(true)}
              >
                <>
                  <AntDesign name='caretdown' size={12} color='black' />
                  <Image
                    style={{ marginStart: 10, height: 30, width: 30 }}
                    source={modalimageSource}
                  />
                </>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleToRef}>
                <TextInput
                  ref={inputRef}
                  placeholder='Phone number'
                  keyboardType='number-pad'
                  style={styles.inputField}
                  onChangeText={(t) => {
                    handlePhoneNumberChange(areaCode + t);
                    setPhone(areaCode + t);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePhoneSubmit}
                style={[
                  styles.button,
                  { backgroundColor: color.action, opacity: isPhoneNumber ? 1 : 0.4 },
                ]}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
                  {submitButtonLabel}
                </Text>
              </TouchableOpacity>
            </View>
            <>
              <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.modalBackground}
                  onPress={() => setModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    {options.map((option) => (
                      <TouchableOpacity
                        key={option.id}
                        style={styles.option}
                        onPress={() => handleOptionPress(option)}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}
                        >
                          <Image
                            style={{ height: 30, width: 30, marginEnd: 10 }}
                            source={option.icon}
                          />

                          <Text style={txts.h4}>{option.en}</Text>
                          <Text style={txts.h6l}> {option.code}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
            <ScanPlaceholder />
          </SafeAreaView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: 30,
    width: 30,
    resizeMode: 'contain',
    margin: 20,
    // top: 40,
  },
  safeArea: {
    marginHorizontal: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    backgroundColor: 'white',
    width: '90%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    paddingHorizontal: 20,
  },
  inputField: {
    width: '100%',
    flex: 2,
    padding: 10,
    marginEnd: 20,
    height: '60%',
    fontSize: 24,
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    width: '80%',
  },
  option: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
