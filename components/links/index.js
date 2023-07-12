import { StyleSheet, Text, View, FlatList } from 'react-native'
import LinkWidget from '../../widgets/linkWidget';
import LinkWidgetSend from '../../widgets/linkWidgetSend';

export default function Links({ card, links }) {

  const isPublic = card.public;
 
  const Link = ({ item }) => <LinkWidget isPublic={isPublic} item={item} />;
  const LinkHeader = () => isPublic ? <></> : <LinkWidgetSend card={card} />;
  const renderListEnd = () => <View style={{ height: 120 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={Link}
        keyExtractor={(k) => k.id}
        ListHeaderComponent={LinkHeader}
        ListFooterComponent={renderListEnd}
        data={links}
        style={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
    }
})