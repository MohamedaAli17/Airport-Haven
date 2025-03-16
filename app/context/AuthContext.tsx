import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

// Initialize Firebase - Replace with your config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  favorites: string[];
  addToFavorites: (id: string) => Promise<void>;
  removeFromFavorites: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Load favorites from AsyncStorage when user logs in
        try {
          const storedFavorites = await AsyncStorage.getItem(`favorites_${user.uid}`);
          if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setFavorites([]);
      await AsyncStorage.removeItem(`favorites_${user?.uid}`);
    } catch (error) {
      throw error;
    }
  };

  const addToFavorites = async (id: string) => {
    if (!user) return;
    try {
      const newFavorites = [...favorites, id];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (id: string) => {
    if (!user) return;
    try {
      const newFavorites = favorites.filter(favId => favId !== id);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 