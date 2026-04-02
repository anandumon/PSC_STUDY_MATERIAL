// Chapter 8: Software Engineering
const CH8 = {
    id: 7,
    title: "Software Engineering",
    icon: "⚙️",
    marks: 12,
    color: "#10b981",
    topics: "SDLC Models, Requirements Engineering, System Modeling, Object-Oriented Design, Software Testing, Critical Systems",

    overview: {
        importance: "12 marks covering software development lifecycle, design, and testing. Mostly theoretical and conceptual — great for scoring if you memorize key models and diagrams. Very predictable question patterns.",
        weightage: "12 out of 100 marks (12%)",
        focusAreas: [
            "SDLC models comparison (Waterfall, Spiral, Agile)",
            "Software Requirements Specification (SRS)",
            "UML diagrams (Use case, Class, Sequence)",
            "Testing levels and types",
            "Object-oriented design principles",
            "Feasibility studies"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>8.1 System Modeling</h4>
<p><strong>System modeling</strong> is the process of developing abstract models of a system, where each model presents a different view or perspective. These models help stakeholders understand the system before it's built, identify problems early, and guide the development team.</p>
<ul>
<li><strong>Context Model:</strong> Defines the system <em>boundaries</em> — what's inside the system vs. what's outside (external entities it interacts with). Like drawing a circle around the system and identifying everything that crosses the boundary. Answers: "Where does our system end and the outside world begin?"</li>
<li><strong>Interaction Model:</strong> Shows how the system communicates with its environment — what data flows in and out, what events trigger system actions. Use case diagrams and sequence diagrams are interaction models.</li>
<li><strong>Structural Model:</strong> Shows the internal <em>organization</em> of the system — components, their relationships, and how they're assembled. Class diagrams and component diagrams. Like an architectural blueprint showing rooms and how they connect.</li>
<li><strong>Behavioral Model:</strong> Shows the <em>dynamic behavior</em> — what happens when the system operates. How it responds to events, how state changes over time. State machine diagrams and activity diagrams. Like tracking what a system does moment by moment.</li>
</ul>

<h4>8.2 System Engineering Process</h4>
<p>System engineering takes a <strong>holistic view</strong> of the entire system (not just software), including hardware, people, and processes. The process follows a structured sequence:</p>
<ol>
<li><strong>Requirements Definition:</strong> Determine what the system should do — gather needs from stakeholders, document functional and non-functional requirements. This is the most critical phase — errors here propagate through the entire project.</li>
<li><strong>System Design:</strong> Define the architecture — identify subsystems, their interfaces, and how they work together. Decide on hardware/software allocation.</li>
<li><strong>Sub-system Development:</strong> Build individual components. Each subsystem may use different technologies and be developed by different teams.</li>
<li><strong>System Integration:</strong> Combine subsystems, test interfaces, resolve incompatibilities. Often the most challenging phase — individually working components may fail together.</li>
<li><strong>System Installation:</strong> Deploy in the operational environment. Includes data migration, user training, parallel running (old and new systems together), and cutover planning.</li>
<li><strong>System Evolution:</strong> Ongoing maintenance, bug fixes, enhancements, and adaptation to changing needs. Consumes 60-80% of total system cost over its lifetime.</li>
</ol>

<h4>8.3 Life Cycle Models</h4>
<p>SDLC (Software Development Life Cycle) models define the <em>process</em> by which software is developed — the phases, their order, and how they relate. Choosing the right model depends on project requirements, risk, size, and team dynamics.</p>

<h5>Waterfall Model</h5>
<p>The oldest and simplest model. Each phase must be <em>completed entirely</em> before moving to the next. Like a waterfall — water flows downward only.</p>
<div class="diagram-block">
WATERFALL MODEL:
┌──────────────┐
│Requirements  │
│  Analysis    │
└──────┬───────┘
       ▼
┌──────────────┐
│   System     │
│   Design     │
└──────┬───────┘
       ▼
┌──────────────┐
│Implementation│
│   & Coding   │
└──────┬───────┘
       ▼
┌──────────────┐
│   Testing    │
│              │
└──────┬───────┘
       ▼
┌──────────────┐
│ Deployment & │
│ Maintenance  │
└──────────────┘

Linear, sequential. No going back.
Best for: Well-understood, stable requirements.</div>
<p><strong>Advantages:</strong> Simple to understand and manage, well-documented, clear milestones. Each phase has specific deliverables. Good for regulated environments requiring documentation.</p>
<p><strong>Disadvantages:</strong> No flexibility — going back is very expensive. Working software not available until late in the process. Late discovery of errors is costly. Requirements must be perfectly understood upfront. Poorly suited for complex, evolving projects.</p>

<h5>V-Model (Verification & Validation)</h5>
<p>An extension of Waterfall where each development phase has a corresponding <em>testing phase</em>. Forms a V shape — left side is development (verification), right side is testing (validation).</p>
<ul>
<li>Requirements Analysis ↔ Acceptance Testing (validates requirements with users)</li>
<li>System Design ↔ System Testing (tests complete system against specifications)</li>
<li>High-Level Design ↔ Integration Testing (tests module interactions)</li>
<li>Low-Level Design ↔ Unit Testing (tests individual modules)</li>
<li>Coding at the bottom (the point of the V)</li>
</ul>
<p><strong>Advantage:</strong> Testing is planned early (from the start), not as an afterthought. Each test level validates a specific development artifact. <strong>Disadvantage:</strong> Still sequential — doesn't handle changing requirements well.</p>

<h5>Iterative / Incremental Model</h5>
<p>The system is developed in <strong>increments</strong> — each increment adds new functionality on top of previous work. Working software is available from early iterations, and feedback guides future development.</p>
<ul>
<li><strong>Iterative:</strong> Focus on <em>refining and improving</em> existing features through repeated cycles.</li>
<li><strong>Incremental:</strong> Focus on <em>adding new features</em> in each cycle.</li>
<li>Most real projects use a combination of both approaches.</li>
<li><strong>Advantages:</strong> Early working software, easier to manage changes, risk is distributed across iterations.</li>
</ul>

<h5>Spiral Model (Boehm, 1988)</h5>
<p>A <strong>risk-driven</strong> model that combines iterative development with systematic risk management. Each loop through the spiral represents one phase, moving outward as the project progresses.</p>
<div class="diagram-block">
SPIRAL MODEL:
    Each loop has 4 phases:
    
         Planning
            │
     ┌──────┴──────┐
     │              │
  Risk             Engineering
  Analysis         (Build)
     │              │
     └──────┬──────┘
            │
        Evaluation
        (Customer)
    
    Loops expand outward: each cycle
    produces a more complete prototype.
    Best for: Large, high-risk projects.</div>
<p><strong>Quadrants:</strong> 1) <strong>Planning</strong> — determine objectives, alternatives, constraints. 2) <strong>Risk Analysis</strong> — identify and assess risks, build prototypes to mitigate high-risk items. 3) <strong>Engineering</strong> — develop and verify the product using the appropriate method. 4) <strong>Evaluation</strong> — customer reviews the deliverable and plans the next iteration.</p>
<p><strong>Advantages:</strong> Risk handling is built into the process, suitable for large/critical projects, flexibility to change approach. <strong>Disadvantages:</strong> Complex to manage, requires risk assessment expertise, more expensive, may not work for small projects.</p>

