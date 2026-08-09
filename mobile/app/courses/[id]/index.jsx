import { Pressable, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApi } from '../../../lib/useApi';
import { useAuth } from '../../../lib/auth';
import {
  EmptyState,
  ErrorScreen,
  H1,
  LessonRow,
  Loading,
  Muted,
  Screen,
  SectionHeader,
} from '../../../components/ui';
import { colors } from '../../../lib/theme';

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
        <View style={s.intro}>
          <H1>{course.title}</H1>
          <Muted>{course.description}</Muted>
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
  intro: { gap: 8, marginBottom: 8 },
});
