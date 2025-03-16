import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type FoodCategory = 'All' | 'Fast Food' | 'Fine Dining' | 'Cafe' | 'Vegan' | 'Bar';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks' | 'Sides';
  dietary?: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Halal')[];
}

interface Restaurant {
  id: string;
  name: string;
  category: FoodCategory;
  terminal: number;
  rating: number;
  openingHours: string;
  description: string;
  menu: MenuItem[];
}

const SAMPLE_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Gordon Ramsay Plane Food',
    category: 'Fine Dining',
    terminal: 5,
    rating: 4.5,
    openingHours: '5:30 AM - 9:30 PM',
    description: 'Celebrity chef restaurant offering British cuisine',
    menu: [
      {
        id: '1-1',
        name: 'Beef Wellington',
        description: 'Classic Beef Wellington with mushroom duxelles and red wine sauce',
        price: 32.00,
        category: 'Mains',
      },
      {
        id: '1-2',
        name: 'Scottish Salmon',
        description: 'Pan-seared salmon with crushed potatoes and herb butter sauce',
        price: 28.00,
        category: 'Mains',
        dietary: ['Gluten-Free'],
      },
      {
        id: '1-3',
        name: 'Sticky Toffee Pudding',
        description: 'Classic British dessert with vanilla ice cream',
        price: 12.00,
        category: 'Desserts',
      },
    ],
  },
  {
    id: '2',
    name: 'Pret A Manger',
    category: 'Cafe',
    terminal: 5,
    rating: 4.0,
    openingHours: '24/7',
    description: 'Fresh sandwiches, salads and coffee',
    menu: [
      {
        id: '2-1',
        name: 'Classic Super Club',
        description: 'Chicken, bacon, tomatoes, lettuce, and mayo sandwich',
        price: 6.99,
        category: 'Mains',
      },
      {
        id: '2-2',
        name: 'Vegan VLT',
        description: 'Plant-based bacon, lettuce, and tomato sandwich',
        price: 5.99,
        category: 'Mains',
        dietary: ['Vegan'],
      },
      {
        id: '2-3',
        name: 'Flat White',
        description: 'Espresso with steamed milk',
        price: 3.49,
        category: 'Drinks',
        dietary: ['Vegetarian'],
      },
    ],
  },
  {
    id: '3',
    name: 'Wagamama',
    category: 'Fast Food',
    terminal: 2,
    rating: 4.3,
    openingHours: '6:00 AM - 10:00 PM',
    description: 'Asian fusion cuisine featuring noodles and curry dishes',
    menu: [
      {
        id: '3-1',
        name: 'Chicken Katsu Curry',
        description: 'Breaded chicken with curry sauce and rice',
        price: 14.95,
        category: 'Mains',
      },
      {
        id: '3-2',
        name: 'Vegan Ramen',
        description: 'Mushroom and vegetable broth with rice noodles',
        price: 13.95,
        category: 'Mains',
        dietary: ['Vegan', 'Vegetarian'],
      },
      {
        id: '3-3',
        name: 'Gyoza',
        description: 'Pan-fried dumplings with dipping sauce',
        price: 7.95,
        category: 'Starters',
      },
    ],
  },
  {
    id: '4',
    name: 'The Flying Vegan',
    category: 'Vegan',
    terminal: 3,
    rating: 4.4,
    openingHours: '7:00 AM - 9:00 PM',
    description: 'Plant-based comfort food and healthy options',
    menu: [
      {
        id: '4-1',
        name: 'Beyond Burger',
        description: 'Plant-based burger with vegan cheese and fries',
        price: 15.99,
        category: 'Mains',
        dietary: ['Vegan', 'Vegetarian'],
      },
      {
        id: '4-2',
        name: 'Buddha Bowl',
        description: 'Quinoa, roasted vegetables, and tahini dressing',
        price: 13.99,
        category: 'Mains',
        dietary: ['Vegan', 'Vegetarian', 'Gluten-Free'],
      },
      {
        id: '4-3',
        name: 'Smoothie Bowl',
        description: 'Acai blend with fresh fruits and granola',
        price: 9.99,
        category: 'Mains',
        dietary: ['Vegan', 'Vegetarian'],
      },
    ],
  },
  {
    id: '5',
    name: 'The Globe Bar',
    category: 'Bar',
    terminal: 4,
    rating: 4.2,
    openingHours: '10:00 AM - 11:00 PM',
    description: 'International beers, wines, and bar snacks',
    menu: [
      {
        id: '5-1',
        name: 'Craft Beer Flight',
        description: 'Selection of four local craft beers',
        price: 12.00,
        category: 'Drinks',
      },
      {
        id: '5-2',
        name: 'Cheese Board',
        description: 'Selection of international cheeses with crackers',
        price: 16.00,
        category: 'Starters',
        dietary: ['Vegetarian'],
      },
      {
        id: '5-3',
        name: 'Wings Platter',
        description: 'Mixed wing flavors with dipping sauces',
        price: 14.00,
        category: 'Mains',
      },
    ],
  },
];

