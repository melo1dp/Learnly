import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import { colors, fonts, radius, space } from '../lib/theme';

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * 7-day activity area chart (single series → sequential/accent hue, per the
 * dataviz skill's form guidance for "trend over time, single series").
 * `data` is an array of { date: 'YYYY-MM-DD', count } for the last N days.
 */
export function ActivityAreaChart({ data, height = 120 }) {
  const width = 300; // scaled to container via viewBox, not a hard pixel size
  const padTop = 12;
  const plotHeight = height - padTop;
  const max = Math.max(1, ...data.map((d) => d.count));
  const stepX = width / Math.max(1, data.length - 1);

  const points = data.map((d, i) => ({
    x: i * stepX,
    y: padTop + plotHeight - (d.count / max) * plotHeight,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');
  const areaPath =
    `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

  const today = points[points.length - 1];
  const todayCount = data[data.length - 1].count;

  return (
    <View>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Baseline — one hairline, recessive, one step off the surface. */}
        <Line x1={0} y1={height} x2={width} y2={height} stroke={colors.border} strokeWidth={1} />
        <Path d={areaPath} fill={colors.accent} fillOpacity={0.12} />
        <Path d={linePath} stroke={colors.accent} strokeWidth={2} fill="none" strokeLinejoin="round" strokeLinecap="round" />
        {/* Direct-label only today's point — the one value that matters, not every point. */}
        <Circle cx={today.x} cy={today.y} r={4} fill={colors.accent} />
      </Svg>
      <View style={s.axisRow}>
        {data.map((d) => (
          <Text key={d.date} style={s.axisLabel}>
            {WEEKDAY[new Date(d.date).getDay()]}
          </Text>
        ))}
      </View>
      <Text style={s.todayCallout}>{todayCount} today</Text>
    </View>
  );
}

/**
 * Horizontal bar-per-category chart. Magnitude comparison across a handful of
 * named categories is a bar-chart job (per the dataviz skill's form table) —
 * used here instead of the radar chart originally proposed, since a radar's
 * enclosed area distorts magnitude perception and isn't in the skill's
 * sanctioned form list for "compare magnitude, single series."
 */
export function CategoryMasteryChart({ data }) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  return (
    <View style={s.categoryChart}>
      {sorted.map((d) => (
        <View key={d.category} style={s.categoryRow}>
          <Text style={s.categoryLabel}>{d.category}</Text>
          <View style={s.categoryTrack}>
            <View style={[s.categoryFill, { width: `${Math.round(d.value * 100)}%` }]} />
          </View>
          <Text style={s.categoryValue}>{Math.round(d.value * 100)}%</Text>
        </View>
      ))}
    </View>
  );
}

/**
 * Circular ring meter — "a single ratio against a limit" (per the dataviz
 * skill's form table), used for both the weekly-goal ring and per-course
 * completion rings. `value` is 0-1.
 */
export function RingMeter({ value, size = 96, strokeWidth = 10, label, sublabel }) {
  const radiusPx = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radiusPx;
  const clamped = Math.max(0, Math.min(1, value));
  const dashOffset = circumference * (1 - clamped);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheetAbsolute}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radiusPx}
          stroke={colors.panel2}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radiusPx}
          stroke={colors.accent}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={s.ringCenter}>
        <Text style={s.ringValue}>{label ?? `${Math.round(clamped * 100)}%`}</Text>
        {sublabel ? <Text style={s.ringSublabel}>{sublabel}</Text> : null}
      </View>
    </View>
  );
}

const StyleSheetAbsolute = { position: 'absolute', top: 0, left: 0 };

const s = StyleSheet.create({
  axisRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: space.xs },
  axisLabel: { fontFamily: fonts.mono, fontSize: 10, color: colors.muted },
  todayCallout: {
    fontFamily: fonts.monoMedium,
    fontSize: 12,
    color: colors.accent,
    marginTop: space.xs,
    textAlign: 'right',
  },

  categoryChart: { gap: space.md },
  categoryRow: { gap: space.xs },
  categoryLabel: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.ink },
  categoryTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.panel2,
    overflow: 'hidden',
  },
  categoryFill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.accent },
  categoryValue: { fontFamily: fonts.mono, fontSize: 11, color: colors.muted },

  ringCenter: { position: 'absolute', alignItems: 'center' },
  ringValue: { fontFamily: fonts.bodyBold, fontSize: 18, color: colors.ink },
  ringSublabel: { fontFamily: fonts.bodyMedium, fontSize: 10, color: colors.muted },
});
