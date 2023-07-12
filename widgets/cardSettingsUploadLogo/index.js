import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCardStore } from '../../state/useCardStore';
import * as ImagePicker from 'expo-image-picker';

const { height, width } = Dimensions.get('window');

const CardSettingsUploadLogo = ({ setCardLogoURI, cardSettings }) => {
  const {
    cardState,
    cardLogo,
    setCardLogo,
    cardColor,
    cardColorLight,
    cardColorDark,
    cardColorIsDark,
  } = useCardStore();

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [logoSource, setLogoSource] = useState(null);

  const color = cardColor;

  const cardLogoURL = cardSettings ? cardState.logo : '';

  useEffect(() => {
    if (cardLogoURL?.length > 0) {
      if (image) {
        setCardLogo(image);
        setLogoSource(image);
        setCardLogoURI(image);
      } else {
        setCardLogo(cardLogoURL);
        setLogoSource(cardLogoURL);
      }
    } else {
      setCardLogo(image);
      setLogoSource(image);
      setCardLogoURI(image);
    }
  }, [image, cardLogoURL, setCardLogo]);

  const openImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        throw new Error('Camera Roll permission not granted');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: false, // only allow a single image selection
        presentationStyle: ImagePicker.UIImagePickerPresentationStyle.POPOVER,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      setError('Error accessing image library');
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openImagePicker}
        style={[
          styles.hero,
          {
            backgroundColor: color,
            height: 40,
            width: 40,
          },
        ]}
      >
        {logoSource ? (
          <Image style={styles.image} source={{ uri: logoSource }} />
        ) : (
          <>
            <Ionicons
              name='ios-images'
              size={16}
              color={cardColorIsDark ? cardColorLight : cardColorDark}
            />
          </>
        )}
        {error && (
          <Text style={{ color: 'red', fontSize: 10 }}>Error Uploading Image. Try again.</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CardSettingsUploadLogo;

const styles = StyleSheet.create({
  hero: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
    overflow: 'hidden',
  },
  image: {
    zIndex: 999,
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});
