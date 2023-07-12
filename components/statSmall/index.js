import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import themeContext from '../../themes/theme';

export default function StatSmall({state, value}) {

  const color = useContext(themeContext)
  const [title, setTitle] = useState('')
  const [backgroundColor, setBackgroundColor] = useState('lightgrey')
  const [icon, setIcon] = useState('arrow-down')

  useEffect(()=>{
    if (state == 'customers') {
      setTitle('CUSTOMERS');
      setBackgroundColor(color.action);
      setIcon('people');
    } 
    if (state == 'transactions') {
      setTitle('TRANSACTIONS');
      setBackgroundColor(color.primary);
      setIcon('newspaper');
    } 
    if (state == 'value') {
      setTitle('VALUE');
      setBackgroundColor(color.primary);
      setIcon('newspaper');
    } 
  },[])

  const TITLE = title;
  const VALUE = value;

  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        padding:10,
        marginStart: 20,
        minWidth: 100,
        height: 240,
      }}
    >
      <Ionicons name={icon} size={24} color={'white'} />
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>{VALUE}</Text>
      <Text style={{ color: 'white', fontSize: 10 }}>{TITLE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({})