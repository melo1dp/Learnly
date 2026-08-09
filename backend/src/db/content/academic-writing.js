import { Q, L, topic } from './helpers.js';

export default {
  title: 'Academic Writing',
  description:
    'Build stronger papers by crafting clear thesis statements, structuring evidence-based arguments, and citing sources to avoid plagiarism.',
  topics: [
    topic(
      'thesis',
      L(
        'What a Thesis Statement Does',
        `A thesis statement is the central claim your paper will defend. It usually appears near the end of the introduction and tells readers what you argue, not merely what topic you will discuss. "Social media" is a topic; "Daily social-media use among first-year students correlates with lower reported sleep quality" is closer to a thesis because it takes a position a reader could question.

Strong thesis statements are specific, arguable, and limited in scope. Vague claims such as "Technology is important" leave readers with nothing to evaluate. Unarguable statements of plain fact ("Water freezes at zero Celsius at standard pressure") do not need a paper. Overly broad claims ("This essay will cover all of World War II") cannot be supported in a short assignment.

The thesis guides every subsequent paragraph. If a paragraph does not help prove, complicate, or carefully qualify the thesis, it probably does not belong. Revising the thesis as you draft is normal: research often sharpens or narrows your claim. Treat the thesis as a working guide early on and as a precise contract with the reader by the final draft.

Key takeaway: a thesis is a specific, debatable claim that organises the whole paper.`,
        [
          Q('A thesis statement should primarily:', ['List every source you will use', 'State the central claim the paper will defend', 'Summarise the entire conclusion only', 'Ask an unanswered research question with no claim'], 1),
          Q('Which is closer to a usable thesis?', ['Climate change', 'Governments should expand urban green space to reduce summer heat islands', 'This paper is about cities', 'There are many opinions on parks'], 1),
          Q('Why is "Water boils at 100 C at sea level" a weak thesis for an argumentative essay?', ['It is too specific', 'It is a largely unarguable fact rather than a claim needing defence', 'It uses numbers', 'It belongs only in lab reports, never elsewhere'], 1),
          Q('Where does a thesis often appear in a short academic essay?', ['In the footnotes only', 'Near the end of the introduction', 'As the last sentence of the works cited', 'In the middle of a random body paragraph'], 1),
          Q('If a body paragraph does not relate to the thesis, you should usually:', ['Keep it for length', 'Revise or remove it', 'Move it into the title', 'Convert it into the abstract only'], 1),
        ],
      ),
      L(
        'Sharpening and Qualifying Your Claim',
        `Medium-level thesis work is about precision. Replace sweeping words like "always," "never," and "everyone" with limits you can defend: a population, a time frame, a context. "Online homework platforms improve learning" is weaker than "In two community-college algebra courses, weekly adaptive homework was associated with higher midterm scores than static worksheets." The second claim tells readers what kind of evidence could confirm or challenge it.

A thesis can be informative (explaining how or why) or argumentative (urging a judgment or policy). Genre matters: a literature review thesis maps what scholars agree and disagree on; a rhetorical analysis thesis states what a text does and how. Match your claim type to the assignment prompt.

Qualification is not weakness; it is intellectual honesty. Words such as "tends to," "in this sample," or "under these conditions" show you know the limits of your claim. Counterarguments belong in the plan for the paper: anticipate the strongest objection and decide whether your thesis needs to preempt it. A refined thesis often emerges after you have drafted body sections and discovered what you can actually support.

Key takeaway: limit scope, match genre, and qualify claims so they are precise and defensible.`,
        [
          Q('Which revision strategy most improves a vague thesis?', ['Add more adjectives without limits', 'Specify population, context, and a clear claim', 'Remove the claim and keep only a topic phrase', 'Move the thesis into the conclusion only'], 1),
          Q('Why can qualifying language strengthen a thesis?', ['It makes the claim impossible to discuss', 'It shows awareness of limits and improves defensibility', 'It replaces the need for evidence', 'Instructors forbid absolute certainty in all fields'], 1),
          Q('An argumentative thesis differs from a purely factual statement because it:', ['Never uses data', 'Takes a position open to reasoned disagreement', 'Must be written as a question', 'Cannot appear in the introduction'], 1),
          Q('What should you do when research reveals your original thesis is too broad?', ['Ignore the research', 'Narrow or revise the thesis to match what you can support', 'Delete all qualifications', 'Hide conflicting findings'], 1),
          Q('Matching thesis type to the assignment means:', ['Always writing a policy recommendation', 'Aligning claim style with the prompt\'s genre (explain, argue, analyse)', 'Using the same template for every course', 'Avoiding a thesis in scientific writing entirely'], 1),
          Q('Which claim is better scoped for a short paper?', ['Solve world hunger', 'Evaluate three campus dining changes and their effect on reported food waste in one semester', 'Discuss society', 'Cover all economic theory'], 1),
        ],
      ),
      L(
        'Complex Theses, Stakes, and Coherence',
        `Advanced thesis statements often have two coordinated moves: they assert a claim and indicate the reasoning or stakes ("because," "by," "which matters for..."). Example: "Although open-plan offices are marketed as collaborative, employee surveys suggest they reduce deep-work time, which undercuts the productivity goals that justified the redesign." The "although" clause shows you have met a common view; the main clause states your position; the stakes clause explains why readers should care.

Coherence across a paper depends on keeping subclaims aligned with this spine. Each section should advance a reason, a mechanism, a comparison, or a rebuttal that the thesis implies. If your conclusion discovers a new claim that the body never prepared, either rewrite the thesis or rebuild the body. Thesis drift—starting with one claim and quietly arguing another—is a common reason papers feel muddled.

In multi-source papers, a synthesis thesis does more than list authors: it states a relationship among them (gap, consensus, conflict, refinement). In empirical reports, the thesis-like statement may appear as a purpose or hypothesis, but clarity and arguability standards still apply. Test your thesis by asking: Could a knowledgeable peer disagree? Do I know what evidence would count? Does every major section answer to this sentence?

Key takeaway: sophisticated theses mark conflict, reasons, and stakes—and keep the whole paper coherent with that spine.`,
        [
          Q('What does an "although" clause often do in a complex thesis?', ['Cancel the need for sources', 'Acknowledge a competing view before stating your claim', 'Replace the conclusion', 'List citations'], 1),
          Q('Thesis drift refers to:', ['Improving style mid-draft', 'Starting with one claim and later arguing a different one without revision', 'Moving the thesis earlier in the introduction', 'Using shorter sentences'], 1),
          Q('A synthesis thesis should primarily:', ['Alphabetical-list every author', 'State a relationship among sources (gap, conflict, consensus, etc.)', 'Avoid taking any interpretive stance', 'Quote one source and ignore others'], 1),
          Q('Which question best tests a thesis?', ['Is it the longest sentence in the draft?', 'Could a peer reasonably disagree, and do I know what evidence would matter?', 'Does it avoid all cascade words like because?', 'Is it hidden until the final paragraph?'], 1),
          Q('If the conclusion introduces a claim the body never supported, you should:', ['Leave it for surprise value', 'Revise the thesis and/or rebuild the body for alignment', 'Delete the introduction', 'Add more headings only'], 1),
          Q('Including stakes in a thesis helps readers understand:', ['The font choice', 'Why the claim matters', 'The page count requirement', 'The dictionary definition of every term'], 1),
        ],
      ),
    ),
    topic(
      'evidence',
      L(
        'Selecting and Introducing Evidence',
        `Evidence is the material that makes your claim believable: data, quotations, summaries of research, examples, observations, or logical analysis, depending on the discipline. Academic writing rarely persuades by opinion alone. After you state a paragraph's point (often in a topic sentence), you present evidence and then explain how that evidence supports the point and the larger thesis.

Not all sources are equal. Peer-reviewed studies, reputable books, and primary documents usually outweigh anonymous websites or unattributed social posts for scholarly work. Match evidence type to claim type: a statistical claim needs data; a claim about a poem's imagery needs textual detail; a historical claim needs documents or reliable secondary scholarship.

Introduce quotations with signal phrases that name the author and suggest the relationship ("argues," "reports," "concedes"). Dropped-in quotes with no framing confuse readers. Keep quotations only as long as you need; paraphrase when the idea matters more than the exact wording, and always cite either way. Your voice should remain the guide: sources support you; they should not replace your analysis.

Key takeaway: choose credible, claim-matched evidence and frame it so readers see why it matters.`,
        [
          Q('After presenting evidence in a body paragraph, you should usually:', ['End the paragraph immediately', 'Explain how the evidence supports your point', 'Delete the topic sentence', 'Switch to a new thesis'], 1),
          Q('Which source is generally stronger for a scholarly paper?', ['An anonymous forum rumour', 'A peer-reviewed journal article', 'An unsourced meme', 'A random personal blog with no credentials'], 1),
          Q('A "dropped-in" quotation is a problem because:', ['Quotations are never allowed', 'It lacks framing that shows who said it and why it is there', 'It is always too short', 'It must appear in the title'], 1),
          Q('When is paraphrase often preferable to quotation?', ['When the exact wording is legally required', 'When the idea matters more than the author\'s exact words', 'When you want to avoid citation', 'When the source is unreliable'], 1),
          Q('Matching evidence to claim means:', ['Using poems to prove lab results', 'Choosing data, text, or documents suited to what you assert', 'Always preferring the longest quote', 'Never using examples'], 1),
        ],
      ),
      L(
        'Argument Structure: Claim, Reason, Warrant',
        `A durable paragraph structure is claim, evidence, and warrant (explanation). The claim is the paragraph's local assertion. Evidence supplies the support. The warrant is the reasoning that links evidence to claim—the part students most often skip. Without a warrant, readers see a fact sitting next to an opinion and must guess the connection.

Organisation at the essay level often follows a logical sequence of reasons, a problem-solution pattern, compare-contrast, or chronological analysis—whatever best serves the thesis. Transitions should mark relationships: contrast, cause, concession, emphasis. "Furthermore" only works when you are truly adding a similar point; "however" signals a turn.

Counterargument and rebuttal strengthen credibility. Present the opposing view fairly, then show why your claim still holds—perhaps the opposing evidence is incomplete, applies to a different context, or is outweighed by other findings. Straw-manning (distorting the opposition) weakens your ethos. Concession ("X is partly right about Y") followed by limitation often reads as more sophisticated than absolute denial.

Key takeaway: arguments need explicit warrants, purposeful organisation, and fair engagement with opposing views.`,
        [
          Q('In claim-evidence-warrant structure, the warrant is:', ['The bibliography format', 'The reasoning that links evidence to the claim', 'Always a direct quotation', 'The paper\'s title'], 1),
          Q('What is a common student mistake after inserting a statistic?', ['Explaining its relevance', 'Failing to explain how it supports the claim', 'Citing the source', 'Using a topic sentence'], 1),
          Q('A fair counterargument section should:', ['Distort the opposing view', 'Represent the opposition accurately before rebutting', 'Ignore conflicting research', 'Replace your thesis with the opposition'], 1),
          Q('Straw-manning means:', ['Strengthening the opponent\'s best point', 'Distorting an opposing view to dismiss it easily', 'Citing too many sources', 'Using short paragraphs'], 1),
          Q('Effective transitions should primarily signal:', ['Random vocabulary variety', 'Logical relationships between ideas', 'That a paragraph is long enough', 'The start of the works cited'], 1),
          Q('Concession in argument often involves:', ['Admitting a point has some merit, then limiting or reframing it', 'Surrendering your entire thesis', 'Deleting evidence', 'Avoiding rebuttal forever'], 0),
        ],
      ),
      L(
        'Integrating Sources and Building Synthesis',
        `At a higher level, academic writing weaves multiple sources into a conversation rather than a string of isolated summaries. Synthesis means showing how Source A confirms, challenges, extends, or complicates Source B, and what that relationship implies for your thesis. A paragraph that merely says "Author 1 says X. Author 2 says Y." without analysis is a book report, not an argument.

Use signal verbs with precision: "suggests" is softer than "demonstrates"; "claims" can distance you from a contested point. Blend short quotations with paraphrase so the paragraph rhythm stays yours. When you analyse empirical work, report methods and limitations that affect how far findings travel: sample size, setting, measurement tools. Overgeneralising from one study is a frequent critical-thinking failure.

Visual evidence (tables, figures) still needs interpretation in prose—tell readers what to notice and why it supports your claim. Maintain an appropriate academic stance: confident but not absolute where uncertainty remains. End body sections by tying local conclusions back to the thesis so the argument accumulates rather than resets.

Key takeaway: synthesis connects sources into a reasoned conversation that advances your claim.`,
        [
          Q('Synthesis in academic writing means:', ['Copying abstracts end to end', 'Showing how sources relate and what that implies for your claim', 'Listing sources alphabetically in the body', 'Avoiding any interpretation'], 1),
          Q('A paragraph that only stacks "Author says..." summaries without analysis is weak because it:', ['Uses too many citations', 'Lacks the writer\'s reasoned connection to a claim', 'Is always too short', 'Cannot include dates'], 1),
          Q('Why mention study limitations when using empirical research?', ['To pad word count', 'To show how far findings can responsibly be generalised', 'To invalidate all data forever', 'To avoid citing methods'], 1),
          Q('Precise signal verbs help readers understand:', ['Your stance toward the source\'s assertion', 'The page margins', 'The publisher\'s address', 'Whether the source is online'], 0),
          Q('When including a figure or table, you should also:', ['Assume readers need no explanation', 'Interpret what it shows and how it supports your claim', 'Place it without any caption or reference', 'Replace the thesis with the figure'], 1),
          Q('Overgeneralising from a single study typically means:', ['Reporting sample size carefully', 'Claiming universal conclusions that the design cannot support', 'Comparing two studies', 'Noting contextual limits'], 1),
        ],
      ),
    ),
    topic(
      'citation',
      L(
        'Why Citation Matters',
        `Citation gives credit to the thinkers and researchers whose words, data, or ideas you use. It also lets readers locate your sources and evaluate your evidence. Academic communities treat citation as a mark of honesty and participation in an ongoing conversation, not as decoration.

You must cite when you quote exact words, paraphrase someone else's ideas in your own words, or use distinctive facts, data sets, or arguments that are not common knowledge. Common knowledge—basic facts widely known and undisputed in a field—usually needs no citation, but the boundary can be tricky for beginners. When unsure, cite.

Different disciplines prefer different styles: APA is common in social sciences, MLA in many humanities fields, Chicago in history, and IEEE or Vancouver in some technical fields. Your instructor or journal specifies the style; follow it consistently for in-text markers and the reference list. In-text citations point to full entries so readers can recover the source.

Key takeaway: cite words, ideas, and distinctive information so credit and verification are possible.`,
        [
          Q('One main purpose of citation is to:', ['Increase font size', 'Give credit and help readers find sources', 'Replace the need for a thesis', 'Hide the origin of ideas'], 1),
          Q('You should cite a source when you:', ['Only think about a topic privately', 'Paraphrase someone else\'s distinctive idea', 'State that water is wet as common knowledge', 'List your own birthdate'], 1),
          Q('Common knowledge generally refers to:', ['Any fact on the internet', 'Widely known, undisputed basic facts that usually need no citation', 'Secret lab results', 'Your classmate\'s opinion'], 1),
          Q('What should determine which citation style you use?', ['Whichever looks prettiest', 'Instructor, publisher, or disciplinary convention', 'Random choice each paragraph', 'Always MLA for every subject'], 1),
          Q('In-text citations exist mainly to:', ['Decorate margins', 'Point readers to full reference-list entries', 'Replace quotations', 'Shorten the thesis'], 1),
        ],
      ),
      L(
        'Quotation, Paraphrase, and Avoiding Plagiarism',
        `Plagiarism is presenting another's words, ideas, structure, or data as your own without proper acknowledgment. It includes copying text without quotation marks and citation, patchwriting (too-close paraphrase that keeps the original's phrasing and structure), and submitting work someone else wrote. Accidental plagiarism is still a problem; good habits prevent it.

Quote when the exact wording is vivid, technical, or itself the object of analysis. Use quotation marks (or block format for longer passages per style rules) and cite. Paraphrase when you restate ideas fully in your own sentence structures and vocabulary—then cite. Changing a few words is not paraphrase. Read, look away, write from understanding, then check against the original.

Keep meticulous notes that distinguish your thoughts from source material and record bibliographic details while you research. Citation managers help, but you remain responsible for accuracy. Self-plagiarism—reusing your own submitted work without permission—can also violate academic rules. Collaboration policies vary; know when group work ends and individual authorship begins.

Key takeaway: quote accurately, paraphrase genuinely, and cite both—patchwriting and missing credit count as plagiarism.`,
        [
          Q('Patchwriting typically means:', ['A fair, fully restructured paraphrase with citation', 'Paraphrase that stays too close to the original wording/structure', 'Citing every common-knowledge fact', 'Using block quotes only'], 1),
          Q('Proper paraphrase requires:', ['Swapping a few synonyms only', 'Restating ideas in new wording and structure, plus citation', 'No citation if words change', 'Deleting the author\'s name'], 1),
          Q('Plagiarism includes:', ['Only intentional theft of books', 'Using others\' words or ideas without proper acknowledgment', 'Citing too carefully', 'Asking a librarian for help'], 1),
          Q('When analysing a poem\'s exact diction, you should often:', ['Never quote', 'Quote relevant phrases with citation', 'Paraphrase without citation', 'Invent lines'], 1),
          Q('Why take research notes that mark source vs. your ideas?', ['To confuse future you', 'To reduce accidental plagiarism and track citations', 'Because citation styles forbid notes', 'To avoid reading sources'], 1),
          Q('Self-plagiarism generally refers to:', ['Citing yourself correctly in a new paper with permission norms followed', 'Reusing your prior work without required acknowledgment or approval', 'Publishing open data', 'Editing for grammar'], 1),
        ],
      ),
      L(
        'Style Details, Integrity Edge Cases, and Repair',
        `Advanced citation practice handles edge cases cleanly. Secondary citation (citing a source mentioned in another source) is sometimes allowed with forms like "as cited in," but locating the original is better when feasible. Personal communications may be cited in-text in some styles but omitted from reference lists. Datasets, software, images, and AI-assisted text increasingly have explicit attribution rules—follow the policy of your course or publisher.

Misrepresentation is an integrity failure even with citations present: fabricating data, inventing quotations, or cherry-picking so extremely that you distort a source's meaning. Ethical paraphrase preserves the source's intent while using your language. If you discover a citation error after submission, notify the instructor according to course policy; correcting honest mistakes is different from concealing misconduct.

Build a revision checklist: every quotation has marks and a locator (page/paragraph as required); every paraphrase has a citation; every in-text item has a reference entry and vice versa (with style-specific exceptions); names and dates match. Consistency across the document is part of professionalism. Mastery means readers can verify your trail without guesswork.

Key takeaway: precise style mechanics plus honest representation of sources complete academic integrity.`,
        [
          Q('When you see an useful quotation only inside another author\'s work, best practice is often to:', ['Cite nothing', 'Prefer locating and citing the original when feasible', 'Copy without marks', 'Invent a page number'], 1),
          Q('Fabricating a quotation is:', ['Acceptable if the citation format looks right', 'An integrity violation even if a fake citation is attached', 'Required in literature reviews', 'The same as common knowledge'], 1),
          Q('Cherry-picking become unethical when you:', ['Select the most relevant example among many', 'Distort a source\'s meaning by extreme selective quotation without context', 'Quote a short phrase accurately', 'Summarise a methods section'], 1),
          Q('A useful citation revision check is verifying that:', ['In-text citations and reference-list entries correspond as the style requires', 'No sources appear anywhere', 'Page numbers are always omitted', 'Authors\' first names are deleted'], 0),
          Q('Course or publisher policies matter especially for:', ['Whether paragraphs need topic sentences', 'Attribution rules for data, images, software, or AI assistance', 'Whether English is allowed', 'Margin size only'], 1),
          Q('Ethical paraphrase must:', ['Invert the author\'s meaning to sound original', 'Preserve the source\'s intent while using new language and citing', 'Keep original sentence skeletons with synonym swaps only', 'Omit citation if you understood the text'], 1),
        ],
      ),
    ),
  ],
};
