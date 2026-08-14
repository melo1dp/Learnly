import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useApi } from '../../lib/useApi';
import { formatWhen } from '../../lib/stats';
import {
  AnswerReview,
  Button,
  Card,
  ErrorScreen,
  Loading,
  Muted,
  Pill,
  Row,
  ScoreHero,
  Screen,
  SectionHeader,
} from '../../components/ui';
import { colors, fonts, space } from '../../lib/theme';

/**
 * A past attempt, reopened.
 *
 * The result screen after submitting a quiz held everything in component state,
 * so pressing back destroyed it: the correct answers, what you chose and the
 * explanations were all unrecoverable. This reads the same data back from the
 * server, and is what the attempt rows on My Progress now link to.
 */
export default function AttemptReview() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: attempt, error, reload } = useApi(`/attempts/${id}`);

  if (error && !attempt) return <ErrorScreen message={error} onRetry={reload} />;
  if (!attempt) return <Loading label="Loading your attempt" />;

  return (
    <>
      <Stack.Screen options={{ title: 'Attempt review' }} />
      <Screen>
        <ScoreHero score={attempt.score} correct={attempt.correct} total={attempt.total} />

        <Card>
          <Row>
            <Text style={s.lessonTitle}>{attempt.lesson.title}</Text>
            <Pill label={attempt.lesson.difficulty} tone={attempt.lesson.difficulty} />
          </Row>
          <Muted>
            <Text style={s.topic}>{attempt.lesson.topic}</Text> · taken{' '}
            {formatWhen(attempt.taken_at)}
          </Muted>
          <View style={s.actions}>
            <Button
              title="Retake this quiz"
              onPress={() => router.push(`/quizzes/${attempt.quiz.id}`)}
            />
            <Button
              variant="secondary"
              title="Reread the lesson"
              onPress={() => router.push(`/lessons/${attempt.lesson.id}`)}
            />
          </View>
        </Card>

        <SectionHeader title="Your answers" />
        <AnswerReview perQuestion={attempt.perQuestion} />
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
  lessonTitle: { fontFamily: fonts.bodySemi, fontSize: 16, color: colors.ink, flex: 1 },
  topic: { textTransform: 'capitalize' },
  actions: { gap: space.sm, marginTop: space.sm },
});
