import { StyleSheet, Text, View } from 'react-native';
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
  const { data: lesson, error, reload } = useApi(`/lessons/${id}`);

  if (error && !lesson) return <ErrorScreen message={error} onRetry={reload} />;
  if (!lesson) return <Loading label="Loading lesson" />;

  // `body` has a NOT NULL default server-side, but parseLessonBody calls
  // .trim() on it unguarded and there is no error boundary above this screen —
  // one null would be a blank screen with no way back.
  const body = lesson.body || '';
  const blocks = parseLessonBody(body);
  const mins = readingMinutes(body);
  const accent = colorForCourse(lesson.course_id);

  return (
    <>
      <Stack.Screen options={{ title: lesson.title }} />

      <Screen>
        {/* A dark panel edged in the course colour, rather than white text on a
            saturated fill: white on these stripes measures 2.9-3.7:1, and the
            14px description was down at 2.6:1. The identity colour still reads,
            now as an accent rather than as a background for body text. */}
        <View style={[s.banner, { borderColor: accent }]}>
          <View style={[s.bannerAccent, { backgroundColor: accent }]} />
          <View style={[s.bannerIconWrap, { backgroundColor: `${accent}26` }]}>
            <Ionicons name="document-text" size={22} color={accent} />
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

        {/* A lesson without a quiz used to be a dead end: no quiz button, and no
            other way forward. Every lesson now offers a route back to its
            course, so reading is never a one-way door. */}
        <View style={s.cta}>
          {lesson.quiz ? (
            <Button
              title="Take the quiz →"
              onPress={() => router.push(`/quizzes/${lesson.quiz.id}`)}
            />
          ) : (
            <Muted>
              This lesson has no quiz yet, so it won’t change your adaptive path.
            </Muted>
          )}
          <Button
            title="Back to course"
            variant="secondary"
            onPress={() => router.push(`/courses/${lesson.course_id}`)}
          />
        </View>
      </Screen>
    </>
  );
}

const s = StyleSheet.create({
  banner: {
    backgroundColor: colors.panel2,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: space.xl,
    paddingLeft: space.xl + 4,
    gap: space.sm,
    marginBottom: space.sm,
    overflow: 'hidden',
  },
  bannerAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  bannerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bannerTitle: { ...type.h2, fontFamily: fonts.display, color: colors.ink },
  bannerMeta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.md },
  bannerMetaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.muted,
    textTransform: 'capitalize',
  },

  readCard: { paddingVertical: space.xl },
  paragraph: { ...type.bodyLg, color: colors.ink },

  codeBlock: {
    backgroundColor: colors.codeBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: space.lg,
  },
  codeText: {
    fontFamily: fonts.mono,
    fontSize: 13,
    lineHeight: 20,
    color: colors.codeInk,
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
