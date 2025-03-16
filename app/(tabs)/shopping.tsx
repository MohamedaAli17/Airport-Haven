import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ShopCategory = 'All' | 'Duty Free' | 'Fashion' | 'Electronics' | 'Gifts' | 'Beauty';

interface Shop {
  id: string;
  name: string;
  category: ShopCategory;
  terminal: number;
  openingHours: string;
  description: string;
  brands?: string[];
}

const SAMPLE_SHOPS: Shop[] = [
  {
    id: '1',
    name: 'World Duty Free',
    category: 'Duty Free',
    terminal: 5,
    openingHours: '6:00 AM - 10:00 PM',
    description: 'Tax-free shopping for perfumes, spirits, and luxury goods',
    brands: ['Chanel', 'Dior', 'Jo Malone', 'Johnnie Walker'],
  },
  {
    id: '2',
    name: 'Harrods',
    category: 'Fashion',
    terminal: 5,
    openingHours: '6:00 AM - 10:00 PM',
    description: 'Luxury department store offering fashion and accessories',
    brands: ['Gucci', 'Prada', 'Burberry'],
  },
  // Add more sample shops as needed
];

export default function ShoppingScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory>('All');
  const [selectedTerminal, setSelectedTerminal] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ShopCategory[] = ['All', 'Duty Free', 'Fashion', 'Electronics', 'Gifts', 'Beauty'];

  const filteredShops = SAMPLE_SHOPS.filter(shop => {
    const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;
    const matchesTerminal = selectedTerminal === null || shop.terminal === selectedTerminal;
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.brands?.some(brand => brand.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesTerminal && matchesSearch;
  });

  const ShopCard = ({ shop }: { shop: Shop }) => (
    <TouchableOpacity style={styles.shopCard}>
      <Text style={styles.shopName}>{shop.name}</Text>
      <Text style={styles.category}>{shop.category}</Text>
      <Text style={styles.terminal}>Terminal {shop.terminal}</Text>
      <Text style={styles.hours}>{shop.openingHours}</Text>
      <Text style={styles.description}>{shop.description}</Text>
      {shop.brands && shop.brands.length > 0 && (
        <View style={styles.brandsContainer}>
          <Text style={styles.brandsTitle}>Featured Brands:</Text>
          <View style={styles.brandsList}>
            {shop.brands.map((brand, index) => (
              <View key={brand} style={styles.brandTag}>
                <Text style={styles.brandText}>{brand}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops or brands..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal style={styles.filtersContainer} showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.filterText,
              selectedCategory === category && styles.filterTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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

      <ScrollView style={styles.shopList}>
        {filteredShops.map(shop => (
          <ShopCard key={shop.id} shop={shop} />
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
  filtersContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  shopList: {
    padding: 15,
  },
  shopCard: {
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
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  category: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 5,
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
  brandsContainer: {
    marginTop: 5,
  },
  brandsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  brandsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  brandTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  brandText: {
    fontSize: 12,
    color: '#666',
  },
}); 