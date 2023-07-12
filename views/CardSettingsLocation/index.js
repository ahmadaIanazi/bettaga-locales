import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import txts from '../../themes/texts';
import { FontAwesome } from '@expo/vector-icons';
import bttns from '../../themes/buttons';
import { Alert } from '../../../customized';
import themeContext from '../../themes/theme';
import { updateCard } from '../../operations/update';
import { useCardStore } from '../../state/useCardStore';


export default function CardSettingsLocation() {
  const { cardState } = useCardStore()
  const color = useContext(themeContext)
  const theme = color.theme ;
  const isDark = theme == 'dark'
  const [coordinate, setCoordinate] = useState({
    latitude: cardState?.passJson?.locations[0]?.latitude,
    longitude: cardState?.passJson?.locations[0]?.longitude,
  });
  const [initialRegion, setInitialRegion] = useState({
    latitude: cardState?.passJson?.locations[0]?.latitude,
    longitude: cardState?.passJson?.locations[0]?.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const submitButtonText = 'Update Location';
  const [loading, setLoading] = useState(false)
  const space = '    |    ';

  const handleMarkerDragEnd = (e) => {
    setCoordinate(e.nativeEvent.coordinate);
  };

  const handleUpdateLocation = () => {
    if(!loading){

      const type = 'location'
      const value = {
        altitude: 100,
        longitude: coordinate.longitude,
        latitude: coordinate.latitude,
      };
      onPressCancel();
      setLoading(true)
      updateCard(cardState, type, value)
      .then(()=>{
        setLoading(false)
      })
      .catch(()=>{
        setLoading(false)
      })
    }
  };

      const [Warning, setWarning] = useState(false);
      const [deactivated, setDeactivated] = useState(false);

      const handleWarning = () => {
        setWarning(true);
      };

      const onPressCancel = () => {
        setWarning(false);
      };



  const linearUp = [color.background , color.transparent ];
  const linearDown = [color.transparent, color.background];
  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121',
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c',
        },
      ],
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d',
        },
      ],
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={linearUp} style={styles.linearUp} />
        <View style={styles.header}>
          <Text style={{ fontWeight: 'bold' }}>Drop a pin on your business location</Text>
        </View>
        <MapView 
        userInterfaceStyle={isDark ? 'dark' : 'light'}
        init style={styles.map} customMapStyle={mapStyle}>
          <Marker draggable coordinate={coordinate} onDragEnd={handleMarkerDragEnd} />
          <View style={styles.footer}>
            <Text>Coordinates</Text>
          </View>
        </MapView>
        <View style={styles.coordinates}>
          <Text>{coordinate.latitude}</Text>
          <Text style={{ fontWeight: 'bold' }}>{space}</Text>
          <Text>{coordinate.longitude}</Text>
        </View>
        <TouchableOpacity
          onPress={handleWarning}
          style={[bttns.dynamic, styles.bttns, { backgroundColor: color.primary }]}
        >
          {loading ? (
            <ActivityIndicator size='large' color={color.text} />
          ) : (
            <>
              <Text style={txts.action}>{submitButtonText}</Text>
              <FontAwesome style={styles.bttnIcon} name='refresh' size={24} color='white' />
            </>
          )}
        </TouchableOpacity>
        <LinearGradient colors={linearDown} style={styles.linearDown} />
      </View>
      {Warning && (
        <Alert
          onPressCancel={onPressCancel}
          onPressOk={handleUpdateLocation}
          title='Are you sure?'
          message='This cannot be un-done ! No backsies !!'
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coordinates: {
    flexDirection:'row',
    zIndex: 120,
    bottom: 180,
    position: 'absolute',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  header: {
    zIndex: 100,
    top: 50,
    position: 'absolute',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  footer: {
    zIndex: 100,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  linearUp: {
    zIndex: 100,
    top: 0,
    position: 'absolute',
    height: 50,
    width: '100%',
  },
  linearDown: {
    zIndex: 1,
    bottom: 0,
    position: 'absolute',
    height: 200,
    width: '100%',
  },
  bttns: {
    zIndex: 100,
    marginHorizontal: 30,
    marginVertical: 20,
    flexDirection: 'row',
    bottom: 60,
    width: '80%',
    alignSelf: 'center',
    position: 'absolute',
  },
  bttnIcon: {
    marginHorizontal: 10,
  },
});
