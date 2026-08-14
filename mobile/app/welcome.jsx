import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BrandMark, Button, Card, Screen } from '../components/ui';
import { colors, fonts, space } from '../lib/theme';

const STEPS = [
  {
    icon: 'library',
    title: 'Browse courses',
    body: 'Pick a path across computing, science, and humanities.',
  },
  {
    icon: 'help-circle',
    title: 'Take adaptive quizzes',
    body: "Every quiz reshapes what you study next — easier when you struggle, harder once you've got it.",
  },
  {
    icon: 'stats-chart',
    title: 'Track your mastery',
    body: 'Watch your mastery level and recommendations build up on your dashboard.',
  },
];

export default function Welcome() {
  const router = useRouter();

  return (
    <Screen center>
      <BrandMark subtitle="You're all set. Here's how Learnly works." />
      {STEPS.map((step) => (
        <Card key={step.title} style={s.step}>
          <View style={s.stepIcon}>
            <Ionicons name={step.icon} size={22} color={colors.accent} />
          </View>
          <View style={s.stepBody}>
            <Text style={s.stepTitle}>{step.title}</Text>
            <Text style={s.stepText}>{step.body}</Text>
          </View>
        </Card>
      ))}
      <Button title="Get started" onPress={() => router.replace('/')} />
    </Screen>
  );
}

const s = StyleSheet.create({
  step: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  stepIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBody: { flex: 1, gap: 2 },
  stepTitle: { fontFamily: fonts.bodySemi, fontSize: 15, color: colors.ink },
  stepText: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.muted },
});
