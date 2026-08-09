import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import {
  Button,
  Card,
  ErrorScreen,
  ErrorText,
  Field,
  Screen,
  SectionHeader,
} from '../../components/ui';
import { colors } from '../../lib/theme';

export default function NewCourse() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user?.role !== 'instructor') return <ErrorScreen message="Instructors only." />;

  async function onSubmit() {
    setError('');
    setBusy(true);
    try {
      const course = await api('/courses', {
        method: 'POST',
        body: { title: title.trim(), description: description.trim() },
      });
      router.replace(`/courses/${course.id}`);
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
          title="New course"
          subtitle="Title and a short description — learners will see these in the catalogue."
        />
        <Card>
          <Field
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Intro to Databases"
          />
          <Field
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="What this course covers"
            multiline
          />
          <ErrorText>{error}</ErrorText>
          <Button
            title={busy ? 'Creating…' : 'Create course'}
            onPress={onSubmit}
            disabled={busy || !title.trim()}
          />
        </Card>
      </Screen>
    </KeyboardAvoidingView>
  );
}
