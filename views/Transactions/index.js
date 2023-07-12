import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../../widgets/header';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '../../state/useUserStore';
import Customer from '../../components/customer';
import themeContext from '../../themes/theme';
import Transaction from '../../components/transaction';
import { useTransactions } from '../../hooks/useTransactions'
import { Div, Divider, H, P } from '../../../customized'

const { width } = Dimensions.get('screen');

export default function ScreenTransactions() {
  useTransactions();

  const transactions = useUserStore((state) => state.transactions);
  /** ROLE LOGIC HERE */
  const role = useUserStore((state) => state.user.role);
  const isAnonymous = useUserStore((state) => state.user.isAnonymous);

  const SHOW = isAnonymous ? true : role == 'merchant';
  const cards = useUserStore((state) => state.cards);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const color = useContext(themeContext);
  const [allSelected, setSelected] = useState(false);
  const [transactionsFiltered, setTransactionsFiltered] = useState([]);
  const [searchinput, setSearchinput] = useState('');

  const isTablet = width >= 700; // assuming iPad has a minimum width of 768

  const numColumns = isTablet ? 2 : 1;

  useEffect(() => {
    const filtered = transactions.filter((obj) => selectedTagIds.includes(obj.cardId));
    setTransactionsFiltered(filtered);
  }, [selectedTagIds]);

  useEffect(() => {
    handleSelectTag(null, true);
  }, []);

  const handleSelectTag = (id, selectAll = false) => {
    if (selectAll) {
      if (selectedTagIds?.length === cards?.length) {
        setSelectedTagIds([]);
      } else {
        setSelectedTagIds(cards.map((card) => card.id));
      }
    } else {
      setSelectedTagIds((prevIds) => {
        if (prevIds.includes(id)) {
          return prevIds.filter((prevId) => prevId !== id);
        } else if (prevIds?.length < 1) {
          return [...prevIds, id];
        } else {
          return prevIds.slice(1).concat(id);
        }
      });
    }
  };

  const CardTag = ({ item }) => {
    const cardColor = item.cardColor;
    const cardIconColor = item.cardColor;
    const cardTextColor = item.textColor;
    const cardName = item.cardName;
    const isSelected = selectedTagIds.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.tag,
          isSelected && styles.selectedTag,
          {
            backgroundColor: isSelected ? 'black' : cardColor,
            borderColor: color.action,
            borderWidth: isSelected ? 2 : 0,
          },
        ]}
        onPress={() => handleSelectTag(item.id)}
      >
        <View
          style={[styles.cardTagIcon, { backgroundColor: isSelected ? cardIconColor : 'white' }]}
        />
        <Text style={{ color: isSelected ? 'white' : cardTextColor }}>{cardName}</Text>
      </TouchableOpacity>
    );
  };

  const handleSelectAllTags = () => {
    setSelected((prevSelected) => !prevSelected);
    handleSelectTag(null, true);
  };

  const CardTagAll = () => {
    const tagColor = color.primary;

    return (
      <TouchableOpacity
        onPress={handleSelectAllTags}
        style={[styles.tag, { backgroundColor: allSelected ? 'black' : tagColor }]}
      >
        <Text style={{ color: 'white' }}>All</Text>
      </TouchableOpacity>
    );
  };

  const handleSearchinput = (text) => {
    const customerSearched = text
      ? transactions.filter(
          (item) =>
            (item.phone && item.phone.toLowerCase().includes(text.toLowerCase())) ||
            (item.name && item.name.toLowerCase().includes(text.toLowerCase())) ||
            (item.country && item.country.toLowerCase().includes(text.toLowerCase()))
        )
      : transactions;
    setTransactionsFiltered(customerSearched);
    setSearchinput(text);
  };

  const clearSearch = () => {
    setTransactionsFiltered(transactions);
    setSearchinput('');
  };

  const EMPTYVIEW = () => (
    <View>
      <Text> No Transactions yet, scan cards and update them.</Text>
    </View>
  );

  const CUSTOMERVIEW = ({ item }) => <Transaction transaction={item} />;

  const FOOTER = () => <View style={{ height: 120 }} />;

  const availableSearch = searchinput?.length > 0;

  return (
    <SafeAreaView style={[styles.main, { backgroundColor: color.background }]}>
      <Header title={'Transactions'} subtitle={'All Transactions'} />
      <View style={styles.searchinputWrap}>
        <View style={[styles.searchinputBox]}>
          <Ionicons style={styles.searchIcon} name='search' size={24} color={color.contrast} />
          <TextInput
            onChangeText={handleSearchinput}
            value={searchinput}
            style={[styles.searchinput, { backgroundColor: color.light, color: color.text }]}
          />
          {availableSearch && (
            <TouchableOpacity onPress={clearSearch} style={styles.searchButton}>
              <Ionicons name='backspace-sharp' size={24} color={color.contrast} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{flex: 0.1}}>
      <FlatList
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={CardTag}
        ListHeaderComponent={CardTagAll}
        data={cards}
        showsHorizontalScrollIndicator={false}
        style={styles.taglist}
      />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.cards}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          data={transactionsFiltered}
          renderItem={CUSTOMERVIEW}
          ListEmptyComponent={EMPTYVIEW}
          ListFooterComponent={FOOTER}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  taglist:{
    width: width,
    marginBottom: 10,
    height: 60,
  },
  cards: {
    width: width,
  },
  divider:{
    height: 2,
    width:'90%',
    backgroundColor: 'lightgrey',
    borderRadius:1,
  },
  tagBox: {
    width: '100%',
  },
  tag: {
    flexDirection: 'row',
    marginEnd: 15,
    marginStart: 5,
    borderRadius: 14,
    height: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  selectedTag: {
    borderWidth: 2,
  },
  cardTag: {
    flexDirection: 'row',
    marginEnd: 15,
    marginStart: 5,
    borderRadius: 14,
    height: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  cardTagIcon: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginEnd: 5,
  },
  searchinputWrap: {
    height: 80,
    width: '100%',
    padding: 10,
    paddingHorizontal: 20,
  },
  searchinputBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  searchinput: {
    height: '100%',
    borderRadius: 40,
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor:'lightgrey',
    fontSize: 24,
  },
  searchButton: {
    zIndex: 99,
    position: 'absolute',
    right: 20,
  },
  searchIcon: {
    zIndex: 99,
    position: 'absolute',
    left:10,
  },
});