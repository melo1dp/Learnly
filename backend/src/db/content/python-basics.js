// Python Basics: syntax, functions, and collections, each at three difficulties.
export default {
  title: 'Python Basics',
  description: 'An introduction to Python syntax, functions, and built-in collections, from first statements to the edge cases that trip people up.',
  category: 'Computing',
  level: 'beginner',
  rating: 4.6,
  topics: [
    {
      topic: 'syntax',
      lessons: {
        easy: {
          title: 'Variables, Types, and Printing',
          body: `Python runs your code line by line, from the top of the file to the bottom, executing each statement before moving to the next. A variable is just a name you point at a value, and you create one with a single equals sign. You never declare a type up front the way you would in Java or C: Python figures out the type from the value you assign, and the same name can later point at a value of a completely different type. This is sometimes called "dynamic typing," and it is one of the first things that feels different if you are coming from a statically typed language.

Here is a first program:

    name = "Ada"
    age = 36
    print(name, age)
    print(type(age))

That prints "Ada 36" and then the class of age, which is int. Walking through it line by line: the first line creates a variable called name and binds it to the string "Ada"; the second line creates age and binds it to the integer 36; the third line calls the built-in print function with two arguments, which Python separates with a single space by default; the fourth line asks Python what type age currently is and prints the answer. Nothing here declares int or str anywhere - Python infers both from the literal values on the right-hand side of the equals sign.

The main built-in types you meet early are int for whole numbers, float for decimals, str for text, and bool for True or False. Note that True and False are capitalised in Python, unlike the lowercase keywords if and for. A second worked example shows how these types interact, and where they do not:

    price = 19.99
    quantity = 3
    total = price * quantity
    label = "Total: $" + str(total)
    print(label)

This prints "Total: $59.97". price is a float, quantity is an int, and multiplying them gives a float - Python promotes the result automatically. But label mixes types: you cannot add a string and a number directly, so the code explicitly converts total to a string with str() before concatenating. Leaving that conversion out is exactly the kind of mistake beginners hit constantly.

That leads to the common mistakes worth internalising. The first and most classic is confusing = with ==. A single equals sign assigns a value; a double equals sign compares two values and gives back True or False. Writing "if age = 36" is a syntax error, not a comparison, because Python does not allow assignment inside a condition. The second mistake is exactly the str() problem above: the value 36 is a number you can do maths with, while "36" is a string, so "36" + 1 raises a TypeError rather than quietly producing 37. Python refuses to guess whether you meant addition or concatenation. The third mistake is assuming a variable "remembers" its original type. After age = 36, writing age = "thirty-six" is completely legal - the name age now points at a string, and the old integer is simply forgotten. This is convenient but it also means typos in variable reuse do not get caught by any type declaration; they only surface later, when the wrong operation fails at runtime.

Why this matters: dynamic typing is a large part of why Python code is quick to write and read, but it shifts responsibility onto you to keep track of what each name currently holds, especially in longer functions where a variable might be reassigned several lines away from where you use it. Professional Python code leans on descriptive names, small functions, and sometimes type hints (like age: int) precisely to keep this flexibility from turning into confusion. Learning to predict a variable's type just by reading the code, without running it, is a skill that pays off on every single Python program you ever write.

Key takeaway: names are labels, values carry the type, and = assigns while == compares.`,
          questions: [
            {
              text: 'What does the expression type(3.0) return in Python?',
              options: ['int', 'float', 'str', 'decimal'],
              correct_index: 1,
              explanation: '3.0 has a decimal point, so Python treats it as a float, not an int. There is no built-in type called "decimal" involved here.',
            },
            {
              text: 'Which operator compares two values for equality?',
              options: ['=', '==', ':=', '=>'],
              correct_index: 1,
              explanation: 'A single = assigns a value, while == checks whether two values are equal and returns True or False. := is the walrus operator, and => is not valid Python syntax.',
            },
            {
              text: 'What is the result of "36" + 1?',
              options: ['37', 'The string "361"', 'A TypeError is raised', 'The float 37.0'],
              correct_index: 2,
              explanation: 'Python does not silently convert between strings and numbers when using +, so adding a str and an int raises a TypeError. You would need str(1) or int("36") first.',
            },
            {
              text: 'How is the boolean "true" written in Python?',
              options: ['true', 'TRUE', 'True', 'yes'],
              correct_index: 2,
              explanation: 'Python capitalizes its two boolean literals, True and False. Lowercase true is not defined and raises a NameError.',
            },
            {
              text: 'After running x = 5 and then x = "five", what type is x?',
              options: ['int, because it was assigned first', 'str', 'Both, Python keeps the old type too', 'This raises an error because the type changed'],
              correct_index: 1,
              explanation: 'Python variables do not have a fixed type. Reassigning x to a string simply makes it point at the string object; the previous integer is discarded, not remembered.',
            },
            {
              text: 'What does print(name, age) display when name is "Ada" and age is 36?',
              options: ['"Ada36"', '"Ada 36" with a single space between them', 'An error, because print cannot take two arguments', '"Ada, 36" with a comma'],
              correct_index: 1,
              explanation: 'print() joins multiple arguments with a single space by default, so print("Ada", 36) shows "Ada 36". A different separator would require passing sep= explicitly.',
            },
            {
              text: 'In quantity = 3, what type does Python assign to quantity?',
              options: ['float', 'int', 'str', 'bool'],
              correct_index: 1,
              explanation: 'A whole number literal like 3 with no decimal point is created as an int by default.',
            },
            {
              text: 'If price is a float and quantity is an int, what type does price * quantity produce?',
              options: ['int, because at least one operand must win', 'float', 'str', 'It depends on which variable was assigned first'],
              correct_index: 1,
              explanation: 'When a float and an int are combined arithmetically, Python promotes the result to a float so no precision is lost.',
            },
            {
              text: 'Why does the example code call str(total) before concatenating it into a message?',
              options: ['str() rounds the number to two decimal places', 'You cannot use + to join a string and a non-string value directly', 'str() is required before printing any variable', 'It converts total into an integer'],
              correct_index: 1,
              explanation: 'The + operator requires both sides to be the same kind of thing when used for concatenation, so a number must be explicitly converted with str() before it can be joined with text.',
            },
            {
              text: 'Which of these is NOT one of the four basic built-in types introduced in this lesson?',
              options: ['int', 'float', 'array', 'bool'],
              correct_index: 2,
              explanation: 'Array is not one of the basic built-in types covered here; the core scalar types introduced are int, float, str, and bool.',
            },
          ],
        },
        medium: {
          title: 'Indentation, Blocks, and Control Flow',
          body: `Most languages group statements with curly braces, so the interpreter knows where a block starts and stops regardless of how you indent the text. Python groups statements with indentation instead. Every line indented to the same depth under a header line belongs to the same block, and the header line always ends in a colon. That means whitespace is part of the grammar, not just a style choice - delete a leading space and you can change what your program does, or break it outright.

A short example:

    score = 72
    if score >= 90:
        grade = "A"
    elif score >= 70:
        grade = "B"
    else:
        grade = "C"
    print(grade)

This prints B. Walking through it: Python evaluates score >= 90 first; since 72 is not greater than or equal to 90, it skips that block entirely and checks the next condition, score >= 70. Because 72 satisfies that, grade is set to "B" and the interpreter skips the else branch, since only one branch in an if/elif/else chain ever runs. The elif and else branches only run when the branches above them are false, so ordering the conditions matters a great deal: if you tested score >= 70 first, a score of 95 would also land in that branch, because 95 is indeed >= 70, and the more specific "A" grade would never be reached.

A second example shows what happens with nested blocks, where indentation depth really starts to matter:

    for score in [55, 82, 91]:
        if score >= 60:
            print(score, "passed")
        else:
            print(score, "failed")

Here the for loop's body is everything indented one level under it, and the if/else inside is indented one level further again. Python threads through the list, and for each score decides which branch to take before moving to the next iteration. If the print(score, "failed") line were accidentally indented to match the for statement instead of the if, it would run on every iteration regardless of score, because it would no longer belong to the else block at all.

There are a few common mistakes worth calling out explicitly. The first and most notorious is mixing tabs and spaces. They can look identical on screen but Python treats them as different characters, so you get an IndentationError, or worse, a block that silently does not include the line you meant, because the two whitespace characters do not compare as equal depth. Editors that auto-insert tabs are a frequent culprit. The second is forgetting the colon at the end of an if, for, while, or def line; Python raises a SyntaxError immediately, but it is easy to miss when you are typing quickly. The third, subtler mistake is inconsistent indentation depth across a block - for example indenting one line under an if with two spaces and the next with four. Python will refuse to run this rather than guess which one you meant, because ambiguity here would be far more dangerous than a clear error.

Why this matters: because indentation is meaningful, Python code tends to look the way it behaves - you cannot have a block that is "logically" inside an if statement but visually outside it, the way you can accidentally produce with braces and bad formatting in other languages. This is a deliberate design choice that makes reading someone else's Python code far more reliable, but it also means your editor settings matter: consistently using four spaces (never tabs) and letting your editor show whitespace are not just nice habits, they are close to a professional requirement once you start collaborating with others.

Key takeaway: the colon opens a block and the indentation defines it, so consistent whitespace is correctness, not cosmetics.`,
          questions: [
            {
              text: 'How does Python delimit a block of code?',
              options: ['Curly braces', 'begin and end keywords', 'Consistent indentation', 'Semicolons at the end of each line'],
              correct_index: 2,
              explanation: 'Python uses consistent indentation to mark which lines belong to a block, rather than braces or keywords like begin and end.',
            },
            {
              text: 'What must appear at the end of an if, for, or def header line?',
              options: ['A semicolon', 'A colon', 'An opening brace', 'Nothing special'],
              correct_index: 1,
              explanation: 'The colon signals that an indented block follows. Omitting it raises a SyntaxError immediately.',
            },
            {
              text: 'Given the lesson example, what does print(grade) output when score is 95?',
              options: ['A', 'B', 'C', 'Nothing, no branch matches'],
              correct_index: 0,
              explanation: 'score >= 90 is checked first and is true for 95, so grade is set to "A" and the elif/else branches are skipped entirely.',
            },
            {
              text: 'Why is mixing tabs and spaces for indentation a problem?',
              options: ['Python treats them as different indentation, so blocks can break or raise IndentationError', 'Tabs are forbidden in every Python file', 'It slows the interpreter down at runtime', 'It changes the type of the variables inside the block'],
              correct_index: 0,
              explanation: 'Python distinguishes tab characters from space characters even though they may look the same in an editor, so mixing them can raise an IndentationError or silently change which lines belong to a block.',
            },
            {
              text: 'In an if/elif/else chain, how many of the branches can run for one pass?',
              options: ['All of the ones whose condition is true', 'At most one', 'Exactly two, the match plus the else', 'The else always runs in addition to any match'],
              correct_index: 1,
              explanation: 'Python checks each condition in order and runs only the first block whose condition is true, then skips the rest of the chain entirely.',
            },
            {
              text: 'In the nested for/if/else example, what would happen if the "failed" print line were indented to match the for statement instead of staying inside the else block?',
              options: ['It causes a SyntaxError immediately', 'It runs on every iteration of the loop regardless of the condition', 'It stops the loop from running at all', 'Nothing changes, Python ignores the extra indentation'],
              correct_index: 1,
              explanation: 'Indentation determines which block a line belongs to. If the print line is pulled out to the for statement level, it is no longer part of the else block and instead runs unconditionally on every pass of the loop.',
            },
            {
              text: 'What error does Python raise if you write "if score >= 70" without a trailing colon?',
              options: ['IndentationError', 'SyntaxError', 'TypeError', 'No error, colons are optional'],
              correct_index: 1,
              explanation: 'The colon is required to introduce the block that follows an if, for, while, or def header. Leaving it out is a SyntaxError, caught before the program even runs.',
            },
            {
              text: 'Can one part of a block be indented with two spaces and another line of the same block indented with four spaces?',
              options: ['Yes, Python only cares that both are indented at all', 'No, Python requires consistent indentation within a block and raises an error otherwise', 'Yes, but only if the file uses tabs elsewhere', 'Yes, as long as the block has fewer than five lines'],
              correct_index: 1,
              explanation: 'Python needs indentation to be applied consistently so it can tell where a block starts and ends. Mixing indentation widths within what should be one block raises an IndentationError.',
            },
            {
              text: 'What determines whether a line belongs to the body of a for loop or to the code that runs after the loop finishes?',
              options: ['Whether the line contains the word "for"', 'The line indentation level relative to the for statement', 'The order in which variables were created', 'Whether the line ends in a colon'],
              correct_index: 1,
              explanation: 'A line indented under the for header is part of the loop body and runs on every iteration; a line indented back to the for statement own level runs once, after the loop has completely finished.',
            },
            {
              text: 'Why does mixing tabs and spaces sometimes produce a silent bug instead of an immediate error?',
              options: ['Python always converts tabs to exactly four spaces automatically', 'Certain tab and space combinations can still resolve to a depth Python accepts, without meaning what you intended', 'Python ignores all whitespace when the file contains any tabs', 'It never happens, Python always raises an error for any tab in a file'],
              correct_index: 1,
              explanation: 'Python does check indentation consistency, but some tab and space combinations can still parse without error while visually appearing to align one way and logically grouping another, which is why relying on a single whitespace character throughout a file is safest.',
            },
          ],
        },
        hard: {
          title: 'Truthiness, Chained Comparisons, and Identity',
          body: `Python does not require conditions to be actual booleans. Any object can be tested for truth, because every object defines, or inherits, a rule for how it behaves in a boolean context. Empty containers, the number zero, empty strings, and None are all falsy; almost everything else, including negative numbers and single-space strings, is truthy. So "if items:" reads as "if items is non-empty," which is idiomatic Python, but it also means an empty list and None both take the false branch even though they mean very different things - one is "we checked and there was nothing," the other is "we never got a value at all."

Comparisons can be chained, and they mean what maths means, up to a point:

    x = 5
    print(1 < x < 10)
    print(x == 5 is True)

The first prints True, and reads naturally: is x between 1 and 10. The second is a trap. Chaining binds both parts together as if you had written (x == 5) and (5 is True), rather than testing whether x == 5 as a whole produces the boolean True. Since x == 5 evaluates to True, you might expect the whole line to be True, but the actual comparison being chained is (x == 5) and (5 is True) - and 5, the original integer, is not the same object as the boolean True, so that half is False, making the entire expression print False.

A second example makes the is-versus-== gap even sharper:

    a = 1000
    b = 1000
    print(a == b)
    print(a is b)

    c = 5
    d = 5
    print(c is d)

This prints True, then False, then True. a == b is True because the values are equal. a is b is False for large integers like 1000, because Python creates two separate integer objects in memory that happen to hold the same value. But c is d is True, because small integers (roughly -5 to 256) are cached and reused by the interpreter, so every reference to 5 in that range points at the same object. Nothing about your code changed structurally between the two cases - only the size of the integer did - which is exactly why relying on is for equality is dangerous: it can look correct by accident.

There are a few gotchas worth listing out. The first: never use is to compare numbers or strings for equality - always use ==, and reserve is strictly for None, True, and False, where identity is guaranteed by the language rather than by an implementation detail like integer caching. The second: chained comparisons look like maths but are really a shorthand for "and"-ing multiple pairwise comparisons, so mixing == and is inside a chain, as in x == 5 is True, rarely does what you expect and should just be avoided by breaking it into two explicit comparisons. The third: "if not items:" cannot distinguish None from an empty list, an empty string, or the number 0, so if your code needs to treat "no data at all" differently from "data exists but happens to be empty," you must check for None explicitly rather than relying on truthiness alone.

Why this matters: truthiness lets you write clean, idiomatic conditionals, but only once you understand its blind spots. Production bugs frequently trace back to exactly this kind of confusion - a function that returns None on error and an empty list when there is genuinely nothing to report, checked with a single "if not result:" that treats both cases identically. Being deliberate about is None versus == versus plain truthiness is a mark of someone who has been burned by this before.

Key takeaway: truthiness is not equality and identity is not equality, so test None with is None and everything else with ==.`,
          questions: [
            {
              text: 'Which of these values is truthy in Python?',
              options: ['0', '""', '[]', '"0"'],
              correct_index: 3,
              explanation: 'A non-empty string is truthy even if its only character is the digit zero. The other three options - the integer 0, the empty string, and the empty list - are all falsy.',
            },
            {
              text: 'What does the chained expression 1 < 5 < 10 evaluate to?',
              options: ['True', 'False', 'A SyntaxError, chaining is not allowed', 'The integer 1'],
              correct_index: 0,
              explanation: 'Chained comparisons test each pair in sequence: 1 < 5 and 5 < 10 are both true, so the whole expression is True.',
            },
            {
              text: 'What is the difference between == and is?',
              options: ['They are aliases for the same comparison', '== compares values, is compares object identity', 'is compares values, == compares object identity', '== works only on numbers, is works only on strings'],
              correct_index: 1,
              explanation: '== checks whether two objects have equal values, while is checks whether two names refer to the exact same object in memory.',
            },
            {
              text: 'What is the recommended way to check that a variable holds None?',
              options: ['if x == None:', 'if x is None:', 'if not x:', 'if x = None:'],
              correct_index: 1,
              explanation: 'is None checks identity against the single, unique None object, which is more reliable than == and avoids depending on any custom equality behavior a class might define.',
            },
            {
              text: 'Why can "if not items:" be a subtle bug when items may be None or an empty list?',
              options: ['It raises a TypeError when items is None', 'It only succeeds for lists, never for None', 'Both None and an empty list are falsy, so the branch cannot tell them apart', 'not always returns None rather than a boolean'],
              correct_index: 2,
              explanation: 'Both None and an empty list are falsy, so "if not items:" cannot tell you which one you actually have - you need "if items is None:" to check specifically for the missing case.',
            },
            {
              text: 'Given a = 1000; b = 1000, what does a is b typically evaluate to?',
              options: ['True, because Python always reuses integer objects', 'False, because Python creates two separate integer objects for large numbers', 'True, because == and is behave identically for integers', 'A TypeError, integers cannot be compared with is'],
              correct_index: 1,
              explanation: 'Python only caches small integers, roughly -5 to 256. Larger numbers like 1000 are typically created as separate objects even when their values match, so is often returns False even though == would return True.',
            },
            {
              text: 'Given c = 5; d = 5, what does c is d typically evaluate to, and why?',
              options: ['False, because 5 is too large to be cached', 'True, because small integers in a cached range are reused as the same object', 'True, because is and == are the same operator', 'False, is always returns False for numbers'],
              correct_index: 1,
              explanation: 'CPython caches small integers, so every reference to 5 in that cached range points at the same underlying object, making c is d True - but this is an implementation detail, not something to rely on.',
            },
            {
              text: 'How does Python actually evaluate x == 5 is True when x = 5?',
              options: ['As (x == 5) and (5 is True), which is False', 'As x == (5 is True), which is True', 'As a SyntaxError because is cannot follow ==', 'As True, because x == 5 evaluates first and short-circuits the rest'],
              correct_index: 0,
              explanation: 'Chained comparisons combine each adjacent pair with "and". Here that means (x == 5) and (5 is True). The first part is True, but 5 is not the same object as the boolean True, so the second part is False, making the whole expression False.',
            },
            {
              text: 'Which of the following values is falsy in a Python if statement?',
              options: ['None', '[0]', '" "', '"False"'],
              correct_index: 0,
              explanation: 'None is always falsy. A list containing 0, a string containing a single space, and the string "False" are all non-empty objects and are therefore truthy.',
            },
            {
              text: 'Why should is generally be avoided when comparing two strings or numbers for equality?',
              options: ['Because is is slower than == in every case', 'Because whether two equal values happen to be the same object can depend on implementation details like small-integer or string caching', 'Because is only works on booleans', 'Because is always raises an error when used on numbers'],
              correct_index: 1,
              explanation: 'Two equal values are not guaranteed to be the same object; whether they are can depend on caching behavior that is not part of the language guarantees, so relying on is for value equality can appear to work in testing and fail elsewhere.',
            },
          ],
        },
      },
    },
    {
      topic: 'functions',
      lessons: {
        easy: {
          title: 'Defining and Calling Functions',
          body: `A function packages a piece of work under a name so you can run it whenever you want, instead of copying and pasting the same lines over and over. You define one with def, list the inputs it expects in parentheses, and end the header with a colon. The indented body is what runs when you call it, and nothing inside that body executes until the function is actually called.

A small example:

    def greet(name):
        return "Hello, " + name

    message = greet("Ada")
    print(message)

The word after def is the function's name, name is a parameter, and "Ada" is the argument you pass in when calling the function. Walking through it: the def statement creates the function and stores it under the name greet, but does not run the body yet; greet("Ada") is what actually executes the body, with name bound to "Ada" for the duration of that call; return hands the resulting string back to whoever called the function, and it also ends the function immediately - no line after a return in the same block will run, even if there is more code written below it. message then holds that returned string, and print displays it.

A second example shows a function with more than one parameter and an intermediate calculation, which is closer to what real functions look like:

    def full_name(first, last):
        combined = first + " " + last
        return combined.title()

    print(full_name("ada", "lovelace"))

This prints "Ada Lovelace". full_name takes two parameters, joins them with a space in a local variable called combined, and then calls the string method .title() on the result before returning it - capitalising the first letter of each word. Notice that combined only exists while the function is running; you cannot access it from outside, which is a preview of scope, a topic the next lesson covers in depth.

There are a few mistakes that trip up almost everyone starting out. The first and most common is defining a function and never calling it: writing greet on its own line just refers to the function object itself, without running anything, so nothing gets printed and no error is raised either - the code just silently does nothing useful. You need the parentheses, greet("Ada"), to actually execute the body. The second common mistake is forgetting return: a function without one still runs fine and does not crash, but it hands back None by default, so message would print as None even though the function clearly built a greeting string internally - the value was just never sent back out. The third mistake is confusing print inside a function with return: printing a value shows it on the screen once, but does not make that value available to other code, whereas returning it lets the caller store it, pass it along, or use it in a further calculation. A fourth, smaller trap is misspelling the function name at the call site, or forgetting a required parameter entirely; both raise clear errors (NameError or TypeError) rather than failing silently, which is actually a kindness once you learn to read the message Python gives you.

Why this matters: functions are the basic unit of reuse and organization in essentially all real Python code. Once a program grows past a few dozen lines, functions are what let you name a chunk of logic, test it in isolation, and change how it works in one place instead of everywhere it was copy-pasted. A function with a clear name also documents intent - full_name("ada", "lovelace") tells a reader what is happening far better than three lines of inline string concatenation repeated in five different places would. Getting comfortable with the distinction between defining, calling, and returning early on makes every later topic - arguments, scope, recursion, decorators - much easier to reason about, because they are all built on this same basic shape.

Key takeaway: def defines, parentheses call, and return is what sends a value back out.`,
          questions: [
            {
              text: 'Which keyword defines a function in Python?',
              options: ['func', 'def', 'function', 'lambda'],
              correct_index: 1,
              explanation: 'Functions are created with the def keyword, followed by a name, a parenthesized parameter list, and a colon.',
            },
            {
              text: 'What does a function return if it has no return statement?',
              options: ['0', 'An empty string', 'None', 'It raises an error'],
              correct_index: 2,
              explanation: 'A function without an explicit return statement still completes normally, but Python automatically has it return None.',
            },
            {
              text: 'Given the lesson example, what does greet without parentheses evaluate to?',
              options: ['The string "Hello, "', 'The function object itself, uncalled', 'None', 'A NameError'],
              correct_index: 1,
              explanation: 'Writing greet without parentheses refers to the function object itself rather than running it. Only greet(...) with parentheses actually calls the function.',
            },
            {
              text: 'In def greet(name), what is name called?',
              options: ['An argument', 'A parameter', 'A return value', 'A keyword'],
              correct_index: 1,
              explanation: 'name is the placeholder listed in the function definition; the actual value passed in at the call site, like "Ada", is called the argument.',
            },
            {
              text: 'What happens to code written after a return statement in the same block?',
              options: ['It runs before the value is handed back', 'It runs only if the return value is None', 'It never runs, return exits the function', 'It raises a SyntaxError'],
              correct_index: 2,
              explanation: 'return exits the function immediately, so any code written after it in the same block is unreachable and never executes.',
            },
            {
              text: 'In def full_name(first, last): combined = first + " " + last; return combined.title(), what does .title() do to the combined string?',
              options: ['Converts the entire string to uppercase', 'Capitalizes the first letter of each word', 'Removes all spaces from the string', 'Reverses the order of the words'],
              correct_index: 1,
              explanation: 'The .title() string method capitalizes the first letter of every word in the string and lowercases the rest, which is why "ada lovelace" becomes "Ada Lovelace".',
            },
            {
              text: 'In the full_name example, can the variable combined be accessed from outside the function after it runs?',
              options: ['Yes, it becomes a global variable automatically', 'No, it only exists inside the function while it is running', 'Yes, but only if the function used a return statement', 'Yes, if you call the function more than once'],
              correct_index: 1,
              explanation: 'combined is a local variable created inside the function body. It is created when the function runs and discarded when the function finishes, regardless of what was returned.',
            },
            {
              text: 'What is the key difference between printing a value inside a function and returning it?',
              options: ['There is no difference, they both make the value usable elsewhere', 'print only displays the value on screen, while return makes the value available to whatever code called the function', 'return displays the value, while print sends it back to the caller', 'print can only be used outside of functions'],
              correct_index: 1,
              explanation: 'print() sends text to the screen for a human to read, but does not hand the value back to other code. return is what lets a caller store the result in a variable, pass it along, or use it in further calculations.',
            },
            {
              text: 'In the call greet("Ada"), what is "Ada" called?',
              options: ['A parameter', 'An argument', 'A keyword', 'A default value'],
              correct_index: 1,
              explanation: '"Ada" is the actual value supplied when calling the function, which makes it an argument. name, the placeholder in the function definition, is the parameter.',
            },
            {
              text: 'If you try to call a function on a line that appears before its def statement in the file, what typically happens?',
              options: ['Python runs the function anyway using a temporary placeholder', 'Python raises a NameError because the function does not exist yet', 'Python silently skips the call', 'Python moves the call to run after the def automatically'],
              correct_index: 1,
              explanation: 'Python executes a file from top to bottom, so a def statement must run before the name it creates can be called. Calling it earlier raises a NameError because that name is not yet defined.',
            },
          ],
        },
        medium: {
          title: 'Arguments, Defaults, and Scope',
          body: `Functions get flexible once you use default values and keyword arguments. A parameter with a default becomes optional, and callers can pass arguments by name instead of by position, which makes long calls far more readable, especially once a function takes more than two or three parameters.

For example:

    def power(base, exponent=2):
        return base ** exponent

    print(power(3))
    print(power(3, 3))
    print(power(exponent=3, base=2))

That prints 9, then 27, then 8. Walking through each call: power(3) supplies only base, so exponent falls back to its default of 2, giving 3 ** 2 = 9. power(3, 3) supplies both positionally, in the order they were defined, giving 3 ** 3 = 27. power(exponent=3, base=2) supplies both by keyword, so the order in the call does not matter - Python matches each value to the correctly named parameter regardless of position, giving 2 ** 3 = 8. Because exponent has a default, power(3) squares; keyword arguments can appear in any order, but positional arguments must come before them in the call, and in the def itself, parameters with defaults must come after those without, so def power(exponent=2, base) would be a SyntaxError.

A second example shows how defaults and keywords combine with more parameters, and where mixing styles gets interesting:

    def describe(name, age, city="Unknown", country="Unknown"):
        return f"{name}, {age}, from {city}, {country}"

    print(describe("Ada", 36, country="England"))

This prints "Ada, 36, from Unknown, England". name and age are supplied positionally, city is skipped entirely and falls back to its default, and country is supplied by keyword even though it is not the very next parameter after age - Python is happy to let you fill in later keyword arguments while skipping earlier optional ones, as long as every required parameter is covered by something.

Scope is the other half of this lesson, and it is just as important. Names assigned inside a function are local to it and vanish when it returns - they simply do not exist anywhere else. A function can read a name from the enclosing module without any special syntax, but assigning to that name inside the function creates a brand new local variable instead of changing the outer value, which surprises people who expect the global to update after the function runs. This happens because Python decides, when it compiles the function, whether a name is local or not based on whether it is ever assigned inside that function - and if it is assigned anywhere in the body, it is treated as local for the whole body, even before the assignment line runs, which can produce a confusing UnboundLocalError if you try to read the name before assigning it. If you genuinely need to rebind a module-level name from inside a function, you must declare it with the global keyword first, though passing values in as arguments and returning them out as results is almost always cleaner and easier to test.

A common mistake here is expecting a function to modify a variable from the outside just by assigning to a same-named parameter inside it - it will not, because assignment rebinds a local name rather than reaching back out to the caller's variable. A second mistake is calling global almost reflexively to "fix" this instead of restructuring the function to return the new value. A third is forgetting that reading and assigning are different: a function can read city from an enclosing scope freely, right up until the moment it also assigns to city anywhere in its own body, at which point Python treats every use of that name in the function as local.

Why this matters: defaults, keyword arguments, and predictable scope are what make Python function signatures act as a form of documentation - a well-designed def line tells a caller what is required, what is optional, and what the sensible fallback behavior is, without needing to read the function body at all.

Key takeaway: defaults make parameters optional, keywords make calls readable, and assignment inside a function stays local unless you say otherwise.`,
          questions: [
            {
              text: 'Given def power(base, exponent=2), what does power(4) return?',
              options: ['4', '8', '16', 'A TypeError, exponent is missing'],
              correct_index: 2,
              explanation: 'With exponent left out, it falls back to its default value of 2, so power(4) computes 4 ** 2, which is 16.',
            },
            {
              text: 'Where must parameters with default values appear in a def?',
              options: ['Before all parameters without defaults', 'After all parameters without defaults', 'Anywhere, the order is free', 'They must be the only parameters'],
              correct_index: 1,
              explanation: 'Python requires parameters with default values to come after all parameters without defaults, so the interpreter always knows which arguments are required.',
            },
            {
              text: 'What happens when you assign to a module-level name inside a function without declaring it global?',
              options: ['The module-level name is updated', 'A new local name is created and the outer one is unchanged', 'Python raises a NameError', 'The assignment is silently ignored'],
              correct_index: 1,
              explanation: 'Assigning to a name inside a function creates a new local variable with that name, leaving the module-level variable of the same name completely unchanged, unless global was declared first.',
            },
            {
              text: 'Which call is valid for def power(base, exponent=2)?',
              options: ['power(base=2, 3)', 'power(3, base=3)', 'power(exponent=3, base=2)', 'power(=3, =2)'],
              correct_index: 2,
              explanation: 'Keyword arguments can be given in any order because Python matches them by name rather than position. The other options either place a positional argument after a keyword one or use invalid syntax.',
            },
            {
              text: 'What is the main reason to prefer keyword arguments in a long call?',
              options: ['They run faster than positional arguments', 'They make the meaning of each argument explicit at the call site', 'They allow a function to take more arguments than it defines', 'They convert arguments to the correct type automatically'],
              correct_index: 1,
              explanation: 'Keyword arguments make each value purpose explicit at the call site, which is especially valuable once a function has several parameters and the order is hard to remember.',
            },
            {
              text: 'In describe("Ada", 36, country="England") for def describe(name, age, city="Unknown", country="Unknown"), what value does city take?',
              options: ['"England"', '"Unknown"', 'None', 'An error is raised because city was skipped'],
              correct_index: 1,
              explanation: 'city is not supplied in the call, either positionally or by keyword, so it falls back to its default value of "Unknown". Only country is overridden, by keyword.',
            },
            {
              text: 'Why would def power(exponent=2, base): raise a SyntaxError?',
              options: ['Because exponent cannot have a default value', 'Because a parameter without a default cannot come after one that has a default', 'Because base is not a valid parameter name', 'Because functions can only have one default parameter'],
              correct_index: 1,
              explanation: 'Python requires all parameters without defaults to be listed before any parameters that have defaults, so the interpreter can always tell which arguments are mandatory.',
            },
            {
              text: 'What causes an UnboundLocalError when a function reads a variable before assigning it, even though a variable with the same name exists at module level?',
              options: ['Python treats the name as local for the entire function body because it is assigned somewhere in that body', 'The module-level variable was deleted before the function ran', 'Python always requires the global keyword to read any outer variable', 'The variable was never created anywhere in the program'],
              correct_index: 0,
              explanation: 'Once Python sees a name assigned anywhere inside a function, it treats every use of that name within the function as local, even lines that appear before the assignment - so reading it too early raises an error instead of quietly falling back to the module-level value.',
            },
            {
              text: 'What must you do to make an assignment inside a function actually change a module-level variable of the same name?',
              options: ['Nothing, assignment always updates the outer variable', 'Declare the name with the global keyword before assigning to it', 'Pass the variable in as an argument named global', 'Use a return statement instead of an assignment'],
              correct_index: 1,
              explanation: 'Without a global declaration, assigning to a name inside a function only creates a new local variable. Declaring global name first tells Python to rebind the module-level variable instead.',
            },
            {
              text: 'In the describe() example, is it valid to supply country by keyword while skipping the earlier optional parameter city entirely?',
              options: ['No, optional parameters must be filled in order', 'Yes, keyword arguments can fill in later optional parameters while earlier ones fall back to their defaults', 'No, this raises a TypeError for a missing argument', 'Yes, but only if city is passed a value of None explicitly'],
              correct_index: 1,
              explanation: 'Keyword arguments are matched by name, not position, so you can supply country without touching city at all - city simply uses its own default value.',
            },
          ],
        },
        hard: {
          title: 'Mutable Default Arguments and Closures',
          body: `A default argument is evaluated exactly once, when the def statement runs, not each time the function is called. That single evaluation happens at function-definition time, which is usually when the module is first imported or the script starts. If that default is a mutable object like a list or a dict, every call that relies on the default shares the exact same underlying object, and changes made through one call persist and show up on every later call - the object never gets "reset."

Watch what happens:

    def add(item, bucket=[]):
        bucket.append(item)
        return bucket

    print(add(1))
    print(add(2))

This prints [1] and then [1, 2], not [1] and [2]. Walking through it: when Python first sees the def statement, it creates one empty list and attaches it to add as the default value for bucket, permanently, for the lifetime of the function object. The first call, add(1), does not receive a fresh empty list - it receives that same permanent list, appends 1 to it, and returns it. The second call, add(2), again receives that identical object, which already contains [1], appends 2, giving [1, 2]. The list was created once and kept its contents across calls, because default arguments are not "reset" between calls the way local variables are.

The fix is the None sentinel: default the parameter to None, then create a fresh list inside the body only when the caller did not supply one.

    def add_fixed(item, bucket=None):
        if bucket is None:
            bucket = []
        bucket.append(item)
        return bucket

    print(add_fixed(1))
    print(add_fixed(2))

This now correctly prints [1] and then [2], because each call that omits bucket gets a brand new empty list created fresh inside the function body, rather than sharing one permanent object from definition time. None itself is immutable and safe to reuse as a default precisely because nothing can accumulate state on it.

Closures have a related and equally surprising behavior. A function defined inside a loop captures the loop variable itself, not the value it happened to hold at the moment the inner function was defined, because closures in Python look up free variables by name at call time, not by value at definition time. So all the functions you build across iterations of the loop end up seeing the variable's final value once the loop has finished, regardless of what it was when each one was created.

    makers = []
    for i in range(3):
        makers.append(lambda: i)

    print([m() for m in makers])

This prints [2, 2, 2], not [0, 1, 2] as many people expect. Every lambda in the list looks up the same variable i, and by the time any of them is actually called, the loop has already finished and i is 2. Binding the value as a default parameter, like lambda i=i: i, freezes the value at definition time instead, because default arguments, as just shown, are evaluated once, immediately, giving [0, 1, 2] as expected. functools.partial achieves the same freezing effect a different way.

There are a few mistakes worth naming directly. First, using [], {}, or any mutable literal as a default argument, even when it "seems fine" because you always intend to pass your own value - it is a latent bug waiting for the one caller who omits the argument. Second, assuming a loop variable is automatically captured by value in a closure the way it would be in some other languages - it is not, in Python it is captured by reference to the name. Third, "fixing" the mutable-default bug by copying the default inside the function without also handling the None case, which still leaves the very first call sharing state if callers rely on the default being reused deliberately.

Why this matters: this is one of the most common real-world Python bugs, precisely because the code runs without error and looks correct on the first call - it only breaks on the second or third call, often much later in a program's life, which makes it hard to spot in a quick review and easy to ship.

Key takeaway: never use a mutable object as a default argument; default to None and build the real value inside the function.`,
          questions: [
            {
              text: 'When is a function default argument evaluated?',
              options: ['Once, when the def statement executes', 'Every time the function is called', 'Only on the first call to the function', 'Lazily, the first time the parameter is read'],
              correct_index: 0,
              explanation: 'Default argument values are evaluated a single time, when the def statement itself runs, not on every call - which is exactly why a mutable default can accumulate state across calls.',
            },
            {
              text: 'Given def add(item, bucket=[]) that appends and returns bucket, what does the second call add(2) print after add(1)?',
              options: ['[2]', '[1, 2]', '[1]', 'None'],
              correct_index: 1,
              explanation: 'Both calls share the same list object created once at definition time, so the second call appends to a list that already contains 1 from the first call, producing [1, 2].',
            },
            {
              text: 'What is the standard fix for a mutable default argument?',
              options: ['Default to None and create the object inside the function body', 'Default to an empty tuple instead of an empty list', 'Copy the default with list(bucket) before returning it', 'Declare the parameter global'],
              correct_index: 0,
              explanation: 'Defaulting the parameter to the immutable None and creating a new list inside the function body only when needed ensures each call that omits the argument gets its own fresh list.',
            },
            {
              text: 'Why does a default of 0 or "" not cause the same problem as a default of []?',
              options: ['Numbers and strings are immutable, so no call can mutate the shared default in place', 'They are re-evaluated on every call, unlike lists', 'Python special-cases scalar defaults to copy them', 'They are stored in local scope rather than on the function'],
              correct_index: 0,
              explanation: 'Numbers and strings cannot be mutated in place - any operation on them produces a new object rather than changing the existing one, so there is no shared, mutable state for a default value to accumulate.',
            },
            {
              text: 'Functions created in a loop that reference the loop variable all end up seeing the same value. Why?',
              options: ['The closure captures the variable itself, so all of them read its final value', 'The functions overwrite each other in memory', 'Loop variables are always None after the loop ends', 'Closures copy the value but Python rounds it to the last one'],
              correct_index: 0,
              explanation: 'A closure remembers the variable itself, not a snapshot of its value, so when the inner functions are finally called, they all look up the same variable and see whatever value it holds after the loop has finished.',
            },
            {
              text: 'What does [m() for m in makers] print for makers = []; for i in range(3): makers.append(lambda: i)?',
              options: ['[0, 1, 2]', '[2, 2, 2]', '[0, 0, 0]', 'A NameError because i no longer exists'],
              correct_index: 1,
              explanation: 'Every lambda captures the same variable i by reference, not the value it held when the lambda was created. By the time any lambda is called, the loop has already finished and i holds its final value, 2, so all three calls return 2.',
            },
            {
              text: 'How can you fix the loop-closure problem so each function captures the value of i at the time it was created?',
              options: ['Use a while loop instead of a for loop', 'Bind i as a default argument, for example lambda i=i: i', 'Call del i immediately after the loop', 'It cannot be fixed, closures always see the final value'],
              correct_index: 1,
              explanation: 'Default arguments are evaluated once, immediately, when the function is defined. Binding lambda i=i: i captures the current value of i into the default at that exact point in the loop, rather than leaving the lambda looking up i later.',
            },
            {
              text: 'Why is the mutable-default-argument bug particularly easy to miss during code review?',
              options: ['Python raises a warning that is easy to ignore', 'The function works correctly on its first call and only misbehaves on subsequent calls', 'It only happens when the function is never called at all', 'It only affects functions with more than five parameters'],
              correct_index: 1,
              explanation: 'The very first call to a function with a mutable default often behaves exactly as expected, since the shared object starts out looking fresh. The problem only becomes visible once the function is called again and the accumulated state from the previous call is still there.',
            },
            {
              text: 'Why can copying the default inside the function body still leave a lurking problem if you have not also handled the None case?',
              options: ['It has no problem at all, this fully fixes the bug', 'Because slicing does not actually copy a list', 'Because the very first call still shares the one permanent default object before any copy is made', 'Because bucket[:] raises a TypeError on lists'],
              correct_index: 2,
              explanation: 'Copying bucket inside the function happens after the default has already been evaluated once and attached to the function. Any earlier call that mutated the original default before your copy line runs still leaves the underlying shared-object problem in place.',
            },
            {
              text: 'What is one way functools.partial relates to the closure-in-loop problem?',
              options: ['It deletes the loop variable after each iteration', 'It can freeze a value into a new callable at the time it is created, similar to binding a default argument', 'It prevents lambdas from being created inside loops', 'It converts closures into regular functions with no captured variables'],
              correct_index: 1,
              explanation: 'functools.partial creates a new callable with some arguments already filled in at the moment you call it, which freezes that value in place, achieving the same effect as binding a variable as a default argument to avoid the delayed-lookup problem of closures.',
            },
          ],
        },
      },
    },
    {
      topic: 'collections',
      lessons: {
        easy: {
          title: 'Lists, Tuples, and Dictionaries',
          body: `Python gives you a few built-in containers, and picking the right one for the job is most of the work of writing clean code. A list is an ordered, changeable sequence written with square brackets - you can add, remove, and reorder items after creating it. A tuple is an ordered sequence that cannot be changed after creation, written with parentheses - once built, its contents are fixed. A dictionary maps keys to values and is written with curly braces, letting you look things up by a meaningful name instead of a numeric position.

Here they are side by side:

    scores = [90, 72, 85]
    point = (3, 4)
    ages = {"Ada": 36, "Alan": 41}

    print(scores[0])
    print(ages["Ada"])
    scores.append(100)

That prints 90 and then 36, and leaves scores as [90, 72, 85, 100]. Walking through it: scores[0] asks for the item at position 0, which is the first item, 90; ages["Ada"] asks the dictionary for the value stored under the key "Ada", which is 36; scores.append(100) adds a new item onto the end of the list, growing it in place rather than creating a new list. Lists and tuples are indexed by position starting at 0, so the first item is always index 0 and never index 1; dictionaries are indexed by key instead, so the order values were inserted does not affect how you look them up.

A second example shows why a tuple's immutability is actually a feature rather than a limitation, and shows a common dictionary operation:

    point = (3, 4)
    x, y = point
    print(x, y)

    ages["Grace"] = 30
    print(ages)

This prints "3 4" and then a dictionary with three names now in it. The line x, y = point is called unpacking: it pulls the two values out of the tuple into two separate variables in one step, which reads cleanly precisely because a tuple's fixed length and order can be trusted - you know point will always have exactly two elements representing coordinates, and nothing in the program can silently resize it. ages["Grace"] = 30 adds a brand-new key-value pair to the dictionary; the same syntax would update the value if "Grace" already existed as a key.

The usual gotchas are worth calling out clearly. The first is indexing: the first item is at index 0, so the last item of a three-item list is at index 2, not 3, and asking for scores[3] raises an IndexError because there is no fourth item. The second is trying to change a tuple after creating it - point[0] = 5 raises a TypeError, because tuples deliberately do not support item assignment, which is exactly what makes them safe to use as fixed records or dictionary keys. The third is dictionary lookups: asking for a key that is not there, like ages["Grace"] before it was added, raises a KeyError rather than returning some default value, which is why ages.get("Grace") is so useful in practice - it returns None instead of crashing the program, letting you handle a missing key gracefully. A fourth, easy-to-miss detail is that dictionaries preserve the order items were inserted in modern Python, which is convenient for printing them predictably, but that insertion order is not the same thing as being sorted, and it plays no part in how a lookup by key works.

Why this matters: almost every real Python program is built out of lists, tuples, and dictionaries wired together - a list of dictionaries representing rows of data, a dictionary whose values are lists, a tuple used as an immutable dictionary key. Knowing which container to reach for, and why, is one of the clearest signals of Python fluency, because the wrong choice usually still "works" on simple cases but breaks down or becomes awkward as a program grows. Choosing a dictionary instead of a list of tuples for lookups by name, for instance, is often the difference between code that scans every item one by one and code that jumps straight to the answer.

Key takeaway: lists change, tuples do not, and dictionaries look things up by key rather than by position.`,
          questions: [
            {
              text: 'Which built-in container cannot be changed after it is created?',
              options: ['list', 'tuple', 'dict', 'set'],
              correct_index: 1,
              explanation: 'A tuple cannot be modified after it is created, which is exactly why it works well as a fixed record or a dictionary key. Lists, dicts, and sets are all changeable after creation.',
            },
            {
              text: 'Given scores = [90, 72, 85], what does scores[1] return?',
              options: ['90', '72', '85', 'An IndexError'],
              correct_index: 1,
              explanation: 'Indexing starts at 0, so scores[0] is 90 and scores[1], the second item, is 72.',
            },
            {
              text: 'What happens when you look up a missing key with ages["Grace"]?',
              options: ['It returns None', 'It returns an empty string', 'It raises a KeyError', 'It adds the key with value None'],
              correct_index: 2,
              explanation: 'Looking up a key that does not exist in a dictionary raises a KeyError rather than returning any default value.',
            },
            {
              text: 'What does ages.get("Grace") return when the key is absent?',
              options: ['None', 'A KeyError', '0', 'An empty dict'],
              correct_index: 0,
              explanation: '.get() is designed to fail gracefully: it returns None, or a fallback value you specify, instead of raising an error when the key is missing.',
            },
            {
              text: 'Which method adds a single item to the end of a list?',
              options: ['add', 'push', 'append', 'insert_last'],
              correct_index: 2,
              explanation: '.append() adds a single item onto the end of a list in place. add, push, and insert_last are not real list methods.',
            },
            {
              text: 'What does the unpacking x, y = point do when point = (3, 4)?',
              options: ['It raises a TypeError because tuples cannot be unpacked', 'It assigns 3 to x and 4 to y in one step', 'It creates a new tuple called x, y', 'It assigns the entire tuple to both x and y'],
              correct_index: 1,
              explanation: 'Tuple unpacking matches each variable on the left to the corresponding position in the tuple on the right, so x becomes 3 and y becomes 4 in a single statement.',
            },
            {
              text: 'What happens if you try to run point[0] = 5 on a tuple point = (3, 4)?',
              options: ['It updates the tuple to (5, 4)', 'It raises a TypeError because tuples do not support item assignment', 'It silently does nothing', 'It creates a new variable called point[0]'],
              correct_index: 1,
              explanation: 'Tuples are immutable, so they do not support assigning to an index after creation. Attempting it raises a TypeError.',
            },
            {
              text: 'If "Grace" is not already a key in ages, what does ages["Grace"] = 30 do?',
              options: ['Raises a KeyError, because the key does not exist yet', 'Adds "Grace" as a new key mapped to 30', 'Silently does nothing since the key was not found first', 'Raises a TypeError because you must use .get() to add keys'],
              correct_index: 1,
              explanation: 'Assigning to a dictionary with a new key adds that key-value pair. A KeyError only happens when reading a missing key, not when assigning to one.',
            },
            {
              text: 'Why are tuples often preferred over lists for representing something like a fixed (x, y) coordinate pair?',
              options: ['Tuples take up less code to type than lists', 'Tuples cannot be changed after creation, which guarantees the pair always stays exactly two values in order', 'Tuples are automatically sorted', 'Lists cannot store numbers, only tuples can'],
              correct_index: 1,
              explanation: 'Because a tuple cannot be resized or reassigned in place after creation, code that expects exactly two coordinate values can trust that the tuple will never accidentally grow, shrink, or get reordered elsewhere in the program.',
            },
            {
              text: 'Given scores = [90, 72, 85], which expression raises an IndexError?',
              options: ['scores[0]', 'scores[2]', 'scores[3]', 'scores[-1]'],
              correct_index: 2,
              explanation: 'scores has three items at indices 0, 1, and 2. There is no index 3, so accessing scores[3] raises an IndexError. scores[-1] is valid and refers to the last item.',
            },
          ],
        },
        medium: {
          title: 'Iterating, Slicing, and Comprehensions',
          body: `Once you have a collection you usually want to walk it, transform it, or pull a piece out of it. A for loop iterates over the items directly, one at a time, and enumerate gives you the index alongside each item without you having to track a counter manually. Iterating a dictionary yields its keys by default, while .items() yields key and value pairs together, and .values() yields just the values - three different views of the same underlying data depending on what you need.

Slicing pulls out a section with start:stop, where stop is excluded from the result:

    letters = ["a", "b", "c", "d"]
    print(letters[1:3])
    print(letters[-1])

    squares = [n * n for n in range(4)]
    print(squares)

That prints ["b", "c"], then "d", then [0, 1, 4, 9]. Walking through it: letters[1:3] starts at index 1 ("b") and stops before index 3, so it includes indices 1 and 2 but not 3 - this "stop excluded" rule is why the slice has exactly two items, 3 minus 1. letters[-1] uses a negative index, which counts from the end: -1 is always the last item regardless of the list's length, which is handy because you do not need to know len(letters) in advance. The comprehension [n * n for n in range(4)] builds a brand-new list by running n * n for each n produced by range(4), which yields 0, 1, 2, 3 - giving squares [0, 1, 4, 9].

A second example shows enumerate and a filtering comprehension together, which is closer to realistic code:

    names = ["Ada", "Alan", "Grace"]
    for index, name in enumerate(names):
        print(index, name)

    short_names = [n for n in names if len(n) <= 4]
    print(short_names)

This prints each name with its position (0 Ada, 1 Alan, 2 Grace), then ["Ada", "Alan"]. enumerate(names) produces pairs of (index, item) as you loop, so index and name are unpacked directly in the for header instead of you writing a separate counter variable and incrementing it yourself. The comprehension short_names adds an if clause after the for, which filters: it only keeps names where len(n) <= 4 is true, so "Grace", at five letters, is left out.

The classic trap here is mutating a list while looping over it directly. Removing items as you iterate makes the loop skip elements, because the loop tracks a position internally, and removing an item shifts every later item one position to the left - the loop's internal counter then points past the item that just slid into the gap, so it never gets visited. A second mistake is slicing with the wrong sign or bound and getting an empty result instead of an error - letters[3:1] silently returns an empty list rather than raising anything, because Python treats a start-after-stop slice as "nothing to give you" rather than a mistake. A third mistake is forgetting that a comprehension always builds a new list; writing a comprehension purely for its side effects, like calling a function inside it and discarding the result, works but wastes memory building a list you throw away - a plain for loop is more honest in that case.

Why this matters: comprehensions and slicing are not just shorter syntax, they are how idiomatic Python signals intent - a comprehension reads as "build a new collection from this one," which is exactly the kind of clarity that makes code reviews faster and bugs rarer, compared to a loop with an append call buried a few lines down.

Key takeaway: slices exclude their stop index, negative indices count backwards, and comprehensions build a new collection rather than mutating one in place.`,
          questions: [
            {
              text: 'Given letters = ["a", "b", "c", "d"], what does letters[1:3] return?',
              options: ['["a", "b", "c"]', '["b", "c"]', '["b", "c", "d"]', '["a", "b"]'],
              correct_index: 1,
              explanation: 'Slicing with 1:3 starts at index 1 and stops before index 3, including indices 1 and 2 only, which are "b" and "c".',
            },
            {
              text: 'What does letters[-1] return for that same list?',
              options: ['"a"', '"d"', 'An IndexError', 'The whole list reversed'],
              correct_index: 1,
              explanation: 'A negative index counts backward from the end of the sequence, so -1 always refers to the last item, which is "d" here.',
            },
            {
              text: 'What does [n * n for n in range(4)] produce?',
              options: ['[1, 4, 9, 16]', '[0, 1, 4, 9]', '[0, 1, 2, 3]', '[1, 2, 3, 4]'],
              correct_index: 1,
              explanation: 'range(4) produces 0, 1, 2, 3, and squaring each one gives 0, 1, 4, 9 in that order.',
            },
            {
              text: 'What do you get when you iterate directly over a dictionary with a for loop?',
              options: ['Its keys', 'Its values', 'Key and value pairs as tuples', 'Nothing, dicts are not iterable'],
              correct_index: 0,
              explanation: 'A plain for loop over a dictionary yields its keys by default. To get values or key-value pairs you need .values() or .items() respectively.',
            },
            {
              text: 'Why is removing items from a list while iterating over it a bug?',
              options: ['Lists become read-only inside a for loop', 'The positions shift as items are removed, so the loop skips elements', 'It always raises a RuntimeError immediately', 'The loop restarts from the beginning after each removal'],
              correct_index: 1,
              explanation: 'As items are removed, every later item shifts one position to the left, but the loop keeps advancing its internal position counter as usual, so it ends up skipping over the item that just slid into the vacated spot.',
            },
            {
              text: 'What does enumerate(names) produce when looping over a list of names?',
              options: ['Just the names, unchanged', 'Pairs of (index, name) for each item', 'Only the last name in the list', 'A dictionary mapping names to their length'],
              correct_index: 1,
              explanation: 'enumerate() wraps an iterable and yields (index, item) pairs, so you can unpack both the position and the value directly in the for header without maintaining a separate counter.',
            },
            {
              text: 'What does letters[3:1] return for letters = ["a", "b", "c", "d"]?',
              options: ['An IndexError', 'A reversed slice, ["d", "c"]', 'An empty list', '["b", "c", "d"]'],
              correct_index: 2,
              explanation: 'When the start index is after the stop index in a normal forward slice, Python does not raise an error or reverse anything - it simply finds there is nothing between them and returns an empty list.',
            },
            {
              text: 'Given names = ["Ada", "Alan", "Grace"], what does [n for n in names if len(n) <= 4] produce?',
              options: ['["Ada", "Alan", "Grace"]', '["Ada", "Alan"]', '["Grace"]', '[]'],
              correct_index: 1,
              explanation: '"Ada" (3 letters) and "Alan" (4 letters) satisfy len(n) <= 4, but "Grace" has 5 letters and is filtered out by the if clause.',
            },
            {
              text: 'What does calling .items() on a dictionary yield while iterating?',
              options: ['Only the keys', 'Only the values', 'Key-value pairs as tuples', 'A sorted list of keys'],
              correct_index: 2,
              explanation: '.items() gives you both the key and the value together as a tuple for each entry, which is useful when you need both pieces of information in the loop body.',
            },
            {
              text: 'Why might writing a list comprehension purely to run a function for its side effects, while discarding the resulting list, be considered poor style?',
              options: ['It is actually a syntax error in Python', 'It builds and immediately discards a list, wasting memory, when a plain for loop expresses the same intent more clearly', 'Comprehensions cannot call functions inside them', 'It runs the function fewer times than a for loop would'],
              correct_index: 1,
              explanation: 'A comprehension is meant to signal that a new collection is being built. Using one just to trigger side effects still constructs and then throws away a list, which is both wasteful and misleading to a reader expecting a collection to be produced.',
            },
          ],
        },
        hard: {
          title: 'Aliasing, Shallow Copies, and Hashable Keys',
          body: `Assigning a list to a second name does not copy it. Both names simply point at the same object in memory, so a change made through one name is immediately visible through the other, because there is really only one list - just two labels for it. This is called aliasing, and it is the source of a great many quiet, hard-to-trace bugs, because the code that changes the list and the code that is surprised by the change can be far apart in a program.

Compare the three cases:

    a = [1, 2]
    b = a
    c = a[:]
    b.append(3)
    print(a, c)

This prints [1, 2, 3] and [1, 2]. Walking through it: b = a does not create a new list, it makes b another name for the exact same list object that a refers to, so b was an alias, and appending through it changed the one underlying list, which is why a also shows the 3. c = a[:] is different: slicing the entire list creates a genuinely new list object with copied-in references to the same elements, so c was a shallow copy taken before the append happened, and it was left untouched by the later mutation.

But a shallow copy only duplicates the outer container, one level deep - it does not recursively copy everything inside. A second example makes this visible:

    matrix = [[1, 2], [3, 4]]
    shallow = matrix[:]
    shallow[0].append(99)
    print(matrix)

This prints [[1, 2, 99], [3, 4]] - notice that matrix changed too, even though we only appended through shallow. shallow is indeed a new outer list, separate from matrix, but its elements are the exact same inner list objects as matrix's elements, not copies of them. So shallow[0] and matrix[0] are aliases of each other, even though shallow and matrix themselves are not. Mutating one of those shared inner objects shows up through both outer containers. For genuine independence at every level, you need copy.deepcopy(matrix), which recursively copies every nested object rather than stopping at the first level.

Dictionary keys have their own, related rule: they must be hashable, which in practice means immutable. A tuple can be a key, because its contents cannot change after creation, so its hash value stays stable for its entire lifetime; a list cannot be a key, and trying to use one raises a TypeError, because lists are mutable and their hash would need to change whenever their contents changed - which would break the dictionary's internal bucketing.

    valid = {(0, 0): "origin", (1, 1): "diagonal"}
    print(valid[(0, 0)])
    # invalid = {[0, 0]: "origin"}  # raises TypeError: unhashable type: 'list'

That is not an arbitrary restriction imposed for no reason: a key that could change after being inserted would land in the wrong internal bucket the moment it changed, and the dictionary would no longer be able to find it by its new value or, in some cases, its old one either - it would simply become unfindable, a kind of silent data loss.

A few mistakes are worth naming outright. First, assuming that b = a "copies" a list the way it might in languages that pass by value - it does not, Python names are always references. Second, taking a shallow copy and assuming it is fully independent, only to be surprised later when a nested list or dict inside it turns out to still be shared. Third, trying to use a list as a dictionary key or a set element because "it looked like it should just work," rather than converting it to a tuple first when the values inside will not change.

Why this matters: this exact family of bugs - unintended aliasing and shallow copies - is one of the most common sources of confusing behavior in real Python codebases, especially in code that passes lists and dicts into functions and back out again. Understanding when you have one object with two names, versus two separate objects, is foundational to debugging almost anything involving nested data.

Key takeaway: assignment aliases, slicing copies one level deep, and only deepcopy fully detaches nested structures.`,
          questions: [
            {
              text: 'After a = [1, 2]; b = a; b.append(3), what is a?',
              options: ['[1, 2]', '[1, 2, 3]', '[3]', 'A TypeError is raised'],
              correct_index: 1,
              explanation: 'b = a does not copy the list; it makes b another name for the same object as a. Appending through b therefore changes the one underlying list that both names point to.',
            },
            {
              text: 'What does a shallow copy of a list containing inner lists share with the original?',
              options: ['Nothing, it is fully independent', 'The inner list objects, which remain shared', 'The outer list object, which remains shared', 'Only the length, not the contents'],
              correct_index: 1,
              explanation: 'A shallow copy only creates a new outer container. The elements inside it, including any nested lists or dicts, are the same objects as in the original, so mutating a nested element affects both.',
            },
            {
              text: 'Which of these can be used as a dictionary key?',
              options: ['A list', 'A tuple of integers', 'A dict', 'A set'],
              correct_index: 1,
              explanation: 'Tuples are immutable and therefore hashable, so they can be used as dictionary keys. Lists, dicts, and sets are all mutable and cannot.',
            },
            {
              text: 'What is required to fully detach a nested structure from the original?',
              options: ['list(original)', 'original[:]', 'copy.copy(original)', 'copy.deepcopy(original)'],
              correct_index: 3,
              explanation: 'copy.deepcopy() recursively copies every nested object, producing a structure with no shared objects at any level. Slicing or copy.copy() only copy the outer container.',
            },
            {
              text: 'Why must dictionary keys be hashable?',
              options: ['A key that could change would hash to a different bucket and become unfindable', 'Hashing is what makes dictionaries keep their insertion order', 'It lets Python store the keys as strings internally', 'It guarantees the keys can be sorted'],
              correct_index: 0,
              explanation: 'A dictionary uses a key hash to decide which internal bucket to store it in. If a key could change after being inserted, its hash could change too, and the dictionary would no longer be able to find it in the bucket where it was originally placed.',
            },
            {
              text: 'Given matrix = [[1, 2], [3, 4]]; shallow = matrix[:]; shallow[0].append(99), what does matrix look like afterward?',
              options: ['[[1, 2], [3, 4]], unchanged', '[[1, 2, 99], [3, 4]], because the inner lists are shared between matrix and shallow', 'A TypeError is raised', '[[1, 2], [3, 4], [99]]'],
              correct_index: 1,
              explanation: 'matrix[:] copies only the outer list. shallow[0] and matrix[0] still refer to the exact same inner list object, so appending through shallow[0] is visible through matrix as well.',
            },
            {
              text: 'Why does trying to use a list as a dictionary key raise a TypeError?',
              options: ['Lists are too large to hash efficiently', 'Lists are mutable, so they cannot be hashed reliably', 'Dictionaries only accept string keys', 'Python reserves square brackets for a different purpose in dictionaries'],
              correct_index: 1,
              explanation: 'Because a list can change after it is created, it cannot be given a stable hash value, and dictionaries rely on a stable hash to know where to store and later find a key.',
            },
            {
              text: 'Given valid = {(0, 0): "origin", (1, 1): "diagonal"}, what does valid[(0, 0)] return?',
              options: ['"diagonal"', '"origin"', 'A KeyError', 'None'],
              correct_index: 1,
              explanation: 'The tuple (0, 0) is used as a key mapped to the string "origin", so looking it up returns that value directly.',
            },
            {
              text: 'What is the essential difference between b = a and c = a[:] when a is a list?',
              options: ['There is no difference, both create independent copies', 'b becomes another name for the same list as a, while c is a new, separate list with the same elements', 'b creates a new list, while c aliases a', 'c only works if a contains numbers'],
              correct_index: 1,
              explanation: 'b = a is a plain assignment, so b and a refer to the identical object. c = a[:] slices the whole list, which builds a new outer list object, making c independent of a at the top level.',
            },
            {
              text: 'You have data shaped like coordinates, such as [0, 0], that you want to use as a dictionary key and that should never change. What is the safest approach?',
              options: ['Use the list directly as the key', 'Convert it to a tuple, such as (0, 0), before using it as a key', 'Convert it to a string representation only', 'Wrap it in another list before using it as a key'],
              correct_index: 1,
              explanation: 'Converting the coordinate to a tuple gives an immutable, hashable object that can safely be used as a dictionary key, while preserving the original values and order.',
            },
          ],
        },
      },
    },
  ],
};
