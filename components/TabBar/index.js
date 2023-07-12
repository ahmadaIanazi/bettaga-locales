import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeContext from '../../themes/theme';
import txt from '../../themes/txt';
import { useDesignStore } from '../../state/useDesignStore';

const TabBar = ({ state, descriptors, navigation }) => {
  const getFocused = useDesignStore((state) => state.getFocused);
  const color = useContext(themeContext);

  return (
    <SafeAreaView style={[styles.tabBarContainer, { backgroundColor: color.background}]}>
      {state.routes.map((route, index) => {
        const key = route.name;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          getFocused(route.name == 'Trails' ? 0 : 1);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
    
        const fontColor = isFocused ? color.primary : color.text;
        const iconColor = isFocused ? color.primary : color.text;
        const icon =
          index == 0
            ? 'brush'
            : index == 1
            ? 'location'
            : index == 2
            ? 'notifications'
            : index == 3
            ? 'md-document-text'
            : index == 4
            ? 'settings'
            : 'settings';
        // stats-chart, brush, qr-code, settings, link, menu
        const textSize = isFocused ? 12 : 12;
        const iconSize = isFocused ? 32 : 18;

        return (
          <TouchableOpacity
            key={key}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.touch}
          >
            <Ionicons name={icon} size={iconSize} color={iconColor} />
            <Animated.Text
              style={[isFocused ? txt.h3c : txt.h3cl, { fontSize: textSize, color: fontColor }]}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingVertical: -40,
    paddingTop: -80,
    alignItems: 'flex-end',
  },
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
