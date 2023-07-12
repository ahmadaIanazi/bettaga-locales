import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import LOCALIZATION from '../../locales';
import txts from '../../themes/texts';
import themeContext from '../../themes/theme';


export default function Section({ title, subtitle, light }) {
  const color = useContext(themeContext)
  const l = useContext(LOCALIZATION)

  const [titleText, setTitleText] = useState('')
  const [subtitleText, setSubtitleText] = useState('')

  useEffect(()=>{
    setTitleText(title);
    setSubtitleText(subtitle);
  },[title, subtitle])

  return (
    <View style={{ direction: l.direction,  marginHorizontal: 20, marginBottom: 5, marginTop: 20 }}>
      <Text style={[txts.section, { color: light ? 'white' : color.text }]}>{titleText}</Text>
      <Text style={[txts.subtitle, { color: light ? 'white' : color.text }]}>{subtitleText}</Text>
    </View>
  );
}

