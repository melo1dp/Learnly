import { Q, L, topic } from './helpers.js';

export default {
  title: 'Statistics Essentials',
  description:
    'A university-level introduction to descriptive statistics, basic probability, and the foundations of statistical inference: sampling and hypothesis testing.',
  category: 'Math',
  level: 'intermediate',
  rating: 4.5,
  topics: [
    topic(
      'descriptive',
      L(
        'Centre and Spread: Mean, Median, and Standard Deviation',
        `Descriptive statistics summarise a data set without trying to generalise beyond the observed values. The two most common measures of centre are the arithmetic mean and the median. The mean is the sum of all observations divided by n; it uses every value and is therefore sensitive to outliers. The median is the middle value when the data are ordered (or the average of the two middle values when n is even). In a roughly symmetric distribution the two nearly coincide; in a right-skewed distribution the mean is pulled toward the long tail and typically exceeds the median.

Spread describes how far values typically sit from the centre. The sample standard deviation s is the square root of the average squared deviation from the mean (with n − 1 in the denominator for an unbiased variance estimate). A large s indicates substantial dispersion; a small s indicates that scores cluster tightly. Always report a measure of centre together with a measure of spread: a mean of 70 with s = 2 tells a different story from the same mean with s = 18.

When reporting descriptive results for an introductory course, state the sample size, the chosen centre, and the standard deviation (or interquartile range if outliers dominate). These three numbers already communicate location, scale, and how much the sample has to say.`,
        [
          Q('Which measure of centre is most affected by a single extreme outlier?', ['Median', 'Mode', 'Mean', 'Midrange of the interquartile range'], 2),
          Q('In a right-skewed distribution, how do the mean and median usually compare?', ['Mean is typically less than the median', 'Mean is typically greater than the median', 'They are always equal', 'The median is undefined'], 1),
          Q('The sample standard deviation s is based on squared deviations from which value?', ['The median', 'The mode', 'The sample mean', 'Zero'], 2),
          Q('Why do sample variance formulas often divide by n − 1 rather than n?', ['To make the estimate of population variance unbiased', 'To force the standard deviation to equal 1', 'Because n − 1 is always even', 'To ignore the largest observation'], 0),
          Q('What should accompany a reported mean in a summary of a continuous variable?', ['Only the sample size', 'A measure of spread such as the standard deviation', 'The population parameter μ', 'The hypothesis test result'], 1),
        ],
      ),
      L(
        'Shapes, Percentiles, and Choosing Summaries',
        `The shape of a distribution determines which descriptive statistics are most informative. A unimodal, roughly symmetric distribution is well summarised by the mean and standard deviation. A skewed or heavy-tailed distribution is often better summarised by the median and the interquartile range (IQR), because both resist extreme scores. The five-number summary—minimum, first quartile (Q1), median, third quartile (Q3), and maximum—supports box plots and makes outliers visible as points beyond the usual fences.

Percentiles locate an observation relative to the rest of the sample. The p-th percentile is a value below which approximately p percent of the data fall. Quartiles are special percentiles: Q1 is the 25th, the median the 50th, and Q3 the 75th. The IQR equals Q3 − Q1 and captures the middle half of the data. Standardised scores (z-scores) further place an observation in units of standard deviations from the mean: z = (x − x̄) / s. A z-score near zero is typical; |z| greater than about 2 or 3 is unusual in many mound-shaped samples.

Choosing summaries is a substantive decision, not a mechanical one. For exam scores that are nearly bell-shaped, mean and s are natural. For household income, which is nearly always right-skewed, the median and IQR communicate typical status more honestly than the mean alone.`,
        [
          Q('Which pair of statistics is most robust to extreme outliers?', ['Mean and standard deviation', 'Median and IQR', 'Mean and range', 'Mode and maximum'], 1),
          Q('What does the interquartile range (IQR) measure?', ['The distance from the minimum to the maximum', 'The middle 50% of the ordered data (Q3 − Q1)', 'The average squared deviation from the mean', 'The proportion of scores equal to the mode'], 1),
          Q('A z-score of −2 for an observation means that the value is:', ['Two standard deviations below the sample mean', 'Twice as large as the median', 'At the 2nd percentile by definition', 'Always an error and should be deleted'], 0),
          Q('The five-number summary consists of:', ['Mean, median, mode, s, and n', 'Min, Q1, median, Q3, and max', 'μ, σ, n, z, and p', 'Only the quartiles'], 1),
          Q('For a strongly right-skewed variable such as income, which centre is usually preferred?', ['The arithmetic mean', 'The median', 'The midrange of min and max', 'The mode of the z-scores'], 1),
          Q('Approximately what percent of observations lie between Q1 and Q3?', ['25%', '50%', '75%', '95%'], 1),
        ],
      ),
      L(
        'Transformations, Outliers, and Misreading Summaries',
        `Linear transformations change location and scale in predictable ways. If every observation is shifted by adding a constant c, the mean and median increase by c while measures of spread (s, IQR, range) stay the same. If every observation is multiplied by a positive constant k, both centre and spread scale by k. Nonlinear transformations (for example, taking logarithms of right-skewed positive data) can reduce skewness and make mean–sd summaries more appropriate after the transform, but they also change the units of interpretation.

Outlier handling must be transparent. Extreme values can arise from measurement error, from a distinct subgroup, or from the natural heavy tails of a variable. Deleting an outlier solely because it inflates the standard deviation is poor practice; documenting it, checking the raw record, and reporting both with-and-without sensitivity summaries is better. Rules of thumb such as |z| > 3 or the 1.5 × IQR fence are screening devices, not automatic discard rules.

Misreading descriptive summaries is common in applied work. Comparing means without mentioning sample sizes or spreads can exaggerate differences. Reporting only the mean for a multimodal distribution can hide important subgroups. And citing a standard deviation as if it were a standard error confuses the variability of observations with the variability of an estimator—an error that becomes critical once inference begins.`,
        [
          Q('If you add 10 to every score in a sample, what happens to the standard deviation?', ['It increases by 10', 'It is multiplied by 10', 'It remains unchanged', 'It becomes zero'], 2),
          Q('If every score is multiplied by 3, how does the sample mean change?', ['It stays the same', 'It is multiplied by 3', 'It increases by 3', 'It is divided by 3'], 1),
          Q('Why is automatically deleting observations with |z| > 3 problematic?', ['Because z-scores cannot exceed 3 in any sample', 'Because outliers may be genuine and deletion should be justified, not automatic', 'Because the median would then equal the mean', 'Because n − 1 becomes invalid'], 1),
          Q('Taking the logarithm of positive right-skewed data is mainly used to:', ['Guarantee a normal population after transformation', 'Reduce skewness and stabilise spread for clearer summary', 'Convert the median into the mean', 'Remove the need for a sample size'], 1),
          Q('Confusing a standard deviation with a standard error means confusing:', ['Centre with spread', 'Variability of observations with variability of an estimator', 'Median with mode', 'IQR with range'], 1),
        ],
      ),
    ),
    topic(
      'probability',
      L(
        'Events, Sample Spaces, and Basic Rules',
        `Probability formalises uncertainty. A random experiment has a sample space S: the set of all possible outcomes. An event A is a subset of S. In the classical finite setting with equally likely outcomes, P(A) equals the number of favourable outcomes divided by the total number of outcomes. More generally, a probability measure assigns numbers between 0 and 1 to events so that P(S) = 1 and probabilities of disjoint events add.

The complement rule states that P(Aᶜ) = 1 − P(A). For any two events, the addition rule is P(A ∪ B) = P(A) + P(B) − P(A ∩ B); the subtraction term corrects double-counting of the intersection. When A and B are mutually exclusive (disjoint), the intersection is empty and P(A ∪ B) = P(A) + P(B). These identities are the workhorses of elementary calculations before distributions enter the picture.

Independence is a separate idea: A and B are independent when P(A ∩ B) = P(A)P(B), equivalently when knowing that one occurred does not change the probability of the other. Independence must be justified by the design of the experiment or by data; disjoint events with positive probability are never independent, because the occurrence of one makes the other impossible.`,
        [
          Q('In a finite equiprobable sample space, P(A) equals:', ['The size of A divided by the size of S', 'Always 1/2', 'The size of A alone', '1 minus the mean of A'], 0),
          Q('What is P(Aᶜ) in terms of P(A)?', ['P(A)', '1 − P(A)', 'P(A)²', '0'], 1),
          Q('The addition rule P(A ∪ B) = P(A) + P(B) − P(A ∩ B) subtracts the intersection to:', ['Avoid double-counting outcomes in both A and B', 'Force independence', 'Make the probability exceed 1', 'Estimate the standard deviation'], 0),
          Q('If A and B are mutually exclusive and P(A), P(B) > 0, can they be independent?', ['Yes, always', 'No, because P(A ∩ B) = 0 ≠ P(A)P(B)', 'Only if P(A) = P(B)', 'Only in infinite sample spaces'], 1),
          Q('Events A and B are independent when:', ['P(A ∪ B) = 1', 'P(A ∩ B) = P(A)P(B)', 'A and B are disjoint', 'P(A) = P(B)'], 1),
        ],
      ),
      L(
        'Conditional Probability and Bayes-Type Reasoning',
        `Conditional probability answers: given that B has occurred, what is the chance of A? By definition, P(A | B) = P(A ∩ B) / P(B) when P(B) > 0. Rearrangement yields the multiplication rule P(A ∩ B) = P(A | B)P(B). Tree diagrams encode sequences of conditional steps and keep the joint probabilities organised as products along branches.

Bayes' theorem updates prior beliefs in light of new evidence. In its simplest two-event form, P(A | B) = P(B | A)P(A) / P(B), where P(B) is often expanded with the law of total probability by partitioning on A and Aᶜ. Classic classroom settings include false-positive screening tests: even a test with high sensitivity and specificity can yield a modest positive predictive value when the condition is rare, because most positives arise from the large healthy population.

Conditional reasoning also clarifies dependence. If P(A | B) equals P(A), then A and B are independent. Students often confuse P(A | B) with P(B | A); they are related through Bayes' theorem but equal only in special cases. Keeping the conditioning event in the denominator mentally prevents that swap.`,
        [
          Q('The definition of P(A | B) is:', ['P(A) + P(B)', 'P(A ∩ B) / P(B), for P(B) > 0', 'P(A)P(B)', 'P(A ∪ B) / P(B)'], 1),
          Q('The multiplication rule for the joint probability P(A ∩ B) is:', ['P(A) + P(B)', 'P(A | B)P(B)', 'P(A)/P(B)', '1 − P(A ∪ B)'], 1),
          Q('In a rare-disease screening context, a high false-positive burden often occurs because:', ['Specificity is always zero', 'Most people are disease-free, so even a small false-positive rate yields many false positives', 'Sensitivity cannot exceed 50%', 'Bayes\' theorem does not apply to medical tests'], 1),
          Q('If P(A | B) = P(A), then A and B are:', ['Mutually exclusive', 'Independent', 'Complements', 'The same event'], 1),
          Q('P(A | B) and P(B | A) are:', ['Always equal', 'Related by Bayes\' theorem but not generally equal', 'Undefined whenever independence holds', 'Always equal to P(A ∩ B)'], 1),
          Q('The law of total probability is used when computing P(B) by:', ['Ignoring the prior P(A)', 'Partitioning on mutually exclusive cases such as A and Aᶜ and summing the joint pieces', 'Replacing P(B) with the median', 'Setting all conditionals to 1/2'], 1),
        ],
      ),
      L(
        'Discrete Distributions: Binomial Thinking',
        `Many university problems count the number of successes in a fixed number of independent Bernoulli trials, each with the same success probability p. If X is that count, then X follows a binomial distribution Binomial(n, p) with probability mass function P(X = k) = C(n, k) pᵏ (1 − p)ⁿ⁻ᵏ for k = 0, 1, …, n. The mean is np and the variance is np(1 − p). The binomial model requires a fixed n, two outcomes per trial, constant p, and independence across trials—assumptions that fail silently if sampling is without replacement from a small population or if p drifts.

When n is large and p is neither near 0 nor 1, the distribution of X (and of the sample proportion) can be approximated by a normal curve centred at np with standard deviation √[np(1 − p)]. Continuity corrections improve the approximation for counts but are secondary to checking that np and n(1 − p) are reasonably large (a common rule of thumb is at least 10).

Understanding the binomial builds the bridge to inference on proportions. Estimating p by the sample proportion p̂ = X/n, assessing whether a claimed p₀ is plausible, and constructing intervals all rest on this discrete model and its normal approximation under suitable conditions.`,
        [
          Q('For X ~ Binomial(n, p), what is E[X]?', ['p', 'np', '√[np(1 − p)]', 'n + p'], 1),
          Q('Which assumption is required for the binomial model?', ['Trials may have changing success probability', 'A fixed number of independent trials with constant p', 'Outcomes must be continuous', 'n must be less than 5'], 1),
          Q('The variance of a Binomial(n, p) random variable is:', ['np', 'p(1 − p)', 'np(1 − p)', 'n²p'], 2),
          Q('A normal approximation to the binomial is most questionable when:', ['n is large and p ≈ 0.5', 'n is small or p is very near 0 or 1', 'The mean equals the variance', 'Outcomes are coded 0/1'], 1),
          Q('If each of 20 independent fair-coin flips is a Bernoulli trial, the number of heads is:', ['Normal with mean 0', 'Binomial(20, 0.5)', 'Uniform on {0, 1}', 'Deterministic and equal to 10'], 1),
        ],
      ),
    ),
    topic(
      'inference',
      L(
        'Sampling Variability and the Sampling Distribution',
        `Statistical inference uses a sample to say something about a larger population. The key conceptual fact is sampling variability: different random samples of the same size from the same population yield different statistics. The sampling distribution of a statistic is the distribution of that statistic across all possible samples of size n. For the sample mean x̄ from a population with mean μ and finite standard deviation σ, the sampling distribution of x̄ has mean μ and standard deviation σ/√n (often called the standard error of the mean).

The central limit theorem (CLT) states that as n grows, the sampling distribution of x̄ becomes approximately normal even when the population distribution is not, provided observations are independent and identically distributed with finite variance. How large n must be depends on the population shape; severe skewness requires larger samples before the normal approximation is comfortable. For means from already-normal populations, exact normal sampling theory holds for any n.

This framework explains why larger samples produce more precise estimates: the standard error shrinks like 1/√n. Doubling the sample size does not cut the standard error in half; it reduces it by a factor of √2 ≈ 1.41. Planning sample size is therefore a trade-off between cost and desired precision.`,
        [
          Q('The standard error of the sample mean (with known σ) is:', ['σ', 'σ/√n', 'σ/n', 's'], 1),
          Q('Sampling variability refers to the fact that:', ['Every sample yields the exact population parameter', 'Different random samples produce different statistics', 'Variance cannot be estimated', 'n must equal the population size'], 1),
          Q('The central limit theorem primarily concerns the shape of:', ['The population histogram for n = 2', 'The sampling distribution of the sample mean as n grows', 'The median alone', 'Deterministic census counts'], 1),
          Q('If n increases by a factor of 4, the SE of x̄ (known σ) becomes:', ['4 times larger', '2 times larger', 'Half as large', 'Unchanged'], 2),
          Q('For i.i.d. draws from a normal population, the sampling distribution of x̄ is:', ['Exactly normal for any n', 'Only approximately normal for n > 30', 'Always skewed', 'Undefined'], 0),
        ],
      ),
      L(
        'Confidence Intervals for a Mean',
        `A confidence interval (CI) is a range of plausible values for a parameter, constructed from sample data by a procedure that captures the true parameter in a stated proportion of repeated samples. For a mean with known σ, a (1 − α)100% CI for μ is x̄ ± z* (σ/√n), where z* is the critical value from the standard normal leaving probability α/2 in each tail (about 1.96 for 95%). In practice σ is usually unknown and is replaced by s; the critical value then comes from a t distribution with n − 1 degrees of freedom, yielding x̄ ± t* (s/√n).

Interpretation must be careful. A 95% CI does not mean that the probability is 95% that μ lies in this particular computed interval after the data are fixed. Rather, the method succeeds in about 95% of hypothetical repeated samples. Once computed, the interval either contains μ or it does not. Wider intervals reflect greater uncertainty: smaller n, larger s, or higher confidence levels all tend to widen the interval.

Checking conditions remains essential: reasonably random sampling (or random assignment), approximate independence (often aided by a large population relative to the sample), and either normality of the population or a large enough n for the CLT to justify the t interval.`,
        [
          Q('A 95% confidence interval for μ is best interpreted as:', ['P(μ is in this fixed interval) = 0.95 after seeing the data', 'A method that, in repeated sampling, covers μ about 95% of the time', 'Proof that μ equals the sample mean', 'A range that always contains every observation'], 1),
          Q('When σ is unknown, the usual CI for a mean uses which critical value?', ['z from N(0,1) always', 't with n − 1 degrees of freedom', 'χ² with n degrees of freedom', 'F with n and n − 1 df'], 1),
          Q('Holding everything else fixed, increasing the confidence level typically:', ['Narrows the interval', 'Widens the interval', 'Leaves width unchanged', 'Changes the sample mean'], 1),
          Q('The margin of error in x̄ ± t*(s/√n) is:', ['t*(s/√n)', 's alone', 't* only', 'n − 1'], 0),
          Q('Which condition supports using a one-sample t interval for a mean?', ['The sample must be the entire population', 'Independence and either approximate normality or large n', 'The standard deviation must be known exactly', 'α must equal 0.5'], 1),
          Q('Compared with n = 25, a sample of n = 100 tends to produce a CI that is:', ['About twice as wide', 'About half as wide (SE scales with 1/√n)', 'Identical in width', 'Always invalid'], 1),
        ],
      ),
      L(
        'Hypothesis Tests: Logic, p-Values, and Errors',
        `A hypothesis test assesses whether sample evidence is compatible with a null claim H₀, usually a statement of "no effect" or a specific parameter value. The alternative Hₐ is what the researcher suspects: two-sided (≠), or one-sided (> or <). A test statistic measures how far the data sit from what H₀ predicts, typically on a standard scale (z or t). The p-value is the probability, computed under H₀, of obtaining a test statistic at least as extreme as the one observed. A small p-value indicates that the data are unusual under H₀ and provides evidence against it.

Decisions relative to a significance level α (commonly 0.05) are a convention: reject H₀ when p ≤ α. This framework admits two error types. A Type I error rejects a true H₀ (false positive); its probability is controlled at α when assumptions hold. A Type II error fails to reject a false H₀ (false negative); its probability β depends on the true effect size, n, and α. Power equals 1 − β and rises with larger samples and larger true effects.

Common misinterpretations include treating p as the probability that H₀ is true, treating a non-significant result as proof that H₀ is true, and ignoring practical significance. A tiny effect can be statistically detectable with huge n, while a meaningful effect can be missed with small n. Report effect sizes and intervals alongside p-values whenever possible.`,
        [
          Q('A p-value is best described as:', ['The probability that H₀ is true', 'Under H₀, the probability of a result at least as extreme as observed', 'The Type II error rate', 'Always equal to α'], 1),
          Q('A Type I error occurs when the test:', ['Fails to reject a false H₀', 'Rejects a true H₀', 'Uses the wrong degrees of freedom', 'Reports a confidence interval'], 1),
          Q('Power of a test is:', ['α', '1 − β, the probability of correctly rejecting a false H₀', 'The p-value', 'Always 0.95'], 1),
          Q('Failing to reject H₀ at α = 0.05 means:', ['H₀ has been proven true', 'The data did not provide sufficient evidence against H₀ at that α', 'p must be exactly 0.05', 'The sample size was infinite'], 1),
          Q('Holding other factors fixed, increasing n typically:', ['Decreases power', 'Increases power', 'Increases Type I error above α automatically', 'Makes p-values meaningless'], 1),
        ],
      ),
    ),
  ],
};
