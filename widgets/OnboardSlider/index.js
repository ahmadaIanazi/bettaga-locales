
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import txt from '../../themes/txt';

const OnboardSlider = ({ item }) => {
  const { height, width } = Dimensions.get('screen');

  return (
    <View style={{ alignItems: 'center', width: width }}>
      <View style={{ marginTop: height * 0.07 }}>
        <Text style={txt.h1c}>{item.title}</Text>
      </View>
      <Image style={{ width: height * 0.403, height: height * 0.403 }} source={item.image} />
      <View style={{ marginTop: height * 0.035, marginHorizontal: height * 0.035 }}>
        <Text style={txt.h4}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

export default OnboardSlider

const styles = StyleSheet.create({
  
})