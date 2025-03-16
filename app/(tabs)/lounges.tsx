import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type LoungeAccess = 'Priority Pass' | 'First Class' | 'Business Class' | 'Pay Per Visit' | 'Airline Specific';

interface Lounge {
  id: string;
  name: string;
  terminal: number;
  openingHours: string;
  description: string;
  accessTypes: LoungeAccess[];
  amenities: string[];
  pricePerVisit?: number;
  rating: number;
}

const SAMPLE_LOUNGES: Lounge[] = [
  {
    id: '1',
    name: 'Plaza Premium Lounge',
    terminal: 5,
    openingHours: '5:00 AM - 10:00 PM',
    description: 'Award-winning lounge with premium facilities and dining options',
    accessTypes: ['Priority Pass', 'Pay Per Visit'],
    amenities: ['Shower Facilities', 'Hot Food', 'Bar Service', 'Wi-Fi', 'Business Center'],
    pricePerVisit: 40,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'British Airways Galleries Club',
    terminal: 5,
    openingHours: '5:00 AM - 10:30 PM',
    description: 'Exclusive lounge for British Airways passengers',
    accessTypes: ['Business Class', 'Airline Specific'],
    amenities: ['Champagne Bar', 'Spa', 'Private Work Pods', 'Restaurant', 'Showers'],
    rating: 4.8,
  },
  // Add more sample lounges as needed
];

export default function LoungesScreen() {
  const [selectedTerminal, setSelectedTerminal] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLounges = SAMPLE_LOUNGES.filter(lounge => {
    const matchesTerminal = selectedTerminal === null || lounge.terminal === selectedTerminal;
    const matchesSearch = lounge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lounge.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTerminal && matchesSearch;
  });

  const LoungeCard = ({ lounge }: { lounge: Lounge }) => (
    <TouchableOpacity style={styles.loungeCard}>
      <View style={styles.loungeHeader}>
        <Text style={styles.loungeName}>{lounge.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{lounge.rating}</Text>
        </View>
      </View>
      <Text style={styles.terminal}>Terminal {lounge.terminal}</Text>
      <Text style={styles.hours}>{lounge.openingHours}</Text>
      <Text style={styles.description}>{lounge.description}</Text>
      
      <View style={styles.accessContainer}>
        <Text style={styles.sectionTitle}>Access Options:</Text>
        <View style={styles.tagContainer}>
          {lounge.accessTypes.map(access => (
            <View key={access} style={styles.accessTag}>
              <Text style={styles.accessText}>{access}</Text>
            </View>
          ))}
          {lounge.pricePerVisit && (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>£{lounge.pricePerVisit}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.amenitiesContainer}>
        <Text style={styles.sectionTitle}>Amenities:</Text>
        <View style={styles.tagContainer}>
          {lounge.amenities.map(amenity => (
            <View key={amenity} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search lounges..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal style={styles.terminalsContainer} showsHorizontalScrollIndicator={false}>
        {[null, 1, 2, 3, 4, 5].map((terminal) => (
          <TouchableOpacity
            key={terminal === null ? 'all' : terminal}
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
              {terminal === null ? 'All Terminals' : `T${terminal}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.loungeList}>
        {filteredLounges.map(lounge => (
          <LoungeCard key={lounge.id} lounge={lounge} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  terminalsContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  terminalButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: 'white',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  loungeList: {
    padding: 15,
  },
  loungeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loungeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  loungeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  terminal: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  hours: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  accessContainer: {
    marginBottom: 15,
  },
  amenitiesContainer: {
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  accessTag: {
    backgroundColor: '#e8f0fe',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  accessText: {
    fontSize: 12,
    color: '#1a73e8',
  },
  priceTag: {
    backgroundColor: '#e6ffe6',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  priceText: {
    fontSize: 12,
    color: '#2e7d32',
  },
  amenityTag: {
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 12,
    color: '#666',
  },
}); 