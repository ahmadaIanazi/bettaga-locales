import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import onboardBones from '../../K/onboardData';
import OnboardBottomButton from '../../widgets/OnboardBottomButton';
import themeContext from '../../themes/theme';
import { useUserStore } from '../../state/useUserStore';

import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardSlider from '../../widgets/OnboardSlider';
import SliderIndicator from '../../widgets/SliderIndicator';

const ScreenOnboard = () => {
  const color = useContext(themeContext);
  const seenOnboard = useUserStore((state) => state.seenOnboard);
  const setSeenOnboard = useUserStore((state) => state.setSeenOnboard);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [lastSlide, setLastSlide] = useState(false);
  const [loading, setLoading] = useState(false);
  const { height, width } = Dimensions.get('window');
  const slidesRef = useRef();

  const buttonColor = color.contrast;

  const navigation = useNavigation();

  useEffect(() => {
    if (currentSlideIndex == onboardBones?.length - 1) {
      setLastSlide(true);
    } else {
      setLastSlide(false);
    }
  }, [currentSlideIndex]);

  const handleOnPress = () => {
    if (currentSlideIndex == onboardBones?.length - 1) {
      console.log('SEEN IS SET')
      setSeenOnboard(true);
      setLoading(true);
    } else {
      goNextSlide();
    }
  };

  if (seenOnboard) {
    navigation.navigate('IntroNavigation');
  }
  const onMomentum = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    const nextSlideOffset = nextSlideIndex * width;
    slidesRef?.current?.scrollToOffset({ offset: nextSlideOffset });
    setCurrentSlideIndex(nextSlideIndex);
  };

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: color.secondary }]}>
      <View style={{ height: height * 0.8, width: width }}>
        <FlatList
          ref={slidesRef}
          style={{ width: width, height: height * 0.75 }}
          horizontal
          pagingEnabled
          data={onboardBones}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentum}
          renderItem={OnboardSlider}
        />
      </View>
      <View style={styles.indicators}>
        {onboardBones.map((_, index) => (
          <SliderIndicator currentSlideIndex={currentSlideIndex} key={index} index={index} />
        ))}
      </View>
      <OnboardBottomButton
        loading={loading}
        lastSlide={lastSlide}
        buttonColor={buttonColor}
        handleOnPress={handleOnPress}
      />
    </SafeAreaView>
  );
};

export default ScreenOnboard;

const styles = StyleSheet.create({
  main: {
    flex: 3,
  },
  indicators: {
    bottom: 70,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
