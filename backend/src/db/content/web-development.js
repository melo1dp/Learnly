// Front-end fundamentals: the structure, style and behaviour of a web page.
export default {
  title: 'Web Development Foundations',
  description: 'Build a web page from the ground up with HTML structure, CSS styling, and DOM behaviour.',
  topics: [
    {
      topic: 'html',
      lessons: {
        easy: {
          title: 'Elements, Tags and Attributes',
          body: `HTML is the language that gives a web page its structure. You write elements, and the browser turns them into things people can see: headings, paragraphs, links, images. An element is usually a start tag, some content, and an end tag.

A tiny page looks like this:

    <h1>Hello</h1>
    <p>Welcome to my <a href="/about">site</a>.</p>

Here h1 is a heading, p is a paragraph, and a is a link. The href part is an attribute: extra information the element needs to do its job. Attributes always live inside the start tag, never the end tag.

The most common beginner mistake is closing tags in the wrong order, like opening a paragraph, opening a bold element inside it, then closing the paragraph first. Browsers try to guess what you meant, and their guess is rarely what you wanted. Nest elements like boxes inside boxes: whatever you open last, you close first.

Key takeaway: HTML describes what your content is, and the browser decides how to draw it.`,
          questions: [
            {
              text: 'What does HTML mainly describe on a web page?',
              options: [
                'The colours and fonts used on the page',
                'The structure and content of the page',
                'The animations that run when a button is clicked',
              ],
              correct_index: 1,
            },
            {
              text: 'In <a href="/about">About</a>, what is href?',
              options: [
                'An element',
                'A closing tag',
                'An attribute of the a element',
              ],
              correct_index: 2,
            },
            {
              text: 'Which snippet nests its elements correctly?',
              options: [
                '<p><strong>Hi</p></strong>',
                '<p><strong>Hi</strong></p>',
                '<strong><p>Hi</strong></p>',
              ],
              correct_index: 1,
            },
            {
              text: 'Where must attributes be written?',
              options: [
                'Inside the start tag',
                'Inside the end tag',
                'On the line above the element',
              ],
              correct_index: 0,
            },
            {
              text: 'Which element represents the most important heading on a page?',
              options: [
                'h6',
                'head',
                'h1',
              ],
              correct_index: 2,
            },
          ],
        },
        medium: {
          title: 'Semantic Markup and Document Structure',
          body: `Every element carries meaning, and choosing the right one is called writing semantic HTML. A div is a generic box with no meaning at all. A nav, a main, an article or a button tell the browser, search engines and screen readers what a chunk of the page actually is.

Compare these two ways of writing the same thing:

    <div class="btn" onclick="save()">Save</div>

    <button type="button" onclick="save()">
      Save
    </button>

They can be styled to look identical, but only the real button is focusable with the Tab key, fires on the Enter and Space keys, and is announced as a button to assistive technology. You would have to rebuild all of that by hand for the div.

A common gotcha is treating heading levels as font sizes. Skipping from h1 straight to h4 because it "looks right" breaks the document outline that screen reader users navigate by. Pick the heading level that reflects the nesting of your content, then resize it with CSS.

Key takeaway: reach for the element that means the thing, and use div only when nothing else fits.`,
          questions: [
            {
              text: 'What is the main advantage of using a button element instead of a styled div?',
              options: [
                'It loads faster than a div',
                'It is keyboard focusable and announced as a button by screen readers',
                'It cannot be styled, so the page stays consistent',
              ],
              correct_index: 1,
            },
            {
              text: 'Which element is the correct choice for the primary content of a page?',
              options: [
                'main',
                'div',
                'section',
                'body',
              ],
              correct_index: 0,
            },
            {
              text: 'Why should you not skip from an h1 to an h4 just to get a smaller size?',
              options: [
                'The browser refuses to render an h4 without an h3',
                'It breaks the document outline that assistive technology relies on',
                'Heading levels below h3 are ignored by CSS',
              ],
              correct_index: 1,
            },
            {
              text: 'What semantic meaning does a div element carry?',
              options: [
                'It marks a navigation region',
                'It marks a self-contained article',
                'None, it is a generic container',
              ],
              correct_index: 2,
            },
            {
              text: 'A list of links to other pages of the site is best wrapped in which element?',
              options: [
                'aside',
                'nav',
                'footer',
              ],
              correct_index: 1,
            },
          ],
        },
        hard: {
          title: 'Forms, Labels and Accessible Inputs',
          body: `Forms are where HTML gets subtle. An input on its own is just a box. What makes it usable is the wiring around it: a label, a name, and the right type.

A label is tied to its input by matching the label for value to the input id, not by sitting next to it:

    <label for="email">Email</label>
    <input id="email" name="email"
           type="email" required>

Now clicking the word Email focuses the box, and a screen reader announces the field by name. The name attribute, not the id, is what gets submitted with the form data, so an input without a name is silently dropped on submit.

Two gotchas bite often. A button inside a form defaults to type submit, so a Cancel button written as a plain button element will submit the form unless you set type to button. And placeholder text is not a label: it vanishes as soon as the user types, and many screen readers skip it entirely.

Key takeaway: id connects a label, name carries the value, and type unlocks the right keyboard and validation.`,
          questions: [
            {
              text: 'Which attribute on an input determines the key used when the form data is submitted?',
              options: [
                'id',
                'name',
                'for',
                'type',
              ],
              correct_index: 1,
            },
            {
              text: 'How is a label element correctly associated with its input?',
              options: [
                'The label for value matches the input id',
                'The label for value matches the input name',
                'The label simply appears immediately before the input',
              ],
              correct_index: 0,
            },
            {
              text: 'Inside a form, what happens when you write <button>Cancel</button> with no type attribute?',
              options: [
                'It does nothing until you attach a click handler',
                'It resets the form fields to their default values',
                'It submits the form, because type defaults to submit',
              ],
              correct_index: 2,
            },
            {
              text: 'Why is placeholder text a poor replacement for a label?',
              options: [
                'It disappears once the user starts typing and is unreliably announced',
                'It can only hold a very small number of characters',
                'It prevents the field from being submitted',
              ],
              correct_index: 0,
            },
            {
              text: 'What does setting type to email on an input actually give you?',
              options: [
                'Guaranteed proof that the address exists',
                'Automatic sending of the message to that address',
                'Built-in format validation and an email-oriented mobile keyboard',
              ],
              correct_index: 2,
            },
          ],
        },
      },
    },
    {
      topic: 'css',
      lessons: {
        easy: {
          title: 'Selectors, Properties and Values',
          body: `CSS decides how your HTML looks. You write rules, and each rule has two halves: a selector that picks elements, and a block of declarations that change them. A declaration is a property, a colon, a value, and a semicolon.

    p {
      color: navy;
      font-size: 16px;
    }

    .warning {
      color: red;
    }

The first rule targets every paragraph on the page. The second targets anything carrying class="warning", because a leading dot means class. A leading hash means id, and a bare word like p means the element type itself.

The classic early mistake is forgetting the dot. Writing warning instead of .warning tells the browser to look for an element called warning, which does not exist, so nothing happens and no error is reported. CSS fails quietly: a typo in a property name or a missing semicolon usually causes that one declaration to be skipped while the rest of the rule still applies.

Key takeaway: a selector chooses the elements, the declarations describe the change, and silence means your selector matched nothing.`,
          questions: [
            {
              text: 'In the rule p { color: navy; }, which part is the selector?',
              options: [
                'color',
                'navy',
                'p',
              ],
              correct_index: 2,
            },
            {
              text: 'Which selector targets every element with class="warning"?',
              options: [
                '.warning',
                '#warning',
                'warning',
              ],
              correct_index: 0,
            },
            {
              text: 'What does a leading hash, as in #header, select?',
              options: [
                'Every element of type header',
                'The element whose id is header',
                'Every element with class header',
              ],
              correct_index: 1,
            },
            {
              text: 'What happens when you misspell a CSS property name?',
              options: [
                'The browser throws a visible error in the page',
                'The whole stylesheet stops being applied',
                'That one declaration is ignored and the rest still apply',
              ],
              correct_index: 2,
            },
            {
              text: 'Which piece of a declaration is the value?',
              options: [
                'The part before the colon',
                'The part between the colon and the semicolon',
                'The part inside the curly braces before the property',
              ],
              correct_index: 1,
            },
          ],
        },
        medium: {
          title: 'The Box Model and Flexbox Layout',
          body: `Every element the browser draws is a box, made of four layers stacked outward: the content, then padding, then a border, then margin. Padding is space inside the border, margin is space outside it.

By default, a width of 300px means 300px of content, and padding and border are added on top, so the box ends up wider than you asked for. The fix is one rule most projects set once:

    * {
      box-sizing: border-box;
    }

Now width includes padding and border, and 300px really is 300px on screen.

To place boxes next to each other, use Flexbox. Set display to flex on the parent, and its direct children line up in a row. justify-content spreads them along that row, align-items positions them across it.

The gotcha is where those properties live: they belong on the flex container, not on the children. Setting justify-content on a child does nothing. Another surprise is that vertical margins between two stacked block boxes collapse into one, so 20px above and 20px below gives you 20px of gap, not 40px.

Key takeaway: control the box with border-box, then let the flex parent do the arranging.`,
          questions: [
            {
              text: 'Which layer of the box model sits between the content and the border?',
              options: [
                'Margin',
                'Padding',
                'Outline',
              ],
              correct_index: 1,
            },
            {
              text: 'What does box-sizing: border-box change?',
              options: [
                'Width and height start including padding and border',
                'Borders are removed from the element entirely',
                'Margins begin counting toward the element width',
              ],
              correct_index: 0,
            },
            {
              text: 'On which element do you set justify-content?',
              options: [
                'On each flex item',
                'On the flex container',
                'On the body element only',
              ],
              correct_index: 1,
            },
            {
              text: 'Two stacked block elements have a 20px bottom margin and a 20px top margin. What is the visible gap?',
              options: [
                '40px, the margins add together',
                '0px, adjacent margins cancel out',
                '20px, the margins collapse into the larger of the two',
              ],
              correct_index: 2,
            },
            {
              text: 'With the default box-sizing, what is the rendered width of a box with width 300px, 20px padding on each side and a 5px border on each side?',
              options: [
                '300px',
                '350px',
                '325px',
              ],
              correct_index: 1,
            },
          ],
        },
        hard: {
          title: 'Cascade, Specificity and Inheritance',
          body: `When two rules target the same element and set the same property, the browser needs a tie-breaker. It looks at specificity first, and only falls back to source order when specificity is equal.

Specificity is counted as three numbers: ids, then classes and attribute selectors and pseudo-classes, then element selectors. Compare these:

    #menu a      -> 1 id, 0 classes, 1 element
    .nav .link   -> 0 ids, 2 classes, 0 elements

The first wins, and it wins no matter which one appears later in the file, because a single id outranks any number of classes. That is why an id-based rule is so hard to override, and why most codebases stick to classes.

The gotcha is that inheritance is a separate mechanism. Properties like color and font-family flow down to children automatically, but a directly matched rule on the child always beats an inherited value from the parent, even a very specific one. Also remember that inline style attributes outrank your stylesheet entirely.

Key takeaway: specificity settles conflicts between rules on the same element, and only source order breaks a genuine tie.`,
          questions: [
            {
              text: 'Which selector has the highest specificity?',
              options: [
                '.nav .link .active',
                '#menu a',
                'nav ul li a',
              ],
              correct_index: 1,
            },
            {
              text: 'Two rules have identical specificity and set the same property. Which one wins?',
              options: [
                'The one that appears later in the source',
                'The one that appears earlier in the source',
                'Neither, the property is dropped',
              ],
              correct_index: 0,
            },
            {
              text: 'A parent has color: blue. A low-specificity rule sets color: green directly on the child. What colour is the child text?',
              options: [
                'Blue, because the parent value is inherited',
                'Green, because a directly matched rule beats an inherited value',
                'Blue, because inherited values outrank weak selectors',
              ],
              correct_index: 1,
            },
            {
              text: 'Where does an inline style attribute sit relative to stylesheet rules?',
              options: [
                'It is overridden by any class selector',
                'It is treated the same as an id selector',
                'It outranks normal stylesheet rules regardless of their selectors',
              ],
              correct_index: 2,
            },
            {
              text: 'Why do many teams avoid styling by id?',
              options: [
                'Id selectors are slower for the browser to match',
                'Ids cannot be combined with other selectors',
                'Their specificity is so high that later class rules cannot override them',
              ],
              correct_index: 2,
            },
          ],
        },
      },
    },
    {
      topic: 'dom',
      lessons: {
        easy: {
          title: 'Finding and Changing Elements',
          body: `When the browser loads your HTML it builds a live object model of the page called the DOM. JavaScript can read that model and change it, and the screen updates immediately.

To change something you first have to find it. querySelector takes any CSS selector you already know and returns the first matching element, or null if nothing matches.

    const title = document.querySelector('h1');
    title.textContent = 'Updated!';

    const items =
      document.querySelectorAll('.item');
    console.log(items.length);

querySelectorAll returns every match as a list you can loop over. Once you hold an element, textContent swaps its text and classList.add or classList.remove toggles styling.

The gotcha that catches everyone is running this code before the element exists. A script in the head runs while the body is still being parsed, so querySelector returns null and the next line throws. Put your script tag at the end of the body, or add the defer attribute to it.

Key takeaway: select an element, then mutate it, and make sure the element is on the page before you go looking for it.`,
          questions: [
            {
              text: 'What does the DOM represent?',
              options: [
                'A live object model of the page that JavaScript can read and change',
                'The raw HTML text file exactly as it was written on disk',
                'The stylesheet rules currently applied to the page',
              ],
              correct_index: 0,
            },
            {
              text: 'What does document.querySelector return when nothing matches?',
              options: [
                'An empty list',
                'null',
                'The body element',
              ],
              correct_index: 1,
            },
            {
              text: 'Which call gives you every element with the class item?',
              options: [
                "document.querySelector('.item')",
                "document.querySelectorAll('.item')",
                "document.querySelectorAll('item')",
              ],
              correct_index: 1,
            },
            {
              text: 'Why might a script in the head fail to find an element that is clearly in the HTML?',
              options: [
                'Scripts in the head are not allowed to touch the DOM',
                'The element must be given an id before it can be selected',
                'The script runs before the body has been parsed, so the element does not exist yet',
              ],
              correct_index: 2,
            },
            {
              text: 'Which property replaces the text inside an element?',
              options: [
                'textContent',
                'classList',
                'value',
              ],
              correct_index: 0,
            },
          ],
        },
        medium: {
          title: 'Events and Responding to the User',
          body: `A page becomes interactive when it listens for events. An event is something that happens, like a click, a keypress or a form submission, and addEventListener lets you run a function when it does.

    const btn =
      document.querySelector('#save');

    btn.addEventListener('click', (event) => {
      console.log(event.target);
      btn.classList.add('saved');
    });

The listener receives an event object. Its target tells you which element the event came from, and preventDefault stops the browser doing its built-in reaction to it.

That last one matters most with forms. A submit event reloads the page by default, wiping out everything your script just did, so a handler that updates the page must call preventDefault first.

Two gotchas. Pass the function itself, not the result of calling it: addEventListener with a function name followed by parentheses runs it immediately and registers its return value instead. And watch out for stacking listeners: registering a fresh anonymous function every time your setup code runs adds a new listener each time, and they all fire, which is a frequent cause of duplicated rows. Registering the exact same function reference again is simply ignored by the browser.

Key takeaway: listen for the event, inspect the event object, and prevent the default when you intend to handle it yourself.`,
          questions: [
            {
              text: 'What is wrong with element.addEventListener("click", handleClick());?',
              options: [
                'Nothing, it is the standard form',
                'It calls handleClick immediately and registers its return value',
                'The event name must be written as onclick',
              ],
              correct_index: 1,
            },
            {
              text: 'What does event.preventDefault() do inside a form submit handler?',
              options: [
                'Stops the browser from reloading the page to submit the form',
                'Stops other listeners on the same element from running',
                'Clears every field in the form',
              ],
              correct_index: 0,
            },
            {
              text: 'Which property of the event object tells you which element the event originated from?',
              options: [
                'event.type',
                'event.detail',
                'event.target',
              ],
              correct_index: 2,
            },
            {
              text: 'You call addEventListener for click twice on the same button, passing a new anonymous function each time. What happens on one click?',
              options: [
                'Only the first function runs, the second is ignored',
                'Both functions run, so the work happens twice',
                'An error is thrown for the second registration',
              ],
              correct_index: 1,
            },
          ],
        },
        hard: {
          title: 'Bubbling, Delegation and Layout Cost',
          body: `Events do not fire only on the element you clicked. They travel: first down from the document to the target, the capture phase, and then back up through every ancestor, the bubble phase. Listeners run in the bubble phase unless you ask otherwise.

Bubbling is what makes delegation possible. Instead of one listener per row, attach a single listener to the parent and read the target:

    list.addEventListener('click', (e) => {
      const row = e.target.closest('li');
      if (!row) return;
      row.remove();
    });

This keeps working for rows added later, because the listener lives on the parent, which was there all along.

The subtlety is closest. The target is the deepest element clicked, often a span inside the row rather than the row itself, so walking up to the nearest matching ancestor is what makes delegation reliable. Also do not confuse stopPropagation, which halts the bubble, with preventDefault, which cancels the browser default: they are unrelated.

Finally, reading a layout value like offsetHeight forces the browser to recalculate layout, so reading and writing in a loop causes thrashing. Batch your reads, then your writes.

Key takeaway: let events bubble to one parent listener, and keep layout reads out of your write loops.`,
          questions: [
            {
              text: 'Why does event delegation keep working for list items added after the page loads?',
              options: [
                'New elements automatically inherit their parent listeners',
                'The listener is on the parent, and events from new children bubble up to it',
                'The browser re-runs addEventListener whenever the DOM changes',
              ],
              correct_index: 1,
            },
            {
              text: 'In a delegated handler, why is e.target.closest("li") safer than assuming e.target is the li?',
              options: [
                'closest is faster than reading target directly',
                'target is always the parent element, never the clicked one',
                'target is the deepest element clicked, which may be a child inside the li',
              ],
              correct_index: 2,
            },
            {
              text: 'What is the difference between stopPropagation and preventDefault?',
              options: [
                'stopPropagation halts bubbling; preventDefault cancels the browser default action',
                'They are aliases for the same behaviour',
                'stopPropagation cancels the default action; preventDefault removes the listener',
              ],
              correct_index: 0,
            },
            {
              text: 'In which order do the phases of an event occur?',
              options: [
                'Bubble, then target, then capture',
                'Capture, then target, then bubble',
                'Target, then capture, then bubble',
              ],
              correct_index: 1,
            },
            {
              text: 'Why does alternating reads of offsetHeight with style writes in a loop hurt performance?',
              options: [
                'Each read forces the browser to recalculate layout, causing repeated thrashing',
                'offsetHeight allocates a new DOM node on every access',
                'Style writes are queued forever and never flushed',
              ],
              correct_index: 0,
            },
          ],
        },
      },
    },
  ],
};
