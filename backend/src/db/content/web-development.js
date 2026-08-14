// Front-end fundamentals: the structure, style and behaviour of a web page.
export default {
  title: 'Web Development Foundations',
  description: 'Build a web page from the ground up with HTML structure, CSS styling, and DOM behaviour.',
  category: 'Computing',
  level: 'beginner',
  rating: 4.5,
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

Walk through what the browser does with that snippet and the structure becomes obvious. It reads <h1>, opens a heading box, reads "Hello", then hits </h1> and closes the box. Next it opens a paragraph box, reads "Welcome to my ", meets <a href="/about">, opens a link inside that same paragraph box, reads "site", closes the link, reads the trailing period, then closes the paragraph. Nothing here describes colour, spacing or font — the browser is assembling a structure, not painting a picture.

Attributes do more than build links. A second example shows an image and a form control:

    <img src="cat.jpg" alt="A sleeping cat" width="200">
    <input type="text" placeholder="Your name" disabled>

img has no closing tag and no content of its own between tags — everything it needs comes from attributes. src points at the file, alt supplies a description for anyone who cannot see the image, and width hints at its rendered size before the file has even downloaded. input behaves similarly: type changes what kind of control gets rendered, and disabled is a boolean attribute, meaning just writing the word switches it on — you never write disabled="true".

Three mistakes trip up almost everyone starting out. The first is closing tags in the wrong order: opening a paragraph, opening a bold element inside it, then closing the paragraph before the bold. Browsers try to recover from this by guessing your intent, and the guess is rarely the one you wanted, often letting bold styling leak into content that was never meant to carry it. Nest elements like boxes inside boxes: whatever you open last, you close first. The second is assuming every element needs a closing tag — img, br and input never take one, and writing </img> is silently ignored rather than flagged as an error, which can leave you confused about why "fixing" it changed nothing. The third is treating alt as optional decoration: it costs nothing to skip, but doing so leaves the image silent to a screen reader user and makes it invisible to search engines, and if the file fails to load, the alt text is often all a visitor ever sees in its place.

This matters well beyond getting a page to render correctly once. Every layer you add later depends on this structure being sound. CSS selectors target elements and attributes directly, JavaScript reads and rewrites the same structure through the DOM, and search engines and assistive technology parse your markup to work out what your page actually contains. A page built from correctly nested elements and honestly filled-in attributes stays legible to tools you will never personally test against. Get the structure wrong here, and every layer stacked on top of it — styling, scripting, accessibility — inherits the same confusion.

Key takeaway: HTML describes what your content is, and the browser decides how to draw it.`,
          questions: [
            {
              text: 'What does HTML mainly describe on a web page?',
              options: [
                'The colours and fonts used on the page',
                'The structure and content of the page',
                'The animations that run when a button is clicked',
                "The database that stores the page's data",
              ],
              correct_index: 1,
              explanation: "HTML's job is structure and content — headings, paragraphs, links. Colours and fonts are CSS's job, animations are usually CSS or JavaScript, and a database is a backend concern entirely separate from the page markup.",
            },
            {
              text: 'In <a href="/about">About</a>, what is href?',
              options: [
                'An element',
                'A closing tag',
                'An attribute of the a element',
                'The text shown to the user',
              ],
              correct_index: 2,
              explanation: 'href is an attribute — extra information written inside the start tag that tells the browser where the link should go. The word "About" between the tags is the visible content, not the attribute.',
            },
            {
              text: 'Which snippet nests its elements correctly?',
              options: [
                '<p><strong>Hi</p></strong>',
                '<p><strong>Hi</strong></p>',
                '<strong><p>Hi</strong></p>',
                '<p><strong>Hi</strong>',
              ],
              correct_index: 1,
              explanation: 'Whatever you open last must close first. This option opens p then strong, and closes strong then p, so the tags nest like boxes inside boxes. The others close out of order or leave a tag unclosed.',
            },
            {
              text: 'Where must attributes be written?',
              options: [
                'Inside the start tag',
                'Inside the end tag',
                'On the line above the element',
                'Between the start and end tag, next to the content',
              ],
              correct_index: 0,
              explanation: 'Attributes live inside the start tag only — end tags never carry attributes, and there is no such thing as writing them on a separate line or mixed in with the content.',
            },
            {
              text: 'Which element represents the most important heading on a page?',
              options: [
                'h6',
                'head',
                'h1',
                'header',
              ],
              correct_index: 2,
              explanation: 'h1 is the highest-ranking heading level. head is a completely different, invisible element that holds page metadata, and header is a semantic layout element, not a heading level.',
            },
            {
              text: 'What content does the img element display between its start and end tags?',
              options: [
                'Its src attribute value',
                'Its alt attribute value',
                'Nothing — img has no closing tag or content between tags',
                'A caption you write between <img> and </img>',
              ],
              correct_index: 2,
              explanation: "img is a self-closing style element: it has no separate closing tag and nothing goes between it, because it is not a container. Everything about it — the image, its fallback text — comes from attributes.",
            },
            {
              text: 'What is a boolean attribute like disabled?',
              options: [
                'An attribute that must be written disabled="true"',
                'An attribute that turns a feature on just by being present, with no value needed',
                'An attribute that only works on the body element',
                'An attribute that can only be set to the words true or false',
              ],
              correct_index: 1,
              explanation: 'Boolean attributes switch a feature on simply by being written — disabled by itself is enough. Writing disabled="true" does not add any meaning; it is the attribute’s presence, not its value, that matters.',
            },
            {
              text: 'Which of these is NOT a valid reason to give an img element an alt attribute?',
              options: [
                'It describes the image to screen reader users',
                'It appears in place of the image if the file fails to load',
                'It is required for the image to display at all',
                'Search engines use it to understand what the image shows',
              ],
              correct_index: 2,
              explanation: 'alt is about description and fallback, not display — an img with no alt still renders fine. Its real value is accessibility, resilience to broken image links, and search indexing.',
            },
            {
              text: 'Why does <div>Hi</strong></div> confuse the browser?',
              options: [
                'div is not allowed to contain text',
                'The closing tag </strong> has no matching opening tag, so the browser has to guess what was meant',
                'strong elements cannot appear inside div elements',
                'Hi is not wrapped in quotes',
              ],
              correct_index: 1,
              explanation: "There is no <strong> to match that closing tag, so the browser silently recovers as best it can rather than showing an error — which is exactly why mismatched tags are so easy to miss while writing markup.",
            },
            {
              text: 'Which pair correctly matches an element to what it is generally used for?',
              options: [
                'p for a paragraph of text, a for a link',
                'h1 for a paragraph, p for a heading',
                'a for an image, img for a link',
                'br for a paragraph break, p for a line break',
              ],
              correct_index: 0,
              explanation: 'p wraps a block of text and a creates a hyperlink — that is their standard use. The other pairings swap the roles of headings, links and images around incorrectly.',
            },
            {
              text: "What happens if you write an element's attribute value without quotes, like <img src=cat.jpg>?",
              options: [
                'It is always a syntax error that stops the whole page from rendering',
                'It works for simple values with no spaces, but is easy to break once a value contains a space',
                'Attributes can never be written without quotes',
                'It silently becomes a boolean attribute',
              ],
              correct_index: 1,
              explanation: 'Unquoted attribute values are technically allowed for simple cases, but they break as soon as the value contains a space or special character, so quoting consistently avoids a whole class of subtle bugs.',
            },
            {
              text: 'Which statement about closing tags is true?',
              options: [
                'Every HTML element must have both a start and end tag',
                'Some elements, like img and br, never take a closing tag',
                'End tags are optional stylistic choices you can skip anywhere',
                'Only heading elements require a closing tag',
              ],
              correct_index: 1,
              explanation: 'Elements like img and br are self-contained — they never have separate content to close around, so they do not take an end tag at all. Most other elements, like p and h1, do need one.',
            },
            {
              text: 'In <input type="text" placeholder="Your name" disabled>, what does the disabled attribute do?',
              options: [
                'Hides the input completely from the page',
                'Prevents the user from interacting with or typing into the input',
                "Deletes the input's placeholder text",
                'Marks the field as required before submission',
              ],
              correct_index: 1,
              explanation: 'disabled greys out the control and blocks user interaction with it — it does not hide the element or touch its placeholder, and it is unrelated to whether the field is required.',
            },
            {
              text: 'Why is <h1>Hello</h1><p>Welcome to my <a href="/about">site</a>.</p> considered well-structured HTML?',
              options: [
                'Because every tag is nested inside the one before it without overlapping incorrectly',
                'Because it uses inline CSS to control appearance',
                'Because it avoids using any attributes',
                'Because it has exactly two elements',
              ],
              correct_index: 0,
              explanation: 'Good structure is about nesting: the link opens and closes entirely inside the paragraph, and the paragraph opens and closes entirely inside the page. None of this is about styling, attribute count, or how many elements are used.',
            },
            {
              text: 'What is the most accurate way to describe the relationship between HTML and how a page looks?',
              options: [
                'HTML fully controls both structure and visual appearance',
                'HTML describes structure and content; visual appearance is primarily controlled by CSS',
                'HTML has no effect on how a page looks at all',
                'HTML and CSS are two names for the same language',
              ],
              correct_index: 1,
              explanation: 'HTML supplies the content and structure that CSS then styles — browsers do apply some default appearance to HTML elements, but the deliberate visual design comes from CSS, not HTML itself.',
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

They can be styled to look identical, but only the real button is focusable with the Tab key, fires on the Enter and Space keys, and is announced as a button to assistive technology. You would have to rebuild all of that by hand for the div — adding tabindex, a role, and keydown handlers for both Enter and Space — just to get back to what button gives you for free.

Walk through what happens when a keyboard user tabs through a page built with the div version: nothing. The div is not in the natural tab order at all, so the user's focus skips straight past it to whatever comes next, and the "button" might as well not exist for them. With the real button element, focus lands on it automatically, a visible outline appears, and pressing Enter or Space triggers the click handler exactly as if the user had clicked with a mouse.

A second example shows the same idea applied to a whole page layout, not just one control:

    <body>
      <nav>...</nav>
      <main>
        <article>
          <h1>Post title</h1>
          <p>...</p>
        </article>
      </main>
      <aside>Related links</aside>
      <footer>...</footer>
    </body>

Each element names the role of the region it wraps: nav for site navigation, main for the one primary block of content, article for something that would make sense syndicated on its own, aside for tangential content, footer for closing information. A screen reader user can jump directly between these landmarks, the same way a sighted user's eye jumps between visually distinct regions of a page.

Three mistakes are worth flagging. The first is treating heading levels as font sizes: skipping from h1 straight to h4 because it "looks right" breaks the document outline that screen reader users navigate by, even though sighted users notice nothing wrong. The second is wrapping everything in div and section out of habit, even where a more specific element like article, nav or button already exists and is free. The third is using semantic elements only for the styling hook they provide and ignoring the behaviour that comes with them — for instance, styling a div to look exactly like a button and then forgetting it needs a role, tabindex and keyboard handlers to actually behave like one.

This is not a purity exercise. Semantic markup is what makes a page usable without a mouse, understandable to a screen reader, and legible to a search engine deciding how to rank and summarise your content — three audiences you are serving for free every time you pick the element that already means the thing, instead of a div you have to reinvent behaviour for.

Key takeaway: reach for the element that means the thing, and use div only when nothing else fits.`,
          questions: [
            {
              text: 'What is the main advantage of using a button element instead of a styled div?',
              options: [
                'It loads faster than a div',
                'It is keyboard focusable and announced as a button by screen readers',
                'It cannot be styled, so the page stays consistent',
                'It cannot contain an onclick handler',
              ],
              correct_index: 1,
              explanation: "A real button comes with built-in keyboard focus, Enter/Space activation, and an announced role for assistive technology — all things you'd have to rebuild by hand on a div. It is just as stylable as a div, and it happily takes an onclick handler.",
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
              explanation: 'main marks the one primary content block of the page; div and section carry no inherent meaning, and body simply wraps the entire visible page, not a specific content region.',
            },
            {
              text: 'Why should you not skip from an h1 to an h4 just to get a smaller size?',
              options: [
                'The browser refuses to render an h4 without an h3',
                'It breaks the document outline that assistive technology relies on',
                'Heading levels below h3 are ignored by CSS',
                'It causes a console warning that stops the page from loading',
              ],
              correct_index: 1,
              explanation: 'Screen reader users navigate by jumping between heading levels; skipping levels purely for visual sizing breaks that outline even though sighted users see nothing wrong. Resize headings with CSS instead of picking a lower level.',
            },
            {
              text: 'What semantic meaning does a div element carry?',
              options: [
                'It marks a navigation region',
                'It marks a self-contained article',
                'None, it is a generic container',
                'It marks the primary content of the page',
              ],
              correct_index: 2,
              explanation: 'div has no built-in meaning at all — it is a neutral box that only becomes meaningful through classes or attributes you add, unlike nav, article or main.',
            },
            {
              text: 'A list of links to other pages of the site is best wrapped in which element?',
              options: [
                'aside',
                'nav',
                'footer',
                'article',
              ],
              correct_index: 1,
              explanation: 'nav specifically marks a block of navigation links; aside is for tangential content, footer is for closing or meta information, and article is for standalone content that could be syndicated.',
            },
            {
              text: 'Which element would you use to wrap a blog post that could sensibly be read on its own, out of context?',
              options: [
                'article',
                'aside',
                'nav',
                'section',
              ],
              correct_index: 0,
              explanation: 'article is for self-contained content that would make sense distributed independently, like an RSS feed entry, while section is for a generic thematic grouping without that stands-alone quality.',
            },
            {
              text: 'What happens when a keyboard user tabs through a page containing a styled div acting as a "button" (no tabindex, no role, no keydown handler)?',
              options: [
                'Focus lands on it like any button',
                'Focus skips past it entirely, as if it were not interactive',
                'The page throws a JavaScript error',
                'The browser converts it into a real button automatically',
              ],
              correct_index: 1,
              explanation: "A plain div is not part of the natural tab order at all, so a keyboard-only user's focus jumps straight over it — the fake button is effectively invisible to them, no matter how it looks.",
            },
            {
              text: 'In a page structured with nav, main, article and footer, what benefit does a screen reader user get that a purely div-based layout would not offer?',
              options: [
                'Faster page load times',
                'The ability to jump directly between named landmarks',
                'Automatic translation of the content',
                'Larger default font sizes',
              ],
              correct_index: 1,
              explanation: "Semantic landmark elements let assistive technology present a list of regions the user can jump straight to, mirroring how a sighted user's eye can jump between visually distinct areas — a div soup offers no such landmarks.",
            },
            {
              text: 'Which of these is the clearest example of overusing div out of habit?',
              options: [
                'Wrapping the whole page in body',
                'Using <div class="nav-links"> instead of <nav> for the site’s main navigation list',
                'Using <p> for a paragraph of text',
                'Using <img> for a photograph',
              ],
              correct_index: 1,
              explanation: 'nav already exists specifically for this purpose and is free to use — reaching for a generic div and a class name instead throws away the built-in landmark and semantic meaning for no benefit.',
            },
            {
              text: 'Why might styling a div to look exactly like a button still leave it unusable for some visitors?',
              options: [
                "Because CSS cannot change a div's colour",
                'Because it looks identical but lacks the built-in keyboard focus, activation keys and announced role that a real button provides',
                'Because divs cannot receive click handlers',
                'Because divs are removed from the page by screen readers',
              ],
              correct_index: 1,
              explanation: "Visual styling only changes appearance — it does not grant keyboard focusability, Enter/Space activation or a role announcement, all of which a real button gets automatically and a div does not.",
            },
            {
              text: 'What is the main difference between section and article?',
              options: [
                'section is for standalone content that makes sense on its own; article is a generic grouping',
                'article is for standalone content that would make sense distributed on its own; section is a more generic thematic grouping',
                'They are exact synonyms',
                'section can only appear inside article',
              ],
              correct_index: 1,
              explanation: 'article says "this content stands alone", like a blog post or a news item; section just groups related content thematically without claiming it could be read independently.',
            },
            {
              text: 'A page has exactly one h1. Why is that generally good practice?',
              options: [
                'Browsers reject a page with more than one h1',
                "It gives the document outline one clear top-level heading, matching the page's single main topic",
                'CSS cannot style a second h1',
                'Search engines block pages with duplicate headings entirely',
              ],
              correct_index: 1,
              explanation: "A single h1 gives the page one clear top-level heading in its outline, mirroring the idea that a page has one main topic — this is a convention that helps navigation and SEO, not a hard restriction browsers enforce.",
            },
            {
              text: 'Which pairing correctly matches a landmark element to its role?',
              options: [
                'footer holds primary page content, main holds closing information',
                'nav holds a set of navigation links, aside holds tangential content',
                'article holds tangential content, aside holds standalone posts',
                'main holds site navigation, nav holds the primary content',
              ],
              correct_index: 1,
              explanation: 'nav groups navigation links, and aside is for content that is related but secondary — the other options have the roles reversed or scrambled.',
            },
            {
              text: 'Why is choosing div instead of button for something clickable described as "reinventing behaviour"?',
              options: [
                "You have to write CSS from scratch either way, so there's no real cost",
                'You must manually add focusability, keyboard activation and an accessible role to match what button already provides',
                'div elements cannot contain any children',
                'button elements cannot be styled with CSS',
              ],
              correct_index: 1,
              explanation: 'All of that behaviour — tab focus, activation on Enter/Space, being announced as a button — comes bundled with the real button element; recreating it on a div means writing and maintaining that logic yourself.',
            },
            {
              text: 'What is the best summary of what "semantic HTML" means?',
              options: [
                'Writing HTML that uses as few elements as possible',
                'Choosing elements whose name matches the meaning and role of the content they wrap, rather than generic containers',
                'Writing HTML entirely in lowercase',
                'Avoiding the use of any CSS classes',
              ],
              correct_index: 1,
              explanation: 'Semantic HTML is about meaning, not brevity or formatting style — picking nav, article, button and similar elements because they describe what the content actually is, so browsers, search engines and assistive tech can understand it correctly.',
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

Walk through what actually happens on submit. The browser collects every form control that has a name, pairs each one with its current value, and sends those pairs to the server, or to your JavaScript if you are intercepting the submission. id plays no part in that process at all — it exists purely so other things, like the label above, can point at the element. Mix the two up, give an input an id but no name, and it silently vanishes from the submitted data with no error to warn you.

A second example shows grouping related inputs, which single labels cannot do on their own:

    <fieldset>
      <legend>Preferred contact method</legend>
      <label><input type="radio" name="contact"
        value="email"> Email</label>
      <label><input type="radio" name="contact"
        value="phone"> Phone</label>
    </fieldset>

Here the label wraps its input directly instead of using for and id, which also works and is often less typing for short controls. fieldset groups the two radio buttons as one unit, and legend names that group — a screen reader announces "Preferred contact method" before reading each option, so the choice makes sense in isolation. Notice both radios share the same name; that is what tells the browser they belong to one choice, so selecting one clears the other.

Three gotchas bite often. A button inside a form defaults to type submit, so a Cancel button written as a plain button element will submit the form unless you set type to button explicitly — a fix that is easy to forget because the bug only shows up when someone actually clicks Cancel. Placeholder text is not a label: it vanishes as soon as the user types, many screen readers skip it entirely, and its low-contrast grey styling makes it easy to misread as an already-filled field. And required alone does not guarantee clean data — it stops an empty submission, but type="email" only checks for a rough email shape, not that the address exists, so server-side validation is still necessary.

This matters because forms are usually the one part of a page where a mistake costs the user something real: a dropped field means lost data, a missing label means a confused screen reader user gives up, and an accidental submit button means work undone. Getting the wiring right here is not a nice-to-have — it is the difference between a form that works for everyone and one that quietly fails for anyone not using a mouse and sighted vision exactly the way you tested it.

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
              explanation: 'name is what the browser pairs with the value when building the submitted data; id is purely a hook for other elements, like labels, to reference, and it plays no role in submission.',
            },
            {
              text: 'How is a label element correctly associated with its input?',
              options: [
                'The label for value matches the input id',
                'The label for value matches the input name',
                'The label simply appears immediately before the input',
                "The label wraps the input's name attribute",
              ],
              correct_index: 0,
              explanation: 'for must match the input’s id — matching name or simply positioning the label nearby does not create the accessible association at all.',
            },
            {
              text: 'Inside a form, what happens when you write <button>Cancel</button> with no type attribute?',
              options: [
                'It does nothing until you attach a click handler',
                'It resets the form fields to their default values',
                'It submits the form, because type defaults to submit',
                'It becomes disabled automatically',
              ],
              correct_index: 2,
              explanation: 'Inside a form element, a plain button defaults to type="submit" — a Cancel button written this way will trigger a real form submission unless you explicitly set type="button".',
            },
            {
              text: 'Why is placeholder text a poor replacement for a label?',
              options: [
                'It disappears once the user starts typing and is unreliably announced',
                'It can only hold a very small number of characters',
                'It prevents the field from being submitted',
                'It makes the field required',
              ],
              correct_index: 0,
              explanation: 'Placeholder text vanishes the moment the user types a character, and many screen readers do not announce it at all, so it fails as a persistent, accessible name for the field.',
            },
            {
              text: 'What does setting type to email on an input actually give you?',
              options: [
                'Guaranteed proof that the address exists',
                'Automatic sending of the message to that address',
                'Built-in format validation and an email-oriented mobile keyboard',
                'A field that is disabled until a valid address is typed',
              ],
              correct_index: 2,
              explanation: 'type="email" gives you rough shape validation, like something@something, and on mobile, a keyboard tuned for email addresses — it says nothing about whether the address is real or reachable.',
            },
            {
              text: 'An input has id="email" but no name attribute. What happens when the form is submitted?',
              options: [
                'The server rejects the whole submission',
                "The input's value is silently left out of the submitted data",
                'The browser adds a default name automatically',
                'The label stops working entirely',
              ],
              correct_index: 1,
              explanation: 'Only name determines what gets sent — an id-only input is invisible to the submitted data, with no error or warning, which makes this a very easy bug to miss during testing.',
            },
            {
              text: 'What is the purpose of wrapping a group of radio buttons in fieldset with a legend?',
              options: [
                'It makes the radios required',
                'It groups the related controls and gives the group an announced name for assistive technology',
                'It changes the radios into checkboxes',
                'It submits all the radios as one combined value',
              ],
              correct_index: 1,
              explanation: 'fieldset groups related controls as a single unit and legend names that group, so a screen reader can announce something like "Preferred contact method" before reading each option — individual labels on each radio cannot convey that shared context.',
            },
            {
              text: 'Two radio inputs share name="contact" but have different value attributes. What does the shared name accomplish?',
              options: [
                'It tells the browser they belong to one mutually exclusive choice',
                'It merges their two values into one string on submit',
                'It makes both inputs required',
                'It has no effect; name is purely cosmetic',
              ],
              correct_index: 0,
              explanation: 'Radio buttons are only mutually exclusive within a shared name group — selecting one automatically deselects any other radio with that same name, which is exactly why they must share it while differing in value.',
            },
            {
              text: 'Why can required alone not guarantee that a submitted email address is valid?',
              options: [
                "required only blocks an empty submission; it doesn't check that the value is a real, reachable address",
                'required is not a valid attribute for inputs',
                'required overrides the type attribute',
                'required only works when combined with placeholder',
              ],
              correct_index: 0,
              explanation: 'required just stops the form being submitted empty. Even paired with type="email", the browser only checks a rough shape like text@text.text — confirming the address is genuinely deliverable still needs server-side or external verification.',
            },
            {
              text: 'Which of these correctly associates a label with a checkbox using the wrapping style instead of for and id?',
              options: [
                '<label>Subscribe<input type="checkbox" name="sub"></label>',
                '<label id="sub">Subscribe</label><input type="checkbox">',
                '<input type="checkbox" label="Subscribe">',
                '<label for="Subscribe"><input type="checkbox"></label>',
              ],
              correct_index: 0,
              explanation: 'Wrapping the input directly inside the label element creates the association without needing for and id at all — this option does exactly that. The others either use the wrong attribute or do not nest the input inside the label.',
            },
            {
              text: 'A developer sets tabindex and a click handler on a div to make it act like a submit button. What is still missing compared to a real submit button?',
              options: [
                'Nothing, this fully replicates a submit button',
                'Space-bar activation and the default form-submission behaviour triggered from within the form',
                'The ability to be styled with CSS',
                'The ability to receive a click event at all',
              ],
              correct_index: 1,
              explanation: 'tabindex only adds keyboard focus; it does not add Enter/Space activation logic or hook into the form’s native submit behaviour — all of that has to be coded by hand, and it is easy to miss a case.',
            },
            {
              text: 'Why does a Cancel button bug (accidentally submitting the form) often go unnoticed during development?',
              options: [
                'Because it only manifests when someone actually clicks Cancel, which developers may rarely test',
                'Because browsers always show a warning for missing type attributes',
                'Because the bug prevents the page from loading',
                'Because Cancel buttons are not allowed inside forms',
              ],
              correct_index: 0,
              explanation: 'The default type="submit" behaviour is silent and only triggers on that specific click — if manual testing focuses on the happy path of successfully submitting the form, a wrongly-typed Cancel button can slip through unnoticed.',
            },
            {
              text: 'What role does the id attribute play in the relationship between a label and its input?',
              options: [
                'It is what gets submitted with the form data',
                'It is purely a reference point that for can point to; it plays no role in the submitted data',
                "It determines the input's validation type",
                'It is required for every input regardless of whether it has a label',
              ],
              correct_index: 1,
              explanation: "id's only job here is to give the label's for attribute something to point at — the browser never reads id when assembling submitted form data, and an input with no label does not strictly need one.",
            },
            {
              text: 'Which statement about type="email" validation is most accurate?',
              options: [
                'It performs full DNS lookups to confirm the domain exists',
                'It only checks that the text roughly matches an email-like pattern, not that the address is real',
                'It is identical to type="text" with no extra behaviour',
                'It automatically sends a confirmation email',
              ],
              correct_index: 1,
              explanation: 'The built-in check is a shape check, not a reachability check — a@b.c can pass validation without the domain or mailbox existing at all, so real validation still needs a server round trip.',
            },
            {
              text: 'A form has several checkboxes, each with its own distinct name. What does that let the user do?',
              options: [
                'Select multiple independent options, since each has its own name and submits its own value',
                'Select only one at a time, like radio buttons',
                'Nothing is submitted for unchecked boxes even if checked',
                'All boxes toggle together as a group',
              ],
              correct_index: 0,
              explanation: 'Unlike radios, checkboxes with distinct names behave independently — each one submits its own value if checked, and unchecked ones are simply left out, so users can select any combination rather than being forced into one mutually exclusive pick.',
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

Walk through how the browser applies the first rule. It scans the page for every p element, and for each one it finds, it sets that element's text colour to navy and its font size to 16 pixels. If the page has no paragraphs, the rule simply matches nothing — it does not error, it just has no effect, which is worth remembering when a style "isn't working."

A second example shows selectors combined to be more specific about which elements to target:

    .card p {
      color: grey;
    }

    .card .title {
      font-size: 20px;
      font-weight: bold;
    }

The space between .card and p is a descendant combinator: it means "any p that lives anywhere inside an element with class card," not "an element with both classes at once." So a paragraph inside a div with class="card" gets styled grey, but a paragraph sitting outside any card is untouched. Writing .card.title with no space, by contrast, would mean one single element carrying both classes at once — a very different, much narrower match.

Three mistakes catch almost everyone early on. The most classic is forgetting the dot: writing warning instead of .warning tells the browser to look for an element literally called warning, which does not exist, so nothing happens and no error is reported anywhere. A close second is confusing a compound selector with no space at all — .card .title, two classes, nested, versus .card.title, one element, two classes — they look almost identical but match completely different things. The third is a typo in a property name, like collor instead of color: CSS fails quietly at the level of a single declaration, so that one line is skipped while every other declaration in the rule, and every other rule on the page, still applies exactly as written.

This quiet-failure behaviour is exactly why CSS debugging feels different from debugging most other code: there is no stack trace pointing at the mistake, just a style that silently is not showing up. Learning to read a page's applied styles in the browser's dev tools, seeing which rules matched an element and which did not, is the single most useful habit for closing that gap, because it turns "why isn't this working" into "this selector matched nothing, so let me check the dot."

Key takeaway: a selector chooses the elements, the declarations describe the change, and silence means your selector matched nothing.`,
          questions: [
            {
              text: 'In the rule p { color: navy; }, which part is the selector?',
              options: [
                'color',
                'navy',
                'p',
                'navy;',
              ],
              correct_index: 2,
              explanation: 'p is the selector — it chooses which elements the rule applies to. color and navy are the property and value inside the declaration, not the selector.',
            },
            {
              text: 'Which selector targets every element with class="warning"?',
              options: [
                '.warning',
                '#warning',
                'warning',
                '*warning',
              ],
              correct_index: 0,
              explanation: 'A leading dot targets a class. #warning targets an id, warning with no prefix targets an element type literally named "warning" which does not exist, and *warning is not valid selector syntax.',
            },
            {
              text: 'What does a leading hash, as in #header, select?',
              options: [
                'Every element of type header',
                'The element whose id is header',
                'Every element with class header',
                'Every element inside a header',
              ],
              correct_index: 1,
              explanation: 'The hash prefix means id — #header matches the single element whose id attribute is "header". Element type and class use different prefixes, none and a dot, respectively.',
            },
            {
              text: 'What happens when you misspell a CSS property name?',
              options: [
                'The browser throws a visible error in the page',
                'The whole stylesheet stops being applied',
                'That one declaration is ignored and the rest still apply',
                'The page fails to load entirely',
              ],
              correct_index: 2,
              explanation: 'CSS fails at the level of a single declaration — an unrecognised property name is simply skipped, with no error shown anywhere, while every other declaration and rule keeps working normally.',
            },
            {
              text: 'Which piece of a declaration is the value?',
              options: [
                'The part before the colon',
                'The part between the colon and the semicolon',
                'The part inside the curly braces before the property',
                'The semicolon itself',
              ],
              correct_index: 1,
              explanation: 'In color: navy;, the value is "navy", the part sitting between the colon and the semicolon. The part before the colon is the property name.',
            },
            {
              text: 'What does the selector .card p (with a space) match?',
              options: [
                'One element that has both the card and p classes',
                'Any p element nested anywhere inside an element with class card',
                'Only a p that is the direct first child of .card',
                'Any element with class card that is inside a p element',
              ],
              correct_index: 1,
              explanation: 'A space between two selectors is a descendant combinator — it matches a p anywhere inside a .card ancestor, regardless of how deeply nested, not one element carrying both classes at once.',
            },
            {
              text: 'How does .card.title (no space) differ from .card .title (with a space)?',
              options: [
                'They are exactly equivalent',
                'card.title matches one element with both classes; .card .title matches a .title element nested inside a .card element',
                '.card.title is invalid syntax',
                '.card .title only works on paragraphs',
              ],
              correct_index: 1,
              explanation: 'Removing the space changes the meaning entirely — no space means one element with both classes, a space means a descendant match across two separate elements.',
            },
            {
              text: 'A page has no elements with class="alert". What happens to a rule .alert { color: red; }?',
              options: [
                "The browser reports an error because the class doesn't exist",
                'The rule simply matches nothing and has no visible effect',
                'The stylesheet fails to load entirely',
                'It applies to the body element by default',
              ],
              correct_index: 1,
              explanation: "CSS does not require a selector to match anything — if nothing on the page carries that class, the rule quietly does nothing, which is why unexplained missing styles are so often just a selector typo.",
            },
            {
              text: 'Which selector would you use to style the single element with a unique identifier "main-nav"?',
              options: [
                '.main-nav',
                '#main-nav',
                'main-nav',
                '*main-nav',
              ],
              correct_index: 1,
              explanation: 'An id is targeted with a leading hash. A dot would look for a class named main-nav instead, and a bare word would look for an element type by that name.',
            },
            {
              text: 'Why does writing warning instead of .warning fail silently rather than throwing an error?',
              options: [
                'Because warning is treated as a valid but nonexistent element type selector, which simply matches zero elements',
                'Because CSS requires quotes around class names',
                'Because the browser assumes you meant an id',
                'Because unprefixed selectors are automatically converted into class selectors',
              ],
              correct_index: 0,
              explanation: 'Without the dot, the browser reads "warning" as an element type selector — a perfectly valid piece of syntax, it just happens to describe an element that does not exist on the page, so it matches nothing.',
            },
            {
              text: 'What is a declaration in CSS?',
              options: [
                'A selector paired with a value',
                'A property, a colon, a value, and a semicolon',
                'A rule containing multiple selectors',
                "The curly braces surrounding a rule's contents",
              ],
              correct_index: 1,
              explanation: 'A declaration is the individual property : value; pair inside a rule’s block — color: navy; is one declaration; a rule can contain several of them.',
            },
            {
              text: 'If a stylesheet has a typo in one declaration inside a rule with three declarations, what happens to the other two?',
              options: [
                'They are also skipped, since the whole rule is invalid',
                'They still apply normally; only the broken declaration is skipped',
                'They are applied twice as a fallback',
                'The browser deletes the entire stylesheet',
              ],
              correct_index: 1,
              explanation: 'CSS parsing failures are isolated to the single broken declaration — the rest of the rule, and the rest of the stylesheet, keep working exactly as written.',
            },
            {
              text: 'Which of these correctly targets every div element on the page, regardless of class or id?',
              options: [
                'div',
                '.div',
                '#div',
                '*div',
              ],
              correct_index: 0,
              explanation: 'A bare element name with no prefix is a type selector, matching every element of that tag — div matches all div elements directly, while .div and #div would look for a class or id literally named "div".',
            },
            {
              text: 'Two rules both target the class .price, setting the same property to different values, one right after the other in the same stylesheet. All else being equal, which value applies?',
              options: [
                'The first one written',
                'The second one written, since later rules of equal weight override earlier ones',
                'Neither, the property is dropped',
                'Both are applied simultaneously',
              ],
              correct_index: 1,
              explanation: "When two rules have the same selector, and so the same specificity, the one that comes later in the stylesheet wins for that property — this is the source order tie-breaker.",
            },
            {
              text: "What is the most reliable way to figure out why a CSS rule doesn't seem to be applying?",
              options: [
                'Rewrite the entire stylesheet from scratch',
                'Inspect the element in browser dev tools to see which rules matched and which selectors did not',
                'Add !important to every declaration',
                'Delete the rule and try a completely different property',
              ],
              correct_index: 1,
              explanation: 'Because CSS fails silently, the fastest way to diagnose a missing style is to look at what the browser actually matched — dev tools show every rule that applied or did not, turning a guessing game into a quick visual check.',
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

Walk through the maths to see why this matters. A box with width: 300px, 20px of padding on each side and a 5px border on each side has, by default, a rendered width of 300 + 20 + 20 + 5 + 5 = 350px — the padding and border are added on top of the content width you specified. Switch on border-box and the same box renders at exactly 300px, because the browser now shrinks the content area to make padding and border fit inside that number instead of adding to it.

To place boxes next to each other, use Flexbox. Set display to flex on the parent, and its direct children line up in a row. justify-content spreads them along that row, align-items positions them across it.

A second example shows a common flex layout, a header with a logo on one side and a nav on the other:

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

space-between pushes the first and last children to opposite ends of the row and spaces any others evenly between them, while align-items: center vertically centres every child within the row's height, even if the logo and the nav text are different heights. Nothing here needed manual positioning or floats — the parent's declared behaviour handles it as content changes.

Three gotchas catch people repeatedly. The first is where flex properties live: justify-content and align-items belong on the flex container, not on the children, so setting justify-content on a child does absolutely nothing — the child has no row of its own to justify content within. The second is vertical margin collapsing: adjacent margins between two stacked block boxes collapse into one, so a 20px bottom margin followed by a 20px top margin gives a 20px gap, not 40px, which surprises people who expect margins to simply add. The third is forgetting that box-sizing: border-box has to be set explicitly, or globally as above — it is not the browser default, so a component built assuming border-box will render oddly if it is dropped into a page that never set that rule.

Understanding the box model and flex layout is what turns CSS from trial-and-error into something predictable. Every layout bug — an element that is mysteriously too wide, a row that will not centre, a gap that is smaller than expected — traces back to one of these three ideas: how the box's size is actually calculated, whether you set flex properties on the right element, and whether adjacent margins are collapsing. Knowing which one to check first saves hours of nudging numbers around and hoping.

Key takeaway: control the box with border-box, then let the flex parent do the arranging.`,
          questions: [
            {
              text: 'Which layer of the box model sits between the content and the border?',
              options: [
                'Margin',
                'Padding',
                'Outline',
                'Content',
              ],
              correct_index: 1,
              explanation: 'Padding sits directly between the content and the border, adding breathing room inside the box; margin is the outermost layer, outside the border.',
            },
            {
              text: 'What does box-sizing: border-box change?',
              options: [
                'Width and height start including padding and border',
                'Borders are removed from the element entirely',
                'Margins begin counting toward the element width',
                'The content area is ignored when rendering',
              ],
              correct_index: 0,
              explanation: 'border-box makes the declared width and height include padding and border, so the browser shrinks the content area to fit them inside that number instead of adding them on top.',
            },
            {
              text: 'On which element do you set justify-content?',
              options: [
                'On each flex item',
                'On the flex container',
                'On the body element only',
                'On the html element',
              ],
              correct_index: 1,
              explanation: 'justify-content only has meaning on the element that is itself a flex container, arranging its own children along the main axis.',
            },
            {
              text: 'Two stacked block elements have a 20px bottom margin and a 20px top margin. What is the visible gap?',
              options: [
                '40px, the margins add together',
                '0px, adjacent margins cancel out',
                '20px, the margins collapse into the larger of the two',
                '10px, the margins average',
              ],
              correct_index: 2,
              explanation: 'This is margin collapsing — touching vertical margins between block-level siblings merge into a single margin sized to the larger value, rather than stacking additively.',
            },
            {
              text: 'With the default box-sizing, what is the rendered width of a box with width 300px, 20px padding on each side and a 5px border on each side?',
              options: [
                '300px',
                '350px',
                '325px',
                '340px',
              ],
              correct_index: 1,
              explanation: 'With the default content-box sizing, padding and border are added on top of the declared width: 300 + 20 + 20 + 5 + 5 = 350px.',
            },
            {
              text: 'What does align-items: center do on a flex container?',
              options: [
                'Centres children horizontally along the main row',
                'Centres children vertically, across the cross axis of the row',
                "Stretches children to fill the container's width",
                'Reverses the order children appear in',
              ],
              correct_index: 1,
              explanation: 'align-items positions children along the cross axis — for a default row-direction flex container, that is vertically. Horizontal spacing along the row is justify-content’s job, not align-items’.',
            },
            {
              text: 'What does justify-content: space-between do to flex children?',
              options: [
                'Pushes the first and last child to the container’s edges, spacing the rest evenly between them',
                'Stacks all children on top of each other',
                'Centres all children in the middle with equal margin around each',
                'Reverses the visual order of the children',
              ],
              correct_index: 0,
              explanation: 'space-between anchors the first item to the start and the last to the end of the row, distributing any remaining children with even gaps between — it does not add space before the first or after the last item.',
            },
            {
              text: 'A component was built assuming box-sizing: border-box is active, but it is dropped into a page that never sets that rule. What is likely to happen?',
              options: [
                'The component renders identically regardless',
                'The component renders wider or taller than intended, since padding and border now add to the declared size',
                'The browser throws a build error',
                "The component's flexbox layout stops working entirely",
              ],
              correct_index: 1,
              explanation: 'box-sizing: border-box is not the browser default — without that rule in place, padding and border get added on top of the declared width again, so a component that assumed border-box will measure larger than its author intended.',
            },
            {
              text: 'Setting justify-content: center directly on a flex item, instead of on its parent container, does what?',
              options: [
                'Centres that one item within the row',
                'Nothing at all — the property has no effect on a flex item',
                'Centres all the other siblings around it',
                'Throws a CSS parsing error',
              ],
              correct_index: 1,
              explanation: 'justify-content only matters on the flex container itself — a flex item has no children of its own being justified, so the property is simply ignored there.',
            },
            {
              text: 'Why does a 20px bottom margin followed by a 20px top margin between two block elements not produce a 40px gap?',
              options: [
                'Because margins are halved automatically',
                'Because adjacent vertical margins between block-level siblings collapse into a single margin, the larger of the two',
                'Because the browser rounds margins down',
                'Because margin only applies to the first element in a stack',
              ],
              correct_index: 1,
              explanation: 'This is margin collapsing — a CSS-specific behaviour where touching vertical margins merge into one shared gap sized to the larger value, rather than stacking additively as you might expect from padding or border.',
            },
            {
              text: 'Which CSS layer represents space that is outside the border and never gets a background colour applied to it?',
              options: [
                'Padding',
                'Content',
                'Margin',
                'Border',
              ],
              correct_index: 2,
              explanation: "Margin is the outermost layer, sitting outside the border, and it's always transparent — background colours fill the content, padding and border area, but never the margin.",
            },
            {
              text: 'In a flex container with display: flex and no other properties set, what is the default direction children lay out in?',
              options: [
                'Column, top to bottom',
                'Row, left to right',
                'Diagonal',
                'Children overlap in the same position',
              ],
              correct_index: 1,
              explanation: 'The default flex-direction is row, so children line up horizontally in source order unless you explicitly set flex-direction: column or otherwise change it.',
            },
            {
              text: 'Why is * { box-sizing: border-box; } commonly applied once at the top of a stylesheet rather than per-component?',
              options: [
                'It only works when applied to every element at once',
                "It establishes one predictable sizing model project-wide, so every component's width and height maths behaves the same way",
                'It is required for flexbox to function',
                'It has no effect when applied broadly',
              ],
              correct_index: 1,
              explanation: "Setting it globally means every element in the project calculates width and height the same predictable way, avoiding the situation where some components assume border-box and others don't, a common source of mismatched sizing bugs.",
            },
            {
              text: 'A row of three flex items has align-items: stretch (the default) and the items have no explicit height set. What happens?',
              options: [
                'Each item keeps its natural content height, unrelated to its siblings',
                'Each item stretches to match the height of the tallest item in the row',
                "Items are compressed to the shortest item's height",
                'align-items: stretch has no effect on height',
              ],
              correct_index: 1,
              explanation: 'stretch is the default value for align-items, and it makes items with no explicit height fill the full cross-axis size of the row — meaning they all end up the height of the tallest sibling.',
            },
            {
              text: 'Which of these best explains why a layout bug where an element seems "too wide" is worth checking box-sizing for first?',
              options: [
                'Because box-sizing is always the cause of layout bugs',
                "Because it's a very common, easy-to-overlook reason a declared width doesn't match the rendered width, especially when padding or border is involved",
                'Because width can never be trusted in CSS',
                'Because box-sizing must be reset on every single element individually',
              ],
              correct_index: 1,
              explanation: 'An unexpectedly wide box is one of the most common symptoms of the default content-box sizing model quietly adding padding and border on top of a declared width — checking box-sizing first catches a large fraction of these bugs quickly.',
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

Walk through the comparison step by step: specificity is compared column by column, left to right, and the first column where the numbers differ decides the winner. #menu a has a 1 in the id column; .nav .link has a 0 there. The comparison stops immediately — it never even needs to look at the class or element columns, because one id beats any number of classes, and any number of classes beats any number of element selectors, no matter how many you stack up.

A second example shows how this plays out with pseudo-classes, which count in the same specificity column as classes:

    button:hover     -> 0 ids, 1 (the :hover), 1 element (button)
    .btn-primary     -> 0 ids, 1 class, 0 elements

Comparing column by column: the id column ties at zero for both, the class column ties at one for both, since a pseudo-class counts the same as a class here, and the element column is where they differ — button:hover has an element selector in the mix and .btn-primary has none, so button:hover wins that column and therefore wins overall. This trips people up because they eyeball a rule built around a class name and assume it must beat a rule built from a plain element plus a pseudo-class, when the actual count says the opposite.

Three gotchas matter here beyond simple tie-breaking. First, inheritance is a completely separate mechanism from specificity: properties like color and font-family flow down to children automatically when nothing else sets them, but a directly matched rule on the child always beats an inherited value from the parent, even a very high-specificity one, because inherited values do not carry the parent rule's specificity with them at all. Second, inline style attributes outrank every selector-based rule in your stylesheet, regardless of how many ids it stacks — the only thing that can beat an inline style is an !important declaration. Third, !important flips the whole system on its head: a declaration marked !important wins regardless of specificity, which makes it tempting as a quick fix but means the next person has to reach for a second !important to override it, escalating a problem rather than resolving it.

This matters because most real-world "CSS doesn't work" bugs are specificity bugs in disguise: a style you wrote is technically being applied, but a stronger, earlier rule is winning the fight for the same property. Learning to count specificity like this, rather than guessing based on how a selector "feels", turns a frustrating trial-and-error loop into a quick mental calculation, and is the reason experienced developers reach for low-specificity, class-based selectors by default, keeping the whole system easy to override later.

Key takeaway: specificity settles conflicts between rules on the same element, and only source order breaks a genuine tie.`,
          questions: [
            {
              text: 'Which selector has the highest specificity?',
              options: [
                '.nav .link .active',
                '#menu a',
                'nav ul li a',
                '.nav > .link',
              ],
              correct_index: 1,
              explanation: '#menu a includes an id, and a single id outranks any number of classes or element selectors — the specificity comparison never even needs to look past the id column.',
            },
            {
              text: 'Two rules have identical specificity and set the same property. Which one wins?',
              options: [
                'The one that appears later in the source',
                'The one that appears earlier in the source',
                'Neither, the property is dropped',
                'Whichever selector has fewer characters',
              ],
              correct_index: 0,
              explanation: 'Source order is only the tie-breaker for genuinely equal specificity — when two rules are tied, the browser applies whichever one was declared last.',
            },
            {
              text: 'A parent has color: blue. A low-specificity rule sets color: green directly on the child. What colour is the child text?',
              options: [
                'Blue, because the parent value is inherited',
                'Green, because a directly matched rule beats an inherited value',
                'Blue, because inherited values outrank weak selectors',
                'It depends on source order',
              ],
              correct_index: 1,
              explanation: 'Any rule that directly matches an element beats an inherited value, no matter how low that rule’s specificity is and no matter how specific the rule that produced the inherited value was on the parent.',
            },
            {
              text: 'Where does an inline style attribute sit relative to stylesheet rules?',
              options: [
                'It is overridden by any class selector',
                'It is treated the same as an id selector',
                'It outranks normal stylesheet rules regardless of their selectors',
                'It only applies if no stylesheet exists',
              ],
              correct_index: 2,
              explanation: 'Inline styles sit above the entire selector-based specificity system — only an !important declaration in a stylesheet can override one.',
            },
            {
              text: 'Why do many teams avoid styling by id?',
              options: [
                'Id selectors are slower for the browser to match',
                'Ids cannot be combined with other selectors',
                'Their specificity is so high that later class rules cannot override them',
                'Ids are deprecated in modern CSS',
              ],
              correct_index: 2,
              explanation: "An id's specificity is high enough that no combination of classes, however many you stack, can override it later — this makes id-based rules brittle and hard to adjust, which is why most teams reserve ids for JavaScript hooks and use classes for styling.",
            },
            {
              text: 'Comparing button:hover to .btn-primary, which wins and why?',
              options: [
                '.btn-primary always wins because pseudo-classes do not count toward specificity',
                'button:hover wins, because it ties on the class column but adds an element selector that .btn-primary lacks',
                'They are always exactly tied',
                'button:hover wins because pseudo-classes double the specificity of everything they touch',
              ],
              correct_index: 1,
              explanation: 'A pseudo-class like :hover counts the same as a class, so both rules tie in that column — the difference comes from button:hover also including an element selector, which .btn-primary has none of, tipping the win to button:hover.',
            },
            {
              text: "What is the correct order for comparing two selectors' specificity?",
              options: [
                'Elements first, then classes, then ids',
                'Ids first, then classes, attributes and pseudo-classes, then elements',
                'Whichever selector is shorter wins automatically',
                'Alphabetical order of the selector text',
              ],
              correct_index: 1,
              explanation: 'Specificity is compared as three columns in priority order — ids outrank everything, then classes, attribute selectors and pseudo-classes, then plain element selectors — and comparison stops at the first column where the two differ.',
            },
            {
              text: 'A declaration is marked !important in a stylesheet rule with low specificity. What happens when it competes against a normal rule with an id selector?',
              options: [
                'The id-based rule always wins regardless of !important',
                'The !important declaration wins, because !important overrides normal specificity ordering',
                'They are averaged',
                'The browser ignores !important entirely',
              ],
              correct_index: 1,
              explanation: 'important is a separate, higher-priority mechanism that overrides normal specificity comparisons entirely — a low-specificity rule marked !important beats even an id-based rule that is not.',
            },
            {
              text: 'Why is reaching for !important often considered a bad long-term fix?',
              options: [
                'It has no real effect in modern browsers',
                'Overriding it later requires another !important, escalating the problem instead of resolving it',
                'It is not valid CSS syntax',
                'It disables the rest of the stylesheet',
              ],
              correct_index: 1,
              explanation: "Because !important sits above the normal cascade, the only way to override it later is with yet another !important, or reworking the original rule — each use makes the next override harder, compounding rather than fixing the underlying specificity conflict.",
            },
            {
              text: "Does an inherited value carry the specificity of the rule that set it on the parent?",
              options: [
                "Yes, inherited values keep the parent rule's specificity",
                'No, inherited values have effectively no specificity and lose to any rule that directly matches the child',
                'Only if the parent rule used an id selector',
                'Only for color and font properties',
              ],
              correct_index: 1,
              explanation: 'Inheritance and specificity are separate systems — once a value is inherited, it carries no specificity weight of its own, so it loses to literally any rule that matches the child element directly, regardless of how specific the original parent rule was.',
            },
            {
              text: 'Which of these has the lowest specificity?',
              options: [
                '#id .class element',
                '.class1 .class2',
                'element',
                'element element element element',
              ],
              correct_index: 2,
              explanation: 'A single element type selector has no ids and no classes — even multiple chained element selectors together still rank below a single class, so a lone element selector is the lowest of the four options here.',
            },
            {
              text: 'If .a { color: red; } and .a { color: blue; } both appear in the same stylesheet, in that order, targeting the same element, what colour wins?',
              options: [
                'red, because it is declared first',
                'blue, because equal specificity falls back to source order, and it comes later',
                'Neither applies, since they conflict',
                'They average into purple',
              ],
              correct_index: 1,
              explanation: 'Both selectors have identical specificity, so the tie-break is purely source order — the later declaration in the file wins, giving blue.',
            },
            {
              text: 'A rule with three chained classes (.a.b.c) competes against a rule using one id (#x) for the same property. Which wins?',
              options: [
                '.a.b.c, because it uses more selectors overall',
                '#x, because a single id always outranks any number of classes',
                'It depends on which one appears first in the file',
                'They tie and source order decides',
              ],
              correct_index: 1,
              explanation: 'Specificity compares by column, and the id column is checked before the class column — one id beats three classes regardless of how many classes are stacked, no source-order tie-break is even needed.',
            },
            {
              text: 'Compare [data-state="active"] to button.btn for specificity. Which is higher?',
              options: [
                'They are exactly equal',
                'button.btn is higher, because it combines a class with an element selector, giving it one more point in the element column',
                '[data-state="active"] is higher, because attribute selectors outrank classes',
                'Neither has any specificity at all',
              ],
              correct_index: 1,
              explanation: '[data-state="active"] is a single attribute selector, the same weight as a class. button.btn adds an element selector on top of its class, giving it one more point in the element column, so button.btn wins the comparison.',
            },
            {
              text: 'Which best describes why experienced developers tend to prefer low-specificity, class-based selectors over ids or deeply nested selectors?',
              options: [
                'Class selectors are faster for the browser to parse than any other kind',
                'Low specificity keeps rules easy to override later without escalating to ids or !important',
                'Ids cannot be styled at all in modern CSS',
                'Nested selectors are deprecated',
              ],
              correct_index: 1,
              explanation: 'Keeping specificity low means a later rule can override it with a normal class-based selector — reaching for ids or deeply nested selectors instead paints you into a corner where only an even higher-specificity rule, or !important, can ever change it again.',
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

Walk through the first snippet line by line. document.querySelector('h1') scans the page for the first h1 element and hands back a reference to it, stored in title. The next line reaches into that exact element and replaces whatever text was inside it with "Updated!" — the browser repaints the page the instant that line runs, with no separate refresh step needed. The second block does the same lookup but with querySelectorAll, which does not stop at the first match: it returns a list-like object, a NodeList, holding every element with class item, and items.length tells you how many were found.

A second example shows changing more than text, toggling a class and reading an attribute:

    const card = document.querySelector('.card');
    card.classList.toggle('is-open');
    console.log(card.dataset.id);

classList.toggle flips a class on if it is missing and off if it is present, which is exactly the behaviour you want for something like an expandable panel — one line handles both directions instead of writing an if and else to check first. dataset.id reads a data-id="..." attribute straight off the element as a plain JavaScript property, which is a handy way to stash extra information on an element without inventing a custom attribute name.

Three mistakes catch beginners repeatedly. The most common is running this code before the element exists: a script tag placed in the head runs while the body is still being parsed, so querySelector returns null, and the very next line throws, because you cannot set a property on null. Putting your script tag at the end of the body, or adding the defer attribute to a head script, fixes this by waiting until the whole document is parsed first. The second is calling querySelector when you actually need every match: it only ever returns the first element found, silently ignoring the rest, so a loop that expects a full list will quietly only ever see one item. The third is assuming querySelectorAll returns an array — it returns a NodeList, which supports forEach in modern browsers but does not have every array method, like map, without first converting it with Array.from.

This is the foundation everything else in front-end JavaScript builds on. Reading form values, responding to clicks, updating a counter on screen, swapping a light and dark theme, all of it comes down to finding the right element and changing something about it. Getting comfortable with querySelector, textContent and classList here means every more advanced pattern later is just a variation on the same three moves: find it, read or change it, and make sure it exists first.

Key takeaway: select an element, then mutate it, and make sure the element is on the page before you go looking for it.`,
          questions: [
            {
              text: 'What does the DOM represent?',
              options: [
                'A live object model of the page that JavaScript can read and change',
                'The raw HTML text file exactly as it was written on disk',
                'The stylesheet rules currently applied to the page',
                "The browser's network request log",
              ],
              correct_index: 0,
              explanation: 'The DOM is a live, in-memory representation of the page that JavaScript can read and mutate directly — it is not the raw file on disk, which never changes once loaded.',
            },
            {
              text: 'What does document.querySelector return when nothing matches?',
              options: [
                'An empty list',
                'null',
                'The body element',
                'undefined, and it throws immediately',
              ],
              correct_index: 1,
              explanation: 'querySelector returns null when there is no match — it does not throw on its own; the error only happens later if you try to use a property on that null value.',
            },
            {
              text: 'Which call gives you every element with the class item?',
              options: [
                "document.querySelector('.item')",
                "document.querySelectorAll('.item')",
                "document.querySelectorAll('item')",
                "document.querySelector('item')",
              ],
              correct_index: 1,
              explanation: 'querySelectorAll with the class selector .item returns every matching element. querySelector only returns the first match, and dropping the dot would look for an element type named "item" instead.',
            },
            {
              text: 'Why might a script in the head fail to find an element that is clearly in the HTML?',
              options: [
                'Scripts in the head are not allowed to touch the DOM',
                'The element must be given an id before it can be selected',
                'The script runs before the body has been parsed, so the element does not exist yet',
                'querySelector only works after a click event',
              ],
              correct_index: 2,
              explanation: 'The browser parses HTML top to bottom, and a plain script in the head runs immediately, before the elements further down the page have been created — so querySelector correctly returns null because the element genuinely is not there yet.',
            },
            {
              text: 'Which property replaces the text inside an element?',
              options: [
                'textContent',
                'classList',
                'value',
                'innerHTML only, never anything else',
              ],
              correct_index: 0,
              explanation: 'textContent directly replaces an element’s text. classList manages CSS classes, not text, and value applies to form controls specifically, not general elements.',
            },
            {
              text: 'What does card.classList.toggle(\'is-open\') do if the card currently does not have the is-open class?',
              options: [
                'Removes it, since toggle always removes',
                'Adds the class, since it was not present',
                'Throws an error because the class does not exist yet',
                'Does nothing until called twice',
              ],
              correct_index: 1,
              explanation: 'toggle adds the class when it is missing and removes it when it is present — a single call handles both directions, which is why it flips state on and off each time it runs.',
            },
            {
              text: 'What kind of object does querySelectorAll return?',
              options: [
                'A plain JavaScript array with every array method available',
                'A NodeList, which supports forEach but not every array method directly',
                'A single DOM element',
                'A string containing the matched HTML',
              ],
              correct_index: 1,
              explanation: 'querySelectorAll returns a NodeList — it is iterable with forEach in modern browsers, but methods like map or filter are not available on it directly unless you convert it first, commonly with Array.from.',
            },
            {
              text: 'What does card.dataset.id read?',
              options: [
                "The element's id attribute",
                'A custom data-id="..." attribute on the element',
                "The element's class list",
                'The number of children the element has',
              ],
              correct_index: 1,
              explanation: 'The dataset property exposes any data-* attribute as a plain JavaScript property — dataset.id specifically corresponds to a data-id attribute, not the element’s actual id attribute.',
            },
            {
              text: 'A script placed right before </body> tries to select an h1 that appears earlier in the HTML. Why does this generally work, unlike the same script in the head?',
              options: [
                'By the time the script near the end of the body runs, the browser has already parsed everything above it',
                'Scripts near the end of the body run before the HTML is parsed',
                'The h1 element is always created automatically',
                'querySelector behaves differently depending on file length',
              ],
              correct_index: 0,
              explanation: 'The browser parses HTML top to bottom, so a script placed after the content it needs to find runs only once that content already exists in the DOM — that is why placement, or the defer attribute, matters so much.',
            },
            {
              text: 'What is the effect of the defer attribute on a <script> tag placed in the head?',
              options: [
                'It stops the script from ever running',
                'It delays running the script until the HTML document has been fully parsed',
                'It runs the script twice, once immediately and once after parsing',
                'It converts the script into an inline style',
              ],
              correct_index: 1,
              explanation: 'defer tells the browser to keep parsing the HTML and only execute the script afterward, in order — this avoids the null-element problem that comes from a plain head script running too early.',
            },
            {
              text: 'If you need to loop over all elements with class "row", which method should you use instead of querySelector?',
              options: [
                'querySelector, since it is shorter to type',
                'querySelectorAll, since querySelector only returns the first match',
                'getElementByClass',
                'document.rows',
              ],
              correct_index: 1,
              explanation: 'querySelector always stops at the first match — for every matching element you need querySelectorAll, which returns the full collection to loop over.',
            },
            {
              text: "What happens if you call title.textContent = 'Hi' where title is null because querySelector found nothing?",
              options: [
                'Nothing happens, it fails silently',
                'A TypeError is thrown, because you cannot set a property on null',
                "The text 'Hi' is discarded quietly",
                'The browser creates a new element automatically',
              ],
              correct_index: 1,
              explanation: "null has no properties to set, so attempting title.textContent = 'Hi' throws a TypeError immediately — this is exactly why checking that your selector actually found something matters before using the result.",
            },
            {
              text: 'Which statement about classList.add is correct?',
              options: [
                "It adds a class only if it isn't already present, and does nothing if it already is",
                'It always adds the class again, creating a duplicate',
                'It removes all other classes first',
                'It only works on button elements',
              ],
              correct_index: 0,
              explanation: "classList.add is safe to call repeatedly — CSS classes aren't duplicated on an element, so adding an already-present class simply has no additional effect.",
            },
            {
              text: "What is the practical difference between querySelector('.item') and querySelectorAll('.item') when the page has three elements with class \"item\"?",
              options: [
                'They return the same thing',
                'querySelector returns just the first matching element; querySelectorAll returns all three as a collection',
                'querySelector throws an error because there is more than one match',
                'querySelectorAll only returns the last match',
              ],
              correct_index: 1,
              explanation: 'querySelector is designed to find one thing, the first match, while querySelectorAll intentionally returns every match, which is why picking the wrong one is a common source of "it only worked on the first item" bugs.',
            },
            {
              text: 'Why is "make sure the element exists before working with it" considered such an important habit in DOM scripting?',
              options: [
                'Because querySelector is slow and needs a warm-up call first',
                'Because working with a null result, whether from timing or a selector typo, throws an error that stops your script',
                'Because elements disappear automatically after five seconds',
                'Because the DOM only allows one query per page load',
              ],
              correct_index: 1,
              explanation: 'A null reference, whether from timing (the script ran too early) or a typo in the selector, breaks the very next line that tries to use it, so confirming you actually got an element back is a cheap habit that prevents a whole class of runtime errors.',
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

Walk through what happens on a click. The user clicks the button, the browser creates an event object describing that click, and calls your function, passing that object in as event. Inside the function, event.target is the actual element that was clicked, usually the button itself here, though it could be something nested inside it, and btn.classList.add('saved') then changes the button's own appearance, regardless of what target turned out to be. Note that btn and event.target are not always the same thing: btn is whatever you explicitly selected and attached the listener to, while target is whatever the browser decided was actually clicked.

That last one matters most with forms. A submit event reloads the page by default, wiping out everything your script just did, so a handler that updates the page must call preventDefault first.

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name =
        form.querySelector('#name').value;
      console.log('Submitting', name);
    });

Here, calling preventDefault immediately, before doing anything else, stops the page from reloading no matter what happens later in the function — if it were called at the end instead, and an error was thrown partway through, the browser might reload the page anyway, undoing your own logic. Reading form.querySelector('#name').value pulls the current text out of that input, which only works because the reload never happened.

Three gotchas show up constantly. Pass the function itself, not the result of calling it: addEventListener with a function name followed by parentheses, like addEventListener('click', handleClick()), runs handleClick immediately when that line executes and registers whatever it returns, often undefined, as the actual listener, so nothing happens on the real click. Watch out for stacking listeners: registering a fresh anonymous function every time your setup code runs adds a new listener each time, and all of them fire, which is a frequent cause of duplicated console logs or rows appearing twice. And registering the exact same function reference a second time is simply ignored by the browser, it recognises the duplicate and only keeps one copy, which is the opposite problem and can make a real bug, a listener genuinely missing, look like this one at a glance.

Events are how nearly all real interactivity gets built: form validation, drag and drop, live search, modal dialogs, and almost every one of those features is a variation on "listen, inspect the event, decide whether to override the default." Getting comfortable with the shape of that pattern here, including its sharp edges, is what makes the more advanced event topics, delegation, custom events, debouncing, feel like small additions rather than entirely new territory.

Key takeaway: listen for the event, inspect the event object, and prevent the default when you intend to handle it yourself.`,
          questions: [
            {
              text: 'What is wrong with element.addEventListener("click", handleClick());?',
              options: [
                'Nothing, it is the standard form',
                'It calls handleClick immediately and registers its return value',
                'The event name must be written as onclick',
                'It registers handleClick twice',
              ],
              correct_index: 1,
              explanation: 'The parentheses call handleClick right away, when that line runs, and whatever it returns, often undefined, becomes the actual second argument — the real click is never wired up to anything useful.',
            },
            {
              text: 'What does event.preventDefault() do inside a form submit handler?',
              options: [
                'Stops the browser from reloading the page to submit the form',
                'Stops other listeners on the same element from running',
                'Clears every field in the form',
                'Removes the form from the DOM',
              ],
              correct_index: 0,
              explanation: 'preventDefault cancels the browser’s default reaction to the event, which for a submit event is reloading the page to send the form — it has nothing to do with other listeners or the form’s fields.',
            },
            {
              text: 'Which property of the event object tells you which element the event originated from?',
              options: [
                'event.type',
                'event.detail',
                'event.target',
                'event.source',
              ],
              correct_index: 2,
              explanation: 'event.target is the deepest element the event actually occurred on. event.type just names the kind of event, like "click", and event.source is not a standard property.',
            },
            {
              text: 'You call addEventListener for click twice on the same button, passing a new anonymous function each time. What happens on one click?',
              options: [
                'Only the first function runs, the second is ignored',
                'Both functions run, so the work happens twice',
                'An error is thrown for the second registration',
                'Only the last one runs',
              ],
              correct_index: 1,
              explanation: 'Two separate anonymous functions are two separate references, even if they look identical in the code, so the browser treats them as two distinct listeners and runs both on every click.',
            },
            {
              text: 'What happens if you call addEventListener with the exact same function reference twice for the same event on the same element?',
              options: [
                'It fires twice per click',
                'The browser recognises the duplicate and only registers it once',
                'It throws a duplicate-listener error',
                'Only the second registration is kept, the first is discarded',
              ],
              correct_index: 1,
              explanation: 'The browser deduplicates identical listener registrations, same function reference, same event, same element — registering the same reference twice has no additional effect, unlike passing two separate anonymous functions, which both get kept.',
            },
            {
              text: 'In a submit handler, why should preventDefault() typically be called near the top of the function rather than at the end?',
              options: [
                'It makes no difference where it is called',
                'If code later in the function throws before reaching preventDefault, the browser may still perform its default reload',
                'preventDefault only works if it is the first line in any function',
                'Calling it late causes a syntax error',
              ],
              correct_index: 1,
              explanation: 'If an error occurs partway through the handler before preventDefault runs, the browser has no reason to skip its default action — calling it early guarantees the default is cancelled regardless of what happens afterward in your own code.',
            },
            {
              text: 'What is the key difference between the element you called addEventListener on and event.target inside the handler?',
              options: [
                'They are always identical',
                'The element you attached the listener to may differ from event.target, which is whatever the browser determined was actually clicked',
                'event.target is always the document object',
                'event.target is only available for keyboard events',
              ],
              correct_index: 1,
              explanation: "The listener's own element, say, a button, is fixed at the point you call addEventListener, while event.target reflects whatever the deepest clicked element actually was — for a simple click on the button itself they are often the same, but that is not guaranteed for more complex, nested content.",
            },
            {
              text: 'Why does addEventListener(\'click\', handleClick()) fail to attach a working click handler?',
              options: [
                'Because handleClick() invokes the function right away, and whatever it returns, often undefined, becomes the second argument instead of a function reference',
                "Because click needs to be written as 'onclick'",
                'Because handleClick needs to be an arrow function',
                'Because addEventListener only accepts anonymous functions',
              ],
              correct_index: 0,
              explanation: 'The parentheses call the function immediately, at the moment that line runs, not on a future click — addEventListener then receives whatever handleClick() returned, which is rarely a valid function, so nothing meaningful ends up listening for the click.',
            },
            {
              text: 'A setup function that runs multiple times, for example on every re-render, calls btn.addEventListener(\'click\', () => doSave()) each time with a fresh arrow function. What bug is likely?',
              options: [
                'Only the newest listener will ever fire',
                'Each re-render adds another listener, so a single click eventually triggers doSave multiple times',
                'The browser throws an error after the second call',
                'The button stops responding entirely',
              ],
              correct_index: 1,
              explanation: 'Because a new anonymous function is a different reference every time, none of them are recognised as duplicates — they all stack up and all fire on the next click, which is why repeated saves or duplicated log lines are a classic symptom of listeners attached inside a function that reruns.',
            },
            {
              text: 'Which of these correctly registers handleClick as a listener without invoking it immediately?',
              options: [
                "btn.addEventListener('click', handleClick())",
                "btn.addEventListener('click', handleClick)",
                "btn.addEventListener('click', 'handleClick')",
                "btn.addEventListener(handleClick, 'click')",
              ],
              correct_index: 1,
              explanation: 'Passing the bare function name, with no parentheses, hands addEventListener a reference to call later — adding parentheses calls it immediately instead, and passing a string or swapping the argument order does not register a working listener at all.',
            },
            {
              text: 'What does event.target refer to in a click handler attached to a div that contains a span and an image?',
              options: [
                'Always the div, regardless of what was clicked',
                'Whichever specific element, the div, the span, or the image, was actually clicked',
                'Always the outermost html element',
                'The last child element in the div',
              ],
              correct_index: 1,
              explanation: 'target reflects the most specific element the click actually landed on — clicking the image gives you the image as target even though the listener is attached higher up on the div.',
            },
            {
              text: 'Inside a submit handler, what is the effect of NOT calling preventDefault at all?',
              options: [
                'The form silently does nothing',
                "The browser performs its default action of submitting and reloading the page, likely undoing your handler's in-page updates",
                'The event object becomes unavailable',
                'The submit event never fires',
              ],
              correct_index: 1,
              explanation: 'The default browser behaviour for a submit event is to actually submit and reload — skip preventDefault and that default action runs alongside your custom code, typically wiping out whatever your handler just did to the page.',
            },
            {
              text: 'Which statement about the event object passed into every listener is accurate?',
              options: [
                'It only exists for click events',
                'It is created by the browser for the specific occurrence and passed automatically as an argument to your handler',
                'You must create it yourself before calling addEventListener',
                "It contains the entire page's HTML",
              ],
              correct_index: 1,
              explanation: 'The browser constructs an event object appropriate to whatever just happened and passes it as the first argument to your handler automatically — you never need to construct it yourself for a normal DOM event.',
            },
            {
              text: 'Why can accidentally calling a handler function immediately, via addEventListener(\'click\', handleClick()), be a hard bug to spot at a glance?',
              options: [
                'Because the code still runs, just at the wrong time, when the line executes, rather than on the actual click, so nothing looks obviously broken in the source',
                'Because it causes a visible browser crash immediately',
                'Because JavaScript refuses to parse the line',
                'Because it only fails in certain browsers',
              ],
              correct_index: 0,
              explanation: 'The extra parentheses are a single, easy-to-miss character difference, and the code does not throw an error — handleClick just runs once, immediately, at setup time instead of on the click, which can look like everything worked until you notice the click itself does nothing.',
            },
            {
              text: 'What general pattern do most interactive page features, like form validation, live search, and modals, share, according to how events work?',
              options: [
                'They all require a server round trip for every interaction',
                "Listen for an event, inspect the event object, and decide whether to override the browser's default behaviour",
                'They all rely exclusively on preventDefault',
                'They require a new addEventListener call for every possible target element in advance',
              ],
              correct_index: 1,
              explanation: 'That three-step shape, listen, inspect, decide whether to prevent the default, underlies nearly all interactive behaviour built with events; the specific details change, but the core pattern of reacting to an event object stays the same.',
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

Walk through a click on a nested icon inside a row. Say each li contains a span holding a small delete icon, and the user clicks that icon. The click fires on the span first, that is the actual target, then bubbles upward: span, to li, to ul where our listener lives, to whatever wraps the list, and so on up to document. Our listener, sitting on the list, receives the event during that bubble phase and reads e.target, which is the span, not the li, so closest('li') walks up from the span to find the nearest ancestor, or the element itself, matching li, giving us the row to remove. Without closest, checking e.target directly would only work when someone clicks exactly on the li's own text, not on anything nested inside it.

A second example shows why capture and stopPropagation matter together, a modal that should not close when you click inside its own content:

    overlay.addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });

Clicking the dark overlay behind the modal closes it, as intended. Clicking inside the modal's own content fires the modal's listener first, since it is closer to the target in the bubble path, and that listener calls stopPropagation, which stops the event from continuing to bubble up to overlay, so the overlay's listener never runs and the modal correctly stays open.

The subtlety is closest. The target is the deepest element clicked, often a span inside the row rather than the row itself, so walking up to the nearest matching ancestor is what makes delegation reliable. Also do not confuse stopPropagation, which halts the bubble, with preventDefault, which cancels the browser default: they are unrelated, and calling one does not imply the other, you can stop an event bubbling while still letting its default action happen, or vice versa.

Three mistakes are common at this level. First, forgetting the closest guard entirely and treating e.target as though it is always the delegated container's direct child, which breaks the moment any markup is nested inside a row. Second, reaching for stopPropagation as a first instinct to "fix" an event bug, when the actual problem is usually something else, overused, it silently breaks delegation set up further up the tree by other code that never gets the chance to see the event at all. Third, layout thrashing: reading a layout value like offsetHeight forces the browser to recalculate layout immediately if any styles have changed since the last read, so alternating reads and writes in a loop, read height, set a style, read height again, set another style, forces that recalculation over and over. Batch your reads first, then apply all your writes afterward, and the recalculation only has to happen once.

This matters because delegation, careful use of stopPropagation, and avoiding layout thrashing are exactly the difference between a page that stays fast and correct as it grows and one that slows down or breaks in edge cases as soon as real, messy, deeply nested content gets thrown at it, which is to say, exactly what production pages look like.

Key takeaway: let events bubble to one parent listener, and keep layout reads out of your write loops.`,
          questions: [
            {
              text: 'Why does event delegation keep working for list items added after the page loads?',
              options: [
                'New elements automatically inherit their parent listeners',
                'The listener is on the parent, and events from new children bubble up to it',
                'The browser re-runs addEventListener whenever the DOM changes',
                'New elements are automatically given ids',
              ],
              correct_index: 1,
              explanation: 'The listener sits on a stable parent element, and any click inside that parent, including on children added much later, bubbles up to reach it — no re-registration is ever needed.',
            },
            {
              text: 'In a delegated handler, why is e.target.closest("li") safer than assuming e.target is the li?',
              options: [
                'closest is faster than reading target directly',
                'target is always the parent element, never the clicked one',
                'target is the deepest element clicked, which may be a child inside the li',
                'closest avoids needing addEventListener at all',
              ],
              correct_index: 2,
              explanation: 'target is whatever the most specific clicked element was, often a nested span or icon rather than the li itself, so closest walks upward to reliably find the row regardless of what exactly was clicked inside it.',
            },
            {
              text: 'What is the difference between stopPropagation and preventDefault?',
              options: [
                'stopPropagation halts bubbling; preventDefault cancels the browser default action',
                'They are aliases for the same behaviour',
                'stopPropagation cancels the default action; preventDefault removes the listener',
                'preventDefault halts bubbling; stopPropagation cancels the default action',
              ],
              correct_index: 0,
              explanation: 'These control two separate things — stopPropagation is about whether the event continues travelling through the DOM tree, and preventDefault is about whether the browser’s built-in reaction happens — neither implies the other.',
            },
            {
              text: 'In which order do the phases of an event occur?',
              options: [
                'Bubble, then target, then capture',
                'Capture, then target, then bubble',
                'Target, then capture, then bubble',
                'Bubble only, there is no capture phase',
              ],
              correct_index: 1,
              explanation: 'The event first travels down from the document to the target element, the capture phase, then is considered "at target", and finally travels back up through the ancestors, the bubble phase.',
            },
            {
              text: 'Why does alternating reads of offsetHeight with style writes in a loop hurt performance?',
              options: [
                'Each read forces the browser to recalculate layout, causing repeated thrashing',
                'offsetHeight allocates a new DOM node on every access',
                'Style writes are queued forever and never flushed',
                'Reading offsetHeight deletes any cached styles',
              ],
              correct_index: 0,
              explanation: 'A layout read needs up-to-date measurements, so if a write happened since the last recalculation, the browser is forced to redo layout right then to guarantee accuracy — alternating reads and writes forces this recalculation on every single iteration.',
            },
            {
              text: "A modal's overlay closes the modal on click, and the modal itself calls stopPropagation on its own click listener. Why does clicking inside the modal's content not close it?",
              options: [
                "Because the modal's listener runs first in the bubble path and stops the event from reaching the overlay's listener",
                'Because preventDefault was called',
                'Because the overlay listener only fires on double clicks',
                'Because clicks inside the modal never generate an event at all',
              ],
              correct_index: 0,
              explanation: "The modal is closer to the click target than the overlay in the bubble path, so its listener fires first; calling stopPropagation there prevents the event from ever reaching the overlay's listener further up, so the overlay's close logic never runs.",
            },
            {
              text: 'What problem can arise from overusing stopPropagation as a general-purpose fix?',
              options: [
                'It always throws a console warning',
                'It can silently prevent other, unrelated listeners further up the tree from ever seeing the event',
                'It permanently disables all future events on that element',
                'It forces a full page reload',
              ],
              correct_index: 1,
              explanation: "stopPropagation does not just fix the one interaction you're targeting — it blocks the event from reaching every other ancestor listener too, including ones you may not have written or don't know about, which can quietly break delegation or tracking set up elsewhere.",
            },
            {
              text: 'Why is batching all layout reads before all layout writes recommended over alternating them in a loop?',
              options: [
                'Because writes are always faster than reads',
                'Because each read after a write forces the browser to recompute layout immediately, so alternating causes repeated forced recalculations instead of one',
                'Because browsers limit the total number of style changes per second',
                'Because reads and writes cannot be interleaved at all without an error',
              ],
              correct_index: 1,
              explanation: 'A read like offsetHeight needs up-to-date layout, so if a write happened since the last recalculation, the browser is forced to redo layout right then — batching reads together and writes together means the recalculation only happens once instead of once per loop iteration.',
            },
            {
              text: "What does e.target represent when a user clicks a delete icon, a span, nested inside a list item, li, that has the delegated listener's ancestor, ul?",
              options: [
                'The ul element, since that is where the listener is attached',
                'The li element, since that is the semantically meaningful row',
                'The span, since it is the actual deepest element the click landed on',
                'The document element',
              ],
              correct_index: 2,
              explanation: "target always reflects the most specific element under the cursor at the moment of the click — here that's the span holding the icon, not the li or the ul where the listener happens to live, which is exactly why closest('li') is needed to get back to the row.",
            },
            {
              text: 'Which statement about the capture phase is correct?',
              options: [
                'Listeners run in the capture phase by default',
                'The capture phase happens before the bubble phase, travelling from the document down to the target, and listeners only run during it if you explicitly opt in',
                'The capture phase happens after the bubble phase',
                'The capture phase and bubble phase are the same thing under different names',
              ],
              correct_index: 1,
              explanation: 'By default, addEventListener attaches a bubble-phase listener; a capture-phase listener, which fires on the way down before the target is even reached, requires passing { capture: true } as a third argument — most code never needs it.',
            },
            {
              text: "A delegated click handler on a table body checks e.target.closest('tr') to find the clicked row. What happens if the user clicks on the table's whitespace padding, not on any actual row content?",
              options: [
                "closest('tr') always returns the first row in the table",
                "closest('tr') returns null if the click didn't land inside any tr ancestor, so a guard like 'if (!row) return' is needed",
                'An error is thrown immediately',
                'The click is silently ignored by the browser before reaching the listener',
              ],
              correct_index: 1,
              explanation: 'closest returns null when no matching ancestor exists between the clicked element and the root — clicking genuinely outside any row means there is no tr to find, which is exactly why delegated handlers guard against a null result before acting on it.',
            },
            {
              text: "Why does calling stopPropagation NOT also prevent a link's default navigation from happening?",
              options: [
                'They are the same operation, so it does prevent it',
                "stopPropagation only affects whether the event continues bubbling to ancestors; it has no effect on the browser's default action for that element",
                'preventDefault is automatically called whenever stopPropagation is called',
                'Links cannot have stopPropagation called on their click events',
              ],
              correct_index: 1,
              explanation: 'These two methods control genuinely separate things — stopPropagation is about the event’s journey through the DOM tree, preventDefault is about the browser’s built-in reaction, like navigating a link or submitting a form — calling one has no bearing on the other.',
            },
            {
              text: 'In event delegation, what is the main practical downside of NOT using delegation, and instead attaching a separate listener to every row, when the list can grow dynamically?',
              options: [
                'Nothing, it works identically either way',
                'New rows added later have no listener attached, since the individual-listener setup only ran for rows that existed at that time',
                'Individual listeners are faster than delegation',
                'Delegation is only a stylistic preference with no functional difference',
              ],
              correct_index: 1,
              explanation: 'If you attach listeners to each row individually at setup time, any row added afterward was never included in that setup and simply has no listener — delegation avoids this entirely because the single listener lives on a parent that was already there, and bubbling brings it every future click regardless of when the child was added.',
            },
            {
              text: 'Why is offsetHeight described as a "layout read"?',
              options: [
                "Because it changes an element's layout as a side effect",
                'Because accessing it may force the browser to run, or re-run, its layout calculation to return an accurate, up-to-date value',
                'Because it only returns a cached, potentially stale value',
                'Because it is only available on img elements',
              ],
              correct_index: 1,
              explanation: "offsetHeight has to reflect the element's true current size, so if any style changes happened since the browser's last layout pass, reading it forces a synchronous recalculation right then to guarantee the value is accurate — that forced recalculation is the cost being described.",
            },
            {
              text: 'A developer wants to stop a "delete" click handler behaviour from firing when a nested "confirm" tooltip inside the row is clicked, without breaking the row’s own delegated delete listener elsewhere in the app. Which approach directly addresses this?',
              options: [
                "Call preventDefault inside the tooltip's own click handler",
                "Call stopPropagation inside the tooltip's own click handler, so the click never bubbles up to the row's delegated listener",
                'Remove the delegated listener from the row entirely',
                'Add a second identical delegated listener to cancel the first',
              ],
              correct_index: 1,
              explanation: "Since the row's delete behaviour lives in a delegated listener that reacts to bubbled clicks, stopping the tooltip's click from bubbling any further, via stopPropagation, is what prevents it from ever reaching that delegated listener — preventDefault would not help here since the issue is not a default browser action, it is the event's propagation.",
            },
          ],
        },
      },
    },
  ],
};
