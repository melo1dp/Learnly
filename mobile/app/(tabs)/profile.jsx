import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApi } from '../../lib/useApi';
import { useAuth } from '../../lib/auth';
import {
  Button,
  Card,
  ErrorScreen,
  Loading,
  Pill,
  Row,
  SectionHeader,
} from '../../components/ui';
import { colors, fonts, space, type } from '../../lib/theme';

function initials(name) {
  return (name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { data: progress, error, refreshing, refresh } = useApi('/progress');

  if (error) return <ErrorScreen message={error} />;
  if (!progress) return <Loading />;

  const quizAttempts = progress.attempts?.length || 0;
  const masteredTopics = (progress.mastery || []).filter((m) => m.status === 'mastered').length;
  const inProgressTopics = (progress.mastery || []).filter((m) => m.status !== 'mastered').length;

  async function onLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <View style={s.root}>
      <LinearGradient
        colors={[colors.bgWash, colors.bg, colors.bg]}
        locations={[0, 0.28, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        style={s.screen}
        contentContainerStyle={s.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.accent} />
        }
      >
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarText}>{initials(user?.name)}</Text>
          </View>
          <Text style={s.name}>{user?.name}</Text>
          <Text style={s.email}>{user?.email}</Text>
          <Row style={s.badgeRow}>
            <Pill label={user?.role} />
            {user?.created_at ? <Pill label={`Member since ${user.created_at.slice(0, 10)}`} /> : null}
          </Row>
        </View>

        <SectionHeader title="Your stats" />
        <Card>
          <Row>
            <Text style={s.statLabel}>Quiz attempts</Text>
            <Text style={s.statValue}>{quizAttempts}</Text>
          </Row>
          <Row>
            <Text style={s.statLabel}>Mastered topics</Text>
            <Text style={s.statValue}>{masteredTopics}</Text>
          </Row>
          <Row>
            <Text style={s.statLabel}>Topics in progress</Text>
            <Text style={s.statValue}>{inProgressTopics}</Text>
          </Row>
        </Card>

        <Button title="Log out" variant="secondary" onPress={onLogout} style={s.logout} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  screen: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: space.xl, paddingBottom: 56, gap: space.md },
  header: { alignItems: 'center', gap: 4, marginBottom: space.sm },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  avatarText: { fontFamily: fonts.bodyBold, fontSize: 26, color: colors.accent },
  name: { ...type.h2, color: colors.ink },
  email: { ...type.body, color: colors.muted },
  badgeRow: { justifyContent: 'center', marginTop: space.sm, flexWrap: 'wrap' },
  statLabel: { ...type.body, color: colors.ink },
  statValue: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.accent },
  logout: { marginTop: space.md },
});
