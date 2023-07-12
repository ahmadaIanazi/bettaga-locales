import { useLayoutEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import Template from '../Template';

const { width } = Dimensions.get('screen');
export default function Templates({ templates, setBackgroundColor }) {
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    setData(templates);
  }, [templates]);

  const cardWidth = width * 0.6;
  const cardMargin = (width - cardWidth) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.id}
        snapToAlignment='center'
        snapToInterval={cardWidth + cardMargin * 2}
        decelerationRate={0.9}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * (cardWidth + cardMargin * 2),
            index * (cardWidth + cardMargin * 2),
            (index + 1) * (cardWidth + cardMargin * 2),
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-cardWidth / 2, 0, cardWidth / 2],
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
          });

          return (
            <>
              <Template
                item={item}
                opacity={opacity}
                cardMargin={cardMargin}
                cardWidth={cardWidth}
                translateX={translateX}
                setBackgroundColor={setBackgroundColor}
              />
              <View style={styles.title}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.name}</Text>
              </View>
            </>
          );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  title:{
    top: 280,
    width,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
  }
})