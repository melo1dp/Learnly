// Python Basics: syntax, functions, and collections, each at three difficulties.
export default {
  title: 'Python Basics',
  description: 'An introduction to Python syntax, functions, and built-in collections, from first statements to the edge cases that trip people up.',
  topics: [
    {
      topic: 'syntax',
      lessons: {
        easy: {
          title: 'Variables, Types, and Printing',
          body: `Python runs your code line by line. A variable is just a name you point at a value, and you create one with a single equals sign. You never declare a type: Python figures out the type from the value you assign, and the same name can later point at a value of a different type.

Here is a first program:

    name = "Ada"
    age = 36
    print(name, age)
    print(type(age))

That prints "Ada 36" and then the class of age, which is int. The main built-in types you meet early are int for whole numbers, float for decimals, str for text, and bool for True or False. Note that True and False are capitalised in Python.

A common mistake is confusing = with ==. A single equals sign assigns a value; a double equals sign compares two values and gives back True or False. Writing "if age = 36" is a syntax error, not a comparison. Another gotcha: quotes matter. The value 36 is a number you can do maths with, while "36" is a string, so "36" + 1 raises a TypeError.

Key takeaway: names are labels, values carry the type, and = assigns while == compares.`,
          questions: [
            {
              text: 'What does the expression type(3.0) return in Python?',
              options: ['int', 'float', 'str', 'decimal'],
              correct_index: 1,
            },
            {
              text: 'Which operator compares two values for equality?',
              options: ['=', '==', ':=', '=>'],
              correct_index: 1,
            },
            {
              text: 'What is the result of "36" + 1?',
              options: ['37', 'The string "361"', 'A TypeError is raised', 'The float 37.0'],
              correct_index: 2,
            },
            {
              text: 'How is the boolean "true" written in Python?',
              options: ['true', 'TRUE', 'True', 'yes'],
              correct_index: 2,
            },
            {
              text: 'After running x = 5 and then x = "five", what type is x?',
              options: ['int, because it was assigned first', 'str', 'Both, Python keeps the old type too', 'This raises an error because the type changed'],
              correct_index: 1,
            },
          ],
        },
        medium: {
          title: 'Indentation, Blocks, and Control Flow',
          body: `Most languages group statements with curly braces. Python groups them with indentation. Every line indented to the same depth under a header line belongs to the same block, and the header line always ends in a colon. That means whitespace is part of the grammar, not just style.

A short example:

    score = 72
    if score >= 90:
        grade = "A"
    elif score >= 70:
        grade = "B"
    else:
        grade = "C"
    print(grade)

This prints B. The elif and else branches only run when the branches above them are false, so ordering the conditions matters: if you tested score >= 70 first, a score of 95 would also land in that branch.

The classic gotcha is mixing tabs and spaces. They can look identical on screen but Python treats them as different, and you get an IndentationError or, worse, a block that silently does not include the line you meant. Pick four spaces and stay consistent. Forgetting the colon at the end of an if, for, or def line is the other frequent slip.

Key takeaway: the colon opens a block and the indentation defines it, so consistent whitespace is correctness, not cosmetics.`,
          questions: [
            {
              text: 'How does Python delimit a block of code?',
              options: ['Curly braces', 'begin and end keywords', 'Consistent indentation', 'Semicolons at the end of each line'],
              correct_index: 2,
            },
            {
              text: 'What must appear at the end of an if, for, or def header line?',
              options: ['A semicolon', 'A colon', 'An opening brace', 'Nothing special'],
              correct_index: 1,
            },
            {
              text: 'Given the lesson example, what does print(grade) output when score is 95?',
              options: ['A', 'B', 'C', 'Nothing, no branch matches'],
              correct_index: 0,
            },
            {
              text: 'Why is mixing tabs and spaces for indentation a problem?',
              options: ['Python treats them as different indentation, so blocks can break or raise IndentationError', 'Tabs are forbidden in every Python file', 'It slows the interpreter down at runtime', 'It changes the type of the variables inside the block'],
              correct_index: 0,
            },
            {
              text: 'In an if/elif/else chain, how many of the branches can run for one pass?',
              options: ['All of the ones whose condition is true', 'At most one', 'Exactly two, the match plus the else', 'The else always runs in addition to any match'],
              correct_index: 1,
            },
          ],
        },
        hard: {
          title: 'Truthiness, Chained Comparisons, and Identity',
          body: `Python does not require conditions to be actual booleans. Any object can be tested for truth. Empty containers, the number zero, empty strings and None are all falsy; almost everything else is truthy. So "if items:" reads as "if items is non-empty", which is idiomatic, but it also means an empty list and None both take the false branch even though they mean very different things.

Comparisons can be chained, and they mean what maths means:

    x = 5
    print(1 < x < 10)
    print(x == 5 is True)

The first prints True. The second is a trap: chaining binds both parts, so it means (x == 5) and (5 is True), and 5 is not the object True, so it prints False.

The deepest gotcha here is == versus is. The double equals sign asks whether two values are equal; is asks whether they are the same object in memory. Small ints and short strings are often cached, so a is b may be True by accident and mislead you. Only use is for None, True, and False.

Key takeaway: truthiness is not equality and identity is not equality, so test None with is None and everything else with ==.`,
          questions: [
            {
              text: 'Which of these values is truthy in Python?',
              options: ['0', '""', '[]', '"0"'],
              correct_index: 3,
            },
            {
              text: 'What does the chained expression 1 < 5 < 10 evaluate to?',
              options: ['True', 'False', 'A SyntaxError, chaining is not allowed', 'The integer 1'],
              correct_index: 0,
            },
            {
              text: 'What is the difference between == and is?',
              options: ['They are aliases for the same comparison', '== compares values, is compares object identity', 'is compares values, == compares object identity', '== works only on numbers, is works only on strings'],
              correct_index: 1,
            },
            {
              text: 'What is the recommended way to check that a variable holds None?',
              options: ['if x == None:', 'if x is None:', 'if not x:', 'if x = None:'],
              correct_index: 1,
            },
            {
              text: 'Why can "if not items:" be a subtle bug when items may be None or an empty list?',
              options: ['It raises a TypeError when items is None', 'It only succeeds for lists, never for None', 'Both None and an empty list are falsy, so the branch cannot tell them apart', 'not always returns None rather than a boolean'],
              correct_index: 2,
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
          body: `A function packages a piece of work under a name so you can run it whenever you want. You define one with def, list the inputs it expects in parentheses, and end the header with a colon. The indented body is what runs when you call it.

A small example:

    def greet(name):
        return "Hello, " + name

    message = greet("Ada")
    print(message)

The word after def is the function's name, name is a parameter, and "Ada" is the argument you pass in. return hands a value back to whoever called the function, and it also ends the function immediately: no line after a return in the same block will run.

The most common beginner mistake is defining a function and never calling it. Writing greet on its own just refers to the function object; you need the parentheses, greet("Ada"), to actually run it. The second common mistake is forgetting return: a function without one still works, but it hands back None, so message would print as None.

Key takeaway: def defines, parentheses call, and return is what sends a value back out.`,
          questions: [
            {
              text: 'Which keyword defines a function in Python?',
              options: ['func', 'def', 'function', 'lambda'],
              correct_index: 1,
            },
            {
              text: 'What does a function return if it has no return statement?',
              options: ['0', 'An empty string', 'None', 'It raises an error'],
              correct_index: 2,
            },
            {
              text: 'Given the lesson example, what does greet without parentheses evaluate to?',
              options: ['The string "Hello, "', 'The function object itself, uncalled', 'None', 'A NameError'],
              correct_index: 1,
            },
            {
              text: 'In def greet(name), what is name called?',
              options: ['An argument', 'A parameter', 'A return value', 'A keyword'],
              correct_index: 1,
            },
            {
              text: 'What happens to code written after a return statement in the same block?',
              options: ['It runs before the value is handed back', 'It runs only if the return value is None', 'It never runs, return exits the function', 'It raises a SyntaxError'],
              correct_index: 2,
            },
          ],
        },
        medium: {
          title: 'Arguments, Defaults, and Scope',
          body: `Functions get flexible once you use default values and keyword arguments. A parameter with a default becomes optional, and callers can pass arguments by name instead of by position, which makes long calls readable.

For example:

    def power(base, exponent=2):
        return base ** exponent

    print(power(3))
    print(power(3, 3))
    print(power(exponent=3, base=2))

That prints 9, then 27, then 8. Because exponent has a default, power(3) squares. Keyword arguments can appear in any order, but positional arguments must come before them in the call, and in the def parameters with defaults must come after those without.

Scope is the other half. Names assigned inside a function are local to it and vanish when it returns. A function can read a name from the enclosing module, but assigning to that name inside the function creates a new local one instead of changing the outer value, which surprises people who expect the global to update. If you genuinely need to rebind a module-level name, declare it with the global keyword, though passing values in and returning them out is almost always cleaner.

Key takeaway: defaults make parameters optional, keywords make calls readable, and assignment inside a function stays local unless you say otherwise.`,
          questions: [
            {
              text: 'Given def power(base, exponent=2), what does power(4) return?',
              options: ['4', '8', '16', 'A TypeError, exponent is missing'],
              correct_index: 2,
            },
            {
              text: 'Where must parameters with default values appear in a def?',
              options: ['Before all parameters without defaults', 'After all parameters without defaults', 'Anywhere, the order is free', 'They must be the only parameters'],
              correct_index: 1,
            },
            {
              text: 'What happens when you assign to a module-level name inside a function without declaring it global?',
              options: ['The module-level name is updated', 'A new local name is created and the outer one is unchanged', 'Python raises a NameError', 'The assignment is silently ignored'],
              correct_index: 1,
            },
            {
              text: 'Which call is valid for def power(base, exponent=2)?',
              options: ['power(base=2, 3)', 'power(3, base=3)', 'power(exponent=3, base=2)', 'power(=3, =2)'],
              correct_index: 2,
            },
            {
              text: 'What is the main reason to prefer keyword arguments in a long call?',
              options: ['They run faster than positional arguments', 'They make the meaning of each argument explicit at the call site', 'They allow a function to take more arguments than it defines', 'They convert arguments to the correct type automatically'],
              correct_index: 1,
            },
          ],
        },
        hard: {
          title: 'Mutable Default Arguments and Closures',
          body: `A default argument is evaluated once, when the def statement runs, not each time the function is called. If that default is a mutable object like a list or a dict, every call that relies on the default shares the exact same object, and changes persist between calls.

Watch what happens:

    def add(item, bucket=[]):
        bucket.append(item)
        return bucket

    print(add(1))
    print(add(2))

This prints [1] and then [1, 2], not [1] and [2]. The list was created once and kept its contents. The fix is the None sentinel: default the parameter to None, then create a fresh list inside the body when the caller did not supply one.

Closures have a related surprise. A function defined inside a loop captures the variable, not the value it had at definition time, so all the functions you build in the loop see the variable's final value. Binding it as a default parameter, or using functools.partial, freezes the value at definition time.

Key takeaway: never use a mutable object as a default argument; default to None and build the real value inside the function.`,
          questions: [
            {
              text: 'When is a function default argument evaluated?',
              options: ['Once, when the def statement executes', 'Every time the function is called', 'Only on the first call to the function', 'Lazily, the first time the parameter is read'],
              correct_index: 0,
            },
            {
              text: 'Given def add(item, bucket=[]) that appends and returns bucket, what does the second call add(2) print after add(1)?',
              options: ['[2]', '[1, 2]', '[1]', 'None'],
              correct_index: 1,
            },
            {
              text: 'What is the standard fix for a mutable default argument?',
              options: ['Default to None and create the object inside the function body', 'Default to an empty tuple instead of an empty list', 'Copy the default with list(bucket) before returning it', 'Declare the parameter global'],
              correct_index: 0,
            },
            {
              text: 'Why does a default of 0 or "" not cause the same problem as a default of []?',
              options: ['Numbers and strings are immutable, so no call can mutate the shared default in place', 'They are re-evaluated on every call, unlike lists', 'Python special-cases scalar defaults to copy them', 'They are stored in local scope rather than on the function'],
              correct_index: 0,
            },
            {
              text: 'Functions created in a loop that reference the loop variable all end up seeing the same value. Why?',
              options: ['The closure captures the variable itself, so all of them read its final value', 'The functions overwrite each other in memory', 'Loop variables are always None after the loop ends', 'Closures copy the value but Python rounds it to the last one'],
              correct_index: 0,
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
          body: `Python gives you a few built-in containers, and picking the right one is most of the work. A list is an ordered, changeable sequence written with square brackets. A tuple is an ordered sequence that cannot be changed after creation, written with parentheses. A dictionary maps keys to values and is written with curly braces.

Here they are side by side:

    scores = [90, 72, 85]
    point = (3, 4)
    ages = {"Ada": 36, "Alan": 41}

    print(scores[0])
    print(ages["Ada"])
    scores.append(100)

That prints 90 and then 36, and leaves scores as [90, 72, 85, 100]. Lists and tuples are indexed by position starting at 0; dictionaries are indexed by key.

The usual gotcha is indexing. The first item is at index 0, so the last item of a three-item list is at index 2, and asking for scores[3] raises an IndexError. With dictionaries, asking for a key that is not there raises a KeyError, which is why ages.get("Grace") is useful: it returns None instead of blowing up.

Key takeaway: lists change, tuples do not, and dictionaries look things up by key rather than by position.`,
          questions: [
            {
              text: 'Which built-in container cannot be changed after it is created?',
              options: ['list', 'tuple', 'dict', 'set'],
              correct_index: 1,
            },
            {
              text: 'Given scores = [90, 72, 85], what does scores[1] return?',
              options: ['90', '72', '85', 'An IndexError'],
              correct_index: 1,
            },
            {
              text: 'What happens when you look up a missing key with ages["Grace"]?',
              options: ['It returns None', 'It returns an empty string', 'It raises a KeyError', 'It adds the key with value None'],
              correct_index: 2,
            },
            {
              text: 'What does ages.get("Grace") return when the key is absent?',
              options: ['None', 'A KeyError', '0', 'An empty dict'],
              correct_index: 0,
            },
            {
              text: 'Which method adds a single item to the end of a list?',
              options: ['add', 'push', 'append', 'insert_last'],
              correct_index: 2,
            },
          ],
        },
        medium: {
          title: 'Iterating, Slicing, and Comprehensions',
          body: `Once you have a collection you usually want to walk it. A for loop iterates over the items directly, and enumerate gives you the index alongside each item. Iterating a dictionary yields its keys, while items() yields key and value pairs together.

Slicing pulls out a section with start:stop, where stop is excluded:

    letters = ["a", "b", "c", "d"]
    print(letters[1:3])
    print(letters[-1])

    squares = [n * n for n in range(4)]
    print(squares)

That prints ["b", "c"], then "d", then [0, 1, 4, 9]. Negative indices count from the end, so -1 is the last item. A list comprehension is a compact way to build a new list from an existing iterable, and it can filter too, with an if clause after the for.

The classic trap is mutating a list while looping over it. Removing items as you iterate makes the loop skip elements, because the positions shift underneath you. Build a new list with a comprehension instead, or iterate over a copy with letters[:].

Key takeaway: slices exclude their stop index, negative indices count backwards, and comprehensions build a new collection rather than mutating one in place.`,
          questions: [
            {
              text: 'Given letters = ["a", "b", "c", "d"], what does letters[1:3] return?',
              options: ['["a", "b", "c"]', '["b", "c"]', '["b", "c", "d"]', '["a", "b"]'],
              correct_index: 1,
            },
            {
              text: 'What does letters[-1] return for that same list?',
              options: ['"a"', '"d"', 'An IndexError', 'The whole list reversed'],
              correct_index: 1,
            },
            {
              text: 'What does [n * n for n in range(4)] produce?',
              options: ['[1, 4, 9, 16]', '[0, 1, 4, 9]', '[0, 1, 2, 3]', '[1, 2, 3, 4]'],
              correct_index: 1,
            },
            {
              text: 'What do you get when you iterate directly over a dictionary with a for loop?',
              options: ['Its keys', 'Its values', 'Key and value pairs as tuples', 'Nothing, dicts are not iterable'],
              correct_index: 0,
            },
            {
              text: 'Why is removing items from a list while iterating over it a bug?',
              options: ['Lists become read-only inside a for loop', 'The positions shift as items are removed, so the loop skips elements', 'It always raises a RuntimeError immediately', 'The loop restarts from the beginning after each removal'],
              correct_index: 1,
            },
          ],
        },
        hard: {
          title: 'Aliasing, Shallow Copies, and Hashable Keys',
          body: `Assigning a list to a second name does not copy it. Both names point at the same object, so a change through one is visible through the other. This is aliasing, and it is the source of a great many quiet bugs.

Compare the three cases:

    a = [1, 2]
    b = a
    c = a[:]
    b.append(3)
    print(a, c)

This prints [1, 2, 3] and [1, 2]. b was an alias, so appending through it changed a; c was a shallow copy taken with a slice, so it was untouched. But a shallow copy only duplicates the outer container. If the list holds inner lists, the copy still shares those inner objects, and mutating one of them shows up in both. For that you need copy.deepcopy.

Dictionary keys have their own rule: they must be hashable, which in practice means immutable. A tuple can be a key, a list cannot, and trying to use a list raises a TypeError. That is not an arbitrary restriction: a key that could change would land in the wrong bucket and become unfindable.

Key takeaway: assignment aliases, slicing copies one level deep, and only deepcopy fully detaches nested structures.`,
          questions: [
            {
              text: 'After a = [1, 2]; b = a; b.append(3), what is a?',
              options: ['[1, 2]', '[1, 2, 3]', '[3]', 'A TypeError is raised'],
              correct_index: 1,
            },
            {
              text: 'What does a shallow copy of a list containing inner lists share with the original?',
              options: ['Nothing, it is fully independent', 'The inner list objects, which remain shared', 'The outer list object, which remains shared', 'Only the length, not the contents'],
              correct_index: 1,
            },
            {
              text: 'Which of these can be used as a dictionary key?',
              options: ['A list', 'A tuple of integers', 'A dict', 'A set'],
              correct_index: 1,
            },
            {
              text: 'What is required to fully detach a nested structure from the original?',
              options: ['list(original)', 'original[:]', 'copy.copy(original)', 'copy.deepcopy(original)'],
              correct_index: 3,
            },
            {
              text: 'Why must dictionary keys be hashable?',
              options: ['A key that could change would hash to a different bucket and become unfindable', 'Hashing is what makes dictionaries keep their insertion order', 'It lets Python store the keys as strings internally', 'It guarantees the keys can be sorted'],
              correct_index: 0,
            },
          ],
        },
      },
    },
  ],
};
