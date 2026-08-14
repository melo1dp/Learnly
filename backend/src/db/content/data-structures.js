// Intro course on the data structures every programmer reaches for daily.
export default {
  title: 'Data Structures Essentials',
  description: 'A hands-on introduction to arrays, hash maps, and the running-time thinking that tells you which one to reach for.',
  category: 'Computing',
  level: 'advanced',
  rating: 4.8,
  topics: [
    {
      topic: 'arrays',
      lessons: {
        easy: {
          title: 'Arrays and Indexing',
          body: `An array stores a run of values in one continuous block of memory. Every slot is the same size, so the computer can jump straight to any slot by doing a little arithmetic on the starting address. That is why reading arr[3] costs the same as reading arr[3000].

Positions are numbered from zero. The first element lives at index 0, and an array of length 5 has its last element at index 4.

    const scores = [90, 75, 60, 88, 42];
    scores[0];             // 90
    scores[4];             // 42
    scores.length;         // 5
    scores[2] = 65;        // now [90, 75, 65, 88, 42]

Walk through what happens when you write scores[2] = 65. JavaScript does not create a new array or shift anything around — it takes the address where the array starts, adds two slots' worth of offset, and overwrites whatever was sitting there. The array's length does not change, because you replaced an element rather than adding one.

Here is a second example that trips people up: reading past the end.

    const letters = ['a', 'b', 'c'];
    letters[5];            // undefined, no error
    letters[5] = 'f';      // letters is now ['a','b','c', <2 empty slots>, 'f']
    letters.length;        // 6

Reading an out-of-range index does not throw in JavaScript; it silently returns undefined. Writing to one is worse — it stretches the array and leaves holes behind, which is rarely what you want and can make later loops behave strangely, since some engines treat holes differently from an explicit undefined.

The classic beginner mistake is the off-by-one error: writing scores[scores.length] to reach the last item. That index is one past the end, so you get undefined instead of a value. The last index is always length minus 1.

A second mistake is assuming a string index never works like a number. scores['2'] behaves exactly like scores[2], because JavaScript coerces the string to a valid array-index string first — but scores['02'] does not, because '02' is not a canonical array-index string. That inconsistency has bitten more than one developer building keys dynamically.

A third mistake is confusing an index with a count. If someone says "give me the third score," they mean scores[2], not scores[3] — that sentence is really asking for the element at position two once you count from zero.

Why this matters: nearly every data structure you will meet later — a hash map's bucket array, a heap's internal storage, even a string's character sequence — is built on top of this exact indexing trick. Interviewers ask index questions not because off-by-one errors are hard, but because sloppy indexing is one of the single most common sources of real production bugs: an image carousel that shows a blank slide, a leaderboard that drops the last player, a pagination bug that repeats one row. Getting comfortable with "index equals position minus one" early pays off every time you touch an array again.

Key takeaway: arrays give you instant access to any position, as long as you remember that counting starts at zero.`,
          questions: [
            {
              text: 'In the array [10, 20, 30, 40], what is the value at index 2?',
              options: ['10', '20', '30', '40'],
              correct_index: 2,
              explanation: 'Index 2 is the third element counting from zero: index 0 is 10, index 1 is 20, index 2 is 30, index 3 is 40.',
            },
            {
              text: 'An array has length 8. What is the index of its last element?',
              options: ['6', '7', '8', '9'],
              correct_index: 1,
              explanation: 'Indices run from 0 up to length minus 1, so a length-8 array has valid indices 0 through 7 and its last element sits at index 7.',
            },
            {
              text: 'Why can an array read any element in constant time?',
              options: [
                'It scans from the front until it finds the element',
                'It keeps a sorted copy of the data alongside it',
                'Elements are equal-sized and stored contiguously, so the address can be computed',
                'It stores a separate pointer for every element it holds',
              ],
              correct_index: 2,
              explanation: 'Because every element is the same size and packed next to the last, the runtime can compute any element’s address with simple arithmetic instead of walking through preceding elements.',
            },
            {
              text: 'What does scores[scores.length] evaluate to in JavaScript for a non-empty array?',
              options: ['The last element', 'undefined', 'The first element', 'It throws an error'],
              correct_index: 1,
              explanation: 'scores.length is one past the last valid index, so reading that slot returns undefined instead of throwing or wrapping around.',
            },
            {
              text: 'Which operation on an array is NOT constant time?',
              options: [
                'Reading the element at a known index',
                'Overwriting the element at a known index',
                'Searching an unsorted array for a given value',
                'Appending an element at the very end when capacity allows',
              ],
              correct_index: 2,
              explanation: 'Searching an unsorted array may require checking every element before concluding the value is not present, unlike direct index access which jumps straight to the address.',
            },
            {
              text: 'What is the index of the first element in an array?',
              options: ['-1', '0', '1', 'It depends on the language'],
              correct_index: 1,
              explanation: 'JavaScript arrays, like most mainstream languages, are zero-indexed, so the first slot is always index 0.',
            },
            {
              text: 'Which line correctly reads the last element of an array called arr without hardcoding its length?',
              options: ['arr[arr.length]', 'arr[arr.length - 1]', 'arr[-1]', 'arr.last()'],
              correct_index: 1,
              explanation: 'Since indices run from 0 to length - 1, the last valid index is length - 1; arr[arr.length] is one past the end, and plain JavaScript arrays do not support negative indices the way Python’s do.',
            },
            {
              text: 'const arr = [5, 10, 15]; arr[1] = 99; What is arr now?',
              options: ['[5, 99, 15]', '[99, 10, 15]', '[5, 10, 99]', '[5, 10, 15, 99]'],
              correct_index: 0,
              explanation: 'Assigning to arr[1] overwrites the element already at index 1 in place; it does not add a new element or change the array’s length.',
            },
            {
              text: 'What does arr.length return for const arr = [];?',
              options: ['undefined', 'null', '0', 'Throws an error'],
              correct_index: 2,
              explanation: 'An empty array still has a length property; it is simply 0 because there are no elements stored.',
            },
            {
              text: 'You want the value at "the fourth score" in the array scores. Which index do you use?',
              options: ['scores[4]', 'scores[3]', 'scores[5]', 'scores["fourth"]'],
              correct_index: 1,
              explanation: 'Counting from zero, index 0 is the first element, index 1 the second, index 2 the third, and index 3 the fourth.',
            },
            {
              text: 'What happens when you read letters[10] on const letters = ["a", "b", "c"];?',
              options: ['It throws a RangeError', 'It returns undefined', 'It returns null', 'It returns the last element'],
              correct_index: 1,
              explanation: 'Reading past the end of a JavaScript array does not throw; there is simply nothing stored at index 10, so the result is undefined.',
            },
            {
              text: 'Which statement about array indices is true in JavaScript?',
              options: [
                'Indices can be negative to count from the end',
                'Indices start at 1 by default',
                'Indices start at 0 and go up to length - 1',
                'Indices must be declared before use',
              ],
              correct_index: 2,
              explanation: 'Valid indices run from 0 through length - 1; unlike Python, plain JavaScript arrays do not support negative indices for counting from the end.',
            },
            {
              text: 'const nums = [1, 2, 3]; nums[5] = 6; What is nums.length afterward?',
              options: ['3', '5', '6', 'Throws an error'],
              correct_index: 2,
              explanation: 'Writing to index 5 stretches the array so that index 5 becomes valid, making the length 6, with indices 3 and 4 left as empty slots.',
            },
            {
              text: 'Why is arr[3000] just as fast to read as arr[0] for a large array?',
              options: [
                'Because JavaScript caches the most recently read index',
                'Because elements are equal-sized and contiguous, so the address is computed directly',
                'Because engines pre-sort arrays in memory',
                'Because arrays under 10,000 elements are always fast',
              ],
              correct_index: 1,
              explanation: 'Contiguous, equal-sized storage lets the runtime compute any element’s address with simple arithmetic, so there is no need to walk through everything before it.',
            },
            {
              text: 'A teammate writes scores[scores.length] to grab the last score and gets undefined. What is the bug?',
              options: [
                'scores.length is off by one in general',
                'That index is one past the last valid index; it should be scores.length - 1',
                'Arrays cannot be read using the length property',
                'The array needs to be sorted first',
              ],
              correct_index: 1,
              explanation: 'scores.length is the count of elements, but the last valid index is one less than that count, since indexing starts at 0.',
            },
          ],
        },
        medium: {
          title: 'Inserting and Removing Elements',
          body: `Reading from an array is cheap, but changing its shape is not. Because the elements sit shoulder to shoulder in memory, inserting or deleting in the middle forces every element after that point to shuffle over by one slot.

Removing the front element of a 1000-item array means moving 999 items. Removing the last element moves nothing.

    const q = ['a', 'b', 'c', 'd'];
    q.push('e');     // O(1), appends at the end
    q.pop();         // O(1), removes from the end
    q.shift();       // O(n), everything slides left
    q.splice(1, 0, 'x');  // O(n), everything slides right

Walk through q.shift() on ['a', 'b', 'c', 'd']: it removes 'a', then 'b' moves into index 0, 'c' moves into index 1, and 'd' moves into index 2 — three moves for a four-element array. Do that on a 100,000-item array and you are paying for 99,999 moves just to drop one item off the front.

Here is a second example that shows insertion at an arbitrary index, not just the ends:

    const names = ['ann', 'bob', 'cy'];
    names.splice(1, 0, 'xin');   // insert 'xin' at index 1
    // names is now ['ann', 'xin', 'bob', 'cy']

Everything from index 1 onward — 'bob' and 'cy' — has to shift one slot to the right to make room for 'xin'. The closer the insertion point is to the front, the more elements move; inserting at the very end is just push, and costs nothing extra.

So an array makes a fine stack, where you only ever touch the end, but a poor queue, where you add at one end and remove from the other.

A common gotcha is deleting while looping forwards. Each removal shifts the remaining items left, so the loop index skips the element that slid into the vacated slot. Iterate backwards, or build a new filtered array instead.

A second gotcha is reaching for delete arr[i] instead of splice. delete removes the value but leaves a hole in place — the length does not shrink, and the slot becomes empty rather than gone, which quietly breaks any code that assumes the array is dense.

A third gotcha is calling shift or unshift inside a loop that runs n times, expecting it to be cheap because each call "just moves a pointer." It does not — each call is its own O(n) shuffle, so an innocent-looking loop that shifts once per iteration is secretly O(n squared) overall.

Why this matters: this is exactly the tradeoff behind choosing a data structure in real systems. A browser's undo stack, a call stack, a "recently viewed" list capped at the end — all fine with a plain array, because they only touch one end. A task queue or a sliding-window buffer that needs fast removal from the front is the wrong job for an array; that is why real queues are usually built on a linked list or a circular buffer instead. Recognizing "which end am I touching, and how often" before reaching for Array is the difference between code that stays fast at scale and code that quietly turns quadratic under load.

Key takeaway: array ends are cheap, array middles are expensive, and mutating during a forward loop silently skips elements.`,
          questions: [
            {
              text: 'What is the worst-case time to insert an element at the front of an array of n elements?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 2,
              explanation: 'Inserting at the front forces every existing element to shift one slot over to make room, which is n moves in the worst case.',
            },
            {
              text: 'Which pair of operations is constant time on a JavaScript array?',
              options: ['push and pop', 'shift and unshift', 'splice and shift', 'unshift and pop'],
              correct_index: 0,
              explanation: 'push and pop only touch the end of the array, so no other elements need to move; shift and unshift touch the front and must shift every remaining element.',
            },
            {
              text: 'You need a queue with fast adds and fast removes at opposite ends. Why is a plain array a poor fit?',
              options: [
                'Arrays cannot store more than a fixed number of items',
                'Removing from the front is O(n) because the remaining elements must shift',
                'Arrays cannot hold objects, only primitives',
                'Reading the front element requires scanning the whole array',
              ],
              correct_index: 1,
              explanation: 'A queue needs cheap removal from one end, but removing from the front of an array shifts every remaining element down by one, which is O(n).',
            },
            {
              text: 'You loop i from 0 upward and remove matching elements as you go. What goes wrong?',
              options: [
                'The loop never terminates',
                'The array is reversed as a side effect',
                'Elements shift left, so the item after a removed one is skipped',
                'The removed elements are still counted in .length',
              ],
              correct_index: 2,
              explanation: 'When an element is removed, everything after it slides into the vacated index; the loop’s index then lands past what used to be the next item, so one element gets skipped.',
            },
            {
              text: 'Removing the last element of an n-element array requires how many element shifts?',
              options: ['n shifts', 'n minus 1 shifts', 'Zero shifts', 'Half of n shifts'],
              correct_index: 2,
              explanation: 'Nothing sits after the last element, so removing it does not require moving any other element.',
            },
            {
              text: 'What is the time complexity of Array.prototype.push when the underlying buffer has spare capacity?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n squared)'],
              correct_index: 0,
              explanation: 'Pushing into existing capacity just writes to the next free slot and bumps the length property, with no shifting required.',
            },
            {
              text: 'delete arr[1] on ["a", "b", "c"] does what to arr.length?',
              options: [
                'Decreases it by 1',
                'Leaves it unchanged, but arr[1] becomes an empty slot',
                'Sets it to 0',
                'Throws an error',
              ],
              correct_index: 1,
              explanation: 'delete removes the value stored at that index but does not resize the array or shift anything — it leaves a hole and the length stays the same.',
            },
            {
              text: 'Which real-world use case is a plain array well-suited for?',
              options: [
                'A stack of undo actions, only ever pushed and popped from the end',
                'A queue of print jobs served strictly first-in-first-out from the front',
                'A priority queue that always removes the smallest item',
                'A sliding window that regularly drops elements from the front',
              ],
              correct_index: 0,
              explanation: 'An undo stack only touches the end of the array, which is the cheap side; the other options regularly need cheap removal from the front, which is where arrays are slow.',
            },
            {
              text: 'names.splice(0, 0, "x") on a 500-element array does what, in terms of cost?',
              options: [
                'O(1), because splice always trims the low end',
                'O(n), because all 500 existing elements shift right by one',
                'O(log n), because splice does a binary search for the insert point',
                'O(n squared), because splice re-sorts the array',
              ],
              correct_index: 1,
              explanation: 'Inserting at index 0 pushes every one of the existing 500 elements one slot to the right, which is a linear amount of work.',
            },
            {
              text: 'Calling arr.shift() once per iteration inside a loop that runs n times has what overall cost?',
              options: [
                'O(n), since shift itself is O(1)',
                'O(n log n)',
                'O(n squared), since each shift is itself O(n)',
                'O(1), amortised across the loop',
              ],
              correct_index: 2,
              explanation: 'Each shift call is O(n) on its own, and doing that n times multiplies out to O(n squared) — an easy trap for code that looks like a simple linear loop.',
            },
            {
              text: 'Why is inserting near the front of a large array more expensive than inserting near the back?',
              options: [
                'Because arrays are stored back-to-front in memory',
                'Because more elements sit after a front insertion point and must all shift over',
                'Because the front of an array is read-only in most languages',
                'Because JavaScript re-sorts the array after every insert',
              ],
              correct_index: 1,
              explanation: 'Every element after the insertion point has to move over by one slot, and inserting near the front means nearly the whole array counts as "after" that point.',
            },
            {
              text: 'What is the difference between arr.pop() and arr.shift()?',
              options: [
                'pop removes from the end in O(1); shift removes from the front in O(n)',
                'pop removes from the front; shift removes from the end',
                'Both are O(n), just at opposite ends',
                'pop only works on arrays of numbers',
              ],
              correct_index: 0,
              explanation: 'pop only touches the last slot so nothing else moves, while shift has to close the gap left at the front by moving every remaining element down by one.',
            },
            {
              text: 'You need to remove every element matching a condition while iterating and mutating in place. What is the safe approach?',
              options: [
                'Iterate forward and splice as you go',
                'Iterate backward, or build a new array with filter, instead of mutating forward',
                'Use shift in a while loop',
                'Sort the array first so matches are grouped together',
              ],
              correct_index: 1,
              explanation: 'Iterating backward means a removal only shifts elements already visited, so nothing gets skipped; filter avoids the problem entirely by building a fresh array.',
            },
            {
              text: 'What does splice(1, 0, "x") do differently from splice(1, 1, "x")?',
              options: [
                'They are identical',
                'The first inserts "x" at index 1 without removing anything; the second replaces the element at index 1 with "x"',
                'The first removes an element; the second inserts one',
                'Neither removes nor inserts anything',
              ],
              correct_index: 1,
              explanation: 'The second argument to splice is how many elements to remove starting at that index — 0 means insert only, 1 means replace one element.',
            },
            {
              text: 'Which of these is a hidden O(n) cost that is easy to miss when skimming code?',
              options: [
                'arr.push(x) inside a loop',
                'arr[i] inside a loop',
                'arr.unshift(x) inside a loop',
                'arr.length inside a loop',
              ],
              correct_index: 2,
              explanation: 'unshift has to shift every existing element to make room at the front, so calling it repeatedly inside a loop hides an O(n) cost behind a short, innocent-looking line.',
            },
          ],
        },
        hard: {
          title: 'Dynamic Arrays and Amortised Growth',
          body: `A real array has a fixed capacity, yet push never seems to run out of room. Behind the scenes a dynamic array keeps a buffer larger than its length. When the buffer fills, it allocates a new one, copies everything across, and frees the old one. That single push costs O(n).

The trick is the growth factor. Capacity is doubled rather than nudged up by one, so resizes become exponentially rarer as the array grows.

    // Growing to n by doubling:
    // copies = 1 + 2 + 4 + ... + n/2 < n
    // total work for n pushes < 2n  ->  O(1) each

Walk through what that arithmetic means concretely. Say capacity starts at 1 and doubles every time it fills: 1, 2, 4, 8, 16... To grow from empty to holding 16 elements, the buffer resizes at sizes 1, 2, 4, 8 — four resizes, copying 1 + 2 + 4 + 8 = 15 elements in total, for 16 pushes. Spread that cost across all 16 pushes and each one paid less than one element's worth of copying, on average — that is the amortised O(1).

Here is a second example, showing what happens if you know the final size ahead of time:

    const buffer = new Array(10000);  // pre-sized, no resizing needed
    for (let i = 0; i < 10000; i++) buffer[i] = i;

    const grown = [];
    for (let i = 0; i < 10000; i++) grown.push(i);  // resizes roughly 14 times along the way

Both loops end up O(n) overall, but the pre-sized version does strictly less copying, since it never has to reallocate. That is why performance-sensitive code sometimes pre-allocates capacity when the final size is known in advance.

Averaged over the whole sequence, each push costs constant time. That is what amortised O(1) means: any one push may be slow, but a run of n pushes cannot be.

The gotcha is treating amortised as if it were worst case. In a latency-sensitive loop, one unlucky push can stall while megabytes are copied. Amortised guarantees say nothing about the slowest single operation. Growing by a constant amount instead of doubling breaks the guarantee entirely, giving O(n) per push on average.

A second gotcha is assuming the growth factor does not matter as long as it is "more than one at a time." A factor close to 1 (like growing by 5% each resize) still gives amortised O(1) in theory, but in practice it triggers far more frequent reallocations and copies far more total bytes than doubling, so implementations tend to use factors around 1.5 to 2 rather than anything smaller.

A third gotcha shows up when people benchmark a single push and conclude "arrays are slow," having gotten unlucky and landed exactly on a resize. Always benchmark a long sequence of operations, not one call, when what actually matters is amortised behaviour.

Why this matters: this is the mechanism underneath JavaScript arrays, Python lists, Java's ArrayList, C++'s std::vector — virtually every "growable array" type is a dynamic array with doubling. Understanding it explains real, observable behaviour: why appending to a huge list in a tight loop occasionally has a visible latency spike, and why libraries expose a way to reserve or pre-size capacity up front. It is also a favourite systems-design interview question, precisely because "why doesn't this run out of room" is a question every engineer eventually asks and should be able to answer from first principles rather than by memorising a fact.

Key takeaway: doubling buys amortised O(1) appends, but never confuse an average with a worst case.`,
          questions: [
            {
              text: 'What is the amortised time of pushing onto a dynamic array that doubles its capacity?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 0,
              explanation: 'Doubling means resizes happen exponentially less often as the array grows, so spread across many pushes the average cost per push settles to constant time.',
            },
            {
              text: 'What is the worst-case time of a single push onto a dynamic array?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n squared)'],
              correct_index: 2,
              explanation: 'The one push that triggers a resize must copy every existing element into the new buffer, which is a full pass over n elements.',
            },
            {
              text: 'A dynamic array grows by adding a fixed 10 slots each time it fills. What is the amortised cost per push?',
              options: [
                'Still O(1), because 10 is a constant',
                'O(n), because the number of copies grows linearly with the array',
                'O(log n), because resizes become rarer',
                'O(1), because addition is always cheap regardless of growth strategy',
              ],
              correct_index: 1,
              explanation: 'Growing by a fixed amount means the number of resizes grows in proportion to n, and each resize copies an ever-larger array, so total copying work becomes quadratic and the per-push amortised cost is linear.',
            },
            {
              text: 'Total element copies while growing to size n by doubling is best described as:',
              options: [
                'Roughly n squared, since every push may copy',
                'Roughly n log n, one copy pass per doubling',
                'Bounded by about 2n, since 1 + 2 + 4 + ... + n/2 is less than n',
                'Unbounded, since copying happens on every push',
              ],
              correct_index: 2,
              explanation: 'The geometric series 1 + 2 + 4 + ... + n/2 sums to just under n, so total copying across the whole growth is bounded by about 2n, not by n squared or n log n.',
            },
            {
              text: 'Which statement about amortised analysis is correct?',
              options: [
                'It bounds the average cost over a sequence, not the cost of any single operation',
                'It bounds the worst case of every individual operation',
                'It only applies when the input is randomly ordered',
                'It is another name for best-case analysis',
              ],
              correct_index: 0,
              explanation: 'Amortised analysis bounds the average over a whole sequence of operations; it explicitly does not promise anything about any single operation in isolation.',
            },
            {
              text: 'If a dynamic array’s capacity doubles every time it fills, roughly how many resizes happen while growing from empty to n elements?',
              options: ['n', 'n/2', 'About log2(n)', 'n squared'],
              correct_index: 2,
              explanation: 'Since capacity doubles each time (1, 2, 4, 8, ...), it only takes about log2(n) doublings to reach n, so resizes are logarithmic in count even though each one gets progressively more expensive.',
            },
            {
              text: 'Pre-sizing an array to its known final length before filling it, compared to growing it with push, does what?',
              options: [
                'Changes the overall complexity from O(n) to O(1)',
                'Keeps overall complexity O(n) but avoids the repeated copying that resizing causes',
                'Makes writes slower because the array must be initialised first',
                'Has no effect on performance either way',
              ],
              correct_index: 1,
              explanation: 'Both approaches are O(n) overall, but pre-sizing skips the reallocate-and-copy steps that push triggers along the way, so it does strictly less total work.',
            },
            {
              text: 'Why is a growth factor of 1.5 to 2 preferred over something close to 1 (like +5% each time)?',
              options: [
                'A small growth factor breaks the amortised O(1) guarantee entirely',
                'A small growth factor still gives amortised O(1) in theory but causes far more frequent resizes and more total bytes copied in practice',
                'A growth factor above 1 always causes memory leaks',
                'JavaScript engines require growth factors to be exactly 2',
              ],
              correct_index: 1,
              explanation: 'Mathematically a factor just above 1 still keeps the amortised bound, but it triggers many more resize events and copies far more data overall, which is worse in practice even though the big-O label looks the same.',
            },
            {
              text: 'A developer times a single push() call, sees it takes unusually long, and concludes "arrays are slow." What is the likely explanation?',
              options: [
                'They happened to trigger a resize on that particular push',
                'JavaScript arrays are always slow for single elements',
                'The array was corrupted',
                'push is always O(n), regardless of capacity',
              ],
              correct_index: 0,
              explanation: 'Most pushes are cheap O(1) writes into spare capacity, but the rare push that triggers a resize does O(n) work copying the whole buffer — benchmarking one call can easily land on that expensive outlier.',
            },
            {
              text: 'Which best describes the relationship between "amortised O(1)" and "worst case O(1)" for dynamic array push?',
              options: [
                'They are the same guarantee stated two ways',
                'Amortised O(1) is stronger than worst-case O(1)',
                'Amortised O(1) allows individual operations to be O(n), as long as they average out; worst-case O(1) would forbid that entirely',
                'Amortised analysis only applies to sorting algorithms',
              ],
              correct_index: 2,
              explanation: 'Amortised bounds are about the average over a sequence and explicitly tolerate occasional expensive operations, while a true worst-case bound would require every single push to be fast.',
            },
            {
              text: 'What real data structure in JavaScript is implemented as a dynamic array under the hood?',
              options: ['Map', 'Set', 'Array', 'WeakRef'],
              correct_index: 2,
              explanation: 'JavaScript’s Array is a dynamic, resizable structure exactly like the one described in this lesson, which is why push amortises to O(1) even though the engine occasionally has to grow the backing storage.',
            },
            {
              text: 'A latency-sensitive real-time system cannot tolerate even rare long pauses. What does that imply about relying on amortised O(1) push?',
              options: [
                'It is perfectly safe, since amortised O(1) is as good as worst-case O(1)',
                'It is risky, because an occasional push can still take O(n) time when a resize is triggered',
                'Amortised analysis guarantees no operation ever exceeds twice the average',
                'Doubling eliminates resize pauses entirely once the array is large enough',
              ],
              correct_index: 1,
              explanation: 'Amortised O(1) says nothing about any individual push — a system that cannot tolerate even rare O(n) stalls needs a structure with a true worst-case guarantee, or needs to pre-allocate capacity to avoid resizes altogether.',
            },
            {
              text: 'If capacity grows by doubling, what fraction of all pushes trigger an actual resize as n grows large?',
              options: [
                'About half of them',
                'A vanishing fraction — resizes become exponentially rarer',
                'All of them, since capacity must always be checked',
                'Exactly one in ten',
              ],
              correct_index: 1,
              explanation: 'Because the buffer size doubles each time, the gap between resizes grows exponentially, so the proportion of pushes that trigger one shrinks toward zero as the array gets large.',
            },
            {
              text: 'Which statement is FALSE about dynamic array resizing?',
              options: [
                'A resize allocates a new, larger buffer',
                'A resize copies every existing element into the new buffer',
                'A resize is triggered whenever the current buffer is full',
                'A resize costs the same O(1) as a normal push, since it just reassigns a pointer',
              ],
              correct_index: 3,
              explanation: 'A resize is not a cheap pointer reassignment — it allocates fresh memory and copies every existing element into it, which is O(n) work, unlike a normal push into spare capacity.',
            },
            {
              text: 'Two engineers argue: one says "push is O(1)," the other says "push is O(n)." Reconcile the disagreement.',
              options: [
                'One of them is simply wrong',
                'They are both right: O(1) describes the amortised cost per push over a sequence, while O(n) describes the worst case of the individual push that triggers a resize',
                'The disagreement only matters for arrays larger than a million elements',
                'Push complexity depends on the values being pushed, not the array size',
              ],
              correct_index: 1,
              explanation: 'Both descriptions are valid depending on which question is being asked — averaged over many pushes the cost is constant, but the one push that happens to trigger a resize does linear work.',
            },
          ],
        },
      },
    },
    {
      topic: 'hash-maps',
      lessons: {
        easy: {
          title: 'Key-Value Lookups with Hash Maps',
          body: `A hash map stores pairs: a key and the value it points to. Instead of scanning for a key, it runs the key through a hash function that turns it into a number, and uses that number as an index into an internal array of buckets. One computation, and you are standing on the right bucket.

That makes lookup, insert, and delete average O(1), regardless of how many entries the map holds. A map with ten entries and a map with ten million entries answer a get in about the same time, which is why hash maps sit underneath caches, indexes, and word counters everywhere.

    const ages = new Map();
    ages.set('ada', 36);
    ages.set('alan', 41);
    ages.get('ada');       // 36
    ages.has('grace');     // false
    ages.size;             // 2

Walk through ages.get('ada'): the Map runs 'ada' through its hash function, gets back a number, and uses that number to jump straight to one bucket. It checks the key stored there, confirms it matches 'ada', and returns 36 — no scanning through 'alan' or anything else in the map.

Here is a second example that shows the flip side — checking existence versus reading a value:

    const inventory = new Map([['apples', 12], ['pears', 0]]);
    inventory.has('pears');          // true - the key exists
    inventory.get('pears');          // 0 - the value happens to be falsy
    inventory.get('bananas');        // undefined - key not present
    Boolean(inventory.get('pears')); // false, easy to misread as "missing"

Notice that has and get answer different questions. 'pears' is present with a value of 0, so has returns true, but if you write if (inventory.get('pears')) to check presence, you will wrongly treat it as missing, because 0 is falsy in JavaScript.

A frequent surprise is that hash maps carry no ordering of their keys. You cannot ask a hash map for its smallest key without inspecting every entry, and searching by value, rather than by key, means walking the whole map.

A second mistake is exactly the has-versus-get confusion above: using a falsy stored value (0, an empty string, false, null) as a stand-in for "key missing," when the key is actually present. Always use has to check presence, and get to read the value once you know it is there.

A third mistake is assuming a plain JavaScript object behaves identically to a Map. Objects come with inherited properties like toString, and using one as a general-purpose map can produce surprising collisions with a key literally named toString or constructor — one reason Map exists as a cleaner, purpose-built alternative.

Why this matters: hash maps are the workhorse of everyday software — a web session store keyed by session id, a routing table keyed by URL path, a cache keyed by a computed input, a database index keyed by a column value. Any time your program needs to answer "have I seen this before?" or "what value goes with this key?" quickly, without scanning everything, a hash map is very often the right tool, and recognising that pattern is one of the most useful instincts you can build as a working engineer.

Key takeaway: a hash map trades ordering away in exchange for near-instant lookup by key.`,
          questions: [
            {
              text: 'What does a hash function do in a hash map?',
              options: [
                'It sorts the keys so lookups can use binary search',
                'It converts a key into an index into the bucket array',
                'It compresses the values to save memory',
                'It removes duplicate keys automatically',
              ],
              correct_index: 1,
              explanation: 'The hash function’s job is to turn a key into a number that can be used as (or converted into) a bucket index, so the map can jump directly there instead of scanning.',
            },
            {
              text: 'What is the average-case time to look up a value by key in a hash map?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 0,
              explanation: 'Hashing lets the map jump straight to the right bucket on average, independent of how many entries are stored.',
            },
            {
              text: 'Which task is a hash map a poor choice for?',
              options: [
                'Counting how many times each word appears in a document',
                'Checking whether a username is already taken',
                'Listing all keys in sorted order',
                'Caching a computed result under its input',
              ],
              correct_index: 2,
              explanation: 'A hash map keeps no ordering among its keys, so producing them sorted requires collecting and sorting them separately — the map gives you no shortcut for that.',
            },
            {
              text: 'You want to know if the value 42 exists anywhere in a hash map of n entries. What does that cost?',
              options: [
                'O(1), the same as a key lookup',
                'O(n), because values are not hashed, only keys are',
                'O(log n), because buckets form a tree',
                'O(1), because Map keeps a reverse index of values automatically',
              ],
              correct_index: 1,
              explanation: 'Only keys are hashed into bucket positions; finding a value means checking every entry’s value, one at a time, in the worst case.',
            },
            {
              text: 'What does inventory.has("pears") return if pears was set to 0?',
              options: [
                'false, because 0 is falsy',
                'true, because the key exists regardless of its value',
                'undefined',
                'It throws an error since 0 is not a valid value',
              ],
              correct_index: 1,
              explanation: 'has only checks whether the key is present, not whether its value is truthy — "pears" was set, so has correctly reports true even though the stored value happens to be 0.',
            },
            {
              text: 'Why can if (map.get("pears")) wrongly treat an existing key as missing?',
              options: [
                'get always returns undefined for numeric values',
                'If the stored value is falsy (like 0 or an empty string), the condition evaluates as if the key were absent',
                'get throws when the value is falsy',
                'Map does not support falsy values',
              ],
              correct_index: 1,
              explanation: 'The condition only cares about truthiness, so a legitimately stored falsy value like 0 makes the check behave exactly like a missing key, even though has would report true.',
            },
            {
              text: 'What is the size of new Map([["a", 1], ["b", 2]]).size?',
              options: ['1', '2', '4', 'undefined'],
              correct_index: 1,
              explanation: 'The map holds two entries, "a" and "b," so its size property reports 2.',
            },
            {
              text: 'You want to check whether a username has already been registered before inserting it. Which structure gives the fastest check?',
              options: [
                'An unsorted array, scanned with .includes',
                'A hash set of existing usernames, checked with .has',
                'A linked list traversed from the head',
                'Sorting the usernames every time a check is needed',
              ],
              correct_index: 1,
              explanation: 'A hash set answers "have I seen this key" in average O(1) time, while scanning an array or re-sorting on every check costs far more as the number of usernames grows.',
            },
            {
              text: 'Which of these is a valid reason hash maps are used to implement caches?',
              options: [
                'They keep entries sorted by insertion time',
                'They let you look up a previously computed result by its input key in near-constant time',
                'They automatically expire old entries',
                'They use less memory than any other structure',
              ],
              correct_index: 1,
              explanation: 'A cache’s whole point is "given this input, did I already compute the answer" — a hash map answers that in close to constant time regardless of how many results are cached.',
            },
            {
              text: 'What does map.get(key) return when key is not present in the map?',
              options: ['null', 'undefined', '0', 'It throws a KeyError'],
              correct_index: 1,
              explanation: 'JavaScript’s Map returns undefined for a missing key rather than throwing, unlike some other languages that raise an error on a missing key.',
            },
            {
              text: 'A plain JavaScript object used as a lookup table can misbehave with a key literally named "toString". Why?',
              options: [
                'Objects cannot store any key named "toString"',
                'Objects inherit built-in properties like toString from their prototype, which can collide with user keys',
                'JavaScript reserves that word entirely',
                'Objects convert all keys to uppercase automatically',
              ],
              correct_index: 1,
              explanation: 'Plain objects inherit from Object.prototype, which already defines toString, constructor, and others — using one of those names as a data key can collide with the inherited property, one reason Map is often the safer choice.',
            },
            {
              text: 'Which task suits a hash map well?',
              options: [
                'Maintaining a leaderboard sorted by score at all times',
                'Counting how many times each distinct word appears in a document',
                'Finding the median of a stream of numbers efficiently',
                'Storing a fixed-size sliding window of the last 10 events in order',
              ],
              correct_index: 1,
              explanation: 'Word counting is exactly "look up this key (the word), update its count" — a hash map’s near-constant-time lookup and update makes this one pass over the document, whereas the other tasks depend on order, which a hash map does not track.',
            },
            {
              text: 'What is the relationship between a hash map’s size and its average lookup speed?',
              options: [
                'Lookup speed degrades linearly as size grows',
                'Lookup speed stays roughly constant as size grows, on average',
                'Lookup speed improves as size grows',
                'They are unrelated in every implementation',
              ],
              correct_index: 1,
              explanation: 'Because the hash function sends you straight to a bucket rather than requiring a scan, the average lookup time does not grow meaningfully with the number of stored entries.',
            },
            {
              text: 'ages.set("ada", 36); ages.set("ada", 40); What is ages.get("ada") afterward?',
              options: ['36', '40', '76', 'It creates two separate entries for "ada"'],
              correct_index: 1,
              explanation: 'Setting the same key twice overwrites the previous value rather than creating a duplicate entry, so the most recent set wins.',
            },
            {
              text: 'Why is Map generally preferred over a plain object when you need arbitrary, possibly non-string keys?',
              options: [
                'Objects cannot store more than 100 keys',
                'Map keys are not coerced to strings, so numbers, objects, and other types stay distinct keys',
                'Plain objects are always slower than Map for every operation',
                'Map is the only structure that supports the delete operation',
              ],
              correct_index: 1,
              explanation: 'Plain object keys get coerced to strings, so the number 1 and the string "1" collide, whereas a Map preserves the original key type and identity — useful whenever keys are not naturally strings.',
            },
          ],
        },
        medium: {
          title: 'Using Hash Maps to Replace Nested Loops',
          body: `The everyday superpower of a hash map is turning a repeated search into a single lookup. Any time you find yourself scanning a list inside another loop, ask whether the inner scan can become a map hit.

Take the classic problem: find two numbers in a list that add up to a target. The naive answer tries every pair, which is O(n squared). The map answer walks the list once, remembering what it has already seen.

    function twoSum(nums, target) {
      const seen = new Map();
      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        if (seen.has(need)) return [seen.get(need), i];
        seen.set(nums[i], i);
      }
      return null;
    }

Walk through it on nums = [2, 11, 7, 15], target = 9. i=0: need = 9-2 = 7, seen is empty, no match, so store seen.set(2, 0). i=1: need = 9-11 = -2, not in seen, store seen.set(11, 1). i=2: need = 9-7 = 2, and seen has 2 (mapped to index 0) — match found, return [0, 2]. One pass, one map, done.

One pass, O(n) time, O(n) extra memory. That memory is the price: you are buying speed with space.

Here is a second example, showing the same pattern applied to a different problem — finding duplicates:

    function firstDuplicate(nums) {
      const seenIt = new Set();
      for (const n of nums) {
        if (seenIt.has(n)) return n;
        seenIt.add(n);
      }
      return null;
    }

Same shape: one pass, a hash-backed structure remembering what has been seen, no nested loop. Instead of comparing every element to every other element (O(n squared)), each element is checked against the set once (O(1) average), for O(n) total.

The gotcha is key identity. In a JavaScript object, keys become strings, so 1 and '1' collide. In a Map, two structurally identical objects are still different keys, because Map compares by reference. Frequency counting silently breaks when you assume otherwise.

A second gotcha is forgetting that "remembering what has been seen" only works if you check before you insert, not after. In the twoSum loop, checking seen.has(need) happens before seen.set(nums[i], i) — if you swapped the order, an element could incorrectly pair with itself when need equals nums[i].

A third gotcha is reaching for this pattern when the input is tiny. For a 5-element array, the overhead of building a Map can lose to a simple nested loop in practice, even though the nested loop is technically worse in big-O terms — the crossover only matters once n gets large enough that the quadratic term dominates.

Why this matters: "have I seen this value before, and if so, where" is one of the most common questions in real code — deduplicating a list of user IDs, detecting a cycle in a linked structure, memoizing an expensive function call, checking for repeated requests within a time window. Recognising a nested loop that is secretly asking that question, and swapping it for a single pass with a hash map, is one of the highest-leverage optimisations an engineer can make, often turning a service that times out on large input into one that scales comfortably.

Key takeaway: a hash map converts a repeated search into a lookup, trading memory for a whole factor of n.`,
          questions: [
            {
              text: 'Using a hash map, what is the time complexity of the one-pass two-sum solution?',
              options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n squared)'],
              correct_index: 1,
              explanation: 'The map lets each number be checked and recorded in O(1) average time, and the loop runs once over the n elements, giving O(n) overall.',
            },
            {
              text: 'What is the extra space used by that one-pass two-sum solution in the worst case?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n squared)'],
              correct_index: 2,
              explanation: 'In the worst case, the map ends up storing nearly every element before a match is found, using space proportional to n.',
            },
            {
              text: 'You must find, for each of n queries, whether a value exists in a list of n items. Which approach is fastest overall?',
              options: [
                'Scan the list for each query, giving O(n squared)',
                'Build a hash set once, then answer each query in O(1), giving O(n)',
                'Sort the list, then linear scan per query, giving O(n squared)',
                'Binary search each query without sorting first, giving O(n log n)',
              ],
              correct_index: 1,
              explanation: 'Building the set costs O(n) once, and then each of the n queries is answered in O(1) average, for O(n) total — far better than re-scanning the list for every query.',
            },
            {
              text: 'In a plain JavaScript object used as a map, what happens with obj[1] and obj["1"]?',
              options: [
                'They are separate keys, since one is a number',
                'They are the same key, because object keys are coerced to strings',
                'Using a number as a key throws a TypeError',
                'They are different because numbers hash differently than strings',
              ],
              correct_index: 1,
              explanation: 'Plain object keys are always coerced to strings internally, so the numeric key 1 and the string key "1" refer to the exact same property.',
            },
            {
              text: 'Why does using two structurally identical objects as Map keys give you two entries?',
              options: [
                'Map keys are hashed by their JSON representation',
                'Map compares keys by reference identity, not deep equality',
                'Map does not allow object keys at all, so it stringifies them',
                'Map deep-compares object keys by their properties',
              ],
              correct_index: 1,
              explanation: 'Map uses reference equality for keys, so two different object instances are always distinct keys even if their properties are identical.',
            },
            {
              text: 'In the twoSum walkthrough on [2, 11, 7, 15] with target 9, why does checking seen.has(need) before seen.set(nums[i], i) matter?',
              options: [
                'It does not matter; the order is arbitrary',
                'Checking first prevents an element from incorrectly being paired with itself',
                'It only matters for negative numbers',
                'Reversing the order would make the function throw an error',
              ],
              correct_index: 1,
              explanation: 'If the current number were inserted before checking, and need happened to equal nums[i], the element would appear to pair with itself even though it is really a single value in the array.',
            },
            {
              text: 'What is the time complexity of firstDuplicate(nums) using a Set, for an n-element array?',
              options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n squared)'],
              correct_index: 1,
              explanation: 'Each element is checked against and added to the set once, and both operations are average O(1), so the whole pass is O(n).',
            },
            {
              text: 'For a very small input (say 5 elements), why might a naive nested loop actually run faster in practice than the hash-map version?',
              options: [
                'Nested loops are always faster regardless of input size',
                'The overhead of constructing a Map can outweigh the savings when n is small enough that the quadratic term is tiny anyway',
                'JavaScript optimizes nested loops specially',
                'Hash maps only work correctly above a minimum size',
              ],
              correct_index: 1,
              explanation: 'Big-O describes growth trends, not actual speed at any one size — for tiny n, constant-factor overhead like allocating a Map can dominate, even though the nested loop is asymptotically worse.',
            },
            {
              text: 'Which nested-loop pattern is a strong candidate for replacing with a single pass plus a hash map?',
              options: [
                'Sorting an array before searching it',
                'For each element, scanning the rest of the array to check if a matching value has appeared',
                'Printing every element of the array once',
                'Computing the sum of all elements in the array',
              ],
              correct_index: 1,
              explanation: '"Has this value appeared before" is exactly the question a hash set answers in O(1) per check, turning an O(n squared) nested scan into a single O(n) pass.',
            },
            {
              text: 'A frequency counter built with a plain object accidentally merges the counts for the number 5 and the string "5". What is the cause?',
              options: [
                'A typo in the loop',
                'Object keys are coerced to strings, so numeric and string versions of the same value collide',
                'JavaScript objects cannot store numeric keys',
                'The frequency counter has a bug unrelated to key types',
              ],
              correct_index: 1,
              explanation: 'Because object property keys are always strings under the hood, 5 and "5" become the identical key "5", silently merging what the programmer intended as separate counts.',
            },
            {
              text: 'Why does converting a nested-loop search into a hash-map lookup usually cost extra memory?',
              options: [
                'It does not - memory usage stays the same',
                'The map has to store roughly one entry per element seen so far, trading space for the ability to skip the inner scan',
                'Hash maps always allocate a fixed 1MB block',
                'JavaScript garbage collects hash maps immediately after use',
              ],
              correct_index: 1,
              explanation: 'To avoid rescanning, the map keeps a record of everything encountered so far, which in the worst case is proportional to the size of the input — that stored memory is what buys the faster lookup.',
            },
            {
              text: 'For finding a pair that sums to a target, what does seen.set(nums[i], i) store as the value, and why?',
              options: [
                'The value at nums[i] again, for no particular reason',
                'The index i, so the function can return the positions of the matching pair, not just their values',
                'A boolean flag indicating the number was seen',
                'The target minus nums[i]',
              ],
              correct_index: 1,
              explanation: 'Storing the index lets the function report which two positions in the array produced the sum — the value alone would not reveal where it came from.',
            },
            {
              text: 'Which of these correctly distinguishes a hash Set from a hash Map?',
              options: [
                'A Set stores only keys with no associated value; a Map stores key-value pairs',
                'A Set is always slower than a Map',
                'A Set can only hold numbers; a Map can hold any type',
                'There is no meaningful difference',
              ],
              correct_index: 0,
              explanation: 'A Set is essentially a Map that only cares about membership — it tracks which keys have been seen without attaching a separate value to each one.',
            },
            {
              text: 'A hash-map-based deduplication pass and a nested-loop deduplication pass both produce correct output. What is the meaningful difference for large n?',
              options: [
                'None - they always take the same amount of time',
                'The hash-map pass scales as O(n) while the nested loop scales as O(n squared), so the gap widens sharply as n grows',
                'The nested loop uses less memory and is therefore always preferable',
                'The hash-map version is only faster if the array is already sorted',
              ],
              correct_index: 1,
              explanation: 'For small inputs the difference may be unnoticeable, but as n grows the nested loop’s work grows with the square of n while the hash-map version grows linearly, so the hash-map approach pulls dramatically ahead.',
            },
            {
              text: 'Why is "have I seen this before" such a common question to optimise with a hash map in production code?',
              options: [
                'Because it appears literally in every function signature',
                'Because deduplication, memoization, caching, and repeat-detection are all variations of that same question, and a hash map answers it in near-constant time',
                'Because hash maps are required by most programming language specifications',
                'Because it is the only question a hash map can answer',
              ],
              correct_index: 1,
              explanation: 'Many everyday engineering problems — caching a computed result, deduplicating a list, detecting a repeated event — are really just asking "has this key shown up before," and a hash map answers that in close to constant time instead of requiring a full rescan.',
            },
          ],
        },
        hard: {
          title: 'Collisions, Load Factor, and Worst-Case Behaviour',
          body: `Hashing squeezes an unbounded space of keys into a small number of buckets, so two different keys will eventually land in the same bucket. That is a collision, and it is inevitable, not a bug.

The usual fix is chaining: each bucket holds a small list, and a lookup hashes to the bucket then scans the chain. If every key collides, every lookup degrades into a linear scan of one enormous chain.

    // n keys, all hashing to bucket 3:
    // bucket[3] -> k1 -> k2 -> k3 -> ... -> kn
    // lookup must walk the chain:  O(n)

That is the worst case: O(n) per operation, even though the average stays O(1). The load factor, entries divided by buckets, keeps the average honest. When it climbs past a threshold the table rehashes into a larger bucket array, an O(n) operation that amortises away.

Walk through what a rehash actually does: say a table has 8 buckets and a load-factor threshold of 0.75 (so it rehashes once it holds 6 entries). Inserting the 7th entry trips the threshold — the table allocates a new array, often double the size (16 buckets), and every existing key gets hashed again and placed into the new array, because a key's bucket depends on the current bucket count, not just its raw hash value. That single insert costs O(n), just like a dynamic array resize, and for exactly the same reason.

Here is a second example, showing how chaining degrades gracefully under a few collisions, as opposed to all of them:

    // 1000 keys spread across 100 buckets, average chain length 10
    // a lookup hashes to the right bucket, then scans a chain of ~10
    // still much faster than scanning all 1000 keys directly

With a reasonable load factor, a "collision" usually means a chain of a handful of items, not thousands — the average case stays close to O(1) because chains stay short, not because collisions never happen.

Two gotchas. A mutable key is a trap: mutate an object after inserting it and its hash no longer matches its bucket, so the entry becomes unreachable. And a predictable hash function invites an adversary to feed you colliding keys on purpose, a hash-flooding denial of service.

A third gotcha is assuming every hash map implementation handles collisions the same way. Chaining (a list per bucket) is one strategy; open addressing (probing for the next free slot in the same array) is another, common in some language runtimes for performance reasons. Under open addressing, deleting an entry is trickier — you cannot just empty the slot, since that can break the probe chain for later keys, so most implementations mark it as a "tombstone" instead.

A fourth gotcha is treating "average O(1)" as a promise about your specific workload. If your keys come from an external, untrusted source — user-submitted strings, for instance — and your hash function is not randomised with a per-process seed, an attacker who can guess or reverse-engineer the hash function can deliberately submit keys that all collide, degrading your service from O(1) to O(n) per request under their control.

Why this matters: this is precisely why production language runtimes randomise their string hash seed at startup, a defense directly against hash-flooding, and why interview questions about hash maps eventually ask "what is the worst case, and when does it happen" rather than stopping at "O(1) average." Any time a hash map sits on a path that touches attacker-controlled input — an HTTP header, a form field, a JSON key — the gap between average and worst case is not academic; it is a real security consideration that has caused real denial-of-service incidents in the wild.

Key takeaway: hash maps are O(1) on average and O(n) at worst, and a sane load factor plus a good hash function keep you on the happy path.`,
          questions: [
            {
              text: 'What is the worst-case time for a lookup in a chained hash map holding n keys?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 2,
              explanation: 'If every key hashes to the same bucket, the chain holds all n keys and a lookup must walk the whole chain, giving O(n).',
            },
            {
              text: 'What is the load factor of a hash table?',
              options: [
                'The number of stored entries divided by the number of buckets',
                'The number of buckets divided by the length of the longest chain',
                'The fraction of lookups that end in a collision',
                'The ratio of successful to failed lookups',
              ],
              correct_index: 0,
              explanation: 'Load factor measures how full the table is — entries divided by buckets — and is the signal used to decide when to grow the table.',
            },
            {
              text: 'When the load factor exceeds its threshold, the table rehashes into a bigger bucket array. What is the cost of that single rehash, and its amortised cost per insert?',
              options: [
                'O(1) rehash, O(1) amortised',
                'O(n) rehash, O(1) amortised',
                'O(n) rehash, O(n) amortised',
                'O(log n) rehash, O(log n) amortised',
              ],
              correct_index: 1,
              explanation: 'A single rehash touches every existing key, which is O(n), but because rehashes become exponentially rarer as the table grows, the amortised cost per insert stays O(1).',
            },
            {
              text: 'You insert an object as a key, then mutate a field the hash function reads. What happens?',
              options: [
                'The map automatically rehashes the entry',
                'The entry is likely unreachable, since its hash no longer points at its bucket',
                'Nothing changes, because keys are deep-copied on insert',
                'The map automatically re-inserts the entry under its new hash whenever it changes',
              ],
              correct_index: 1,
              explanation: 'The entry’s location was decided by its hash at insert time; mutating a field the hash depends on means its current hash points at a different bucket than where it is actually stored, so lookups for it will fail.',
            },
            {
              text: 'An attacker sends thousands of keys crafted to hash into the same bucket. What is the effect?',
              options: [
                'The table silently drops the duplicate keys',
                'Lookups stay O(1), since chaining handles any number of collisions',
                'Operations degrade toward O(n), a hash-flooding denial of service',
                'The attack has no effect since hash maps rehash automatically to prevent it',
              ],
              correct_index: 2,
              explanation: 'Forcing many keys into the same bucket turns average-O(1) chain lookups into O(n) scans, so an attacker can deliberately slow down every request that touches the affected map.',
            },
            {
              text: 'What is the purpose of a load-factor threshold (e.g., 0.75) in a hash table?',
              options: [
                'It caps the maximum number of entries the table can ever hold',
                'It decides when to grow (rehash) the table, keeping chains short and average lookup near O(1)',
                'It sets the number of buckets checked per lookup',
                'It determines how many bytes each key uses',
              ],
              correct_index: 1,
              explanation: 'As the load factor rises, chains get longer and average performance degrades, so implementations rehash into a bigger table once a threshold is crossed to keep lookups fast.',
            },
            {
              text: 'Why does a key’s bucket depend on the number of buckets in the table, not just its raw hash value?',
              options: [
                'It does not - the bucket is always the raw hash value directly',
                'The raw hash is typically reduced modulo the bucket count to fit it into a valid array index, so the same hash maps to a different bucket in a differently-sized table',
                'Hash values change every time the program runs',
                'Buckets are assigned in insertion order, unrelated to hashing',
              ],
              correct_index: 1,
              explanation: 'The hash function does not know how many buckets exist, so the actual bucket index is computed by combining the hash with the current bucket count, often via modulo — which is exactly why growing the table forces every key to be re-placed.',
            },
            {
              text: 'Open addressing handles collisions differently from chaining. What is a key consequence for deletion under open addressing?',
              options: [
                'Deletion is impossible under open addressing',
                'You cannot simply clear the slot; doing so can break the probe sequence for later keys, so implementations often mark it as a tombstone instead',
                'Deletion always triggers a full rehash',
                'Open addressing does not support deletion of the most recently inserted key',
              ],
              correct_index: 1,
              explanation: 'With open addressing, a later key may have been placed further along a probe sequence because an earlier slot was occupied; simply emptying that slot would make lookups for the later key stop searching too early, so a tombstone marker preserves the probe path.',
            },
            {
              text: 'Which mitigation directly defends against hash-flooding denial-of-service attacks?',
              options: [
                'Increasing the initial bucket count',
                'Randomising the hash seed per process so an attacker cannot predict which keys will collide',
                'Switching from a Map to a plain object',
                'Sorting keys before inserting them',
              ],
              correct_index: 1,
              explanation: 'Hash-flooding relies on the attacker knowing or guessing the hash function well enough to craft colliding keys; randomising the seed at process start means the same input hashes differently each run, making it far harder to precompute a flood of collisions.',
            },
            {
              text: 'A hash table has 1000 keys evenly spread across 100 buckets. What is the average chain length, and roughly how does that affect lookup cost compared to scanning all 1000 keys directly?',
              options: [
                'Average chain length 10; a lookup that scans one chain is far cheaper than scanning all 1000 keys',
                'Average chain length 1000; no improvement over a linear scan',
                'Average chain length 100; identical cost to scanning all keys',
                'Average chain length 0; hash maps never have chains at that load',
              ],
              correct_index: 0,
              explanation: '1000 keys over 100 buckets averages 10 per bucket, so a lookup that hashes to the right bucket and scans its short chain does roughly 10 comparisons instead of 1000.',
            },
            {
              text: 'Why is "average case O(1)" not a sufficient guarantee for a hash map sitting on a code path that processes untrusted input?',
              options: [
                'Average case guarantees always hold regardless of input',
                'An adversary who can influence the keys can deliberately trigger the worst case, degrading performance regardless of what happens "on average" for random input',
                'Untrusted input cannot be hashed at all',
                'Hash maps reject untrusted input automatically',
              ],
              correct_index: 1,
              explanation: '"Average case" assumes roughly random keys; an attacker is not random — they can specifically choose keys engineered to collide, pushing the map toward its O(n) worst case on purpose.',
            },
            {
              text: 'What does chaining actually store inside each bucket?',
              options: [
                'A single key-value pair, with no possibility of more than one per bucket',
                'A small list (or similar structure) holding all key-value pairs that hashed to that bucket',
                'A sorted array of all keys in the entire table',
                'A pointer to a separate hash table',
              ],
              correct_index: 1,
              explanation: 'Chaining resolves collisions by letting each bucket hold a list of every entry that happens to hash there, rather than forcing exactly one entry per bucket.',
            },
            {
              text: 'Rehashing a table from 8 buckets to 16 buckets requires what, and why can’t the old bucket array simply be copied as-is?',
              options: [
                'Nothing - buckets copy over unchanged since the keys have not changed',
                'Every key must be re-hashed into the new array, because bucket assignment depends on the bucket count, which just changed',
                'Only the newly inserted key needs to move',
                'The values need to be re-sorted, but the keys stay in place',
              ],
              correct_index: 1,
              explanation: 'Since a key’s bucket index is derived using the current bucket count, doubling that count changes where nearly every key belongs, so each one has to be recomputed and re-placed rather than copied verbatim.',
            },
            {
              text: 'Which statement about hash map worst-case behaviour is most accurate?',
              options: [
                'Worst case never actually happens in real systems, so it can be ignored',
                'Worst case is only a concern for maps storing more than a billion entries',
                'Worst case is triggered by collisions concentrating many keys into few buckets, and can occur naturally with unlucky data or deliberately under adversarial input',
                'Worst case only applies to Maps, never to plain objects',
              ],
              correct_index: 2,
              explanation: 'The O(n) worst case has a concrete cause — heavy collisions crowding a few buckets — and that can happen from bad luck with an unusual data distribution, or deliberately if an attacker controls the keys being inserted.',
            },
            {
              text: 'You insert a mutable object as a key, then later cannot find it with a lookup using an equivalent object with the same current field values. What likely went wrong?',
              options: [
                'Map does not support object keys at all',
                'The object was mutated after insertion, so its hash today no longer matches the bucket it was actually stored under',
                'The lookup object needs to be the exact same reference for it to work, unrelated to mutation',
                'Map entries expire automatically after a fixed time',
              ],
              correct_index: 1,
              explanation: 'The entry lives at the bucket determined by the key’s hash at the time it was inserted — if a field the hash reads has since changed, hashing "now" points somewhere else, and the entry effectively becomes unreachable even though it is still sitting in the table.',
            },
          ],
        },
      },
    },
    {
      topic: 'complexity',
      lessons: {
        easy: {
          title: 'Reading Big-O Notation',
          body: `Big-O describes how the work an algorithm does grows as its input grows. It is not a stopwatch. It ignores the speed of your machine and the exact number of steps, and keeps only the shape of the growth.

O(1) means the work does not depend on input size. O(n) means it grows in step with the input: double the input, double the work. O(n squared) means doubling the input quadruples the work.

    arr[0];                      // O(1)

    for (const x of arr) {       // O(n)
      total += x;
    }

    for (const a of arr) {       // O(n squared)
      for (const b of arr) {
        pairs.push([a, b]);
      }
    }

Walk through the nested loop: for an array of length n, the outer loop runs n times, and for every single one of those, the inner loop also runs n times. That is n times n = n squared total iterations — for n = 10, that is 100 iterations; for n = 100, it is 10,000.

Here is a second example, showing that similar-looking code can have different complexity depending on what is inside the loop:

    for (const x of arr) {              // O(n)
      console.log(x);
    }

    for (const x of arr) {              // O(n squared) overall
      if (otherArr.includes(x)) {       // this one line is itself O(n)
        matches.push(x);
      }
    }

Both are "a single for loop," but the second one calls includes, which itself scans otherArr from the start — so a loop that looks linear is secretly doing n scans of size n, for n squared total.

The common misreading is treating big-O as a measure of speed. An O(n) algorithm can easily beat an O(log n) one on small inputs, because constants are real even though big-O drops them. Big-O tells you how things scale, not which is faster today.

A second common mistake is reading "O(n squared)" and assuming it is always unacceptable. For n = 20, a hundred-fold difference between O(n) and O(n squared) is 20 versus 400 operations — both instant on modern hardware. Complexity matters most once n gets large enough that the growth curve actually separates the options in real time.

A third mistake is confusing the algorithm's complexity with the complexity of one line of code you wrote. A single call like array.sort() is not O(1) just because it is one line — sort is O(n log n) internally, and if it sits inside another loop, that cost multiplies just like any other nested operation.

Why this matters: big-O is the shared vocabulary engineers use to reason about whether code will still work when the input is 10x, 100x, or 10,000x bigger than what was tested with. A feature that feels instant with a 50-row test dataset can grind to a halt in production with a million rows, and the reason is almost always a hidden O(n squared) or worse lurking in what looked like simple code. Learning to read a piece of code and immediately estimate its growth curve, before it ships rather than after a customer complains, is one of the most transferable skills in software engineering.

Key takeaway: big-O is about the growth curve, not the clock.`,
          questions: [
            {
              text: 'What is the time complexity of summing every element of an array of n numbers?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n squared)'],
              correct_index: 2,
              explanation: 'A single pass touching every element once means the work grows in direct proportion to n, which is the definition of O(n).',
            },
            {
              text: 'A loop nested inside another loop, each running over all n elements, is:',
              options: ['O(n)', 'O(2n)', 'O(n squared)', 'O(log n)'],
              correct_index: 2,
              explanation: 'The outer loop runs n times and, for each of those, the inner loop also runs n times, giving n times n = n squared total iterations.',
            },
            {
              text: 'For an O(n squared) algorithm, doubling the input size multiplies the work by roughly:',
              options: ['2', '4', '8', '16'],
              correct_index: 1,
              explanation: 'O(n squared) means work scales with the square of the input, so doubling n multiplies the work by 2 squared, which is 4.',
            },
            {
              text: 'Which statement about big-O is correct?',
              options: [
                'It tells you the exact runtime in milliseconds',
                'It describes how work grows with input size, ignoring constant factors',
                'A lower big-O always runs faster on every input size',
                'It measures memory usage exclusively, never time',
              ],
              correct_index: 1,
              explanation: 'Big-O captures how the amount of work grows as input size grows, deliberately dropping constant factors and machine-specific speed.',
            },
            {
              text: 'Which is the best description of O(1)?',
              options: [
                'Work grows proportionally with input size',
                'Work stays the same regardless of input size',
                'Work grows with the square of input size',
                'Work is always instantaneous in real time',
              ],
              correct_index: 1,
              explanation: 'O(1), or constant time, means the number of steps does not change as the input grows — reading arr[0] takes the same number of steps whether the array has 5 or 5 million elements.',
            },
            {
              text: 'A single line calls array.sort() inside a loop that runs n times. What is a reasonable way to think about the overall complexity?',
              options: [
                'Still O(n), since sort is "just one line"',
                'Potentially O(n squared log n) or worse, since sort itself costs O(n log n) and it runs inside an n-iteration loop',
                'O(1), since sort is a built-in method',
                'O(log n), since sort always halves the work',
              ],
              correct_index: 1,
              explanation: 'A single line of code is not automatically O(1) — sort does real work internally, O(n log n), and running that inside another loop multiplies the costs together rather than replacing them.',
            },
            {
              text: 'For n = 20, roughly how do O(n) and O(n squared) compare in raw number of operations?',
              options: [
                '20 versus 400 - both trivially fast on modern hardware',
                '20 versus 20 - no real difference at small n',
                '2000 versus 400 - O(n) is actually worse here',
                'They are undefined for such a small n',
              ],
              correct_index: 0,
              explanation: '20 versus 400 is a real ratio difference, but both numbers are so small that a modern computer executes either near-instantly — the growth curve only becomes a practical problem once n is large.',
            },
            {
              text: 'Which statement correctly distinguishes big-O from a benchmark (a timed run of code)?',
              options: [
                'They measure exactly the same thing',
                'Big-O describes asymptotic growth trend ignoring constants and hardware; a benchmark measures actual elapsed time on specific hardware and input',
                'A benchmark is more theoretical; big-O is more practical',
                'Big-O only applies to sorting algorithms, while benchmarks apply to everything',
              ],
              correct_index: 1,
              explanation: 'Big-O is a mathematical description of how the number of operations scales with input size, while a benchmark reports concrete wall-clock time for a specific run on specific hardware.',
            },
            {
              text: 'What does it mean to say an algorithm "ignores constant factors"?',
              options: [
                'It literally performs zero operations',
                'An algorithm that does 3n steps and one that does 300n steps are both described as O(n), since the constant multiplier is dropped',
                'Constants are only ignored for O(1) algorithms',
                'It means the algorithm produces the same output regardless of input',
              ],
              correct_index: 1,
              explanation: 'Big-O groups algorithms by their growth shape, so a fixed multiplier like 3 versus 300 does not change the classification, even though one is literally 100x slower in practice.',
            },
            {
              text: 'A function reads a fixed field off an object, regardless of how big any other data structure in the program is. What complexity best describes that read?',
              options: ['O(1)', 'O(n)', 'O(log n)', 'It depends on the size of the whole program'],
              correct_index: 0,
              explanation: 'The cost of that read never changes no matter how much other data exists elsewhere, which is the definition of constant time.',
            },
            {
              text: 'For arr.includes(x) on an n-element array, what is the complexity in the worst case (x not present)?',
              options: [
                'O(1), since includes uses hashing internally',
                'O(n), since it may need to check every element before concluding x is absent',
                'O(log n), since includes performs a binary search',
                'O(n squared), since includes compares every pair of elements',
              ],
              correct_index: 1,
              explanation: 'includes on a plain array scans sequentially, and if the value is never found, it has to check every one of the n elements before it can conclude that.',
            },
            {
              text: 'Which pair correctly orders these from cheapest to most expensive for large n: O(n squared), O(1), O(n)?',
              options: [
                'O(1), O(n), O(n squared)',
                'O(n squared), O(n), O(1)',
                'O(n), O(1), O(n squared)',
                'They cannot be compared without knowing the exact input',
              ],
              correct_index: 0,
              explanation: 'For large inputs, constant time barely grows, linear time grows proportionally, and quadratic time grows as the square, so the correct order from cheapest to most expensive is O(1), then O(n), then O(n squared).',
            },
            {
              text: 'Why is "the number of lines of code" a poor proxy for its big-O complexity?',
              options: [
                'It is actually a perfectly reliable proxy',
                'A single line can hide significant work (like a sort or a scan), while many lines can each be O(1), so line count does not reflect growth behaviour',
                'Big-O only applies to functions longer than 10 lines',
                'Fewer lines always means lower complexity',
              ],
              correct_index: 1,
              explanation: 'Complexity is about what the code actually does as input grows, not how it is visually formatted — one line calling a method that itself scans or sorts can dominate the complexity of an entire function.',
            },
            {
              text: 'What happens to the runtime of an O(n squared) algorithm when the input size is multiplied by 10?',
              options: [
                'It also multiplies by roughly 10',
                'It multiplies by roughly 100',
                'It stays the same',
                'It multiplies by roughly 1000',
              ],
              correct_index: 1,
              explanation: 'Squaring the input size means the work scales with (10n) squared, which is 100 times n squared, so the runtime grows by roughly a factor of 100, not 10.',
            },
            {
              text: 'A developer says "this function is O(n), so it will always run faster than that other O(n squared) function." What is the flaw in that reasoning?',
              options: [
                'There is no flaw - the statement is always true',
                'Big-O ignores constant factors and small-input behaviour, so for small enough n the O(n squared) function could easily run faster in practice',
                'O(n squared) functions never actually run in finite time',
                'O(n) and O(n squared) are mathematically identical',
              ],
              correct_index: 1,
              explanation: 'Big-O is a statement about long-run growth trends, not a guarantee about any specific input size — with a small enough n, or a much larger constant factor in the O(n) function, the "worse" O(n squared) function can still finish faster in absolute terms.',
            },
          ],
        },
        medium: {
          title: 'Comparing Algorithms by Growth Rate',
          body: `Once you can name a complexity, the next skill is ranking them. From best to worst for large inputs: O(1), then O(log n), then O(n), then O(n log n), then O(n squared), then O(2 to the n).

Logarithmic growth is the one worth internalising. Halving the search space each step means a million items take only about 20 comparisons.

    // binary search on a sorted array
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] === target) return mid;
      if (arr[mid] < target) lo = mid + 1;
      else hi = mid - 1;
    }
    // O(log n)

Walk through binary search on a sorted array of 1,000,000 elements. Step 1 eliminates half, leaving 500,000. Step 2 leaves 250,000. Each step halves what is left, and it only takes about 20 halvings to get down to a single element (2^20 is a bit over a million) — that is why log n stays small even for huge n.

Here is a second example, contrasting sequential steps with nested ones directly:

    function processData(list) {
      const sorted = [...list].sort((a, b) => a - b);  // O(n log n)
      let total = 0;
      for (const x of sorted) total += x;              // O(n), runs after the sort
      return total;
    }
    // sequential: O(n log n) + O(n) -> keep the dominant term -> O(n log n)

    function pairwiseCheck(list) {
      for (const a of list) {                // O(n)
        binarySearch(list, a);               // O(log n), runs inside the loop
      }
    }
    // nested: O(n) * O(log n) -> O(n log n)

Notice both examples land on O(n log n), but for different reasons — one because two sequential steps' costs get added and the bigger one wins, the other because one step runs inside another and the costs multiply. Being able to tell "these run one after another" from "this runs inside that" is the whole skill.

When steps run one after another, you keep the dominant term: an O(n) pass followed by an O(n log n) sort is O(n log n). When steps nest, you multiply: an O(n) loop with an O(log n) binary search inside is O(n log n).

The gotcha is hidden cost inside a loop. Calling includes or indexOf inside a for loop looks like one line, but it is an O(n) scan, quietly making your loop O(n squared).

A second gotcha is misjudging which term dominates when adding complexities. O(n) plus O(n squared) is O(n squared), not "O(n squared plus n)" — once n is large, the lower-order term becomes irrelevant, so it gets dropped entirely rather than carried along.

A third gotcha is assuming "sorted first" always helps. Sorting costs O(n log n) up front; if all you need afterward is a single O(n) scan, you have made things worse overall by paying for a sort you did not need, compared to just doing the O(n) scan on the unsorted data directly.

Why this matters: this is the exact analysis behind real engineering decisions — should this endpoint sort its results before returning them, or is an unsorted scan enough; does adding a lookup inside this loop turn an acceptable O(n) endpoint into an O(n squared) one that will time out once the dataset grows. Being able to mentally multiply or add complexities, and to recognize a disguised O(n) operation lurking inside a loop, is exactly what lets an engineer predict whether code will still work at 100x scale before it ships and becomes an incident.

Key takeaway: add sequential steps and keep the dominant term, multiply nested ones, and never trust a one-liner to be O(1).`,
          questions: [
            {
              text: 'Which ordering runs from fastest-growing to slowest-growing?',
              options: [
                'O(1), O(log n), O(n), O(n squared)',
                'O(n squared), O(n log n), O(n), O(log n)',
                'O(log n), O(1), O(n squared), O(n)',
                'O(n), O(log n), O(1), O(n squared)',
              ],
              correct_index: 1,
              explanation: 'Read left to right, this lists complexities from most expensive to least expensive for large n, which is exactly fastest-growing to slowest-growing.',
            },
            {
              text: 'What is the time complexity of binary search on a sorted array of n elements?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 1,
              explanation: 'Each comparison eliminates half of the remaining search space, so the number of comparisons needed grows with the logarithm of n, not n itself.',
            },
            {
              text: 'An O(n) pass runs, and then an O(n log n) sort runs. What is the overall complexity?',
              options: ['O(n)', 'O(n log n)', 'O(n squared log n)', 'O(2n log n)'],
              correct_index: 1,
              explanation: 'When steps run one after another, you keep only the larger, dominant term for large n, and O(n log n) grows faster than O(n), so it wins and the O(n) term is dropped.',
            },
            {
              text: 'A loop over n elements calls arr.includes(x) on an n-element array each iteration. Overall complexity?',
              options: ['O(n)', 'O(n log n)', 'O(n squared)', 'O(1)'],
              correct_index: 2,
              explanation: 'The outer loop runs n times, and each call to includes is itself an O(n) scan, so the total work is n times n, which is O(n squared), even though the code looks like a single loop.',
            },
            {
              text: 'A loop over n elements performs a binary search over the same n elements each iteration. Overall complexity?',
              options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n squared)'],
              correct_index: 2,
              explanation: 'The outer loop runs n times and each iteration nests an O(log n) binary search, so the costs multiply to O(n log n).',
            },
            {
              text: 'Roughly how many comparisons does binary search need to narrow down a sorted array of 1,000,000 elements to one result?',
              options: ['About 20', 'About 1,000', 'About 500,000', 'About 1,000,000'],
              correct_index: 0,
              explanation: 'Since each step halves the remaining elements, and 2^20 is just over a million, it takes about 20 halvings to get from a million elements down to one.',
            },
            {
              text: 'Why do processData (sort then sum) and pairwiseCheck (loop with binary search inside) both end up O(n log n), despite one being sequential and the other nested?',
              options: [
                'They do not actually both end up O(n log n)',
                'One reaches O(n log n) by adding a bigger O(n log n) term to a smaller O(n) term; the other reaches it by multiplying O(n) by O(log n)',
                'Sequential and nested operations are always mathematically identical',
                'Because sort() and binarySearch() are the same operation internally',
              ],
              correct_index: 1,
              explanation: 'Dominant-term addition and multiplication are different operations that can coincidentally land on the same final complexity — recognizing which arithmetic applies to your code matters more than memorising the final answer.',
            },
            {
              text: 'What is wrong with writing a function’s complexity as "O(n squared plus n)"?',
              options: [
                'Nothing is wrong; that is the most precise way to write it',
                'For large n the smaller n term becomes insignificant next to n squared, so convention drops it and simplifies to O(n squared)',
                'O(n squared plus n) is not a valid mathematical expression',
                'It should instead be written as O(n cubed)',
              ],
              correct_index: 1,
              explanation: 'Big-O notation keeps only the dominant, fastest-growing term once n gets large, since lower-order terms contribute a vanishing fraction of the total work.',
            },
            {
              text: 'You need to check whether each of n items exists in an already-sorted list of n items. Which approach avoids an accidental O(n squared)?',
              options: [
                'Use includes() inside a loop over the n items',
                'Use binary search inside a loop over the n items, giving O(n log n) instead of O(n squared)',
                'Sort the list again before every single check',
                'Both approaches are equally fast',
              ],
              correct_index: 1,
              explanation: 'includes() does a linear O(n) scan each time it is called, so calling it n times costs O(n squared); binary search only costs O(log n) per call since the list is already sorted, bringing the total down to O(n log n).',
            },
            {
              text: 'Sorting a list (O(n log n)) purely so you can do a single O(n) scan afterward, when the scan alone would have sufficed unsorted, is best described as:',
              options: [
                'A necessary optimisation',
                'Wasted work - you paid for a sort that added no benefit for that particular task',
                'Impossible, since scans require sorted input',
                'Still O(n) overall, since the scan dominates',
              ],
              correct_index: 1,
              explanation: 'If the task never actually needed sorted order, paying O(n log n) to sort before an O(n) scan is strictly more expensive than just running the O(n) scan directly.',
            },
            {
              text: 'Which best explains why O(log n) algorithms remain fast even for enormous n?',
              options: [
                'They process all n elements but very quickly',
                'Each step eliminates a large fraction of the remaining work, so the number of steps grows much slower than n itself',
                'They skip elements at random until they get lucky',
                'They only work correctly on small inputs',
              ],
              correct_index: 1,
              explanation: 'Halving (or otherwise shrinking by a constant fraction) the remaining search space each step means the number of steps needed grows proportionally to the logarithm of n, which increases extremely slowly compared to n itself.',
            },
            {
              text: 'Two operations run one after another: the first is O(n squared) and the second is O(n). What is the combined complexity?',
              options: [
                'O(n squared) + O(n), left unsimplified',
                'O(n squared), since the lower-order O(n) term is dropped',
                'O(n cubed), since they are combined',
                'O(n), since the second operation runs last',
              ],
              correct_index: 1,
              explanation: 'For sequential steps you sum their costs but keep only the dominant term for large n, and O(n squared) grows faster than O(n), so it swallows the smaller term entirely.',
            },
            {
              text: 'A loop of n iterations contains a nested loop that also runs n times, and inside that a binary search over n elements. What is the overall complexity?',
              options: ['O(n log n)', 'O(n squared)', 'O(n squared log n)', 'O(n cubed)'],
              correct_index: 2,
              explanation: 'Three nested operations multiply their costs together — n (outer) times n (inner) times log n (binary search) gives O(n squared log n).',
            },
            {
              text: 'Which statement about O(2 to the n) (exponential) complexity is accurate?',
              options: [
                'It grows slower than O(n squared) for all n',
                'It is generally considered impractical for anything but very small input sizes, since the work roughly doubles with every additional input element',
                'It is equivalent to O(n log n) for large n',
                'It only applies to sorting algorithms',
              ],
              correct_index: 1,
              explanation: 'Exponential growth means each additional input element roughly doubles the total work, so even modestly sized inputs can already be computationally infeasible, unlike polynomial complexities which grow much more slowly.',
            },
            {
              text: 'You are reviewing code and see a for loop over a list, and inside it a call to a function you have not looked at yet. What is the safest assumption to make about the loop’s overall complexity before checking that function?',
              options: [
                'Assume the loop is O(n), since only one line is inside it',
                'Look at what the called function actually does - its complexity could turn the whole loop into something worse than O(n)',
                'Assume the loop is O(1), since function calls are always constant time',
                'Assume the loop is O(n squared) by default, to be safe',
              ],
              correct_index: 1,
              explanation: 'A function call hides its own complexity behind a single line of code, so the loop’s true complexity cannot be known without checking what that inner call actually does — the same trap as includes() or sort().',
            },
          ],
        },
        hard: {
          title: 'Worst Case, Average Case, and Space',
          body: `A single big-O label hides three different questions: what happens on the worst input, on a typical input, and how much extra memory is consumed. Serious analysis keeps them apart.

Quicksort is the classic illustration. On average it partitions the array roughly in half each time and runs in O(n log n). On an already-sorted array with a naive pivot choice, every partition peels off one element, giving n levels of O(n) work.

    // naive pivot on sorted input
    // [1,2,3,4,5] -> pivot 1 -> [] and [2,3,4,5]
    // then pivot 2 -> [] and [3,4,5] ...
    // n levels, O(n) each  ->  O(n squared)

Walk through why that happens: with the first element always chosen as pivot, a sorted array means the pivot is always the smallest remaining value, so every partition step produces one empty side and one side containing everything else, minus one. That is n partitions, each scanning up to n remaining elements, for roughly n squared comparisons total — the exact opposite of the balanced, log-n-deep recursion that makes quicksort fast on average.

Here is a second example, showing the same worst-case-versus-average-case gap in a completely different structure — a hash map used as a lookup:

    // best/average: hash spreads keys evenly, each bucket short -> O(1) lookup
    // worst case: all keys hash to one bucket -> O(n) lookup, same shape as quicksort's collapse

Both quicksort and a hash map look excellent on average, and both can be pushed to their O(n) or O(n squared) worst case by an unlucky, or deliberately adversarial, choice of input — the pattern of "average is great, worst case is much worse" is not a coincidence specific to either structure; it shows up anywhere an algorithm's performance depends on how well the input happens to spread across some internal partition or bucket scheme.

Space matters just as much. An in-place sort uses O(1) or O(log n) auxiliary memory, while merge sort needs an O(n) scratch buffer. Choosing merge sort inside a memory-constrained service can hurt more than a slower comparison count.

The gotcha is quoting the average case as though it were a guarantee. Hash maps and quicksort are both O(1) or O(n log n) on average and both collapse under adversarial input. When the input is untrusted or latency is a hard limit, budget for the worst case.

A second gotcha is assuming randomising the pivot "fixes" quicksort's worst case entirely. Randomised pivot selection makes the O(n squared) case astronomically unlikely for any fixed input, but it does not make it impossible — an extremely unlucky sequence of random choices can still, in principle, trigger it. That is different from an algorithm like merge sort, whose O(n log n) is a true worst-case guarantee that holds no matter what.

A third gotcha is forgetting that space and time can trade against each other. Merge sort spends O(n) extra memory to guarantee O(n log n) time unconditionally; an in-place sort like heapsort gets the same O(n log n) worst-case time guarantee using only O(1) extra space, but with worse real-world constant factors and cache behaviour. There is rarely a single "best" choice, only a best choice for a given set of constraints.

Why this matters: production systems constantly make this exact tradeoff. A database choosing a sort algorithm for a query with a hard timeout budget cares about the worst case, not the average, because a single slow query can cascade into a timeout, a retry storm, and an outage. A memory-constrained embedded device cares about space more than raw speed. Interviewers ask "what if the input is adversarial" not to be pedantic, but because distinguishing "fast on average" from "fast, guaranteed" is the difference between a system that degrades gracefully under real-world load and one that falls over the first time it meets an unusual or hostile input.

Key takeaway: state which case you mean, count memory as well as time, and never let an average stand in for a guarantee.`,
          questions: [
            {
              text: 'What is the worst-case time complexity of quicksort with a naive first-element pivot?',
              options: ['O(n log n)', 'O(n squared)', 'O(n)', 'O(log n)'],
              correct_index: 1,
              explanation: 'With a naive first-element pivot on already-sorted input, every partition produces one empty side and peels off only a single element, giving n levels of O(n) work each, for O(n squared) overall.',
            },
            {
              text: 'What is quicksort’s average-case time complexity?',
              options: ['O(n)', 'O(n log n)', 'O(n squared)', 'O(log n)'],
              correct_index: 1,
              explanation: 'On average, the chosen pivot splits the array reasonably evenly, giving about log n levels of recursion with O(n) work at each level, for O(n log n) overall.',
            },
            {
              text: 'Which input triggers quicksort worst case when the pivot is always the first element?',
              options: [
                'An array of randomly shuffled distinct values',
                'An already-sorted array',
                'An array whose length is a power of two',
                'An array with exactly one element',
              ],
              correct_index: 1,
              explanation: 'When the pivot is always the first element and the array is already sorted, the pivot is always the smallest remaining value, producing the most unbalanced partition possible at every step.',
            },
            {
              text: 'How much auxiliary space does a standard merge sort need?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 2,
              explanation: 'Merge sort’s merge step combines two sorted halves into a new array before copying back, which requires an additional buffer proportional to n.',
            },
            {
              text: 'Your service sorts untrusted user input under a hard latency budget. Which reasoning is sound?',
              options: [
                'Average case is what matters, since worst-case inputs are rare in practice',
                'Budget for the worst case, because an attacker can choose the input that triggers it',
                'Complexity is irrelevant once the data fits in memory',
                'Pick whichever algorithm has the best average case documented online',
              ],
              correct_index: 1,
              explanation: 'An attacker who controls the input can specifically choose the values that trigger an algorithm’s worst case, so relying on "average case is typical" is not a safe assumption when the input is not trustworthy.',
            },
            {
              text: 'Why does randomising quicksort’s pivot choice reduce, but not eliminate, the chance of hitting O(n squared)?',
              options: [
                'Random pivots guarantee O(n log n) on every single run, no exceptions',
                'Random pivots make the worst-case input astronomically unlikely for any given run, but an unlucky sequence of random choices can still in principle produce it',
                'Randomised pivots only help with already-sorted input, not other patterns',
                'Randomisation has no effect on quicksort’s worst case at all',
              ],
              correct_index: 1,
              explanation: 'Randomising the pivot means an attacker or bad luck can no longer reliably target the worst case using a fixed input pattern, but it is still a probabilistic defense, not a mathematical guarantee.',
            },
            {
              text: 'Which algorithm offers a true worst-case O(n log n) guarantee, unconditionally, regardless of input order?',
              options: [
                'Quicksort with a fixed first-element pivot',
                'Merge sort',
                'Quicksort with a randomised pivot',
                'Insertion sort',
              ],
              correct_index: 1,
              explanation: 'Merge sort always splits the array exactly in half regardless of the data’s order, so its O(n log n) bound holds for every possible input, unlike quicksort, whose partition balance depends on the chosen pivot and the data.',
            },
            {
              text: 'A hash map lookup degrading from O(1) average to O(n) worst case is caused by what, specifically?',
              options: [
                'Running out of memory',
                'Heavy hash collisions concentrating many keys into the same bucket, similar in spirit to quicksort’s unbalanced partitions',
                'The map exceeding its maximum allowed size',
                'Using string keys instead of numeric keys',
              ],
              correct_index: 1,
              explanation: 'Just as quicksort degrades when partitions are wildly unbalanced, a hash map degrades when collisions crowd many keys into one bucket, turning what should be a short chain scan into a scan of nearly the whole table.',
            },
            {
              text: 'Why might a team choose heapsort over merge sort in a memory-constrained embedded system, even though both guarantee O(n log n) worst-case time?',
              options: [
                'Heapsort is always faster in every measurable way',
                'Heapsort sorts in place using O(1) extra space, while merge sort needs an O(n) scratch buffer, which matters when memory is tightly constrained',
                'Merge sort cannot handle large arrays at all',
                'Heapsort has better worst-case time complexity than merge sort',
              ],
              correct_index: 1,
              explanation: 'Both have the same big-O time bound, but heapsort trades some real-world constant-factor speed for using essentially no extra memory, which can be decisive when RAM is the scarce resource.',
            },
            {
              text: 'What does it mean that quicksort is "O(n log n) on average" while a database timeout policy still needs to plan for O(n squared)?',
              options: [
                'The average-case number is simply wrong and should be ignored',
                'Average case describes typical, well-behaved input; a timeout policy has to survive the rare or adversarial input that triggers the worst case',
                'O(n squared) never actually occurs in real databases',
                'Timeout policies are unrelated to algorithmic complexity',
              ],
              correct_index: 1,
              explanation: 'A system that must guarantee it will not hang under any circumstances has to plan for the worst case that can actually occur, not just the case that happens most of the time.',
            },
            {
              text: 'Which of the following best distinguishes "worst case" from "average case" as concepts?',
              options: [
                'They are two names for the same measurement',
                'Worst case bounds the maximum possible work over any input; average case describes the expected work over a typical distribution of inputs',
                'Average case is always larger than worst case',
                'Worst case only applies to sorting algorithms',
              ],
              correct_index: 1,
              explanation: 'Worst case is a guarantee that holds no matter what input arrives, even a maximally unfavorable one, while average case describes what typically happens assuming inputs are drawn from some reasonably well-behaved distribution.',
            },
            {
              text: 'A sorting algorithm is described as "in-place." What does that tell you about its space complexity?',
              options: [
                'It uses O(n) auxiliary space, same as merge sort',
                'It uses little to no auxiliary space beyond the input itself, typically O(1) or O(log n)',
                'It cannot sort arrays larger than available RAM',
                'It is always faster in time complexity than a non-in-place algorithm',
              ],
              correct_index: 1,
              explanation: '"In-place" specifically refers to space usage — it means the algorithm rearranges the existing input using only a small, typically constant or logarithmic amount of extra memory.',
            },
            {
              text: 'Why is it misleading to say "hash maps are O(1)" without qualification?',
              options: [
                'It is not misleading; hash maps are always exactly O(1)',
                'It conflates the average case, which is O(1) under reasonable conditions, with the worst case, which is O(n) when collisions are severe',
                'Hash maps do not have any defined complexity',
                'O(1) only applies to Sets, never to Maps',
              ],
              correct_index: 1,
              explanation: 'Stating a bare "O(1)" without specifying average versus worst case hides the fact that heavy collisions can degrade any single lookup to O(n).',
            },
            {
              text: 'Which scenario most directly calls for budgeting around worst-case complexity rather than average-case complexity?',
              options: [
                'A one-off internal script processing a small, known, trusted dataset',
                'A public-facing API endpoint that accepts and processes arbitrary user-submitted input under a strict timeout',
                'Prototyping an algorithm to see if the general approach works',
                'Sorting a hardcoded list of five values during a demo',
              ],
              correct_index: 1,
              explanation: 'User-submitted input on a public endpoint is exactly the situation where typical, well-behaved data cannot be assumed — an attacker or simply unusual real-world data can trigger the worst case, and a strict timeout leaves no room to tolerate that.',
            },
            {
              text: 'Two algorithms both have O(n log n) average-case time. Algorithm A also has O(n log n) worst-case time; Algorithm B has O(n squared) worst-case time. All else equal, which is the safer choice for a latency-critical, untrusted-input service?',
              options: [
                'Algorithm B, since worst case rarely happens in practice',
                'Algorithm A, since its worst case matches its average case, giving a real guarantee instead of a probabilistic one',
                'They are equally safe, since both average to the same complexity',
                'Neither - average case is the only number that matters for a service',
              ],
              correct_index: 1,
              explanation: 'When worst case and average case are the same, there is an unconditional guarantee that holds regardless of the input; Algorithm B’s much worse worst case means an adversarial or unlucky input could still degrade performance dramatically.',
            },
          ],
        },
      },
    },
  ],
};
