// The original demo course, expanded: three topics, easy/medium/hard each.
export default {
  title: 'Intro to Programming',
  description: 'Learn the fundamentals of programming, from variables to functions.',
  topics: [
    {
      topic: 'variables',
      lessons: {
        easy: {
          title: 'What is a Variable?',
          body: `A variable is a named box that holds a value. You put something in
the box, give the box a name, and use that name whenever you need the
value again — instead of repeating the value everywhere.

    let score = 10
    score = score + 5
    // score is now 15

The name is yours to choose, but it has to start with a letter (or an
underscore) and it cannot be a word the language has reserved for
itself. "my_age" is fine; "123x" is not, and neither is "let" — the
language already uses that one.

A common beginner mix-up: the name is not the value. Two variables can
hold the same value without being the same box, and changing one does
not change the other.

Key takeaway: a variable gives a value a name so you can reuse and
change it later.`,
          questions: [
            {
              text: 'What does a variable do?',
              options: ['Stores a value under a name', 'Deletes a file', 'Prints to paper', 'Connects to the internet'],
              correct_index: 0,
            },
            {
              text: 'Which of these is a valid variable name?',
              options: ['123x', 'my_age', 'let', 'my age'],
              correct_index: 1,
            },
            {
              text: 'After `let score = 10` then `score = score + 5`, what is score?',
              options: ['10', '5', '15', '105'],
              correct_index: 2,
            },
            {
              text: 'Why use a variable instead of writing the value out each time?',
              options: [
                'It makes the program run on more computers',
                'So the value can be reused and changed in one place',
                'It encrypts the value',
                'It is required by every language',
              ],
              correct_index: 1,
            },
          ],
        },
        medium: {
          title: 'Types and Reassignment',
          body: `Every value has a type, and the type decides what you can do with the
value. Three you will meet immediately: numbers, strings (text), and
booleans (true or false).

    let count = 3          // number
    let name = "Ada"       // string
    let isReady = true     // boolean

The type belongs to the value, not to the name. That is why the same
variable can hold a number now and a string later — reassignment just
points the name at a different value.

The classic gotcha is mixing types by accident. Adding a number to a
string does not do arithmetic; in many languages it glues them
together, so 1 + "1" gives "11", not 2. If a total comes out looking
like a phone number, you have probably concatenated instead of added.

Key takeaway: values carry types, names do not — and mixing types
silently changes what an operator means.`,
          questions: [
            {
              text: 'What type is the value "hello"?',
              options: ['number', 'string', 'boolean', 'variable'],
              correct_index: 1,
            },
            {
              text: 'What type is the value true?',
              options: ['boolean', 'string', 'number', 'text'],
              correct_index: 0,
            },
            {
              text: 'In many languages, what does 1 + "1" produce?',
              options: ['2', 'The string "11"', 'An error every time', 'true'],
              correct_index: 1,
            },
            {
              text: 'Reassigning a variable to a value of a different type...',
              options: [
                'is allowed — the type belongs to the value, not the name',
                'is impossible in any language',
                'permanently locks the variable',
                'renames the variable',
              ],
              correct_index: 0,
            },
            {
              text: 'Which value is a boolean?',
              options: ['"false"', '0', 'false', '[]'],
              correct_index: 2,
            },
          ],
        },
        hard: {
          title: 'Scope, Shadowing and Mutation',
          body: `Scope decides where a name is visible. A variable declared inside a
block — between curly braces — exists only in that block. Ask for it
outside and the name is simply not there.

    let x = "outer"
    {
      let x = "inner"
      // in here, x is "inner"
    }
    // out here, x is "outer" again

That inner x shadows the outer one: same name, different box. Shadowing
is legal, and it is a frequent source of "why didn't my change stick?"

Const is the other half of the story, and it is narrower than people
expect. Const prevents reassignment — you cannot point the name at a
new value — but it does not freeze the value itself. A const array can
still have items pushed into it, because the box still points at the
same array; only its contents changed.

Key takeaway: scope controls where a name lives, const controls whether
the name can be re-pointed — not whether the value can be mutated.`,
          questions: [
            {
              text: 'Which keyword prevents reassignment?',
              options: ['let', 'var', 'const', 'def'],
              correct_index: 2,
            },
            {
              text: 'Block scope is created by which characters?',
              options: ['{ }', '( )', '[ ]', '< >'],
              correct_index: 0,
            },
            {
              text: 'Can you push a new item into an array declared with const?',
              options: [
                'Yes — const blocks reassignment, not mutation',
                'No — const freezes the array contents',
                'Only if the array is empty',
                'Only inside a function',
              ],
              correct_index: 0,
            },
            {
              text: 'Declaring an inner variable with the same name as an outer one is called...',
              options: ['shadowing', 'hoisting', 'currying', 'casting'],
              correct_index: 0,
            },
            {
              text: 'Accessing a block-scoped variable from outside its block...',
              options: [
                'returns null silently',
                'fails — the name is not visible there',
                'returns the last value it held',
                'creates it automatically',
              ],
              correct_index: 1,
            },
          ],
        },
      },
    },

    {
      topic: 'loops',
      lessons: {
        easy: {
          title: 'Why Loops Exist',
          body: `A loop repeats work so you do not have to write it out by hand. If you
need to greet five people, you do not write five greetings — you write
one, and loop over the five names.

    for (let i = 0; i < 3; i++) {
      print("hello")
    }
    // prints hello three times

Every loop has a condition, and the loop keeps going only while that
condition holds. When the condition turns false, the loop stops and the
program carries on with whatever comes next.

The failure mode to know from day one is the infinite loop: if nothing
inside the loop ever makes the condition false, the loop never ends and
the program hangs. Something in the condition has to change each pass.

Key takeaway: a loop repeats a block while its condition is true — so
the condition must eventually become false.`,
          questions: [
            {
              text: 'What does a loop do?',
              options: ['Repeats a block of work', 'Stores a value', 'Styles a page', 'Deletes a file'],
              correct_index: 0,
            },
            {
              text: 'A loop keeps running until its...',
              options: ['condition is false', 'file is saved', 'page reloads', 'variable is deleted'],
              correct_index: 0,
            },
            {
              text: 'What causes an infinite loop?',
              options: [
                'A condition that never becomes false',
                'A missing comment',
                'Too many variables',
                'A misspelled variable name',
              ],
              correct_index: 0,
            },
            {
              text: 'How many times does `for (let i = 0; i < 3; i++)` run its body?',
              options: ['2', '3', '4', 'forever'],
              correct_index: 1,
            },
          ],
        },
        medium: {
          title: 'For Loops and While Loops',
          body: `Both loops repeat, but they suit different situations. Reach for a for
loop when you know the number of passes up front — iterating a list of
ten items, counting to a hundred. Reach for a while loop when you do
not: keep reading input until the user types "quit".

    // known count
    for (let i = 0; i < items.length; i++) { ... }

    // unknown count
    while (!done) { ... }

A while loop checks its condition before every pass, including the very
first. So if the condition is already false when you arrive, the body
never runs at all — not even once. (A do-while, where it exists, is the
variant that always runs the body once before checking.)

The gotcha with while loops is forgetting to advance. A for loop has
its increment built into the header, where it is hard to miss; a while
loop relies on you changing something in the body. Leave that out and
you have written an infinite loop.

Key takeaway: for when the count is known, while when it is not — and a
while loop can run zero times.`,
          questions: [
            {
              text: 'Which loop best suits a known number of passes?',
              options: ['for', 'while', 'neither — they are identical', 'do-while'],
              correct_index: 0,
            },
            {
              text: 'A while loop checks its condition...',
              options: ['before each pass', 'after each pass', 'only once, at the start', 'never'],
              correct_index: 0,
            },
            {
              text: 'If a while loop condition is false on arrival, how many times does the body run?',
              options: ['0', '1', 'Exactly once, then it exits', 'It errors'],
              correct_index: 0,
            },
            {
              text: 'Why are while loops more prone to running forever than for loops?',
              options: [
                'The step that advances the condition is easy to forget in the body',
                'While loops ignore their condition',
                'For loops cannot loop forever',
                'While loops run twice per pass',
              ],
              correct_index: 0,
            },
            {
              text: 'Which construct guarantees the body runs at least once?',
              options: ['while', 'for', 'do-while', 'if'],
              correct_index: 2,
            },
          ],
        },
        hard: {
          title: 'Nested Loops and Cost',
          body: `Put a loop inside a loop and the work multiplies rather than adds. The
outer loop runs n times, and for each of those passes the inner loop
runs its full n — so the body executes n times n.

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // runs n * n times
      }
    }

That distinction matters more than it looks. Two loops one after the
other cost n + n, which is just 2n — still fine as n grows. Two loops
nested cost n squared: at n = 1,000 that is a million passes, and at
n = 10,000 it is a hundred million. Same code, a hundred times the wait.

The trap is nesting a loop you did not write. Calling a function that
itself loops, from inside a loop, is a nested loop — the cost is the
same even though the source only shows one.

Key takeaway: sequential loops add, nested loops multiply — and hidden
loops inside called functions count.`,
          questions: [
            {
              text: 'Two loops nested over n items do how much work?',
              options: ['n', 'n * n', '2n', 'n + 1'],
              correct_index: 1,
            },
            {
              text: 'Two loops one after the other (not nested) over n items cost roughly...',
              options: ['n * n', '2n', 'n squared', 'n cubed'],
              correct_index: 1,
            },
            {
              text: 'Calling a function that loops, from inside a loop, is...',
              options: [
                'effectively a nested loop, with the same multiplied cost',
                'always free',
                'cheaper than writing the loop inline',
                'impossible',
              ],
              correct_index: 0,
            },
            {
              text: 'Going from n = 1,000 to n = 10,000 in a doubly-nested loop multiplies the work by about...',
              options: ['10', '20', '100', '2'],
              correct_index: 2,
            },
            {
              text: 'What reliably stops a loop from running forever?',
              options: [
                'A condition that changes and eventually becomes false',
                'A comment above it',
                'A semicolon after it',
                'Declaring the counter as const',
              ],
              correct_index: 0,
            },
          ],
        },
      },
    },

    {
      topic: 'functions',
      lessons: {
        easy: {
          title: 'Your First Function',
          body: `A function is a named piece of work you can run whenever you like.
You define it once, then call it as many times as you need — the same
reuse idea as a variable, but for behaviour instead of a value.

    function greet(name) {
      return "Hello, " + name
    }

    greet("Ada")   // "Hello, Ada"
    greet("Alan")  // "Hello, Alan"

The thing in the parentheses is a parameter: a placeholder for a value
the caller supplies. The value actually passed in — "Ada" — is the
argument. Return sends a value back to whoever called the function.

The mistake almost everyone makes once is confusing defining with
calling. Writing the function body does not run it. Only the call does,
and a call needs the parentheses: greet is the function itself, while
greet("Ada") is you asking it to run.

Key takeaway: define a function once, call it many times — and nothing
happens until you call it.`,
          questions: [
            {
              text: 'What does a function let you do?',
              options: [
                'Name a piece of work and reuse it',
                'Store exactly one number',
                'Style a web page',
                'Create a database',
              ],
              correct_index: 0,
            },
            {
              text: 'In `greet("Ada")`, what is "Ada"?',
              options: ['A parameter', 'An argument', 'A return value', 'A variable name'],
              correct_index: 1,
            },
            {
              text: 'What does `return` do?',
              options: [
                'Sends a value back to the caller',
                'Prints to the screen',
                'Restarts the program',
                'Deletes the function',
              ],
              correct_index: 0,
            },
            {
              text: 'Does defining a function also run it?',
              options: [
                'No — it only runs when it is called',
                'Yes, once, immediately',
                'Yes, every time the file is read',
                'Only if it has no parameters',
              ],
              correct_index: 0,
            },
          ],
        },
        medium: {
          title: 'Arguments, Returns and Side Effects',
          body: `A function that takes its inputs as arguments and hands its result back
with return is easy to reason about: same inputs, same output, nothing
else disturbed. That is a pure function.

    function add(a, b) {
      return a + b       // pure: just computes
    }

    let total = 0
    function addToTotal(n) {
      total = total + n  // side effect: changes outside state
    }

Anything a function does beyond returning a value — writing to a global,
printing, saving a file — is a side effect. Side effects are not evil;
a program with none of them cannot do anything useful. But they make a
function harder to test and to reuse, so keep them deliberate.

The gotcha: a function with no return statement still returns something
— usually an empty value like undefined or None. If a caller is getting
undefined out of your function, check that you actually returned.

Key takeaway: prefer returning a value over quietly changing state, and
remember that a missing return is still a return.`,
          questions: [
            {
              text: 'A "pure" function is one that...',
              options: [
                'returns a value based only on its arguments, with no side effects',
                'contains no loops',
                'has exactly one parameter',
                'never returns anything',
              ],
              correct_index: 0,
            },
            {
              text: 'Which of these is a side effect?',
              options: [
                'Returning the sum of two arguments',
                'Modifying a global variable',
                'Declaring a local variable',
                'Naming a parameter',
              ],
              correct_index: 1,
            },
            {
              text: 'What does a function with no return statement give back?',
              options: [
                'An empty value such as undefined or None',
                'The last variable it declared',
                'Zero',
                'Nothing at all — the call errors',
              ],
              correct_index: 0,
            },
            {
              text: 'Why are pure functions easier to test?',
              options: [
                'Same inputs always give the same output, with no hidden state to set up',
                'They run faster',
                'They cannot contain bugs',
                'They do not need to be called',
              ],
              correct_index: 0,
            },
            {
              text: 'A caller keeps receiving undefined from your function. Most likely cause?',
              options: [
                'You forgot the return statement',
                'The function has too many parameters',
                'The function is defined twice',
                'You used const inside it',
              ],
              correct_index: 0,
            },
          ],
        },
        hard: {
          title: 'Recursion and the Call Stack',
          body: `A recursive function calls itself on a smaller version of the problem.
It needs two parts: a base case that stops the recursion, and a
recursive case that moves toward it.

    function factorial(n) {
      if (n <= 1) return 1        // base case
      return n * factorial(n - 1) // recursive case
    }

Each call gets its own frame on the call stack, holding its own copy of
the parameters. factorial(4) calls factorial(3), which calls
factorial(2) — four frames stacked up — and they only start returning
once the base case is hit and the stack unwinds.

That stack is finite. Omit the base case, or write a recursive case
that never approaches it, and you get a stack overflow: the same
runaway as an infinite loop, but it crashes rather than hangs. Deep
recursion can overflow even when the logic is correct — recursing
100,000 deep will exhaust the stack in most languages regardless.

Key takeaway: every recursion needs a base case it actually reaches,
and each pending call costs a stack frame.`,
          questions: [
            {
              text: 'What are the two required parts of a recursive function?',
              options: [
                'A base case and a recursive case',
                'A loop and a return',
                'Two parameters',
                'A global variable and a return',
              ],
              correct_index: 0,
            },
            {
              text: 'What happens if the base case is never reached?',
              options: [
                'A stack overflow — the call stack is exhausted',
                'The function returns 0',
                'The function silently stops',
                'It becomes an infinite loop that never crashes',
              ],
              correct_index: 0,
            },
            {
              text: 'What does factorial(4) evaluate to, given the lesson\'s definition?',
              options: ['4', '10', '24', '16'],
              correct_index: 2,
            },
            {
              text: 'Each pending recursive call occupies...',
              options: [
                'a frame on the call stack, with its own parameters',
                'the same single frame, reused',
                'a slot in the heap only',
                'no memory at all',
              ],
              correct_index: 0,
            },
            {
              text: 'Correct recursion 100,000 levels deep will typically...',
              options: [
                'still overflow the stack in most languages',
                'always run fine, because the logic is correct',
                'run faster than a loop',
                'be rewritten into a loop by every compiler',
              ],
              correct_index: 0,
            },
          ],
        },
      },
    },
  ],
};