<h5>Agile Model</h5>
<p><strong>Agile</strong> is a philosophy/approach based on the <strong>Agile Manifesto (2001)</strong> that prioritizes flexibility, customer collaboration, and rapid delivery of working software. It's the dominant approach in modern software development.</p>
<ul>
<li><strong>Core Values:</strong> Individuals and interactions over processes and tools. Working software over comprehensive documentation. Customer collaboration over contract negotiation. Responding to change over following a plan.</li>
<li><strong>Scrum (most popular Agile framework):</strong> Development in <strong>Sprints</strong> (2-4 week time-boxed iterations). Each sprint delivers potentially shippable software. Roles: <strong>Product Owner</strong> (prioritizes backlog), <strong>Scrum Master</strong> (facilitates process), <strong>Development Team</strong> (builds product). Ceremonies: Sprint Planning, Daily Standup (15 min), Sprint Review (demo), Sprint Retrospective (improve process).</li>
<li><strong>XP (Extreme Programming):</strong> Technical practices for high-quality code: Pair programming (two developers, one keyboard), TDD (Test-Driven Development — write test first, then code), continuous integration, refactoring, simple design.</li>
<li><strong>Kanban:</strong> Visual workflow management using a board with columns (To Do, In Progress, Done). Limits Work-In-Progress (WIP) to prevent overload. Continuous flow (no sprints).</li>
</ul>

<h5>RAD (Rapid Application Development)</h5>
<p>Emphasizes <strong>rapid prototyping</strong> over extensive upfront planning. Uses component reuse, automated tools, and quick iterations to deliver software in 60-90 days.</p>
<ul>
<li>Best for: Projects with clear requirements, tight timelines, and available experienced developers.</li>
<li>Not suitable for: Large systems, high-security applications, or projects where technology is new.</li>
</ul>

<h4>8.4 Design and Implementation</h4>
<p>Once requirements are understood, the system must be designed before coding begins. Good design leads to maintainable, extensible, and reliable software.</p>
<ul>
<li><strong>Architectural Design:</strong> The "big picture" — overall system structure, major components, how they interact. Common patterns: Layered (presentation, business, data), Client-Server, Microservices, Pipe-and-Filter, Repository/Database-centric.</li>
<li><strong>Interface Design:</strong> How components communicate with each other and with external systems. Defines data formats, protocols, API contracts. Good interface design enables independent development and testing of components.</li>
<li><strong>Component Design:</strong> Detailed design of individual modules — internal data structures, algorithms, error handling. Uses pseudocode, flowcharts, or UML activity diagrams.</li>
<li><strong>Design Patterns:</strong> Proven, reusable solutions to common design problems. Three categories:
  <ul>
  <li><strong>Creational:</strong> How objects are created. <strong>Singleton</strong> (only one instance), <strong>Factory</strong> (delegate creation to a method), <strong>Builder</strong> (step-by-step construction).</li>
  <li><strong>Structural:</strong> How objects are composed. <strong>Adapter</strong> (make incompatible interfaces work together), <strong>Facade</strong> (simplified interface to a complex subsystem), <strong>Decorator</strong> (add behavior dynamically).</li>
  <li><strong>Behavioral:</strong> How objects communicate. <strong>Observer</strong> (publish-subscribe notifications), <strong>Strategy</strong> (interchangeable algorithms), <strong>MVC</strong> (Model-View-Controller separation).</li>
  </ul>
</li>
</ul>

<h4>8.5 Validation & Evolution</h4>
<p>These two concepts are frequently confused in exams. Know the precise distinction:</p>
<ul>
<li><strong>Verification:</strong> "Are we building the product <em>right</em>?" — checks that each development artifact (requirements, design, code) correctly implements the specification from the previous phase. Process-oriented. Techniques: Reviews, walkthroughs, inspections, static analysis.</li>
<li><strong>Validation:</strong> "Are we building the <em>right</em> product?" — checks that the final product meets the user's actual needs and requirements. Product-oriented. Techniques: Testing, user acceptance testing, beta testing, demonstrations.</li>
<li><strong>Software Evolution (Maintenance):</strong> After deployment, software continues to evolve. Four types of maintenance:
  <ul>
  <li><strong>Corrective:</strong> Fixing bugs and defects discovered after release.</li>
  <li><strong>Adaptive:</strong> Modifying software to work in a changed environment (new OS, new hardware, new regulations).</li>
  <li><strong>Perfective:</strong> Enhancing performance, adding new features requested by users.</li>
  <li><strong>Preventive:</strong> Restructuring code (refactoring) to improve maintainability and prevent future problems.</li>
  </ul>
  <strong>Lehman's Laws:</strong> Software must continuously change to remain useful (Law of Continuing Change), and its complexity increases unless effort is made to reduce it (Law of Increasing Complexity).
</li>
</ul>

