import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { cardColors } from '../../K/colors';
import { useCardStore } from '../../state/useCardStore';

const { width } = Dimensions.get('window');

const CircleColorPicker = () => {
  const { cardState, setCardColor } = useCardStore()
  const colors = cardColors;
  const [selectedLens, setSelectedLens] = useState(colors[0]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef();

  useEffect(() => {
    if (selectedLens) {
      setCardColor(selectedLens);
    }
  }, [selectedLens]);

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
    listener: (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / (width * 0.25 + 20));
      setSelectedLens(colors[index]);
    },
  });

  const lensSize = width * 0.25;

  const lensStyles = (index) => {
    const inputRange = [
      (index - 2) * lensSize,
      (index - 1) * lensSize,
      index * lensSize,
      (index + 1) * lensSize,
      (index + 2) * lensSize,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 0.6, 1, 0.6, 0.6],
      extrapolate: 'clamp',
    });
    const borderWidth = scrollX.interpolate({
      inputRange,
      outputRange: [0, 0, 4, 0, 0],
      extrapolate: 'clamp',
    });
    return {
      width: lensSize,
      height: lensSize,
      borderRadius: lensSize / 2,
      backgroundColor: 'gray',
      transform: [{ scale }],
      marginHorizontal: 10,
      borderWidth,
      borderColor: 'black',
    };
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={lensSize + 20}
        snapToAlignment='start'
        contentContainerStyle={styles.scrollContainer}
      >
        {colors.map((lens, index) => (
          <Animated.View
            key={index}
            style={[styles.lens, lensStyles(index), { backgroundColor: lens }]}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    bottom: 0,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  lens: {
    marginHorizontal: 5,
  },
});

export default CircleColorPicker;
