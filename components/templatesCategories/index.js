import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CATEGORIES } from '../../K/Templates/categories';
import { ITEMS_ARRAY } from '../../K/Templates/items_array';

export default function TemplatesCategories({ handleSelectItem, handleSelectCategory }) {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory == '') {
      setItems(ITEMS_ARRAY);
    } else {
      const filteredTemplates = ITEMS_ARRAY.filter(
        (template) => template.categoryId === selectedCategory
      );

      setItems(filteredTemplates);
      if (filteredTemplates?.length > 0) {
        const firstItem = filteredTemplates.slice(0, 1);
        const templateIdOfFirstItem = firstItem[0].templateId;
        const categoryIdOfFirstItem = firstItem[0].categoryId;
        setSelectedItem(templateIdOfFirstItem); // Select the first item
        handleSelectItem(templateIdOfFirstItem);
        setSelectedCategory(categoryIdOfFirstItem);
      }
    }
  }, [selectedCategory]);

  const RenderCategory = ({ item }) => {
    const handleSelectCategoryId = () => {
      const categoryId = item.categoryId;
      handleSelectCategory(categoryId);
      setSelectedCategory(categoryId);
    };

    const isActiveCategory = item.categoryId === selectedCategory;
    return (
      <TouchableOpacity
        onPress={handleSelectCategoryId}
        style={[styles.category, { backgroundColor: isActiveCategory ? 'black' : 'lightgrey' }]}
      >
        <Text style={[styles.categoryText, { color: isActiveCategory ? 'white' : 'black' }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item }) => {
    const handleSelectTemplateId = () => {
      const templateId = item.templateId;
      setSelectedItem(templateId);
      handleSelectItem(templateId);
    };
    const isActiveItem = item.templateId === selectedItem;

    return (
      <TouchableOpacity onPress={handleSelectTemplateId} style={styles.itemWrap}>
        <View
          style={[styles.item, { backgroundColor: item.color, borderWidth: isActiveItem ? 3 : 0 }]}
        >
          <Image style={styles.itemImage} source={item.image} />
        </View>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const RenderItemOption = ({ item }) => {
    const handleSelectTemplateId = () => {
      const templateId = item.templateId;
      setSelectedItem(templateId);
      handleSelectItem(templateId);
    };
    const isActiveItem = item.templateId === selectedItem;

    return (
      <TouchableOpacity
        onPress={handleSelectTemplateId}
        style={[styles.option, { backgroundColor: isActiveItem ? 'black' : 'lightgrey' }]}
      >
        <Text style={[styles.categoryText, { color: isActiveItem ? 'white' : 'black' }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={CATEGORIES}
        renderItem={RenderCategory}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={RenderItem}
      />
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        renderItem={RenderItemOption}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    margin: 5,
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 20,
  },
  option: {
    margin: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    padding: 5,
    borderRadius: 20,
  },
  item: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  itemWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  itemImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
  },
});