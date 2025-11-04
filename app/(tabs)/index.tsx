import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PositionBar from '@/components/PositionBar';
import OpenStreetMap from '@/components/OpenStreetMap';
import { useMockGPS } from '@/hooks/useMockGPS';

/**
 * GPS Tracking Screen
 * 
 * This app displays real-time GPS position data from external hardware GPS.
 * No device GPS permissions needed - position comes from hardware backend.
 * 
 * Currently uses mock GPS data for development. Replace useMockGPS with
 * real backend API/WebSocket calls when hardware is ready.
 */
export default function MapScreen() {
  const [mapReady, setMapReady] = useState(false);
  
  // Mock GPS data (simulates hardware GPS updates)
  // TODO: Replace with real hardware GPS data via WebSocket/API
  const position = useMockGPS(3000); // Update every 3 seconds

  return (
    <View style={styles.container}>
      <OpenStreetMap
        latitude={position.latitude}
        longitude={position.longitude}
        zoom={15}
        showMarker={true}
        followPosition={false}
        onMapReady={() => setMapReady(true)}
      />

      <PositionBar
        latitude={position.latitude}
        longitude={position.longitude}
        altitude={position.altitude}
        accuracy={position.accuracy}
        speed={position.speed}
      />
      
      {/* Development info banner */}
      <View style={styles.devBanner}>
        <Text style={styles.devText}>
          🔧 Mode développement - Données GPS simulées
        </Text>
      </View>
    </View>
  );
}

    // Dynamic import of react-native-maps done outside the render flow with a side-effect
    // so Metro/Expo won't eagerly evaluate native modules when routes are scanned in Expo Go.
    // We intentionally do not import maps at module top-level.
    // Kick off the dynamic import when the module loads (this runs when the component mounts).
    // If the import fails (native module missing), we set mapsModule to null to show a helpful placeholder.
    // Note: we keep the import here (in file scope) but it will only execute when this file is evaluated
    // at runtime (after Metro decides to run this route's code). To be extra safe, we trigger import in a
    // small effect inside the component instead of module top-level; see the useEffect above.

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  devBanner: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.95)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  devText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});
