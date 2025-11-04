import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import PositionBar from '@/components/PositionBar';
import CustomMarker from '@/components/CustomMarker';
import { useLocation } from '@/hooks/useLocation';

export default function MapScreen() {
  const { location, errorMsg, permissionGranted } = useLocation();
  const [mapReady, setMapReady] = useState(false);

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
        <Text style={styles.errorSubtext}>
          Veuillez activer la localisation dans les paramètres
        </Text>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Permission requise</Text>
        <Text style={styles.errorSubtext}>
          L'application a besoin d'accéder à votre position
        </Text>
      </View>
    );
  }

  const initialRegion = location.latitude && location.longitude
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={initialRegion}
        region={
          location.latitude && location.longitude
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
        showsUserLocation={false}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={() => setMapReady(true)}
        customMapStyle={[
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ]}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <CustomMarker />
          </Marker>
        )}
      </MapView>

      <PositionBar
        latitude={location.latitude}
        longitude={location.longitude}
        altitude={location.altitude}
        accuracy={location.accuracy}
        speed={location.speed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 40,
  },
  errorText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
});
