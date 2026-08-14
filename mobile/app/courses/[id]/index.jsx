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
  const { data: course, error } = useApi(`/courses/${id}`);

  if (error) return <ErrorScreen message={error} />;
  if (!course) return <Loading />;

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
                    style={{ paddingHorizontal: 16 }}
                  >
                    <Ionicons name="add" size={26} color={colors.accent} />
                  </Pressable>
                )
              : undefined,
        }}
      />

      <Screen>
        <View style={[s.banner, { backgroundColor: colorForCourse(course.id) }]}>
          <View style={s.bannerIconWrap}>
            <Ionicons name={courseIconFor(course.title)} size={26} color={colors.white} />
          </View>
          <Text style={s.bannerTitle}>{course.title}</Text>
          {course.description ? <Text style={s.bannerDesc}>{course.description}</Text> : null}
        </View>

        <SectionHeader
          title="Lessons"
          subtitle={`${course.lessons.length} in this course · difficulty tags feed the adaptation engine`}
        />

        {course.lessons.length === 0 && (
          <EmptyState title="No lessons yet" body="An instructor can add the first lesson." />
        )}

        {course.lessons.map((lesson, i) => (
          <LessonRow
            key={lesson.id}
            index={i + 1}
            title={lesson.title}
            topic={lesson.topic}
            difficulty={lesson.difficulty}
            onPress={() => router.push(`/lessons/${lesson.id}`)}
          />
        ))}
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
  banner: {
    borderRadius: radius.xl,
    padding: space.xl,
    gap: space.sm,
    marginBottom: space.sm,
  },
  bannerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bannerTitle: { ...type.h2, fontFamily: fonts.display, color: colors.white },
  bannerDesc: { fontFamily: fonts.body, fontSize: 14, lineHeight: 21, color: 'rgba(255,255,255,0.85)' },
});
