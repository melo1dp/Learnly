// Intro course on the data structures every programmer reaches for daily.
export default {
  title: 'Data Structures Essentials',
  description: 'A hands-on introduction to arrays, hash maps, and the running-time thinking that tells you which one to reach for.',
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

The classic beginner mistake is the off-by-one error: writing scores[scores.length] to reach the last item. That index is one past the end, so you get undefined instead of a value. The last index is always length minus 1.

Key takeaway: arrays give you instant access to any position, as long as you remember that counting starts at zero.`,
          questions: [
            {
              text: 'In the array [10, 20, 30, 40], what is the value at index 2?',
              options: ['20', '30', '40'],
              correct_index: 1,
            },
            {
              text: 'An array has length 8. What is the index of its last element?',
              options: ['8', '7', '9'],
              correct_index: 1,
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
            },
            {
              text: 'What does scores[scores.length] evaluate to in JavaScript for a non-empty array?',
              options: ['The last element', 'undefined', 'The first element', 'It throws an error'],
              correct_index: 1,
            },
            {
              text: 'Which operation on an array is NOT constant time?',
              options: [
                'Reading the element at a known index',
                'Overwriting the element at a known index',
                'Searching an unsorted array for a given value',
              ],
              correct_index: 2,
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

So an array makes a fine stack, where you only ever touch the end, but a poor queue, where you add at one end and remove from the other.

A common gotcha is deleting while looping forwards. Each removal shifts the remaining items left, so the loop index skips the element that slid into the vacated slot. Iterate backwards, or build a new filtered array instead.

Key takeaway: array ends are cheap, array middles are expensive, and mutating during a forward loop silently skips elements.`,
          questions: [
            {
              text: 'What is the worst-case time to insert an element at the front of an array of n elements?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 2,
            },
            {
              text: 'Which pair of operations is constant time on a JavaScript array?',
              options: ['push and pop', 'shift and unshift', 'splice and shift', 'unshift and pop'],
              correct_index: 0,
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
            },
            {
              text: 'You loop i from 0 upward and remove matching elements as you go. What goes wrong?',
              options: [
                'The loop never terminates',
                'The array is reversed as a side effect',
                'Elements shift left, so the item after a removed one is skipped',
              ],
              correct_index: 2,
            },
            {
              text: 'Removing the last element of an n-element array requires how many element shifts?',
              options: ['n shifts', 'n minus 1 shifts', 'Zero shifts', 'Half of n shifts'],
              correct_index: 2,
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

Averaged over the whole sequence, each push costs constant time. That is what amortised O(1) means: any one push may be slow, but a run of n pushes cannot be.

The gotcha is treating amortised as if it were worst case. In a latency-sensitive loop, one unlucky push can stall while megabytes are copied. Amortised guarantees say nothing about the slowest single operation. Growing by a constant amount instead of doubling breaks the guarantee entirely, giving O(n) per push on average.

Key takeaway: doubling buys amortised O(1) appends, but never confuse an average with a worst case.`,
          questions: [
            {
              text: 'What is the amortised time of pushing onto a dynamic array that doubles its capacity?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 0,
            },
            {
              text: 'What is the worst-case time of a single push onto a dynamic array?',
              options: ['O(1)', 'O(log n)', 'O(n)'],
              correct_index: 2,
            },
            {
              text: 'A dynamic array grows by adding a fixed 10 slots each time it fills. What is the amortised cost per push?',
              options: [
                'Still O(1), because 10 is a constant',
                'O(n), because the number of copies grows linearly with the array',
                'O(log n), because resizes become rarer',
              ],
              correct_index: 1,
            },
            {
              text: 'Total element copies while growing to size n by doubling is best described as:',
              options: [
                'Roughly n squared, since every push may copy',
                'Roughly n log n, one copy pass per doubling',
                'Bounded by about 2n, since 1 + 2 + 4 + ... + n/2 is less than n',
              ],
              correct_index: 2,
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

A frequent surprise is that hash maps carry no ordering of their keys. You cannot ask a hash map for its smallest key without inspecting every entry, and searching by value, rather than by key, means walking the whole map.

Key takeaway: a hash map trades ordering away in exchange for near-instant lookup by key.`,
          questions: [
            {
              text: 'What does a hash function do in a hash map?',
              options: [
                'It sorts the keys so lookups can use binary search',
                'It converts a key into an index into the bucket array',
                'It compresses the values to save memory',
              ],
              correct_index: 1,
            },
            {
              text: 'What is the average-case time to look up a value by key in a hash map?',
              options: ['O(1)', 'O(log n)', 'O(n)'],
              correct_index: 0,
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
            },
            {
              text: 'You want to know if the value 42 exists anywhere in a hash map of n entries. What does that cost?',
              options: [
                'O(1), the same as a key lookup',
                'O(n), because values are not hashed, only keys are',
                'O(log n), because buckets form a tree',
              ],
              correct_index: 1,
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

One pass, O(n) time, O(n) extra memory. That memory is the price: you are buying speed with space.

The gotcha is key identity. In a JavaScript object, keys become strings, so 1 and '1' collide. In a Map, two structurally identical objects are still different keys, because Map compares by reference. Frequency counting silently breaks when you assume otherwise.

Key takeaway: a hash map converts a repeated search into a lookup, trading memory for a whole factor of n.`,
          questions: [
            {
              text: 'Using a hash map, what is the time complexity of the one-pass two-sum solution?',
              options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n squared)'],
              correct_index: 1,
            },
            {
              text: 'What is the extra space used by that one-pass two-sum solution in the worst case?',
              options: ['O(1)', 'O(log n)', 'O(n)'],
              correct_index: 2,
            },
            {
              text: 'You must find, for each of n queries, whether a value exists in a list of n items. Which approach is fastest overall?',
              options: [
                'Scan the list for each query, giving O(n squared)',
                'Build a hash set once, then answer each query in O(1), giving O(n)',
                'Sort the list, then linear scan per query, giving O(n squared)',
              ],
              correct_index: 1,
            },
            {
              text: 'In a plain JavaScript object used as a map, what happens with obj[1] and obj["1"]?',
              options: [
                'They are separate keys, since one is a number',
                'They are the same key, because object keys are coerced to strings',
                'Using a number as a key throws a TypeError',
              ],
              correct_index: 1,
            },
            {
              text: 'Why does using two structurally identical objects as Map keys give you two entries?',
              options: [
                'Map keys are hashed by their JSON representation',
                'Map compares keys by reference identity, not deep equality',
                'Map does not allow object keys at all, so it stringifies them',
              ],
              correct_index: 1,
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

Two gotchas. A mutable key is a trap: mutate an object after inserting it and its hash no longer matches its bucket, so the entry becomes unreachable. And a predictable hash function invites an adversary to feed you colliding keys on purpose, a hash-flooding denial of service.

Key takeaway: hash maps are O(1) on average and O(n) at worst, and a sane load factor plus a good hash function keep you on the happy path.`,
          questions: [
            {
              text: 'What is the worst-case time for a lookup in a chained hash map holding n keys?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 2,
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
            },
            {
              text: 'You insert an object as a key, then mutate a field the hash function reads. What happens?',
              options: [
                'The map automatically rehashes the entry',
                'The entry is likely unreachable, since its hash no longer points at its bucket',
                'Nothing changes, because keys are deep-copied on insert',
              ],
              correct_index: 1,
            },
            {
              text: 'An attacker sends thousands of keys crafted to hash into the same bucket. What is the effect?',
              options: [
                'The table silently drops the duplicate keys',
                'Lookups stay O(1), since chaining handles any number of collisions',
                'Operations degrade toward O(n), a hash-flooding denial of service',
              ],
              correct_index: 2,
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

The common misreading is treating big-O as a measure of speed. An O(n) algorithm can easily beat an O(log n) one on small inputs, because constants are real even though big-O drops them. Big-O tells you how things scale, not which is faster today.

Key takeaway: big-O is about the growth curve, not the clock.`,
          questions: [
            {
              text: 'What is the time complexity of summing every element of an array of n numbers?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n squared)'],
              correct_index: 2,
            },
            {
              text: 'A loop nested inside another loop, each running over all n elements, is:',
              options: ['O(n)', 'O(2n)', 'O(n squared)', 'O(log n)'],
              correct_index: 2,
            },
            {
              text: 'For an O(n squared) algorithm, doubling the input size multiplies the work by roughly:',
              options: ['2', '4', '8'],
              correct_index: 1,
            },
            {
              text: 'Which statement about big-O is correct?',
              options: [
                'It tells you the exact runtime in milliseconds',
                'It describes how work grows with input size, ignoring constant factors',
                'A lower big-O always runs faster on every input size',
              ],
              correct_index: 1,
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

When steps run one after another, you keep the dominant term: an O(n) pass followed by an O(n log n) sort is O(n log n). When steps nest, you multiply: an O(n) loop with an O(log n) binary search inside is O(n log n).

The gotcha is hidden cost inside a loop. Calling includes or indexOf inside a for loop looks like one line, but it is an O(n) scan, quietly making your loop O(n squared).

Key takeaway: add sequential steps and keep the dominant term, multiply nested ones, and never trust a one-liner to be O(1).`,
          questions: [
            {
              text: 'Which ordering runs from fastest-growing to slowest-growing?',
              options: [
                'O(1), O(log n), O(n), O(n squared)',
                'O(n squared), O(n log n), O(n), O(log n)',
                'O(log n), O(1), O(n squared), O(n)',
              ],
              correct_index: 1,
            },
            {
              text: 'What is the time complexity of binary search on a sorted array of n elements?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 1,
            },
            {
              text: 'An O(n) pass runs, and then an O(n log n) sort runs. What is the overall complexity?',
              options: ['O(n)', 'O(n log n)', 'O(n squared log n)'],
              correct_index: 1,
            },
            {
              text: 'A loop over n elements calls arr.includes(x) on an n-element array each iteration. Overall complexity?',
              options: ['O(n)', 'O(n log n)', 'O(n squared)', 'O(1)'],
              correct_index: 2,
            },
            {
              text: 'A loop over n elements performs a binary search over the same n elements each iteration. Overall complexity?',
              options: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n squared)'],
              correct_index: 2,
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

Space matters just as much. An in-place sort uses O(1) or O(log n) auxiliary memory, while merge sort needs an O(n) scratch buffer. Choosing merge sort inside a memory-constrained service can hurt more than a slower comparison count.

The gotcha is quoting the average case as though it were a guarantee. Hash maps and quicksort are both O(1) or O(n log n) on average and both collapse under adversarial input. When the input is untrusted or latency is a hard limit, budget for the worst case.

Key takeaway: state which case you mean, count memory as well as time, and never let an average stand in for a guarantee.`,
          questions: [
            {
              text: 'What is the worst-case time complexity of quicksort with a naive first-element pivot?',
              options: ['O(n log n)', 'O(n squared)', 'O(n)', 'O(log n)'],
              correct_index: 1,
            },
            {
              text: 'What is quicksort average-case time complexity?',
              options: ['O(n)', 'O(n log n)', 'O(n squared)'],
              correct_index: 1,
            },
            {
              text: 'Which input triggers quicksort worst case when the pivot is always the first element?',
              options: [
                'An array of randomly shuffled distinct values',
                'An already-sorted array',
                'An array whose length is a power of two',
              ],
              correct_index: 1,
            },
            {
              text: 'How much auxiliary space does a standard merge sort need?',
              options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
              correct_index: 2,
            },
            {
              text: 'Your service sorts untrusted user input under a hard latency budget. Which reasoning is sound?',
              options: [
                'Average case is what matters, since worst-case inputs are rare in practice',
                'Budget for the worst case, because an attacker can choose the input that triggers it',
                'Complexity is irrelevant once the data fits in memory',
              ],
              correct_index: 1,
            },
          ],
        },
      },
    },
  ],
};
