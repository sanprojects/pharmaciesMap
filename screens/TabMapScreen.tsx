import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import MapView, {Geojson, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import InfoPanel from "../components/InfoPanel";
import {Icon} from "@rneui/base";
import BottomSheet from "../components/BottomSheet";

export default function TabMapScreen() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});
  const mapRef = React.useRef(null);

  const getMovies = async () => {
    try {
      const response = await fetch('https://sanstv.ru/pharmacies/data/today.php');
      const json = await response.json();
      setMarkers(json);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  }

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  useEffect(() => {
    getMovies();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      mapRef.current.setNativeProps({
        showsUserLocation: true,
        userTrackingMode: 2,
        isUserLocationVisible: true,
      });

    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          zoomControlEnabled={true}
          showsScale={true}
          showsBuildings={true}
          followsUserLocation={false}
          userLocationAnnotationTitle={'userLocationAnnotationTitle'}
          toolbarEnabled={true}
      >
        {markers.map((marker, i) => (
            <Marker
                key={marker.name}
                //pinColor={"red"}
                //tappable={true}
                stopPropagation={true}
                //zIndex={selectedMarker.name == marker.name ? 0 : 99}
                //title={marker.name}
                coordinate={{latitude: marker.lat, longitude: marker.lng}}
                //style={{width: 36, height: 38}}
                onSelect={() => {
                  setSelectedMarker(marker)
                  bottomSheetRef.current?.show()
                }}
                onDeselect={() => {
                  //bottomSheetRef.current?.close()
                  //setSelectedMarker({})
                }}
                //centerOffset={{x:-10, y:-10}}
            >

                <Icon size={selectedMarker.name == marker.name ? 30 : 20}
                      reverse
                      reverseColor='#070'
                      name='hospital'
                      type="font-awesome-5"
                      color='rgba(255,255,255,0.7)'/>

            </Marker>
        ))}
      </MapView>


      <BottomSheet
        height={225}
        backgroundColor={'transparent'}
        sheetBackgroundColor={'transparent'}
        ref={bottomSheetRef}
        hasDraggableIcon
        draggable
      >
        <InfoPanel style={styles.shadow} {...selectedMarker} />
      </BottomSheet>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
});
