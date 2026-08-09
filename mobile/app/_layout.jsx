import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { Manrope_400Regular } from '@expo-google-fonts/manrope/400Regular';
import { Manrope_500Medium } from '@expo-google-fonts/manrope/500Medium';
import { Manrope_600SemiBold } from '@expo-google-fonts/manrope/600SemiBold';
import { Manrope_700Bold } from '@expo-google-fonts/manrope/700Bold';
import { AuthProvider, useAuth } from '../lib/auth';
import { Loading } from '../components/ui';
import { colors, fonts } from '../lib/theme';

const AUTH_ROUTES = ['login', 'register'];

function useAuthRedirect() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const onAuthScreen = AUTH_ROUTES.includes(segments[0]);
    if (!user && !onAuthScreen) router.replace('/login');
    else if (user && onAuthScreen) router.replace('/');
  }, [user, loading, segments, router]);
}

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.panel,
  },
  headerShadowVisible: false,
  headerTintColor: colors.accent,
  headerTitleStyle: {
    color: colors.ink,
    fontFamily: fonts.bodySemi,
    fontSize: 17,
  },
  contentStyle: { backgroundColor: colors.bg },
};

function RootNavigator({ fontsReady }) {
  const { loading } = useAuth();
  useAuthRedirect();

  if (!fontsReady || loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <Loading />
      </View>
    );
  }

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'Create account' }} />
      <Stack.Screen name="courses/new" options={{ title: 'New course' }} />
      <Stack.Screen name="courses/[id]/index" options={{ title: 'Course' }} />
      <Stack.Screen name="courses/[id]/lessons/new" options={{ title: 'New lesson' }} />
      <Stack.Screen name="lessons/[id]" options={{ title: 'Lesson' }} />
      <Stack.Screen name="quizzes/[id]" options={{ title: 'Quiz' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootNavigator fontsReady={fontsLoaded} />
    </AuthProvider>
  );
}
