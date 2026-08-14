import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';
import { useApi } from '../../lib/useApi';
import { useAuth } from '../../lib/auth';
import { attemptsInLastDays, computeBadges } from '../../lib/stats';
import { RingMeter } from '../../components/charts';
import {
  Button,
  Card,
  ErrorText,
  Field,
  Loading,
  MeshBackdrop,
  ErrorScreen,
  Pill,
  Row,
  SectionHeader,
} from '../../components/ui';
import { colors, fonts, space, type } from '../../lib/theme';

const WEEKLY_GOAL = 5;

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

  // This screen holds the only Log out button in the app, so replacing it
  // wholesale with an error made a failed request unrecoverable — including the
  // expired-token case, where logging out is exactly what the user needs.
  if (error && !progress) return <ErrorScreen message={error} onRetry={refresh} />;
  if (!progress) return <Loading label="Loading your profile" />;

  const quizAttempts = progress.attempts?.length || 0;
  const masteredTopics = (progress.mastery || []).filter((m) => m.status === 'mastered').length;
  const inProgressTopics = (progress.mastery || []).filter((m) => m.status !== 'mastered').length;
  const weeklyCount = attemptsInLastDays(progress.attempts, 7);
  const badges = computeBadges(progress);

  async function onLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <View style={s.root}>
      <MeshBackdrop />
      <ScrollView
        style={s.screen}
        contentContainerStyle={s.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.accent} />
        }
      >
        <View style={s.header}>
          <View style={s.avatarWrap}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{initials(user?.name)}</Text>
            </View>
            <View style={s.statusDot} />
          </View>
          <Text style={s.name}>{user?.name}</Text>
          <Text style={s.email}>{user?.email}</Text>
          <Row style={s.badgeRow}>
            <Pill label={user?.role ? user.role[0].toUpperCase() + user.role.slice(1) : ''} />
            {user?.created_at ? (
              <Pill
                label={`Member since ${new Date(user.created_at).toLocaleDateString(undefined, {
                  month: 'short',
                  year: 'numeric',
                })}`}
              />
            ) : null}
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

        <SectionHeader title="Weekly goal" subtitle={`${WEEKLY_GOAL} quizzes a week keeps momentum up.`} />
        <Card style={s.goalCard}>
          <RingMeter
            value={weeklyCount / WEEKLY_GOAL}
            label={`${weeklyCount}/${WEEKLY_GOAL}`}
            sublabel="this week"
            size={100}
            strokeWidth={10}
          />
        </Card>

        <SectionHeader title="Achievements" />
        <View style={s.badgeGrid}>
          {badges.map((b) => (
            <View key={b.key} style={[s.badgeTile, !b.earned && s.badgeTileLocked]}>
              <View style={[s.badgeIconWrap, b.earned && s.badgeIconWrapEarned]}>
                <Ionicons
                  name={b.earned ? b.icon : 'lock-closed'}
                  size={20}
                  color={b.earned ? colors.accent : colors.muted}
                />
              </View>
              <Text style={[s.badgeLabel, !b.earned && s.badgeLabelLocked]}>{b.label}</Text>
            </View>
          ))}
        </View>

        <SectionHeader title="Notifications" subtitle="Preferences only — not wired to real delivery yet." />
        <Card>
          <NotificationToggles />
        </Card>

        <SectionHeader title="Security" />
        <Card>
          <ChangePasswordForm />
        </Card>

        <Button title="Log out" variant="secondary" onPress={onLogout} style={s.logout} />
      </ScrollView>
    </View>
  );
}

function NotificationToggles() {
  const [prefs, setPrefs] = useState({
    quizReminders: true,
    newCourses: true,
    weeklySummary: false,
  });

  const toggle = (key) => (value) => setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <>
      <ToggleRow
        label="Quiz reminders"
        value={prefs.quizReminders}
        onChange={toggle('quizReminders')}
      />
      <ToggleRow
        label="New course alerts"
        value={prefs.newCourses}
        onChange={toggle('newCourses')}
      />
      <ToggleRow
        label="Weekly progress summary"
        value={prefs.weeklySummary}
        onChange={toggle('weeklySummary')}
      />
    </>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <Row>
      <Text style={s.toggleLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.panel2, true: colors.accent }}
        thumbColor={colors.white}
      />
    </Row>
  );
}

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit() {
    setError('');
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setBusy(true);
    try {
      await api('/auth/password', {
        method: 'PATCH',
        body: { currentPassword, newPassword },
      });
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Field
        label="Current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <Field label="New password" value={newPassword} onChangeText={setNewPassword} secureTextEntry />
      <Field
        label="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <ErrorText>{error}</ErrorText>
      {success ? <Text style={s.successText}>Password updated.</Text> : null}
      <Button
        title={busy ? 'Updating…' : 'Update password'}
        variant="secondary"
        onPress={onSubmit}
        disabled={busy || !currentPassword || !newPassword || !confirmPassword}
      />
    </>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  screen: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: space.xl, paddingBottom: 56, gap: space.md },
  header: { alignItems: 'center', gap: 4, marginBottom: space.sm },
  avatarWrap: { marginBottom: space.sm },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.good,
    borderWidth: 2,
    borderColor: colors.bg,
  },
  avatarText: { fontFamily: fonts.bodyBold, fontSize: 26, color: colors.accent },
  name: { ...type.h2, color: colors.ink },
  email: { ...type.body, color: colors.muted },
  badgeRow: { justifyContent: 'center', marginTop: space.sm, flexWrap: 'wrap' },
  statLabel: { ...type.body, color: colors.ink },
  statValue: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.accent },

  goalCard: { alignItems: 'center' },

  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  badgeTile: {
    width: '31%',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: space.md,
    alignItems: 'center',
    gap: 6,
  },
  badgeTileLocked: { opacity: 0.55 },
  badgeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.panel2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconWrapEarned: { backgroundColor: colors.accentSoft },
  badgeLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.ink,
    textAlign: 'center',
  },
  badgeLabelLocked: { color: colors.muted },

  toggleLabel: { ...type.body, color: colors.ink, flex: 1 },
  successText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.good },

  logout: { marginTop: space.md },
});
