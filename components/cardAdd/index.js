import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import LOCALIZATION from '../../locales';
import { useCardStore } from '../../state/useCardStore';
import themeContext from '../../themes/theme';

export default function CardAdd() {
  const l = useContext(LOCALIZATION);
  const { setCardName } = useCardStore()
  const color = useContext(themeContext)

  const navigation = useNavigation();

  const navigateToCardProfile = () => {
    setCardName(null);
    navigation.navigate('AddCard');
  };

  return (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 15,
        width: 270,
      }}
    >
      <TouchableOpacity onPress={navigateToCardProfile} style={[styles.container, { backgroundColor: color.primary}]}>
        <View style={styles.rowType}>
          <Text style={styles.brandText}>{l.add_card}</Text>
          <Ionicons name='add' size={60} color='white' />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    padding: 10,
    backgroundColor: 'royalblue',
    borderRadius: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    marginEnd: 5,
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
