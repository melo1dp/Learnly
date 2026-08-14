import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  colorForCourse,
  colors,
  difficultyColor,
  fonts,
  outcomeColor,
  radius,
  shadow,
  space,
  stripePalette,
  type,
} from '../lib/theme';

/** Radial-gradient-mesh approximation: soft overlapping color blobs, merged
 *  by a blur, over the base slate canvas. expo-linear-gradient only draws
 *  linear gradients, so a true radial mesh isn't directly available — this
 *  is the practical substitute. */
export function MeshBackdrop() {
  return (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.bg }]} />
      <View style={s.meshBlobAmber} />
      <View style={s.meshBlobViolet} />
      <BlurView intensity={70} tint="dark" style={StyleSheet.absoluteFill} />
    </View>
  );
}

/** Scrolling page body over the mesh backdrop. */
export function Screen({ children, center = false, style }) {
  return (
    <View style={s.flex}>
      <MeshBackdrop />
      <ScrollView
        style={s.flex}
        contentContainerStyle={[s.screenContent, center && s.screenCentered, style]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Row({ children, style }) {
  return <View style={[s.row, style]}>{children}</View>;
}

export function BrandMark({ subtitle }) {
  return (
    <View style={s.brandBlock}>
      <Text style={s.brand}>Learnly</Text>
      {subtitle ? <Text style={s.brandSub}>{subtitle}</Text> : null}
    </View>
  );
}

export function SectionHeader({ title, subtitle, style }) {
  return (
    <View style={[s.sectionHeader, style]}>
      <Text style={s.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={s.sectionSub}>{subtitle}</Text> : null}
    </View>
  );
}

export function EmptyState({ title, body }) {
  return (
    <View style={s.empty}>
      <Text style={s.emptyTitle}>{title}</Text>
      {body ? <Text style={s.muted}>{body}</Text> : null}
    </View>
  );
}

// Maps a course title to a representative Ionicons name, by keyword.
const ICON_KEYWORDS = [
  [/python|programming/i, 'code-slash'],
  [/web|html|css|javascript/i, 'globe'],
  [/database|sql/i, 'server'],
  [/data structure/i, 'git-network'],
  [/biology|cell/i, 'leaf'],
  [/environment/i, 'earth'],
  [/history|revolution/i, 'time'],
  [/writing/i, 'create'],
  [/psycholog/i, 'happy'],
  [/econom/i, 'cash'],
  [/algebra|math/i, 'calculator'],
  [/statistic/i, 'stats-chart'],
];

export function courseIconFor(title = '') {
  const match = ICON_KEYWORDS.find(([re]) => re.test(title));
  return match ? match[1] : 'book';
}

// Lightens (positive) or darkens (negative) a #rrggbb hex by a -100..100 amount.
function shadeColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * amount);
  const r = Math.min(255, Math.max(0, (num >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
  return `rgb(${r}, ${g}, ${b})`;
}

export function usePressScale({ to = 0.98 } = {}) {
  const scale = useRef(new Animated.Value(1)).current;

  function pressIn() {
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 4 }).start();
  }
  function pressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 4 }).start();
  }

  return { scale, pressIn, pressOut };
}

const LEVEL_TONE = { beginner: 'easy', intermediate: 'medium', advanced: 'hard' };

