import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { api } from '../../lib/api';
import {
  Banner,
  Button,
  Card,
  ErrorScreen,
  ErrorText,
  H1,
  Loading,
  Muted,
  Option,
  Pill,
  Row,
  ScoreHero,
  Screen,
  SectionHeader,
} from '../../components/ui';
import { colors, fonts, space } from '../../lib/theme';

export default function Quiz() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  // Bumped by the retry button to re-run the effect below.
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(() => {
    setError('');
    setQuiz(null);
    setAttempt((n) => n + 1);
  }, []);

  useEffect(() => {
    let active = true;
    api(`/quizzes/${id}`)
      .then((q) => {
        if (!active) return;
        setQuiz(q);
        setResult(null);
        setAnswers({});
      })
      .catch((e) => active && setError(e.message));
    return () => {
      active = false;
    };
  }, [id, attempt]);

  async function submit() {
    setBusy(true);
    setError('');
    try {
      setResult(await api(`/quizzes/${id}/submit`, { method: 'POST', body: { answers } }));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (error && !quiz) return <ErrorScreen message={error} onRetry={load} />;
  if (!quiz) return <Loading label="Loading quiz" />;

  if (result) return <Result result={result} />;

  const questions = quiz.questions || [];
  const answeredCount = questions.filter((q) => answers[q.id] !== undefined).length;
  // `[].every()` is true, so a quiz with no questions used to render an enabled
  // Submit button over an empty page.
  const allAnswered = questions.length > 0 && answeredCount === questions.length;
  const remaining = questions.length - answeredCount;

  if (questions.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: quiz.title }} />
        <Screen>
          <H1>{quiz.title}</H1>
          <Muted>This quiz has no questions yet, so there is nothing to answer.</Muted>
          <Button title="Back" variant="secondary" onPress={() => router.back()} />
        </Screen>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: quiz.title }} />
      <Screen>
        <H1>{quiz.title}</H1>
        <Muted>Answer every question — your score steers the next lesson.</Muted>

        {questions.map((q, i) => {
          const unanswered = answers[q.id] === undefined;
          return (
            <Card key={q.id}>
              <Row>
                <Text style={s.qIndex}>Question {i + 1}</Text>
                {unanswered ? <Text style={s.unanswered}>Not answered</Text> : null}
              </Row>
              <Text style={s.question}>{q.text}</Text>
              <View
                style={s.options}
                accessibilityRole="radiogroup"
                accessibilityLabel={`Question ${i + 1}: ${q.text}`}
              >
                {(q.options || []).map((opt, idx) => (
                  <Option
                    key={idx}
                    label={opt}
                    selected={answers[q.id] === idx}
                    onPress={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                  />
                ))}
              </View>
            </Card>
          );
        })}

        <ErrorText>{error}</ErrorText>
        {/* Submit used to grey out with no explanation, leaving the user to hunt
            a 10-question page for the one they missed. */}
        {remaining > 0 ? (
          <Muted>
            {remaining} question{remaining === 1 ? '' : 's'} left to answer.
          </Muted>
        ) : null}
        <Button
          title={busy ? 'Submitting…' : 'Submit quiz'}
          onPress={submit}
          disabled={!allAnswered || busy}
        />
      </Screen>
    </>
  );
}

function Result({ result }) {
  const router = useRouter();
  const a = result.adaptation || {};
  const status = (a.status || '').replace(/_/g, ' ');

  return (
    <>
      <Stack.Screen options={{ title: 'Your result' }} />
      <Screen>
        <ScoreHero score={result.score} correct={result.correct} total={result.total} />

        <Banner outcome={a.outcome}>
          <Text style={s.outcome}>{a.outcome}</Text>
          <Text style={s.reason}>{a.reason}</Text>
          <Muted>
            Topic mastery is now {a.mastery}
            {status ? ` · ${status}` : ''}
          </Muted>
        </Banner>

        {a.nextLesson ? (
          <Card>
            <Muted>Recommended next for you</Muted>
            <Row>
              <Text style={s.nextTitle}>{a.nextLesson.title}</Text>
              <Pill label={a.nextLesson.difficulty} tone={a.nextLesson.difficulty} />
            </Row>
            <Button
              title="Go to next lesson →"
              onPress={() => router.replace(`/lessons/${a.nextLesson.id}`)}
            />
          </Card>
        ) : (
          // Was a bare line of text with nowhere to go — the end of a course
          // dead-ended the only forward path in the app.
          <Card>
            <Muted>No further recommendation — you have covered this course.</Muted>
            <Button
              title="Browse other courses →"
              onPress={() => router.replace('/')}
            />
          </Card>
        )}

        <Button
          variant="secondary"
          title="View my progress →"
          onPress={() => router.replace('/dashboard')}
        />

        <SectionHeader title="Review your answers" />
        {result.perQuestion.map((q, i) => (
          <Card key={q.questionId}>
            <Row>
              <Text style={s.qIndex}>Question {i + 1}</Text>
              <Pill label={q.isCorrect ? 'Correct' : 'Incorrect'} tone={q.isCorrect ? 'mastered' : 'struggling'} />
            </Row>
            <Text style={s.question}>{q.text}</Text>
            <View style={s.options}>
              {q.options.map((opt, idx) => (
                <View
                  key={idx}
                  style={[
                    s.reviewOption,
                    idx === q.correct_index && s.reviewOptionCorrect,
                    idx === q.chosen && idx !== q.correct_index && s.reviewOptionWrong,
                  ]}
                >
                  <Text style={s.reviewOptionText}>{opt}</Text>
                  {idx === q.correct_index ? <Text style={s.reviewTag}>Correct answer</Text> : null}
                  {idx === q.chosen && idx !== q.correct_index ? (
                    <Text style={s.reviewTagWrong}>Your answer</Text>
                  ) : null}
                </View>
              ))}
            </View>
            {q.explanation ? <Text style={s.explanation}>{q.explanation}</Text> : null}
          </Card>
        ))}
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
  unanswered: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.muted,
  },
  qIndex: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  question: {
    fontFamily: fonts.bodySemi,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
    marginBottom: space.sm,
  },
  options: { gap: space.sm },
  outcome: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
    textTransform: 'capitalize',
  },
  reason: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.ink },
  nextTitle: { fontFamily: fonts.bodySemi, fontSize: 16, color: colors.ink, flex: 1 },
  reviewOption: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
    borderRadius: 14,
    padding: 12,
    gap: 2,
  },
  reviewOptionCorrect: { borderColor: colors.good, backgroundColor: `${colors.good}14` },
  reviewOptionWrong: { borderColor: colors.bad, backgroundColor: `${colors.bad}14` },
  reviewOptionText: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.ink },
  reviewTag: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    color: colors.good,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  reviewTagWrong: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    color: colors.bad,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  explanation: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    marginTop: space.xs,
  },
});
