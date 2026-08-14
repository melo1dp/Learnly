import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useApi } from '../../lib/useApi';
import { attemptsInLastDays, computeStreak, courseCompletion, dailyAttemptCounts, masteryByCategory } from '../../lib/stats';
import { ActivityAreaChart, CategoryMasteryChart, RingMeter } from '../../components/charts';
import {
  Banner,
  Card,
  ContinueCard,
  EmptyState,
  ErrorScreen,
  Loading,
  MasteryChart,
  MeshBackdrop,
  Pill,
  Row,
  SectionHeader,
  StatTile,
} from '../../components/ui';
import { colors, fonts, space, type } from '../../lib/theme';

const WEEKLY_GOAL = 5;

export default function Dashboard() {
  const router = useRouter();
  const { data, error, refreshing, refresh } = useApi('/progress');
  const { data: courses } = useApi('/courses');

  if (error) return <ErrorScreen message={error} />;
  if (!data) return <Loading />;

  const continueRec = data.continueLearning;
  const mastery = data.mastery || [];
  const masteredCount = mastery.filter((m) => m.status === 'mastered').length;
  const averageScore = data.attempts.length
    ? Math.round(data.attempts.reduce((sum, a) => sum + a.score, 0) / data.attempts.length)
    : 0;
  const streak = computeStreak(data.attempts);
  const weeklyActivity = dailyAttemptCounts(data.attempts, 7);
  const categoryData = masteryByCategory(courses || [], mastery);
  const startedCourses = (courses || []).filter(
    (c) => courseCompletion(c, mastery).status !== 'not_started',
  );

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
        <Text style={s.title}>My progress</Text>
        <Text style={s.lede}>Mastery, quiz history, and how Learnly steered your path.</Text>

        <Row style={s.statRow}>
          <StatTile label="Quiz attempts" value={data.attempts.length} />
          <StatTile label="Mastered topics" value={masteredCount} />
        </Row>
        <Row style={s.statRow}>
          <StatTile label="Average score" value={`${averageScore}%`} />
          <StatTile label="Day streak" value={streak} />
        </Row>

        {continueRec?.nextLesson ? (
          <ContinueCard
            lessonTitle={continueRec.nextLesson.title}
            reason={continueRec.reason}
            difficulty={continueRec.nextLesson.difficulty}
            onPress={() => router.push(`/lessons/${continueRec.nextLesson.id}`)}
          />
        ) : null}

        <SectionHeader title="This week" subtitle="Quiz attempts over the last 7 days." />
        <Card>
          <ActivityAreaChart data={weeklyActivity} />
        </Card>

        {categoryData.length > 0 ? (
          <>
            <SectionHeader title="Mastery by category" subtitle="Average mastery across each subject area." />
            <Card>
              <CategoryMasteryChart data={categoryData} />
            </Card>
          </>
        ) : null}

        {startedCourses.length > 0 ? (
          <>
            <SectionHeader title="Course completion" subtitle="Share of each course's topics you've mastered." />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.ringScroll}>
              {startedCourses.map((c) => {
                const { pct } = courseCompletion(c, mastery);
                return (
                  <View key={c.id} style={s.ringItem}>
                    <RingMeter value={pct} size={84} strokeWidth={8} />
                    <Text style={s.ringLabel} numberOfLines={2}>
                      {c.title}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </>
        ) : null}

        <SectionHeader title="Mastery by topic" subtitle="Nudged up or down after each quiz." />
        {mastery.length === 0 ? (
          <EmptyState title="No mastery yet" body="Take a quiz to start building your profile." />
        ) : (
          <Card>
            <MasteryChart data={mastery} />
          </Card>
        )}

        <SectionHeader
          title="Your adaptive path"
          subtitle="Recommendations after each quiz attempt."
        />
        {(data.recommendations || []).length === 0 && (
          <EmptyState
            title="No adaptations yet"
            body="Finish a quiz and the engine will record why it chose your next lesson."
          />
        )}
        {(data.recommendations || []).map((r) => (
          <Pressable
            key={r.id}
            disabled={!r.next_lesson_id}
            onPress={() => r.next_lesson_id && router.push(`/lessons/${r.next_lesson_id}`)}
            style={({ pressed }) => [pressed && r.next_lesson_id && { opacity: 0.85 }]}
          >
            <Banner outcome={r.outcome}>
              <Row>
                <Text style={s.outcome}>{r.outcome}</Text>
                <Text style={s.scoreChip}>{r.score}%</Text>
              </Row>
              <Text style={s.reason}>{r.reason}</Text>
              {r.next_lesson_title ? (
                <Text style={s.nextHint}>Next · {r.next_lesson_title}</Text>
              ) : (
                <Text style={s.nextHint}>End of path for this topic</Text>
              )}
            </Banner>
          </Pressable>
        ))}

        <SectionHeader title="Recent quiz attempts" />
        {data.attempts.length === 0 && <EmptyState title="No attempts yet" />}
        {data.attempts.map((a) => (
          <View key={a.id} style={s.card}>
            <Row>
              <View style={s.attempt}>
                <Text style={s.attemptTitle}>{a.lesson_title}</Text>
                <Text style={s.meta}>
                  {a.topic} · {a.taken_at}
                </Text>
              </View>
              <Pill label={`${a.score}%`} />
            </Row>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  screen: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: space.xl, paddingBottom: 56, gap: space.md },
  title: { ...type.h1, color: colors.ink },
  lede: { ...type.body, color: colors.muted, marginBottom: space.sm },
  statRow: { gap: space.sm },
  card: {
    backgroundColor: colors.panel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.xl,
    gap: space.md,
  },
  meta: { fontFamily: fonts.body, fontSize: 13, color: colors.muted },
  attempt: { flex: 1, gap: 2 },
  attemptTitle: { fontFamily: fonts.bodySemi, fontSize: 15, color: colors.ink },
  outcome: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
    textTransform: 'capitalize',
  },
  scoreChip: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.muted },
  reason: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.ink },
  nextHint: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.muted, marginTop: 2 },

  ringScroll: { marginBottom: space.sm },
  ringItem: { alignItems: 'center', width: 100, gap: space.xs, marginRight: space.md },
  ringLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.muted, textAlign: 'center' },
});
