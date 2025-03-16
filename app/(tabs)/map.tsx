import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

interface Location {
  id: string;
  name: string;
  terminal: number;
  type: 'Restaurant' | 'Shop' | 'Lounge' | 'Gate' | 'Service';
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const SAMPLE_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Gordon Ramsay Plane Food',
    terminal: 5,
    type: 'Restaurant',
    coordinates: {
      latitude: 51.4700,
      longitude: -0.4543,
    },
  },
  {
    id: '2',
    name: 'World Duty Free',
    terminal: 5,
    type: 'Shop',
    coordinates: {
      latitude: 51.4702,
      longitude: -0.4545,
    },
  },
  // Add more sample locations
];

export default function MapScreen() {
  const [selectedTerminal, setSelectedTerminal] = useState<number>(5);
  const [selectedLocationType, setSelectedLocationType] = useState<Location['type'] | 'All'>('All');

  const filteredLocations = SAMPLE_LOCATIONS.filter(location => {
    const matchesTerminal = location.terminal === selectedTerminal;
    const matchesType = selectedLocationType === 'All' || location.type === selectedLocationType;
    return matchesTerminal && matchesType;
  });

  const locationTypes: (Location['type'] | 'All')[] = ['All', 'Restaurant', 'Shop', 'Lounge', 'Gate', 'Service'];

  const getMarkerColor = (type: Location['type']) => {
    switch (type) {
      case 'Restaurant':
        return '#FF6B6B';
      case 'Shop':
        return '#4ECDC4';
      case 'Lounge':
        return '#45B7D1';
      case 'Gate':
        return '#96CEB4';
      case 'Service':
        return '#FFEEAD';
      default:
        return '#666666';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.terminalsContainer} showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((terminal) => (
          <TouchableOpacity
            key={terminal}
            style={[
              styles.terminalButton,
              selectedTerminal === terminal && styles.terminalButtonActive
            ]}
            onPress={() => setSelectedTerminal(terminal)}
          >
            <Text style={[
              styles.terminalText,
              selectedTerminal === terminal && styles.terminalTextActive
            ]}>
              Terminal {terminal}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal style={styles.filterContainer} showsHorizontalScrollIndicator={false}>
        {locationTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedLocationType === type && styles.filterButtonActive
            ]}
            onPress={() => setSelectedLocationType(type)}
          >
            <Text style={[
              styles.filterText,
              selectedLocationType === type && styles.filterTextActive
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 51.4700,
          longitude: -0.4543,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {filteredLocations.map(location => (
          <Marker
            key={location.id}
            coordinate={location.coordinates}
            pinColor={getMarkerColor(location.type)}
          >
            <View style={styles.markerContainer}>
              <View style={[styles.marker, { backgroundColor: getMarkerColor(location.type) }]}>
                <Ionicons
                  name={
                    location.type === 'Restaurant' ? 'restaurant' :
                    location.type === 'Shop' ? 'cart' :
                    location.type === 'Lounge' ? 'business' :
                    location.type === 'Gate' ? 'airplane' :
                    'information-circle'
                  }
                  size={16}
                  color="white"
                />
              </View>
              <Text style={styles.markerLabel}>{location.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Map Legend</Text>
        <View style={styles.legendItems}>
          {locationTypes.filter(type => type !== 'All').map(type => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: getMarkerColor(type as Location['type']) }]} />
              <Text style={styles.legendText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  terminalsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  terminalButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  terminalButtonActive: {
    backgroundColor: '#007AFF',
  },
  terminalText: {
    color: '#333',
    fontWeight: '600',
  },
  terminalTextActive: {
    color: 'white',
  },
  filterContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#333',
    fontWeight: '600',
  },
  filterTextActive: {
    color: 'white',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerLabel: {
    fontSize: 12,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
    color: '#333',
    fontWeight: '500',
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  legendItems: {
    flexDirection: 'column',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
}); 