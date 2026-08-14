import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

/** Scrolling page body with paper + teal wash backdrop. */
export function Screen({ children, center = false, style }) {
  return (
    <View style={s.flex}>
      <LinearGradient
        colors={[colors.bgWash, colors.bg, colors.bg]}
        locations={[0, 0.35, 1]}
        style={StyleSheet.absoluteFill}
      />
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

export function CourseTile({ id, title, description, index = 0, onPress }) {
  const { scale, pressIn, pressOut } = usePressScale();
  const stripe = id != null ? colorForCourse(id) : stripePalette[index % stripePalette.length];
  const icon = courseIconFor(title);

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[s.courseTile, { transform: [{ scale }] }]}>
        <View style={[s.courseStripe, { backgroundColor: stripe }]} />
        <View style={[s.courseIconWrap, { backgroundColor: `${stripe}18` }]}>
          <Ionicons name={icon} size={20} color={stripe} />
        </View>
        <View style={s.courseBody}>
          <Text style={s.courseTitle} numberOfLines={2}>
            {title}
          </Text>
          {description ? (
            <Text style={s.courseDesc} numberOfLines={2}>
              {description}
            </Text>
          ) : null}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </Animated.View>
    </Pressable>
  );
}

export function LessonRow({ index, title, topic, difficulty, onPress }) {
  const { scale, pressIn, pressOut } = usePressScale();
  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[s.lessonRow, { transform: [{ scale }] }]}>
        <View style={s.lessonNum}>
          <Text style={s.lessonNumText}>{index}</Text>
        </View>
        <View style={s.lessonBody}>
          <Text style={s.lessonTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={s.lessonMeta}>Topic · {topic}</Text>
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
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View style={[s.continueCard, { transform: [{ scale }] }]}>
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
        <View style={s.burstWrap} pointerEvents="none">
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

export function Loading() {
  return (
    <View style={s.loadingScreen}>
      <LinearGradient
        colors={[colors.bgWash, colors.bg]}
        style={StyleSheet.absoluteFill}
      />
      <ActivityIndicator color={colors.accent} size="large" />
    </View>
  );
}

export function ErrorScreen({ message }) {
  return (
    <View style={s.errorScreen}>
      <LinearGradient colors={[colors.bgWash, colors.bg]} style={StyleSheet.absoluteFill} />
      <Text style={s.error}>{message}</Text>
    </View>
  );
}

export function Button({ title, onPress, disabled, variant = 'primary', style }) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
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
      <Text style={[s.pillText, tint && { color: tint }]}>{label}</Text>
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
      <View style={s.choiceRow}>
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[s.choice, selected && s.choiceSelected]}
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
    <Pressable onPress={onPress} style={[s.option, selected && s.optionSelected]}>
      <View style={[s.radio, selected && s.radioSelected]}>
        {selected ? <View style={s.radioDot} /> : null}
      </View>
      <Text style={s.optionText}>{label}</Text>
    </Pressable>
  );
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

const MASTERY_CAP = 3;
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

  courseTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    paddingRight: space.lg,
    minHeight: 92,
    ...shadow.soft,
  },
  courseStripe: { width: 6, alignSelf: 'stretch' },
  courseIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: space.lg,
    alignSelf: 'center',
  },
  courseBody: { flex: 1, paddingVertical: space.lg, paddingHorizontal: space.lg, gap: 4 },
  courseTitle: { ...type.h3, color: colors.ink },
  courseDesc: { ...type.caption, color: colors.muted },

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
  lessonNumText: { fontFamily: fonts.bodyBold, fontSize: 14, color: colors.accent },
  lessonBody: { flex: 1, gap: 2 },
  lessonTitle: { ...type.h3, color: colors.ink },
  lessonMeta: { ...type.caption, color: colors.muted, textTransform: 'capitalize' },

  continueCard: {
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    padding: space.xl,
    gap: space.sm,
    ...shadow.soft,
  },
  continueEyebrow: {
    fontFamily: fonts.bodySemi,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.75)',
  },
  continueTitle: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28, color: colors.white },
  continueReason: { ...type.caption, color: 'rgba(255,255,255,0.85)' },
  continueFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: space.sm,
  },
  continueCta: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.white },

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
  errorScreen: { flex: 1, backgroundColor: colors.bg, padding: space.xl, justifyContent: 'center' },

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
  btnText: { fontFamily: fonts.bodySemi, fontSize: 15, color: colors.white },
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
    textTransform: 'capitalize',
  },

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