export function CourseTile({
  id,
  title,
  description,
  category,
  level,
  rating,
  progress, // 0-1, or undefined if the learner hasn't started it
  index = 0,
  onPress,
}) {
  const { scale, pressIn, pressOut } = usePressScale();
  const lift = useRef(new Animated.Value(0)).current;
  const stripe = id != null ? colorForCourse(id) : stripePalette[index % stripePalette.length];
  const icon = courseIconFor(title);

  // Hover-lift is web-only — onHoverIn/Out simply never fire on native (no mouse).
  function hoverIn() {
    if (Platform.OS !== 'web') return;
    Animated.timing(lift, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  }
  function hoverOut() {
    if (Platform.OS !== 'web') return;
    Animated.timing(lift, { toValue: 0, duration: 150, useNativeDriver: true }).start();
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      onHoverIn={hoverIn}
      onHoverOut={hoverOut}
    >
      <Animated.View
        style={[
          s.courseCard,
          {
            transform: [
              { scale },
              { translateY: lift.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) },
            ],
          },
        ]}
      >
        {/* Horizontal, not a 100px artwork banner stacked above the text. The
            banner pushed the title of every card to the fold, so the catalogue
            showed barely one course per screen. The identity colour still
            carries — as a rail and an icon tile rather than a block. */}
        <View style={[s.courseRail, { backgroundColor: stripe }]} />

        <View style={s.courseThumb}>
          <LinearGradient
            colors={[shadeColor(stripe, 14), shadeColor(stripe, -30)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: radius.md }]}
          />
          <Ionicons name={icon} size={24} color={colors.white} />
        </View>

        <View style={s.courseCardBody}>
          <Text style={s.courseTitle} numberOfLines={2}>
            {title}
          </Text>
          {description ? (
            <Text style={s.courseDesc} numberOfLines={2}>
              {description}
            </Text>
          ) : null}

          <View style={s.courseTags}>
            {level ? <Pill label={level} tone={LEVEL_TONE[level]} /> : null}
            {category ? <Text style={s.courseCategory}>{category}</Text> : null}
            {rating != null ? (
              <View style={s.ratingChip}>
                <Ionicons name="star" size={11} color={colors.accent} />
                <Text style={s.ratingText}>{rating}</Text>
              </View>
            ) : null}
          </View>

          {progress != null ? (
            <View style={s.courseProgressRow}>
              <View style={s.courseProgressTrack}>
                <View
                  style={[
                    s.courseProgressFill,
                    { width: `${Math.round(progress * 100)}%`, backgroundColor: stripe },
                  ]}
                />
              </View>
              <Text style={s.courseProgressText}>{Math.round(progress * 100)}%</Text>
            </View>
          ) : null}
        </View>
      </Animated.View>
    </Pressable>
  );
}

export function LessonRow({ index, title, topic, difficulty, completed, bestScore, onPress }) {
  const { scale, pressIn, pressOut } = usePressScale();
  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      accessibilityRole="button"
      // Completion is shown with a tick *and* stated here, because a colour
      // and a glyph alone say nothing to a screen reader.
      accessibilityLabel={
        `Lesson ${index}: ${title}, ${difficulty}, topic ${topic}. ` +
        (completed ? `Completed, best score ${bestScore} percent.` : 'Not started.')
      }
    >
      <Animated.View style={[s.lessonRow, { transform: [{ scale }] }]}>
        <View style={[s.lessonNum, completed && s.lessonNumDone]}>
          {completed ? (
            <Ionicons name="checkmark" size={18} color={colors.bg} />
          ) : (
            <Text style={s.lessonNumText}>{index}</Text>
          )}
        </View>
        <View style={s.lessonBody}>
          <Text style={s.lessonTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={s.lessonMeta}>
            Topic · {topic}
            {completed ? ` · best ${bestScore}%` : ''}
          </Text>
        </View>
        <Pill label={difficulty} tone={difficulty} />
      </Animated.View>
    </Pressable>
  );
}

export function ContinueCard({ lessonTitle, reason, difficulty, onPress }) {
  const { scale, pressIn, pressOut } = usePressScale();
  if (!lessonTitle) return null;
  return (
    <Pressable
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      accessibilityRole="button"
      accessibilityLabel={`Continue learning: ${lessonTitle}`}
      accessibilityHint="Opens the next recommended lesson"
    >
      <Animated.View style={[s.continueCard, { transform: [{ scale }] }]}>
        <View style={s.continueAccent} />
        <Text style={s.continueEyebrow}>Continue learning</Text>
        <Text style={s.continueTitle} numberOfLines={2}>
          {lessonTitle}
        </Text>
        {reason ? (
          <Text style={s.continueReason} numberOfLines={2}>
            {reason}
          </Text>
        ) : null}
        <View style={s.continueFooter}>
          {difficulty ? <Pill label={difficulty} tone={difficulty} /> : <View />}
          <Text style={s.continueCta}>Open lesson →</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const BURST_DOTS = 8;

export function ScoreHero({ score, correct, total }) {
  const anim = useRef(new Animated.Value(0)).current;
  const burst = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = useState(0);
  const celebrate = score >= 80;

  useEffect(() => {
    anim.setValue(0);
    burst.setValue(0);
    const id = anim.addListener(({ value }) => setDisplay(Math.round(value)));
    Animated.timing(anim, { toValue: score, duration: 900, useNativeDriver: false }).start();
    if (celebrate) {
      Animated.timing(burst, {
        toValue: 1,
        duration: 700,
        delay: 250,
        useNativeDriver: true,
      }).start();
    }
    return () => anim.removeListener(id);
  }, [score, anim, burst, celebrate]);

  return (
    <View style={s.scoreHero}>
      {celebrate ? (
        <View style={[s.burstWrap, { pointerEvents: 'none' }]}>
          {Array.from({ length: BURST_DOTS }).map((_, i) => {
            const angle = (i / BURST_DOTS) * Math.PI * 2;
            const distance = 70;
            return (
              <Animated.View
                key={i}
                style={[
                  s.burstDot,
                  {
                    opacity: burst.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                    transform: [
                      {
                        translateX: burst.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, Math.cos(angle) * distance],
                        }),
                      },
                      {
                        translateY: burst.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, Math.sin(angle) * distance],
                        }),
                      },
                      {
                        scale: burst.interpolate({
                          inputRange: [0, 0.3, 1],
                          outputRange: [0, 1, 0.4],
                        }),
                      },
                    ],
                  },
                ]}
              />
            );
          })}
        </View>
      ) : null}
      <Text style={s.scoreValue}>{display}%</Text>
      <Text style={s.scoreSub}>
        {correct} of {total} correct
      </Text>
    </View>
  );
}

