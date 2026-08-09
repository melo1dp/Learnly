import { Q, L, topic } from './helpers.js';

export default {
  title: 'Introduction to Psychology',
  description:
    'Foundational university psychology covering research methods, classical and operant learning, and the cognitive systems that support memory.',
  topics: [
    topic(
      'research_methods',
      L(
        'Questions, Variables, and Ways of Knowing',
        `Psychology is an empirical science: claims about mind and behaviour are tested against systematic observation, not settled by intuition alone. Everyday experience generates hypotheses, but experience is biased by memory errors, confirmation seeking, and small informal samples. Psychological methods replace those habits with explicit questions, defined variables, and transparent procedures that other researchers can scrutinise or repeat.

Independent variables are manipulated or selected as presumed causes; dependent variables are the measured outcomes. Operational definitions specify how abstract constructs (stress, memory, aggression) become concrete measurements—ratings, reaction times, error counts, physiological indices. A poorly operationalised variable invites disagreement about what was actually studied. Reliability asks whether a measure is consistent; validity asks whether it measures what it claims to measure. A scale can be reliable yet invalid.

Descriptive methods (case studies, naturalistic observation, surveys) map what occurs and generate hypotheses. They do not, by themselves, justify strong causal conclusions. Correlation quantifies how two variables co-vary but leaves open third-variable and directionality problems. Experiments remain the primary tool for causal inference when random assignment and control are feasible.`,
        [
          Q('An operational definition specifies:', ['Why a theory must be true', 'How a construct is measured or manipulated in a study', 'The population mean of IQ', 'Only the independent variable\'s name'], 1),
          Q('Reliability primarily concerns whether a measure is:', ['Consistent', 'Causal', 'Ethically approved', 'Published'], 0),
          Q('A major limitation of correlational research is that it:', ['Cannot measure continuous variables', 'Does not by itself establish causation', 'Requires random assignment always', 'Cannot compute a correlation coefficient'], 1),
          Q('Dependent variables are:', ['Manipulated by the experimenter as causes', 'Measured outcomes', 'Always categorical', 'Identical to confounds'], 1),
          Q('Case studies and surveys are typically strong for:', ['Definitive causal proof', 'Description and hypothesis generation', 'Eliminating all third variables', 'Guaranteeing external validity'], 1),
        ],
      ),
      L(
        'Experiments, Control, and Validity',
        `In a true experiment, the researcher manipulates one or more independent variables and randomly assigns participants to conditions. Random assignment spreads pre-existing differences across groups so that, in expectation, those differences do not systematically bias the treatment contrast. Control conditions and standardised procedures reduce confounds—variables that covary with the intended treatment and offer rival explanations.

Internal validity is the degree to which a study supports a causal conclusion about the variables of interest. Threats include selection bias, history, maturation, differential attrition, and demand characteristics. External validity concerns generalisation to other people, settings, and times. Highly controlled laboratory experiments often trade some external realism for stronger internal control; field experiments reverse the trade-off. Neither type is universally superior; the research question dictates the balance.

Blinding (participants, experimenters, or both) limits expectancy effects. Replication—direct or conceptual—tests whether findings are robust. Effect sizes and confidence intervals, alongside null-hypothesis tests, communicate how large and precise an estimated effect is rather than reducing science to a binary significant/non-significant decision.`,
        [
          Q('Random assignment is used primarily to:', ['Guarantee a representative national sample', 'Balance pre-existing differences across conditions for causal inference', 'Increase the correlation between variables', 'Replace the need for a dependent measure'], 1),
          Q('Internal validity refers to:', ['Whether results generalise widely', 'Whether the study supports a causal claim about its variables', 'The physical size of the laboratory', 'Whether participants enjoyed the study'], 1),
          Q('A confound is:', ['The dependent variable', 'An uncontrolled variable that rivals the intended explanation', 'Always the sample mean', 'A type of random assignment'], 1),
          Q('Blinding helps reduce:', ['Sample size requirements to zero', 'Expectancy and demand-related biases', 'The need for operational definitions', 'External validity automatically'], 1),
          Q('Compared with lab experiments, field experiments often have:', ['Weaker contact with real settings but perfect control', 'Greater mundane realism but sometimes less control over confounds', 'No dependent variables', 'No ethical constraints'], 1),
          Q('External validity is mainly about:', ['Causal proof inside the study', 'Generalisation beyond the study sample and setting', 'Whether p < 0.05', 'Whether the IV was manipulated'], 1),
        ],
      ),
      L(
        'Ethics, Statistics Literacy, and Open Questions',
        `Modern psychological research is constrained by ethics codes that require informed consent where appropriate, minimisation of harm, the right to withdraw, confidentiality, and careful use of deception with debriefing. Institutional review boards (or equivalent ethics committees) weigh risks against benefits before data collection. Special protections apply to vulnerable populations. Ethical practice is not an add-on to methods; it shapes what designs are permissible.

Students also need basic statistical literacy to read results. Descriptive summaries locate centre and spread; inferential tests and intervals quantify uncertainty about population parameters. Statistical significance is not the same as practical importance. Multiple comparisons, small samples, and flexible analysis paths inflate false positives—concerns that motivate preregistration, power analysis, and open data in contemporary methodology.

Psychology still faces active debates: replication rates vary by subfield, many constructs are culturally bound, and laboratory paradigms can feel remote from everyday life. A mature introductory stance treats methods as tools with known strengths and limits rather than as guarantees of truth.`,
        [
          Q('Informed consent typically requires that participants:', ['Waive all rights permanently', 'Understand key procedures, risks, and the right to withdraw before agreeing', 'Score above average on the DV', 'Provide genetic data'], 1),
          Q('Debriefing after deception is used to:', ['Hide the study purpose permanently', 'Explain the true purpose and address misconceptions or distress', 'Increase confounds', 'Replace random assignment'], 1),
          Q('Statistical significance alone does not guarantee:', ['That a p-value was computed', 'Practical or clinical importance of an effect', 'That a sample existed', 'That ethics review occurred'], 1),
          Q('Preregistration is intended to reduce problems from:', ['Operational definitions', 'Undisclosed flexible analysis that inflate false positives', 'Random assignment', 'Dependent measures'], 1),
          Q('Ethics review before data collection is primarily meant to:', ['Guarantee significant results', 'Protect participants by evaluating risk, benefit, and procedures', 'Maximise effect sizes', 'Eliminate the need for consent'], 1),
        ],
      ),
    ),
    topic(
      'learning',
      L(
        'Classical Conditioning: Association and Prediction',
        `Classical (Pavlovian) conditioning is learning to associate a neutral stimulus with a biologically significant event. In Pavlov's procedure, food (unconditioned stimulus, US) automatically elicits salivation (unconditioned response, UR). A bell that initially does not elicit salivation (neutral stimulus) is paired with food; after pairing, the bell becomes a conditioned stimulus (CS) that elicits salivation as a conditioned response (CR). The organism learns that the CS predicts the US.

Acquisition refers to the strengthening of the CR across pairings. Extinction occurs when the CS is presented repeatedly without the US, and the CR weakens—though spontaneous recovery can bring it back after a rest. Generalisation is responding to stimuli similar to the CS; discrimination is learning to respond differently to similar stimuli when only one is reinforced with the US. Blocking and related phenomena show that conditioning depends on whether the CS provides new predictive information, not merely on contiguity.

Classical conditioning helps explain aspects of emotional learning, including learned fears and some advertising effects, while remaining a tightly controlled laboratory paradigm with clear operational definitions.`,
        [
          Q('In classical conditioning, the US is:', ['A stimulus that initially is neutral', 'A stimulus that reliably elicits a response without prior learning', 'Always the conditioned response', 'A reinforcer delivered after an operant'], 1),
          Q('After conditioning, the CS is:', ['Identical to the US in all cases', 'A formerly neutral stimulus that now elicits a CR', 'The unconditioned response', 'Extinguished by definition'], 1),
          Q('Extinction in classical conditioning involves:', ['Pairing CS and US more often', 'Presenting the CS without the US until the CR weakens', 'Increasing the intensity of the US', 'Punishing the CR'], 1),
          Q('Stimulus generalisation means:', ['Only the exact CS elicits the CR', 'Stimuli similar to the CS also elicit the CR', 'The US no longer works', 'Discrimination training has succeeded fully'], 1),
          Q('Spontaneous recovery refers to:', ['Permanent loss of the CR', 'Reappearance of an extinguished CR after a rest interval', 'The first acquisition trial', 'Random assignment of stimuli'], 1),
        ],
      ),
      L(
        'Operant Conditioning: Consequences Shape Behaviour',
        `Operant conditioning, associated with Thorndike and Skinner, concerns behaviour that operates on the environment and is shaped by its consequences. Reinforcement increases the future probability of a response; punishment decreases it. Positive reinforcement adds a desirable stimulus contingent on behaviour; negative reinforcement removes or prevents an aversive stimulus contingent on behaviour. Positive punishment presents an aversive consequence; negative punishment removes a valued stimulus (as in response cost or time-out).

Schedules of reinforcement strongly affect response patterns. Continuous reinforcement yields fast acquisition but rapid extinction. Partial schedules—fixed or variable, ratio or interval—often produce more persistent responding. Variable-ratio schedules, in particular, generate high, steady rates and resistance to extinction, a fact exploited by gambling designs. Shaping builds complex behaviour by reinforcing successive approximations to a target response.

Discriminative stimuli signal when a contingency is in force (the pigeon pecks when the key is lit). Operant principles underlie behaviour modification, habit training, and token economies, but ethical use requires attention to autonomy and to side effects of punishment, which can suppress behaviour without teaching alternatives.`,
        [
          Q('Negative reinforcement:', ['Decreases behaviour by adding something aversive', 'Increases behaviour by removing or avoiding something aversive', 'Is identical to punishment', 'Requires classical pairing of CS and US'], 1),
          Q('Positive punishment involves:', ['Removing a pleasant stimulus to decrease behaviour', 'Presenting an aversive consequence to decrease behaviour', 'Adding a reward to increase behaviour', 'Extinguishing a CS'], 1),
          Q('A variable-ratio schedule typically produces:', ['Very low response rates and fast extinction', 'High, steady response rates with strong resistance to extinction', 'Responding only at fixed clock times', 'No learning'], 1),
          Q('Shaping means:', ['Punishing all incorrect responses simultaneously', 'Reinforcing successive approximations to a target behaviour', 'Pairing CS and US once', 'Measuring only classical CRs'], 1),
          Q('Compared with continuous reinforcement, extinction after partial reinforcement is often:', ['Faster', 'Slower (partial-reinforcement extinction effect)', 'Impossible', 'Unaffected by schedule'], 1),
          Q('A discriminative stimulus in operant conditioning:', ['Is always the US', 'Signals that a particular contingency is available', 'Is the same as extinction', 'Prevents reinforcement forever'], 1),
        ],
      ),
      L(
        'Comparing Paradigms and Biological Constraints',
        `Classical and operant conditioning are complementary. Classical conditioning is about predictive relations among stimuli and typically involves reflexive or emotional responses. Operant conditioning is about the relation between emitted behaviour and consequences. Many real situations combine both: a warning light (CS) may signal shock, while leveraging a bar (operant) postpones that shock (negative reinforcement). Two-factor theories of avoidance lean on exactly that combination.

Biological constraints limit what associations are easily learned. Taste aversions can form after a single pairing of flavour with illness even when delay is long—unlike many laboratory CS–US timings. Species-typical preparedness makes some fears (snakes, heights) easier to acquire than others. Instinctive drift shows that trained operants can drift toward innate foraging or defensive patterns. These findings tempered early claims that any stimulus could equally serve as a CS or that any response could be reinforced with equal ease.

Cognitive perspectives further note that organisms often learn expectancies and cognitive maps, not only stimulus–response bonds. Blocking, latent inhibition, and latent learning all point to information processing within associative learning. Introductory psychology therefore presents conditioning as powerful but neither empty-organism nor exclusively mechanistic.`,
        [
          Q('A learned taste aversion often violates early assumptions about conditioning because it can:', ['Require hundreds of pairings with zero delay', 'Form after one pairing even with long CS–US delays', 'Occur only in humans', 'Require operant reinforcement schedules'], 1),
          Q('Instinctive drift refers to:', ['Random assignment failing', 'Trained behaviours drifting toward innate tendencies', 'Extinction of all CRs', 'Perfect generalisation'], 1),
          Q('Avoidance learning often involves:', ['Only classical conditioning with no consequences', 'Both classical fear conditioning and operant avoidance responses', 'Neither association nor consequence', 'Only continuous punishment of the US'], 1),
          Q('Blocking suggests that conditioning depends critically on:', ['Contiguity alone regardless of prediction', 'Whether the CS provides new predictive information about the US', 'Punishment intensity only', 'Survey reliability'], 1),
          Q('Operant conditioning primarily concerns:', ['Relations among stimuli only', 'Relations between behaviour and its consequences', 'Unconditioned reflexes exclusively', 'Measurement validity only'], 1),
        ],
      ),
    ),
    topic(
      'memory',
      L(
        'Encoding, Storage, and Retrieval',
        `Memory is not a single store but a set of processes and systems that encode, store, and retrieve information. Encoding transforms experience into a durable representation; deeper, elaborative, and organised encoding generally yields better retention than shallow processing of surface features. Storage maintains information over time; retrieval brings it back into use. Failures can occur at any stage: material never encoded, traces decayed or interfered with, or cues insufficient to access an intact trace.

The classic multistore sketch distinguishes sensory memory (very brief, modality-specific), short-term or working memory (limited capacity, active maintenance and manipulation), and long-term memory (vast capacity, enduring storage). Miller's historical estimate of about seven chunks in immediate memory has been refined: capacity depends on chunking, rehearsal, and the complexity of material. Working-memory models emphasise a central executive coordinating phonological and visuospatial subsystems rather than a single passive short-term box.

Effective study habits follow from this framework: spaced practice, retrieval practice (testing yourself), and elaborative interrogation outperform massed rereading. Matching encoding and retrieval contexts, and using distinctive cues, further support access.`,
        [
          Q('Elaborative encoding typically produces memory that is:', ['Weaker than shallow processing', 'Stronger than shallow processing of surface features', 'Stored only in sensory memory', 'Independent of organisation'], 1),
          Q('Retrieval refers to:', ['Transforming sensory input into a memory trace', 'Accessing stored information for use', 'Only the first repetition of a list', 'Forgetting due to decay alone'], 1),
          Q('Working memory is best characterised as:', ['Unlimited permanent storage', 'A limited-capacity system for temporary maintenance and manipulation', 'Identical to procedural skill only', 'Sensory register lasting minutes'], 1),
          Q('Chunking improves immediate memory by:', ['Increasing the physical size of the brain', 'Grouping elements into meaningful units that fit capacity limits', 'Eliminating long-term memory', 'Preventing encoding'], 1),
          Q('Compared with massed rereading, retrieval practice generally:', ['Harms long-term retention', 'Improves long-term retention', 'Affects only sensory memory', 'Requires classical conditioning'], 1),
        ],
      ),
      L(
        'Long-Term Memory Systems',
        `Long-term memory divides usefully into declarative (explicit) and nondeclarative (implicit) systems. Declarative memory includes episodic memory for personally experienced events bound to context, and semantic memory for facts and concepts detached from the learning episode. Implicit memory includes procedural skills, classical conditioning residues, and priming—facilitation from prior exposure without deliberate recollection.

Neuropsychology sharpened these distinctions. Patients with hippocampal damage may show dense anterograde amnesia for new episodic memories while retaining remote semantic knowledge and the ability to acquire some procedural skills. The hippocampus and related medial temporal structures are critical for consolidating new declarative memories; distributed cortical networks support long-term semantic storage. Emotional arousal, involving amygdala modulation, can enhance memory for the gist of emotional events, sometimes at the cost of peripheral detail.

These systems interact: repeated episodic encounters can build semantic knowledge, and skilled performance can begin under explicit guidance before becoming automatic. Distinguishing "remembering that" from "remembering how" remains a core organisational idea for the introductory course.`,
        [
          Q('Episodic memory primarily stores:', ['Facts detached from personal context', 'Personally experienced events with contextual details', 'Only motor skills', 'Sensory echoes lasting milliseconds'], 1),
          Q('Semantic memory consists mainly of:', ['Autobiographical events with time and place', 'General knowledge and concepts', 'Priming effects only', 'Working-memory spans'], 1),
          Q('Procedural memory is typically classified as:', ['Declarative/explicit', 'Nondeclarative/implicit', 'Sensory only', 'A type of survey method'], 1),
          Q('Anterograde amnesia after hippocampal damage mainly impairs:', ['Formation of new declarative memories', 'All procedural skills acquired long ago', 'Sensory registration of light', 'Unconditioned reflexes'], 0),
          Q('Priming is an example of:', ['Effortful free recall of a list', 'Implicit memory facilitation from prior exposure', 'Only semantic dementia', 'Working-memory rehearsal aloud'], 1),
          Q('Emotional arousal often:', ['Erases all memory for the event', 'Enhances memory for central emotional aspects via amygdala modulation', 'Affects only procedural traces', 'Prevents encoding entirely'], 1),
        ],
      ),
      L(
        'Forgetting, Distortion, and Eyewitness Limits',
        `Forgetting is not only failure; it also clears outdated information. Decay theories emphasise passage of time; interference theories emphasise competition from other learning—proactive interference from old material onto new, and retroactive interference from new material onto old. Cue-dependent forgetting occurs when retrieval cues present at test mismatch those available at encoding. The tip-of-the-tongue state shows that a memory can feel present yet remain temporarily inaccessible.

Memory is also constructive. Schemas organise encoding and retrieval but can insert schema-consistent details that were never present. The misinformation effect demonstrates that post-event suggestions can distort reports of an original event. Source monitoring errors conflate the origin of information—whether it was seen, imagined, or told by someone else. These mechanisms help explain why confident eyewitnesses can still be wrong, especially under poor viewing conditions, stress, or biased lineup procedures.

A responsible take-home message is dual: memory is powerful enough to sustain learning and identity, yet malleable enough that confidence is an imperfect guide to accuracy. That insight links cognitive psychology to legal and clinical applications without requiring cynicism about all recollection.`,
        [
          Q('Retroactive interference occurs when:', ['Old learning disrupts new learning', 'New learning disrupts retention of older material', 'Cues perfectly match encoding', 'Sensory memory expands'], 1),
          Q('The misinformation effect shows that:', ['Memory reports are immune to suggestion', 'Post-event information can distort memory for an original event', 'Only procedural memory is affected by suggestion', 'Schemas never influence recall'], 1),
          Q('A source monitoring error involves mistaking:', ['Working memory for sensory memory', 'The origin of a memory (e.g., seen vs imagined vs told)', 'Reinforcement for punishment', 'Reliability for validity'], 1),
          Q('Cue-dependent forgetting emphasises that retrieval fails when:', ['Storage capacity is infinite', 'Available cues do not match encoding conditions well', 'The hippocampus is unused in any memory', 'Operant conditioning cannot occur'], 1),
          Q('Eyewitness confidence is:', ['A perfect index of accuracy', 'An imperfect guide; confident witnesses can still be mistaken', 'Irrelevant to legal settings only', 'Identical to sensory memory duration'], 1),
        ],
      ),
    ),
  ],
};
