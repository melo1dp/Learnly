// Deep Slate & Amber — dark academic tokens for Learnly.
// Status colors (good/bad/brass) were re-validated with the dataviz skill's
// palette validator against this surface; the red/green pairing is the one
// pairing left in the 6-8 CVD floor band, acceptable only because every
// status color in this app is always paired with a text label, never shown
// as color alone (Pill labels, mastery-bar topic names).

export const colors = {
  bg: '#0d0f14',
  bgWash: '#171a22',
  panel: '#161a22',
  panel2: '#1e2330',
  ink: '#EDEAE3',
  text: '#EDEAE3',
  muted: '#9C968A',
  accent: '#e8a84c',
  accentSoft: 'rgba(232,168,76,0.14)',
  brass: '#6D82C9',
  brassSoft: 'rgba(109,130,201,0.14)',
  good: '#3BA36E',
  warn: '#6D82C9',
  bad: '#E2685C',
  border: 'rgba(255,255,255,0.08)',
  white: '#FFFFFF',
  // Code blocks sit a shade below the page so they read as inset. Tokens rather
  // than the literals they used to be inlined as in lessons/[id].jsx.
  codeBg: '#080a0e',
  codeInk: '#D8F3E4',
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

/** Course-identity stripes (cycled by id, not by category — decorative
 *  accent, always paired with the course title/icon, never color-alone). */
export const stripePalette = ['#C97F30', '#1A8FC2', '#B0559E', '#7FA23E', '#8B74C9'];

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
  body: 'PlusJakartaSans_400Regular',
  bodyMedium: 'PlusJakartaSans_500Medium',
  bodySemi: 'PlusJakartaSans_600SemiBold',
  bodyBold: 'PlusJakartaSans_700Bold',
  mono: 'DMMono_400Regular',
  monoMedium: 'DMMono_500Medium',
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
  mono: { fontFamily: fonts.mono, fontSize: 13, lineHeight: 18 },
};

export const shadow = {
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 4,
  },
};
