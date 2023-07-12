import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import themeContext from '../../themes/theme';

export default function PassActionGiftcard({ handleAction, item }) {
  const [input, setInput] = useState(item?.value || 0);
  const color = useContext(themeContext)

  useEffect(()=>{
    console.log('PASS ITEM:', item)
  },[])
  /** UI */
  const HEADER_LABEL_CURRENT = 'Current Balance: ';
  const HEADER_LABEL_NEW = 'New Balance: ';
  const INPUT_PLACEHOLDER = '0';
  const SUBMIT_BUTTON = 'Update';

  /** CURRENT */
  const LEVELS = parseInt(item?.levels);
  const VALUE = parseInt(item?.value);
  const MAX_VALUE = parseInt(item?.maxValue);
  const UNIT = item?.unit;

  /** OPERATIONS - STAMPS */
  const GET_VALUE = input;
  const GET_LEVEL = Math.floor(Math.max(Math.ceil((MAX_VALUE - GET_VALUE) / (MAX_VALUE / LEVELS)), 1));
  const GET_HEADER_VALUE = `${GET_VALUE} ${UNIT}`;

  /** CALCULATIONS - UI */



  /** ACTION */
  const HEADER_VALUE = GET_HEADER_VALUE;
  const LEVEL_NEW = GET_LEVEL;
  const VALUE_NEW = GET_VALUE;
  const VALUE_OLD = VALUE;
  const handleSubmit = () => {
    console.log('HEADER:', HEADER_VALUE, ' LEVEL:', LEVEL_NEW, ' VALUE:', VALUE_NEW);
    handleAction(HEADER_VALUE, LEVEL_NEW, VALUE_NEW, VALUE_OLD);
  };

  /** RENDER */
  return (
    <>
      <View style={styles.headingWrap}>
        <Text style={{ color: color.text }}>{HEADER_LABEL_CURRENT}</Text>
        <Text style={{ color: color.text }}>{VALUE}</Text>
      </View>
      <View style={styles.inputWrap}>
        <View style={[styles.textInput, { backgroundColor: color.light }]}>
          <TextInput
            style={{ fontSize: 24, color: color.text }}
            placeholder={INPUT_PLACEHOLDER}
            onChangeText={setInput}
            value={input.toString()}
            keyboardType='numeric'
          />
        </View>
      </View>
      <View style={styles.submitWrap}>
        <View style={styles.submitBox}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submit, { backgroundColor: color.action }]}
          >
            <Text style={[styles.submitText, { color: color.contrast }]}>{SUBMIT_BUTTON}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: color.text }}>{HEADER_LABEL_NEW}</Text>
            <Text style={{ color: color.text }}>{HEADER_VALUE}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  submitWrap: { flexDirection: 'row' },
  miniButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
    marginHorizontal: 20,
  },
  textInput: {
    backgroundColor: 'lightgrey',
    width: '40%',
    zIndex: 100,
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  submitBox: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 10,
  },
  submitText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
