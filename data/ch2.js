// Chapter 2: Digital Electronics, Computer Organization & Operating Systems
const CH2 = {
    id: 1,
    title: "Digital Electronics, Computer Organization & Operating Systems",
    icon: "⚡",
    marks: 14,
    color: "#f59e0b",
    topics: "Boolean Algebra, K-maps, Logic Families, 8086, Von-Neumann, Memory, CPU Scheduling, Deadlocks, Process Management, Shell Programming",

    overview: {
        importance: "Highest weightage chapter at 14 marks. Covers hardware fundamentals to OS concepts. Very diverse — requires breadth of knowledge. Questions range from Boolean simplification to deadlock conditions.",
        weightage: "14 out of 100 marks (14%)",
        focusAreas: [
            "Boolean algebra & K-map simplification",
            "8086 architecture & addressing modes",
            "CPU scheduling algorithms (FCFS, SJF, RR, Priority)",
            "Deadlock conditions & handling",
            "Memory management (paging, segmentation)",
            "Process synchronization"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>2.1 Boolean Expressions</h4>
<p><strong>Boolean Algebra</strong> is the mathematics of digital circuits. It deals with binary variables that have only two values: 0 (FALSE/LOW) and 1 (TRUE/HIGH). Every digital circuit — from a simple LED switch to a billion-transistor CPU — is built on Boolean algebra. Understanding this topic is essential because it directly connects mathematical logic to hardware design.</p>
<ul>
<li><strong>AND (·):</strong> A·B = 1 only when A=1 AND B=1. In circuits, this corresponds to switches in <em>series</em> — both must be closed for current to flow. The output is 1 only when ALL inputs are 1.</li>
<li><strong>OR (+):</strong> A+B = 1 when A=1 OR B=1 or both. In circuits, this is switches in <em>parallel</em> — either switch lets current through. The output is 1 when ANY input is 1.</li>
<li><strong>NOT ('):</strong> A' = complement of A. A simple inverter — flips 0↔1. If input is HIGH, output is LOW and vice versa.</li>
<li><strong>XOR (⊕):</strong> A⊕B = 1 when A≠B (inputs differ). This is "exclusive OR" — it's 1 when inputs are <em>different</em>. Very important in arithmetic circuits (addition) and parity checking.</li>
</ul>

<p><strong>NAND and NOR</strong> are universal gates — you can build ANY logic circuit using only NAND gates or only NOR gates. This is why they're preferred in actual chip manufacturing.</p>

<h5>Boolean Laws</h5>
<p>These laws allow you to simplify complex Boolean expressions algebraically. They parallel the laws of propositional logic but use different notation (+ for OR, · for AND):</p>
<ul>
<li><strong>Identity:</strong> A+0=A, A·1=A — 0 is the identity for OR, 1 for AND. Adding zero or multiplying by one changes nothing.</li>
<li><strong>Null:</strong> A+1=1, A·0=0 — ORing with 1 always gives 1; ANDing with 0 always gives 0. These "dominate" the expression.</li>
<li><strong>Idempotent:</strong> A+A=A, A·A=A — repeating the same variable doesn't change the result.</li>
<li><strong>Complement:</strong> A+A'=1, A·A'=0 — a variable ORed with its complement is always 1; ANDed gives 0.</li>
<li><strong>De Morgan:</strong> (A·B)'=A'+B', (A+B)'=A'·B' — breaking the bar (complementing the entire expression) flips the operation AND↔OR, and complements each variable. This rule cascades: (A·B·C)' = A'+B'+C'.</li>
<li><strong>Absorption:</strong> A+AB=A, A(A+B)=A — the larger term gets "absorbed" into A. Both reduce to just A.</li>
</ul>

<p><strong>Consensus Theorem:</strong> AB + A'C + BC = AB + A'C. The BC term is redundant because it adds no new information (it's "covered" by the other two terms). This is useful for simplification.</p>

<h4>2.2 Karnaugh Maps (K-maps)</h4>
<p>A <strong>Karnaugh Map</strong> is a graphical tool for simplifying Boolean expressions. Instead of algebraic manipulation, you <em>visually group adjacent 1s</em> on a map to find the simplest sum-of-products (SOP) expression. This is the primary exam topic from Digital Electronics — practice many examples!</p>

<p><strong>How K-maps work:</strong> Cells are arranged so that <em>adjacent cells differ by exactly one variable</em> (Gray code ordering). When you group adjacent 1s, the differing variable cancels out, giving a simpler term.</p>
<ul>
<li><strong>2-variable:</strong> 2×2 grid (4 cells) — simplest K-map</li>
<li><strong>3-variable:</strong> 2×4 grid (8 cells), columns in Gray code order: 00, 01, 11, 10 (<strong>NOT</strong> 00, 01, 10, 11 — this is the most common exam mistake!)</li>
<li><strong>4-variable:</strong> 4×4 grid (16 cells), BOTH rows and columns in Gray code</li>
<li>Group sizes must be powers of 2: 1, 2, 4, 8, 16</li>
<li>Groups can <strong>wrap around edges</strong> — the left column is adjacent to the right column, top row to the bottom row (imagine the map as a torus/donut)</li>
<li>Larger groups = simpler expression. A group of 2 eliminates 1 variable, group of 4 eliminates 2 variables, group of 8 eliminates 3.</li>
<li>Aim for fewest groups covering all 1s. Groups may overlap.</li>
</ul>

<p><strong>Don't-care conditions (X or d):</strong> When certain input combinations never occur or we don't care about the output, mark them as X. You can treat X as either 0 or 1 — whichever makes groups larger (simpler expression).</p>

<div class="diagram-block">
3-Variable K-map Example: F(A,B,C) = Σm(0,1,2,5,7)

         BC
      00  01  11  10
  A ┌────┬────┬────┬────┐
  0 │  1 │  1 │  0 │  1 │  → Group: A'B' (m0,m1), A'C' (m0,m2)
    ├────┼────┼────┼────┤
  1 │  0 │  1 │  1 │  0 │  → Group: BC (m5,m7)
    └────┴────┴────┴────┘
    
  F = A'C' + A'B' + BC ... (after simplification)</div>

<h4>2.3 TTL and CMOS Logic Families</h4>
<p>Logic families are the actual electronic implementations of logic gates. <strong>TTL (Transistor-Transistor Logic)</strong> uses bipolar junction transistors, while <strong>CMOS (Complementary Metal-Oxide Semiconductor)</strong> uses MOSFETs. Understanding their tradeoffs matters for embedded systems and chip design questions.</p>
<table class="content-table">
<tr><th>Parameter</th><th>TTL</th><th>CMOS</th></tr>
<tr><td>Supply Voltage</td><td>5V fixed</td><td>3-18V flexible</td></tr>
<tr><td>Power Consumption</td><td>Higher (static)</td><td>Very low (static), moderate (dynamic)</td></tr>
<tr><td>Speed</td><td>Fast</td><td>Moderate (improving)</td></tr>
<tr><td>Noise Margin</td><td>Moderate</td><td>High</td></tr>
<tr><td>Fan-out</td><td>~10</td><td>~50+</td></tr>
<tr><td>Input Impedance</td><td>Low</td><td>Very High</td></tr>
</table>
<p><strong>Why CMOS dominates today:</strong> Nearly zero static power consumption (only uses power during switching), higher integration density, and flexible supply voltage. All modern processors (Intel, ARM, AMD) use CMOS technology.</p>

<h4>2.4 Combinational Logic Design</h4>
<p><strong>Combinational circuits</strong> produce outputs that depend <em>only</em> on the current inputs — they have no memory. When inputs change, outputs change immediately (after propagation delay). Key building blocks:</p>
<ul>
<li><strong>Half Adder:</strong> Adds two single bits. Sum = A⊕B, Carry = A·B. It's called "half" because it doesn't handle carry-in from a previous addition.</li>
<li><strong>Full Adder:</strong> Adds two bits PLUS a carry-in. Sum = A⊕B⊕C<sub>in</sub>, C<sub>out</sub> = AB + BC<sub>in</sub> + AC<sub>in</sub>. Chain multiple full adders to create an n-bit ripple carry adder.</li>
<li><strong>Multiplexer (MUX):</strong> A data selector — routes one of 2<sup>n</sup> input lines to a single output using n select lines. Think of it as a programmable switch. A 4:1 MUX has 4 data inputs, 2 select lines, and 1 output. MUX can implement any Boolean function!</li>
<li><strong>Demultiplexer (DEMUX):</strong> The reverse of MUX — routes 1 input to one of 2<sup>n</sup> outputs. Used in data distribution.</li>
<li><strong>Decoder:</strong> Converts n input lines to 2<sup>n</sup> output lines (one-hot encoding). Exactly ONE output is active at any time. Used for memory address decoding, instruction decoding.</li>
<li><strong>Encoder:</strong> Reverse of decoder — converts 2<sup>n</sup> inputs to n output lines. Priority encoder resolves conflicts when multiple inputs are active.</li>
</ul>

<h4>2.5 Synchronous Sequential System Design</h4>
<p><strong>Sequential circuits</strong> have memory — their outputs depend on current inputs AND past state. They are controlled by a clock signal that synchronizes all state changes.</p>
<ul>
<li><strong>Flip-Flops</strong> are the fundamental memory elements (store 1 bit each):
  <ul>
  <li><strong>SR Flip-Flop:</strong> Set-Reset. S=1,R=0 → Q=1; S=0,R=1 → Q=0; S=R=1 is <em>invalid</em> (undefined).</li>
  <li><strong>JK Flip-Flop:</strong> Like SR but J=K=1 toggles the output (fixes SR's invalid state). Most versatile flip-flop.</li>
  <li><strong>D Flip-Flop:</strong> Data/Delay flip-flop. Q(next) = D — simply captures the input on the clock edge. Simplest and most commonly used in modern designs.</li>
  <li><strong>T Flip-Flop:</strong> Toggle. T=1 → toggle Q; T=0 → hold Q. Used in counters.</li>
  </ul>
</li>
<li><strong>State Table & State Diagram:</strong> Describe the complete behavior of a sequential circuit. State diagram shows states as circles and transitions as arrows. State table lists present state, input, next state, and output.</li>
<li><strong>Counters:</strong> <strong>Synchronous</strong> (all flip-flops clocked simultaneously — faster, no ripple delay) vs <strong>Asynchronous/Ripple</strong> (each flip-flop's output triggers the next — simpler but slower due to cascading delays).</li>
<li><strong>Registers:</strong> Groups of flip-flops for storing multi-bit data. Shift registers move data: SISO (Serial-In Serial-Out), SIPO, PISO, PIPO.</li>
</ul>

<div class="diagram-block">
D Flip-Flop:
       ┌──────┐
  D ──▶│      │──▶ Q
       │  D-FF│
  CLK ─│      │──▶ Q'
       └──────┘
  Q(next) = D (captures input on clock edge)</div>

<h4>2.6 Microprocessor 8086</h4>
<h5>Architecture</h5>
<p>The <strong>Intel 8086</strong> is a 16-bit microprocessor that forms the foundation of the x86 architecture used in most PCs today. Understanding its architecture is essential because exam questions directly test register names, bus widths, and addressing modes.</p>
<ul>
<li><strong>16-bit</strong> data bus (processes 16 bits at a time) with <strong>20-bit address bus</strong> (can address 2<sup>20</sup> = 1 MB of memory)</li>
<li>Internally divided into two independent units that work in parallel (pipelining):
  <ul>
  <li><strong>BIU (Bus Interface Unit):</strong> Handles all external bus operations — fetching instructions, reading/writing memory. Contains segment registers (CS, DS, SS, ES), Instruction Pointer (IP), and a 6-byte prefetch instruction queue. The BIU fetches the <em>next</em> instruction while the EU executes the current one.</li>
  <li><strong>EU (Execution Unit):</strong> Decodes and executes instructions. Contains the ALU (Arithmetic Logic Unit), general-purpose registers (AX, BX, CX, DX — each split into two 8-bit halves like AH/AL), pointer/index registers (SP, BP, SI, DI), and the flag register (16 flags including Carry, Zero, Sign, Overflow, etc.).</li>
  </ul>
</li>
</ul>

<p><strong>General registers and their special purposes:</strong> AX = Accumulator (used in arithmetic), BX = Base (base addressing), CX = Count (loop counting), DX = Data (I/O operations, multiplication/division).</p>

<p><strong>Segment registers:</strong> CS (Code Segment — where instructions live), DS (Data Segment — where data lives), SS (Stack Segment — where the stack lives), ES (Extra Segment — additional data segment).</p>

<div class="diagram-block">
8086 Architecture:
┌─────────────────────────────────────────┐
│              8086 CPU                   │
│  ┌──────────────┐  ┌──────────────────┐ │
│  │ EU            │  │ BIU              │ │
│  │ ┌──────────┐ │  │ ┌──────────────┐ │ │
│  │ │ AX BX CX │ │  │ │ CS DS SS ES  │ │ │──▶ Address Bus (20-bit)
│  │ │ DX SP BP │ │  │ │ IP           │ │ │
│  │ │ SI DI    │ │  │ ├──────────────┤ │ │──▶ Data Bus (16-bit)
│  │ ├──────────┤ │  │ │ Instruction  │ │ │
│  │ │   ALU    │ │  │ │ Queue (6B)   │ │ │──▶ Control Bus
│  │ │  Flags   │ │  │ └──────────────┘ │ │
│  │ └──────────┘ │  └──────────────────┘ │
│  └──────────────┘                       │
└─────────────────────────────────────────┘</div>

<h5>8086 Addressing Modes</h5>
<p>Addressing modes define HOW the operand (data) is specified in an instruction. The 8086 supports 7 addressing modes, each suited for different data access patterns:</p>
<ol>
<li><strong>Immediate:</strong> MOV AX, 1234H — the operand (1234H) is directly embedded in the instruction. Fastest for constants.</li>
<li><strong>Register:</strong> MOV AX, BX — operand is in a CPU register. Very fast (no memory access needed).</li>
<li><strong>Direct:</strong> MOV AX, [1234H] — the memory address is given directly in the instruction. Used for accessing specific global variables.</li>
<li><strong>Register Indirect:</strong> MOV AX, [BX] — the register contains the memory address. Used for pointer dereferencing and array access.</li>
<li><strong>Based:</strong> MOV AX, [BX+4] — base register + displacement. Useful for accessing fields within a structure/record.</li>
<li><strong>Indexed:</strong> MOV AX, [SI+4] — index register + displacement. Used for iterating through arrays.</li>
<li><strong>Based Indexed:</strong> MOV AX, [BX+SI+4] — combines base, index, and displacement. Access elements in a 2D array or array of structures.</li>
</ol>

<p><strong>Physical Address Calculation:</strong> The 8086 computes the 20-bit physical address as: <code>Physical Address = Segment Register × 16 (or 10H) + Offset</code>. Example: CS=2000H, IP=1234H → PA = 20000H + 1234H = 21234H.</p>

<h4>2.7 Von-Neumann Architecture</h4>
<p>The <strong>Von-Neumann architecture</strong> (also called Princeton architecture) is the fundamental blueprint of most modern computers. Its key insight: <em>both instructions and data are stored in the same memory</em>. This is called the "stored program concept" — the program is just data that can be modified and loaded like any other data.</p>

<p><strong>Components:</strong> CPU (ALU + Control Unit), Memory (unified for instructions and data), Input/Output devices, and a bus connecting them all.</p>

<p><strong>Von-Neumann Bottleneck:</strong> Since instructions and data share the same bus, the CPU can't fetch an instruction and read/write data simultaneously. This creates a bandwidth bottleneck. <strong>Harvard architecture</strong> addresses this by using separate memory and buses for instructions and data (used in DSPs, microcontrollers like ARM Cortex-M).</p>

<div class="diagram-block">
Von-Neumann Architecture:
┌──────────┐    ┌──────────────────┐    ┌──────────┐
│  INPUT   │───▶│    MEMORY        │◀──▶│  OUTPUT  │
│  DEVICE  │    │ (Data + Instns)  │    │  DEVICE  │
└──────────┘    └───────┬──────────┘    └──────────┘
                        │ ▲
                        ▼ │
                ┌──────────────────┐
                │     CPU          │
                │ ┌──────────────┐ │
                │ │    ALU       │ │
                │ ├──────────────┤ │
                │ │ Control Unit │ │
                │ └──────────────┘ │
                └──────────────────┘

Key: Single bus for both data and instructions
(Von-Neumann bottleneck)</div>

<h4>2.8 Registers & Micro Operations</h4>
<p>At the lowest level, all CPU operations are sequences of <strong>micro-operations</strong> — simple, atomic operations performed on data stored in registers. The Control Unit generates the control signals that activate the right micro-operations at the right time.</p>
<ul>
<li><strong>Register Transfer:</strong> R2 ← R1 means "copy the contents of R1 into R2." The original value in R1 is unchanged. All data movement is register-to-register at the micro-operation level.</li>
<li><strong>Micro-operations</strong> fall into four categories:
  <ul>
  <li><strong>Arithmetic:</strong> Add, subtract, increment, decrement, complement</li>
  <li><strong>Logic:</strong> AND, OR, XOR, NOT — bitwise operations</li>
  <li><strong>Shift:</strong> Logical shift left/right, arithmetic shift, circular rotate</li>
  <li><strong>Transfer:</strong> Move data between registers, or between register and memory</li>
  </ul>
</li>
<li><strong>Bus Organization:</strong> Multiple registers share a common bus (typically implemented with multiplexers). Only one register can drive the bus at a time — the control unit selects which register's output is placed on the bus.</li>
</ul>

<h4>2.9 Processor I/O and DMA</h4>
<p>The CPU needs to communicate with external devices (keyboard, disk, network). There are three approaches, each with different performance and complexity tradeoffs:</p>
<ul>
<li><strong>Programmed I/O:</strong> The CPU continuously checks (polls) the device status register in a loop. Simple but extremely wasteful — the CPU does nothing useful while waiting. Like standing at the door waiting for mail delivery.</li>
<li><strong>Interrupt-Driven I/O:</strong> The device sends an interrupt signal to the CPU when data is ready. The CPU can do other work and only stops to handle the device when interrupted. Like getting a notification when mail arrives — much more efficient.</li>
<li><strong>DMA (Direct Memory Access):</strong> A DMA controller transfers data directly between the device and memory <em>without CPU intervention</em>. The CPU only initiates the transfer and gets interrupted when it's complete. Essential for high-speed devices (disk drives, network cards) where per-byte CPU involvement would be too slow. Like hiring a helper to collect and sort your mail.</li>
</ul>

<h4>2.10 Memory Organization & Cache Coherence</h4>
<p>Computer memory is organized in a <strong>hierarchy</strong> that balances speed, size, and cost. Faster memory is smaller and more expensive; slower memory is larger and cheaper.</p>
<ul>
<li><strong>Memory Hierarchy:</strong> Registers (fastest, smallest, ~1ns) → L1 Cache (~2-4ns) → L2 Cache (~10ns) → L3 Cache → RAM (~100ns) → SSD (~100μs) → HDD (~10ms, slowest, largest). The goal is to keep frequently accessed data in faster levels.</li>
<li><strong>Cache Mapping</strong> determines WHERE a memory block can be placed in cache:
  <ul>
  <li><strong>Direct Mapping:</strong> Each memory block maps to exactly ONE cache line. Simple but causes conflicts. Formula: Cache line = (Block address) mod (Number of cache lines).</li>
  <li><strong>Fully Associative:</strong> A block can go in ANY cache line. Most flexible but requires checking all lines (expensive hardware). Best hit rate.</li>
  <li><strong>Set-Associative:</strong> Cache is divided into sets; a block maps to a specific set but can go in any line within that set. Compromise between direct and fully associative. n-way set-associative means n lines per set.</li>
  </ul>
</li>
<li><strong>Cache Coherence</strong> is the challenge of ensuring all CPU caches in a <em>multiprocessor system</em> see the same (most recent) data. When one CPU writes to a memory location, all other CPUs' cached copies of that location must be updated or invalidated.</li>
<li><strong>MESI Protocol:</strong> The most common cache coherence protocol. Each cache line is in one of 4 states: <strong>M</strong>odified (dirty, only copy), <strong>E</strong>xclusive (clean, only copy), <strong>S</strong>hared (clean, multiple copies), <strong>I</strong>nvalid (not usable).</li>
</ul>

<h4>2.11 Operating Systems - CPU Scheduling</h4>
<p><strong>CPU scheduling</strong> determines which process gets to use the CPU when multiple processes are ready. The scheduler's goal is to maximize CPU utilization, throughput, and fairness while minimizing waiting time and response time.</p>
<ul>
<li><strong>FCFS (First Come First Served):</strong> Processes executed in arrival order. Simple and fair, but can cause the <strong>convoy effect</strong> — a long process blocks all short processes behind it, leading to high average waiting time. Non-preemptive.</li>
<li><strong>SJF (Shortest Job First):</strong> Process with shortest burst time runs first. Gives <em>optimal average waiting time</em> among non-preemptive algorithms. Problem: may cause <strong>starvation</strong> of long processes, and requires knowing burst times in advance (usually estimated).</li>
<li><strong>SRTF (Shortest Remaining Time First):</strong> Preemptive version of SJF. If a new process arrives with shorter remaining time than the currently running process, it preempts. Even better average waiting time, but more overhead from context switches.</li>
<li><strong>Round Robin (RR):</strong> Each process gets a fixed <strong>time quantum</strong> (e.g., 4ms). After using its quantum, the process goes to the back of the ready queue. Fair and good for <strong>time-sharing systems</strong>. Performance depends on quantum size: too small = excessive context switching, too large = degrades to FCFS.</li>
<li><strong>Priority Scheduling:</strong> Each process has a priority (lower number = higher priority, or vice versa). Highest priority process runs first. Can be preemptive or non-preemptive. Problem: <strong>starvation</strong> of low-priority processes. Solution: <strong>aging</strong> — gradually increase priority of waiting processes.</li>
<li><strong>Multilevel Queue:</strong> Multiple ready queues (e.g., foreground/interactive, background/batch), each with its own scheduling algorithm. Process stays in its assigned queue permanently. Good for systems with clearly distinct process types.</li>
</ul>

<p><strong>Key metrics:</strong> Turnaround Time = Completion - Arrival. Waiting Time = Turnaround - Burst. Response Time = First execution - Arrival. Throughput = Processes completed / Total time.</p>

<h4>2.12 Deadlocks</h4>
<p>A <strong>deadlock</strong> occurs when two or more processes are permanently blocked because each is holding a resource and waiting for a resource held by another. None can proceed — they're stuck forever.</p>

<p><strong>Classic example:</strong> Process P1 holds Resource R1 and wants R2. Process P2 holds Resource R2 and wants R1. Neither can proceed. Think of two cars facing each other on a narrow bridge — neither can move forward or has room to back up.</p>

<p><strong>Four Necessary Conditions</strong> — ALL four must hold simultaneously for a deadlock to occur:</p>
<ol>
<li><strong>Mutual Exclusion:</strong> At least one resource is non-sharable (held by one process at a time). Cannot be broken for inherently non-sharable resources like printers.</li>
<li><strong>Hold and Wait:</strong> A process holds at least one resource while waiting for additional resources held by other processes.</li>
<li><strong>No Preemption:</strong> Resources cannot be forcibly taken from a process; they must be released voluntarily.</li>
<li><strong>Circular Wait:</strong> A circular chain of processes exists where each is waiting for a resource held by the next process in the chain.</li>
</ol>
<p><strong>Handling strategies:</strong></p>
<ul>
<li><strong>Prevention:</strong> Break one of the four conditions. E.g., require processes to request all resources upfront (breaks Hold&Wait), or impose a total ordering on resources (breaks Circular Wait).</li>
<li><strong>Avoidance:</strong> Use <strong>Banker's Algorithm</strong> — before granting a resource request, check if granting it could lead to an unsafe state. Grant only if the system remains in a safe state (all processes can finish in some order).</li>
<li><strong>Detection & Recovery:</strong> Allow deadlocks but detect them (using Resource Allocation Graph) and recover (kill processes or preempt resources).</li>
<li><strong>Ignore (Ostrich Algorithm):</strong> Pretend deadlocks don't happen. Used by most operating systems (including Linux/Windows) because deadlocks are rare and the overhead of prevention isn't worth it.</li>
</ul>

<h4>2.13 Memory Management</h4>
<p>The OS must manage memory to allow multiple processes to coexist safely and efficiently. Key concepts:</p>
<ul>
<li><strong>Paging:</strong> Divides physical memory into fixed-size blocks called <strong>frames</strong> and logical memory into same-size <strong>pages</strong>. Using a <strong>page table</strong>, the OS maps each page to a frame. Eliminates <strong>external fragmentation</strong> (no unused gaps between allocated blocks) but has small <strong>internal fragmentation</strong> (last page may not be fully used). Page size is typically 4KB.</li>
<li><strong>Segmentation:</strong> Divides logical memory into variable-size <strong>segments</strong> based on logical units (code segment, data segment, stack segment). Each segment has a base address and length. More intuitive for programmers but causes external fragmentation (gaps between segments of different sizes).</li>
<li><strong>Virtual Memory:</strong> Creates the illusion that each process has its own large, contiguous memory space, even larger than physical RAM. Uses disk storage as an extension of RAM. Only actively used pages reside in physical memory; others stay on disk until needed (demand paging).</li>
<li><strong>Page Replacement Algorithms</strong> decide which page to evict when a page fault occurs and all frames are full:
  <ul>
  <li><strong>FIFO:</strong> Replace the oldest page. Simple but may suffer from <strong>Belady's anomaly</strong> (more frames can cause more page faults).</li>
  <li><strong>LRU (Least Recently Used):</strong> Replace the page not used for the longest time. Good approximation of optimal but expensive to implement perfectly (requires tracking access times).</li>
  <li><strong>Optimal:</strong> Replace the page that won't be used for the longest time in the future. Impossible to implement (requires future knowledge) but serves as a benchmark.</li>
  <li><strong>Clock (Second Chance):</strong> Modified FIFO with a reference bit. If the bit is set, give the page a "second chance" (clear bit, move on). Practical approximation of LRU.</li>
  </ul>
</li>
<li><strong>Thrashing:</strong> When the system spends more time paging (swapping pages in/out of disk) than executing actual processes. Occurs when processes have too many pages fighting for too few frames. Solution: reduce degree of multiprogramming, use working set model, or add more RAM.</li>
</ul>

<h4>2.14 File Systems & Disk Scheduling</h4>
<p>The file system manages how data is stored, organized, and accessed on disk. Understanding allocation methods and disk scheduling is important for OS exam questions.</p>
<ul>
<li><strong>File Allocation Methods:</strong>
  <ul>
  <li><strong>Contiguous:</strong> Files stored in consecutive blocks. Fast sequential and random access, but causes external fragmentation and requires knowing file size in advance.</li>
  <li><strong>Linked:</strong> Each block contains a pointer to the next. No fragmentation, files can grow easily, but slow random access (must traverse the chain). FAT file system uses this approach.</li>
  <li><strong>Indexed:</strong> An index block holds pointers to all data blocks. Fast random access, no fragmentation, but wastes space for the index block. Unix inodes use this with multi-level indexing.</li>
  </ul>
</li>
<li><strong>Disk Scheduling Algorithms</strong> determine the order in which disk I/O requests are serviced. The goal is to minimize total head movement (seek time):
  <ul>
  <li><strong>FCFS:</strong> Serve requests in arrival order. Fair but inefficient for heavy loads.</li>
  <li><strong>SSTF (Shortest Seek Time First):</strong> Serve the request closest to current head position. Good throughput but can cause starvation of distant requests.</li>
  <li><strong>SCAN (Elevator):</strong> Head moves in one direction servicing requests, then reverses. Like an elevator — no starvation.</li>
  <li><strong>C-SCAN:</strong> Like SCAN but only services requests in one direction; returns to the start without servicing. More uniform wait times.</li>
  <li><strong>LOOK/C-LOOK:</strong> Like SCAN/C-SCAN but the head reverses at the last request in each direction (doesn't go to the extreme end). More efficient in practice.</li>
  </ul>
</li>
</ul>

<h4>2.15 Processes, Threads & Synchronization</h4>
<p>A <strong>process</strong> is a program in execution — it includes the code, data, stack, heap, and OS-managed state (registers, open files, etc.). Understanding process management is core to OS knowledge.</p>
<ul>
<li><strong>Process States:</strong> New (being created) → Ready (waiting for CPU) → Running (executing on CPU) → Waiting/Blocked (waiting for I/O or event) → Terminated (finished). The OS maintains a <strong>Process Control Block (PCB)</strong> for each process, storing its state, registers, program counter, memory info, etc.</li>
<li><strong>Thread:</strong> A <strong>lightweight process</strong> — the smallest unit of CPU execution. Multiple threads within a process share the same code, data, and open files, but each has its own registers and stack. Threads are cheaper to create and switch between than processes. Types: <strong>User threads</strong> (managed by user library) vs <strong>Kernel threads</strong> (managed by OS).</li>
<li><strong>Synchronization</strong> is needed when multiple processes/threads access shared resources to prevent race conditions:
  <ul>
  <li><strong>Semaphore:</strong> An integer variable accessed via atomic operations wait() and signal(). Binary semaphore (0/1) = mutex. Counting semaphore = controls access to a resource with multiple instances.</li>
  <li><strong>Mutex (Mutual Exclusion Lock):</strong> Binary lock — only the thread that locks it can unlock it. Simpler than semaphore for mutual exclusion.</li>
  <li><strong>Monitor:</strong> High-level synchronization construct with built-in mutual exclusion. Only one process can be active inside a monitor at a time. Uses condition variables for signaling.</li>
  </ul>
</li>
<li><strong>Critical Section Problem:</strong> A section of code where shared resources are accessed. Three requirements: <strong>Mutual Exclusion</strong> (only one process at a time), <strong>Progress</strong> (decision to enter can't be postponed indefinitely), <strong>Bounded Waiting</strong> (there's a limit on how long a process waits).</li>
<li><strong>Classical Problems:</strong> Producer-Consumer (bounded buffer), Readers-Writers (shared database), Dining Philosophers (resource ordering). These are standard exam questions testing semaphore usage.</li>
</ul>

<h4>2.16 Real-Time OS</h4>
<p>A <strong>Real-Time Operating System (RTOS)</strong> is designed for systems where meeting timing deadlines is critical. It guarantees response within a specified time constraint.</p>
<ul>
<li><strong>Hard RTOS:</strong> Missing a deadline is a system failure. Used in aircraft control, medical devices, anti-lock braking systems. Deadlines are absolute — a late result is as bad as a wrong result.</li>
<li><strong>Soft RTOS:</strong> Missing a deadline degrades performance but isn't catastrophic. Used in multimedia streaming, video games. Some deadline misses are tolerable as long as the average performance is acceptable.</li>
<li><strong>Clock Synchronization:</strong> In distributed systems, clocks must be kept in sync. NTP (Network Time Protocol) synchronizes clocks over the internet. Cristian's algorithm requests time from a time server. Berkeley algorithm uses a coordinator to average times.</li>
<li><strong>Task Scheduling:</strong> <strong>Rate Monotonic:</strong> Static priority based on period — shorter period = higher priority. <strong>EDF (Earliest Deadline First):</strong> Dynamic priority — task closest to deadline runs next. EDF can achieve 100% CPU utilization (optimal).</li>
</ul>

<h4>2.17 System Initialization, Booting & User Accounts</h4>
<p>The <strong>boot process</strong> is the sequence of events from power-on to a running operating system. Understanding this flow is important for systems administration questions.</p>
<ul>
<li><strong>Boot Process:</strong> BIOS/UEFI runs first (firmware stored in ROM) → performs POST (Power-On Self Test — checks hardware) → finds boot device → loads Boot Loader (GRUB for Linux, Windows Boot Manager) → Boot Loader loads OS Kernel → Kernel initializes devices and mounts file system → Init process (PID 1) or Systemd starts → User login prompt appears.</li>
<li><strong>User Management (Linux):</strong> User data stored in /etc/passwd (username, UID, home directory, shell), passwords in /etc/shadow (encrypted). Commands: useradd (create user), usermod (modify), userdel (delete), passwd (change password).</li>
</ul>

<h4>2.18 Backup, Restore & Bourne Shell Programming</h4>
<p><strong>Backup strategies</strong> are critical for data protection and disaster recovery:</p>
<ul>
<li><strong>Full Backup:</strong> Copies ALL data. Takes the most time and space but simplest to restore. Typically done weekly or monthly.</li>
<li><strong>Incremental Backup:</strong> Copies only data changed SINCE the last backup (full or incremental). Fast to create, but restoration requires the last full backup plus ALL incrementals in order.</li>
<li><strong>Differential Backup:</strong> Copies data changed since the last FULL backup. Larger than incremental but simpler to restore (only need last full + last differential).</li>
<li><strong>Tools:</strong> tar (Tape Archive — create/extract archives), rsync (efficient remote synchronization — only transfers differences), dd (disk-to-disk exact copy), cpio (Copy In/Out — another archive format).</li>
</ul>

<p><strong>Bourne Shell Programming:</strong> Shell scripts automate system administration tasks. The Bourne shell (/bin/sh) is the original Unix shell and the standard for portable scripts.</p>
<ul>
<li><strong>Variables:</strong> name="John" (no spaces around =). Access with $name or ${name}.</li>
<li><strong>Control structures:</strong> if/then/elif/else/fi, for/do/done, while/do/done, case/esac</li>
<li><strong>Functions:</strong> function_name() { commands; }</li>
<li><strong>File tests:</strong> -f (regular file), -d (directory), -r (readable), -w (writable), -x (executable)</li>
<li><strong>Piping and redirection:</strong> command1 | command2 (pipe output), > (redirect output), >> (append), < (input from file)</li>
</ul>

<div class="code-block">#!/bin/sh
# Bourne Shell Script Example
echo "Enter filename:"
read fname
if [ -f "$fname" ]; then
    wc -l "$fname"
    echo "File exists with above line count"
else
    echo "File not found!"
fi
for i in 1 2 3 4 5; do
    echo "Iteration $i"
done</div>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">BOOLEAN ALGEBRA:
• De Morgan: (A·B)' = A'+B' | (A+B)' = A'·B'
• Consensus: AB + A'C + BC = AB + A'C
• SOP (Sum of Products) ↔ POS (Product of Sums)
• Minterms (Σ) and Maxterms (Π)</div>

<div class="formula-box">8086 PHYSICAL ADDRESS:
Physical Address = Segment × 16 + Offset
= Segment × 10H + Offset
Example: CS=1234H, IP=0002H → PA = 12342H</div>

<div class="formula-box">CPU SCHEDULING:
• Turnaround Time = Completion Time - Arrival Time
• Waiting Time = Turnaround Time - Burst Time
• Response Time = First Response - Arrival Time
• Throughput = No. of processes / Total time</div>

<div class="formula-box">MEMORY:
• Page Table Size = (Virtual Pages) × (Entry Size)
• Virtual Pages = Virtual Address Space / Page Size
• Physical Frames = Physical Memory / Page Size
• Effective Access Time = h×Tc + (1-h)×Tm
  (h=hit ratio, Tc=cache time, Tm=memory time)</div>

<div class="formula-box">DEADLOCK:
• Banker's: Safe if system can allocate resources
  Need[i] = Max[i] - Allocation[i]
• Min resources to avoid deadlock: P(R-1) + 1
  (P=processes, R=resources per process)</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
PROCESS STATE DIAGRAM:
                     ┌─────────┐
         ┌──────────▶│ READY   │◀──────────┐
         │           └────┬────┘           │
    Admitted         Scheduler          Interrupt
         │           dispatches            │
    ┌────┴────┐      ┌────▼────┐      ┌────┴────┐
    │  NEW    │      │ RUNNING │─────▶│ WAITING │
    └─────────┘      └────┬────┘  I/O └─────────┘
                          │     request   ▲ I/O
                     Exit │              done│
                     ┌────▼────┐            │
                     │TERMINATE│            │
                     └─────────┘            │</div>

<div class="diagram-block">
MEMORY HIERARCHY:
    ┌────────────┐  Fastest, Smallest, Most Expensive
    │ Registers  │  (~1 ns)
    ├────────────┤
    │  L1 Cache  │  (~2-4 ns)
    ├────────────┤
    │  L2 Cache  │  (~10 ns)
    ├────────────┤
    │    RAM     │  (~100 ns)
    ├────────────┤
    │    SSD     │  (~100 μs)
    ├────────────┤
    │    HDD     │  (~10 ms)
    └────────────┘  Slowest, Largest, Cheapest</div>

<div class="diagram-block">
DISK SCHEDULING - SCAN Algorithm:
Request queue: 98, 183, 37, 122, 14, 124, 65, 67
Head starts at 53, moving toward 0

  0   14  37  53  65  67  98  122 124 183  199
  |----*---*---H---*---*---*----*---*--------*---|
  ◀────────────│
  └────────────────────────────────────────────▶
  
  Order: 53→37→14→0→65→67→98→122→124→183</div>
`,

    examples: [
        {title:"K-map Simplification", question:"Simplify F(A,B,C) = Σm(1,3,5,7) using K-map.", solution:"All minterms where C=1:\nK-map shows all cells in C=1 column are 1.\nF = C (simplified to single variable)"},
        {title:"Physical Address Calculation", question:"CS=2000H, IP=1234H. Calculate physical address.", solution:"PA = CS × 10H + IP\n= 2000H × 10H + 1234H\n= 20000H + 1234H\n= 21234H"},
        {title:"FCFS Scheduling", question:"Processes P1(0,6), P2(1,4), P3(2,2), P4(3,3) with (Arrival,Burst). Find avg waiting time using FCFS.", solution:"P1: Start=0, End=6, Wait=0-0=0\nP2: Start=6, End=10, Wait=6-1=5\nP3: Start=10, End=12, Wait=10-2=8\nP4: Start=12, End=15, Wait=12-3=9\nAvg Wait = (0+5+8+9)/4 = 22/4 = 5.5"},
        {title:"Round Robin", question:"Same processes with quantum=3.", solution:"Time 0-3: P1(rem 3) | 3-6: P2(rem 1) | 6-8: P3(done)\n8-10: P4(rem 1) (P4 arrived at 3) | 10-13: P1(done)\n13-14: P2(done) | 14-15: P4(done)\nAvg Wait = (7+9+6+9)/4 = 7.75"},
        {title:"Page Table Size", question:"Virtual address: 32-bit, Page size: 4KB, Entry: 4 bytes. Find page table size.", solution:"Virtual pages = 2^32 / 2^12 = 2^20 = 1M pages\nPage table size = 2^20 × 4 = 4MB"},
        {title:"Deadlock Detection", question:"Is this state safe? Available=(3,3,2), Alloc: P0(0,1,0) P1(2,0,0) P2(3,0,2), Max: P0(7,5,3) P1(3,2,2) P2(9,0,2)", solution:"Need: P0(7,4,3) P1(1,2,2) P2(6,0,0)\nAvail(3,3,2): P1 can run(Need 1,2,2≤3,3,2)\nAfter P1: Avail(5,3,2): P0 cannot(need 7,4,3). P2 cannot(need 6,0,0)\nUNSAFE STATE — potential deadlock."},
        {title:"Half Adder Design", question:"Design a half adder and derive its Boolean equations.", solution:"Inputs: A, B | Outputs: Sum, Carry\nSum = A⊕B = A'B + AB'\nCarry = A·B\nUses: 1 XOR gate + 1 AND gate"},
        {title:"Flip-Flop Conversion", question:"Convert SR flip-flop to D flip-flop.", solution:"SR flip-flop needs S and R inputs.\nFor D flip-flop: Q(next) = D\nSo: S = D, R = D'\nConnect: S=D input, R=NOT(D input)"},
        {title:"Cache Hit Ratio", question:"Cache access time=10ns, Memory access time=200ns, Hit ratio=90%. Find effective access time.", solution:"EAT = h×Tc + (1-h)×Tm\n= 0.9×10 + 0.1×200\n= 9 + 20 = 29ns"},
        {title:"Shell Script", question:"Write a shell script to find the largest of three numbers.", solution:"#!/bin/sh\nread a b c\nif [ $a -gt $b ] && [ $a -gt $c ]; then\n  echo \"$a is largest\"\nelif [ $b -gt $c ]; then\n  echo \"$b is largest\"\nelse\n  echo \"$c is largest\"\nfi"}
    ],

    practiceQuestions: [
        {question: "Simplify F(A,B,C,D) = Σm(0,1,2,5,8,9,10) using K-map.", answer: "Group minterms on 4-variable K-map:\nGroup 1: m(0,1,8,9) → B'C' (A and D don't matter)\nGroup 2: m(0,2,8,10) → B'D' (A and C don't matter)\nGroup 3: m(1,5) → A'C'D\nF = B'C' + B'D' + A'C'D"},
        {question: "Compare TTL and CMOS logic families.", answer: "TTL: Faster switching (~10ns), higher power (~10mW), lower noise margin, 5V supply. Used in high-speed applications.\nCMOS: Slower switching but modern CMOS is fast, very low power (~10nW static), high noise margin, flexible voltage (3-15V). Dominates modern ICs due to low power."},
        {question: "Design a 4-to-1 multiplexer using basic logic gates.", answer: "4:1 MUX has 4 data inputs (D0-D3), 2 select lines (S1,S0), 1 output Y.\nY = S1'S0'D0 + S1'S0·D1 + S1·S0'D2 + S1·S0·D3\nImplement with: 4 AND gates (3 inputs each), 1 OR gate (4 inputs), 2 NOT gates for select line complements."},
        {question: "Explain the architecture of 8086 microprocessor.", answer: "Two units: BIU (Bus Interface Unit) fetches instructions via 20-bit address bus. EU (Execution Unit) decodes and executes.\nRegisters: AX,BX,CX,DX (general), SP,BP,SI,DI (pointers), CS,DS,SS,ES (segment).\nFeatures: 16-bit data bus, 20-bit address bus (1MB), instruction pipelining, segmented memory."},
        {question: "List addressing modes of 8086 with examples.", answer: "1. Immediate: MOV AX, 5 (operand in instruction)\n2. Register: MOV AX, BX (operand in register)\n3. Direct: MOV AX, [2000H] (address in instruction)\n4. Register Indirect: MOV AX, [BX] (address in register)\n5. Based: MOV AX, [BX+10] (base + displacement)\n6. Indexed: MOV AX, [SI+10] (index + displacement)\n7. Based-Indexed: MOV AX, [BX+SI+10]"},
        {question: "What is the Von-Neumann bottleneck? How does Harvard architecture address it?", answer: "Von-Neumann bottleneck: Single bus shared between instruction and data memory creates a performance bottleneck — CPU can either fetch instruction OR access data, not both simultaneously.\nHarvard architecture: Uses separate memory buses for instructions and data, allowing simultaneous fetch and data access, effectively doubling bandwidth. Used in DSPs, microcontrollers (AVR, PIC)."},
        {question: "Explain DMA data transfer.", answer: "DMA (Direct Memory Access) allows I/O devices to transfer data directly to/from memory without CPU involvement.\nSteps: 1) CPU initiates DMA by sending start address, byte count, direction. 2) DMA controller takes over the bus. 3) Data transfers directly between I/O and memory. 4) DMA sends interrupt to CPU when done.\nModes: Burst (entire block), Cycle stealing (one word at a time), Transparent (when CPU not using bus)."},
        {question: "Compare Direct, Associative, and Set-Associative cache mapping.", answer: "Direct: Each memory block maps to exactly one cache line. Fast but high conflict misses. Line = (Block) mod (Lines).\nAssociative: Any block can go in any line. Flexible but expensive (needs parallel comparison). Fewest misses.\nSet-Associative: Compromise — cache divided into sets, block maps to a set but can go in any line within the set. n-way means n lines per set. Best balance."},
        {question: "Explain MESI cache coherence protocol.", answer: "MESI has 4 states per cache line:\nModified: Only copy, dirty (different from memory). Must write back before sharing.\nExclusive: Only copy, clean (same as memory). Can modify without bus transaction.\nShared: Clean copy, others may have copies too. Must invalidate others before modifying.\nInvalid: Line not valid. Must fetch from memory/other cache.\nEnsures all caches see consistent data in multiprocessor systems."},
        {question: "Solve CPU scheduling using SJF and SRTF.", answer: "SJF (Non-preemptive): At each decision point (process arrives or finishes), pick the process with shortest total burst time. Once started, runs to completion.\nSRTF (Preemptive): At every arrival, compare remaining time of running process with new process. Switch if new process has shorter remaining time.\nSRTF has lower average waiting time than SJF but more context switches."},
        {question: "State deadlock conditions. Explain Banker's algorithm.", answer: "4 necessary conditions: 1) Mutual Exclusion 2) Hold & Wait 3) No Preemption 4) Circular Wait.\nBanker's Algorithm: For each process, Need = Max - Allocation. Find a safe sequence: pick a process whose Need ≤ Available, simulate its completion (Available += Allocation), repeat. If all processes can finish → SAFE. Otherwise → UNSAFE, deny the request."},
        {question: "Compare paging and segmentation.", answer: "Paging: Fixed-size blocks (pages). No external fragmentation. May have internal fragmentation. Invisible to programmer.\nSegmentation: Variable-size blocks. Matches logical divisions (code, data, stack). External fragmentation possible. Visible to programmer (segment:offset addressing).\nCombined (segmented paging): Segments divided into pages. Used in x86 architecture."},
        {question: "Explain FIFO, LRU, and Optimal page replacement.", answer: "FIFO: Replace the oldest page. Simple but suffers from Belady's anomaly (more frames can cause more faults).\nLRU: Replace the least recently used page. Good performance but expensive to implement (needs timestamps/stack).\nOptimal: Replace the page that won't be used for the longest time in future. Theoretically best but impossible to implement (requires future knowledge). Used as benchmark."},
        {question: "What is thrashing? How to prevent it?", answer: "Thrashing occurs when a process spends more time paging (swapping pages in/out) than executing. CPU utilization drops dramatically.\nCauses: Too many processes, insufficient frames per process.\nPrevention: 1) Working Set Model — allocate frames based on active pages. 2) Page Fault Frequency — if fault rate too high, give more frames; if too low, take frames away. 3) Reduce degree of multiprogramming."},
        {question: "Explain semaphores and solve Producer-Consumer problem.", answer: "Semaphore: Integer variable with two atomic operations — wait(S) decrements (blocks if 0), signal(S) increments.\nProducer-Consumer: Use 3 semaphores:\nmutex=1 (mutual exclusion), empty=N (empty slots), full=0 (filled slots).\nProducer: wait(empty), wait(mutex), produce, signal(mutex), signal(full)\nConsumer: wait(full), wait(mutex), consume, signal(mutex), signal(empty)"},
        {question: "Compare hard and soft real-time OS.", answer: "Hard RTOS: Missing a deadline is catastrophic failure. Guaranteed response times. Examples: aircraft control, pacemaker, ABS braking.\nSoft RTOS: Missing a deadline degrades quality but isn't critical. Best-effort timing. Examples: video streaming, online gaming.\nKey difference: Hard RTOS requires deterministic scheduling and worst-case analysis; Soft RTOS uses priority-based best-effort."},
        {question: "Explain Linux boot process.", answer: "1. BIOS/UEFI: POST, hardware check, finds boot device\n2. Bootloader (GRUB): Loads kernel into memory, passes parameters\n3. Kernel: Initializes hardware, mounts root filesystem, starts init process\n4. Init/Systemd (PID 1): Starts system services, runs startup scripts\n5. Runlevel/Target: Brings system to desired state (multi-user, graphical)\n6. Login: Display manager or console login prompt"},
        {question: "Write a shell script to count files and directories.", answer: "#!/bin/bash\npath=${1:-.}\nfiles=$(find \"$path\" -maxdepth 1 -type f | wc -l)\ndirs=$(find \"$path\" -maxdepth 1 -type d | wc -l)\ndirs=$((dirs - 1))  # subtract the path itself\necho \"Files: $files\"\necho \"Directories: $dirs\""},
        {question: "Explain backup strategies.", answer: "Full Backup: Copies ALL data. Slowest to create, fastest to restore. Use weekly.\nIncremental: Copies only data changed since LAST backup (any type). Fast to create, slow to restore (needs full + all incrementals). Use daily.\nDifferential: Copies data changed since last FULL backup. Medium speed. Restore needs full + latest differential only.\nStrategy: Full weekly + Incremental daily (common enterprise approach)."},
        {question: "Design a synchronous mod-6 counter using JK flip-flops.", answer: "Mod-6 counts 0-5 (000 to 101) then resets.\nUse 3 JK flip-flops (Q2Q1Q0). State table:\n000→001→010→011→100→101→000\nDerive J,K inputs for each flip-flop from state transitions using K-maps.\nAdd reset logic: when Q2Q1Q0=110 (6), force reset to 000.\nAlternatively, use the unused states (110, 111) as don't-cares in K-map simplification."}
    ],

    examTips: [
        "K-map problems are guaranteed — practice 3 and 4 variable maps thoroughly",
        "Memorize 8086 registers and addressing modes — direct recall questions",
        "CPU scheduling calculations are formula-based — practice Gantt charts",
        "Deadlock conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) — MUST know",
        "Page replacement problems are common — practice FIFO vs LRU comparisons"
    ],

    commonMistakes: [
        "Forgetting Gray code ordering in K-maps (00,01,11,10 NOT 00,01,10,11)",
        "Confusing logical vs physical address in paging",
        "Mixing up SJF (non-preemptive) with SRTF (preemptive)",
        "Not considering wrap-around groups in K-maps",
        "Forgetting that in Round Robin, process goes to END of queue"
    ],

    memoryTricks: [
        "Deadlock conditions: 'MH-NC' = Mutual exclusion, Hold&wait, No preemption, Circular wait",
        "8086 General Registers: 'ABCD' = AX, BX, CX, DX",
        "Cache mapping: 'DFS' = Direct (1 location), Fully associative (any), Set-associative (group)",
        "Process states: 'New Ready Running Waiting Terminated' = 'Never Run Without Thinking'",
        "Page Replacement: 'FIFO LRU OPT' = 'First Learned, Often Perfect'"
    ]
};
