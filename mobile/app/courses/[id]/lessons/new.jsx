import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { api } from '../../../../lib/api';
import { useAuth } from '../../../../lib/auth';
import {
  Button,
  Card,
  Choice,
  ErrorScreen,
  ErrorText,
  Field,
  Muted,
  Row,
  Screen,
  SectionHeader,
} from '../../../../components/ui';
import { colors, fonts, radius, space } from '../../../../lib/theme';

const DIFFICULTIES = [
  { value: 'easy', label: 'easy' },
  { value: 'medium', label: 'medium' },
  { value: 'hard', label: 'hard' },
];

const blankQuestion = () => ({ text: '', options: ['', ''], correct_index: 0, explanation: '' });

export default function NewLesson() {
  const { id: courseId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();

  const [lesson, setLesson] = useState({
    title: '',
    body: '',
    topic: '',
    difficulty: 'medium',
    position: '0',
  });
  const [questions, setQuestions] = useState([blankQuestion()]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user?.role !== 'instructor') return <ErrorScreen message="Instructors only." />;

  const setField = (key) => (value) => setLesson((l) => ({ ...l, [key]: value }));

  function updateQuestion(qi, patch) {
    setQuestions((qs) => qs.map((q, i) => (i === qi ? { ...q, ...patch } : q)));
  }
  function updateOption(qi, oi, value) {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qi ? { ...q, options: q.options.map((o, j) => (j === oi ? value : o)) } : q
      )
    );
  }
  function addOption(qi) {
    setQuestions((qs) =>
      qs.map((q, i) => (i === qi ? { ...q, options: [...q.options, ''] } : q))
    );
  }
  function removeOption(qi, oi) {
    setQuestions((qs) =>
      qs.map((q, i) => {
        if (i !== qi || q.options.length <= 2) return q;
        const options = q.options.filter((_, j) => j !== oi);
        let correct_index = q.correct_index;
        if (correct_index === oi) correct_index = 0;
        else if (correct_index > oi) correct_index -= 1;
        return { ...q, options, correct_index };
      })
    );
  }
  const addQuestion = () => setQuestions((qs) => [...qs, blankQuestion()]);
  const removeQuestion = (qi) => setQuestions((qs) => qs.filter((_, i) => i !== qi));

  async function onSubmit() {
    setError('');
    setBusy(true);
    try {
      const cleaned = questions.filter(
        (q) => q.text.trim() && q.options.every((o) => o.trim())
      );

      await api('/lessons', {
        method: 'POST',
        body: {
          course_id: Number(courseId),
          title: lesson.title.trim(),
          body: lesson.body.trim(),
          topic: lesson.topic.trim(),
          difficulty: lesson.difficulty,
          position: Number(lesson.position) || 0,
          questions: cleaned,
        },
      });
      router.replace(`/courses/${courseId}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen>
        <SectionHeader
          title="Lesson & quiz"
          subtitle="Topic and difficulty drive adaptive routing after the quiz."
        />

        <Card>
          <Field
            label="Title"
            value={lesson.title}
            onChangeText={setField('title')}
            placeholder="For and While Loops"
          />
          <Field
            label="Body"
            value={lesson.body}
            onChangeText={setField('body')}
            placeholder="Short explanation…"
            multiline
          />
          <Field
            label="Topic"
            value={lesson.topic}
            onChangeText={setField('topic')}
            placeholder="loops"
            autoCapitalize="none"
          />
          <Choice
            label="Difficulty"
            value={lesson.difficulty}
            options={DIFFICULTIES}
            onChange={setField('difficulty')}
          />
          <Field
            label="Order"
            value={lesson.position}
            onChangeText={setField('position')}
            keyboardType="number-pad"
          />
        </Card>

        <SectionHeader
          title="Quiz questions"
          subtitle="Tap the circle next to the correct answer. Leave a question blank to skip it."
        />

        {questions.map((q, qi) => (
          <Card key={qi}>
            <Row>
              <Text style={s.qLabel}>Question {qi + 1}</Text>
              {questions.length > 1 && (
                <Pressable onPress={() => removeQuestion(qi)} hitSlop={8}>
                  <Text style={s.remove}>Remove</Text>
                </Pressable>
              )}
            </Row>

            <Field
              label="Question text"
              value={q.text}
              onChangeText={(text) => updateQuestion(qi, { text })}
            />

            {q.options.map((opt, oi) => (
              <View key={oi} style={s.optionRow}>
                <Pressable
                  onPress={() => updateQuestion(qi, { correct_index: oi })}
                  hitSlop={8}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: q.correct_index === oi }}
                  accessibilityLabel={`Mark option ${oi + 1} as the correct answer`}
                  style={[s.radio, q.correct_index === oi && s.radioSelected]}
                >
                  {q.correct_index === oi ? <View style={s.radioDot} /> : null}
                </Pressable>

                <Field
                  value={opt}
                  onChangeText={(value) => updateOption(qi, oi, value)}
                  placeholder={`Option ${oi + 1}`}
                  style={s.optionField}
                />

                {q.options.length > 2 && (
                  <Pressable onPress={() => removeOption(qi, oi)} hitSlop={8}>
                    <Ionicons name="close" size={22} color={colors.muted} />
                  </Pressable>
                )}
              </View>
            ))}

            <Button variant="secondary" title="+ Add option" onPress={() => addOption(qi)} />

            <Field
              label="Explanation (shown after the quiz is submitted)"
              value={q.explanation}
              onChangeText={(explanation) => updateQuestion(qi, { explanation })}
              placeholder="Why is the correct answer correct?"
              multiline
            />
          </Card>
        ))}

        <Button variant="secondary" title="+ Add question" onPress={addQuestion} />

        <ErrorText>{error}</ErrorText>
        <Button
          title={busy ? 'Saving…' : 'Create lesson'}
          onPress={onSubmit}
          disabled={busy || !lesson.title.trim() || !lesson.topic.trim()}
        />
        <Muted>Empty quiz questions are dropped automatically on save.</Muted>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  qLabel: { fontFamily: fonts.bodyBold, fontSize: 15, color: colors.ink },
  remove: { fontFamily: fonts.bodyMedium, color: colors.bad, fontSize: 14 },
  optionRow: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  optionField: { flex: 1 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.accent },
  radioDot: { width: 12, height: 12, borderRadius: radius.pill, backgroundColor: colors.accent },
});
