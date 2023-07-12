
import { StyleSheet, View, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const SliderIndicator = ({ currentSlideIndex, index }) => {

  return (
    <View>
      <View style={[currentSlideIndex == index ? styles.indicatorActive : styles.indicator]} />
    </View>
  );
};

export default SliderIndicator

const styles = StyleSheet.create({
  indicator: {
    marginHorizontal: 7,
    height: height * 0.0355,
    width: height * 0.0355,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: 'white',
  },
  indicatorActive: {
    marginHorizontal: 7,
    height: height * 0.0355,
    width: height * 0.0355,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});