<h4>8.6 Software Requirements</h4>
<h5>SRS (Software Requirements Specification)</h5>
<p>The <strong>SRS document</strong> is the definitive description of what the software should do. It serves as a contract between the client and the development team, and as a basis for design and testing. Standards: IEEE 830.</p>
<ul>
<li><strong>Functional Requirements:</strong> Describe WHAT the system should do — specific features and behaviors. Examples: "The system shall allow users to register with email and password." "The system shall generate monthly reports." These are testable with clear pass/fail criteria.</li>
<li><strong>Non-Functional Requirements (Quality Attributes):</strong> Describe HOW the system should perform — quality constraints. Examples:
  <ul>
  <li><strong>Performance:</strong> "Response time < 2 seconds for 95% of queries."</li>
  <li><strong>Security:</strong> "All passwords must be hashed with bcrypt."</li>
  <li><strong>Usability:</strong> "A new user should be able to complete registration in under 3 minutes."</li>
  <li><strong>Reliability:</strong> "System uptime of 99.9%."</li>
  <li><strong>Scalability:</strong> "Support 10,000 concurrent users."</li>
  </ul>
</li>
<li><strong>Domain Requirements:</strong> Derived from the application domain (industry regulations, mathematical formulae, legal constraints) rather than from specific user needs.</li>
</ul>

<h5>SRS Contents (IEEE 830)</h5>
<ol>
<li><strong>Introduction:</strong> Purpose, Scope, Definitions, References, Overview</li>
<li><strong>Overall Description:</strong> Product perspective, functions, user characteristics, constraints, assumptions</li>
<li><strong>Specific Requirements:</strong> Functional requirements (detailed), Non-functional requirements, External interface requirements (user, hardware, software, communication interfaces)</li>
<li><strong>Appendices and Index:</strong> Glossary, analysis models, supporting information</li>
</ol>
<p><strong>Qualities of a good SRS:</strong> Complete, Consistent, Unambiguous, Verifiable, Modifiable, Traceable, Ranked for importance.</p>

<h4>8.7 Feasibility Studies</h4>
<p>Before committing resources to a project, a <strong>feasibility study</strong> determines whether the project is worth pursuing. It evaluates viability from multiple angles:</p>
<ul>
<li><strong>Technical Feasibility:</strong> Is it <em>technically possible</em>? Do we have the required technology, hardware, software, and skills? Are there technical risks that could prevent completion? If the technology doesn't exist or is unproven, technical feasibility is low.</li>
<li><strong>Economic Feasibility (Cost-Benefit Analysis):</strong> Is it <em>worth the investment</em>? Compare the total cost (development, hardware, training, maintenance) against the expected benefits (efficiency gains, revenue, cost savings). Tools: ROI (Return on Investment), NPV (Net Present Value), Payback Period.</li>
<li><strong>Operational Feasibility:</strong> Will users <em>accept and use</em> the system? Will it work within the current organizational structure and processes? Considers user skills, resistance to change, and impact on existing workflows.</li>
<li><strong>Schedule Feasibility:</strong> Can it be completed <em>on time</em>? Are the deadlines realistic given the scope and available resources?</li>
<li><strong>Legal Feasibility:</strong> Are there <em>legal constraints</em>? Data protection laws (GDPR), licensing requirements, intellectual property issues, regulatory compliance.</li>
</ul>

<h4>8.8 Elicitation and Analysis</h4>
<p><strong>Requirements elicitation</strong> is the process of gathering requirements from stakeholders. It's often the most challenging part of software engineering because stakeholders may not know what they want, may have conflicting needs, or may not communicate requirements clearly.</p>
<ul>
<li><strong>Interviews:</strong> One-on-one or group conversations with stakeholders. <strong>Structured</strong> (predefined questions) vs <strong>Unstructured</strong> (open-ended discussion). Most common technique. Good for understanding perspective and priorities.</li>
<li><strong>Questionnaires/Surveys:</strong> Written questions distributed to large user groups. Good for gathering quantitative data from many people. Less interactive than interviews.</li>
<li><strong>Observation:</strong> Watching users in their actual work environment (ethnography). Reveals implicit requirements that users can't articulate — "the way things are actually done" vs. documented procedures.</li>
<li><strong>Prototyping:</strong> Building a rough, non-functional version of the system for user feedback. Helps users visualize and critique the system early. Throwaway prototypes (discard after feedback) vs evolutionary prototypes (evolve into final system).</li>
<li><strong>Brainstorming:</strong> Creative group sessions to generate ideas without criticism. Good for innovative features and exploring possibilities.</li>
<li><strong>Use Case Analysis:</strong> Describing system behavior through specific scenarios of user-system interaction. Each use case describes a sequence of steps an actor takes to accomplish a goal.</li>
<li><strong>Document Analysis:</strong> Studying existing systems, documentation, forms, and reports to understand current processes and data.</li>
</ul>

<h4>8.9 System Models</h4>
<h5>Context Models</h5>
<p>Show the system boundary and its interaction with external entities. Define what's INSIDE and OUTSIDE the system scope.</p>

<h5>Behavior Models</h5>
<ul>
<li><strong>Data Flow Diagrams (DFD):</strong> Show how data flows through the system — inputs, processes, outputs, and data stores. <strong>Level 0</strong> (Context diagram): The entire system as a single process. <strong>Level 1</strong>: Decompose into major sub-processes. <strong>Level 2</strong>: Further decompose each Level 1 process. Rules: Every process must have at least one input and one output. Data stores appear from Level 1 onward. Flow conservation — inputs and outputs at each level must balance.</li>
<li><strong>State Machine Diagrams:</strong> Show system states and the transitions between them triggered by events. Each state represents a condition where the system waits for events. Transitions are labeled with triggering events and optional conditions/actions.</li>
<li><strong>Activity Diagrams:</strong> Show workflow or process flow — the sequence of activities, decision points, parallel activities, and synchronization. Similar to flowcharts but support parallelism (fork/join bars).</li>
</ul>

<h5>Object Models (UML)</h5>
<ul>
<li><strong>Class Diagrams:</strong> The backbone of OO design. Show classes (name, attributes, methods), their relationships (inheritance, association, aggregation, composition, dependency), and multiplicities. Static view of system structure.</li>
<li><strong>Sequence Diagrams:</strong> Show object interactions over <em>time</em>. Objects are shown at the top, with vertical lifelines. Horizontal arrows show messages/method calls. Read top to bottom chronologically. Shows the dynamic behavior for a specific scenario.</li>
<li><strong>Use Case Diagrams:</strong> Show <em>actors</em> (roles: users or external systems) and <em>use cases</em> (system functionalities they can access). Drawn as ovals (use cases) inside a rectangle (system boundary) with stick figures (actors) outside. Relationships: include (mandatory sub-use case), extend (optional sub-use case), generalization (inheritance between use cases or actors).</li>
</ul>

