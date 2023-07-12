import { StyleSheet, View } from 'react-native';

export default function ScanPlaceholder() {
  const radius = 4;
  const length = 20;
  const space = 150
  const spaceVertical = 40
  const think = 4;

  const styles = {
    topLeft: {
      borderRadius: radius,
      height: length,
      width: length,
      borderColor: 'white',
      borderBottomWidth: 0,
      borderTopWidth: think,
      borderLeftWidth: think,
      borderRightWidth: 0,
    },
    topRight: {
      borderRadius: radius,
      borderColor: 'white',

      height: length,
      width: length,
      borderBottomWidth: 0,
      borderTopWidth: think,
      borderLeftWidth: 0,
      borderRightWidth: think,
    },
    bottomLeft: {
      borderRadius: radius,
      borderColor: 'white',

      height: length,
      width: length,
      borderBottomWidth: think,
      borderTopWidth: 0,
      borderLeftWidth: think,
      borderRightWidth: 0,
    },
    bottomRight: {
      borderRadius: radius,
      borderColor: 'white',
      height: length,
      width: length,
      borderBottomWidth: think,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: think,
    },
  };

  return (
    <View
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: -80,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.topLeft} />
        <View style={{ width: space }} />
        <View style={styles.topRight} />
      </View>
      <View style={{ height: spaceVertical }} />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bottomLeft} />
        <View style={{ width: space }} />
        <View style={styles.bottomRight} />
      </View>
    </View>
  );
}
