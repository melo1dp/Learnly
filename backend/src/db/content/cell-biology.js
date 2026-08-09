import { Q, L, topic } from './helpers.js';

export default {
  title: 'Cell Biology Basics',
  description:
    'Learn how cells are built, how membranes control traffic, and how metabolism releases and stores energy through respiration and photosynthesis.',
  topics: [
    topic(
      'cell_structure',
      L(
        'What Cells Are and Why Size Matters',
        `Every living organism is made of cells, the smallest units that can still carry out the processes of life. Some organisms are a single cell; others, like plants and animals, are made of trillions of specialised cells working together. Despite that variety, cells share a few core features: a boundary that separates inside from outside, genetic material that stores instructions, and machinery that builds proteins and releases energy.

Cells stay small because molecules must move by diffusion. As a cell grows, its volume increases faster than its surface area, so nutrients and waste cannot cross the membrane quickly enough. That surface-area-to-volume constraint is one reason tissues use many small cells instead of a few large ones. Light microscopes reveal the overall shape of cells; electron microscopes reveal finer detail inside.

Two broad categories matter from the start. Prokaryotic cells (bacteria and archaea) lack a membrane-bound nucleus; their DNA sits in a nucleoid region. Eukaryotic cells (animals, plants, fungi, and protists) package DNA in a nucleus and contain specialised membrane-bound organelles. Knowing which category you are looking at tells you what structures to expect.

Key takeaway: cells are life's basic units, limited in size by diffusion, and split into prokaryotic and eukaryotic designs.`,
        [
          Q('What is the smallest unit of life that can carry out living processes?', ['An atom', 'A molecule', 'A cell', 'A tissue'], 2),
          Q('Why do cells tend to remain small?', ['DNA cannot fit in large cells', 'Volume grows faster than surface area, slowing diffusion', 'Large cells always burst', 'Membranes only form around tiny volumes'], 1),
          Q('Which feature distinguishes prokaryotic cells from eukaryotic cells?', ['Prokaryotes always have chloroplasts', 'Prokaryotes lack a membrane-bound nucleus', 'Eukaryotes never have DNA', 'Only prokaryotes have ribosomes'], 1),
          Q('Where is DNA located in a typical prokaryotic cell?', ['Inside a nucleus', 'In a nucleoid region', 'Only in mitochondria', 'Floating outside the cell'], 1),
          Q('Which organisms are made of eukaryotic cells?', ['Only bacteria', 'Animals, plants, fungi, and protists', 'Only viruses', 'Archaea exclusively'], 1),
        ],
      ),
      L(
        'Organelles and How They Divide Labour',
        `In eukaryotic cells, organelles are membrane-bound compartments that specialise in particular jobs. The nucleus stores most of the cell's DNA and is the site where gene expression begins. Surrounding the nucleus, the rough endoplasmic reticulum is studded with ribosomes and helps fold and modify proteins destined for membranes or secretion. The smooth ER synthesises lipids and detoxifies some chemicals.

The Golgi apparatus receives vesicles from the ER, sorts and packages proteins, and ships them to their destinations. Lysosomes contain digestive enzymes that break down worn-out organelles and material taken into the cell. Mitochondria are the main sites of ATP production through cellular respiration; they have a double membrane and their own DNA, consistent with an ancient bacterial origin.

Plant cells add structures animals lack. Chloroplasts capture light energy for photosynthesis. A large central vacuole stores water and solutes and helps maintain turgor pressure. A rigid cell wall of cellulose sits outside the plasma membrane and shapes the cell. Animal cells lack walls and chloroplasts but often have centrioles involved in organizing microtubules during division.

Key takeaway: organelles compartmentalise work so eukaryotic cells can run many conflicting reactions at once without chaos.`,
        [
          Q('Which organelle stores most of a eukaryotic cell\'s DNA?', ['Ribosome', 'Nucleus', 'Golgi apparatus', 'Lysosome'], 1),
          Q('What is the primary role of mitochondria?', ['Protein folding', 'Photosynthesis', 'ATP production through respiration', 'Digesting food vacuoles only'], 2),
          Q('Which organelle packages and ships proteins after the ER?', ['Golgi apparatus', 'Nucleolus', 'Centriole', 'Cell wall'], 0),
          Q('Which structure is found in plant cells but not typical animal cells?', ['Mitochondria', 'Plasma membrane', 'Chloroplasts', 'Ribosomes'], 2),
          Q('What do lysosomes mainly contain?', ['DNA replication enzymes', 'Digestive enzymes', 'Chlorophyll', 'Cellulose fibers'], 1),
          Q('Why is the rough ER called "rough"?', ['It has a rigid cell wall', 'It is covered with ribosomes', 'It lacks a membrane', 'It stores starch grains'], 1),
        ],
      ),
      L(
        'Comparing Cells and Reading Organelle Clues',
        `Biologists identify cell type by looking at which organelles are present and how they are arranged. A cell packed with rough ER and Golgi is likely specialised for protein secretion, such as a pancreatic cell making digestive enzymes. A muscle cell is crowded with mitochondria because contraction demands continuous ATP. A leaf mesophyll cell is rich in chloroplasts for photosynthesis.

Comparing prokaryotes and eukaryotes at a finer level also reveals shared machinery. Both have ribosomes, though eukaryotic ribosomes are larger. Both use DNA and RNA, but eukaryotes wrap DNA around histone proteins into chromatin. The endosymbiotic theory explains mitochondria and chloroplasts: ancestral eukaryotic cells engulfed aerobic bacteria and photosynthetic bacteria that eventually became organelles. Supporting clues include double membranes, circular DNA, and division by binary fission-like processes.

A common source of confusion is the cytoskeleton. Microfilaments, intermediate filaments, and microtubules are not membrane-bound organelles, yet they organise the cytoplasm, move vesicles, and segregate chromosomes. Cilia and flagella built from microtubules power swimming in many protists and sperm cells. When you analyse a micrograph, ask: nucleus or not? wall or not? chloroplasts? secretory pathway elaborated? Those answers classify the cell and hint at its lifestyle.

Key takeaway: organelle inventories reveal cell function, and endosymbiosis explains why mitochondria and chloroplasts behave like former free-living bacteria.`,
        [
          Q('A cell with abundant rough ER and Golgi is most likely specialised for what?', ['Storing fat only', 'Protein secretion', 'Photosynthesis', 'Absorbing light'], 1),
          Q('Which evidence supports the endosymbiotic origin of mitochondria?', ['They lack membranes', 'They have circular DNA and a double membrane', 'They are made of cellulose', 'They contain no ribosomes'], 1),
          Q('Which of the following is NOT a membrane-bound organelle?', ['Lysosome', 'Mitochondrion', 'Microtubule cytoskeleton elements', 'Nucleus'], 2),
          Q('Why might a muscle cell contain many mitochondria?', ['To store DNA for the nucleus', 'Because contraction requires continual ATP', 'To photosynthesize under load', 'To digest extracellular matrix only'], 1),
          Q('How do eukaryotic and prokaryotic ribosomes compare?', ['They are identical in size', 'Eukaryotic ribosomes are larger', 'Only prokaryotes have ribosomes', 'Eukaryotes have no ribosomes'], 1),
          Q('Plant cell walls are mainly composed of which polymer?', ['Peptidoglycan', 'Chitin only', 'Cellulose', 'Collagen'], 2),
        ],
      ),
    ),
    topic(
      'membranes',
      L(
        'Membrane Structure and Selective Permeability',
        `The plasma membrane is a phospholipid bilayer with proteins embedded in it. Each phospholipid has a hydrophilic (water-loving) head and two hydrophobic (water-fearing) tails. In water, the tails face inward and the heads face the watery environments inside and outside the cell. This arrangement creates a barrier that keeps most polar molecules and ions from freely crossing.

Cholesterol molecules nestled among animal-cell phospholipids modulate fluidity: they keep membranes from packing too tightly in the cold and from becoming too loose when warm. Membrane proteins perform many jobs: channels and carriers move substances, receptors receive signals, and enzymes catalyse reactions at the membrane surface. Carbohydrates attached to proteins or lipids form the glycocalyx, important for cell recognition.

Selective permeability means some substances pass easily and others need help. Small nonpolar molecules such as O2 and CO2 diffuse across readily. Large polar molecules and charged ions generally cannot without proteins. Water can cross slowly on its own and much faster through aquaporin channels. Understanding the bilayer-plus-proteins model is the foundation for every later transport mechanism.

Key takeaway: membranes are fluid mosaics of lipids and proteins that let some substances through and block others.`,
        [
          Q('What is the basic structural framework of a cell membrane?', ['A protein monolayer', 'A phospholipid bilayer', 'A cellulose sheet', 'A DNA double helix'], 1),
          Q('Which part of a phospholipid faces the watery environments?', ['Hydrophobic tails', 'Hydrophilic heads', 'Cholesterol rings only', 'Glycogen chains'], 1),
          Q('Which molecules cross a pure phospholipid bilayer most easily?', ['Sodium ions', 'Glucose', 'Small nonpolar molecules like O2', 'Large proteins'], 2),
          Q('What role does cholesterol play in animal cell membranes?', ['It digests membrane proteins', 'It modulates membrane fluidity', 'It stores genetic information', 'It forms the cell wall'], 1),
          Q('What does selective permeability mean?', ['Every molecule enters at the same rate', 'Some substances pass more readily than others', 'Nothing can ever enter the cell', 'Only water can leave the cell'], 1),
        ],
      ),
      L(
        'Passive and Active Transport',
        `Passive transport moves substances down their concentration gradient and does not require cellular energy. Simple diffusion is the random movement of molecules from high to low concentration across the bilayer. Facilitated diffusion uses channel or carrier proteins but still follows the gradient; glucose entering many cells via GLUT transporters is a classic example.

Osmosis is the diffusion of water across a selectively permeable membrane. In a hypotonic environment, water enters animal cells and can cause lysis; plant cells become turgid, which is usually healthy. In a hypertonic environment, water leaves cells: animal cells shrink (crenation) and plant cells plasmolyse. Isotonic conditions keep net water movement near zero.

Active transport moves substances against their gradient and requires energy, usually ATP. The sodium-potassium pump is the textbook example: it exports three Na+ ions and imports two K+ ions per ATP hydrolysed, maintaining electrochemical gradients essential for nerve impulses and secondary active transporters. Endocytosis and exocytosis move large cargo in vesicles; phagocytosis engulfs large particles, while pinocytosis takes in fluid.

Key takeaway: passive transport follows gradients; active transport and vesicle trafficking spend energy to go against gradients or move bulk material.`,
        [
          Q('What does passive transport NOT require?', ['A concentration gradient', 'Cellular energy such as ATP', 'A membrane', 'Molecules that can move'], 1),
          Q('Facilitated diffusion differs from simple diffusion because it:', ['Always uses ATP', 'Uses membrane proteins but still follows the gradient', 'Moves substances against the gradient', 'Only occurs in plant cells'], 1),
          Q('What is osmosis?', ['Diffusion of any solute', 'Active pumping of water', 'Diffusion of water across a selectively permeable membrane', 'Vesicle fusion with the membrane'], 2),
          Q('An animal cell placed in a strongly hypertonic solution will tend to:', ['Burst from water gain', 'Shrink as water leaves', 'Remain unchanged forever', 'Become a plant cell'], 1),
          Q('The sodium-potassium pump is an example of:', ['Simple diffusion', 'Osmosis', 'Active transport', 'Facilitated diffusion of oxygen'], 2),
          Q('Which process engulfs large particles into the cell using vesicles?', ['Exocytosis', 'Phagocytosis', 'Simple diffusion', 'Plasmolysis'], 1),
        ],
      ),
      L(
        'Gradients, Potentials, and Membrane Specialisations',
        `Concentration gradients and electrical gradients together make an electrochemical gradient. Ions feel both forces. For example, the interior of a resting neuron is negative relative to the outside, so positive ions are electrically attracted inward even aside from their concentration gradient. Membrane potential is the voltage across the membrane; it is the currency of signal transmission in nerves and muscles.

Secondary active transport (cotransport) harnesses a gradient created by a primary pump. In intestinal cells, the Na+ gradient maintained by the Na+/K+ pump drives glucose uptake through a symporter that brings Na+ and glucose in together. Antiporters exchange one solute for another in opposite directions. Without the primary pump, the secondary systems eventually stall when the driving gradient collapses.

Membranes also specialise for junction and polarity. Tight junctions seal epithelial sheets so solutes take controlled paths. Gap junctions allow small molecules to pass between neighbouring animal cells. In plants, plasmodesmata connect cytoplasms through cell walls. Apical and basolateral membranes of epithelial cells carry different transporters so absorption is directional. Reading a transport problem means asking: gradient direction, energy source, protein type, and whether water or solute is the actor.

Key takeaway: electrochemical gradients power signalling and secondary transport, and membrane domains give tissues directional control.`,
        [
          Q('An electrochemical gradient includes which two components?', ['Temperature and pressure only', 'Concentration and electrical gradients', 'Gravity and magnetism', 'pH and colour'], 1),
          Q('What is membrane potential?', ['The total number of proteins in a membrane', 'The voltage difference across a membrane', 'The thickness of the bilayer', 'The rate of osmosis alone'], 1),
          Q('Secondary active transport depends on:', ['Random thermal energy only', 'A gradient previously established by primary active transport', 'Vesicles that melt into cholesterol', 'Removing all membrane proteins'], 1),
          Q('A symporter moves two substances:', ['In opposite directions', 'In the same direction across the membrane', 'Only out of the nucleus', 'Without ever using a gradient'], 1),
          Q('Which junctions allow small molecules to pass between adjacent animal cells?', ['Tight junctions', 'Gap junctions', 'Desmosomes only for DNA', 'Cell walls'], 1),
          Q('What happens to Na+-dependent glucose uptake if the Na+/K+ pump is blocked?', ['It speeds up indefinitely', 'It eventually slows as the Na+ gradient collapses', 'Glucose freely diffuses faster', 'The membrane becomes impermeable to water only'], 1),
        ],
      ),
    ),
    topic(
      'metabolism',
      L(
        'Energy Flow and ATP in Cells',
        `Metabolism is the sum of chemical reactions in a cell. Catabolic pathways break molecules down and often release energy; anabolic pathways build larger molecules and consume energy. Cells couple these pathways so the energy from food or sunlight can drive the synthesis of proteins, nucleic acids, and other macromolecules.

ATP (adenosine triphosphate) is the cell's portable energy currency. Hydrolysis of ATP to ADP and inorganic phosphate releases free energy that enzymes can harness by transferring phosphate groups or by conformational changes. ATP is not stored in huge amounts; it is made continuously and recycled. That is why blocking ATP production quickly stops active transport, movement, and biosynthesis.

Enzymes are biological catalysts that lower activation energy without being consumed. Each enzyme has an active site shaped for specific substrates. Temperature, pH, and inhibitors affect reaction rates. Competitive inhibitors bind the active site; noncompetitive inhibitors bind elsewhere and change the enzyme's shape. Metabolic pathways are often regulated by feedback inhibition, where an end product slows an earlier enzyme.

Key takeaway: metabolism links breakdown and buildup through ATP and tightly regulated enzymes.`,
        [
          Q('Catabolic pathways generally:', ['Build large molecules and consume energy', 'Break molecules down and often release energy', 'Only occur in viruses', 'Never involve enzymes'], 1),
          Q('What is ATP primarily used for in cells?', ['Storing genetic code', 'Serving as a reusable energy currency', 'Forming the cell wall', 'Carrying oxygen in blood'], 1),
          Q('Enzymes speed reactions by:', ['Raising activation energy', 'Lowering activation energy', 'Changing the overall delta-G to favour any product', 'Consuming themselves as fuel'], 1),
          Q('A competitive inhibitor typically binds:', ['To a DNA promoter', 'At the enzyme\'s active site', 'Only to ATP synthase in the blood', 'To chlorophyll'], 1),
          Q('Feedback inhibition often means:', ['The first product irreversibly destroys the cell', 'An end product slows an earlier step in its own pathway', 'Enzymes stop recognising all substrates forever', 'ATP can no longer be hydrolysed'], 1),
        ],
      ),
      L(
        'Cellular Respiration Overview',
        `Cellular respiration harvests energy from organic molecules, commonly glucose, and transfers much of that energy into ATP. In eukaryotes the process has three major stages: glycolysis in the cytosol, the citric acid cycle in the mitochondrial matrix, and oxidative phosphorylation across the inner mitochondrial membrane.

Glycolysis splits glucose into two molecules of pyruvate, netting a small amount of ATP and NADH. If oxygen is available, pyruvate enters mitochondria, is converted to acetyl-CoA, and feeds the citric acid cycle, which produces more NADH and FADH2 plus a little ATP (or GTP). The real ATP payout comes when electrons from NADH and FADH2 travel through the electron transport chain. Proton pumping creates a gradient; ATP synthase lets protons flow back and drives ATP synthesis—chemiosmosis.

When oxygen is absent, many cells turn to fermentation. In lactic acid fermentation, pyruvate is reduced to lactate so NAD+ can be regenerated for glycolysis to continue. Alcoholic fermentation in yeast produces ethanol and CO2 for the same NAD+ regeneration purpose. Fermentation yields far less ATP than full aerobic respiration because the electron transport chain is offline.

Key takeaway: respiration oxidises fuel to make ATP, with oxygen enabling the high-yield mitochondrial stages.`,
        [
          Q('Where does glycolysis take place?', ['Mitochondrial matrix', 'Cytosol', 'Chloroplast stroma', 'Extracellular fluid only'], 1),
          Q('Which stage produces the most ATP under aerobic conditions?', ['Glycolysis alone', 'Fermentation', 'Oxidative phosphorylation', 'The conversion of pyruvate to lactate'], 2),
          Q('What does the electron transport chain pump across the inner mitochondrial membrane?', ['Glucose molecules', 'Protons (H+)', 'Intact ATP only', 'DNA strands'], 1),
          Q('What is the role of oxygen in aerobic respiration?', ['It is the substrate of glycolysis', 'It acts as the final electron acceptor', 'It builds glucose in mitochondria', 'It inhibits ATP synthase'], 1),
          Q('Why does fermentation regenerate NAD+?', ['So the citric acid cycle can run without mitochondria', 'So glycolysis can continue without a functional ETC', 'So chloroplasts can fix carbon', 'So ribosomes can translate mRNA'], 1),
          Q('Which products characterise alcoholic fermentation in yeast?', ['Lactate and water', 'Ethanol and carbon dioxide', 'Oxygen and starch', 'Ammonia and urea'], 1),
        ],
      ),
      L(
        'Photosynthesis and Linking the Two Pathways',
        `Photosynthesis converts light energy into chemical energy stored in sugars. In plants it occurs in chloroplasts. Light-dependent reactions at the thylakoid membranes use photon energy to split water, release O2, and produce ATP and NADPH. The Calvin cycle in the stroma uses that ATP and NADPH to fix CO2 into carbohydrates, starting with the enzyme Rubisco attaching CO2 to RuBP.

Photosynthesis and respiration are complementary at the biosphere scale. Photosynthesis builds sugars and releases oxygen; respiration oxidises sugars and consumes oxygen, releasing CO2 and water. Individual plant cells run both processes: chloroplasts in the light, mitochondria continuously. The overall photosynthetic equation is roughly the reverse of respiration, but the pathways use different organelles and enzymes.

A frequent hard-mode question mixes compartments and products. Light reactions need water and light; they do not fix carbon directly. The Calvin cycle needs ATP, NADPH, and CO2; it does not produce O2. Respiration's ETC sits in mitochondria; photosynthesis's ETC sits in thylakoids. Both use chemiosmosis and ATP synthase, but the spatial orientation and energy source differ. Mastering those contrasts prevents mixing up "where" and "what" across metabolism.

Key takeaway: photosynthesis stores light energy in sugars; respiration releases that energy as ATP—linked but opposite flows of carbon and energy.`,
        [
          Q('Where do the light-dependent reactions of photosynthesis occur?', ['Mitochondrial matrix', 'Thylakoid membranes', 'Cytosol only', 'Golgi vesicles'], 1),
          Q('What are the main products of the light reactions used by the Calvin cycle?', ['O2 and starch', 'ATP and NADPH', 'Glucose and CO2', 'NADH and FADH2'], 1),
          Q('Which enzyme fixes carbon dioxide in the Calvin cycle?', ['ATP synthase', 'Rubisco', 'Helicase', 'Lactase'], 1),
          Q('Which gas is released when water is split in the light reactions?', ['Nitrogen', 'Oxygen', 'Methane', 'Carbon monoxide'], 1),
          Q('How are photosynthesis and cellular respiration related globally?', ['They use identical enzymes in the same organelle', 'Photosynthesis builds sugars and O2; respiration breaks sugars and consumes O2', 'Neither involves electron transport', 'Only animals perform both'], 1),
          Q('The Calvin cycle takes place primarily in the:', ['Thylakoid lumen exclusively', 'Stroma of the chloroplast', 'Nucleus', 'Cell wall'], 1),
        ],
      ),
    ),
  ],
};
