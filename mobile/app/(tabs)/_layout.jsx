import { Pressable, Text } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../lib/auth';
import { colors, fonts } from '../../lib/theme';

function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <Pressable
      onPress={async () => {
        await logout();
        router.replace('/login');
      }}
      hitSlop={12}
      style={{ paddingHorizontal: 16 }}
    >
      <Text style={{ color: colors.accent, fontSize: 14, fontFamily: fonts.bodySemi }}>Log out</Text>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.panel },
        headerShadowVisible: false,
        headerTintColor: colors.ink,
        headerTitleStyle: { color: colors.ink, fontFamily: fonts.bodySemi, fontSize: 17 },
        headerRight: () => <LogoutButton />,
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontFamily: fonts.bodyMedium, fontSize: 12 },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => <Ionicons name="library" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'My Progress',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
