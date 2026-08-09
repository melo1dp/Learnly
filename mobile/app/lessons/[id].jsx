import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useApi } from '../../lib/useApi';
import {
  Button,
  Card,
  ErrorScreen,
  H1,
  Loading,
  Muted,
  Pill,
  Row,
  Screen,
} from '../../components/ui';
import { colors, fonts, space, type } from '../../lib/theme';

export default function Lesson() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: lesson, error } = useApi(`/lessons/${id}`);

  if (error) return <ErrorScreen message={error} />;
  if (!lesson) return <Loading />;

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />

      <Screen>
        <Row style={s.head}>
          <H1 style={s.title}>{lesson.title}</H1>
          <Pill label={lesson.difficulty} tone={lesson.difficulty} />
        </Row>
        <Text style={s.topic}>Topic · {lesson.topic}</Text>

        <Card style={s.readCard}>
          <Text style={s.body}>{lesson.body}</Text>
        </Card>

        <View style={s.cta}>
          {lesson.quiz ? (
            <Button
              title="Take the quiz →"
              onPress={() => router.push(`/quizzes/${lesson.quiz.id}`)}
            />
          ) : (
            <Muted>This lesson has no quiz.</Muted>
          )}
        </View>
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
  head: { alignItems: 'flex-start' },
  title: { flex: 1 },
  topic: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.muted,
    textTransform: 'capitalize',
    marginTop: -4,
  },
  readCard: { paddingVertical: space.xxl },
  body: { ...type.bodyLg, color: colors.ink },
  cta: { marginTop: space.sm, gap: space.md },
});
