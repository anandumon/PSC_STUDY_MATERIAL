// Chapter 3: Data Structures & Programming in C
const CH3 = {
    id: 2,
    title: "Data Structures & Programming in C",
    icon: "🔗",
    marks: 12,
    color: "#10b981",
    topics: "Linked List, Stack, Queue, Hashing, Trees, Graphs, Sorting, C Programming fundamentals",

    overview: {
        importance: "Core computer science chapter with 12 marks. Data structures are foundational — expect algorithmic questions. C programming questions test practical coding knowledge. Very high ROI for preparation.",
        weightage: "12 out of 100 marks (12%)",
        focusAreas: [
            "Linked list operations & types",
            "Stack applications (infix to postfix)",
            "Tree traversals (inorder, preorder, postorder)",
            "Graph algorithms (Dijkstra, Prim, Kruskal)",
            "Sorting algorithm comparisons",
            "Pointers and dynamic memory in C"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>3.1 Linked Lists</h4>
<p>A <strong>linked list</strong> is a linear data structure where elements (nodes) are stored in non-contiguous memory locations, connected via pointers. Unlike arrays, linked lists don't require a pre-determined block of memory — each node is allocated individually and chained together. This makes them highly flexible for dynamic data.</p>

<p><strong>Why use linked lists over arrays?</strong> Arrays have O(n) insertion/deletion at arbitrary positions (because elements must shift), require contiguous memory, and have a fixed size. Linked lists allow O(1) insertion/deletion at the head, dynamic sizing, and don't need contiguous memory. However, arrays win on random access (O(1) vs O(n)) and cache locality.</p>

<h5>Types of Linked Lists</h5>
<ul>
<li><strong>Singly Linked List:</strong> Each node has two fields: <code>data</code> and a <code>next</code> pointer to the next node. The last node's next pointer is NULL. Traversal is only possible in one direction (head to tail). Most common and simplest type.</li>
<li><strong>Doubly Linked List:</strong> Each node has three fields: <code>prev</code>, <code>data</code>, and <code>next</code> pointers. Allows traversal in both directions. Insertion/deletion is easier (no need to track the previous node separately), but uses more memory per node.</li>
<li><strong>Circular Linked List:</strong> The last node's next pointer points back to the first node, forming a circle. No NULL at the end. Useful for round-robin scheduling, circular buffers. Can be singly or doubly linked.</li>
<li><strong>Circular Doubly Linked List:</strong> Combines circular and doubly linked features. Head's prev points to tail, tail's next points to head. Used in navigation systems (forward/backward with wrap-around).</li>
</ul>

<div class="diagram-block">
Singly Linked List:
┌──────┬──┐    ┌──────┬──┐    ┌──────┬──┐
│ Data │ ─┼──▶ │ Data │ ─┼──▶ │ Data │ ╳│
└──────┴──┘    └──────┴──┘    └──────┴──┘
  HEAD                           TAIL

Doubly Linked List:
     ┌──┬──────┬──┐    ┌──┬──────┬──┐
╳◀───┤  │ Data │  ├──▶◀┤  │ Data │  ├──▶╳
     └──┴──────┴──┘    └──┴──────┴──┘
     prev data next    prev data next</div>

<h5>Operations & Complexity</h5>
<p>For a singly linked list: <strong>Insert at head:</strong> O(1) — just create a new node and point it to the old head. <strong>Insert at tail:</strong> O(n) with just head pointer, O(1) with a tail pointer. <strong>Search:</strong> O(n) — must traverse from head. <strong>Delete by value:</strong> O(n) — must find the node, then adjust the previous node's pointer. <strong>Access by index:</strong> O(n) — no random access like arrays.</p>

<h4>3.2 Stack</h4>
<p>A <strong>stack</strong> is a <strong>LIFO (Last In, First Out)</strong> data structure — the most recently added element is the first one removed. Think of a stack of plates: you always add and remove from the top. This simple principle makes stacks incredibly powerful for many applications.</p>
<ul>
<li><strong>Push:</strong> Add element on top — O(1). Increment top pointer and place element.</li>
<li><strong>Pop:</strong> Remove and return top element — O(1). Return element at top and decrement pointer.</li>
<li><strong>Peek/Top:</strong> View the top element without removing it — O(1).</li>
<li><strong>isEmpty:</strong> Check if stack has no elements. <strong>isFull:</strong> Check if stack is at capacity (array-based).</li>
<li><strong>Overflow:</strong> Attempting push on a full stack (array implementation). <strong>Underflow:</strong> Attempting pop from an empty stack.</li>
</ul>

<h5>Applications</h5>
<p>Stacks appear everywhere in computer science:</p>
<ul>
<li><strong>Expression evaluation:</strong> Converting infix (A+B) to postfix (AB+) and evaluating postfix — the most commonly tested stack application.</li>
<li><strong>Function call management:</strong> The call stack stores return addresses, local variables, and parameters for nested function calls. Each function call pushes a "stack frame," and returning pops it.</li>
<li><strong>Undo operations:</strong> Each action is pushed onto a stack; undo pops the last action.</li>
<li><strong>Backtracking:</strong> In algorithms like maze solving and DFS, the stack keeps track of the path so far, allowing backtracking when a dead end is reached.</li>
<li><strong>Parenthesis matching:</strong> Push opening brackets, pop when closing bracket matches. If stack is empty at end and no mismatches, expression is balanced.</li>
</ul>

<h5>Infix to Postfix Conversion</h5>
<p>This algorithm uses a stack to convert standard mathematical notation (infix) to a form that's easy for computers to evaluate (postfix). The rules are:</p>
<p>Scan expression left to right: <strong>Operand → output directly.</strong> <strong>Operator → compare with stack top:</strong> pop higher or equal precedence operators to output, then push current operator. <strong>'(' → push.</strong> <strong>')' → pop and output until '(' is found</strong> (discard both parentheses). At end, pop all remaining operators to output.</p>
<p><strong>Operator precedence:</strong> ^ (highest) > * / > + - (lowest). Right-to-left associativity for ^, left-to-right for everything else.</p>

<h4>3.3 Queue</h4>
<p>A <strong>queue</strong> is a <strong>FIFO (First In, First Out)</strong> data structure — elements are added at the rear and removed from the front, just like a line at a ticket counter. The element that's been waiting the longest is served first.</p>
<ul>
<li><strong>Enqueue:</strong> Add element at the rear — O(1). Increment rear pointer and place element.</li>
<li><strong>Dequeue:</strong> Remove element from front — O(1). Return element at front and increment front pointer.</li>
<li><strong>Linear queue problem:</strong> After many enqueue/dequeue operations, the front moves forward, wasting space at the beginning of the array — even though those positions are empty, they can't be reused.</li>
<li><strong>Circular Queue:</strong> Solves the space wastage problem. The rear wraps around to the beginning: <code>rear = (rear+1) % size</code>. Full when <code>(rear+1) % size == front</code>. Empty when <code>front == rear</code>.</li>
<li><strong>Deque (Double-ended Queue):</strong> Allows insert and delete at <em>both</em> ends. Input-restricted deque: insert at one end, delete from both. Output-restricted deque: delete from one end, insert at both.</li>
</ul>

<p><strong>Applications:</strong> CPU scheduling (ready queue), BFS graph traversal, print job spooling, buffer management, handling requests in web servers.</p>

<h4>3.4 Priority Queues</h4>
<p>A <strong>priority queue</strong> is like a regular queue but each element has a <strong>priority</strong>, and the element with the highest priority is dequeued first, regardless of insertion order. If two elements have equal priority, they are served in FIFO order.</p>
<ul>
<li><strong>Implementation options:</strong>
  <ul>
  <li><strong>Unsorted array:</strong> Insert O(1), delete-min O(n) — simple but slow for deletion.</li>
  <li><strong>Sorted array:</strong> Insert O(n), delete-min O(1) — keeping sorted makes deletion easy but insertion slow.</li>
  <li><strong>Binary Heap (most efficient):</strong> Insert O(log n), delete-min O(log n), build O(n). The standard implementation.</li>
  </ul>
</li>
<li><strong>Min-Heap:</strong> Parent ≤ children — smallest element at root. Used when you always need the minimum (Dijkstra's algorithm, Huffman coding).</li>
<li><strong>Max-Heap:</strong> Parent ≥ children — largest element at root. Used in heap sort and when you need the maximum.</li>
<li><strong>Heap property maintenance:</strong> After insertion (add at end, "bubble up" by swapping with parent if violating heap property) and deletion (replace root with last element, "sift down" by swapping with smaller/larger child).</li>
</ul>

<h4>3.5 Hashing</h4>
<p><strong>Hashing</strong> provides O(1) average-case lookup, insertion, and deletion — the fastest possible for search operations. It works by converting the key into a table index using a <strong>hash function</strong>.</p>
<ul>
<li><strong>Hash Function:</strong> Maps a key to a table index. Most common: <code>h(k) = k mod m</code> where m is the table size (best when m is a prime not close to a power of 2). A good hash function distributes keys uniformly across the table.</li>
<li><strong>Collision:</strong> Occurs when two different keys hash to the same index. Collisions are inevitable (Pigeonhole Principle — if you have more keys than slots, collisions are guaranteed), so we need strategies to handle them.</li>
<li><strong>Collision Resolution Techniques:</strong>
    <ul>
    <li><strong>Chaining (Separate Chaining):</strong> Each table slot points to a linked list of all elements that hash to that index. Simple, handles high load well, but uses extra memory for pointers. Average search: O(1 + α) where α = load factor.</li>
    <li><strong>Open Addressing:</strong> All elements stored in the table itself. When a collision occurs, probe for the next empty slot:
      <ul>
      <li><strong>Linear Probing:</strong> Try index+1, index+2, ... Simple but causes <em>primary clustering</em> (long runs of occupied slots).</li>
      <li><strong>Quadratic Probing:</strong> Try index+1², index+2², ... Reduces clustering but may not find empty slot even if table isn't full.</li>
      <li><strong>Double Hashing:</strong> Use a second hash function: h(k,i) = (h₁(k) + i·h₂(k)) mod m. Best distribution, minimal clustering.</li>
      </ul>
    </li>
    </ul>
</li>
<li><strong>Load Factor:</strong> α = n/m (number of elements / table size). Performance degrades as α increases. For open addressing, α should stay below 0.7. For chaining, α can exceed 1.</li>
</ul>

<h4>3.6 Binary Trees</h4>
<p>A <strong>binary tree</strong> is a hierarchical data structure where each node has at most <strong>two children</strong>, called left child and right child. Trees are used to represent hierarchical relationships, enable efficient searching/sorting, and form the basis of many advanced data structures.</p>
<ul>
<li><strong>Terminology:</strong> Root (top node), Parent/Child relationships, Leaf (node with no children), Internal node (has at least one child), Depth (distance from root), Height (longest path from node to leaf).</li>
<li><strong>Full Binary Tree:</strong> Every node has <em>either 0 or 2 children</em> (never just 1). All internal nodes have exactly 2 children.</li>
<li><strong>Complete Binary Tree:</strong> All levels completely filled except possibly the last, which is filled <em>left to right</em>. This is the structure used for heaps. Efficiently stored in arrays.</li>
<li><strong>Perfect Binary Tree:</strong> All internal nodes have exactly 2 children AND all leaves are at the same depth. A perfect tree of height h has 2<sup>h+1</sup> - 1 nodes.</li>
<li><strong>BST (Binary Search Tree):</strong> For every node: all values in the <em>left subtree are less</em> than the node, all values in the <em>right subtree are greater</em>. This property enables O(log n) average-case search, insert, and delete. <strong>Key fact:</strong> An inorder traversal of a BST gives elements in sorted order.</li>
</ul>

<h4>3.7 Tree Traversals</h4>
<p>Traversal means visiting every node in a specific order. There are four main traversals — the first three are depth-first (use a stack/recursion), the last is breadth-first (uses a queue):</p>
<div class="diagram-block">
        1
       / \\
      2   3
     / \\   \\
    4   5   6

Inorder   (LNR): 4, 2, 5, 1, 3, 6   — Visit Left, then Node, then Right
Preorder  (NLR): 1, 2, 4, 5, 3, 6   — Visit Node, then Left, then Right
Postorder (LRN): 4, 5, 2, 6, 3, 1   — Visit Left, then Right, then Node
Level-order:     1, 2, 3, 4, 5, 6   — Visit level by level, left to right</div>
<p><strong>Memory trick for traversals:</strong> The name tells you where the <strong>N (Node)</strong> is visited: <strong>IN</strong>order = L<strong>N</strong>R (N in the middle), <strong>PRE</strong>order = <strong>N</strong>LR (N first), <strong>POST</strong>order = LR<strong>N</strong> (N last).</p>

<p><strong>Exam fact:</strong> Given inorder AND either preorder or postorder, you can uniquely reconstruct the binary tree. Preorder alone or postorder alone is NOT sufficient. In preorder, the first element is always the root. In postorder, the last element is always the root. Use this to split the inorder sequence into left and right subtrees.</p>

<h4>3.8 AVL Trees</h4>
<p>An <strong>AVL tree</strong> (Adelson-Velsky and Landis) is a <strong>self-balancing BST</strong> where the <strong>balance factor</strong> (height of left subtree - height of right subtree) is -1, 0, or 1 for <em>every</em> node. This guarantees O(log n) time for search, insert, and delete — even in the worst case (unlike regular BSTs which can degrade to O(n) if inputs are sorted).</p>
<ul>
<li><strong>When balance is violated</strong> (|balance factor| > 1 after an insertion or deletion), rotations are performed:
  <ul>
  <li><strong>LL Rotation (Right Rotate):</strong> Node is left-heavy and the left child is left-heavy. Single right rotation at the unbalanced node.</li>
  <li><strong>RR Rotation (Left Rotate):</strong> Node is right-heavy and the right child is right-heavy. Single left rotation.</li>
  <li><strong>LR Rotation:</strong> Node is left-heavy but the left child is right-heavy. First left rotate the child, then right rotate the node. (Double rotation)</li>
  <li><strong>RL Rotation:</strong> Node is right-heavy but the right child is left-heavy. First right rotate the child, then left rotate the node.</li>
  </ul>
</li>
<li><strong>Key insight:</strong> The rotation name indicates the <em>direction of imbalance</em>. LL = imbalance is on the Left-Left path. The fix is to rotate in the <em>opposite</em> direction at the critical node.</li>
<li>All operations (search, insert, delete): O(log n) guaranteed — this is the AVL tree's main advantage over a plain BST.</li>
</ul>

<h4>3.9 Graphs</h4>
<p>A <strong>graph</strong> G = (V, E) consists of a set of vertices (nodes) V and edges (connections) E. Graphs model relationships: cities and roads, computers in a network, web pages and links, social network connections. They are the most general data structure for representing relationships.</p>
<ul>
<li><strong>Directed vs Undirected:</strong> Directed graph (digraph) has edges with direction (A→B is different from B→A). Undirected graph has bidirectional edges.</li>
<li><strong>Weighted vs Unweighted:</strong> Weighted graph has a cost/weight on each edge. Unweighted treats all edges equally.</li>
<li><strong>Representation:</strong>
  <ul>
  <li><strong>Adjacency Matrix:</strong> V×V matrix where entry [i][j] = 1 (or weight) if edge exists. Space: O(V²). Good for dense graphs. O(1) edge lookup.</li>
  <li><strong>Adjacency List:</strong> Array of linked lists — each vertex has a list of its neighbors. Space: O(V+E). Good for sparse graphs (most real-world graphs). O(degree) edge lookup.</li>
  </ul>
</li>
<li><strong>BFS (Breadth-First Search):</strong> Explores level by level using a <strong>queue</strong>. Visits all neighbors before going deeper. Time: O(V+E). Finds shortest path in unweighted graphs. Used for level-order traversal, connected components, shortest path.</li>
<li><strong>DFS (Depth-First Search):</strong> Goes as deep as possible using a <strong>stack</strong> (or recursion). Backtracks when hitting a dead end. Time: O(V+E). Used for topological sorting, cycle detection, connected components, finding articulation points.</li>
</ul>

<h5>Shortest Path Algorithms</h5>
<ul>
<li><strong>Dijkstra's Algorithm:</strong> Finds shortest paths from a single source to all other vertices. Works only with <strong>non-negative weights</strong>. Uses a greedy approach with a min-priority queue. Time: O(V²) naive, O((V+E)log V) with binary heap. <strong>Exam favorite!</strong></li>
<li><strong>Bellman-Ford Algorithm:</strong> Also single source, but handles <strong>negative weights</strong> (can detect negative cycles). Relaxes all edges V-1 times. Time: O(VE). Slower than Dijkstra but more versatile.</li>
<li><strong>Floyd-Warshall Algorithm:</strong> Finds shortest paths between <strong>ALL pairs</strong> of vertices. Uses dynamic programming — three nested loops. Time: O(V³). Simple but only practical for small graphs.</li>
</ul>

<h5>Minimum Spanning Tree (MST)</h5>
<p>An MST is a subset of edges that connects all vertices with <strong>minimum total weight</strong> and <strong>no cycles</strong>. An MST always has exactly V-1 edges.</p>
<ul>
<li><strong>Prim's Algorithm:</strong> Greedy, <em>vertex-based</em>. Start from any vertex, repeatedly add the minimum-weight edge connecting the tree to a non-tree vertex. Like growing a tree from a seed. Time: O(V²) naive, O(E log V) with heap.</li>
<li><strong>Kruskal's Algorithm:</strong> Greedy, <em>edge-based</em>. Sort all edges by weight, then add each edge if it doesn't create a cycle (uses Union-Find data structure for efficient cycle detection). Time: O(E log E). Better for sparse graphs.</li>
</ul>

<h4>3.10 Sorting Algorithms</h4>
<p>Sorting is one of the most fundamental operations in computer science. Understanding the tradeoffs between different algorithms is critical for exams. The comparison table below is almost guaranteed to be tested:</p>
<table class="content-table">
<tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable</th></tr>
<tr><td>Bubble Sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr>
<tr><td>Selection Sort</td><td>O(n²)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>No</td></tr>
<tr><td>Insertion Sort</td><td>O(n)</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>Yes</td></tr>
<tr><td>Merge Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>Yes</td></tr>
<tr><td>Quick Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n)</td><td>No</td></tr>
<tr><td>Heap Sort</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>No</td></tr>
</table>

<p><strong>Key insights for exams:</strong></p>
<ul>
<li><strong>Bubble Sort:</strong> Repeatedly swaps adjacent elements if they're in wrong order. Simple but slow. Best case O(n) when already sorted (with optimization flag).</li>
<li><strong>Selection Sort:</strong> Finds the minimum element and places it at the beginning, then repeats for the remaining array. Always O(n²) — doesn't benefit from sorted input. Not stable.</li>
<li><strong>Insertion Sort:</strong> Builds sorted array one element at a time. Very efficient for <em>small or nearly sorted</em> data (O(n) best case). Used as the base case in hybrid algorithms like Timsort.</li>
<li><strong>Merge Sort:</strong> Divide-and-conquer. Split array in half, sort each half, merge sorted halves. <em>Always</em> O(n log n) — no worst case degradation. Requires O(n) extra space. Stable. Preferred for linked lists and external sorting.</li>
<li><strong>Quick Sort:</strong> Divide-and-conquer. Choose a pivot, partition array so elements less than pivot go left and greater go right. Average O(n log n) but O(n²) worst case (when pivot is always min/max — e.g., sorted input with first element as pivot). Use median-of-three or random pivot to avoid worst case. In practice, fastest comparison sort due to cache efficiency.</li>
<li><strong>Heap Sort:</strong> Build a max-heap, repeatedly extract the maximum. Always O(n log n), in-place O(1), but not stable. Good guaranteed performance without extra space.</li>
</ul>

<p><strong>Stability:</strong> A sorting algorithm is <strong>stable</strong> if equal elements maintain their original relative order. Stable sorts: Merge, Bubble, Insertion. Unstable: Quick, Heap, Selection.</p>

<p><strong>Lower bound:</strong> Any comparison-based sorting algorithm must make at least Ω(n log n) comparisons in the worst case. Non-comparison sorts like Counting Sort O(n+k), Radix Sort O(d(n+k)), and Bucket Sort can be faster but have constraints on input.</p>

<h4>3.11 Programming in C</h4>
<h5>Operators & Expressions</h5>
<p>C provides a rich set of operators. Understanding their precedence and associativity is crucial for exam output-prediction questions:</p>
<p><strong>Arithmetic:</strong> +, -, *, /, % (remainder). Integer division truncates: 7/2 = 3 (not 3.5). <strong>Relational:</strong> <, >, <=, >=, ==, !=. Return 1 (true) or 0 (false). <strong>Logical:</strong> && (AND), || (OR), ! (NOT). Short-circuit evaluation: in A && B, if A is false, B is never evaluated. <strong>Bitwise:</strong> & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift). Operate on individual bits. <strong>Assignment:</strong> =, +=, -=, *=, /=, etc. <strong>Ternary:</strong> condition ? value_if_true : value_if_false. <strong>sizeof:</strong> Returns size in bytes. <strong>Comma:</strong> Evaluates left to right, returns rightmost value.</p>

<h5>Control Statements</h5>
<p>C offers three categories of control flow statements:</p>
<ul>
<li><strong>Selection:</strong> <code>if</code>, <code>if-else</code>, <code>switch-case</code> (uses break to prevent fall-through). Switch only works with integral types (int, char).</li>
<li><strong>Iteration:</strong> <code>for</code> (known iterations), <code>while</code> (test before execution), <code>do-while</code> (test after execution — guarantees at least one iteration).</li>
<li><strong>Jump:</strong> <code>break</code> (exit loop/switch), <code>continue</code> (skip rest of current iteration), <code>goto</code> (unconditional jump — avoid in structured programming), <code>return</code> (exit function with value).</li>
</ul>

<h5>Storage Classes</h5>
<p>Storage classes determine the scope (visibility), lifetime (how long the variable exists), and default value of variables:</p>
<table class="content-table">
<tr><th>Class</th><th>Scope</th><th>Lifetime</th><th>Default</th></tr>
<tr><td>auto</td><td>Local (within block)</td><td>Function execution</td><td>Garbage (uninitialized)</td></tr>
<tr><td>register</td><td>Local</td><td>Function execution</td><td>Garbage</td></tr>
<tr><td>static</td><td>Local (but retains value)</td><td>Entire program</td><td>0</td></tr>
<tr><td>extern</td><td>Global (across files)</td><td>Entire program</td><td>0</td></tr>
</table>
<p><strong>Key distinction:</strong> A <code>static</code> local variable retains its value between function calls — it's initialized only once. <code>register</code> suggests storing in a CPU register for faster access, but the compiler may ignore the hint. <code>extern</code> declares a variable defined in another file.</p>

<h5>Pointers & Dynamic Memory</h5>
<p><strong>Pointers</strong> are variables that store memory addresses. They are the most powerful — and most dangerous — feature of C. Mastering pointers is essential for PSC exams, as many output-prediction questions involve pointer arithmetic.</p>
<ul>
<li><strong>Declaration:</strong> <code>int *p;</code> means p is a pointer to an integer. p stores the ADDRESS of an int variable.</li>
<li><strong>Dereference:</strong> <code>*p</code> accesses the VALUE at the address stored in p. <code>&x</code> gives the ADDRESS of variable x.</li>
<li><strong>Pointer arithmetic:</strong> p+1 doesn't add 1 byte — it advances by sizeof(*p) bytes. So if p is int* (4 bytes), p+1 moves 4 bytes forward. This is why array indexing works: arr[i] ≡ *(arr+i).</li>
<li><strong>malloc:</strong> Allocates a block of memory on the heap. Returns void* (must cast). Memory is NOT initialized. <code>ptr = (int*)malloc(n * sizeof(int));</code></li>
<li><strong>calloc:</strong> Like malloc but <strong>initializes all bytes to 0</strong> and takes two arguments (number of elements, size of each). <code>ptr = (int*)calloc(n, sizeof(int));</code></li>
<li><strong>realloc:</strong> Resizes a previously allocated block. May move the block to a new location if the current space can't be extended. <code>ptr = realloc(ptr, new_size);</code></li>
<li><strong>free:</strong> Deallocates heap memory. MUST free every allocated block to prevent memory leaks. After freeing, set pointer to NULL to avoid dangling pointer access.</li>
</ul>

<p><strong>Common pointer pitfalls:</strong> Dangling pointer (pointing to freed memory), Memory leak (forgetting to free), NULL pointer dereference (accessing *NULL), Wild pointer (uninitialized pointer).</p>

<h5>File Handling in C</h5>
<p>C provides file operations through the <code>FILE*</code> type and standard library functions:</p>
<ul>
<li><strong>Functions:</strong> fopen(), fclose(), fprintf(), fscanf(), fgets(), fputs(), fread(), fwrite()</li>
<li><strong>Modes:</strong> "r" (read), "w" (write — creates/truncates), "a" (append), "r+" (read+write), "w+" (write+read — creates/truncates), "a+" (append+read)</li>
<li><strong>Random access:</strong> fseek(fp, offset, origin), ftell(fp), rewind(fp). Origin can be SEEK_SET (start), SEEK_CUR (current), SEEK_END (end).</li>
</ul>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">TREE FORMULAS:
• Nodes in perfect binary tree of height h: 2^(h+1) - 1
• Leaf nodes in perfect tree: 2^h
• Height of balanced tree with n nodes: O(log n)
• In BST: Inorder traversal gives sorted order
• AVL: |Balance Factor| ≤ 1 for every node</div>

<div class="formula-box">GRAPH FORMULAS:
• Edges in complete graph (Kn): n(n-1)/2
• MST has exactly V-1 edges
• Dijkstra: O(V²) naive, O((V+E)logV) with min-heap
• For connected graph: E ≥ V-1</div>

<div class="formula-box">SORTING:
• Comparison-based lower bound: Ω(n log n)
• Quick Sort pivot: median-of-three reduces worst case
• Merge Sort: Always O(n log n) but O(n) extra space
• Counting Sort: O(n+k), non-comparison, stable</div>

<div class="formula-box">HASHING:
• Load factor α = n/m
• Expected probes (successful): 1/α · ln(1/(1-α)) [open addressing]
• Expected probes (unsuccessful): 1/(1-α)
• Good hash: h(k) = k mod m, m = prime</div>

<div class="formula-box">C POINTERS:
• *p = value at address p (dereference)
• &x = address of variable x
• p++ moves pointer by sizeof(*p) bytes
• Array name = pointer to first element: arr ≡ &arr[0]</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
STACK OPERATIONS:
Push(10) Push(20) Push(30)  Pop()    Pop()
┌────┐   ┌────┐   ┌────┐   ┌────┐   ┌────┐
│    │   │    │   │ 30 │   │    │   │    │
│    │   │ 20 │   │ 20 │   │ 20 │   │    │
│ 10 │   │ 10 │   │ 10 │   │ 10 │   │ 10 │
└────┘   └────┘   └────┘   └────┘   └────┘
TOP=0    TOP=1    TOP=2    TOP=1    TOP=0</div>

<div class="diagram-block">
BST - Binary Search Tree:
Insert: 50, 30, 70, 20, 40, 60, 80

          50
        /    \\
      30      70
     /  \\    /  \\
   20   40  60   80

Search for 40:
50 → 30(go right) → 40(found!) = O(log n)</div>

<div class="diagram-block">
AVL TREE - LL Rotation:
Before (unbalanced):     After (balanced):
      30                    20
     /                     /  \\
   20                    10    30
  /
10

Right Rotate at 30:
30.left = 20.right
20.right = 30</div>

<div class="diagram-block">
DIJKSTRA'S ALGORITHM:
Graph:
  A --4-- B --3-- D
  |       |      |
  2       1      5
  |       |      |
  C --6-- E --2-- F

Shortest from A:
A→C: 2
A→B: 4
A→B→E: 5
A→B→D: 7
A→B→E→F: 7</div>
`,

    examples: [
        {title:"Infix to Postfix", question:"Convert A + B * C - D to postfix.", solution:"Scan: A→output(A) | +→push | B→output(AB) | *→push(*>+) | C→output(ABC) | -→pop *,+(ABC*+) push- | D→output(ABC*+D) | end→pop-(ABC*+D-)\nPostfix: A B C * + D -"},
        {title:"Postfix Evaluation", question:"Evaluate: 5 3 2 * + 4 -", solution:"Stack: push 5 | push 3 | push 2\n*: pop 2,3 → 6, push 6 | Stack: 5,6\n+: pop 6,5 → 11, push 11\npush 4\n-: pop 4,11 → 7\nResult = 7"},
        {title:"BST Operations", question:"Insert 15, 10, 20, 8, 12 into empty BST, then delete 10.", solution:"BST after inserts:\n     15\n    / \\\n  10   20\n / \\\n8  12\nDelete 10 (2 children): Replace with inorder successor (12)\n     15\n    / \\\n  12   20\n /\n8"},
        {title:"Tree Traversal", question:"For tree with root=A, left subtree B(D,E), right subtree C(F,G), give all traversals.", solution:"Inorder (LNR): D B E A F C G\nPreorder (NLR): A B D E C F G\nPostorder (LRN): D E B F G C A\nLevel-order: A B C D E F G"},
        {title:"Hashing with Chaining", question:"Insert 12, 22, 32, 42, 52 into hash table of size 10 using h(k)=k mod 10.", solution:"h(12)=2, h(22)=2, h(32)=2, h(42)=2, h(52)=2\nAll map to index 2!\nIndex 2: 12→22→32→42→52\nAll other indices empty.\nThis is worst case — all collisions."},
        {title:"Dijkstra's Algorithm", question:"Find shortest path from A to D in graph: A→B(4), A→C(2), B→D(3), C→B(1), C→D(8).", solution:"Init: dist[A]=0, dist[B]=∞, dist[C]=∞, dist[D]=∞\nVisit A: dist[B]=4, dist[C]=2\nVisit C(min): dist[B]=min(4,2+1)=3, dist[D]=min(∞,2+8)=10\nVisit B: dist[D]=min(10,3+3)=6\nShortest A→D = 6 (path: A→C→B→D)"},
        {title:"Prim's MST", question:"Find MST for graph with edges: AB(4), AC(8), BC(11), BD(8), CD(7), CE(1), DE(6), DF(2), EF(7).", solution:"Start at C: Pick CE(1)\nFrom {C,E}: Pick DF(2)→not connected. Pick CD(7)? No, pick CE=1 done. EF(7)? DE(6).\nPick DE(6), then DF(2), then AB(4), then BD or AC.\nMST weight depends on graph structure.\nKey: Always pick minimum weight edge connecting tree to non-tree vertex."},
        {title:"Quick Sort Partition", question:"Partition array [10, 80, 30, 90, 40, 50, 70] with pivot=70.", solution:"Pivot = 70 (last element)\ni = -1\nj=0: 10<70, i=0, swap(10,10) → [10,80,30,90,40,50,70]\nj=1: 80>70, skip\nj=2: 30<70, i=1, swap(80,30) → [10,30,80,90,40,50,70]\nj=3: 90>70, skip\nj=4: 40<70, i=2, swap(80,40) → [10,30,40,90,80,50,70]\nj=5: 50<70, i=3, swap(90,50) → [10,30,40,50,80,90,70]\nSwap pivot: [10,30,40,50,70,90,80]; pivot at index 4"},
        {title:"C Pointer Arithmetic", question:"int arr[] = {10,20,30,40,50}; int *p = arr; What is *(p+3)?", solution:"p points to arr[0] = 10\np+3 points to arr[3] (moves 3 * sizeof(int) bytes)\n*(p+3) = arr[3] = 40"},
        {title:"Dynamic Memory", question:"Write C code to create a dynamic array of n integers, fill with squares, and free.", solution:"int n = 5;\nint *arr = (int*)malloc(n * sizeof(int));\nif(arr == NULL) { printf(\"Allocation failed\"); exit(1); }\nfor(int i = 0; i < n; i++)\n    arr[i] = (i+1) * (i+1);\n// arr = {1, 4, 9, 16, 25}\nfree(arr);\narr = NULL; // avoid dangling pointer"}
    ],

    practiceQuestions: [
        {question: "Implement a singly linked list with insert, delete, and search operations in C.", answer: "Create struct Node {int data; struct Node* next;};\nInsert: Create new node, set next to head, head = new.\nDelete: Traverse to find node, prev->next = curr->next, free(curr).\nSearch: Traverse while curr != NULL, compare data, return node or NULL.\nTime: Insert at head O(1), Delete/Search O(n)."},
        {question: "Convert (A+B)*(C-D)/(E+F) to postfix and prefix.", answer: "Postfix (Reverse Polish): AB+CD-*EF+/\nMethod: Use operator precedence and stack. Operands go directly to output; operators pop higher/equal precedence from stack.\n\nPrefix (Polish): /*+AB-CD+EF\nMethod: Reverse infix, swap ( and ), apply postfix algorithm, reverse result."},
        {question: "Explain circular queue. Why is it preferred over linear queue?", answer: "Circular queue treats the array as circular — rear wraps to index 0 when it reaches the end.\nOperations: rear = (rear+1) % SIZE; front = (front+1) % SIZE\nAdvantage: Linear queue wastes space — after multiple dequeues, front positions are unusable even if empty. Circular queue reuses those positions.\nFull condition: (rear+1)%SIZE == front. Empty: front == rear."},
        {question: "Compare min-heap and max-heap. Show insert and delete.", answer: "Min-heap: Parent ≤ children. Root = minimum. Used in priority queues, Dijkstra's.\nMax-heap: Parent ≥ children. Root = maximum. Used in heap sort.\nInsert: Add at end, bubble-up (swap with parent if violating heap property). O(log n).\nDelete (root): Replace root with last element, bubble-down (swap with smaller/larger child). O(log n)."},
        {question: "Implement hash table with separate chaining.", answer: "Array of linked lists. Hash function: h(key) = key % TABLE_SIZE.\nInsert: Compute index, add to linked list at that index.\nSearch: Compute index, traverse linked list at index.\nDelete: Find and remove from linked list.\nLoad factor α = n/m. Average search: O(1+α). Worst case: O(n) when all keys hash to same index."},
        {question: "Construct BST from preorder: 50, 30, 20, 40, 70, 60, 80.", answer: "Root = 50 (first element)\nValues < 50 go left: 30, 20, 40\nValues > 50 go right: 70, 60, 80\nResult:\n        50\n       /  \\\n      30   70\n     / \\   / \\\n    20 40 60 80\nInorder traversal: 20,30,40,50,60,70,80 (sorted — confirms BST)"},
        {question: "Given inorder and preorder, reconstruct binary tree.", answer: "Algorithm: First element of preorder = root. Find root in inorder — left side is left subtree, right side is right subtree. Recursively apply.\nExample: Preorder: A,B,D,E,C,F; Inorder: D,B,E,A,F,C\nRoot=A, Left inorder: D,B,E, Right inorder: F,C\nLeft root=B, Left: D, Right: E\nRight root=C, Left: F"},
        {question: "Explain AVL rotations (LL, RR, LR, RL).", answer: "LL (Left-Left): Imbalance from left child's left subtree. Rotate right at imbalanced node.\nRR (Right-Right): Imbalance from right child's right subtree. Rotate left.\nLR (Left-Right): Left child's right subtree. First rotate left at left child, then rotate right at root.\nRL (Right-Left): Right child's left subtree. First rotate right at right child, then rotate left at root.\nAll rotations restore balance factor to {-1, 0, 1}."},
        {question: "Apply BFS and DFS on a graph with 6 vertices.", answer: "For graph: 0-1, 0-2, 1-3, 2-4, 3-5, 4-5\nBFS (start 0): Use queue. Visit: 0 → 1,2 → 3,4 → 5. Order: 0,1,2,3,4,5\nDFS (start 0): Use stack/recursion. Visit: 0 → 1 → 3 → 5 → 4 → 2. Order: 0,1,3,5,4,2\nBFS gives shortest path in unweighted graphs; DFS uses less memory."},
        {question: "Find MST using Kruskal's algorithm.", answer: "1. Sort all edges by weight.\n2. Pick smallest edge that doesn't form cycle (use Union-Find).\n3. Repeat until V-1 edges selected.\nExample: 5 vertices, edges sorted: (A-B,1), (C-D,2), (A-C,3), (B-D,4), (D-E,5)\nSelect: A-B(1), C-D(2), A-C(3), D-E(5). Skip B-D(4) — creates cycle.\nMST weight = 1+2+3+5 = 11. Time: O(E log E)."},
        {question: "Compare Dijkstra's and Bellman-Ford.", answer: "Dijkstra's: Greedy, uses min-heap. No negative weights. O(V² or (V+E)logV with min-heap). Single-source shortest path.\nBellman-Ford: Dynamic programming. Handles negative weights. Can detect negative cycles. O(VE) — slower.\nUse Dijkstra's when all weights ≥ 0; Bellman-Ford when negative weights exist."},
        {question: "Analyze Quick Sort time complexity.", answer: "Best: O(n log n) — pivot divides array in half each time.\nAverage: O(n log n) — random pivot selection gives balanced partitions on average.\nWorst: O(n²) — when array is already sorted and first/last element is pivot (one partition always empty).\nSpace: O(log n) average (stack), O(n) worst.\nUnstable sort. In-place. Fastest in practice due to cache efficiency."},
        {question: "When is Merge Sort preferred over Quick Sort?", answer: "1. Stability needed: Merge Sort is stable, Quick Sort is not.\n2. Linked lists: Merge Sort is natural fit (no random access needed).\n3. Guaranteed O(n log n): Merge Sort has no worst case degradation.\n4. External sorting: Merge Sort works well with disk-based data.\n5. Parallel processing: Easily parallelizable.\nDisadvantage: O(n) extra space for arrays (vs in-place Quick Sort)."},
        {question: "Explain auto, static, extern, register storage classes.", answer: "auto: Default for local variables. Scope: block. Lifetime: block execution. Stored on stack.\nstatic: Retains value between function calls. Scope: block (local) or file (global). Lifetime: entire program. Stored in data segment.\nextern: Declares variable defined in another file. Scope: global. Lifetime: program. Used for cross-file sharing.\nregister: Suggests storing in CPU register for fast access. No address (&) allowed. Compiler may ignore hint."},
        {question: "Write a C program to reverse a linked list recursively.", answer: "struct Node* reverse(struct Node* head) {\n    if (head == NULL || head->next == NULL) return head;\n    struct Node* rest = reverse(head->next);\n    head->next->next = head;\n    head->next = NULL;\n    return rest;\n}\nBase case: empty or single node returns itself. Recursive case: reverse rest, then make next node point back to current."},
        {question: "Explain double pointer with diagram.", answer: "A pointer to a pointer stores the address of another pointer variable.\nint x = 10; int *p = &x; int **pp = &p;\n*pp → p (address of x), **pp → x (value 10)\nUse cases: 1) Dynamically allocate 2D arrays\n2) Modify pointer in function (pass pointer by reference)\n3) Array of strings (char **)"},
        {question: "Difference between malloc, calloc, and realloc.", answer: "malloc(size): Allocates 'size' bytes. Memory NOT initialized (garbage values). Returns void*.\ncalloc(n, size): Allocates n×size bytes. Memory INITIALIZED TO ZERO. Slightly slower.\nrealloc(ptr, new_size): Resizes previously allocated block. May move data to new location if needed. Returns new pointer.\nAll return NULL on failure. Must be freed with free()."},
        {question: "Write C program to count words, lines, characters in a file.", answer: "#include <stdio.h>\nint main() {\n    FILE *fp = fopen(\"file.txt\", \"r\");\n    int chars=0, words=0, lines=0, inWord=0;\n    char c;\n    while ((c = fgetc(fp)) != EOF) {\n        chars++;\n        if (c == '\\n') lines++;\n        if (c == ' ' || c == '\\n' || c == '\\t') inWord = 0;\n        else if (!inWord) { words++; inWord = 1; }\n    }\n    fclose(fp);\n}"},
        {question: "Explain function pointers with an example.", answer: "A function pointer stores the address of a function.\nDeclaration: int (*fptr)(int, int);\nAssignment: fptr = &add; or fptr = add;\nCall: result = fptr(3, 5); or result = (*fptr)(3, 5);\nUse cases: Callback functions, implementing strategy pattern, qsort() comparator, event handlers, state machines."},
        {question: "What is a structure? How different from union?", answer: "Structure: Groups different data types. Each member has its own memory. Size = sum of all members (+ padding).\nstruct S { int a; char b; }; → Size ≈ 8 bytes\n\nUnion: Members share the SAME memory. Size = largest member. Only one member valid at a time.\nunion U { int a; char b; }; → Size = 4 bytes\n\nUse struct when you need all fields simultaneously; union when fields are mutually exclusive (saves memory)."}
    ],

    examTips: [
        "Tree traversal questions are extremely common — practice all three types",
        "Sorting comparison table (time, space, stability) is almost always asked",
        "For graph algorithms, practice step-by-step trace with actual numbers",
        "C programming output prediction questions require careful pointer understanding",
        "Know the difference between stack and queue applications"
    ],

    commonMistakes: [
        "Confusing preorder (NLR) with inorder (LNR) traversals",
        "Forgetting to free dynamically allocated memory in C",
        "Using = instead of == in C comparison",
        "Not handling NULL in linked list operations",
        "Confusing Prim's (vertex-based) with Kruskal's (edge-based)"
    ],

    memoryTricks: [
        "Traversals: 'IN-PRE-POST' = position of N(node): LNR, NLR, LRN",
        "Stack = LIFO (Like a stack of plates); Queue = FIFO (Like a line/queue)",
        "Sorting stability: 'MBI are stable' = Merge, Bubble, Insertion",
        "C format specifiers: '%d int, %f float, %c char, %s string, %p pointer'",
        "AVL rotations: 'Name tells direction' - LL→Right rotate, RR→Left rotate"
    ]
};
