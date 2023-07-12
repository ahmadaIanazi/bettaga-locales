import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SaudiBuilt() {
    const imageSource = require('../../../assets/img/saudibuilt.png')

  return (
    <View style={{alignSelf: 'center', margin: 20}}>
      <Image style={styles.image} source={imageSource} />
    </View>
  );
}

const styles = StyleSheet.create({
    image:{
        resizeMode: 'contain',
        height: 30
    }
})