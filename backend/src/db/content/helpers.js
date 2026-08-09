/** Tiny helpers so course files stay readable. */
export const Q = (text, options, correct_index = 0) => ({ text, options, correct_index });

export function L(title, body, questions) {
  return { title, body, questions };
}

export function topic(name, easy, medium, hard) {
  return { topic: name, lessons: { easy, medium, hard } };
}
