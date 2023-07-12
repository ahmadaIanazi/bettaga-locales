import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import StatSmall from '../../components/statSmall';
import Section from '../../widgets/section';

import { SafeAreaView } from 'react-native-safe-area-context';


export default function ScreenCardStats({ route }) {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Section title={'Stats'} subtitle={'Card Activity'} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatSmall />
        <StatSmall />
        <StatSmall />
        <StatSmall />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bttns: {
    marginStart: 30,
    flexDirection: 'row',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
