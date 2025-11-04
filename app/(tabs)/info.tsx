import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MapPin, Navigation, Globe, Info as InfoIcon } from 'lucide-react-native';
import { useLocation } from '@/hooks/useLocation';

export default function InfoScreen() {
  const { location, permissionGranted } = useLocation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <InfoIcon size={32} color="#3b82f6" strokeWidth={2.5} />
        </View>
        <Text style={styles.title}>GPS Tracker</Text>
        <Text style={styles.subtitle}>Suivi de position en temps réel</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <MapPin size={24} color="#3b82f6" />
          <Text style={styles.cardTitle}>À propos</Text>
        </View>
        <Text style={styles.cardText}>
          Cette application utilise OpenStreetMap pour afficher votre position
          GPS en temps réel. Elle suit vos déplacements et vous fournit des
          informations détaillées sur votre localisation.
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Navigation size={24} color="#3b82f6" />
          <Text style={styles.cardTitle}>Fonctionnalités</Text>
        </View>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• Tracking GPS en temps réel</Text>
          <Text style={styles.featureItem}>• Carte OpenStreetMap interactive</Text>
          <Text style={styles.featureItem}>• Affichage de la vitesse</Text>
          <Text style={styles.featureItem}>• Précision GPS en mètres</Text>
          <Text style={styles.featureItem}>• Altitude et coordonnées</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Globe size={24} color="#3b82f6" />
          <Text style={styles.cardTitle}>Statut</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Permission GPS</Text>
          <View
            style={[
              styles.statusBadge,
              permissionGranted ? styles.statusSuccess : styles.statusError,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                permissionGranted
                  ? styles.statusSuccessText
                  : styles.statusErrorText,
              ]}
            >
              {permissionGranted ? 'Accordée' : 'Refusée'}
            </Text>
          </View>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Position</Text>
          <View
            style={[
              styles.statusBadge,
              location.latitude ? styles.statusSuccess : styles.statusWarning,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                location.latitude
                  ? styles.statusSuccessText
                  : styles.statusWarningText,
              ]}
            >
              {location.latitude ? 'Détectée' : 'En attente'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
        <Text style={styles.footerSubtext}>Propulsé par OpenStreetMap</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 24,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 24,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statusLabel: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusSuccess: {
    backgroundColor: '#dcfce7',
  },
  statusWarning: {
    backgroundColor: '#fef3c7',
  },
  statusError: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusSuccessText: {
    color: '#166534',
  },
  statusWarningText: {
    color: '#854d0e',
  },
  statusErrorText: {
    color: '#991b1b',
  },
  footer: {
    alignItems: 'center',
    padding: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  footerSubtext: {
    fontSize: 13,
    color: '#cbd5e1',
    marginTop: 4,
  },
});
