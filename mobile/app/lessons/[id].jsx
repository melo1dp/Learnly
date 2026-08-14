import { Platform, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useApi } from '../../lib/useApi';
import { Button, Card, ErrorScreen, Loading, Muted, Pill, Screen } from '../../components/ui';
import { colorForCourse, colors, fonts, radius, space, type } from '../../lib/theme';

// Splits a lesson body into paragraphs, 4-space-indented code blocks, and the
// closing "Key takeaway" line, so each can get its own styling instead of one
// long wall of text.
function parseLessonBody(body) {
  return body
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n');
      const isCode = lines.every((l) => l.trim() === '' || /^ {4,}/.test(l));
      if (isCode) {
        return { type: 'code', text: lines.map((l) => l.replace(/^ {4}/, '')).join('\n') };
      }
      if (/^key takeaway/i.test(block.trim())) {
        return { type: 'takeaway', text: block.trim().replace(/^key takeaway:?\s*/i, '') };
      }
      return { type: 'paragraph', text: block.trim() };
    });
}

function readingMinutes(body) {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));
}

export default function Lesson() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: lesson, error } = useApi(`/lessons/${id}`);

  if (error) return <ErrorScreen message={error} />;
  if (!lesson) return <Loading />;

  const blocks = parseLessonBody(lesson.body);
  const mins = readingMinutes(lesson.body);
  const accent = colorForCourse(lesson.course_id);

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />

      <Screen>
        <View style={[s.banner, { backgroundColor: accent }]}>
          <View style={s.bannerIconWrap}>
            <Ionicons name="document-text" size={22} color={colors.white} />
          </View>
          <Text style={s.bannerTitle}>{lesson.title}</Text>
          <View style={s.bannerMeta}>
            <Pill label={lesson.difficulty} tone={lesson.difficulty} />
            <Text style={s.bannerMetaText}>Topic · {lesson.topic}</Text>
            <Text style={s.bannerMetaText}>{mins} min read</Text>
          </View>
        </View>

        <Card style={s.readCard}>
          {blocks.map((block, i) => {
            if (block.type === 'code') {
              return (
                <View key={i} style={s.codeBlock}>
                  <Text style={s.codeText}>{block.text}</Text>
                </View>
              );
            }
            if (block.type === 'takeaway') {
              return (
                <View key={i} style={s.takeaway}>
                  <Ionicons name="bulb" size={18} color={colors.brass} />
                  <Text style={s.takeawayText}>{block.text}</Text>
                </View>
              );
            }
            return (
              <Text key={i} style={s.paragraph}>
                {block.text}
              </Text>
            );
          })}
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
  banner: {
    borderRadius: radius.xl,
    padding: space.xl,
    gap: space.sm,
    marginBottom: space.sm,
  },
  bannerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bannerTitle: { ...type.h2, fontFamily: fonts.display, color: colors.white },
  bannerMeta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.md },
  bannerMetaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'capitalize',
  },

  readCard: { paddingVertical: space.xl },
  paragraph: { ...type.bodyLg, color: colors.ink },

  codeBlock: {
    backgroundColor: colors.ink,
    borderRadius: radius.md,
    padding: space.lg,
  },
  codeText: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontSize: 13,
    lineHeight: 20,
    color: '#CFEAE1',
  },

  takeaway: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.sm,
    backgroundColor: colors.brassSoft,
    borderWidth: 1,
    borderColor: `${colors.brass}55`,
    borderRadius: radius.md,
    padding: space.lg,
  },
  takeawayText: { ...type.body, color: colors.ink, flex: 1, fontFamily: fonts.bodyMedium },

  cta: { marginTop: space.sm, gap: space.md },
});
