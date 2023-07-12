import { StyleSheet, Animated, Pressable, Image, View, Dimensions } from 'react-native';
import React, { useContext, useEffect, useRef } from 'react';

import themeContext from '../../themes/theme';
import { DROP_BANANA_ICON, DROP_BANANA_ICON_LOADING } from '../../themes/config';
import { useUserStore } from '../../state/useUserStore';
import { useLoadBanana } from '../../state/useLoadBanana';

const { height, width } = Dimensions.get('window');

const DropButton = ({ handleOnPress, loadingBanana }) => {
  const color = useContext(themeContext);
  const userColor = useUserStore((state) => state.user.color);
  const setAutoDrop = useLoadBanana((state) => state.setAutoDrop);
  const autoDrop = useLoadBanana((state) => state.autoDrop);
  const animateScale = useRef(new Animated.Value(0)).current;
  const animateProgress = useRef(new Animated.Value(0)).current;
  const imageSrc = loadingBanana ? DROP_BANANA_ICON_LOADING : DROP_BANANA_ICON;
  const buttonBorder = loadingBanana ? color.placeholder : color.border;

  useEffect(() => {
    animateScale.setValue(1);
    animateProgress.setValue(1);
  }, []);

  // const handleDropAutomation = () => {
  //   console.log('AUTO', autoDrop)
  //   if (autoDrop) {
  //     setAutoDrop(false);
  //   } else {
  //     setAutoDrop(true);
  //   }
  // };

  const handleProgressAnimation = () => {
    if (loadingBanana == false) {
      handleOnPress();
      animateScale.setValue(0.6);
      Animated.spring(animateScale, {
        toValue: 1,
        bounciness: 24,
        speed: 20,
        useNativeDriver: true,
      }).start();

      Animated.timing(animateProgress, {
        toValue: 150,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(animateProgress, {
          toValue: -150,
          duration: 60000,
          useNativeDriver: true,
        }).start();
      }, 1500);
    }
  };

  const animateTransformScale = [{ scale: animateScale }];
  const animateTransformProgress = {
    backgroundColor: loadingBanana ? color.secondary : null,
    transform: [{ translateY: animateProgress }],
  };

  return (
    <Pressable
      // onLongPress={handleDropAutomation}
      onPress={handleProgressAnimation}
      style={styles.buttonContainer}
    >
      <Animated.View
        style={[
          styles.button,
          {
            transform: animateTransformScale,
            borderColor: buttonBorder,
            backgroundColor: userColor,
          },
        ]}
      >
        <Image source={imageSrc} style={styles.imageStyle} />
        <Animated.View style={[styles.progress, animateTransformProgress]}></Animated.View>
      </Animated.View>
      <View style={[styles.buttonBackground,{ backgroundColor: color.text}]} />
    </Pressable>
  );
};

export default DropButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonBackground: {

    position: 'absolute',
    borderRadius: 60,
    alignSelf: 'center',
    width: height * 0.13,
    height: height * 0.13,
    zIndex: -1,
  },
  imageStyle: {
    height: height * 0.082,
    width: height * 0.082,
    alignSelf: 'center',
  },
  progress: {
    width: height * 0.118,
    height: height * 0.118,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    width: height * 0.118,
    height: height * 0.118,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