export function H1({ children, style }) {
  return <Text style={[s.h1, style]}>{children}</Text>;
}

export function H3({ children, style }) {
  return <Text style={[s.h3, style]}>{children}</Text>;
}

export function Muted({ children, style }) {
  return <Text style={[s.muted, style]}>{children}</Text>;
}

export function ErrorText({ children }) {
  return children ? <Text style={s.error}>{children}</Text> : null;
}

export function Loading({ label = 'Loading' }) {
  return (
    <View style={s.loadingScreen}>
      <LinearGradient
        colors={[colors.bgWash, colors.bg]}
        style={StyleSheet.absoluteFill}
      />
      <ActivityIndicator
        color={colors.accent}
        size="large"
        accessibilityLabel={label}
      />
    </View>
  );
}

/**
 * Full-screen failure state. `onRetry` is optional only so this can still be
 * used where there is genuinely nothing to retry — every data screen should
 * pass one. Without it the only way out of an error used to be switching tabs,
 * which happened to trigger a refetch and which nothing told the user about.
 */
export function ErrorScreen({ message, onRetry }) {
  return (
    <View style={s.errorScreen}>
      <LinearGradient colors={[colors.bgWash, colors.bg]} style={StyleSheet.absoluteFill} />
      <Ionicons
        name="cloud-offline-outline"
        size={40}
        color={colors.muted}
        style={s.errorIcon}
      />
      <Text style={s.errorTitle}>Something went wrong</Text>
      <Text style={s.errorBody}>{message}</Text>
      {onRetry ? (
        <Button title="Try again" onPress={onRetry} style={s.errorRetry} />
      ) : null}
    </View>
  );
}

/** A non-blocking error, for when the screen already has content to show. */
export function ErrorBanner({ message, onRetry }) {
  if (!message) return null;
  return (
    <View style={s.errorBanner}>
      <Ionicons name="warning-outline" size={18} color={colors.bad} />
      <Text style={s.errorBannerText} numberOfLines={2}>
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Retry loading"
        >
          <Text style={s.errorBannerAction}>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Button({ title, onPress, disabled, variant = 'primary', style }) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        s.btn,
        secondary && s.btnSecondary,
        disabled && s.btnDisabled,
        pressed && !disabled && s.btnPressed,
        style,
      ]}
    >
      <Text style={[s.btnText, secondary && s.btnSecondaryText]}>{title}</Text>
    </Pressable>
  );
}

export function Pill({ label, tone }) {
  const tint = difficultyColor[tone] ?? outcomeColor[tone];
  return (
    <View
      style={[
        s.pill,
        tint && { borderColor: tint, backgroundColor: `${tint}18` },
      ]}
    >
      {/* Only taxonomy values (difficulty, outcome — the ones that arrive from
          the database lowercase) get title-cased. Applying it to every pill
          turned free text into "Member Since Aug 2026". */}
      <Text style={[s.pillText, tint && s.pillTextTaxonomy, tint && { color: tint }]}>
        {label}
      </Text>
    </View>
  );
}