<div class="diagram-block">
UML USE CASE DIAGRAM:
┌────────────────────────────────────────┐
│              System                    │
│                                        │
│  ┌─────────────┐    ┌──────────────┐  │
│  │  Register   │    │  View Grades │  │
│  └──────┬──────┘    └──────┬───────┘  │
│         │                   │          │
│  ┌──────┴──────┐    ┌──────┴───────┐  │
│  │  Login      │    │  Enroll      │  │
│  └─────────────┘    └──────────────┘  │
│                                        │
└────────┬───────────────────┬───────────┘
         │                   │
     ┌───┴───┐          ┌───┴───┐
     │Student│          │ Admin │
     │ (Actor)│         │(Actor)│
     └───────┘          └───────┘</div>

<h4>8.10 Object-Oriented Design</h4>
<p>OO design structures the system as a collection of interacting objects, each encapsulating data and behavior. The key principles guide how to create flexible, maintainable designs:</p>
<ul>
<li><strong>Objects:</strong> Instances of classes with state (attributes) and behavior (methods). Objects collaborate by sending messages (calling methods) to accomplish tasks.</li>
<li><strong>SOLID Principles</strong> — five guidelines for creating robust, maintainable OO designs:
    <ul>
    <li><strong>S</strong>ingle Responsibility Principle: A class should have <em>only one reason to change</em>. Each class should do one thing and do it well. If a class handles both user data AND email sending, split it into two.</li>
    <li><strong>O</strong>pen/Closed Principle: Software entities should be <em>open for extension</em> (add new features) but <em>closed for modification</em> (don't change existing working code). Achieved through abstraction, interfaces, and inheritance.</li>
    <li><strong>L</strong>iskov Substitution Principle: Objects of a derived class should be <em>substitutable</em> for objects of the base class without breaking the program. If Square extends Rectangle, every place that uses a Rectangle should work correctly with a Square.</li>
    <li><strong>I</strong>nterface Segregation Principle: Many specific interfaces are better than one general-purpose interface. Clients shouldn't be forced to depend on methods they don't use. Split large interfaces into smaller, focused ones.</li>
    <li><strong>D</strong>ependency Inversion Principle: High-level modules should not depend on low-level modules — both should depend on <em>abstractions</em>. Program to interfaces, not to implementations.</li>
    </ul>
</li>
<li><strong>Coupling and Cohesion:</strong>
  <p><strong>Coupling</strong> (between modules) — how tightly connected two modules are. <em>Low coupling is better.</em> From worst to best: Content → Common → Control → Stamp → Data coupling.</p>
  <p><strong>Cohesion</strong> (within a module) — how closely related the responsibilities within a module are. <em>High cohesion is better.</em> From best to worst: Functional → Sequential → Communicational → Procedural → Temporal → Logical → Coincidental.</p>
  <p><strong>Goal:</strong> Design for LOW coupling (modules are independent) and HIGH cohesion (each module does one thing completely).</p>
</li>
</ul>

<h4>8.11 Real-Time Software Design</h4>
<p>Real-time systems must respond to inputs within strict <strong>timing constraints</strong>. The correctness of the system depends not just on the logical result but on <em>when</em> the result is produced.</p>
<ul>
<li><strong>Hard Real-Time:</strong> Missing a deadline is a <em>system failure</em> — potentially catastrophic. Examples: aircraft flight control, medical device control (pacemaker), anti-lock braking systems, nuclear plant control. Every operation must complete before its deadline, always.</li>
<li><strong>Soft Real-Time:</strong> Missing a deadline <em>degrades performance</em> but isn't catastrophic. Examples: multimedia streaming (occasional frame drop is acceptable), video conferencing, online gaming. Deadlines are goals, not absolute requirements.</li>
<li><strong>Design considerations:</strong> Use Real-Time OS (RTOS) with deterministic scheduling, priority-based task execution, interrupt handling, minimal use of dynamic memory allocation (unpredictable timing), timing analysis (worst-case execution time), concurrency management.</li>
<li><strong>Scheduling:</strong> <strong>Rate Monotonic:</strong> Static priorities — shorter period (more frequent) = higher priority. <strong>EDF (Earliest Deadline First):</strong> Dynamic — task closest to deadline runs next. EDF achieves 100% CPU utilization (theoretically optimal).</li>
</ul>

<h4>8.12 Critical Systems</h4>
<p><strong>Critical systems</strong> are systems where failure can result in severe consequences. They require exceptional levels of dependability — beyond what normal systems provide.</p>
<ul>
<li><strong>Safety-Critical:</strong> Failure may cause <em>injury or death</em>. Examples: medical devices (infusion pumps, MRI), nuclear reactor control, aircraft avionics, chemical plant control. Must be certified by regulatory bodies (FDA, FAA). Require formal verification, exhaustive testing, and redundancy.</li>
<li><strong>Mission-Critical:</strong> Failure causes <em>mission failure</em>. Examples: space missions (Mars rover, satellite systems), military systems. May be unrecoverable — you can't send a technician to fix a satellite.</li>
<li><strong>Business-Critical:</strong> Failure causes <em>significant financial loss</em>. Examples: banking transaction systems, stock trading platforms, e-commerce platforms. Downtime costs money every second.</li>
<li><strong>Development approaches for critical systems:</strong>
  <ul>
  <li><strong>Formal Methods:</strong> Mathematical specifications and proofs of correctness. Guarantees the system meets its specification. Expensive but provides the highest assurance.</li>
  <li><strong>Redundancy:</strong> Multiple independent implementations (N-version programming) — if one fails, others continue. Triple Modular Redundancy (TMR) uses three systems with majority voting.</li>
  <li><strong>Fault Tolerance:</strong> System continues operating correctly even when components fail. Techniques: error detection (checksums, watchdog timers), error recovery (rollback, restart), error containment (isolate failing components).</li>
  <li><strong>Extensive Testing:</strong> 100% code coverage, extensive stress testing, environmental testing, regression testing. May require certification testing per industry standards (DO-178C for aviation software, IEC 62304 for medical devices).</li>
  </ul>
</li>
</ul>

<h4>8.13 Software Testing</h4>
<p><strong>Testing</strong> is the process of executing software to find defects. It cannot prove the absence of bugs — only their presence. Testing consumes 40-50% of total development effort in typical projects, and even more in critical systems.</p>

<h5>Testing Levels</h5>
<ol>
<li><strong>Unit Testing:</strong> Tests individual <em>modules/functions</em> in isolation. Written by developers. Tests the smallest testable units. Uses stubs (simulate called functions) and drivers (simulate calling functions). Frameworks: JUnit (Java), unittest (Python), NUnit (.NET).</li>
<li><strong>Integration Testing:</strong> Tests how <em>combined modules</em> work together. Focus on interfaces and data flow between modules. Approaches:
  <ul>
  <li><strong>Top-down:</strong> Start from main module, add lower-level modules one by one. Uses stubs for unfinished modules.</li>
  <li><strong>Bottom-up:</strong> Start from lowest modules, build upward. Uses drivers for higher modules.</li>
  <li><strong>Big bang:</strong> Integrate all modules at once. Simple but hard to locate errors.</li>
  <li><strong>Sandwich:</strong> Combination of top-down and bottom-up.</li>
  </ul>
</li>
<li><strong>System Testing:</strong> Tests the <em>complete, integrated system</em> against requirements. Verifies both functional and non-functional requirements. Includes performance testing, security testing, usability testing.</li>
<li><strong>Acceptance Testing:</strong> Tests whether the system meets <em>user expectations</em>. Final validation before deployment.
  <ul>
  <li><strong>Alpha testing:</strong> Done at the developer's site by internal users.</li>
  <li><strong>Beta testing:</strong> Done at the customer's site by actual users in a real environment.</li>
  <li><strong>UAT (User Acceptance Testing):</strong> Formal testing by the client to determine if the system satisfies their acceptance criteria.</li>
  </ul>
</li>
</ol>

<h5>Testing Types</h5>
<ul>
<li><strong>Black Box Testing (Functional):</strong> Test <em>without knowledge</em> of internal code. Focus on inputs and expected outputs. Treat the system as a "black box."
  <ul>
  <li><strong>Equivalence Partitioning:</strong> Divide inputs into classes where all values in a class should be treated the same. Test one value from each class. Example: For age input (1-120), test classes: invalid (<1), valid (1-120), invalid (>120).</li>
  <li><strong>Boundary Value Analysis:</strong> Test at and near boundaries (edges) of input ranges. Most bugs occur at boundaries. For range 1-100, test: 0, 1, 2, 99, 100, 101.</li>
  <li><strong>Decision Table Testing:</strong> For complex business rules with multiple conditions. Lists all combinations of conditions and their actions.</li>
  </ul>
</li>
<li><strong>White Box Testing (Structural):</strong> Test <em>with knowledge</em> of internal code. Design tests to exercise specific code paths.
  <ul>
  <li><strong>Statement Coverage:</strong> Every line of code executed at least once.</li>
  <li><strong>Branch Coverage:</strong> Every branch (if-else, switch) taken at least once. Stronger than statement coverage.</li>
  <li><strong>Path Coverage:</strong> Every possible execution path tested. Strongest but often impractical (exponential number of paths).</li>
  </ul>
</li>
<li><strong>Regression Testing:</strong> Re-running existing tests after code changes to ensure nothing previously working is broken. Essential for maintenance. Automated regression suites save enormous time.</li>
<li><strong>Performance Testing:</strong> <strong>Load testing</strong> (expected user load), <strong>Stress testing</strong> (beyond capacity — find breaking point), <strong>Endurance/Soak testing</strong> (sustained load over time — detect memory leaks).</li>
<li><strong>Security Testing:</strong> Vulnerability assessment, penetration testing (ethical hacking), code review for security flaws. Checks for SQL injection, XSS, authentication bypass, etc.</li>
</ul>

<div class="diagram-block">
V-MODEL (Testing Correspondence):

Requirements ──────────────── Acceptance Testing
    │                                  ▲
    ▼                                  │
 High-Level Design ──────── System Testing
    │                                  ▲
    ▼                                  │
 Low-Level Design ─────── Integration Testing
    │                                  ▲
    ▼                                  │
   Coding ────────────────── Unit Testing

(Left side: Development | Right side: Testing)</div>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">SDLC MODELS COMPARISON:
• Waterfall: Linear, sequential, rigid, predictable
• V-Model: Waterfall + testing at each stage
• Spiral: Risk-driven, iterative, prototyping
• Agile: Iterative, flexible, customer-focused
• RAD: Rapid prototyping, component reuse</div>

<div class="formula-box">TESTING TYPES:
• Black Box: No code knowledge (functional testing)
• White Box: Code knowledge (structural testing)
• Gray Box: Partial knowledge
• Smoke Test: Basic functionality check
• Regression: Test after changes</div>

<div class="formula-box">COUPLING & COHESION:
Coupling (low is better):
  Content > Common > Control > Stamp > Data
  (worst)                          (best)

Cohesion (high is better):
  Functional > Sequential > Communicational > 
  Procedural > Temporal > Logical > Coincidental
  (best)                           (worst)</div>

<div class="formula-box">SOLID PRINCIPLES:
S - Single Responsibility
O - Open/Closed
L - Liskov Substitution
I - Interface Segregation
D - Dependency Inversion</div>

<div class="formula-box">REQUIREMENTS:
Functional: WHAT system does (features)
Non-functional: HOW system performs (quality)
  - Performance, Security, Usability, Reliability
Domain: Specific to application area</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
SOFTWARE DEVELOPMENT LIFECYCLE:
┌──────────┐   ┌──────────┐   ┌──────────┐
│ Planning │──▶│ Analysis │──▶│ Design   │
└──────────┘   └──────────┘   └──────────┘
                                    │
                                    ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│Maintenan-│◀──│ Testing  │◀──│ Coding   │
│ce        │   │          │   │          │
└──────────┘   └──────────┘   └──────────┘</div>

<div class="diagram-block">
DFD (Data Flow Diagram) - Level 0:
                  ┌────────────┐
   Student ──────▶│   Online    │──────▶ Admin
  (External)      │  Exam      │      (External)
                  │  System    │
   Faculty ──────▶│            │──────▶ Database
  (External)      └────────────┘      (Data Store)

Symbols:
□ External Entity   ○ Process
── Data Flow        ═ Data Store</div>

<div class="diagram-block">
CLASS DIAGRAM (UML):
┌───────────────────┐
│    <<abstract>>    │
│      Shape         │
├───────────────────┤
│ - color: String    │
├───────────────────┤
│ + getArea(): double│
│ + draw(): void     │
└────────┬──────────┘
         │ extends
    ┌────┴────┐
    │         │
┌───┴───┐ ┌──┴────┐
│Circle │ │Rectangle│
├───────┤ ├────────┤
│-radius│ │-width  │
│       │ │-height │
├───────┤ ├────────┤
│+getA()│ │+getA() │
└───────┘ └────────┘</div>
`,

    examples: [
        {title:"Waterfall vs Agile", question:"Compare Waterfall and Agile methodologies.", solution:"Waterfall:\n- Linear, sequential phases\n- Complete documentation before coding\n- Changes are expensive\n- Testing at the end\n- Best for: stable requirements\n\nAgile:\n- Iterative sprints (2-4 weeks)\n- Working software over documentation\n- Changes are welcome\n- Testing continuous\n- Best for: evolving requirements"},
        {title:"SRS Document", question:"List the key sections of an SRS document.", solution:"1. Introduction\n   - Purpose, Scope, Definitions, References\n2. Overall Description\n   - Product perspective, User characteristics\n   - Constraints, Assumptions\n3. Specific Requirements\n   - Functional requirements\n   - Non-functional requirements\n   - External interface requirements\n4. Appendices\n   - Glossary, Analysis models"},
        {title:"Feasibility Study", question:"Conduct a feasibility study for an online examination system.", solution:"Technical: Yes — web technologies available (HTML, PHP, MySQL)\nEconomic: Server cost $500/yr, Development $5000, Saves $10000/yr manual exam costs → ROI in 6 months ✓\nOperational: Students familiar with web browsers ✓. Training needed for faculty.\nSchedule: Can be developed in 3 months with 2 developers ✓\nLegal: Must comply with data protection laws ✓\nConclusion: Project is FEASIBLE"},
        {title:"Use Case", question:"Write a use case for 'Student Registration'.", solution:"Use Case: Register Student\nActor: Student\nPrecondition: Student has valid ID\nMain Flow:\n1. Student opens registration page\n2. System displays form\n3. Student enters details (name, email, course)\n4. System validates data\n5. System creates account\n6. System sends confirmation email\nAlternate Flow:\n3a. Invalid data → show error, return to step 3\n5a. Duplicate email → show error\nPostcondition: Student account created"},
        {title:"Testing Types", question:"Differentiate black box and white box testing with examples.", solution:"Black Box Testing:\n- Tests functionality without code knowledge\n- Techniques: Equivalence Partitioning, Boundary Value\n- Example: Testing login with valid/invalid credentials\n- Tester doesn't need programming skills\n\nWhite Box Testing:\n- Tests internal code structure\n- Techniques: Statement coverage, Branch coverage\n- Example: Testing all if-else branches in a function\n- Tester needs programming skills"},
        {title:"DFD Levels", question:"Explain DFD levels with examples.", solution:"Level 0 (Context): Single process, external entities, data stores\n - Shows entire system as one process\n \nLevel 1: Decompose main process into sub-processes\n - Shows major functions\n \nLevel 2: Further decompose each Level 1 process\n - Shows detailed operations\n\nRules:\n- Input/output must balance between levels\n- Each process must have at least one input and output\n- Data stores appear from Level 1 onward"},
        {title:"SOLID Example", question:"Explain Single Responsibility Principle with code.", solution:"// VIOLATION: Class handles both user data AND email\nclass User {\n  save() { /* save to DB */ }\n  sendEmail() { /* send email */ }\n}\n\n// FOLLOWING SRP:\nclass User {\n  save() { /* save to DB */ }\n}\nclass EmailService {\n  sendEmail(user) { /* send email */ }\n}\n\nEach class has ONE reason to change:\n- User changes if DB logic changes\n- EmailService changes if email logic changes"},
        {title:"Coupling Types", question:"Rank coupling types from worst to best.", solution:"1. Content Coupling (WORST): Module modifies another's data directly\n2. Common Coupling: Modules share global data\n3. Control Coupling: One module controls flow of another (passing flags)\n4. Stamp Coupling: Modules share composite data structure\n5. Data Coupling (BEST): Modules share only simple data parameters\n\nRule: AIM for low coupling (data coupling)"},
        {title:"Spiral Model", question:"Explain each quadrant of the Spiral Model.", solution:"Quadrant 1 - Planning:\n  Determine objectives, alternatives, constraints\n\nQuadrant 2 - Risk Analysis:\n  Identify and resolve risks\n  Build prototypes to reduce risk\n\nQuadrant 3 - Engineering:\n  Develop and verify the product\n  Apply appropriate SDLC model\n\nQuadrant 4 - Evaluation:\n  Customer evaluates the deliverable\n  Plans for next iteration\n\nEach loop = one phase of development\nOuter loops = more complete product"},
        {title:"Critical System", question:"Explain how to develop a safety-critical system.", solution:"Safety-Critical Development:\n1. Hazard Analysis: Identify potential dangers\n2. Safety Requirements: Define safety constraints\n3. Formal Verification: Mathematical proof of correctness\n4. Redundancy: Multiple backup systems\n5. Fault Tolerance: System continues despite failures\n6. Extensive Testing: 100% code coverage, stress testing\n7. Certification: Meet industry standards (DO-178C for aviation)\n\nExamples: Aircraft control, Medical devices, Nuclear plants"}
    ],

    practiceQuestions: [
        {question: "Compare Waterfall, V-Model, Spiral, and Agile.", answer: "Waterfall: Sequential phases (Requirements→Design→Code→Test→Deploy). Simple, rigid. No going back. Good for well-understood projects.\nV-Model: Extended waterfall — each dev phase has corresponding test phase. Requirements↔Acceptance, Design↔Integration, Code↔Unit. Emphasizes testing.\nSpiral: Iterative + risk analysis. 4 quadrants per iteration: Planning, Risk Analysis, Development, Evaluation. Good for large, risky projects.\nAgile: Iterative, incremental. Sprints (2-4 weeks). Customer collaboration, adapting to change. Scrum, XP, Kanban."},
        {question: "System modeling — types of models.", answer: "System modeling creates abstract representations of a system:\n1. Context Model: Shows system boundary — what's inside vs outside. DFD Level 0.\n2. Interaction Model: How system interacts with users/other systems. Use case diagrams, sequence diagrams.\n3. Structural Model: Internal organization — classes, components. Class diagrams, component diagrams.\n4. Behavioral Model: System behavior over time. State machine diagrams, activity diagrams.\n5. Data Model: Data entities and relationships. ER diagrams."},
        {question: "System engineering process.", answer: "System engineering takes a holistic view of hardware, software, people, and processes:\n1. Requirements Definition: Gather functional and non-functional requirements from stakeholders.\n2. System Design: Define architecture — subsystems, interfaces, hardware/software allocation.\n3. Sub-system Development: Build individual components. May use different technologies.\n4. System Integration: Combine subsystems, test interfaces, resolve incompatibilities.\n5. System Installation: Deploy to operational environment. Includes user training.\n6. System Evolution: Maintenance, updates, adaptation to new requirements.\n7. System Decommissioning: End-of-life planning, data migration, disposal."},
        {question: "SRS document — IEEE 830 components.", answer: "SRS (Software Requirements Specification) per IEEE 830:\n1. Introduction: Purpose, scope, definitions, references, overview.\n2. Overall Description: Product perspective, functions, user characteristics, constraints, assumptions.\n3. Specific Requirements: Functional requirements (detailed), Non-functional (performance, security, usability), Interface requirements (UI, hardware, software, communications).\n4. Appendices: Data models, diagrams.\nProperties of good SRS: Correct, unambiguous, complete, consistent, verifiable, modifiable, traceable."},
        {question: "Types of feasibility studies.", answer: "1. Technical Feasibility: Can we build it? Technology availability, team skills, infrastructure. Risk: New/unproven technology.\n2. Economic Feasibility (Cost-Benefit): Is it worth building? Development cost vs benefits. ROI, NPV, payback period analysis.\n3. Operational Feasibility: Will users accept it? Organizational change, training needs, workflow impact.\n4. Schedule Feasibility: Can we build it in time? Timeline constraints, resource availability.\n5. Legal Feasibility: Compliance with laws, regulations, licensing, patents."},
        {question: "Requirements elicitation techniques.", answer: "1. Interviews: One-on-one with stakeholders. Structured (pre-set questions) or unstructured. Good for deep understanding.\n2. Questionnaires: Survey large groups. Good for gathering quantitative data. Limited depth.\n3. Observation: Watch users work in real environment. Reveals hidden requirements. Time-consuming.\n4. Prototyping: Build working model, get feedback. Clarifies vague requirements. Risk of premature commitment.\n5. Brainstorming: Group creative sessions. Generates many ideas. Needs facilitation.\nOthers: Use cases, workshops, document analysis, ethnography."},
        {question: "Functional vs non-functional requirements.", answer: "Functional: WHAT the system should do. Specific behaviors, features.\nExamples: User can login with email/password. System generates monthly reports. Search returns results in 3 seconds.\n\nNon-functional: HOW the system should perform. Quality attributes.\nCategories:\n• Performance: Response time < 2s, 1000 concurrent users\n• Security: Data encryption, authentication\n• Usability: Learnable in 1 hour, accessibility\n• Reliability: 99.9% uptime, MTBF > 1000 hours\n• Scalability: Handle 10x traffic growth\nNon-functional often harder to test but critical for acceptance."},
        {question: "Context DFD and Level-1 DFD for library system.", answer: "Context DFD (Level 0): One process 'Library System' in center.\nExternal entities: Members, Librarian, Supplier.\nFlows: Member → (book request, return) → System → (issue notification, due reminder) → Member.\nLibrarian → (catalog update, reports request) → System → (reports) → Librarian.\n\nLevel-1 DFD: Decompose into processes:\n1.0 Manage Members (registration, update)\n2.0 Issue/Return Books (transactions)\n3.0 Catalog Management (add/remove books)\n4.0 Generate Reports (overdue, popular books)\nData stores: D1-Books, D2-Members, D3-Transactions."},
        {question: "State machine diagrams.", answer: "State machine shows system behavior in response to events. Shows states (rounded rectangles) and transitions (arrows with events/conditions).\nExample — ATM:\nStates: Idle → CardInserted → PINEntered → TransactionSelected → Processing → Dispensing → Idle\nTransitions: insert_card/validate, enter_pin[valid]/show_menu, select_withdraw/process, [sufficient_funds]/dispense\nGuard conditions: [PIN valid], [balance >= amount]\nActions: /display_error, /eject_card, /dispense_cash\nUseful for reactive systems, embedded systems, protocols."},
        {question: "Design patterns — Singleton and Observer.", answer: "Singleton: Ensures only ONE instance of a class exists. Global access point.\nImplementation: Private constructor, static getInstance() method, static instance variable.\nUse: Database connection, logger, config manager.\n\nObserver: One-to-many dependency. When subject changes state, all observers are notified.\nComponents: Subject (maintains observer list), Observer (interface with update() method), Concrete implementations.\nUse: Event systems, MVC pattern (Model notifies Views), pub/sub messaging.\nExample: Stock price changes → notify all subscribed traders."},
        {question: "SOLID principles.", answer: "S - Single Responsibility: Each class has ONE reason to change. One job.\nO - Open/Closed: Open for extension, closed for modification. Add new behavior without changing existing code.\nL - Liskov Substitution: Subclass objects should be substitutable for parent class objects without breaking behavior.\nI - Interface Segregation: Don't force clients to implement interfaces they don't use. Many small interfaces > one big one.\nD - Dependency Inversion: Depend on abstractions, not concretions. High-level modules shouldn't depend on low-level details."},
        {question: "Coupling and cohesion.", answer: "Coupling: Degree of interdependence between modules. LOW coupling is desirable.\nTypes (worst to best): Content → Common → External → Control → Stamp → Data.\nData coupling (best): Modules communicate via parameters only.\n\nCohesion: Degree to which elements within a module belong together. HIGH cohesion is desirable.\nTypes (worst to best): Coincidental → Logical → Temporal → Procedural → Communicational → Sequential → Functional.\nFunctional cohesion (best): All elements contribute to a single, well-defined task.\n\nGoal: High cohesion + Low coupling = maintainable, testable, reusable modules."},
        {question: "Black-box vs white-box testing.", answer: "Black-box (Functional): Test without knowing internal code. Based on requirements/specifications.\nTechniques: Equivalence partitioning, boundary value analysis, decision tables, state transition testing.\nWho: Testers, QA.\n\nWhite-box (Structural): Test with knowledge of internal code. Based on code structure.\nTechniques: Statement coverage, branch coverage, path coverage, condition coverage.\nWho: Developers.\n\nGrey-box: Partial knowledge of internals. Common in integration testing."},
        {question: "Levels of software testing.", answer: "1. Unit Testing: Individual components (functions/methods). By developers. Automated (JUnit, pytest). Fastest, most granular.\n2. Integration Testing: Combined modules. Test interfaces between components. Top-down, bottom-up, or big-bang approach.\n3. System Testing: Complete integrated system. Functional + non-functional requirements. By QA team.\n4. Acceptance Testing: User validates system meets business needs.\n   • Alpha: Internal users at dev site.\n   • Beta: External users in real environment.\n   • UAT: Formal acceptance by customer."},
        {question: "Regression testing.", answer: "Regression testing: Re-running tests after code changes to ensure existing functionality still works.\nWhen performed:\n• After bug fixes (verify fix doesn't break other things)\n• After new features added\n• After refactoring or performance optimization\n• Before each release\nApproach: Maintain a regression test suite. Automate as much as possible.\nSelective regression: Only run tests related to changed code (risk-based).\nTools: Selenium, JUnit, TestNG, pytest.\nCost: Can be expensive without automation — often largest testing effort."},
        {question: "V-Model with testing correspondence.", answer: "Left side (Development) ←→ Right side (Testing):\nRequirements Analysis ←→ Acceptance Testing\nSystem Design ←→ System Testing\nArchitectural Design ←→ Integration Testing\nModule Design ←→ Unit Testing\nCoding (bottom of V)\n\nKey principle: Test planning starts parallel to corresponding development phase.\nAdvantages: Early test planning, clear traceability, defects found early.\nDisadvantages: Rigid (no iteration), assumes complete requirements upfront.\nBest for: Safety-critical systems, well-understood requirements."},
        {question: "Critical systems — how they differ.", answer: "Critical systems: Failure has severe consequences.\nTypes:\n1. Safety-critical: Failure causes injury/death. Aircraft control, medical devices, nuclear systems.\n2. Mission-critical: Failure causes mission failure. Military systems, spacecraft.\n3. Business-critical: Failure causes major financial loss. Banking, e-commerce.\n\nDifferences from regular systems: Require formal methods, extensive testing, redundancy, fault tolerance, certification (DO-178C for aviation, IEC 61508 for industrial).\nDevelopment cost: 10-100x higher per line of code. Must prove correctness, not just test."},
        {question: "Formal methods in software engineering.", answer: "Formal methods: Mathematically-based techniques for specification, development, and verification of software.\nTypes:\n1. Formal Specification: Z notation, VDM, B-Method. Mathematical notation for requirements.\n2. Model Checking: Exhaustively verify all states of a model against properties. SPIN, NuSMV.\n3. Theorem Proving: Mathematically prove program correctness. Coq, Isabelle.\nAdvantages: Catch ambiguities early, prove correctness.\nDisadvantages: Requires math expertise, expensive, difficult to scale.\nUsed in: Safety-critical systems, security protocols, hardware verification."},
        {question: "Agile manifesto and Scrum framework.", answer: "4 Values: Individuals > processes, Working software > documentation, Customer collaboration > contract negotiation, Responding to change > following plan.\n12 Principles: Customer satisfaction, welcome change, frequent delivery, daily collaboration, motivated individuals, face-to-face, working software as measure, sustainable pace, technical excellence, simplicity, self-organizing teams, reflect and adjust.\n\nScrum: Sprint (2-4 weeks). Roles: Product Owner, Scrum Master, Dev Team.\nArtifacts: Product Backlog, Sprint Backlog, Increment.\nCeremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective."},
        {question: "Software maintenance types.", answer: "1. Corrective: Fix bugs and defects found after deployment. ~20% of maintenance effort.\n2. Adaptive: Modify software for new environment (OS upgrade, database change, new regulations). ~25%.\n3. Perfective: Improve performance, add features based on user feedback. Enhance existing functionality. ~50%.\n4. Preventive: Restructure/optimize code to prevent future problems. Refactoring, documentation updates. ~5%.\n\nMaintenance is 60-80% of total software lifecycle cost.\nLehman's Laws: Software must evolve or become less useful. Complexity increases unless actively managed."}
    ],

    examTips: [
        "SDLC model comparison is the most frequently asked topic — prepare a comparison table",
        "Know SRS structure per IEEE 830 standard — common for descriptive questions",
        "Testing levels and types are guaranteed — understand the differences clearly",
        "UML diagrams (Use case, Class, Sequence) are asked for drawing/explanation",
        "Verification vs Validation distinction is a classic MCQ trap"
    ],

    commonMistakes: [
        "Confusing Verification (process) with Validation (product)",
        "Thinking Waterfall allows going back to previous phases",
        "Mixing up coupling (between modules) and cohesion (within module)",
        "Confusing functional requirements (features) with non-functional (quality)",
        "Not understanding that Spiral model is risk-driven"
    ],

    memoryTricks: [
        "Testing levels: 'U-I-S-A' = Unit, Integration, System, Acceptance",
        "Verification = 'V' = 'Are we building it RIGHT?' | Validation = 'Right product?'",
        "SOLID: Each letter is a principle — 'Single Open Liskov Interface Dependency'",
        "Coupling order: 'Can Computers Calculate Sums Daily?' = Content, Common, Control, Stamp, Data",
        "Maintenance types: 'CAPP' = Corrective, Adaptive, Perfective, Preventive"
    ]
};
