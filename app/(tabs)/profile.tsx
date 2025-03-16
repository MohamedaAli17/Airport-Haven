import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout, favorites } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const sections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person',
          label: 'Email',
          value: user?.email,
        },
        {
          icon: 'notifications',
          label: 'Notifications',
          onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon.'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'language',
          label: 'Language',
          value: 'English',
          onPress: () => Alert.alert('Coming Soon', 'Language settings will be available soon.'),
        },
        {
          icon: 'color-palette',
          label: 'Theme',
          value: 'Light',
          onPress: () => Alert.alert('Coming Soon', 'Theme settings will be available soon.'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle',
          label: 'Help Center',
          onPress: () => Alert.alert('Coming Soon', 'Help center will be available soon.'),
        },
        {
          icon: 'information-circle',
          label: 'About',
          onPress: () => Alert.alert('About', 'Heathrow Guide v1.0.0'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#007AFF" />
          <Text style={styles.userName}>{user?.email?.split('@')[0]}</Text>
        </View>
      </View>

      {sections.map((section, index) => (
        <View key={section.title} style={[styles.section, index > 0 && styles.sectionMargin]}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                itemIndex === section.items.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={24} color="#666" />
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && <Text style={styles.menuItemValue}>{item.value}</Text>}
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  section: {
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  sectionMargin: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e1e1',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 40,
    paddingVertical: 16,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 