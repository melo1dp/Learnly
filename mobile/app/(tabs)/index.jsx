import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useApi } from "../../lib/useApi";
import { useAuth } from "../../lib/auth";
import { courseCompletion, masteryIndex } from "../../lib/stats";
import {
  Choice,
  ContinueCard,
  CourseTile,
  EmptyState,
  ErrorBanner,
  ErrorScreen,
  Loading,
  MeshBackdrop,
} from "../../components/ui";
import { colors, fonts, space, type } from "../../lib/theme";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "beginner", label: "Beginner" },
  { value: "advanced", label: "Advanced" },
];

export default function Courses() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: courses, error, refreshing, refresh } = useApi("/courses");
  const {
    data: progress,
    error: progressError,
    reload: reloadProgress,
  } = useApi("/progress");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const mastery = progress?.mastery || [];
  // Built once per render rather than rebuilt inside courseCompletion for every
  // tile, on every keystroke of the search box.
  const index = useMemo(() => masteryIndex(mastery), [mastery]);

  // Only a full-screen error when there is nothing to show. A failed refetch
  // used to replace an already-loaded catalogue with a single line of red text.
  if (error && !courses) {
    return <ErrorScreen message={error} onRetry={refresh} />;
  }
  if (!courses) return <Loading label="Loading courses" />;

  const continueRec = progress?.continueLearning;
  const quizAttempts = progress?.attempts?.length || 0;
  const masteredTopics = mastery.filter((m) => m.status === "mastered").length;
  // With /progress failed there is no attempt data, and claiming "take your
  // first quiz" to someone with forty attempts is worse than saying nothing.
  const progressSummary = progressError
    ? "Your progress couldn’t be loaded just now."
    : quizAttempts === 0
      ? "Take your first quiz to start building momentum."
      : `You’ve completed ${quizAttempts} quiz attempt${quizAttempts === 1 ? "" : "s"} and ${masteredTopics} mastered topic${masteredTopics === 1 ? "" : "s"}.`;

  const filteredCourses = (courses || []).filter((course) => {
    const text = `${course.title} ${course.description || ""}`.toLowerCase();
    if (!text.includes(query.trim().toLowerCase())) return false;

    if (filter === "all") return true;
    if (filter === "beginner" || filter === "advanced") return course.level === filter;
    const { status } = courseCompletion(course, index);
    return status === filter;
  });

  return (
    <View style={s.root}>
      <MeshBackdrop />

      {user?.role === "instructor" && (
        <Stack.Screen
          options={{
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/courses/new")}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel="Create a new course"
                style={{ paddingHorizontal: 16 }}
              >
                <Ionicons name="add" size={26} color={colors.accent} />
              </Pressable>
            ),
          }}
        />
      )}

      <FlatList
        data={filteredCourses}
        keyExtractor={(c) => String(c.id)}
        style={s.list}
        contentContainerStyle={s.listContent}
        // The search box lives in ListHeaderComponent. Without this, the first
        // tap on a course card with the keyboard up only dismisses the keyboard.
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.accent}
          />
        }
        ListHeaderComponent={
          <View style={s.header}>
            <ErrorBanner message={error} onRetry={refresh} />
            <Text style={s.greeting}>
              {user?.name
                ? `Hello, ${user.name.split(" ")[0]}`
                : "Your courses"}
            </Text>
            <Text style={s.lede}>
              Pick a path — quizzes reshape what you study next.
            </Text>
            <View style={s.roleCard}>
              <Text style={s.roleTitle}>
                {user?.role === "instructor"
                  ? "Instructor workspace"
                  : "Student workspace"}
              </Text>
              <Text style={s.roleBody}>
                {user?.role === "instructor"
                  ? "Create courses, add lessons, and attach quiz questions for your learners."
                  : "Browse lessons, answer quizzes, and keep advancing through your adaptive path."}
              </Text>
            </View>
            <View style={s.searchBox}>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search courses"
                placeholderTextColor={colors.muted}
                style={s.searchInput}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={s.progressCard}>
              <Text style={s.progressTitle}>Learning snapshot</Text>
              <Text style={s.progressBody}>{progressSummary}</Text>
              {/* When there IS a recommendation the ContinueCard below says so
                  in full; repeating the lesson title here just duplicated it. */}
              {progressError ? (
                <Pressable onPress={reloadProgress} hitSlop={8}>
                  <Text style={s.progressHint}>Tap to retry</Text>
                </Pressable>
              ) : continueRec?.nextLesson ? null : (
                <Text style={s.progressHint}>
                  Take a quiz to unlock your next recommendation.
                </Text>
              )}
            </View>
            {continueRec?.nextLesson ? (
              <ContinueCard
                lessonTitle={continueRec.nextLesson.title}
                reason={continueRec.reason}
                difficulty={continueRec.nextLesson.difficulty}
                onPress={() =>
                  router.push(`/lessons/${continueRec.nextLesson.id}`)
                }
              />
            ) : null}
            <Text style={s.section}>Catalogue</Text>
            <Choice value={filter} options={FILTERS} onChange={setFilter} style={s.filterRow} />
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            title={query ? "No matching courses" : "No courses yet"}
            body={
              query
                ? "Try a different course title or keyword."
                : "Ask an instructor to publish the first one."
            }
          />
        }
        renderItem={({ item, index: position }) => {
          const { pct } = courseCompletion(item, index);
          return (
            <CourseTile
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              level={item.level}
              rating={item.rating}
              progress={pct}
              index={position}
              onPress={() => router.push(`/courses/${item.id}`)}
            />
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  list: { flex: 1, backgroundColor: "transparent" },
  listContent: { padding: space.xl, paddingBottom: 56, gap: space.md },
  header: { gap: space.sm, marginBottom: space.sm },
  greeting: { ...type.h1, color: colors.ink },
  lede: { ...type.body, color: colors.muted, marginBottom: space.sm },
  roleCard: {
    backgroundColor: colors.panel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.xl,
    gap: 4,
    marginBottom: space.sm,
  },
  roleTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  roleBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
    lineHeight: 20,
  },
  searchBox: {
    backgroundColor: colors.panel,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: space.lg,
    paddingVertical: 6,
    marginBottom: space.sm,
  },
  searchInput: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 6,
  },
  progressCard: {
    backgroundColor: `${colors.accent}12`,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: `${colors.accent}33`,
    padding: space.xl,
    gap: 4,
    marginBottom: space.sm,
  },
  progressTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  progressBody: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink,
    lineHeight: 20,
  },
  progressHint: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.accent,
    marginTop: 2,
  },
  section: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: colors.muted,
    marginTop: space.md,
  },
  filterRow: { marginTop: space.xs, marginBottom: 0 },
});