export default function FoodScreen() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [selectedTerminal, setSelectedTerminal] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const categories: FoodCategory[] = ['All', 'Fast Food', 'Fine Dining', 'Cafe', 'Vegan', 'Bar'];

  const filteredRestaurants = SAMPLE_RESTAURANTS.filter(restaurant => {
    const matchesCategory = selectedCategory === 'All' || restaurant.category === selectedCategory;
    const matchesTerminal = selectedTerminal === null || restaurant.terminal === selectedTerminal;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTerminal && matchesSearch;
  });

  const MenuModal = ({ restaurant, visible, onClose }: { restaurant: Restaurant | null, visible: boolean, onClose: () => void }) => {
    if (!restaurant) return null;

    const menuCategories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Sides'];
    
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{restaurant.name}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.menuList}>
              {menuCategories.map(category => {
                const items = restaurant.menu.filter(item => item.category === category);
                if (items.length === 0) return null;

                return (
                  <View key={category} style={styles.menuSection}>
                    <Text style={styles.menuCategoryTitle}>{category}</Text>
                    {items.map(item => (
                      <View key={item.id} style={styles.menuItem}>
                        <View style={styles.menuItemHeader}>
                          <Text style={styles.menuItemName}>{item.name}</Text>
                          <Text style={styles.menuItemPrice}>£{item.price.toFixed(2)}</Text>
                        </View>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                        {item.dietary && item.dietary.length > 0 && (
                          <View style={styles.dietaryContainer}>
                            {item.dietary.map(diet => (
                              <View key={diet} style={styles.dietaryTag}>
                                <Text style={styles.dietaryText}>{diet}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
    <TouchableOpacity 
      style={styles.restaurantCard}
      onPress={() => setSelectedRestaurant(restaurant)}
    >
      <View style={styles.restaurantHeader}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
        </View>
      </View>
      <Text style={styles.category}>{restaurant.category}</Text>
      <Text style={styles.terminal}>Terminal {restaurant.terminal}</Text>
      <Text style={styles.hours}>{restaurant.openingHours}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
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

      <ScrollView style={styles.restaurantList}>
        {filteredRestaurants.map(restaurant => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </ScrollView>

      <MenuModal
        restaurant={selectedRestaurant}
        visible={selectedRestaurant !== null}
        onClose={() => setSelectedRestaurant(null)}
      />
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
  restaurantList: {
    padding: 15,
  },
  restaurantCard: {
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
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  restaurantName: {
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  menuList: {
    padding: 20,
  },
  menuSection: {
    marginBottom: 20,
  },
  menuCategoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  menuItem: {
    marginBottom: 15,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dietaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dietaryTag: {
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  dietaryText: {
    fontSize: 12,
    color: '#007AFF',
  },
}); 