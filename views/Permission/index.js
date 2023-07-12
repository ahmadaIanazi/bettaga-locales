
import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PermissionButton from '../../widgets/PermissionButton';
import PermissionHero from '../../widgets/PermissionHero';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';
import { useUserStore } from '../../state/useUserStore';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

const ScreenPermission = ({ route }) => {
  const navigation = useNavigation();
  const color = useContext(themeContext);
  const buttonColor = color.secondary;
  const { screenName } = route.params;
  const seenLocationPermission = useUserStore((state) => state.seenLocationPermission);
  const setSeenLocationPermission = useUserStore((state) => state.setSeenLocationPermission);
  const seenNotificationPermission = useUserStore((state) => state.seenNotificationPermission);
  const setSeenNotificationPermission = useUserStore(
    (state) => state.setSeenNotificationPermission
  );

  const handleComplete = () => {
    if (screenName == 'Notification') {
      setSeenNotificationPermission(true);
      navigation.navigate('LocationPermissionScreen', { screenName: 'Location' });
    }
    if (screenName == 'Location') {
      setSeenLocationPermission(true);
      navigation.push('MainNavigation');
    }
  };

  const title = screenName == 'Notification' ? 'Notifications' : 'Location Access';
  const text =
    screenName == 'Notification'
      ? 'To get alerts for nearby drops, chats from friends. Turn them on in your device settings for the full experience!'
      : 'We need your location to show you the bananas in your area and connect you with other banana lovers. We won’t share your location with anyone else, Promise !';

  const iconA =
    screenName == 'Notification'
      ? require('../../../assets/img/icon-banana.png')
      : require('../../../assets/img/icon-banana.png');
  const iconB =
    screenName == 'Notification'
      ? require('../../../assets/img/icon-messages.png')
      : require('../../../assets/img/icon-lock.png');
  const textA = screenName == 'Notification' ? 'Gets alerts for nearby drops' : 'Find bananas near you';
  const textB =
    screenName == 'Notification' ? 'Alerts for new messages' : 'Your location staus private';

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: color.background }]}>
      <View style={styles.textContainer}>
        <View style={[styles.hero, { backgroundColor: color.background }]}>
          <PermissionHero img={screenName} />
        </View>
        <Text style={[txt.h1c, { color: color.text }]}>{title}</Text>
        <Text style={[txt.h4l, { color: color.text }]}>{text}</Text>
        <View style={styles.iconItem}>
          <Image source={iconA} style={styles.icon} />
          <Text style={[txt.h4, { color: color.text }]}>{textA}</Text>
        </View>
        <View style={styles.iconItem}>
          <Image source={iconB} style={styles.icon} />
          <Text style={[txt.h4, { color: color.text }]}>{textB}</Text>
        </View>
      </View>
      <PermissionButton buttonColor={buttonColor} handleOnPress={handleComplete} />
    </SafeAreaView>
  );
};

export default ScreenPermission;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: width * 0.1,
  },
  iconItem: {
    flexDirection: 'row',
    height: height * 0.05,
    marginTop: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    width: height * 0.05,
    height: height * 0.05,
    marginEnd: 15,
  },
  hero: {
    marginTop: 10,
    marginBottom: 20,
    width: height * 0.37,
    height: height * 0.37,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonTouch: {
    bottom: 0,
    width: width,
    alignSelf: 'center',
    position: 'absolute',
  },
});
