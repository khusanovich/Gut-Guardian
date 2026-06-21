import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function SplashScreen() {
  const { go } = useApp();
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -7,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={['#8CCBF7', '#74896D', '#5A6B56']}
      locations={[0, 0.55, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.8 }}
      style={styles.container}
    >
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <View style={styles.topSection}>
        <Text style={styles.eyebrow}>A GUT-HEALTH MYSTERY</Text>
      </View>

      <View style={styles.centerSection}>
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <View style={styles.logoRing}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🔍</Text>
            </View>
          </View>
        </Animated.View>
        <View>
          <Text style={styles.title}>Gut Guardian</Text>
          <Text style={styles.subtitle}>Solve your body's mystery</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => go('story')}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.footnote}>14 days · log meals · crack the case</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    paddingTop: 64,
    paddingBottom: 44,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.14)',
    top: -60,
    left: -70,
  },
  decorCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.10)',
    bottom: 30,
    right: -60,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 24,
  },
  eyebrow: {
    fontSize: Typography.size13,
    letterSpacing: 3,
    fontFamily: Typography.bodyExtraBold,
    color: 'rgba(255,255,255,0.7)',
  },
  centerSection: {
    alignItems: 'center',
    gap: 22,
  },
  logoRing: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 66,
  },
  title: {
    fontFamily: Typography.displayBold,
    fontSize: Typography.size46,
    color: Colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size17,
    fontFamily: Typography.bodySemiBold,
    color: 'rgba(255,255,255,0.82)',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    ...Shadows.buttonPurple,
  },
  buttonText: {
    fontFamily: Typography.display,
    fontSize: Typography.size19,
    color: '#74896D',
  },
  footnote: {
    fontSize: Typography.size13,
    fontFamily: Typography.bodySemiBold,
    color: 'rgba(255,255,255,0.6)',
  },
});
