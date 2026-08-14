import { Q, L, topic } from './helpers.js';

export default {
  title: 'Environmental Science',
  description:
    'Study how energy and nutrients move through ecosystems, how the climate system works, and how societies can use resources more sustainably.',
  category: 'Science',
  level: 'beginner',
  rating: 4.3,
  topics: [
    topic(
      'ecosystems',
      L(
        'Energy Flow and Food Webs',
        `An ecosystem is a community of living organisms interacting with each other and with the non-living environment—sunlight, water, soil, and air. Energy enters most ecosystems as sunlight captured by producers through photosynthesis. That chemical energy then moves through consumers when organisms eat producers or one another.

Ecologists often depict these transfers as food chains or food webs. At each trophic level, only a fraction of the energy eaten becomes new biomass; the rest is lost as heat through respiration and incomplete assimilation. This is why ecological pyramids typically narrow toward the top: far less usable energy is available to top predators than to plants.

Producers form the base of nearly every food web. Herbivores (primary consumers) feed on them; carnivores and omnivores occupy higher levels. Decomposers and detritivores recycle dead matter, returning nutrients to the soil or water while dissipating remaining energy as heat. Understanding energy flow helps explain why ecosystems can support many producers but few apex predators.

A common misconception is that energy recycles the same way nutrients do. Energy flows through ecosystems and is ultimately radiated to space as heat; it is not cycled back into useable chemical form without a continuous external input, usually from the Sun.`,
        [
          Q('What is the primary source of energy for most ecosystems?', [
            'Geothermal heat from Earth\'s core',
            'Sunlight captured by producers',
            'Chemical energy from rock weathering',
            'Heat released by decomposers',
          ], 1),
          Q('Which organisms capture sunlight and convert it into chemical energy?', [
            'Primary consumers',
            'Apex predators',
            'Producers',
            'Detritivores only',
          ], 2),
          Q('Why do ecological energy pyramids typically narrow at higher trophic levels?', [
            'Predators reproduce faster than plants',
            'Only a fraction of energy is transferred between levels',
            'Producers consume more energy than consumers',
            'Nutrients are destroyed at each step',
          ], 1),
          Q('What role do decomposers mainly play in ecosystems?', [
            'They create new solar energy for plants',
            'They break down dead matter and release nutrients',
            'They prevent herbivores from eating producers',
            'They store unused energy indefinitely',
          ], 1),
          Q('How does energy movement through ecosystems differ from nutrient movement?', [
            'Energy is continuously cycled; nutrients flow one way',
            'Energy flows through and is lost as heat; nutrients are cycled',
            'Neither energy nor nutrients move between organisms',
            'Both energy and nutrients are created anew at every level',
          ], 1),
        ]
      ),
      L(
        'Nutrient Cycles and Ecosystem Structure',
        `While energy flows one way, matter cycles. Biogeochemical cycles move elements such as carbon, nitrogen, phosphorus, and water between living organisms and abiotic reservoirs—atmosphere, oceans, soils, and rocks. Living processes (photosynthesis, respiration, fixation, decomposition) and physical processes (weathering, evaporation, sedimentation) both drive these loops.

The carbon cycle links photosynthesis and respiration: producers take up CO₂ and store carbon in biomass; consumers and decomposers return much of it through respiration. The nitrogen cycle depends heavily on microbes that fix atmospheric N₂ into usable forms and others that convert nitrogen compounds back to gas. Phosphorus lacks a major atmospheric phase and cycles more slowly through rocks, soils, and organisms.

Ecosystem structure—who feeds on whom, how species share space, and how abiotic factors constrain life—shapes how these cycles operate locally. Biodiversity often increases resilience: diverse communities can buffer disturbance better because functions are distributed among many species. Habitat loss and invasive species can simplify webs and weaken nutrient retention.

Human activity has accelerated several cycles. Fertiliser runoff loads waterways with nitrogen and phosphorus, driving eutrophication. Burning fossil fuels and land-use change add carbon to the atmosphere faster than natural sinks remove it. Studying nutrient cycles therefore connects local ecology to global environmental change.`,
        [
          Q('Which statement best contrasts energy and matter in ecosystems?', [
            'Both energy and matter are created only by consumers',
            'Energy flows one way while matter cycles among reservoirs',
            'Matter is lost as heat while energy is recycled perfectly',
            'Neither energy nor matter moves between trophic levels',
          ], 1),
          Q('Which cycle relies especially on microbial fixation of atmospheric N₂?', [
            'The water cycle',
            'The phosphorus cycle',
            'The nitrogen cycle',
            'The rock cycle alone',
          ], 2),
          Q('Why is the phosphorus cycle often described as slower and less atmospheric?', [
            'Phosphorus has no significant long-term gas phase in the atmosphere',
            'Plants never use phosphorus',
            'Phosphorus only exists in living animals',
            'Lightning destroys all phosphorus compounds',
          ], 0),
          Q('Eutrophication of lakes is commonly linked to excess inputs of which nutrients?', [
            'Helium and neon',
            'Nitrogen and phosphorus',
            'Gold and silver',
            'Ozone and argon',
          ], 1),
          Q('How can high biodiversity support ecosystem stability?', [
            'By eliminating all nutrient cycling',
            'By distributing ecological functions across many species',
            'By ensuring only one predator survives',
            'By stopping decomposition entirely',
          ], 1),
          Q('Which process returns much of the carbon in biomass to the atmosphere as CO₂?', [
            'Photosynthesis by producers',
            'Respiration by consumers and decomposers',
            'Nitrogen fixation by legumes',
            'Evaporation of surface water',
          ], 1),
        ]
      ),
      L(
        'Trophic Dynamics, Limiting Factors, and Disturbance',
        `Trophic dynamics ask how energy and biomass are partitioned among levels and how interactions—predation, competition, mutualism—shape community composition. Bottom-up control emphasises resource supply: scarce nutrients or light limit primary production and cascade upward. Top-down control emphasises predators suppressing herbivores, which can release producers from grazing pressure. Real ecosystems often combine both.

Liebig’s law of the minimum states that growth is constrained by the scarcest essential resource relative to need. In freshwater systems phosphorus often limits production; in many terrestrial and marine settings nitrogen or other factors may dominate. Recognising the limiting nutrient is central to managing fertilisers, fisheries, and restoration.

Disturbance—fire, flood, storm, outbreak, or human clearing—resets successional trajectories. Intermediate disturbance can maintain higher diversity by preventing a few competitive dominants from excluding others, though severe or frequent disturbance can collapse structure. Ecological succession then rebuilds communities through predictable or contingent sequences of species.

Keystone species exert disproportionate effects relative to their abundance; removing them can reorganise entire webs. Cascade failures after predator loss illustrate why conservation biology treats interaction networks, not only species lists, as the unit of concern. Harder questions in environmental science therefore connect process rates, feedbacks, and thresholds rather than isolated facts.`,
        [
          Q('What does Liebig’s law of the minimum emphasise?', [
            'Growth is limited by the most abundant resource',
            'Growth is limited by the scarcest essential resource relative to need',
            'Predators always control plant biomass',
            'Energy transfer between levels is always 90%',
          ], 1),
          Q('Top-down control in a food web primarily emphasises which process?', [
            'Nutrient weathering from bedrock',
            'Predators suppressing lower trophic levels',
            'Solar radiation heating the soil',
            'Evaporation from lakes',
          ], 1),
          Q('The intermediate disturbance hypothesis suggests that diversity may be highest when disturbance is:', [
            'Never present',
            'Extreme and continuous every day',
            'Neither too rare nor too frequent or severe',
            'Limited to abiotic factors only',
          ], 2),
          Q('A keystone species is best defined as one that:', [
            'Is always the most numerous organism in the habitat',
            'Has an outsized effect on community structure relative to its abundance',
            'Never interacts with other species',
            'Produces all of the ecosystem\'s energy',
          ], 1),
          Q('In many freshwater lakes, which nutrient most often limits primary production?', [
            'Phosphorus',
            'Neon',
            'Helium',
            'Argon',
          ], 0),
          Q('Ecological succession describes:', [
            'A one-time freeze of community composition forever',
            'Directional change in community structure after disturbance or new habitat formation',
            'Only the extinction of apex predators',
            'The monthly cycle of lunar tides alone',
          ], 1),
        ]
      )
    ),

    topic(
      'climate',
      L(
        'Earth’s Climate System',
        `Climate is the long-term pattern of temperature, precipitation, wind, and related variables for a region, typically summarised over decades. Weather is the short-term state of the atmosphere. Confusing the two leads to faulty reasoning: a cold week does not disprove a warming climate trend any more than a hot afternoon proves one by itself.

Earth’s climate system couples atmosphere, oceans, cryosphere (ice), land surface, and biosphere. Incoming solar radiation is the energy source; Earth radiates infrared energy back to space. Uneven heating between equator and poles, the planet’s rotation, and the distribution of continents drive atmospheric and oceanic circulation that redistribute heat.

Oceans store vast amounts of heat and dissolve greenhouse gases, buffering short-term change while slowly adjusting over longer timescales. Ice and snow raise surface albedo (reflectivity), influencing how much sunlight is absorbed. Vegetation affects moisture fluxes and carbon exchange. These components interact through feedbacks that can amplify or dampen change.

Climate classification schemes (for example, Köppen types) organise regions by characteristic temperature and precipitation regimes. For environmental science, the practical goal is to understand why places differ, how circulation connects distant regions, and which observations reliably track long-term change.`,
        [
          Q('How does climate differ from weather?', [
            'Climate is a single day\'s forecast; weather is a thirty-year average',
            'Climate describes long-term patterns; weather is short-term atmospheric conditions',
            'They are identical terms used interchangeably in science',
            'Weather only occurs over oceans; climate only occurs on land',
          ], 1),
          Q('What is the primary external energy source for Earth\'s climate system?', [
            'Radioactive decay in the crust alone',
            'Incoming solar radiation',
            'Heat from burning fossil fuels only',
            'Lightning in tropical storms',
          ], 1),
          Q('Which spheres are coupled in Earth\'s climate system?', [
            'Atmosphere, oceans, cryosphere, land, and biosphere',
            'Only the solid inner core',
            'Only man-made cities',
            'The Moon\'s interior exclusively',
          ], 0),
          Q('Surface albedo refers to:', [
            'How much sunlight a surface reflects',
            'How fast winds blow near mountains',
            'The salinity of deep ocean water',
            'The age of a glacier in years',
          ], 0),
          Q('Why are oceans important to climate?', [
            'They store heat and exchange gases with the atmosphere',
            'They prevent all evaporation',
            'They eliminate atmospheric circulation',
            'They block sunlight from reaching Earth entirely',
          ], 0),
        ]
      ),
      L(
        'The Greenhouse Effect and Radiative Balance',
        `The greenhouse effect is a natural process. Certain atmospheric gases—water vapour, carbon dioxide, methane, nitrous oxide, and others—absorb outgoing longwave (infrared) radiation and re-emit energy in all directions, including back toward Earth’s surface. Without this effect, Earth’s average surface temperature would be far below freezing and unsuitable for most familiar life.

Radiative balance compares incoming solar energy with outgoing energy to space. When greenhouse gas concentrations rise, the atmosphere traps more infrared radiation until the planet warms enough for outgoing energy to again match incoming energy at the top of the atmosphere. That adjustment appears as higher surface temperatures, altered humidity, and shifts in extreme events.

It is important to distinguish the natural greenhouse effect from the enhanced greenhouse effect driven by human emissions. Pre-industrial levels of CO₂ and other gases already warmed the planet; burning fossil fuels, deforestation, and some agricultural practices have increased concentrations further, amplifying warming. Ice-core and instrumental records place recent changes in a longer geological context.

Clouds, aerosols, and surface feedbacks complicate the picture: some cool by reflecting sunlight; others warm by trapping heat. Climate models quantify these processes and project responses under different emission pathways. Scientific consensus on the physical greenhouse mechanism rests on spectroscopy, energy-budget measurements, and observed warming patterns consistent with theory.`,
        [
          Q('What do greenhouse gases primarily do in the atmosphere?', [
            'Reflect all incoming sunlight back to space instantly',
            'Absorb and re-emit outgoing infrared radiation',
            'Convert nitrogen into liquid water',
            'Destroy Earth\'s magnetic field',
          ], 1),
          Q('Without the natural greenhouse effect, Earth\'s surface would be:', [
            'Much colder on average',
            'Identical in temperature to today',
            'Hot enough to boil the oceans everywhere',
            'Unaffected because greenhouse gases do nothing',
          ], 0),
          Q('The enhanced greenhouse effect refers mainly to:', [
            'Extra trapping of heat from increased human-related greenhouse gas concentrations',
            'A permanent shutdown of photosynthesis',
            'Cooling caused by more volcanic ash only',
            'The invention of the thermometer',
          ], 0),
          Q('Which gas is a major greenhouse gas whose concentration has risen sharply from fossil fuel use?', [
            'Carbon dioxide (CO₂)',
            'Argon',
            'Neon',
            'Helium',
          ], 0),
          Q('Radiative balance at the top of the atmosphere compares:', [
            'Incoming solar energy with outgoing energy to space',
            'Only rainfall with snowfall',
            'Only earthquake frequency with volcano counts',
            'Tide height with moon phase exclusively',
          ], 0),
          Q('Why are clouds and aerosols challenging in climate assessment?', [
            'They can cool by reflecting sunlight or warm by trapping heat, depending on type and conditions',
            'They have no physical interaction with radiation',
            'They remove all greenhouse gases permanently',
            'They only exist on other planets',
          ], 0),
        ]
      ),
      L(
        'Climate Feedbacks, Variability, and Observed Change',
        `Feedbacks amplify or dampen an initial forcing. The ice–albedo feedback is a classic positive feedback: warming melts ice, darker surfaces absorb more sunlight, and warming intensifies. Water-vapour feedback is likewise positive because a warmer atmosphere holds more vapour, a strong greenhouse gas. Negative feedbacks, such as increased outgoing longwave radiation as temperature rises, help stabilise the system, though they may not offset strong anthropogenic forcing fully.

Natural variability—El Niño–Southern Oscillation, volcanic eruptions, solar cycles—modulates year-to-year climate and can temporarily mask or enhance trends. Attribution science separates these internal and external factors from long-term anthropogenic signals using observations and models. Multiple independent lines of evidence—surface temperatures, ocean heat content, glacier mass balance, sea level, and phenology—point to a warming world.

Regional impacts are uneven. Some areas face intensified drought risk; others heavier precipitation extremes. Cryosphere loss contributes to sea-level rise and can alter circulation. Thresholds and tipping elements (for example, major ice-sheet destabilisation or permafrost carbon release) are active research frontiers because they involve nonlinearity and irreversibility on human timescales.

Understanding climate therefore requires holding mechanism, variability, and impact together: greenhouse physics explains the direction of change; feedbacks and regional dynamics explain magnitude and pattern; observations and paleoclimate constrain how unusual current trends are.`,
        [
          Q('The ice–albedo feedback is described as positive because:', [
            'Melting ice exposes darker surfaces that absorb more sunlight, amplifying warming',
            'Ice always increases when temperature rises',
            'Albedo has no effect on energy absorption',
            'Oceans stop circulating when ice melts',
          ], 0),
          Q('Why can a single cold season not refute a long-term warming trend?', [
            'Because weather variability can temporarily diverge from multi-decade climate trends',
            'Because thermometers cannot measure winter temperatures',
            'Because climate only changes on other planets',
            'Because cold seasons never occur during warming',
          ], 0),
          Q('Ocean heat content is a useful climate indicator because oceans:', [
            'Store most of the excess heat accumulating in the climate system',
            'Never exchange heat with the atmosphere',
            'Remain at constant temperature by definition',
            'Block all satellite observations',
          ], 0),
          Q('El Niño–Southern Oscillation is best categorised as:', [
            'A mode of natural climate variability in the Pacific with global teleconnections',
            'A permanent greenhouse gas emitted by cities',
            'A type of metamorphic rock',
            'A method of measuring soil pH',
          ], 0),
          Q('A tipping element in the climate system refers to a component that may:', [
            'Shift abruptly or irreversibly once a threshold is crossed',
            'Never change under any warming',
            'Only cool the planet no matter the forcing',
            'Exist solely in laboratory glassware',
          ], 0),
          Q('Water-vapour feedback amplifies warming primarily because:', [
            'A warmer atmosphere can hold more water vapour, which is itself a greenhouse gas',
            'Water vapour permanently removes CO₂ from air',
            'Clouds never form in a warmer climate',
            'Vapour has zero interaction with infrared radiation',
          ], 0),
        ]
      )
    ),

    topic(
      'sustainability',
      L(
        'Sustainability and Natural Resources',
        `Sustainability means meeting present human needs without undermining the ecological systems and resource base that future generations will require. In environmental science this idea is operationalised through carrying capacity, renewable versus non-renewable resources, and rates of extraction relative to rates of regeneration or substitution.

Renewable resources such as timber, freshwater, and fish stocks can be used indefinitely if harvest rates stay within regenerative capacity. Overharvesting turns a renewable resource into a declining one. Non-renewable resources such as fossil fuels and many metal ores form on geological timescales; once depleted or economically inaccessible, they are effectively gone for human purposes, though recycling can extend supplies of some materials.

The tragedy of the commons describes how open-access resources can be overused when individual incentives favour taking more while costs are shared. Institutions—property rights, quotas, community rules, and regulations—often determine whether commons are managed sustainably. Technology can raise efficiency, but efficiency alone may not reduce total use if demand grows (Jevons-type rebound effects).

A practical framing asks three questions: What is being consumed? How fast relative to renewal? Who bears the environmental costs? Those questions link ecology to economics and ethics without reducing sustainability to a slogan.`,
        [
          Q('A renewable resource can be used indefinitely only if:', [
            'Harvest rates remain within regenerative capacity',
            'It is mined from deep ore deposits',
            'It is never part of any food web',
            'It has zero economic value',
          ], 0),
          Q('Fossil fuels are classified as non-renewable primarily because:', [
            'They form far more slowly than humans consume them',
            'They never release energy when burned',
            'They are produced continuously by photosynthesis each day',
            'They cannot be transported',
          ], 0),
          Q('The tragedy of the commons refers to:', [
            'Overuse of open-access resources when individual gains outweigh shared costs',
            'The extinction of all greenhouse gases',
            'A surplus of unused farmland worldwide',
            'Perfect self-regulation of every fishery without rules',
          ], 0),
          Q('Which practice can extend the useful life of many metal resources?', [
            'Recycling and reuse',
            'Dumping them in rivers',
            'Burning them as a primary fuel',
            'Banning all manufacturing forever',
          ], 0),
          Q('Sustainability, in an environmental science sense, emphasises:', [
            'Meeting present needs without undermining future resource and ecological capacity',
            'Maximising short-term extraction regardless of consequences',
            'Ignoring ecosystem services entirely',
            'Using only non-renewable resources',
          ], 0),
        ]
      ),
      L(
        'Resource Use, Ecological Footprints, and Pollution',
        `Human appropriation of resources can be summarised with indicators such as ecological footprint, material flow accounts, and water footprints. These tools estimate how much biologically productive land and water, or how much mass of materials, a lifestyle or economy requires. They are imperfect but useful for comparing consumption patterns and highlighting uneven global demand.

Pollution occurs when substances or energy are released faster than ecosystems can absorb or dilute them without harm. Point sources (for example, a pipe discharge) differ from nonpoint sources (agricultural runoff across a landscape). Persistent pollutants may bioaccumulate in organisms and biomagnify up food chains, concentrating risk in top predators and human consumers of those species.

Energy systems sit at the centre of many sustainability debates. Fossil combustion delivers dense energy but emits CO₂ and local air pollutants. Renewables reduce operational carbon intensity but still require materials, land, and careful siting. Efficiency, demand reduction, and cleaner supply are complementary strategies rather than mutually exclusive ones.

Environmental justice examines how benefits and burdens are distributed. Communities near extractive industries or waste facilities often face disproportionate exposure. Sustainable policy therefore includes not only aggregate resource limits but also fairness in siting, access, and participation in decisions.`,
        [
          Q('An ecological footprint estimate typically tries to measure:', [
            'Demand on biologically productive land and water relative to available capacity',
            'Only the number of animal species in a zoo',
            'The exact age of a mountain range',
            'The voltage of household circuits',
          ], 0),
          Q('Biomagnification describes how some pollutants:', [
            'Increase in concentration at successive trophic levels',
            'Disappear completely after one rainfall',
            'Only affect producers and never consumers',
            'Improve soil fertility in every case',
          ], 0),
          Q('Agricultural fertiliser washed from many fields into a river is an example of:', [
            'Nonpoint-source pollution',
            'A closed geothermal vent',
            'Stratospheric ozone formation',
            'A pure point-source industrial pipe only',
          ], 0),
          Q('Why are energy efficiency and cleaner supply often discussed together?', [
            'Reducing wasteful demand and lowering carbon intensity of supply reinforce each other',
            'Efficiency always increases total fossil fuel use by law',
            'Cleaner supply makes efficiency impossible',
            'Neither has any link to greenhouse gas emissions',
          ], 0),
          Q('Environmental justice focuses especially on:', [
            'How environmental benefits and burdens are distributed among communities',
            'Whether plants can photosynthesise at night',
            'Counting only global average temperatures',
            'Eliminating all forms of recycling',
          ], 0),
          Q('Persistent pollutants are of special concern because they:', [
            'Can remain in ecosystems and organisms for long periods',
            'Always break down within seconds in sunlight',
            'Cannot cross any food-web boundary',
            'Are identical to inert noble gases',
          ], 0),
        ]
      ),
      L(
        'Sustainable Systems, Circular Economy, and Trade-offs',
        `Stronger treatments of sustainability move from individual resources to systems: food systems, cities, energy grids, and industrial supply chains. Life-cycle assessment (LCA) evaluates impacts from extraction through manufacturing, use, and disposal, revealing that shifting burden from one stage or place to another is not the same as reducing it. A product that looks clean in use may have heavy upstream mining costs.

The circular economy aims to keep materials in use through durability, repair, remanufacturing, and recycling, reducing reliance on virgin extraction and landfill. In practice, thermodynamics and contamination limit perfect circularity; recycling rates and material quality matter. Design for disassembly and standardised components improve prospects more than end-of-pipe sorting alone.

Trade-offs are unavoidable. Biofuels can displace petroleum but compete for land with food and habitat. Hydropower is low-carbon in operation yet floods valleys and alters rivers. Intensifying agriculture on existing land can spare wilderness but may raise local pollution. Sustainability science treats such choices explicitly, using multi-criteria assessment rather than single metrics.

Governance tools include protected areas, pollution standards, carbon pricing, renewable portfolio standards, and community-based resource management. Effective regimes monitor outcomes, adapt to new evidence, and align incentives with ecological limits. Hard sustainability questions ask which combination of technology, behaviour, and institutions can reduce absolute impacts while supporting human well-being within planetary boundaries.`,
        [
          Q('Life-cycle assessment is valuable because it:', [
            'Evaluates impacts across extraction, production, use, and disposal stages',
            'Considers only the final day of a product\'s use',
            'Ignores mining and manufacturing completely',
            'Measures only retail prices',
          ], 0),
          Q('A central aim of the circular economy is to:', [
            'Keep materials in productive use longer and reduce virgin extraction and waste',
            'Maximise one-time disposal of all goods',
            'Ban all manufacturing activity',
            'Replace ecosystems with landfills',
          ], 0),
          Q('Which statement best describes sustainability trade-offs?', [
            'Solutions that reduce one impact can increase another, so choices must be assessed explicitly',
            'Every technology has only benefits and no drawbacks',
            'Trade-offs never occur in environmental policy',
            'Only aesthetic preferences matter, not ecological limits',
          ], 0),
          Q('Why is perfect material circularity difficult in practice?', [
            'Thermodynamic losses and contamination limit endless high-quality recycling',
            'Atoms cannot be rearranged under any conditions',
            'Recycling always creates more metal than was used',
            'Physical laws forbid reuse of aluminium and steel',
          ], 0),
          Q('Planetary boundaries research is concerned with:', [
            'Earth-system processes that must stay within safe operating ranges for humanity',
            'Only the boundaries of private property lots in cities',
            'Drawing political maps of continents',
            'Scheduling school calendars by season',
          ], 0),
          Q('Adaptive resource governance typically includes:', [
            'Monitoring outcomes and adjusting rules as evidence accumulates',
            'Never revising policies once written',
            'Ignoring ecological feedbacks',
            'Eliminating all stakeholder participation',
          ], 0),
        ]
      )
    ),
  ],
};