export function Field({ label, style, inputStyle, multiline, ...inputProps }) {
  return (
    <View style={[s.field, style]}>
      {label ? <Text style={s.fieldLabel}>{label}</Text> : null}
      <TextInput
        style={[s.input, multiline && s.inputMultiline, inputStyle]}
        placeholderTextColor={colors.muted}
        multiline={multiline}
        {...inputProps}
      />
    </View>
  );
}

export function Choice({ label, value, options, onChange, style }) {
  return (
    <View style={[s.field, style]}>
      {label ? <Text style={s.fieldLabel}>{label}</Text> : null}
      {/* radiogroup + per-option checked state: selection is otherwise conveyed
          only by border and text colour, which a screen reader cannot see. */}
      <View style={s.choiceRow} accessibilityRole="radiogroup">
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              accessibilityRole="radio"
              accessibilityLabel={opt.label}
              accessibilityState={{ selected, checked: selected }}
              style={({ pressed }) => [
                s.choice,
                selected && s.choiceSelected,
                pressed && s.choicePressed,
              ]}
            >
              <Text style={[s.choiceText, selected && s.choiceTextSelected]}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function Option({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ selected, checked: selected }}
      style={({ pressed }) => [
        s.option,
        selected && s.optionSelected,
        pressed && s.optionPressed,
      ]}
    >
      <View style={[s.radio, selected && s.radioSelected]}>
        {selected ? <View style={s.radioDot} /> : null}
      </View>
      <Text style={s.optionText}>{label}</Text>
    </Pressable>
  );
}

/**
 * Per-question review: the correct answer, what the learner chose, and why.
 *
 * Shared by the post-submit result screen and the attempt-history screen, which
 * must show the same thing — this used to live inline in the quiz screen, which
 * is precisely why a completed attempt could never be looked at again.
 */
