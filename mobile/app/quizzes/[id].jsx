import { useEffect, useState } from 'react';
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
} from '../../components/ui';
import { colors, fonts, space } from '../../lib/theme';

export default function Quiz() {
  const { id } = useLocalSearchParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

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
  }, [id]);

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

  if (error && !quiz) return <ErrorScreen message={error} />;
  if (!quiz) return <Loading />;

  if (result) return <Result result={result} />;

  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined);

  return (
    <>
      <Stack.Screen options={{ title: quiz.title }} />
      <Screen>
        <H1>{quiz.title}</H1>
        <Muted>Answer every question — your score steers the next lesson.</Muted>

        {quiz.questions.map((q, i) => (
          <Card key={q.id}>
            <Text style={s.qIndex}>Question {i + 1}</Text>
            <Text style={s.question}>{q.text}</Text>
            <View style={s.options}>
              {q.options.map((opt, idx) => (
                <Option
                  key={idx}
                  label={opt}
                  selected={answers[q.id] === idx}
                  onPress={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                />
              ))}
            </View>
          </Card>
        ))}

        <ErrorText>{error}</ErrorText>
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
  const a = result.adaptation;

  return (
    <>
      <Stack.Screen options={{ title: 'Your result' }} />
      <Screen>
        <ScoreHero score={result.score} correct={result.correct} total={result.total} />

        <Banner outcome={a.outcome}>
          <Text style={s.outcome}>{a.outcome}</Text>
          <Text style={s.reason}>{a.reason}</Text>
          <Muted>
            Topic mastery is now {a.mastery} · {a.status.replace('_', ' ')}
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
          <Muted>No further recommendation — you have covered this course.</Muted>
        )}

        <Button
          variant="secondary"
          title="View my progress →"
          onPress={() => router.replace('/dashboard')}
        />
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
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
});
