import 'react-native-reanimated'; // Ensure Reanimated is initialized
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';

export default function SplashScreen() {
  const router = useRouter(); // Use useRouter instead of router directly
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Track timeout

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check if user is already logged in
        const isLoggedIn = await SecureStore.getItemAsync('isLoggedIn');

        // Navigate to the appropriate screen after splash delay
        timeoutRef.current = setTimeout(() => {
          if (isLoggedIn === 'true') {
            router.replace('/(tabs)'); // Navigate to main screen
          } else {
            router.replace('/auth'); // Navigate to login screen
          }
        }, 2000);
      } catch (error) {
        console.error('Error checking login status:', error);
        timeoutRef.current = setTimeout(() => {
          router.replace('/auth');
        }, 2000);
      }
    };

    checkLoginStatus();

    return () => {
      // Clear timeout when component unmounts to prevent memory leaks
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
        style={styles.logoContainer}
      >
        <Image
          source={{ uri: 'https://moneytreerealty.com/assets/img/logo.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>
          Money Tree Realty
        </Text>
      </Animated.View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '70%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: 24,
    color: '#005b52',
    marginTop: 20,
    fontWeight: 'bold'
  }
});