import { Q, L, topic } from './helpers.js';

export default {
  title: 'Microeconomics Fundamentals',
  description:
    'Core university microeconomics: demand and supply, elasticity, and how market structure shapes price and output from perfect competition to monopoly.',
  topics: [
    topic(
      'demand_supply',
      L(
        'Demand, Supply, and Market Equilibrium',
        `A competitive market coordinates buyers and sellers through price. The demand curve shows the relationship between the price of a good and the quantity consumers are willing and able to buy, holding other determinants fixed. It slopes downward: as price falls, quantity demanded rises, reflecting diminishing marginal utility and substitution toward the now-cheaper good. The supply curve shows how much producers are willing to sell at each price; it typically slopes upward because higher prices make additional production profitable as marginal costs rise.

Market equilibrium is the price–quantity pair at which quantity demanded equals quantity supplied. At that price there is no tendency for inventories to pile up or shelves to empty, so price is stable until a determinant of demand or supply shifts. A price above equilibrium creates a surplus: sellers compete by cutting price. A price below equilibrium creates a shortage: buyers bid the price up. The equilibrium is the prediction of the simple supply–demand model under flexible prices.

Shifts differ from movements along a curve. A change in the good's own price causes a movement along a given demand or supply curve. A change in income, tastes, prices of related goods, expectations, or the number of buyers shifts demand. Input prices, technology, expectations, and the number of sellers shift supply. Correctly identifying which curve moved is the first step in any comparative-statics story.`,
        [
          Q('Why does a typical demand curve slope downward?', ['Higher prices always increase income effects only', 'As price falls, quantity demanded rises (law of demand)', 'Firms produce less when price falls', 'Equilibrium requires an upward demand curve'], 1),
          Q('Market equilibrium occurs where:', ['Price is maximised', 'Quantity demanded equals quantity supplied', 'Demand is perfectly inelastic', 'Government sets a floor above costs'], 1),
          Q('A price set above the equilibrium price tends to produce:', ['A shortage', 'A surplus', 'Immediate exit of all firms', 'An increase in demand'], 1),
          Q('Which event causes a movement along the demand curve rather than a shift?', ['A rise in consumer income', 'A change in the good\'s own price', 'A change in tastes', 'A change in the price of a complement'], 1),
          Q('An improvement in production technology typically:', ['Shifts supply to the right (increase in supply)', 'Shifts demand to the left', 'Makes quantity demanded independent of price', 'Eliminates equilibrium'], 0),
        ],
      ),
      L(
        'Comparative Statics: Shifts and Price Adjustment',
        `Comparative statics traces how equilibrium price and quantity change when a curve shifts. An increase in demand (rightward shift), with supply fixed, raises both equilibrium price and quantity. An increase in supply (rightward shift), with demand fixed, lowers equilibrium price and raises quantity. When both curves shift, the effect on one of the two variables—price or quantity—may be ambiguous without knowing relative magnitudes. For example, if demand and supply both increase, quantity clearly rises, but price may rise or fall.

Applications are everywhere in introductory policy discussion. A successful advertising campaign shifts demand right. A drought that ruins harvests shifts agricultural supply left, raising prices. An influx of workers in a regional labour market can be read as an increase in labour supply, putting downward pressure on wages all else equal. The same logic applies in asset markets, though expectations and speculation complicate the simple diagram.

Students should practise writing the narrative carefully: name the market, state which curve shifts and why, sketch the old and new equilibrium, and state what happens to P* and Q*. Verbal intuition without the diagram often misses whether price or quantity moved, or how two simultaneous shocks interact.`,
        [
          Q('An increase in demand with supply held fixed leads to:', ['Lower equilibrium price and quantity', 'Higher equilibrium price and quantity', 'Higher price and lower quantity', 'No change in equilibrium'], 1),
          Q('An increase in supply with demand held fixed leads to:', ['Higher price and higher quantity', 'Lower price and higher quantity', 'Lower price and lower quantity', 'Higher price and lower quantity'], 1),
          Q('If demand and supply both increase, what is unambiguous?', ['Price must rise', 'Price must fall', 'Equilibrium quantity rises', 'Equilibrium quantity falls'], 2),
          Q('A drought that reduces crop yields is best modelled as:', ['A rightward shift of demand', 'A leftward shift of supply', 'A movement down the supply curve only', 'A price ceiling'], 1),
          Q('If consumer income rises and the good is normal, demand:', ['Shifts left', 'Shifts right', 'Becomes vertical', 'Is unchanged while supply shifts'], 1),
          Q('When two curves shift and the effect on price is ambiguous, that means:', ['The model is invalid', 'Price could rise or fall depending on which shift is larger', 'Quantity is always unchanged', 'Only shortages can occur'], 1),
        ],
      ),
      L(
        'Price Controls, Efficiency, and Surplus',
        `Consumer surplus is the difference between what buyers are willing to pay and what they actually pay; graphically it is the area under demand and above price. Producer surplus is the difference between the price received and the minimum price sellers would have accepted; it is the area above supply and below price. Total surplus—the sum of the two—is maximised at the competitive equilibrium under the standard efficiency assumptions (no externalities, complete information, price-taking behaviour). That is the sense in which markets are said to be allocatively efficient in the introductory model.

Price ceilings (legal maxima) set below equilibrium create shortages, rationing problems, and often black markets; they transfer surplus toward successful buyers but typically reduce total surplus (deadweight loss). Price floors (legal minima) set above equilibrium create surpluses—think agricultural supports or binding minimum wages in the simple labour diagram—and also generate deadweight loss when they prevent mutually beneficial trades.

Not every intervention fails a broader welfare test: if the competitive market itself is distorted by externalities or market power, a carefully designed policy can raise social surplus. The perfectly competitive supply–demand benchmark remains the reference point against which those more advanced cases are judged.`,
        [
          Q('Consumer surplus is the area:', ['Above demand and below price', 'Under demand and above price', 'Under supply and above price', 'Equal to total revenue'], 1),
          Q('At a competitive equilibrium with no market failures, total surplus is:', ['Minimised', 'Maximised in the standard model', 'Always zero', 'Independent of quantity'], 1),
          Q('A binding price ceiling below equilibrium tends to cause:', ['A surplus of the good', 'A shortage of the good', 'An immediate rightward supply shift', 'Elimination of demand'], 1),
          Q('Deadweight loss from a binding price floor arises because:', ['All traders still complete every beneficial trade', 'Some mutually beneficial trades no longer occur', 'Consumer surplus always rises by more than producer surplus falls', 'Supply becomes perfectly elastic'], 1),
          Q('Producer surplus measures:', ['Accounting profit including fixed costs only', 'The excess of price over sellers\' minimum willingness to accept, summed over units sold', 'Government tax revenue', 'The vertical gap between two demand curves'], 1),
        ],
      ),
    ),
    topic(
      'elasticity',
      L(
        'Price Elasticity of Demand: Definition and Range',
        `Price elasticity of demand measures how responsive quantity demanded is to a change in price. The formal definition is the percentage change in quantity demanded divided by the percentage change in price. Because price and quantity move in opposite directions along a demand curve, the raw ratio is negative; economists usually report the absolute value and speak of elastic demand when that value exceeds 1, unit elastic when it equals 1, and inelastic when it is less than 1.

Determinants of elasticity include the availability of close substitutes (more substitutes → more elastic), whether the good is a necessity or a luxury, the share of the budget spent on the good, and the time horizon (demand is typically more elastic in the long run as consumers adjust). Linear demand curves have elasticity that varies along the curve: elastic above the midpoint, unit elastic at the midpoint, and inelastic below it, even though the slope is constant. Slope and elasticity are therefore not the same concept.

A practical midpoint (arc) formula uses average price and average quantity in the percentage calculations to avoid path dependence between "before" and "after" prices. Point elasticity uses calculus—dQ/dP times P/Q—but the interpretation remains percentage responsiveness.`,
        [
          Q('If the absolute price elasticity of demand is 2, demand is:', ['Perfectly inelastic', 'Inelastic', 'Unit elastic', 'Elastic'], 3),
          Q('Demand tends to be more elastic when:', ['There are few substitutes and short time to adjust', 'There are many close substitutes', 'The good is a pure necessity with no substitutes', 'The budget share is negligible and habits are fixed'], 1),
          Q('Along a linear downward-sloping demand curve, elasticity:', ['Is constant everywhere', 'Varies; typically higher (more elastic) at higher prices', 'Is always zero', 'Equals the slope at every point'], 1),
          Q('Price elasticity of demand is defined as:', ['ΔP / ΔQ', 'Percentage change in Qᵈ divided by percentage change in P', 'Total revenue divided by price', 'Slope of the supply curve'], 1),
          Q('In the long run, demand for most goods tends to be:', ['Less elastic than in the short run', 'More elastic than in the short run', 'Perfectly inelastic', 'Independent of substitutes'], 1),
        ],
      ),
      L(
        'Elasticity, Revenue, and Other Elasticities',
        `The relationship between price elasticity and total revenue is a standard application. When demand is elastic, a price cut raises total revenue because the percentage increase in quantity outweighs the percentage fall in price. When demand is inelastic, a price cut lowers revenue; a price increase raises revenue. At unit elasticity, small price changes leave total revenue approximately unchanged. Firms therefore care about where they sit on the demand curve when contemplating list-price changes.

Income elasticity of demand is the percentage change in quantity demanded divided by the percentage change in income. Positive income elasticity marks a normal good; negative marks an inferior good. Luxuries often have income elasticities greater than one. Cross-price elasticity uses the percentage change in quantity of good X relative to the percentage change in the price of good Y: positive for substitutes, negative for complements, and near zero for unrelated goods.

Price elasticity of supply is defined analogously for quantity supplied. Supply is more elastic when firms can easily redeploy capacity, when inventories are available, and when the time horizon is long. Perfectly inelastic supply is vertical; perfectly elastic supply is horizontal. Tax incidence—who bears a tax—depends on the relative elasticities of demand and supply: the less elastic side bears more of the burden.`,
        [
          Q('If demand is elastic and the firm lowers price, total revenue typically:', ['Falls', 'Rises', 'Is undefined', 'Equals marginal cost'], 1),
          Q('A good with negative income elasticity is called:', ['Normal', 'Inferior', 'Giffen only by definition of income elasticity', 'A complement'], 1),
          Q('Cross-price elasticity between tea and coffee is expected to be:', ['Negative, because they are complements', 'Positive, because they are substitutes', 'Exactly zero always', 'Infinite'], 1),
          Q('If demand is inelastic and price rises, total revenue:', ['Falls', 'Rises', 'Always stays the same', 'Becomes equal to consumer surplus'], 1),
          Q('Other things equal, the side of the market with more inelastic curves tends to:', ['Avoid all tax burden', 'Bear a larger share of a per-unit tax', 'Force the tax to zero', 'Make supply perfectly elastic'], 1),
          Q('Perfectly inelastic supply is drawn as:', ['A horizontal line', 'A vertical line', 'An upward-sloping line through the origin only', 'A downward-sloping line'], 1),
        ],
      ),
      L(
        'Applications: Tax Incidence and Pricing Ambiguity',
        `A specific (per-unit) tax drives a wedge between the price buyers pay and the price sellers receive. In the supply–demand diagram the wedge can be shown by shifting the supply curve up by the tax amount (or the demand curve down). The new quantity is lower; buyers usually pay more than before and sellers receive less, but the split—the incidence—depends on elasticities, not on which party remits the tax cheque to the government. Statutory incidence and economic incidence diverge for that reason.

When demand is relatively inelastic and supply relatively elastic, consumers bear most of the tax. When supply is relatively inelastic (for example, fixed land in the short run), producers bear more. Deadweight loss grows with the size of the tax and with the elasticities that shrink the traded quantity. That is why taxes on goods with inelastic demand raise revenue with relatively smaller efficiency loss, a classic argument in public finance—though equity and externalities may point elsewhere.

Elasticity estimates are empirical and uncertain, so incidence predictions in real markets are quantitative judgments. Still, the elasticity toolkit gives a disciplined first answer to "who pays?" before institutional detail is added.`,
        [
          Q('Economic incidence of a tax refers to:', ['Which party legally remits the tax', 'How the tax burden is shared through price changes', 'Only the government\'s budget identity', 'The slope of the Laffer curve alone'], 1),
          Q('If demand is much more inelastic than supply, a per-unit tax tends to be borne mostly by:', ['Producers', 'Consumers', 'Neither side', 'Only exporters'], 1),
          Q('A per-unit tax generally reduces equilibrium quantity because:', ['Demand becomes upward sloping', 'The tax wedge discourages some mutually beneficial trades', 'Elasticity becomes zero', 'Price ceilings are required'], 1),
          Q('Deadweight loss from taxation tends to be larger when:', ['Demand and supply are more elastic (quantity shrinks more)', 'Both curves are perfectly inelastic', 'The tax is zero', 'Income elasticity is negative'], 0),
          Q('Why can statutory incidence differ from economic incidence?', ['Because elasticities and market price adjustments allocate the real burden', 'Because taxes never affect prices', 'Because quantity cannot change', 'Because surplus cannot be defined'], 0),
        ],
      ),
    ),
    topic(
      'market_structures',
      L(
        'Perfect Competition: Price Taking and Efficiency',
        `Perfect competition is an idealised market structure with many buyers and sellers, a homogeneous product, free entry and exit, and perfect information. Each firm is a price taker: it faces a horizontal demand curve at the market price P and can sell as much as it wishes at that price but nothing at any higher price. Short-run profit maximisation requires producing where marginal cost (MC) equals marginal revenue, which for a price taker equals P. The firm shuts down in the short run if P lies below average variable cost; it exits in the long run if P lies below average total cost.

Industry supply in the short run aggregates individual MC curves above AVC. In the long run, free entry drives economic profit to zero: price settles at the minimum of long-run average cost for a constant-cost industry. Productive efficiency (producing at minimum average cost) and allocative efficiency (P = MC) characterise the long-run competitive equilibrium in the standard model. These efficiency claims are benchmarks, not descriptions of every real market.

Competition is a process as much as an outcome. Entry and exit reallocate capital toward profitable markets and away from unprofitable ones. That dynamic adjustment is why textbooks treat zero long-run economic profit as normal for competitive industries even when accounting profits look healthy.`,
        [
          Q('A perfectly competitive firm faces a demand curve that is:', ['Downward sloping and market-wide', 'Horizontal at the market price', 'Vertical at the firm\'s capacity', 'Identical to market demand'], 1),
          Q('A price-taking firm maximises profit by producing where:', ['Average cost is maximised', 'P = MC (provided P covers the relevant costs)', 'Total revenue is minimised', 'MC is maximised'], 1),
          Q('In the short run, a competitive firm should shut down if price is below:', ['Average total cost always', 'Average variable cost', 'Marginal revenue only at one point', 'The industry median price'], 1),
          Q('Long-run free entry in perfect competition tends to drive economic profit:', ['To infinity', 'To zero', 'To equal accounting profit always', 'To match monopoly profit'], 1),
          Q('Allocative efficiency in the competitive model is associated with:', ['P > MC', 'P = MC', 'P < AVC', 'MR = 0'], 1),
        ],
      ),
      L(
        'Monopoly: MR, Markup, and Inefficiency',
        `A monopoly is the sole seller of a product without close substitutes and with barriers to entry. The monopolist faces the market demand curve and must lower price to sell additional units, so marginal revenue lies below price: MR < P for each positive quantity on a downward-sloping demand curve. Profit maximisation still sets MR = MC, but the price charged is read off the demand curve at that quantity and therefore exceeds marginal cost. The gap P − MC is the markup; under constant elasticity demand it relates to the Lerner index (P − MC)/P = 1/|ε|.

Compared with a competitive outcome, monopoly typically restricts quantity and raises price, creating deadweight loss: units for which willingness to pay exceeds MC go unproduced. Part of what would have been consumer surplus becomes monopoly profit (producer surplus), and part disappears as deadweight loss. Barriers sustaining monopoly include legal exclusivity (patents, licences), control of a key resource, and natural monopoly cost structures where average cost falls over the relevant demand range.

Monopoly is not automatically illegal or socially undesirable in every setting—innovation incentives and natural monopoly regulation complicate the picture—but the efficiency comparison with competition remains the central introductory lesson.`,
        [
          Q('For a single-price monopolist facing downward-sloping demand, marginal revenue is:', ['Equal to price at every output', 'Greater than price', 'Less than price for additional units sold', 'Always zero'], 2),
          Q('A profit-maximising monopolist chooses output where:', ['P = MC', 'MR = MC', 'ATC is maximised', 'Demand is perfectly elastic'], 1),
          Q('Relative to competition, standard monopoly pricing tends to:', ['Lower price and raise quantity', 'Raise price and lower quantity', 'Leave price and quantity unchanged', 'Force P below MC'], 1),
          Q('Deadweight loss under monopoly arises because:', ['P equals MC for every unit', 'Some units with value above MC are not produced', 'Consumer surplus cannot be defined', 'MR exceeds demand'], 1),
          Q('The Lerner index (P − MC)/P is larger when demand is:', ['More elastic', 'Less elastic', 'Perfectly elastic only', 'Undefined for monopoly'], 1),
          Q('A natural monopoly typically features:', ['Rising average cost over the entire demand range', 'Declining average cost over the relevant demand range', 'Perfect competition among many firms', 'Zero fixed costs always'], 1),
        ],
      ),
      L(
        'Comparing Structures and Intermediate Cases',
        `Market structure is a spectrum. Perfect competition and monopoly are poles; monopolistic competition and oligopoly sit between them. Monopolistic competition features many firms, free entry, and differentiated products—so each firm faces a downward-sloping demand curve and has some price-setting power, but long-run entry erodes economic profit much as in competition. Oligopoly involves few interdependent firms; strategic interaction (game theory) replaces price taking, and outcomes range from near-collusive high prices to intense rivalry.

Key comparison dimensions are the number of firms, product differentiation, barriers to entry, and the relationship between price and marginal cost. Concentration measures such as the four-firm concentration ratio or HHI summarise how much output the largest firms control, but structure alone does not dictate conduct: contestability, buyer power, and potential entry matter. Antitrust policy uses these ideas when judging mergers and exclusionary practices.

For university microeconomics, the practical skill is to pick the right model for the question. If a firm is small relative to a homogeneous market, competition is the workhorse. If a firm faces market demand without rivals, monopoly pricing applies. If branding differentiates products with easy entry, monopolistic competition frames the long-run zero-profit tangency story. Matching structure to toolkit prevents misapplying P = MC where MR = MC belongs.`,
        [
          Q('Monopolistic competition differs from perfect competition mainly because of:', ['A single firm and blocked entry', 'Product differentiation and downward-sloping firm demand', 'Government-set prices only', 'Identical products with no entry'], 1),
          Q('Oligopoly is characterised by:', ['Many price-taking firms', 'Strategic interdependence among a few firms', 'Always zero long-run profit with identical products', 'Horizontal firm demand at market price'], 1),
          Q('In long-run monopolistic competition with free entry, economic profit tends toward:', ['Infinity', 'Zero, while firms retain some markup over MC', 'The same price as monopoly without entry', 'Negative infinity'], 1),
          Q('The rule MR = MC applies to:', ['Only perfect competition', 'Profit-maximising firms more generally, including monopoly', 'Only nonprofits', 'Only when demand is perfectly inelastic'], 1),
          Q('A market with high barriers to entry and one seller is closest to:', ['Perfect competition', 'Monopoly', 'Monopolistic competition with free entry', 'A pure public good'], 1),
        ],
      ),
    ),
  ],
};
