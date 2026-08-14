import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApi } from '../../../lib/useApi';
import { useAuth } from '../../../lib/auth';
import {
  courseIconFor,
  EmptyState,
  ErrorScreen,
  LessonRow,
  Loading,
  Screen,
  SectionHeader,
} from '../../../components/ui';
import { colorForCourse, colors, fonts, radius, space, type } from '../../../lib/theme';

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const { data: course, error, reload } = useApi(`/courses/${id}`);

  if (error && !course) return <ErrorScreen message={error} onRetry={reload} />;
  if (!course) return <Loading label="Loading course" />;

  // The API always sends `lessons`, but this screen has no error boundary above
  // it and reads .length and .map directly — one malformed response would be a
  // blank screen rather than a degraded one.
  const lessons = course.lessons || [];
  const done = course.completedCount ?? lessons.filter((l) => l.completed).length;

  return (
    <>
      <Stack.Screen
        options={{
          title: course.title,
          headerRight:
            user?.role === 'instructor'
              ? () => (
                  <Pressable
                    onPress={() => router.push(`/courses/${course.id}/lessons/new`)}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Add a lesson to this course"
                    style={{ paddingHorizontal: 16 }}
                  >
                    <Ionicons name="add" size={26} color={colors.accent} />
                  </Pressable>
                )
              : undefined,
        }}
      />

      <Screen>
        {/* Dark panel edged in the course colour — see the matching note in
            lessons/[id].jsx. White on these stripes failed WCAG AA. */}
        <View style={[s.banner, { borderColor: colorForCourse(course.id) }]}>
          <View style={[s.bannerAccent, { backgroundColor: colorForCourse(course.id) }]} />
          <View
            style={[s.bannerIconWrap, { backgroundColor: `${colorForCourse(course.id)}26` }]}
          >
            <Ionicons
              name={courseIconFor(course.title)}
              size={26}
              color={colorForCourse(course.id)}
            />
          </View>
          <Text style={s.bannerTitle}>{course.title}</Text>
          {course.description ? <Text style={s.bannerDesc}>{course.description}</Text> : null}
        </View>

        <SectionHeader
          title="Lessons"
          subtitle={
            done > 0
              ? `${done} of ${lessons.length} completed · difficulty tags feed the adaptation engine`
              : `${lessons.length} in this course · difficulty tags feed the adaptation engine`
          }
        />

        {lessons.length === 0 && (
          <EmptyState title="No lessons yet" body="An instructor can add the first lesson." />
        )}

        {lessons.map((lesson, i) => (
          <LessonRow
            key={lesson.id}
            index={i + 1}
            title={lesson.title}
            topic={lesson.topic}
            difficulty={lesson.difficulty}
            completed={lesson.completed}
            bestScore={lesson.best_score}
            onPress={() => router.push(`/lessons/${lesson.id}`)}
          />
        ))}
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
  banner: {
    backgroundColor: colors.panel2,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: space.xl,
    paddingLeft: space.xl + 4,
    gap: space.sm,
    marginBottom: space.sm,
    overflow: 'hidden',
  },
  bannerAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  bannerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bannerTitle: { ...type.h2, fontFamily: fonts.display, color: colors.ink },
  bannerDesc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: colors.muted },
});
