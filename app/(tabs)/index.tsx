import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Link, Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface QuickNavButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: Href<string>;
}

const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const QuickNavButton = ({ icon, label, route }: QuickNavButtonProps) => (
    <Link href={route} asChild>
      <TouchableOpacity style={styles.quickNavButton}>
        <Ionicons name={icon} size={24} color="#007AFF" />
        <Text style={styles.quickNavLabel}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScrollView style={styles.container}>
      <BlurView intensity={100} style={styles.header}>
        <Text style={styles.airportName}>London Heathrow Airport (LHR)</Text>
        <Text style={styles.currentTime}>
          {currentTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </BlurView>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants, shops, or lounges..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.flightContainer}>
        <TextInput
          style={styles.flightInput}
          placeholder="Enter flight number for updates"
          value={flightNumber}
          onChangeText={setFlightNumber}
        />
        <TouchableOpacity style={styles.flightButton}>
          <Text style={styles.flightButtonText}>Track Flight</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickNavContainer}>
        <QuickNavButton icon="restaurant" label="Food" route="/food" />
        <QuickNavButton icon="cart" label="Shopping" route="/shopping" />
        <QuickNavButton icon="business" label="Lounges" route="/lounges" />
        <QuickNavButton icon="map" label="Terminal Map" route="/map" />
      </View>

      <View style={styles.terminalSection}>
        <Text style={styles.sectionTitle}>Select Terminal</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.terminalScroll}>
          {[1, 2, 3, 4, 5].map((terminal) => (
            <TouchableOpacity key={terminal} style={styles.terminalButton}>
              <Text style={styles.terminalText}>T{terminal}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  airportName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  currentTime: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
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
  flightContainer: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flightInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  flightButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 12,
  },
  flightButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quickNavContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  quickNavButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickNavLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  terminalSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  terminalScroll: {
    flexDirection: 'row',
  },
  terminalButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  terminalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeScreen;
