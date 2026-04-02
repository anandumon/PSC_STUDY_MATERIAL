// Chapter 1: Discrete Mathematics, Probability & Statistics
const CH1 = {
    id: 0,
    title: "Discrete Mathematics, Probability & Statistics",
    icon: "🔢",
    marks: 12,
    color: "#6366f1",
    topics: "Compound Statements, Truth Tables, Sets, Relations, Mathematical Induction, Probability, Regression, Sampling",

    overview: {
        importance: "This chapter carries 12 marks and forms the mathematical foundation for computer science. Questions are formula-based and scoring if prepared well. Probability and statistics are high-scoring areas with direct formula application.",
        weightage: "12 out of 100 marks (12%)",
        focusAreas: [
            "Truth Tables & Logical Equivalences",
            "Set Operations & Relations",
            "Bayes' Theorem & Conditional Probability",
            "Correlation & Regression",
            "Mathematical Induction"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>1.1 Compound Statements & Truth Tables</h4>
<p>A <strong>proposition</strong> (or statement) is a declarative sentence that is either TRUE or FALSE, but not both. For example, "5 is a prime number" (TRUE) is a proposition, but "What time is it?" is NOT a proposition because it's a question, not a declarative assertion.</p>

<p>Propositions are the building blocks of formal logic. In exams, you'll be expected to identify propositions, combine them using <strong>logical connectives</strong>, and evaluate their truth values using <strong>truth tables</strong>. The five basic connectives are:</p>
<ul>
<li><strong>Negation (¬p):</strong> "Not p" — reverses truth value. If p = "It is raining" (TRUE), then ¬p = "It is NOT raining" (FALSE). Think of it as flipping a switch. This is a unary operator — it operates on a single proposition.</li>
<li><strong>Conjunction (p ∧ q):</strong> "p AND q" — true <em>only</em> when <em>both</em> are true. Like two switches in series: both must be ON for current to flow. Example: "It is raining AND I have an umbrella" is true only if both parts are true.</li>
<li><strong>Disjunction (p ∨ q):</strong> "p OR q" — true when <em>at least one</em> is true. Like two switches in parallel: either switch can let current flow. Note: This is <strong>inclusive OR</strong> (true even when both are true), which differs from everyday "or".</li>
<li><strong>Implication (p → q):</strong> "If p then q" — false <em>only</em> when p is true and q is false. This is the trickiest connective. Think of it as a promise: "If it rains, I will carry an umbrella." The promise is broken (FALSE) only when it rains but you don't carry an umbrella. If it doesn't rain, the promise is <em>vacuously true</em> regardless of what you do. <strong>Exam trap:</strong> Remember — F→T is TRUE, F→F is TRUE!</li>
<li><strong>Biconditional (p ↔ q):</strong> "p if and only if q" — true when both have the <em>same</em> truth value (both TRUE or both FALSE). This means p and q are logically equivalent. Example: "You pass if and only if you score ≥ 40%".</li>
</ul>

<p><strong>How to build a truth table:</strong> For n propositions, you need 2<sup>n</sup> rows. List all possible combinations of T/F for each variable, then compute the connective column by column. A truth table for two variables (p, q) has 4 rows; for three variables (p, q, r) it has 8 rows. Always use this systematic approach on exams — it prevents errors.</p>

<div class="diagram-block">
Truth Table for Basic Connectives:
┌───┬───┬─────┬─────┬─────┬─────┬─────┐
│ p │ q │ p∧q │ p∨q │ p→q │ p↔q │ ¬p  │
├───┼───┼─────┼─────┼─────┼─────┼─────┤
│ T │ T │  T  │  T  │  T  │  T  │  F  │
│ T │ F │  F  │  T  │  F  │  F  │  F  │
│ F │ T │  F  │  T  │  T  │  F  │  T  │
│ F │ F │  F  │  F  │  T  │  T  │  T  │
└───┴───┴─────┴─────┴─────┴─────┴─────┘</div>

<h5>Important Logical Equivalences</h5>
<p>Two statements are <strong>logically equivalent</strong> (denoted ≡) if they have the same truth values in every possible case. These equivalences are vital for simplifying logical expressions during exams:</p>
<ul>
<li><strong>De Morgan's Laws:</strong> ¬(p ∧ q) ≡ ¬p ∨ ¬q; ¬(p ∨ q) ≡ ¬p ∧ ¬q. <em>"Break the line (negate the connective), change the sign (AND↔OR)."</em> These laws link conjunction and disjunction through negation. They are identical in form to De Morgan's laws for sets — memorize once, use everywhere.</li>
<li><strong>Contrapositive:</strong> p → q ≡ ¬q → ¬p. This is the ONLY equivalent form of an implication. <strong>Exam fact:</strong> The converse (q → p) and inverse (¬p → ¬q) are NOT equivalent to the original implication — only the contrapositive is.</li>
<li><strong>Tautology:</strong> A compound statement that is <em>always TRUE</em> regardless of the truth values of its components. Example: p ∨ ¬p (Law of Excluded Middle). If a truth table shows all T's in the final column, it's a tautology.</li>
<li><strong>Contradiction:</strong> A compound statement that is <em>always FALSE</em>. Example: p ∧ ¬p. All F's in the final column of its truth table.</li>
<li><strong>Contingency:</strong> Neither tautology nor contradiction — its truth value depends on the input. Most propositions you encounter are contingencies.</li>
</ul>

<h4>1.2 The Algebra of Propositions</h4>
<p>Propositional algebra follows rules very similar to ordinary algebra and Boolean algebra. These laws allow you to simplify complex expressions without building truth tables — crucial when expressions become large:</p>
<ul>
<li><strong>Commutative:</strong> p ∧ q ≡ q ∧ p; p ∨ q ≡ q ∨ p — the order doesn't matter, just like a + b = b + a in arithmetic.</li>
<li><strong>Associative:</strong> (p ∧ q) ∧ r ≡ p ∧ (q ∧ r) — grouping doesn't matter, so parentheses can be rearranged.</li>
<li><strong>Distributive:</strong> p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) — just like a × (b + c) = ab + ac. Also works the other way: p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r).</li>
<li><strong>Identity:</strong> p ∧ T ≡ p; p ∨ F ≡ p — T is the identity for AND, F is the identity for OR.</li>
<li><strong>Complement:</strong> p ∧ ¬p ≡ F; p ∨ ¬p ≡ T — a statement ANDed with its negation is always false; ORed is always true.</li>
<li><strong>Absorption:</strong> p ∧ (p ∨ q) ≡ p; p ∨ (p ∧ q) ≡ p — the bigger expression absorbs back into p.</li>
</ul>

<h4>1.3 Logical Arguments</h4>
<p>An <strong>argument</strong> consists of premises (given statements) and a conclusion. An argument is <strong>valid</strong> if whenever all premises are true, the conclusion must also be true. Here are the most important argument forms you must know:</p>
<ul>
<li><strong>Modus Ponens:</strong> p → q, p ⊢ q — "If it rains, the ground is wet. It rains. Therefore, the ground is wet." This is the most natural and commonly used rule of inference.</li>
<li><strong>Modus Tollens:</strong> p → q, ¬q ⊢ ¬p — "If it rains, the ground is wet. The ground is NOT wet. Therefore, it did NOT rain." This is the contrapositive applied as a rule of inference.</li>
<li><strong>Hypothetical Syllogism:</strong> p → q, q → r ⊢ p → r — "If A then B, and if B then C, therefore if A then C." A chain of implications.</li>
<li><strong>Disjunctive Syllogism:</strong> p ∨ q, ¬p ⊢ q — "Either A or B. Not A. Therefore B." If one option is eliminated, the other must hold.</li>
</ul>
<p><strong>Exam approach:</strong> To check validity, assume all premises are true and see if the conclusion must follow. If you can find any case where all premises are true but the conclusion is false, the argument is INVALID.</p>

<h4>1.4 Sets & Operations on Sets</h4>
<p>A <strong>set</strong> is a well-defined collection of distinct objects called elements or members. Sets are typically denoted by capital letters (A, B, C) and elements by lowercase letters. The concept of "well-defined" means there must be a clear rule to determine whether an object belongs to the set or not.</p>

<p><strong>Representation:</strong> Roster form lists elements: A = {1, 2, 3}. Set-builder form describes a rule: A = {x | x is a natural number and x < 4}. Both represent the same set.</p>

<p><strong>Special sets:</strong> ∅ (empty set — contains no elements), ℕ (natural numbers), ℤ (integers), ℝ (real numbers), U (universal set — contains all elements under consideration).</p>

<p>The key operations on sets are:</p>
<ul>
<li><strong>Union (A ∪ B):</strong> Elements in A <em>or</em> B <em>or both</em>. This is the "everything together" operation. |A ∪ B| = |A| + |B| - |A ∩ B| (Inclusion-Exclusion for two sets).</li>
<li><strong>Intersection (A ∩ B):</strong> Elements in <em>both</em> A <em>and</em> B. Only what's common to both sets. If A ∩ B = ∅, the sets are called <strong>disjoint</strong>.</li>
<li><strong>Difference (A - B):</strong> Elements in A <em>but not</em> in B. Also written A \ B. Note: A - B ≠ B - A in general.</li>
<li><strong>Complement (A'):</strong> Elements <em>not</em> in A (relative to the universal set U). A' = U - A. Key identity: (A')' = A (double complement restores the original).</li>
<li><strong>Symmetric Difference (A △ B):</strong> Elements in A or B but NOT both. A △ B = (A - B) ∪ (B - A). Think of it as "exclusive OR" for sets.</li>
<li><strong>Power Set P(A):</strong> The set of <em>all subsets</em> of A, including ∅ and A itself. If |A| = n, then |P(A)| = 2<sup>n</sup>. Example: A = {1, 2} → P(A) = {∅, {1}, {2}, {1,2}} with 2² = 4 elements.</li>
<li><strong>Cartesian Product (A × B):</strong> Set of all <em>ordered pairs</em> (a, b) where a ∈ A and b ∈ B. |A × B| = |A| × |B|. Example: A = {1,2}, B = {x,y} → A × B = {(1,x), (1,y), (2,x), (2,y)}.</li>
</ul>

<div class="diagram-block">
Venn Diagram - Set Operations:

    A ∪ B              A ∩ B             A - B
  ┌─────────┐      ┌─────────┐      ┌─────────┐
  │ ╔═══╦═══╗│      │ ╔═══╦═══╗│      │ ╔═══╦═══╗│
  │ ║███║███║│      │ ║   ║███║│      │ ║███║   ║│
  │ ║███║███║│      │ ║   ║███║│      │ ║███║   ║│
  │ ╚═══╩═══╝│      │ ╚═══╩═══╝│      │ ╚═══╩═══╝│
  └─────────┘      └─────────┘      └─────────┘
  (All shaded)     (Overlap only)    (Left only)</div>

<h4>1.5 Binary Relations</h4>
<p>A <strong>relation R</strong> from set A to set B is a subset of the Cartesian product A × B. When A = B, we say R is a relation <em>on</em> A. In simple terms, a relation defines how elements from one set are connected to elements of another.</p>

<p>Example: Let A = {1, 2, 3}. The relation "less than" on A is R = {(1,2), (1,3), (2,3)}.</p>

<p>A relation on set A can have the following properties (very important for exams — you'll be asked to identify which properties hold):</p>
<ul>
<li><strong>Reflexive:</strong> (a, a) ∈ R for <em>every</em> a ∈ A. Every element is related to itself. Example: "≤" is reflexive because a ≤ a for all a. The relation matrix has all 1s on the diagonal. <strong>Check:</strong> Is every element paired with itself?</li>
<li><strong>Symmetric:</strong> (a, b) ∈ R ⟹ (b, a) ∈ R. If a is related to b, then b is related to a. Example: "is a sibling of" is symmetric. The relation matrix is symmetric about the diagonal. <strong>Check:</strong> Whenever (a,b) appears, does (b,a) also appear?</li>
<li><strong>Transitive:</strong> (a, b) ∈ R and (b, c) ∈ R ⟹ (a, c) ∈ R. If a is related to b and b is related to c, then a is related to c. Example: "≤" is transitive (if a ≤ b and b ≤ c, then a ≤ c). <strong>Check:</strong> Follow chains of two links — does the shortcut always exist?</li>
<li><strong>Antisymmetric:</strong> (a, b) ∈ R and (b, a) ∈ R ⟹ a = b. The only way both directions exist is if they're the same element. Example: "≤" is antisymmetric (a ≤ b and b ≤ a implies a = b). Note: Antisymmetric is NOT the opposite of symmetric — a relation can be both symmetric and antisymmetric (e.g., equality).</li>
<li><strong>Equivalence Relation:</strong> A relation that is <strong>Reflexive + Symmetric + Transitive</strong>. It partitions the set into disjoint equivalence classes. Example: "has the same remainder when divided by 3" is an equivalence relation on integers, creating three classes: {…,-3,0,3,6,…}, {…,-2,1,4,7,…}, {…,-1,2,5,8,…}.</li>
</ul>

<p><strong>Counting relations:</strong> On a set of n elements, total possible relations = 2<sup>n²</sup>, reflexive relations = 2<sup>n²-n</sup>, symmetric relations = 2<sup>n(n+1)/2</sup>.</p>

<h4>1.6 Partial Orders</h4>
<p>A relation R on set A is a <strong>partial order</strong> if it is <strong>Reflexive, Antisymmetric, and Transitive</strong> (remember: RAT). The pair (A, R) is called a <strong>poset</strong> (partially ordered set). "Partial" means not every pair of elements needs to be comparable.</p>

<p>Example: (ℕ, ≤) is a poset. Also, ({1,2,3,6,12}, divides) is a poset where the ordering is divisibility.</p>
<ul>
<li><strong>Hasse Diagram:</strong> A simplified visual representation of a poset. You draw it by removing all reflexive loops (every element relates to itself — obvious), removing transitive edges (if a≤b and b≤c, don't draw a→c directly), and then drawing the remaining edges bottom-up without arrows (direction is implied as upward). <strong>Exam tip:</strong> Start with the smallest elements at the bottom.</li>
<li><strong>Maximal element:</strong> No element is above it in the Hasse diagram (nothing greater exists in the relation).</li>
<li><strong>Minimal element:</strong> No element is below it (nothing smaller exists).</li>
<li><strong>Greatest element:</strong> Related to (greater than or equal to) EVERY element. May not exist.</li>
<li><strong>Least element:</strong> Every element is related to it (it's less than or equal to everything). May not exist.</li>
<li><strong>LUB (Least Upper Bound / Supremum):</strong> For elements a, b — the smallest element that is ≥ both a and b.</li>
<li><strong>GLB (Greatest Lower Bound / Infimum):</strong> For elements a, b — the largest element that is ≤ both a and b.</li>
<li><strong>Lattice:</strong> A poset where every pair of elements has both a LUB and GLB. If every pair is comparable, it's a <strong>total order</strong> (or chain).</li>
</ul>

<h4>1.7 Mathematical Induction</h4>
<p><strong>Mathematical induction</strong> is a proof technique used to prove statements about all natural numbers n ≥ n₀ (usually n₀ = 1 or 0). Think of it like a chain of dominoes: if you knock down the first one (base case), and each domino is set to knock down the next (inductive step), then ALL dominoes will fall.</p>
<ol>
<li><strong>Base Case:</strong> Prove the statement is true for the smallest value n = n₀. This is your "first domino." You simply plug in the starting value and verify both sides (LHS and RHS) are equal.</li>
<li><strong>Inductive Hypothesis:</strong> <em>Assume</em> the statement is true for some arbitrary n = k. This is not proving anything — you're temporarily accepting this as given. Write: "Assume P(k) is true, i.e., [write the statement with k]."</li>
<li><strong>Inductive Step:</strong> Using the assumption from step 2, <em>prove</em> the statement is true for n = k + 1. This is where the actual work happens. Start with what you need to prove (LHS for k+1), then use the hypothesis to simplify until you reach the expected RHS for k+1.</li>
</ol>
<p><strong>Exam strategy:</strong> Clearly label each step. Write "Base case (n=1): LHS = ..., RHS = ..., LHS = RHS ✓". Then "Assume true for n = k: [statement]". Then "Prove for n = k+1: [show work]". End with "By mathematical induction, P(n) is true for all n ≥ n₀. ∎"</p>

<p><strong>Strong Induction:</strong> Instead of assuming P(k), you assume P(n₀), P(n₀+1), ..., P(k) are all true, and prove P(k+1). Useful when the k+1 case depends on values earlier than k (e.g., Fibonacci-type proofs).</p>

<h4>1.8 Principle of Inclusion-Exclusion</h4>
<p>This principle gives the exact count of elements in the union of overlapping sets. It corrects for overcounting by alternately adding and subtracting intersection sizes:</p>
<div class="formula-box">|A ∪ B| = |A| + |B| - |A ∩ B|
|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |B∩C| - |A∩C| + |A∩B∩C|
General: |A₁ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ∩Aⱼ| + Σ|Aᵢ∩Aⱼ∩Aₖ| - ... + (-1)ⁿ⁺¹|A₁∩...∩Aₙ|</div>
<p><strong>Why subtract intersections?</strong> When you add |A| + |B|, elements in A ∩ B are counted twice. Subtracting |A ∩ B| corrects this. For three sets, after subtracting pairwise intersections, elements in all three sets get subtracted one too many times, so you add |A∩B∩C| back.</p>

<p><strong>Common exam application:</strong> "In a class of 100, 60 like Cricket, 50 like Football, 20 like both. How many like at least one?" Answer: 60 + 50 - 20 = 90. Neither = 100 - 90 = 10.</p>

<h4>1.9 Probability Theory</h4>
<p>Probability quantifies the likelihood of an event occurring. It's essential for real-world computing (AI, machine learning, network reliability) and is a high-scoring exam topic since most questions are plug-and-solve.</p>

<h5>Sample Spaces & Events</h5>
<p>An <strong>experiment</strong> is any process with an uncertain outcome. The <strong>sample space (S)</strong> is the set of all possible outcomes. An <strong>event</strong> is a subset of the sample space — it's what we're interested in.</p>
<ul>
<li><strong>P(E) = |E| / |S|</strong> (for equally likely outcomes). Example: Rolling a fair die, P(even) = |{2,4,6}| / |{1,2,3,4,5,6}| = 3/6 = 1/2.</li>
<li>0 ≤ P(E) ≤ 1 for any event. P(S) = 1 (something always happens). P(∅) = 0 (impossible event).</li>
</ul>

<h5>Discrete Probability</h5>
<p>Rules for combining event probabilities:</p>
<ul>
<li><strong>Union (Addition Rule):</strong> P(A ∪ B) = P(A) + P(B) - P(A ∩ B). This is Inclusion-Exclusion for probabilities. The subtraction avoids double-counting the overlap.</li>
<li><strong>Complement:</strong> P(A') = 1 - P(A). Often easier to calculate "not A" than A directly. Example: P(at least one head in 3 flips) = 1 - P(no heads) = 1 - (1/2)³ = 7/8.</li>
<li><strong>Intersection (Independent Events):</strong> P(A ∩ B) = P(A) × P(B) <em>only if A and B are independent</em>. Two events are independent if one happening doesn't affect the other's probability. Example: Two separate coin flips.</li>
<li><strong>Mutually Exclusive:</strong> Events that cannot happen simultaneously. P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B). Example: Rolling a 2 and rolling a 5 on the same roll.</li>
</ul>

<h5>Conditional Probability</h5>
<p><strong>Conditional probability</strong> is the probability of A occurring <em>given that B has already occurred</em>. It restricts the sample space to only outcomes where B is true.</p>
<div class="formula-box">P(A|B) = P(A ∩ B) / P(B), where P(B) > 0</div>
<p>Example: A card is drawn from a deck. Given that it's red (26 red cards), what's the probability it's a heart? P(Heart|Red) = P(Heart ∩ Red) / P(Red) = (13/52) / (26/52) = 1/2.</p>

<p>From this formula, we derive the <strong>Multiplication Rule:</strong> P(A ∩ B) = P(A|B) × P(B) = P(B|A) × P(A). This is very useful when events are dependent (drawing without replacement, for example).</p>

<h5>Bayes' Theorem</h5>
<p><strong>Bayes' Theorem</strong> lets you "reverse" conditional probabilities. Given P(B|A) and P(A), you can find P(A|B). It's fundamental to machine learning, medical diagnosis, spam filtering, and many computer science applications.</p>
<div class="formula-box">P(Aᵢ|B) = P(B|Aᵢ) × P(Aᵢ) / Σ[P(B|Aⱼ) × P(Aⱼ)]

Where A₁, A₂, ..., Aₙ are mutually exclusive and exhaustive events.
In words: Posterior = (Likelihood × Prior) / Evidence</div>
<p><strong>Exam approach:</strong> Always draw a tree diagram. Put prior probabilities (P(Aᵢ)) on the first branches, and likelihoods (P(B|Aᵢ)) on the second branches. Multiply along each path. The denominator is the sum of all paths leading to B (total probability of B).</p>

<h4>1.10 Correlation & Regression</h4>
<p>These statistical tools measure and model the relationship between two or more variables. Correlation tells you <em>how strong</em> the relationship is. Regression gives you the <em>equation</em> of the relationship.</p>

<h5>Linear Correlation Coefficient (r)</h5>
<p>The <strong>Pearson correlation coefficient r</strong> measures the strength and direction of the <em>linear</em> relationship between two variables x and y:</p>
<div class="formula-box">r = [nΣxy - (Σx)(Σy)] / √{[nΣx² - (Σx)²][nΣy² - (Σy)²]}

Range: -1 ≤ r ≤ 1
r = +1: Perfect positive correlation (as x↑, y↑ perfectly)
r = -1: Perfect negative correlation (as x↑, y↓ perfectly)
r = 0: No linear correlation (no linear pattern)
|r| > 0.7: Strong correlation
0.4 < |r| < 0.7: Moderate correlation
|r| < 0.4: Weak correlation</div>
<p><strong>Exam tip:</strong> Prepare a table with columns for x, y, x², y², xy. Sum each column, then plug into the formula. Be careful with (Σx)² (square of the sum) vs Σx² (sum of squares) — these are DIFFERENT and mixing them up is the most common error.</p>

<h5>Linear Regression</h5>
<p><strong>Regression</strong> goes beyond correlation — it gives you the actual equation of the best-fit line (line of least squares). This line minimizes the sum of squared vertical distances from each data point to the line.</p>
<div class="formula-box">Line of regression of y on x: y = a + bx
where b = [nΣxy - (Σx)(Σy)] / [nΣx² - (Σx)²]   (slope — same numerator as r)
      a = ȳ - bx̄                                    (intercept — passes through (x̄, ȳ))

Line of regression of x on y: x = c + dy
where d = [nΣxy - (Σx)(Σy)] / [nΣy² - (Σy)²]</div>
<p><strong>Key insight:</strong> There are TWO regression lines. The "y on x" line predicts y given x (minimizes vertical errors). The "x on y" line predicts x given y (minimizes horizontal errors). They pass through (x̄, ȳ) and are different unless r = ±1 (perfect correlation).</p>

<h5>Non-Linear Regression</h5>
<p>When data doesn't fit a straight line, we use curve fitting. The strategy is to <strong>transform</strong> the equation into a linear form and apply linear regression:</p>
<ul>
<li><strong>Polynomial:</strong> y = a + bx + cx² — add a column for x² and use multiple regression</li>
<li><strong>Exponential:</strong> y = ae<sup>bx</sup> → take log: ln y = ln a + bx — now linear in (x, ln y)</li>
<li><strong>Power:</strong> y = ax<sup>b</sup> → take log: log y = log a + b·log x — linear in (log x, log y)</li>
</ul>

<h5>Multiple Correlation & Regression</h5>
<p>Extension to multiple independent variables: y = a + b₁x₁ + b₂x₂ + ... + bₙxₙ. Used when the outcome depends on several factors simultaneously.</p>
<p>The <strong>multiple correlation coefficient R</strong> (capital R) measures the strength of the relationship between one dependent variable and multiple independent variables. R² (coefficient of determination) tells you what percentage of the variation in y is explained by the independent variables. R² = 0.85 means 85% of variation in y is explained by the model.</p>

<h4>1.11 Theory of Sampling & Population</h4>
<p>In statistics, we often can't study every individual in a group. Instead, we study a <strong>sample</strong> (a subset) and draw conclusions about the whole <strong>population</strong>. Understanding sampling theory is crucial for valid statistical inference.</p>
<ul>
<li><strong>Population:</strong> The complete set of items under study — could be finite (all students in a school) or infinite (all possible coin flips). Parameters (μ = population mean, σ = population standard deviation) describe the population.</li>
<li><strong>Sample:</strong> A subset selected from the population. Statistics (x̄ = sample mean, s = sample standard deviation) describe the sample. The goal is for statistics to <em>estimate</em> parameters.</li>
<li><strong>Parameter vs Statistic:</strong> Parameter is a fixed (but usually unknown) characteristic of the population. Statistic is computed from sample data and varies from sample to sample.</li>
<li><strong>Sampling Distribution:</strong> If you take many samples and compute a statistic (e.g., mean) for each, the distribution of those statistics is the <em>sampling distribution</em>. Its spread is measured by standard error.</li>
<li><strong>Standard Error:</strong> SE = σ/√n. This measures how much the sample mean is expected to vary from sample to sample. Larger sample → smaller SE → more precise estimate. <strong>Key relationship:</strong> SE decreases proportionally to √n, so quadrupling sample size halves the SE.</li>
<li><strong>Central Limit Theorem (CLT):</strong> For sufficiently large n (typically n ≥ 30), the sampling distribution of the mean (x̄) is approximately <em>normally distributed</em>, regardless of the population's distribution. This is arguably the most important theorem in statistics — it justifies using normal distribution methods in most practical situations.</li>
<li><strong>Types of Sampling:</strong>
  <ul>
  <li><strong>Simple Random:</strong> Every member has equal chance of selection. Gold standard but may be impractical.</li>
  <li><strong>Stratified:</strong> Divide population into subgroups (strata), then random sample from each. Ensures representation of all subgroups.</li>
  <li><strong>Systematic:</strong> Select every k-th element from a list (e.g., every 10th student).</li>
  <li><strong>Cluster:</strong> Divide into clusters (natural groupings like schools or cities), randomly select some clusters, then study everyone within the chosen clusters.</li>
  </ul>
</li>
</ul>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">PROPOSITIONAL LOGIC:
• De Morgan: ¬(p∧q) ≡ ¬p∨¬q | ¬(p∨q) ≡ ¬p∧¬q
• Contrapositive: p→q ≡ ¬q→¬p
• Implication: p→q ≡ ¬p∨q</div>

<div class="formula-box">SET THEORY:
• |A∪B| = |A| + |B| - |A∩B|
• |P(A)| = 2^|A|   (Power set)
• |A×B| = |A|·|B|  (Cartesian product)
• (A')' = A  |  (A∪B)' = A'∩B'  |  (A∩B)' = A'∪B'</div>

<div class="formula-box">RELATIONS:
• Equivalence = Reflexive + Symmetric + Transitive
• Partial Order = Reflexive + Antisymmetric + Transitive
• Total Relations on set of n elements = 2^(n²)
• Reflexive relations = 2^(n²-n)</div>

<div class="formula-box">PROBABILITY:
• P(A∪B) = P(A) + P(B) - P(A∩B)
• P(A|B) = P(A∩B)/P(B)
• Bayes': P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ) / ΣP(B|Aⱼ)P(Aⱼ)
• Independent: P(A∩B) = P(A)·P(B)</div>

<div class="formula-box">STATISTICS:
• Mean: x̄ = Σx/n
• Variance: σ² = Σ(x-x̄)²/n
• Std Dev: σ = √(σ²)
• Correlation: r = [nΣxy-(Σx)(Σy)] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}
• Regression: b = [nΣxy-(Σx)(Σy)] / [nΣx²-(Σx)²]
• Standard Error: SE = σ/√n</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
HASSE DIAGRAM - Divisibility on {1,2,3,4,6,12}:

            12
           / \\
          6   4
         / \\ |
        3   2
         \\ /
          1

(Read bottom-up: 1 divides 2,3; 
 2 divides 4,6; 3 divides 6; 
 4,6 divide 12)</div>

<div class="diagram-block">
MATHEMATICAL INDUCTION - Process Flow:

┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  BASE CASE   │────▶│ ASSUME P(k) TRUE │────▶│ PROVE P(k+1)     │
│  Prove P(n₀) │     │ (Inductive Hyp.) │     │ USING P(k)       │
└──────────────┘     └──────────────────┘     └──────────────────┘
       │                                              │
       ▼                                              ▼
  P(n₀) ✓                                    P(n) true ∀n≥n₀</div>

<div class="diagram-block">
BAYES' THEOREM - Tree Diagram:

                    P(B|A₁)  →  P(A₁∩B)
          P(A₁) ──┤
         /         P(B'|A₁) →  P(A₁∩B')
Sample ─┤
         \\         P(B|A₂)  →  P(A₂∩B)
          P(A₂) ──┤
                    P(B'|A₂) →  P(A₂∩B')

P(A₁|B) = P(A₁∩B) / [P(A₁∩B) + P(A₂∩B)]</div>
`,

    examples: [
        {
            title: "Truth Table Verification",
            question: "Verify that p → q ≡ ¬p ∨ q using a truth table.",
            solution: "Build truth table:\np=T, q=T: p→q = T, ¬p∨q = F∨T = T ✓\np=T, q=F: p→q = F, ¬p∨q = F∨F = F ✓\np=F, q=T: p→q = T, ¬p∨q = T∨T = T ✓\np=F, q=F: p→q = T, ¬p∨q = T∨F = T ✓\nAll rows match, so p → q ≡ ¬p ∨ q. ∎"
        },
        {
            title: "Set Operations",
            question: "If A = {1,2,3,4,5}, B = {3,4,5,6,7}, find A∪B, A∩B, A-B, A△B.",
            solution: "A∪B = {1,2,3,4,5,6,7} (all elements)\nA∩B = {3,4,5} (common elements)\nA-B = {1,2} (in A not in B)\nA△B = (A-B)∪(B-A) = {1,2}∪{6,7} = {1,2,6,7}"
        },
        {
            title: "Power Set",
            question: "Find |P(A)| if A = {a, b, c}.",
            solution: "|A| = 3\n|P(A)| = 2³ = 8\nP(A) = {∅, {a}, {b}, {c}, {a,b}, {a,c}, {b,c}, {a,b,c}}"
        },
        {
            title: "Inclusion-Exclusion",
            question: "In a class of 100 students, 60 study Math, 50 study CS, 20 study both. How many study at least one?",
            solution: "|M∪C| = |M| + |C| - |M∩C|\n= 60 + 50 - 20 = 90 students\nStudents studying neither = 100 - 90 = 10"
        },
        {
            title: "Conditional Probability",
            question: "A bag has 5 red, 3 blue balls. Two balls are drawn without replacement. Find P(2nd is red | 1st is red).",
            solution: "After drawing 1st red ball: 4 red, 3 blue remain (7 total)\nP(2nd red | 1st red) = 4/7 ≈ 0.571"
        },
        {
            title: "Bayes' Theorem",
            question: "Factory A produces 40% items, B produces 60%. Defective rates: A=5%, B=3%. If a random item is defective, what is the probability it came from A?",
            solution: "P(A) = 0.4, P(B) = 0.6\nP(D|A) = 0.05, P(D|B) = 0.03\nP(D) = P(D|A)P(A) + P(D|B)P(B) = 0.05×0.4 + 0.03×0.6 = 0.02 + 0.018 = 0.038\nP(A|D) = P(D|A)P(A)/P(D) = 0.02/0.038 = 10/19 ≈ 0.526"
        },
        {
            title: "Mathematical Induction",
            question: "Prove: 1 + 2 + 3 + ... + n = n(n+1)/2",
            solution: "Base case (n=1): LHS = 1, RHS = 1(2)/2 = 1 ✓\nAssume true for n=k: 1+2+...+k = k(k+1)/2\nProve for n=k+1:\nLHS = 1+2+...+k+(k+1) = k(k+1)/2 + (k+1)\n= (k+1)[k/2 + 1] = (k+1)(k+2)/2\nRHS = (k+1)(k+2)/2 ✓\nBy induction, true for all n ≥ 1. ∎"
        },
        {
            title: "Correlation Coefficient",
            question: "Given: n=5, Σx=15, Σy=25, Σxy=86, Σx²=55, Σy²=135. Find r.",
            solution: "r = [nΣxy - (Σx)(Σy)] / √{[nΣx²-(Σx)²][nΣy²-(Σy)²]}\n= [5(86)-(15)(25)] / √{[5(55)-225][5(135)-625]}\n= [430-375] / √{[275-225][675-625]}\n= 55 / √{50 × 50}\n= 55 / 50 = 1.1\nSince r cannot exceed 1, recheck data. If r≈0.98, strong positive correlation."
        },
        {
            title: "Regression Line",
            question: "Find the regression line of y on x given: x̄=3, ȳ=5, b=1.5",
            solution: "Regression line: y - ȳ = b(x - x̄)\ny - 5 = 1.5(x - 3)\ny = 1.5x - 4.5 + 5\ny = 1.5x + 0.5"
        },
        {
            title: "Relation Properties",
            question: "Is R = {(1,1),(2,2),(3,3),(1,2),(2,1)} on A={1,2,3} an equivalence relation?",
            solution: "Reflexive: (1,1),(2,2),(3,3) ∈ R ✓\nSymmetric: (1,2)∈R and (2,1)∈R ✓\nTransitive: (1,2)∈R,(2,1)∈R → (1,1)∈R ✓; (2,1)∈R,(1,2)∈R → (2,2)∈R ✓\nAll conditions met → YES, it is an equivalence relation."
        }
    ],

    practiceQuestions: [
        {question: "Construct a truth table for (p → q) ∧ (q → r) → (p → r) and determine if it is a tautology.", answer: "Yes, it is a tautology. For all 8 combinations of p, q, r (T/F), the expression always evaluates to TRUE. This is the Hypothetical Syllogism — if p implies q and q implies r, then p implies r."},
        {question: "Prove De Morgan's Law ¬(p ∧ q) ≡ ¬p ∨ ¬q using a truth table.", answer: "Build columns for p, q, p∧q, ¬(p∧q), ¬p, ¬q, ¬p∨¬q. All 4 rows show ¬(p∧q) = ¬p∨¬q:\nT,T: ¬(T)=F, F∨F=F ✓\nT,F: ¬(F)=T, F∨T=T ✓\nF,T: ¬(F)=T, T∨F=T ✓\nF,F: ¬(F)=T, T∨T=T ✓"},
        {question: "If A = {1,2,3,...,10}, B = {2,4,6,8,10}, C = {1,3,5,7,9}, find A-(B∩C), (A∪B)∩C.", answer: "B∩C = ∅ (no common elements — B has evens, C has odds)\nA-(B∩C) = A-∅ = A = {1,2,3,...,10}\n(A∪B) = {1,2,...,10} (A already contains B)\n(A∪B)∩C = A∩C = {1,3,5,7,9}"},
        {question: "Define and give examples of reflexive, symmetric, transitive, and antisymmetric relations.", answer: "Reflexive: (a,a)∈R for all a. Example: ≤ on integers (a≤a).\nSymmetric: (a,b)∈R → (b,a)∈R. Example: 'is sibling of'.\nTransitive: (a,b)∈R ∧ (b,c)∈R → (a,c)∈R. Example: < on numbers.\nAntisymmetric: (a,b)∈R ∧ (b,a)∈R → a=b. Example: ≤ on integers."},
        {question: "Draw a Hasse diagram for the divisibility relation on the set {1,2,3,5,6,10,15,30}.", answer: "Top: 30 → connects down to 6, 10, 15\n6 → connects to 2, 3\n10 → connects to 2, 5\n15 → connects to 3, 5\n2, 3, 5 → all connect down to 1\nRemove transitive edges (e.g., 30→1 is implied)."},
        {question: "Prove by mathematical induction: 1² + 2² + 3² + ... + n² = n(n+1)(2n+1)/6.", answer: "Base: n=1: 1² = 1 = 1(2)(3)/6 = 1 ✓\nAssume: 1²+...+k² = k(k+1)(2k+1)/6\nProve k+1: Add (k+1)² to both sides:\n= k(k+1)(2k+1)/6 + (k+1)²\n= (k+1)[k(2k+1) + 6(k+1)] / 6\n= (k+1)(2k² + 7k + 6) / 6\n= (k+1)(k+2)(2k+3) / 6 ✓"},
        {question: "Using Inclusion-Exclusion, find numbers from 1 to 1000 divisible by 3, 5, or 7.", answer: "By 3: ⌊1000/3⌋ = 333\nBy 5: ⌊1000/5⌋ = 200\nBy 7: ⌊1000/7⌋ = 142\nBy 15: ⌊1000/15⌋ = 66\nBy 21: ⌊1000/21⌋ = 47\nBy 35: ⌊1000/35⌋ = 28\nBy 105: ⌊1000/105⌋ = 9\nAnswer = 333+200+142-66-47-28+9 = 543"},
        {question: "A box contains 4 defective and 6 non-defective items. If 3 items are drawn, find P(exactly 2 defective).", answer: "P(X=2) = C(4,2)×C(6,1) / C(10,3)\n= (6 × 6) / 120 = 36/120 = 3/10 = 0.3"},
        {question: "State and prove Bayes' theorem with a suitable example.", answer: "Bayes': P(A|B) = P(B|A)·P(A) / P(B)\nProof: P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A) → rearrange.\nExample: Disease test with 99% sensitivity, 1% prevalence, 5% false positive rate. P(Disease|Positive) = (0.99×0.01)/(0.99×0.01 + 0.05×0.99) ≈ 16.7%"},
        {question: "70% use Android, 40% use iPhone, 25% use both. P(neither)?", answer: "P(A∪I) = P(A) + P(I) - P(A∩I) = 0.70 + 0.40 - 0.25 = 0.85\nP(neither) = 1 - P(A∪I) = 1 - 0.85 = 0.15 = 15%"},
        {question: "Explain the difference between permutation and combination with examples.", answer: "Permutation (nPr): Order MATTERS. Arranging r items from n.\nnPr = n!/(n-r)!  Example: 3-digit lock from 0-9 = 10P3 = 720\n\nCombination (nCr): Order DOESN'T matter. Choosing r items from n.\nnCr = n!/[r!(n-r)!]  Example: Choose 3 from 10 people = C(10,3) = 120"},
        {question: "Calculate the correlation coefficient for: x = {1,2,3,4,5}, y = {2,4,5,4,5}.", answer: "n=5, Σx=15, Σy=20, Σxy=67, Σx²=55, Σy²=86\nr = [5(67)-(15)(20)] / √{[5(55)-225][5(86)-400]}\n= [335-300] / √{[275-225][430-400]}\n= 35 / √(50×30) = 35/√1500 = 35/38.73 ≈ 0.904\nStrong positive correlation."},
        {question: "Find regression equation: n=6, Σx=21, Σy=18, Σx²=91, Σxy=67.", answer: "b = (nΣxy - ΣxΣy)/(nΣx² - (Σx)²)\n= (6×67 - 21×18)/(6×91 - 441)\n= (402-378)/(546-441) = 24/105 = 0.2286\nx̄ = 21/6 = 3.5, ȳ = 18/6 = 3\na = ȳ - bx̄ = 3 - 0.2286(3.5) = 3 - 0.8 = 2.2\ny = 2.2 + 0.229x"},
        {question: "Distinguish between linear and non-linear regression with examples.", answer: "Linear: y = a + bx (straight line). Example: salary vs years of experience.\nNon-linear types:\n• Polynomial: y = a + bx + cx² (curved)\n• Exponential: y = ae^(bx) (growth/decay)\n• Power: y = ax^b (scaling)\n• Logarithmic: y = a + b·ln(x)\nNon-linear is used when data doesn't follow a straight-line pattern."},
        {question: "What is multiple regression? Write the general equation and explain R².", answer: "Multiple regression models the relationship between one dependent variable and two or more independent variables.\nGeneral equation: y = a + b₁x₁ + b₂x₂ + ... + bₙxₙ\nR² (coefficient of determination): proportion of variance in y explained by the model. R²=0.85 means 85% of variance is explained. R² ranges from 0 to 1; higher is better."},
        {question: "Explain the Central Limit Theorem and its significance.", answer: "CLT states: Regardless of the population distribution, the distribution of sample means approaches a Normal distribution as sample size n increases (typically n≥30).\nMean of sample means = μ (population mean)\nStandard error = σ/√n\nSignificance: Allows us to use normal distribution methods even when the population isn't normal, making hypothesis testing and confidence intervals possible."},
        {question: "Compare population and sample. Why is sampling necessary?", answer: "Population: Entire group of interest (N). Parameter: μ, σ.\nSample: Subset selected from population (n). Statistic: x̄, s.\nSampling is necessary because:\n1. Studying entire population is often impractical/impossible\n2. Saves time and cost\n3. May be destructive (testing light bulb lifespan)\n4. Large populations make census infeasible"},
        {question: "What is a lattice? Is ({1,2,3,6}, divides) a lattice? Justify.", answer: "A lattice is a poset where every pair of elements has both a LUB (join/supremum) and GLB (meet/infimum).\nFor ({1,2,3,6}, |): Check all pairs:\n• LUB(2,3) = 6, GLB(2,3) = 1 ✓\n• LUB(1,6) = 6, GLB(1,6) = 1 ✓\n• LUB(2,6) = 6, GLB(2,6) = 2 ✓\n• LUB(3,6) = 6, GLB(3,6) = 3 ✓\nAll pairs have both LUB and GLB → YES, it is a lattice."},
        {question: "Verify: R on Z defined by aRb iff a-b is even — is it an equivalence relation?", answer: "Reflexive: a-a = 0 (even) ✓\nSymmetric: If a-b is even, then b-a = -(a-b) is also even ✓\nTransitive: If a-b is even and b-c is even, then a-c = (a-b)+(b-c) is sum of two even numbers = even ✓\nAll three properties satisfied → YES, equivalence relation.\nEquivalence classes: [0] = {even integers}, [1] = {odd integers}."},
        {question: "P(A)=0.6, P(B)=0.4, P(A|B)=0.5. Find P(A∩B), P(B|A), P(A∪B).", answer: "P(A∩B) = P(A|B)×P(B) = 0.5 × 0.4 = 0.2\nP(B|A) = P(A∩B)/P(A) = 0.2/0.6 = 1/3 ≈ 0.333\nP(A∪B) = P(A)+P(B)-P(A∩B) = 0.6+0.4-0.2 = 0.8"}
    ],

    examTips: [
        "Master truth tables — they are the easiest scoring area in this chapter",
        "Memorize De Morgan's Laws, they appear in both logic and set theory",
        "For Bayes' theorem problems, always draw a tree diagram first",
        "Practice correlation/regression calculations — they are formula-plug questions",
        "Know the properties of relations (RSTA) by heart with examples"
    ],

    commonMistakes: [
        "Confusing implication (p→q) — it is FALSE only when p is TRUE and q is FALSE",
        "Forgetting to subtract intersection in Inclusion-Exclusion",
        "Mixing up 'correlation coefficient' with 'regression coefficient'",
        "Not checking all three properties for equivalence relations",
        "Using replacement formulas when the problem says 'without replacement'"
    ],

    memoryTricks: [
        "RSTA for equivalence: Reflexive-Symmetric-Transitive = 'Real Students Think'",
        "Partial Order: RAT = Reflexive, Antisymmetric, Transitive",
        "De Morgan's: 'Break the line, change the sign' (AND↔OR, complement distributes)",
        "Bayes' = (Likelihood × Prior) / Evidence",
        "Correlation r: 'n-Sum-xy minus Sum-x-Sum-y' over square root of products"
    ]
};