export function AnswerReview({ perQuestion = [] }) {
  return perQuestion.map((q, i) => {
    const skipped = q.chosen == null;
    return (
      <Card key={q.questionId}>
        <Row>
          <Text style={s.reviewIndex}>Question {i + 1}</Text>
          <Pill
            label={q.isCorrect ? 'Correct' : skipped ? 'Skipped' : 'Incorrect'}
            tone={q.isCorrect ? 'mastered' : 'struggling'}
          />
        </Row>
        <Text style={s.reviewQuestion}>{q.text}</Text>
        <View style={s.reviewOptions}>
          {(q.options || []).map((opt, idx) => (
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
        {/* Falling through to nothing when an instructor left the explanation
            blank made the wrong answer feel arbitrary. */}
        <Text style={s.reviewExplanation}>
          {q.explanation || 'No explanation was provided for this question.'}
        </Text>
      </Card>
    );
  });
}

export function Banner({ outcome, children }) {
  const tint = outcomeColor[outcome] ?? colors.border;
  return (
    <View style={[s.banner, { borderColor: tint, backgroundColor: `${tint}14` }]}>{children}</View>
  );
}

export function ProgressBar({ value, color = colors.accent }) {
  const pct = `${Math.max(0, Math.min(1, value)) * 100}%`;
  return (
    <View style={s.progressTrack}>
      <View style={[s.progressFill, { width: pct, backgroundColor: color }]} />
    </View>
  );
}

// Matches RULES.MASTERY_TO_ADVANCE in the engine, which clamps mastery_level
// there. At 3 the bars under-reported: a fully mastered topic showed two thirds.
const MASTERY_CAP = 2;
// Brass (not accent) for in_progress — accent and good are both teal-green and
// read as near-identical for colorblind viewers; brass/good/bad stay distinct.
const masteryBarColor = {
  mastered: colors.good,
  needs_review: colors.bad,
  in_progress: colors.brass,
};

/** Horizontal bar-per-topic mastery chart. Sorted highest-mastery first. */
export function MasteryChart({ data }) {
  const sorted = [...data].sort((a, b) => b.mastery_level - a.mastery_level);
  return (
    <View style={s.masteryChart}>
      {sorted.map((m) => (
        <View key={m.topic} style={s.masteryRow}>
          <Row style={s.masteryHead}>
            <Text style={s.masteryTopic}>{m.topic}</Text>
            <Pill
              label={m.status.replace('_', ' ')}
              tone={m.status === 'mastered' ? 'mastered' : m.status === 'needs_review' ? 'struggling' : undefined}
            />
          </Row>
          <Row style={s.masteryBarRow}>
            <View style={s.masteryTrack}>
              <View
                style={[
                  s.masteryFill,
                  {
                    width: `${Math.min(m.mastery_level / MASTERY_CAP, 1) * 100}%`,
                    backgroundColor: masteryBarColor[m.status] || colors.accent,
                  },
                ]}
              />
            </View>
            <Text style={s.masteryValue}>
              {m.mastery_level}/{MASTERY_CAP}
            </Text>
          </Row>
        </View>
      ))}
    </View>
  );
}

/** Small labeled number tile — a row of these is the dashboard's stat summary. */
export function StatTile({ label, value }) {
  return (
    <View style={s.statTile}>
      <Text style={s.statTileValue}>{value}</Text>
      <Text style={s.statTileLabel}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  screenContent: { padding: space.xl, paddingBottom: 56, gap: space.md },
  screenCentered: { flexGrow: 1, justifyContent: 'center' },

  meshBlobAmber: {
    position: 'absolute',
    top: -90,
    right: -70,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: colors.accent,
    opacity: 0.16,
  },
  meshBlobViolet: {
    position: 'absolute',
    bottom: -110,
    left: -90,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#8B74C9',
    opacity: 0.12,
  },

  card: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: space.xl,
    gap: space.md,
    ...shadow.soft,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
  },

  brandBlock: { gap: space.sm, marginBottom: space.sm },
  brand: { ...type.brand, color: colors.ink },
  brandSub: { ...type.body, color: colors.muted, maxWidth: 320 },

  sectionHeader: { gap: 4, marginTop: space.sm, marginBottom: space.xs },
  sectionTitle: { ...type.h2, color: colors.ink },
  sectionSub: { ...type.caption, color: colors.muted },

  empty: {
    backgroundColor: colors.panel2,
    borderRadius: radius.lg,
    padding: space.xxl,
    gap: space.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: { ...type.h3, color: colors.ink },

  courseCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
    padding: space.lg,
    paddingLeft: space.lg + 4,
    backgroundColor: colors.panel,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadow.soft,
  },
  courseRail: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  courseThumb: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  courseCardBody: { flex: 1, gap: 5 },
  courseCategory: { ...type.caption, color: colors.muted },
  courseTitle: { ...type.h3, color: colors.ink },
  courseDesc: { ...type.caption, color: colors.muted },
  courseTags: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space.xs, marginTop: 2 },
  ratingChip: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontFamily: fonts.monoMedium, fontSize: 12, color: colors.ink },
  courseProgressRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: 4 },
  courseProgressTrack: {
    flex: 1,
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.panel2,
    overflow: 'hidden',
  },
  courseProgressFill: { height: '100%', borderRadius: radius.pill },
  courseProgressText: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },

  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.panel,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.lg,
    ...shadow.soft,
  },
  lessonNum: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewIndex: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.muted,
  },
  reviewQuestion: {
    fontFamily: fonts.bodySemi,
    fontSize: 16,
    lineHeight: 24,
    color: colors.ink,
    marginBottom: space.sm,
  },
  reviewOptions: { gap: space.sm },
  reviewOption: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
    borderRadius: radius.md,
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
  reviewExplanation: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    marginTop: space.xs,
  },

  lessonNumDone: { backgroundColor: colors.good },
  lessonNumText: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.accent },
  lessonBody: { flex: 1, gap: 2 },
  lessonTitle: { ...type.h3, color: colors.ink },
  lessonMeta: { ...type.caption, color: colors.muted, textTransform: 'capitalize' },

  // Was a solid amber fill with white text on it — the app's single most
  // important CTA, at 2.07:1 for the title and 1.74:1 for the eyebrow, with a
  // difficulty Pill that tinted its own text to roughly 1.5:1 against the same
  // fill. Inverted to a dark panel with an amber edge: the accent still carries
  // the emphasis, and every label is now read against a surface built for text.
  continueCard: {
    backgroundColor: colors.panel2,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.lg,
    padding: space.xl,
    paddingLeft: space.xl + 4,
    gap: space.sm,
    overflow: 'hidden',
    ...shadow.soft,
  },
  continueAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.accent,
  },
  continueEyebrow: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  continueTitle: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.ink },
  continueReason: { ...type.caption, color: colors.muted },
  continueFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.sm,
  },
  continueCta: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.accent },

  scoreHero: {
    alignItems: 'center',
    paddingVertical: space.xxl,
    backgroundColor: colors.panel,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: space.sm,
    ...shadow.soft,
  },
  scoreValue: { ...type.score, color: colors.accent },
  scoreSub: { ...type.body, color: colors.muted },
  burstWrap: {
    position: 'absolute',
    top: '38%',
    left: '50%',
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  burstDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brass,
  },

  h1: { ...type.h1, color: colors.ink },
  h3: { ...type.h3, color: colors.ink },
  muted: { ...type.body, color: colors.muted },
  error: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.bad },

  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  errorScreen: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: space.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIcon: { marginBottom: space.md },
  errorTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    color: colors.ink,
    marginBottom: space.xs,
    textAlign: 'center',
  },
  errorBody: {
    ...type.body,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: space.lg,
  },
  errorRetry: { alignSelf: 'stretch' },

  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    borderWidth: 1,
    borderColor: colors.bad,
    backgroundColor: `${colors.bad}14`,
    borderRadius: radius.md,
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    marginBottom: space.md,
  },
  errorBannerText: { ...type.caption, color: colors.ink, flex: 1 },
  errorBannerAction: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.accent },

  btn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: space.lg,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
  },
  btnSecondary: {
    backgroundColor: colors.panel,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  btnDisabled: { opacity: 0.45 },
  btnPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  // Dark ink on amber, not white. White on this accent measures 2.07:1 — WCAG
  // AA wants 4.5:1 for text this size — and it was the label on every primary
  // action in the app. colors.bg on the same amber is 9.3:1.
  btnText: { fontFamily: fonts.bodySemi, fontSize: 15, color: colors.bg },
  btnSecondaryText: { color: colors.ink },

  pill: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    color: colors.muted,
  },
  pillTextTaxonomy: { textTransform: 'capitalize' },

  masteryChart: { gap: space.lg },
  masteryRow: { gap: space.xs },
  masteryHead: { justifyContent: 'space-between' },
  masteryTopic: {
    fontFamily: fonts.bodySemi,
    fontSize: 14,
    color: colors.ink,
    textTransform: 'capitalize',
  },
  masteryBarRow: { gap: space.sm },
  masteryTrack: {
    flex: 1,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.panel2,
    overflow: 'hidden',
  },
  masteryFill: { height: '100%', borderRadius: radius.pill },
  masteryValue: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.muted,
    width: 32,
    textAlign: 'right',
  },

  statTile: {
    flex: 1,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: space.lg,
    paddingHorizontal: space.md,
    alignItems: 'center',
    gap: 2,
    ...shadow.soft,
  },
  statTileValue: { fontFamily: fonts.displayBold, fontSize: 24, color: colors.accent },
  statTileLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },

  field: { gap: space.xs },
  fieldLabel: { ...type.label, color: colors.muted },
  input: {
    backgroundColor: colors.panel2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: space.md,
    color: colors.ink,
    fontFamily: fonts.body,
    fontSize: 15,
    minHeight: 50,
  },
  inputMultiline: { minHeight: 110, textAlignVertical: 'top', paddingTop: 12 },

  choiceRow: { flexDirection: 'row', gap: space.sm, flexWrap: 'wrap' },
  choice: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: space.lg,
    minHeight: 48,
    justifyContent: 'center',
  },
  choiceSelected: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  choicePressed: { opacity: 0.7 },
  choiceText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.muted,
    textTransform: 'capitalize',
  },
  choiceTextSelected: { color: colors.accent, fontFamily: fonts.bodySemi },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    backgroundColor: colors.panel2,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    minHeight: 52,
  },
  optionSelected: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  // Quiz answers had no pressed state at all, so tapping one felt dead until
  // the state re-render landed.
  optionPressed: { opacity: 0.7 },
  optionText: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.ink, flex: 1 },

  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.accent },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: radius.pill,
    backgroundColor: colors.accent,
  },

  banner: {
    borderWidth: 1.5,
    borderRadius: radius.lg,
    padding: space.xl,
    gap: space.sm,
  },

  progressTrack: {
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.panel2,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: radius.pill },

  pressed: { opacity: 0.82 },
});
