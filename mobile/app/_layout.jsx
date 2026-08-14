import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { DMMono_400Regular } from '@expo-google-fonts/dm-mono/400Regular';
import { DMMono_500Medium } from '@expo-google-fonts/dm-mono/500Medium';
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
  // 'fade' rather than 'slide_from_right' — the latter isn't reliably
  // supported by native-stack on web, where this app is mostly demoed.
  animation: 'fade',
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
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
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
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootNavigator fontsReady={fontsLoaded} />
    </AuthProvider>
  );
}
