// The original demo course, expanded: three topics, easy/medium/hard each.
export default {
  title: 'Intro to Programming',
  description: 'Learn the fundamentals of programming, from variables to functions.',
  category: 'Computing',
  level: 'beginner',
  rating: 4.6,
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

Let's walk through that example line by line, because "the box
updates" is easy to say and easy to misread. The first line creates a
box named score and puts the number 10 inside it — nothing has
"happened" yet beyond that setup. The second line is where the work
occurs: the computer first evaluates the right-hand side, score + 5,
using the current value of score (10), which gives 15. Only after that
arithmetic finishes does the computer store the result back into the
box named score, overwriting the 10 that used to be there. By the time
you read score again, it holds 15 — the 10 is gone, not remembered
anywhere else.

A second example makes the same idea concrete in a different shape —
swapping the contents of two boxes:

    let a = "coffee"
    let b = "tea"
    let temp = a
    a = b
    b = temp
    // a is now "tea", b is now "coffee"

Notice the temp variable: it exists purely to hold a's original value
for a moment, because the instant you write a = b, a's old value is
gone for good. Skip that step and try a = b followed by b = a, and you
end up with both boxes holding "tea" — the swap fails because you
overwrote a before you had a chance to read its old contents into b.

A common beginner mix-up: the name is not the value. Two variables can
hold the same value without being the same box, and changing one does
not change the other. Write let x = 5 and let y = x, then later change
x — y still holds the 5 it copied when the assignment ran, because the
boxes are independent from that point on.

A second mistake is reading a variable before it has ever been given a
value, or before its declaration line has actually run. Instead of the
value you expected, you get an error or an unhelpful placeholder like
undefined, and it almost always means you misjudged the order the
program executes in — top to bottom, one line at a time.

A third mistake shows up once numbers get typed as text: expecting
score + 5 to add when score secretly holds "10" as a string rather
than the number 10. The result glues the characters together instead
of doing arithmetic — a preview of a mix-up you will meet properly once
types are covered directly.

Why this matters: almost every real program is built from small,
named pieces of state — a shopping cart total, a user's login status,
a game's remaining lives — and all of it rests on this one idea. Once
you are comfortable that a variable is just a named, reusable,
changeable slot, reading someone else's code becomes a matter of
tracking what sits in each box at each moment, a skill that scales all
the way up to large, unfamiliar programs.

Key takeaway: a variable gives a value a name so you can reuse and
change it later.`,
          questions: [
            {
              text: 'What does a variable do?',
              options: ['Stores a value under a name', 'Deletes a file', 'Prints to paper', 'Connects to the internet'],
              correct_index: 0,
              explanation: 'A variable\'s job is to hold a value under a chosen name so you can refer to it later. The other options describe unrelated operations a variable does not perform.',
            },
            {
              text: 'Which of these is a valid variable name?',
              options: ['123x', 'my_age', 'let', 'my age'],
              correct_index: 1,
              explanation: '"my_age" starts with a letter and has no spaces or reserved words. "123x" starts with a digit, "let" is reserved by the language, and "my age" contains a space.',
            },
            {
              text: 'After `let score = 10` then `score = score + 5`, what is score?',
              options: ['10', '5', '15', '105'],
              correct_index: 2,
              explanation: 'score + 5 is evaluated using the current value of score (10), giving 15, which is then stored back into score, overwriting the old value.',
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
              explanation: 'Naming a value lets you reuse it everywhere and update it in a single place, instead of hunting down every place the raw value was typed out.',
            },
            {
              text: 'What is the "box" analogy meant to illustrate about a variable?',
              options: [
                'A variable is a container that holds a value under a name',
                'A variable is a physical location on your hard drive',
                'A variable is a type of loop',
                'A variable deletes its value after use',
              ],
              correct_index: 0,
              explanation: 'The box metaphor is about storing a value under a reusable name — it has nothing to do with hardware storage or with loops.',
            },
            {
              text: 'If `let x = 5` and `let y = x`, then x is later changed to 10, what is y?',
              options: ['10', '5', 'undefined', 'It causes an error'],
              correct_index: 1,
              explanation: 'y copied x\'s value (5) at the moment of assignment. The two variables are independent boxes, so changing x afterward does not affect y.',
            },
            {
              text: 'Which rule about variable names is correct?',
              options: [
                'Names can start with a digit',
                'Names can start with a letter or underscore',
                'Names must be exactly one character',
                'Names cannot contain letters',
              ],
              correct_index: 1,
              explanation: 'Variable names must start with a letter or underscore, not a digit, and can then include letters, digits, and underscores.',
            },
            {
              text: 'What happens when you try to read a variable before it has been assigned a value?',
              options: [
                'You get the value from the previous run of the program',
                'You typically get an error or a placeholder like undefined',
                'The program automatically assigns it 0',
                'It silently becomes a string',
              ],
              correct_index: 1,
              explanation: 'Reading a variable before it is declared or assigned usually raises an error or yields an unhelpful placeholder such as undefined — a sign you read it too early.',
            },
            {
              text: 'In the swap example (a = "coffee", b = "tea"), why is a temporary variable needed to swap a and b?',
              options: [
                'Because assignment always requires three variables',
                'Because a\'s original value would be lost before it could be copied into b if you swapped directly',
                'Because strings cannot be reassigned',
                'Because temp variables run faster',
              ],
              correct_index: 1,
              explanation: 'Writing a = b immediately overwrites a\'s original value, so without saving it in temp first, there is nothing left to give to b.',
            },
            {
              text: 'A colleague writes `let 1stPlace = "gold"`. What is wrong?',
              options: [
                'Nothing, it is valid',
                'Variable names cannot start with a digit',
                'Variable names cannot contain letters',
                '"gold" is not a valid value',
              ],
              correct_index: 1,
              explanation: 'Variable names must start with a letter or underscore, not a digit — "1stPlace" starts with "1", which breaks that rule.',
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

A second example shows the same trap from the other direction —
subtraction and multiplication, unlike +, usually cannot be reused for
text, so they force a conversion instead of silently concatenating:

    let price = "20"
    let discount = 5
    let total = price - discount   // 15 (price is converted to a number)
    let label = price + "%"        // "20%" (discount stays text)

Walk through what actually happens here. On the first line, price is a
string, "20". When the minus operator sees a string on one side and a
number on the other, most languages try to convert the string to a
number first, because subtraction has no meaning for text — that
conversion succeeds since "20" reads as a valid number, so total ends
up as the number 15. On the second line, the plus operator behaves
completely differently: since it already has a defined meaning for
text (joining strings together), it does not bother converting
anything — it just glues "20" and "%" into "20%". Same variable, two
different operators, two different behaviors.

The first mistake to watch for is assuming every operator treats mixed
types the same way — as just shown, + concatenates while - and *
usually convert, and that inconsistency is exactly what trips people
up. The second mistake is trusting a value's type just because of how
it looks: "42" printed on the screen is indistinguishable from 42 to
the eye, but one is text and one is a number, and only one of them
supports arithmetic without a conversion happening first. The third
mistake is reassigning a variable to a wildly different type midway
through a long function and forgetting you did it — later code that
assumed the original type then breaks in a way that is hard to trace
back to the reassignment.

Why this matters: type confusion is one of the most common sources of
real bugs, especially anywhere data arrives as text — form inputs,
files, network responses — and then gets used in arithmetic without
being deliberately converted first. A price scraped from a web page, a
quantity typed into an HTML form, a number read out of a spreadsheet
file — all of these usually arrive as strings, even though they look
like numbers, and every one of them needs an explicit conversion
before you add them up. Skip that step and your "total" quietly turns
into a long string of digits stuck together instead of a sum, and
nothing in the program complains, because gluing strings together with
+ is a perfectly valid, silent operation. Learning to ask "what type
is this value, really, not just what does it look like?" before
trusting an operator's result is a habit that prevents entire
categories of production bugs, not just classroom exercises. It is
also why experienced programmers reach for explicit conversions —
turning "20" into the number 20 on purpose — rather than relying on an
operator to guess correctly on their behalf.

Key takeaway: values carry types, names do not — and mixing types
silently changes what an operator means.`,
          questions: [
            {
              text: 'What type is the value "hello"?',
              options: ['number', 'string', 'boolean', 'variable'],
              correct_index: 1,
              explanation: 'Text wrapped in quotes is a string value, not a number or boolean — and "variable" is not a type at all.',
            },
            {
              text: 'What type is the value true?',
              options: ['boolean', 'string', 'number', 'text'],
              correct_index: 0,
              explanation: 'true and false are boolean values — they are not text or numbers, even though "text" and "string" sound similar.',
            },
            {
              text: 'In many languages, what does 1 + "1" produce?',
              options: ['2', 'The string "11"', 'An error every time', 'true'],
              correct_index: 1,
              explanation: '+ already has a defined meaning for strings — joining characters together — so it concatenates rather than converting and adding.',
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
              explanation: 'Since the type travels with the value rather than the name, a variable can hold a number now and a string later with no restriction.',
            },
            {
              text: 'Which value is a boolean?',
              options: ['"false"', '0', 'false', '[]'],
              correct_index: 2,
              explanation: 'The unquoted word false is the boolean value itself. "false" is a string, 0 is a number, and [] is an empty array — none of those are booleans.',
            },
            {
              text: 'Given `let total = price - discount` where price is the string "20" and discount is the number 5, what does total become?',
              options: ['The number 15', 'The string "20-5"', 'An error is thrown', 'The string "15"'],
              correct_index: 0,
              explanation: 'Unlike +, the - operator has no meaning for text, so many languages convert the numeric-looking string to a number first, producing the number 15.',
            },
            {
              text: 'What does `let label = price + "%"` produce if price is the string "20"?',
              options: ['"20%"', '20', 'An error is thrown', 'NaN'],
              correct_index: 0,
              explanation: 'Since price is already a string, + concatenates it with "%" to produce "20%" — no arithmetic happens because no number is involved.',
            },
            {
              text: 'Why can "42" (a string) look identical to 42 (a number) when printed, yet behave differently in code?',
              options: [
                'They are actually always interchangeable',
                'Type is a property of the value itself, invisible in printed output, so operators may behave differently depending on which one it really is',
                'The language only supports numbers',
                'Printing converts types automatically',
              ],
              correct_index: 1,
              explanation: 'A value\'s type is not visible just from how it prints — "42" is text and 42 is a number, and only the number supports arithmetic directly.',
            },
            {
              text: 'What is the safest way to make sure a value typed into a web form is treated as a number before adding it to a total?',
              options: [
                'Just use + and hope for the best',
                'Explicitly convert it to a number first',
                'Wrap it in quotes',
                'Rename the variable',
              ],
              correct_index: 1,
              explanation: 'Explicitly converting the text to a number removes the ambiguity, so addition behaves as arithmetic instead of accidentally concatenating.',
            },
            {
              text: 'A function reassigns a variable that started as a number to hold a string partway through, without renaming it. What is the most likely problem this causes later?',
              options: [
                'Later code that assumed the original numeric type may misbehave when it unexpectedly receives a string',
                'Nothing, since the language auto-fixes it',
                'The variable becomes a constant',
                'The variable name changes automatically',
              ],
              correct_index: 0,
              explanation: 'Reassignment to a different type is legal, but code further down still assumes the original type — if that assumption silently breaks, bugs appear far from where the reassignment happened.',
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

A second example makes the mutation-versus-reassignment line sharper,
because objects and arrays behave differently from numbers and
strings:

    const user = { name: "Ada", age: 30 }
    user.age = 31        // fine: mutating the object's contents
    user = { name: "Alan" } // error: reassigning the const itself

    const total = 10
    total = total + 1     // error: total is a number, so "changing" it
                           // can only mean reassignment — and that's blocked

Walk through why these fail differently. In the user object, const
only pins down what user points to — the object sitting in memory — not
the fields inside that object, so reaching in and changing user.age is
just editing the object's contents, which const never promised to
prevent. The second line then tries to make user point at an entirely
new object, which is a reassignment of the name itself, and that is
exactly what const blocks. The total example never even gets the
chance to distinguish mutation from reassignment, because a plain
number has no internal contents to mutate — "changing" one always
means pointing the name at a new value, so const blocks it outright.

The first mistake people make is assuming const means "constant value"
rather than "constant binding" — they are surprised when a const
array's length changes, not realizing const never protected the
contents in the first place. The second mistake is relying on
shadowing by accident: reusing a common name like item or data inside
a nested block without meaning to shadow the outer one, then being
baffled that a change made outside the block never shows up inside it,
or vice versa. The third mistake is assuming a variable declared with
var, in languages that have it, obeys the same block scope as let and
const — var typically ignores block boundaries entirely and leaks out
to the whole function, which silently breaks the "declared inside,
visible only inside" mental model this lesson relies on.

Why this matters: bugs caused by scope and mutation confusion are
notoriously hard to track down, because the code that reads a variable
and the code that silently changed its contents can be far apart in
the file, or even in different files entirely. A function that
receives a const object and mutates one of its fields will not raise
any error — it is allowed to — yet every other piece of code holding a
reference to that same object now sees the change too, which is a
frequent source of "I never touched that variable, why did its value
change?" bugs in larger programs. Understanding exactly what const
does and does not protect — and exactly which block a variable belongs
to — is what lets you predict a program's behavior by reading it,
instead of only finding out by running it and being surprised. This is
also why many teams default to declaring everything with const unless
reassignment is truly needed: it does not stop mutation, but it does
rule out an entire class of "the value changed somewhere I wasn't
expecting" bugs caused by accidental reassignment.

Key takeaway: scope controls where a name lives, const controls whether
the name can be re-pointed — not whether the value can be mutated.`,
          questions: [
            {
              text: 'Which keyword prevents reassignment?',
              options: ['let', 'var', 'const', 'def'],
              correct_index: 2,
              explanation: 'const blocks pointing the name at a new value. let and var both allow reassignment, and def is not a variable-declaring keyword here.',
            },
            {
              text: 'Block scope is created by which characters?',
              options: ['{ }', '( )', '[ ]', '< >'],
              correct_index: 0,
              explanation: 'Curly braces delimit a block, and variables declared with let or const inside that block are only visible within it.',
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
              explanation: 'const only stops the name from being pointed at a new array; the existing array can still have its contents changed, including having items pushed into it.',
            },
            {
              text: 'Declaring an inner variable with the same name as an outer one is called...',
              options: ['shadowing', 'hoisting', 'currying', 'casting'],
              correct_index: 0,
              explanation: 'This is shadowing — the inner name creates a separate box that hides the outer one for the duration of its block.',
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
              explanation: 'A block-scoped variable simply does not exist outside the block it was declared in, so trying to access it there fails.',
            },
            {
              text: 'Given `const user = { name: "Ada" }; user.name = "Grace";` — is this allowed?',
              options: [
                'Yes, because const only blocks reassigning the name itself, not mutating the object\'s fields',
                'No, const freezes every field inside the object',
                'No, objects can never be changed',
                'Yes, but only once',
              ],
              correct_index: 0,
              explanation: 'const only pins what the variable name points to; the object it points to can still have its properties changed, so mutating user.name is allowed.',
            },
            {
              text: 'Given `const total = 10; total = total + 1;` — what happens?',
              options: [
                'total becomes 11',
                'It throws an error, because this reassigns the const name itself',
                'It silently does nothing',
                'It converts total to a string',
              ],
              correct_index: 1,
              explanation: 'A plain number has no internal contents to mutate, so "changing" it can only mean reassigning the name — and const blocks that outright.',
            },
            {
              text: 'In languages where var exists alongside let/const, how does var typically differ in scoping?',
              options: [
                'var behaves identically to let',
                'var ignores block boundaries and is visible through the whole function',
                'var is only visible inside its own block, more strictly than let',
                'var cannot be reassigned',
              ],
              correct_index: 1,
              explanation: 'var traditionally has function scope rather than block scope, so it leaks out of blocks like if or for, unlike let and const which stay confined to their block.',
            },
            {
              text: 'What does this print? `let x = "outer"; { let x = "inner"; } print(x)`',
              options: ['"inner"', '"outer"', 'undefined', 'It causes an error'],
              correct_index: 1,
              explanation: 'The inner x only shadows the outer one inside its own block. Once that block ends, the inner x disappears and the outer x, "outer", is what remains.',
            },
            {
              text: 'Why is accidental shadowing considered a common bug source?',
              options: [
                'It causes a syntax error every time',
                'Reusing a common name in a nested block can silently create a second, independent variable, so changes inside the block do not affect the outer one as expected',
                'It automatically deletes the outer variable',
                'Shadowing is impossible in modern languages',
              ],
              correct_index: 1,
              explanation: 'When an inner block declares a variable with the same name as an outer one, it creates a completely separate variable — changes to one never affect the other, which surprises people expecting them to be the same variable.',
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

Let's step through that loop the way the computer does. Before the
first pass, i is set to 0. Then, before every single pass, the
condition i < 3 is checked: with i at 0, that is true, so the body
runs and prints "hello". After the body finishes, i++ runs, bumping i
to 1. The condition is checked again — 1 < 3, still true — body runs,
i becomes 2. Checked again — 2 < 3, still true — body runs, i becomes
3. Checked one more time — 3 < 3 is false — so the loop stops without
running the body a fourth time. Three passes, three greetings.

A second example loops over real data instead of just counting, which
is the more common use in practice:

    let names = ["Ada", "Grace", "Alan"]
    for (let i = 0; i < names.length; i++) {
      print("Hello, " + names[i])
    }
    // prints a greeting for each name, however many there are

Here the condition is not a fixed number like 3 — it is names.length,
whatever that happens to be. Add a fourth name to the list and the
loop automatically greets four people instead of three, with no change
to the loop itself. That is the real point of looping over data rather
than hardcoding a count: the loop adapts to the size of whatever it is
given.

The failure mode to know from day one is the infinite loop: if nothing
inside the loop ever makes the condition false, the loop never ends
and the program hangs. Something in the condition has to change each
pass — usually the counter being incremented, as i++ does above.

A first common mistake is forgetting the increment entirely, which
leaves i stuck at 0 forever and the loop running until the program is
killed — this happens most often when a loop body is edited later and
the i++ gets accidentally deleted along with something else. A second
mistake is an off-by-one error: writing i <= names.length instead of
i < names.length reads one slot past the end of the list, which either
crashes the program or silently reads a missing value, depending on
the language. A third mistake is changing the loop variable inside the
body for some unrelated reason — say, reusing i as scratch space —
which throws off the counting the for-loop header is relying on and
produces a pass count nobody intended.

Why this matters: almost nothing in real software processes exactly
one item — programs handle lists of users, rows of data, frames of
animation, retries of a network request — and loops are the tool that
makes handling "some unknown number of things" as easy as handling
one. Getting comfortable with reading a loop's three parts — where it
starts, when it stops, what changes each pass — is one of the very
first skills that separates "I can follow a tutorial" from "I can read
an unfamiliar program and know what it does."

Key takeaway: a loop repeats a block while its condition is true — so
the condition must eventually become false.`,
          questions: [
            {
              text: 'What does a loop do?',
              options: ['Repeats a block of work', 'Stores a value', 'Styles a page', 'Deletes a file'],
              correct_index: 0,
              explanation: 'A loop\'s purpose is to repeat a block of code, which avoids writing the same work out by hand for every item.',
            },
            {
              text: 'A loop keeps running until its...',
              options: ['condition is false', 'file is saved', 'page reloads', 'variable is deleted'],
              correct_index: 0,
              explanation: 'The condition is checked on every pass; as soon as it evaluates to false, the loop stops.',
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
              explanation: 'If nothing in the loop ever makes the condition false, the loop keeps running forever — that is the definition of an infinite loop.',
            },
            {
              text: 'How many times does `for (let i = 0; i < 3; i++)` run its body?',
              options: ['2', '3', '4', 'forever'],
              correct_index: 1,
              explanation: 'i runs through 0, 1, and 2, each time passing the check i < 3. Once i becomes 3, the condition is false and the loop stops — three passes total.',
            },
            {
              text: 'In `for (let i = 0; i < names.length; i++)`, what determines how many times the loop runs?',
              options: [
                'The fixed number 3',
                'The length of the names array, whatever it is',
                'The value of i before the loop starts',
                'The number of print statements inside',
              ],
              correct_index: 1,
              explanation: 'The condition compares i to names.length, so the loop runs once per item in the array — adding or removing names changes the loop count automatically.',
            },
            {
              text: 'What are the three parts of a typical for-loop header, in order?',
              options: [
                'increment, condition, initializer',
                'initializer, condition, increment',
                'condition, initializer, increment',
                'increment, initializer, condition',
              ],
              correct_index: 1,
              explanation: 'A for loop header runs the initializer once (like let i = 0), checks the condition before each pass, then runs the increment after each pass.',
            },
            {
              text: 'What is the most common cause of an accidental infinite loop?',
              options: [
                'Forgetting to update the variable the condition depends on (like leaving out i++)',
                'Using a for loop instead of a while loop',
                'Printing too many messages',
                'Declaring too many variables',
              ],
              correct_index: 0,
              explanation: 'If nothing changes the value the condition checks, that condition never becomes false, so the loop never stops.',
            },
            {
              text: 'A loop is meant to go through indices 0 to length-1 of an array, but is written as `i <= names.length`. What is the bug?',
              options: [
                'It skips the last item',
                'It reads one slot past the end of the array (an off-by-one error)',
                'It runs one time fewer than intended',
                'Nothing, this is correct',
              ],
              correct_index: 1,
              explanation: 'Using <= instead of < lets i reach names.length, which is one past the last valid index, causing an out-of-bounds read.',
            },
            {
              text: 'Why do programs use loops instead of writing out repeated code by hand?',
              options: [
                'Loops make the program\'s file size larger',
                'Loops let the same logic run automatically regardless of how many items there are',
                'Loops are required by every programming language\'s syntax',
                'Loops make code run in a random order',
              ],
              correct_index: 1,
              explanation: 'A loop written once can process any number of items, adapting automatically, instead of needing a new hand-written line for every single item.',
            },
            {
              text: 'What happens right after a loop\'s condition becomes false?',
              options: [
                'The loop body runs one final time, then stops',
                'The loop stops immediately, without running the body again, and the program continues',
                'The program crashes',
                'The loop restarts from the beginning',
              ],
              correct_index: 1,
              explanation: 'Once the condition evaluates to false, the loop exits without running its body again, and execution moves on to whatever code follows the loop.',
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

A second example makes the "checks before every pass, including
zero times" behavior concrete:

    let queue = []
    let processed = 0
    while (queue.length > 0) {
      processed = processed + 1
      queue.pop()
    }
    // queue starts empty, so processed stays 0 — the loop never runs

Walk through it: the condition queue.length > 0 is evaluated first,
before the body is ever considered. Since queue was created empty, the
length is 0, and 0 > 0 is false — so the loop exits immediately,
processed keeps its starting value of 0, and none of the code inside
the braces ever executes. This trips people up because reading the
loop, it looks like it "does something" — but whether it does anything
at all depends entirely on the state of queue before the loop was
reached.

The first mistake is assuming a while loop, like a for loop's counter,
somehow guarantees at least one pass — it does not, and code that
depends on the body having run at least once (say, to set an initial
value) will misbehave silently when the queue happens to start empty.
The second mistake is advancing the wrong variable: mutating a copy of
the thing the condition checks, rather than the thing itself, leaves
the real condition untouched and the loop runs forever even though
something in the body did change. The third mistake is converting a
for loop into a while loop (or vice versa) without carrying over every
part — for instance keeping the condition and body but forgetting that
the for loop's increment now has nowhere to live, so it needs to be
added back into the while loop's body by hand.

Why this matters: choosing the right loop is a small decision with a
large payoff in readability — a for loop signals "I know how many
times this runs" to anyone reading the code, while a while loop
signals "this runs until some condition changes, and I'm not sure how
long that takes." Picking the wrong one does not just look odd, it
actively misleads whoever reads the code next (including future you),
because they will reason about the loop's behavior based on which kind
it is. This shows up constantly in real code: a for loop reading a
fixed-size batch from a database, versus a while loop that keeps
polling a server "until a response arrives" — the two situations are
genuinely different, and reaching for the wrong tool tends to produce
code that either overcomplicates a simple, known-length task or
underprepares for a task whose length truly cannot be known ahead of
time.

Key takeaway: for when the count is known, while when it is not — and a
while loop can run zero times.`,
          questions: [
            {
              text: 'Which loop best suits a known number of passes?',
              options: ['for', 'while', 'neither — they are identical', 'do-while'],
              correct_index: 0,
              explanation: 'A for loop\'s header is built around a known count — an initializer, a condition, and an increment — making it the natural fit when the number of passes is known ahead of time.',
            },
            {
              text: 'A while loop checks its condition...',
              options: ['before each pass', 'after each pass', 'only once, at the start', 'never'],
              correct_index: 0,
              explanation: 'A while loop evaluates its condition before every pass, including the first one — if it is false from the start, the body never runs at all.',
            },
            {
              text: 'If a while loop condition is false on arrival, how many times does the body run?',
              options: ['0', '1', 'Exactly once, then it exits', 'It errors'],
              correct_index: 0,
              explanation: 'Since the condition is checked before the first pass, a false condition on arrival means the body never executes — zero times.',
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
              explanation: 'A for loop\'s increment lives in its header where it is hard to miss; a while loop relies on you remembering to change something in the body, which is easy to forget.',
            },
            {
              text: 'Which construct guarantees the body runs at least once?',
              options: ['while', 'for', 'do-while', 'if'],
              correct_index: 2,
              explanation: 'A do-while loop checks its condition after running the body, so the body always executes at least once before the condition is ever tested.',
            },
            {
              text: 'Given `let queue = []; while (queue.length > 0) { ... }` — how many times does the body run?',
              options: ['0 times', '1 time', 'Infinitely', 'It throws an error'],
              correct_index: 0,
              explanation: 'The condition is checked before the very first pass; since the queue starts empty, queue.length > 0 is false immediately, so the body never executes.',
            },
            {
              text: 'What is wrong with converting a for loop to a while loop but forgetting to add the increment step into the while loop\'s body?',
              options: [
                'Nothing, the increment is not needed in a while loop',
                'The loop becomes infinite because nothing advances the condition anymore',
                'The loop only runs once',
                'It causes a syntax error',
              ],
              correct_index: 1,
              explanation: 'A for loop\'s increment is built into its header, but a while loop needs that step added into the body — omit it and the condition never changes, so the loop never stops.',
            },
            {
              text: 'You want to keep asking the user for input until they type "quit", but you do not know in advance how many attempts that will take. Which loop fits better?',
              options: [
                'A for loop, because the count is fixed',
                'A while loop, because the number of passes is not known ahead of time',
                'Neither loop can do this',
                'A do-while loop is required by definition',
              ],
              correct_index: 1,
              explanation: 'A while loop suits situations where the number of passes is not known ahead of time — it simply keeps going until its condition becomes false.',
            },
            {
              text: 'What is a key difference between a while loop and a do-while loop?',
              options: [
                'A do-while loop checks its condition after running the body at least once, while a plain while loop checks first',
                'They are exactly identical',
                'A do-while loop can never run more than once',
                'A while loop always runs at least twice',
              ],
              correct_index: 0,
              explanation: 'do-while guarantees at least one pass because it checks the condition after the body runs; a plain while loop checks first and may skip the body entirely.',
            },
            {
              text: 'A for loop\'s increment step lives in the loop header. Where does a while loop\'s equivalent "advance" step usually need to live?',
              options: [
                'Nowhere — while loops do not need one',
                'Inside the loop\'s body, written explicitly by the programmer',
                'In a separate function',
                'In the loop\'s condition only',
              ],
              correct_index: 1,
              explanation: 'Unlike a for loop, a while loop has no built-in increment slot, so whatever needs to change to eventually make the condition false must be written inside the body by hand.',
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

A second example shows why this is not just an abstract counting
exercise — it is exactly what happens when you check every pair of
items in a list for a match, which is one of the most common places
nested loops show up in real code:

    let hasDuplicate = false
    for (let i = 0; i < names.length; i++) {
      for (let j = 0; j < names.length; j++) {
        if (i !== j && names[i] === names[j]) {
          hasDuplicate = true
        }
      }
    }

Walk through the cost here. For a list of 10 names, the outer loop
runs 10 times, and for each of those, the inner loop also runs 10
times — 100 comparisons total to check for a single duplicate. Grow
the list to 10,000 names — not an unusual size for real user data —
and the same logic now does 100,000,000 comparisons. The code did not
get more complicated; the input just got bigger, and the nested
structure means the cost grows much faster than the input does.

The trap is nesting a loop you did not write. Calling a function that
itself loops, from inside a loop, is a nested loop — the cost is the
same even though the source only shows one. This is the first common
mistake: treating a single visible for-loop as "safe" because there is
only one set of braces, without checking whether a function it calls
internally loops over the same data again.

A second mistake is nesting loops over the same collection when only
one pass was actually needed — for example, nesting a search for each
item inside a loop over that same list, when a single pass with a
lookup structure (like a set or map) could answer "have I seen this
before?" without a second loop at all. A third mistake is not noticing
that the inner loop's bound depends on the outer loop's progress
rather than being fixed — a triangular pattern, like comparing every
item only to the ones after it, still costs roughly n squared over n,
even though the inner loop visibly shrinks each pass, because the
total number of comparisons is still proportional to n times n.

Why this matters: this is the first real taste of thinking about how
an algorithm's cost scales, which becomes critical the moment code
moves from a classroom example with ten items to production data with
millions. A nested loop that feels instant while testing with a
handful of sample records can bring a real system to a crawl once real
users show up — and recognizing "wait, is this nested over the same
data?" while reading or writing code is what lets you catch that
before it becomes an outage rather than after.

Key takeaway: sequential loops add, nested loops multiply — and hidden
loops inside called functions count.`,
          questions: [
            {
              text: 'Two loops nested over n items do how much work?',
              options: ['n', 'n * n', '2n', 'n + 1'],
              correct_index: 1,
              explanation: 'For each of the outer loop\'s n passes, the inner loop runs its full n passes, so the total work is n times n.',
            },
            {
              text: 'Two loops one after the other (not nested) over n items cost roughly...',
              options: ['n * n', '2n', 'n squared', 'n cubed'],
              correct_index: 1,
              explanation: 'Sequential loops add their costs together: n from the first loop plus n from the second is 2n, not multiplied together.',
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
              explanation: 'The cost is identical to a visibly nested loop — the source just hides one of the loops inside a function call, but the runtime work still multiplies.',
            },
            {
              text: 'Going from n = 1,000 to n = 10,000 in a doubly-nested loop multiplies the work by about...',
              options: ['10', '20', '100', '2'],
              correct_index: 2,
              explanation: 'The cost scales with n squared, and 10,000 is 10 times 1,000 — so the squared cost grows by 10 * 10 = 100 times.',
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
              explanation: 'A loop only stops when its condition evaluates to false, which requires something inside the loop to actually change the value the condition checks.',
            },
            {
              text: 'Checking every pair of items in a list of 10,000 for duplicates with a nested loop does roughly how many comparisons?',
              options: ['10,000', '20,000', '100,000,000', '1,000'],
              correct_index: 2,
              explanation: 'A nested loop over the same list of size n does about n * n comparisons; for n = 10,000 that is 10,000 * 10,000 = 100,000,000.',
            },
            {
              text: 'Why is it a mistake to assume a single visible for-loop is automatically "cheap"?',
              options: [
                'For loops are always slow no matter what',
                'If the loop\'s body calls a function that itself loops over the same data, the real cost is still multiplied even though only one loop is visible in the source',
                'Because for loops never terminate',
                'Because for loops cannot call functions',
              ],
              correct_index: 1,
              explanation: 'A hidden loop inside a called function still multiplies the cost just like a loop written directly in the body — the source only shows one loop, but the runtime cost reflects both.',
            },
            {
              text: 'A "triangular" nested loop, where the inner loop\'s range shrinks depending on the outer index (e.g. comparing each item only to the ones after it), costs roughly...',
              options: [
                'Exactly n, same as a single loop',
                'Still roughly proportional to n squared, just with a smaller constant factor',
                'Exactly 2n',
                'Zero, because the inner loop shrinks',
              ],
              correct_index: 1,
              explanation: 'Even though the inner loop\'s range shrinks each pass, the total number of iterations across all passes is still proportional to n squared — about half of the full n * n, not a fundamentally different scale.',
            },
            {
              text: 'What is the best fix when a nested loop is used only to check "have I seen this item before?" inside a larger loop?',
              options: [
                'Add a third nested loop',
                'Replace the inner loop with a lookup structure like a set or map, so each check does not require rescanning the whole list',
                'Remove the outer loop entirely',
                'Nothing needs to change',
              ],
              correct_index: 1,
              explanation: 'A set or map lookup answers "have I seen this?" in roughly constant time per check, avoiding the repeated inner scan that makes the nested version cost n squared.',
            },
            {
              text: 'Why does an algorithm that "works fine" on 10 test records sometimes fail or slow to a crawl in production?',
              options: [
                'Production servers are always slower than development machines',
                'Nested-loop costs scale much faster than the input size, so a jump from 10 to millions of records can turn a fast operation into an extremely slow one',
                'The code changes automatically between environments',
                'Test records are processed differently than real ones',
              ],
              correct_index: 1,
              explanation: 'An n-squared cost is invisible at small n (10 * 10 is instant) but explodes at realistic scale (millions squared is astronomically large), so testing only on small samples can hide a serious performance problem.',
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

Let's walk through what happens when greet("Ada") runs. The computer
jumps into the function body, and the parameter name is filled in with
the argument "Ada" for the duration of this one call. Inside the body,
"Hello, " + name becomes "Hello, " + "Ada", which evaluates to
"Hello, Ada". The return statement then hands that string back out to
wherever greet("Ada") was written, as if the call itself were replaced
by the string it returned. Call greet("Alan") right after, and the
whole process repeats independently — name is filled with "Alan" this
time, with no memory of the previous call carrying over.

A second example shows a function with more than one parameter, and
what happens if you call it with the arguments in the wrong order:

    function introduce(name, age) {
      return name + " is " + age + " years old"
    }

    introduce("Grace", 36)   // "Grace is 36 years old"
    introduce(36, "Grace")   // "36 is Grace years old" — arguments swapped!

Parameters are filled in by position, not by guessing what makes
sense: the first argument always lands in name, the second always
lands in age, no matter what values you pass. Swap the order at the
call site and the function has no way to notice — it just plugs 36
into name and "Grace" into age, and produces a nonsensical sentence
without any error at all.

The mistake almost everyone makes once is confusing defining with
calling. Writing the function body does not run it. Only the call
does, and a call needs the parentheses: greet is the function itself,
while greet("Ada") is you asking it to run. A second mistake is
exactly the parameter-order mix-up shown above — passing arguments in
the wrong order produces no error message at all, just a wrong answer,
which makes it a sneaky bug to track down. A third mistake is calling
a function with too few arguments and expecting an error — many
languages instead quietly fill the missing parameter with an empty
placeholder like undefined, and the function runs anyway, just with a
gap where a value should have been.

Why this matters: functions are how programs stay organized as they
grow — instead of copying and pasting the same three lines everywhere
you need a greeting, you write greet once and call it from a hundred
places. When that greeting needs to change — say, adding "Good
morning" before the name — you fix it in exactly one place instead of
hunting down every copy scattered across the codebase and hoping you
found them all. This single idea — name the work, call it by name — is
the foundation that every larger program, and every programming
language feature you will learn after this, builds on top of. Whole
programs are, underneath, just collections of functions calling other
functions, so getting comfortable with "define once, call by name, and
data flows in through parameters and out through return" pays off on
essentially every line of code you will write from here on.

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
              explanation: 'A function packages up a piece of work under a name so you can call it repeatedly instead of rewriting it every time.',
            },
            {
              text: 'In `greet("Ada")`, what is "Ada"?',
              options: ['A parameter', 'An argument', 'A return value', 'A variable name'],
              correct_index: 1,
              explanation: '"Ada" is the actual value supplied at the call site — that makes it the argument. The parameter is the placeholder (name) inside the function\'s definition.',
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
              explanation: 'return hands a value back to whatever code called the function, letting that code use the result.',
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
              explanation: 'Defining a function just sets up what it should do; none of the code inside runs until the function is actually called.',
            },
            {
              text: 'In `function greet(name) { ... }`, what is `name`?',
              options: [
                'A parameter — a placeholder for whatever value the caller supplies',
                'The return value',
                'An argument',
                'A global variable',
              ],
              correct_index: 0,
              explanation: 'name is the placeholder written in the function\'s definition; the actual value supplied at call time (like "Ada") is the argument.',
            },
            {
              text: 'Given `function introduce(name, age) { return name + " is " + age }`, what does `introduce(36, "Grace")` produce?',
              options: ['"Grace is 36"', '"36 is Grace"', 'An error, because the types don\'t match', '"36 is 36"'],
              correct_index: 1,
              explanation: 'Arguments are filled into parameters by position, not by what makes sense — 36 lands in name and "Grace" lands in age, producing a nonsensical but error-free sentence.',
            },
            {
              text: 'What happens if you call a function with fewer arguments than it has parameters?',
              options: [
                'The program always throws an error',
                'The missing parameter is often silently filled with an empty placeholder like undefined, and the function still runs',
                'The function automatically borrows a value from another variable',
                'The extra parameter is deleted from the function',
              ],
              correct_index: 1,
              explanation: 'Many languages do not require every parameter to receive an argument — the missing one is quietly set to something like undefined rather than raising an error.',
            },
            {
              text: 'You wrote `function greet(name) { return "Hello, " + name }` but never call greet anywhere. What happens when the program runs?',
              options: [
                'It prints "Hello, undefined" once',
                'It runs automatically at the end of the program',
                'Nothing — the function body never executes until it is called',
                'It causes a syntax error',
              ],
              correct_index: 2,
              explanation: 'Defining a function only tells the program what to do if it is called — it does not execute the body on its own; without a call, the code inside never runs.',
            },
            {
              text: 'Two calls, greet("Ada") and then greet("Alan") — does the second call remember anything from the first?',
              options: [
                'Yes, name keeps its previous value as a starting point',
                'No — each call gets its own independent run, with name freshly filled in from that call\'s argument',
                'Only if the function uses const',
                'Only the first call actually executes',
              ],
              correct_index: 1,
              explanation: 'Every call is independent — the parameter is filled in fresh from that specific call\'s argument, with no memory of what happened in a previous call.',
            },
            {
              text: 'Which of these correctly distinguishes a parameter from an argument?',
              options: [
                'A parameter is the placeholder in the function\'s definition; an argument is the actual value supplied at the call site',
                'They are two names for the exact same thing',
                'A parameter is always a number, an argument is always text',
                'An argument is used only inside loops',
              ],
              correct_index: 0,
              explanation: 'The definition-time placeholder is the parameter; the concrete value handed in when the function is actually called is the argument.',
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

A second example shows how side effects make a function's behavior
depend on when you call it, which pure functions never do:

    add(2, 3)         // always 5, no matter what, no matter when
    add(2, 3)         // still always 5

    addToTotal(2)     // total becomes 2
    addToTotal(2)     // total becomes 4 — same argument, different result!

Walk through why that second pair differs. add(2, 3) only ever looks
at its two arguments and does arithmetic with them — there is nothing
else it could depend on, so it returns 5 every single time, forever.
addToTotal(2), on the other hand, reads and writes a variable that
lives outside the function, so its effect depends on total's value at
the moment it is called — call it once and total is 2; call it again
with the exact same argument and total becomes 4, because the second
call is building on what the first call left behind. Same function,
same argument, different outcome — that is the signature of a side
effect at work.

The gotcha: a function with no return statement still returns
something — usually an empty value like undefined or None. If a caller
is getting undefined out of your function, check that you actually
returned.

The first common mistake is writing a function that both mutates
shared state and returns a value, then having callers rely on only one
of the two — later, someone changes how the function is called (say,
ignoring the return value) without realizing the mutation was the part
they actually needed, or vice versa. The second mistake is assuming a
function is pure just because it "looks like" a calculation — a
function can quietly read a global variable in the middle of its math
without writing to anything, and that alone is enough to make its
output depend on outside state, even with no visible side effect like
printing or saving. The third mistake, already mentioned, is forgetting
the return statement entirely and being surprised that a value you
expected to use turns out to be undefined three lines later, far from
where the actual mistake was made.

Why this matters: real programs need side effects — nothing gets
saved, displayed, or sent anywhere without one — but the ratio of pure
functions to side-effecting ones in a codebase is one of the biggest
predictors of how easy that codebase is to test and change safely.
Pure functions can be tested with a simple input-output check and
reused anywhere with no surprises; functions full of side effects
require recreating the exact surrounding state just to test one path.
Recognizing which kind you are writing, and keeping the two apart where
you can, is a habit that pays off the first time you have to debug
code you wrote months ago.

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
              explanation: 'Purity means the output depends only on the arguments passed in, with nothing outside the function read or changed along the way.',
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
              explanation: 'Changing something outside the function\'s own local scope, like a global variable, is exactly what makes an action a side effect.',
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
              explanation: 'A function without an explicit return still hands something back to the caller — typically an empty placeholder like undefined or None.',
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
              explanation: 'Because a pure function\'s output depends only on its arguments, testing it is just checking inputs against expected outputs — no hidden state to prepare.',
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
              explanation: 'A missing return statement is the classic cause of a function silently handing back undefined instead of the value you expected.',
            },
            {
              text: '`add(2, 3)` is called twice in a row. What does it return each time?',
              options: [
                '5 both times, since add only depends on its arguments',
                '5, then 10, because calls accumulate',
                'It depends on how many times the program has run before',
                'It errors the second time',
              ],
              correct_index: 0,
              explanation: 'add is pure — it only computes from its arguments, with nothing else to depend on — so it returns exactly the same result, 5, every time it is called with those arguments.',
            },
            {
              text: '`addToTotal(2)` is called twice in a row, where addToTotal adds its argument to an outside variable total (starting at 0). After both calls, what is total?',
              options: ['2', '4', '0', 'It depends only on the argument, so it stays 2 both times'],
              correct_index: 1,
              explanation: 'addToTotal has a side effect — each call adds to whatever total already holds, so the two calls compound: 0 + 2 = 2, then 2 + 2 = 4.',
            },
            {
              text: 'Is it possible for a function to read a global variable in its calculation without writing to anything, and still not be considered pure?',
              options: [
                'No, only writing to a global counts as a side effect',
                'Yes — depending on outside state, even just reading it, means the same arguments can produce different outputs at different times',
                'No, reading is always safe and always pure',
                'Yes, but only if the function also loops',
              ],
              correct_index: 1,
              explanation: 'Purity requires the output to depend only on the arguments; if a function also reads outside state, its result can change between calls even with identical arguments, which breaks purity even without writing anything.',
            },
            {
              text: 'A function has no explicit `return` statement anywhere in its body. What does calling it actually produce?',
              options: [
                'A syntax error at definition time',
                'An empty value such as undefined or None, rather than nothing at all',
                'The last argument that was passed in',
                'It cannot be called until a return is added',
              ],
              correct_index: 1,
              explanation: 'A function without a return statement still returns something — just an empty placeholder like undefined or None — rather than producing no result at all.',
            },
            {
              text: 'Why might a team prefer a pure function over an equivalent one with side effects, when both produce a similar result?',
              options: [
                'Pure functions are always shorter to write',
                'Pure functions can be tested with a simple input/output check and reused safely anywhere, without needing to recreate hidden state',
                'Side effects are illegal in most languages',
                'Pure functions run inside a separate process automatically',
              ],
              correct_index: 1,
              explanation: 'Because a pure function\'s result depends only on its inputs, testing it is just checking inputs against expected outputs, which also makes it safe to reuse anywhere without hidden state.',
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

Let's walk through factorial(4) frame by frame. Calling factorial(4)
pushes a frame with n = 4; since 4 is not <= 1, it needs
4 * factorial(3), so it calls factorial(3), pushing a second frame with
n = 3. That call needs 3 * factorial(2), pushing a third frame with
n = 2, which needs 2 * factorial(1), pushing a fourth frame with n = 1.
Now n <= 1 is true, so factorial(1) returns 1 immediately — no further
calls. That 1 travels back up: factorial(2) computes 2 * 1 = 2 and
returns it; factorial(3) computes 3 * 2 = 6 and returns it; factorial(4)
computes 4 * 6 = 24 and returns it. Four frames were pushed going down,
and the same four frames popped off, one per return, going back up.

A second example shows what happens when the base case is missing or
wrong, which is the failure every recursive function must guard
against:

    function countDown(n) {
      print(n)
      return countDown(n - 1)   // no base case at all!
    }

    countDown(5)   // prints 5, 4, 3, 2, 1, 0, -1, -2, ... forever, until crash

There is no condition anywhere that stops the calls, so every single
call pushes a new frame and immediately makes another call. The stack
grows without ever shrinking back, and since the stack is a fixed,
finite amount of memory, it eventually runs out — the program crashes
with a stack overflow rather than looping forever silently the way an
infinite while loop would.

That stack is finite. Omit the base case, or write a recursive case
that never approaches it, and you get a stack overflow: the same
runaway as an infinite loop, but it crashes rather than hangs. Deep
recursion can overflow even when the logic is correct — recursing
100,000 deep will exhaust the stack in most languages regardless.

The first common mistake is writing a base case that exists but is
never actually reached — for instance checking n === 0 when the
recursive step subtracts 2 each time from an odd starting number, so n
skips right past 0 and the check never fires. The second mistake is
writing the recursive case so it moves away from the base case instead
of toward it — calling countDown(n + 1) instead of countDown(n - 1) by
a copy-paste slip is the same bug as the missing-base-case example
above, just disguised. The third mistake is assuming recursion is
always the right tool: a problem that recursion solves elegantly in
five lines can sometimes be solved with a simple loop and no risk of
stack overflow at all, and reaching for recursion out of habit, on data
whose depth you do not control, is how "the demo worked fine" turns
into "it crashed in production on a bigger input."

Why this matters: recursion is how a huge number of natural problems
are expressed cleanly — walking a folder of folders, parsing nested
brackets, exploring a tree of comments — because the problem itself is
naturally defined in terms of a smaller version of itself. Learning to
identify the base case and the recursive case before writing a single
line of code is what keeps recursive functions safe rather than a
ticking stack overflow waiting for a large enough input.

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
              explanation: 'Every recursive function needs a base case that stops the recursion and a recursive case that moves the problem closer to that base case.',
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
              explanation: 'Each call keeps pushing a new frame with nothing to stop it, and since the call stack has a fixed, finite size, it eventually runs out, crashing with a stack overflow.',
            },
            {
              text: 'What does factorial(4) evaluate to, given the lesson\'s definition?',
              options: ['4', '10', '24', '16'],
              correct_index: 2,
              explanation: 'factorial(4) unwinds as 4 * 3 * 2 * 1, which multiplies out to 24.',
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
              explanation: 'Every call, including recursive ones, gets its own stack frame holding its own copy of the parameters, rather than sharing one frame across calls.',
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
              explanation: 'The call stack has a fixed, limited size regardless of whether the recursive logic is correct, so sufficiently deep recursion can exhaust it either way.',
            },
            {
              text: 'In factorial(4), how many stack frames exist at the deepest point, just before factorial(1) returns?',
              options: ['1', '2', '4', '24'],
              correct_index: 2,
              explanation: 'Calling factorial(4) pushes a frame for n=4, which calls factorial(3) (frame for n=3), which calls factorial(2) (frame for n=2), which calls factorial(1) (frame for n=1) — four frames stacked up at the deepest point.',
            },
            {
              text: 'Given `function countDown(n) { print(n); return countDown(n - 1) }` with no stopping check, what happens when countDown(5) is called?',
              options: [
                'It prints 5, 4, 3, 2, 1, 0 and stops cleanly',
                'It keeps calling itself with ever-smaller n forever, until the program crashes with a stack overflow',
                'It throws a syntax error immediately',
                'It only prints 5 and returns',
              ],
              correct_index: 1,
              explanation: 'There is no base case to stop the recursion, so every call keeps making another call with a smaller n — the stack keeps growing until it runs out of space and the program crashes.',
            },
            {
              text: 'A recursive function checks `if (n === 0) return 1` as its base case, but the recursive step subtracts 2 each time, and it is called with an odd starting number. What happens?',
              options: [
                'It works fine, since subtracting 2 always eventually reaches 0',
                'n skips past 0 (going 5, 3, 1, -1, -3, ...) and the base case is never reached, causing a stack overflow',
                'It stops automatically at n = 1',
                'The function returns 0 immediately',
              ],
              correct_index: 1,
              explanation: 'Since n decreases by 2 each time, an odd starting value never lands exactly on 0 — it jumps straight past it — so the base case condition n === 0 is never true, and the recursion never stops.',
            },
            {
              text: 'Why might correct, bug-free recursive code still crash on very large inputs?',
              options: [
                'Because correct code never crashes',
                'Because the call stack has a finite size, and a very deep recursion can exhaust it even when every base case and recursive case is logically correct',
                'Because recursion is always slower than loops',
                'Because large inputs cause syntax errors',
              ],
              correct_index: 1,
              explanation: 'Each pending call holds its own stack frame, and the stack itself is a fixed, limited amount of memory — so even flawless recursive logic can run out of stack space if it needs to go deep enough.',
            },
            {
              text: 'When might a plain loop be a better choice than recursion for solving a problem?',
              options: [
                'Never, recursion is always preferred',
                'When the recursion depth could grow very large and is not bounded, since a loop carries no risk of stack overflow',
                'When the problem has no smaller sub-versions',
                'Loops cannot solve problems that recursion can',
              ],
              correct_index: 1,
              explanation: 'A loop does not add a stack frame per iteration the way recursion does, so for problems where recursion depth could scale with a large, uncontrolled input, a loop avoids the risk of a stack overflow entirely.',
            },
          ],
        },
      },
    },
  ],
};
