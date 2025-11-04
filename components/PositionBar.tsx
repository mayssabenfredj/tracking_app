import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { ChevronUp, ChevronDown, MapPin, Navigation } from 'lucide-react-native';

interface PositionBarProps {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  accuracy: number | null;
  speed: number | null;
}

export default function PositionBar({
  latitude,
  longitude,
  altitude,
  accuracy,
  speed,
}: PositionBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      tension: 50,
      friction: 8,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const maxHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [80, 280],
  });

  return (
    <Animated.View style={[styles.container, { height: maxHeight }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpand}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <View style={styles.iconCircle}>
            <Navigation size={20} color="#3b82f6" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Position GPS</Text>
            {latitude && longitude && (
              <Text style={styles.headerSubtitle}>
                {latitude.toFixed(6)}°, {longitude.toFixed(6)}°
              </Text>
            )}
          </View>
        </View>
        {isExpanded ? (
          <ChevronDown size={24} color="#64748b" />
        ) : (
          <ChevronUp size={24} color="#64748b" />
        )}
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Latitude</Text>
            <Text style={styles.value}>
              {latitude ? `${latitude.toFixed(6)}°` : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Longitude</Text>
            <Text style={styles.value}>
              {longitude ? `${longitude.toFixed(6)}°` : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Altitude</Text>
            <Text style={styles.value}>
              {altitude ? `${altitude.toFixed(1)} m` : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Précision</Text>
            <Text style={styles.value}>
              {accuracy ? `±${accuracy.toFixed(1)} m` : 'N/A'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Vitesse</Text>
            <Text style={styles.value}>
              {speed ? `${(speed * 3.6).toFixed(1)} km/h` : 'N/A'}
            </Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
  },
});
