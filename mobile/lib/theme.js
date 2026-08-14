// Paper & Teal — light academic tokens for Learnly.

export const colors = {
  bg: '#F5F7F4',
  bgWash: '#DCEBE6',
  panel: '#FFFFFF',
  panel2: '#EEF3EF',
  ink: '#14201C',
  text: '#14201C',
  muted: '#5A6B64',
  accent: '#0F6B5C',
  accentSoft: '#E3F2EE',
  brass: '#C4893A',
  brassSoft: '#F7EBD8',
  good: '#1A8F6A',
  warn: '#C4893A',
  bad: '#C44B4B',
  border: '#D4DDD8',
  white: '#FFFFFF',
};

export const difficultyColor = {
  easy: colors.good,
  medium: colors.brass,
  hard: colors.bad,
};

export const outcomeColor = {
  struggling: colors.bad,
  mastered: colors.good,
  reinforce: colors.brass,
};

/** Soft accent stripes for course tiles (cycled by index). */
export const stripePalette = ['#0F6B5C', '#1A8F6A', '#C4893A', '#2A6F7A', '#4A6B5C'];

/** Stable per-course color, keyed by id rather than list position, so a course
 *  keeps the same identity color on its tile and on its detail page. */
export function colorForCourse(id) {
  const n = Number(id) || 0;
  return stripePalette[n % stripePalette.length];
}

export const radius = { sm: 10, md: 14, lg: 18, xl: 24, pill: 999 };

export const space = { xs: 6, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 };

export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  body: 'Manrope_400Regular',
  bodyMedium: 'Manrope_500Medium',
  bodySemi: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
};

export const type = {
  brand: { fontFamily: fonts.displayBold, fontSize: 44, lineHeight: 50, letterSpacing: -0.5 },
  h1: { fontFamily: fonts.display, fontSize: 30, lineHeight: 36, letterSpacing: -0.3 },
  h2: { fontFamily: fonts.display, fontSize: 22, lineHeight: 28 },
  h3: { fontFamily: fonts.bodySemi, fontSize: 17, lineHeight: 24 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22 },
  bodyLg: { fontFamily: fonts.body, fontSize: 16, lineHeight: 26 },
  caption: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: fonts.bodySemi, fontSize: 13, lineHeight: 18 },
  score: { fontFamily: fonts.displayBold, fontSize: 56, lineHeight: 62, letterSpacing: -1 },
};

export const shadow = {
  soft: {
    shadowColor: '#14201C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
};
