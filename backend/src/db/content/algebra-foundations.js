import { Q, L, topic } from './helpers.js';

export default {
  title: 'Algebra Foundations',
  description:
    'Build fluency with linear equations, function notation and graphs, and quadratic equations that produce parabolas.',
  category: 'Math',
  level: 'beginner',
  rating: 4.4,
  topics: [
    topic(
      'linear_equations',
      L(
        'Solving One-Step and Two-Step Equations',
        `A linear equation in one variable is an equality that can be written in the form ax + b = c, where a, b, and c are constants and a is not zero. Solving means finding the value of the variable that makes the equation true. The guiding idea is balance: whatever you do to one side, do to the other so equality is preserved.

One-step equations need a single inverse operation. If x + 5 = 12, subtract 5 from both sides to get x = 7. If 3x = 15, divide both sides by 3 to get x = 5. Two-step equations combine these moves. For 2x + 3 = 11, subtract 3 first, then divide by 2, yielding x = 4. Undoing addition/subtraction before undoing multiplication/division matches how the expression was built.

Always check by substitution. Replace the variable with your answer and verify both sides match. A common error is dividing only one term on a side, or flipping signs incorrectly when subtracting a negative. Keep the equation balanced at every step and write the operations clearly.

Key takeaway: use inverse operations on both sides to isolate the variable, then check your solution.`,
        [
          Q('What is the solution of x + 5 = 12?', ['x = 17', 'x = 7', 'x = 5', 'x = -7'], 1),
          Q('What is the solution of 3x = 15?', ['x = 45', 'x = 5', 'x = 12', 'x = 3'], 1),
          Q('To solve 2x + 3 = 11, a correct first step is:', ['Divide both sides by 2 immediately only', 'Subtract 3 from both sides', 'Add 2 to both sides', 'Multiply both sides by 3'], 1),
          Q('Why check a solution by substitution?', ['It changes the equation randomly', 'It verifies that the value makes both sides equal', 'It is required to graph first', 'It eliminates the need for inverse operations'], 1),
          Q('Which move preserves equality?', ['Adding 4 to only the left side', 'Doing the same operation to both sides', 'Dividing only one term on the right by 2 when the whole side should be divided', 'Erasing a constant on one side'], 1),
        ],
      ),
      L(
        'Variables on Both Sides and Clearing Fractions',
        `When the variable appears on both sides, collect like terms so that variable terms are on one side and constants on the other. For 5x - 2 = 3x + 10, subtract 3x from both sides to get 2x - 2 = 10, then add 2 and divide by 2 to find x = 6. If coefficients become negative, you can multiply both sides by -1 to tidy the equation, remembering to reverse each term.

Equations with fractions are often easier after multiplying through by a common denominator. For (1/2)x + 1/3 = 5/6, multiply every term by 6 to clear denominators: 3x + 2 = 5, so 3x = 3 and x = 1. Distribute carefully when parentheses are present: a(b + c) = ab + ac. Mistakes usually come from multiplying only some terms by the clearing factor.

Some equations are identities (true for all x) or contradictions (true for no x). After simplifying, 0 = 0 signals infinitely many solutions; 0 = 5 signals no solution. Recognizing these cases matters as much as finding a single number answer.

Key takeaway: gather variable terms, clear denominators carefully, and watch for no-solution or all-real-solution cases.`,
        [
          Q('Solve 5x - 2 = 3x + 10.', ['x = 2', 'x = 6', 'x = 4', 'x = 12'], 1),
          Q('A good reason to multiply an equation by a common denominator is to:', ['Change the solution set arbitrarily', 'Clear fractions so integers are easier to work with', 'Make both sides unequal', 'Turn it into a quadratic always'], 1),
          Q('After simplifying an equation you obtain 0 = 5. What does that mean?', ['Every real number is a solution', 'There is no solution', 'x = 0 only', 'x = 5 only'], 1),
          Q('After simplifying you obtain 0 = 0. What does that mean?', ['No solution', 'Infinitely many solutions (an identity)', 'x = 0 only', 'The equation was invalid'], 1),
          Q('When distributing a(b + c), you must:', ['Multiply a by b only', 'Multiply a by both b and c', 'Add a to b and c', 'Divide b and c by a'], 1),
          Q('Solve (1/2)x + 1/3 = 5/6.', ['x = 0', 'x = 1', 'x = 2', 'x = 1/2'], 1),
        ],
      ),
      L(
        'Literal Equations, Rates, and Modelling',
        `A literal equation solves for one variable in terms of others. The formula d = rt solved for t is t = d/r (r not zero). Solving A = (1/2)bh for h gives h = 2A/b. Treat the target variable like the unknown in an ordinary equation and apply inverse operations, leaving other symbols as they are. Science and finance formulas are literal equations in disguise.

Word problems translate English into algebra. Identify what is asked, assign a variable, write relationships (sums, rates, consecutive integers, perimeter, mixtures), solve, and interpret units. A rate problem such as "one pipe fills 1/3 tank per hour and another 1/4" leads to a combined rate of 1/3 + 1/4 = 7/12 tank per hour. Proportions a/b = c/d can be solved by cross-multiplying when b and d are nonzero.

Harder linear models may include constraints or piecewise situations (parking fees, taxi rates) that still reduce to linear equations on each piece. Always ask whether the algebraic answer is feasible: negative time or a percentage over 100 may signal a modelling or arithmetic error.

Key takeaway: rearrange formulas deliberately, and translate word situations into equations you can solve and check for sense.`,
        [
          Q('Solving d = rt for t (r ≠ 0) gives:', ['t = rd', 't = d/r', 't = r/d', 't = d - r'], 1),
          Q('Solving A = (1/2)bh for h (b ≠ 0) gives:', ['h = A/(2b)', 'h = 2A/b', 'h = 2Ab', 'h = A - (1/2)b'], 1),
          Q('If two rates are 1/3 and 1/4 tank per hour, the combined rate is:', ['1/7', '7/12', '12/7', '1/12'], 1),
          Q('Cross-multiplying correctly applies to proportions of the form a/b = c/d when:', ['b or d is zero', 'b and d are nonzero', 'a equals zero only', 'The equation is quadratic'], 1),
          Q('A negative value for time in a travel-rate solution usually suggests:', ['A perfect answer', 'A modelling or calculation error to investigate', 'That speed was infinite', 'That distance was a variable'], 1),
          Q('When solving a literal equation for a target variable, other letters are treated as:', ['Always equal to 1', 'Known symbols to rearrange around the target', 'Impossible to leave in the answer', 'Identical to the target'], 1),
        ],
      ),
    ),
    topic(
      'functions',
      L(
        'Function Ideas and Notation',
        `A function assigns to each allowable input exactly one output. The set of allowed inputs is the domain; the set of possible outputs is the range (or sometimes we discuss the image of a specific domain set). Vertical-line test intuition: a graph represents a function of x if no vertical line meets it more than once.

Notation f(x) means the output of function f at input x. If f(x) = 2x + 1, then f(3) = 7 and f(0) = 1. Evaluate by substituting carefully, especially with negatives: f(-2) = 2(-2) + 1 = -3. Different letters can name functions (g, h), but the rule is what matters. Tables and mapping diagrams can define functions when each input appears once.

Not every relationship is a function. A circle equation x^2 + y^2 = 1 fails the vertical-line test as a graph of y versus x, though you can define functions for the upper and lower semicircles separately. Being precise about domain restrictions (for example, excluding zero in denominators) is part of defining a function well.

Key takeaway: a function gives one output per input; f(x) notation names that output.`,
        [
          Q('In a function, each allowable input has how many outputs?', ['Zero', 'Exactly one', 'Always two', 'Infinitely many only'], 1),
          Q('If f(x) = 2x + 1, what is f(3)?', ['5', '7', '6', '3'], 1),
          Q('The domain of a function is:', ['The set of allowed inputs', 'Always all integers only', 'The y-intercept', 'The slope'], 0),
          Q('Which graph fails the vertical-line test for y as a function of x?', ['A non-vertical straight line', 'A circle x^2 + y^2 = 1', 'y = x^2', 'y = 2x - 4'], 1),
          Q('If f(x) = 2x + 1, what is f(-2)?', ['-5', '-3', '3', '5'], 1),
        ],
      ),
      L(
        'Linear Functions, Slope, and Graphs',
        `A linear function can be written f(x) = mx + b, where m is the slope and b is the y-intercept (value when x = 0). Slope measures steepness: m = (y2 - y1)/(x2 - x1) between two points on the line, with x1 ≠ x2. Positive slope rises left to right; negative slope falls; zero slope is horizontal. Vertical lines have undefined slope and are not functions of x.

Graphing from slope-intercept form starts at (0, b), then uses rise over run from the slope. Point-slope form y - y1 = m(x - x1) is handy when you know a point and the slope. Parallel lines share the same slope; perpendicular lines in the plane have slopes that are negative reciprocals (when both are defined).

Interpreting slope in context matters: if f(t) is distance in kilometres after t hours, slope is speed in km/h. Average rate of change on an interval [a, b] for any function is (f(b) - f(a))/(b - a), which for linear functions equals m everywhere.

Key takeaway: m and b control tilt and intercept; slope is a rate of change.`,
        [
          Q('In f(x) = mx + b, the constant b represents:', ['The slope', 'The y-intercept', 'Always the x-intercept', 'The domain'], 1),
          Q('Slope between (1, 2) and (3, 8) is:', ['3', '6', '2', '4'], 0),
          Q('A horizontal line has slope:', ['Undefined', 'Zero', 'One', 'Negative one always'], 1),
          Q('Two non-vertical parallel lines have:', ['Negative reciprocal slopes', 'Equal slopes', 'Slopes multiplying to 1 always', 'Undefined slopes'], 1),
          Q('For perpendicular lines with defined slopes m1 and m2:', ['m1 = m2', 'm1 · m2 = -1', 'm1 · m2 = 1', 'm1 = 0 and m2 = 0'], 1),
          Q('Average rate of change of f from a to b is:', ['f(b) + f(a)', '(f(b) - f(a))/(b - a)', 'f(b) · f(a)', 'b - a only'], 1),
        ],
      ),
      L(
        'Domain Issues, Composition, and Piecewise Ideas',
        `Beyond linear formulas, you must respect domain restrictions. For f(x) = 1/(x - 2), x = 2 is excluded. For square-root functions in real numbers, the radicand must be nonnegative. When combining functions, the domain of the combination is limited by every piece involved.

Function composition (f ∘ g)(x) = f(g(x)) feeds the output of g into f. Order matters: f(g(x)) is generally not g(f(x)). To evaluate, find g(x) first, then apply f. To find a formula, substitute the expression for g into f carefully with parentheses. Inverse functions reverse each other's effects: if f maps a to b, f^{-1} maps b to a, when an inverse exists (the function must be one-to-one).

Piecewise functions use different formulas on different parts of the domain, common for fees and absolute-value related graphs. Absolute value f(x) = |x| can be written piecewise as x when x ≥ 0 and -x when x < 0. Reading such definitions means checking which piece an input belongs to before computing.

Key takeaway: watch domains, compose in the correct order, and evaluate piecewise rules by cases.`,
        [
          Q('For f(x) = 1/(x - 2), which input is excluded from the domain?', ['0', '2', '1', '-2'], 1),
          Q('(f ∘ g)(x) means:', ['f(x) · g(x)', 'f(g(x))', 'g(f(x)) always written that way', 'f(x) + g(x)'], 1),
          Q('In general, f(g(x)) compared with g(f(x)) is:', ['Always identical', 'Often different; order matters', 'Never defined', 'Always zero'], 1),
          Q('A function has an inverse function on a domain when it is:', ['Any horizontal line', 'One-to-one (passes the horizontal-line test)', 'A circle', 'A vertical line'], 1),
          Q('To evaluate a piecewise function at x = 3, you must:', ['Average all pieces', 'Use the formula for the piece whose condition includes 3', 'Always use the first formula listed', 'Ignore the domain conditions'], 1),
          Q('For real-valued √(x - 1), the domain requires:', ['x - 1 ≤ 0', 'x - 1 ≥ 0', 'x = 0 only', 'x ≤ -1'], 1),
        ],
      ),
    ),
    topic(
      'quadratics',
      L(
        'Quadratic Expressions and Factoring Basics',
        `A quadratic expression in one variable has the form ax^2 + bx + c with a ≠ 0. Expanding (x + 3)(x + 2) = x^2 + 5x + 6 shows how factors become a trinomial. Factoring reverses that: find two numbers that multiply to the constant term (when a = 1) and add to the middle coefficient.

For x^2 + 5x + 6, the numbers 2 and 3 work, so (x + 2)(x + 3). For differences of squares, a^2 - b^2 = (a - b)(a + b); thus x^2 - 9 = (x - 3)(x + 3). A greatest common factor should be pulled out first: 2x^2 + 4x = 2x(x + 2). Factoring prepares you to solve equations by the zero-product property.

The zero-product property says that if AB = 0, then A = 0 or B = 0 (or both). So (x - 1)(x + 4) = 0 yields x = 1 or x = -4. Always expand briefly or substitute to confirm factored forms. Not every quadratic factors nicely over the integers; other methods come next when factoring stalls.

Key takeaway: factoring and the zero-product property turn many quadratic equations into simple linear ones.`,
        [
          Q('In ax^2 + bx + c, what must be true for it to be quadratic?', ['a = 0', 'a ≠ 0', 'b = 0', 'c = 0'], 1),
          Q('Factor x^2 + 5x + 6.', ['(x + 1)(x + 6)', '(x + 2)(x + 3)', '(x - 2)(x - 3)', '(x + 5)(x + 1)'], 1),
          Q('x^2 - 9 factors as:', ['(x - 9)(x + 1)', '(x - 3)(x + 3)', '(x - 3)^2', '(x + 9)(x - 1)'], 1),
          Q('If (x - 1)(x + 4) = 0, then:', ['x = 1 or x = -4', 'x = -1 or x = 4', 'x = 1 only', 'x = 0'], 0),
          Q('The zero-product property applies when a product equals:', ['1', '0', '-1', 'The leading coefficient'], 1),
        ],
      ),
      L(
        'Solving by Roots, Completing the Square, and Formula',
        `Some equations are ready for square roots: x^2 = 49 implies x = 7 or x = -7, written x = ±7. More generally, if (x - h)^2 = k with k > 0, then x - h = ±√k. Completing the square rewrites ax^2 + bx + c as a perfect square plus a constant, enabling this approach. For x^2 + 6x = 7, add 9 to both sides: (x + 3)^2 = 16, so x + 3 = ±4, giving x = 1 or x = -7.

The quadratic formula solves ax^2 + bx + c = 0: x = (-b ± √(b^2 - 4ac))/(2a). The discriminant D = b^2 - 4ac tells the nature of roots over the reals: D > 0 two distinct real roots, D = 0 one real root (repeated), D < 0 no real roots (two complex roots). Substitute carefully and simplify radicals when possible.

Choosing a method is strategic: try factoring when numbers are friendly; use square roots for pure squares; use the formula as a reliable general tool. Always return to standard form ax^2 + bx + c = 0 before applying the formula.

Key takeaway: square roots, completing the square, and the quadratic formula solve what factoring cannot.`,
        [
          Q('Solutions of x^2 = 49 are:', ['x = 49', 'x = ±7', 'x = 7 only', 'x = ±49'], 1),
          Q('The discriminant of ax^2 + bx + c is:', ['b^2 - 4ac', 'b^2 + 4ac', '2a', '-b/2a'], 0),
          Q('If the discriminant is negative, over the reals the quadratic has:', ['Two distinct real roots', 'One real root', 'No real roots', 'Infinitely many real roots'], 2),
          Q('The quadratic formula for ax^2 + bx + c = 0 is x =', ['(-b ± √(b^2 - 4ac))/(2a)', '(b ± √(b^2 - 4ac))/(2a)', '(-b ± √(b^2 + 4ac))/(2a)', '(-b ± √(b^2 - 4ac))/a'], 0),
          Q('Completing the square for x^2 + 6x starts by adding which square?', ['3', '6', '9', '36'], 2),
          Q('Before using the quadratic formula, rewrite the equation into:', ['y = mx + b', 'ax^2 + bx + c = 0', 'Only factored form', 'Slope-intercept form'], 1),
        ],
      ),
      L(
        'Parabolas: Vertex, Axis, and Applications',
        `The graph of y = ax^2 + bx + c is a parabola. If a > 0 it opens upward; if a < 0 it opens downward. The axis of symmetry is the vertical line x = -b/(2a). The vertex lies on that axis; its x-coordinate is -b/(2a), and y is found by substituting into the function. The vertex is a minimum when the parabola opens up and a maximum when it opens down.

Vertex form y = a(x - h)^2 + k makes the vertex (h, k) obvious and shows a vertical stretch/reflection by |a|. Converting between standard and vertex forms uses completing the square. Intercepts help sketching: the y-intercept is c; x-intercepts (roots) come from solving y = 0 when they exist.

Applications include projectile height, profit functions, and area models with a fixed perimeter. Interpret the vertex as an optimum (maximum height, maximum area). Domain restrictions may apply in context (time t ≥ 0). Connecting algebra to the graph—roots as intercepts, discriminant as number of x-intercepts—cements quadratic fluency.

Key takeaway: a controls opening direction, the vertex marks the optimum, and form choice reveals symmetry quickly.`,
        [
          Q('If a > 0 in y = ax^2 + bx + c, the parabola:', ['Opens downward', 'Opens upward', 'Is a horizontal line', 'Has no vertex'], 1),
          Q('The axis of symmetry for y = ax^2 + bx + c is:', ['y = -b/(2a)', 'x = -b/(2a)', 'x = b/(2a)', 'y = c'], 1),
          Q('In vertex form y = a(x - h)^2 + k, the vertex is:', ['(a, k)', '(h, k)', '(-h, k)', '(h, -k)'], 1),
          Q('When a parabola opens downward, the vertex is a:', ['Minimum point', 'Maximum point', 'Point with no y-value', 'Horizontal asymptote'], 1),
          Q('The y-intercept of y = ax^2 + bx + c is typically:', ['a', 'b', 'c', '-b/(2a)'], 2),
          Q('A discriminant greater than zero means the parabola has how many x-intercepts?', ['None', 'Exactly one', 'Two', 'Infinitely many'], 2),
        ],
      ),
    ),
  ],
};
