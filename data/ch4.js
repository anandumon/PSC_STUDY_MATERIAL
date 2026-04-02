// Chapter 4: Object Oriented Programming through C++/Java
const CH4 = {
    id: 3,
    title: "Object Oriented Programming (C++/Java)",
    icon: "🧬",
    marks: 12,
    color: "#8b5cf6",
    topics: "Abstraction, Encapsulation, Inheritance, Polymorphism, Templates, Exception Handling, Java Applets, Multithreading",

    overview: {
        importance: "12 marks covering OOP fundamentals applicable to both C++ and Java. Questions test conceptual understanding and code output prediction. Java-specific topics like applets and multithreading are important.",
        weightage: "12 out of 100 marks (12%)",
        focusAreas: [
            "Four pillars of OOP",
            "Inheritance types and virtual functions",
            "Polymorphism (compile-time vs runtime)",
            "Exception handling mechanism",
            "Java multithreading & applet lifecycle",
            "Templates/Generics"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>4.1 Data Abstraction</h4>
<p><strong>Abstraction</strong> is the process of showing only the <em>essential features</em> of an object while hiding the implementation details from the user. It answers the question "WHAT does this do?" without revealing "HOW does it do it?" Think of a TV remote: you know pressing the volume button changes volume, but you don't know (or need to know) the internal circuitry.</p>

<p>Abstraction is achieved through two mechanisms:</p>
<ul>
<li><strong>Abstract Class:</strong> A class that cannot be instantiated directly. In C++, it contains at least one <strong>pure virtual function</strong> (declared with <code>= 0</code>). In Java, it's declared with the <code>abstract</code> keyword and can contain abstract methods (without body) as well as concrete methods (with body). Derived classes MUST implement all pure virtual/abstract methods to be instantiable.
<p><em>When to use:</em> When you want to define a common interface and share some implementation among related classes. Example: <code>Shape</code> with abstract method <code>area()</code> — Circle, Rectangle, Triangle all compute area differently but share the concept.</p></li>
<li><strong>Interface (Java):</strong> A "contract" specifying what methods a class must implement. Before Java 8, ALL methods in an interface were abstract (no body). Java 8+ allows <code>default</code> methods (with body) and <code>static</code> methods. A class can implement <strong>multiple interfaces</strong>, which is Java's solution to the multiple inheritance problem.
<p><em>Key difference from abstract class:</em> An interface defines ONLY the contract (what to do), while an abstract class can define both the contract and partial implementation (how to do some things).</p></li>
<li><strong>Levels of abstraction:</strong> <strong>Data abstraction</strong> hides data representation (using private fields with public getters/setters). <strong>Procedural abstraction</strong> hides the algorithm behind a method name (you call <code>sort()</code> without knowing if it uses quicksort or mergesort).</li>
</ul>

<h4>4.2 Encapsulation</h4>
<p><strong>Encapsulation</strong> is the mechanism of <em>bundling data (variables) and the methods that operate on that data</em> into a single unit (class), while restricting direct access to the internal state. It's the implementation mechanism for data hiding — often called "data wrapping."</p>

<p><strong>Why encapsulation matters:</strong> Without encapsulation, any code anywhere could directly modify an object's data, potentially putting it in an invalid state. Example: a BankAccount with balance = -1000 shouldn't be possible — encapsulation prevents this by forcing all modifications through controlled methods that enforce business rules.</p>

<ul>
<li><strong>Access Specifiers</strong> control who can access what:
    <ul>
    <li><strong>private:</strong> Accessible ONLY within the same class. Most restrictive. Use for internal data that shouldn't be directly modified from outside.</li>
    <li><strong>protected:</strong> Accessible within the same class AND by derived (child) classes. Use for data that subclasses need but external code shouldn't touch.</li>
    <li><strong>public:</strong> Accessible from anywhere. Use for the class's external interface (methods that other code calls).</li>
    <li><strong>default (Java only):</strong> Package-private — accessible within the same package. No keyword needed.</li>
    </ul>
</li>
<li><strong>Getters/Setters:</strong> Public methods that provide controlled access to private data. Setters can include validation logic: <code>setAge(int a) { if(a > 0) this.age = a; }</code></li>
<li><strong>Data Hiding:</strong> A direct consequence of encapsulation — the internal representation of data is hidden from the outside world. External code interacts only through the public interface.</li>
</ul>

<div class="code-block">// C++ Encapsulation Example
class BankAccount {
private:
    double balance;  // hidden data — can't be accessed directly
public:
    BankAccount(double b) : balance(b) {}
    double getBalance() { return balance; }  // controlled read
    void deposit(double amt) {
        if(amt > 0) balance += amt;  // validation before modification
    }
    // No setBalance() — balance can only change through deposit/withdraw
};</div>

<h4>4.3 Classes, Constructors & Destructors</h4>
<p>A <strong>class</strong> is a blueprint/template that defines the structure and behavior of objects. An <strong>object</strong> is a specific instance of a class — it occupies memory and has actual values for the class's variables.</p>

<h5>Constructors</h5>
<p>A constructor is a special method that's called automatically when an object is created. It has the same name as the class, no return type, and its primary purpose is to initialize the object's state.</p>
<ul>
<li><strong>Default Constructor:</strong> Takes no parameters. Initializes members to default values. If you don't write any constructor, the compiler generates one. But if you write ANY constructor, the compiler stops generating the default one.</li>
<li><strong>Parameterized Constructor:</strong> Takes arguments to initialize members with specific values. Multiple parameterized constructors with different parameter lists is called <strong>constructor overloading</strong>.</li>
<li><strong>Copy Constructor:</strong> Creates a new object as a copy of an existing object. In C++: <code>MyClass(const MyClass& other)</code>. Important for objects that manage dynamic memory (to prevent shallow copy problems).</li>
<li><strong>In Java:</strong> No copy constructor by default — you implement it manually or use clone(). Java also has no destructor — the <strong>Garbage Collector (GC)</strong> automatically reclaims memory for unreferenced objects.</li>
</ul>

<h5>Destructors (C++)</h5>
<p>A destructor is called automatically when an object goes out of scope or is explicitly deleted. It's the opposite of a constructor — its job is to clean up (free memory, close files, release locks).</p>
<ul>
<li>Syntax: <code>~ClassName() { }</code> — same name as class with ~ prefix, no parameters, no return type.</li>
<li>Called in reverse order of construction (last created = first destroyed).</li>
<li><strong>Virtual destructor:</strong> If a class is designed to be inherited from and used polymorphically (base pointer pointing to derived object), the destructor MUST be virtual. Otherwise, only the base destructor runs when deleting through a base pointer, causing a <strong>resource leak</strong>.</li>
</ul>

<h4>4.4 Dynamic Memory Allocation in Classes</h4>
<p>When objects manage heap memory (via new/malloc), special care is needed:</p>
<ul>
<li><strong>C++ operators:</strong> <code>new</code> allocates memory AND calls the constructor. <code>delete</code> calls the destructor AND frees memory. For arrays: <code>new int[10]</code> and <code>delete[] arr</code>.</li>
<li><strong>Java:</strong> Only <code>new</code> exists — there's no <code>delete</code>. The Garbage Collector handles deallocation automatically when no more references point to an object. You can suggest GC with <code>System.gc()</code> but it's not guaranteed to run immediately.</li>
<li><strong>Deep Copy vs Shallow Copy:</strong> <strong>Shallow copy</strong> copies only the pointer value — both objects point to the SAME memory. If one object frees it, the other has a dangling pointer (disaster!). <strong>Deep copy</strong> allocates new memory and copies the actual data — each object has its own independent copy. Always use deep copy for objects managing dynamic memory.</li>
<li><strong>Rule of Three (C++):</strong> If your class needs a custom destructor, copy constructor, OR copy assignment operator, it almost certainly needs ALL THREE. This is because if you manage resources, the default compiler-generated versions (which do shallow copies) will cause problems.</li>
</ul>

<h4>4.5 Inheritance</h4>
<p><strong>Inheritance</strong> is the mechanism by which a new class (derived/child) acquires the properties and behaviors of an existing class (base/parent). It promotes code reuse — you don't rewrite common functionality; you inherit it and optionally extend or modify it.</p>

<div class="diagram-block">
Types of Inheritance:

Single:          Multilevel:       Hierarchical:
  A                 A                  A
  |                 |                / | \\
  B                 B              B   C   D
                    |
                    C

Multiple(C++):    Hybrid:
  A    B            A     B
   \\  /             |     |
    C               C     D
                     \\   /
                       E</div>

<ul>
<li><strong>Single Inheritance:</strong> One base, one derived class. Simplest form. <code>class Dog : public Animal {}</code></li>
<li><strong>Multilevel Inheritance:</strong> A chain: Grandparent → Parent → Child (A → B → C). Each class inherits from the one above it.</li>
<li><strong>Hierarchical Inheritance:</strong> One base class, multiple derived classes. The base provides common functionality shared by all derived classes. Example: Shape → Circle, Rectangle, Triangle.</li>
<li><strong>Multiple Inheritance (C++ only):</strong> A class inherits from multiple base classes. <code>class C : public A, public B {}</code>. Java does NOT support multiple class inheritance (to avoid ambiguity), but supports it through interfaces.</li>
<li><strong>Hybrid Inheritance:</strong> A combination of two or more types. Can lead to the <strong>Diamond Problem</strong> — if class D inherits from both B and C, which both inherit from A, then D has TWO copies of A's members. C++ solves this with <strong>virtual inheritance:</strong> <code>class B : virtual public A {}</code>. Java avoids it entirely by prohibiting multiple class inheritance.</li>
</ul>

<p><strong>Inheritance access control in C++:</strong> When inheriting, you specify the access level. Public inheritance preserves the base class's access levels. Protected inheritance makes base public members protected in derived. Private inheritance makes everything private in derived.</p>

<h4>4.6 Polymorphism</h4>
<p><strong>Polymorphism</strong> means "many forms" — the same name/interface exhibits different behavior depending on context. It's what makes OOP truly powerful — you can write code that works with the base type and automatically handles any derived type.</p>

<h5>Compile-Time (Static) Polymorphism</h5>
<p>The compiler decides which function to call at compile time. Achieved through:</p>
<ul>
<li><strong>Function Overloading:</strong> Multiple functions with the SAME name but DIFFERENT parameter lists (number, type, or order of parameters). The compiler selects the correct version based on the arguments passed. <em>Return type alone is NOT sufficient</em> to distinguish overloaded functions. Example: <code>print(int)</code>, <code>print(double)</code>, <code>print(string)</code>.</li>
<li><strong>Operator Overloading (C++):</strong> Redefining the behavior of operators (+, -, ==, <<, etc.) for user-defined types. Example: defining <code>Complex operator+(const Complex& c)</code> to add two complex numbers using the + symbol. Java does NOT support operator overloading (except String concatenation with +).</li>
</ul>

<h5>Runtime (Dynamic) Polymorphism</h5>
<p>The decision of which function to call is made at <em>runtime</em> based on the actual object type, not the pointer/reference type. This is the MORE POWERFUL form of polymorphism.</p>
<ul>
<li><strong>Function Overriding:</strong> A derived class provides a new implementation for a method already defined in the base class. The method signature (name + parameters) must be identical.</li>
<li><strong>Virtual Functions (C++):</strong> Declared with the <code>virtual</code> keyword in the base class. When called through a base pointer/reference, the DERIVED class's version is called (based on the actual object, not the pointer type). Implemented internally using a <strong>vtable (virtual function table)</strong> — each class with virtual functions has a vtable containing pointers to its virtual function implementations.</li>
<li><strong>Java:</strong> All non-static, non-final, non-private methods are <strong>virtual by default</strong> — no keyword needed. This is a major difference from C++.</li>
<li><strong>Pure Virtual Function (C++):</strong> <code>virtual void func() = 0;</code> — no implementation in the base class. Makes the class <strong>abstract</strong> (cannot be instantiated). Equivalent to abstract methods in Java.</li>
</ul>

<div class="code-block">// Runtime Polymorphism
class Shape {
public:
    virtual double area() = 0; // pure virtual → Shape is abstract
};
class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14159 * r * r; }
};
// Usage:
Shape* s = new Circle(5);
s->area(); // Calls Circle::area() at runtime via vtable</div>

<h4>4.7 Generic Classes (Templates/Generics)</h4>
<p>Generics allow you to write code that works with ANY data type without duplicating it. Instead of writing separate Stack classes for int, double, and string, you write ONE generic Stack that works with any type.</p>

<h5>C++ Templates</h5>
<p>C++ uses <strong>templates</strong> — the compiler generates a separate version of the code for each type used (called <strong>template instantiation</strong>). This happens at compile time, so there's no runtime overhead.</p>
<div class="code-block">template &lt;typename T&gt;
class Stack {
    T arr[100];
    int top;
public:
    Stack() : top(-1) {}
    void push(T val) { arr[++top] = val; }
    T pop() { return arr[top--]; }
};
// Usage: Stack&lt;int&gt; s1; Stack&lt;string&gt; s2;</div>

<h5>Java Generics</h5>
<p>Java uses <strong>type erasure</strong> — generic type information is removed at compile time and replaced with Object. This means no code duplication but also means you can't use primitive types directly (use Integer instead of int).</p>
<div class="code-block">class Box&lt;T&gt; {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}
// Usage: Box&lt;Integer&gt; b = new Box&lt;&gt;();
// Type erasure at compile-time</div>

<p><strong>Key differences:</strong> C++ templates work with primitives and generate separate code per type; Java generics use type erasure and work only with objects (need wrapper classes for primitives). C++ templates are more powerful (can do template metaprogramming) but can cause code bloat.</p>

<h4>4.8 Exception Handling</h4>
<p><strong>Exception handling</strong> provides a structured mechanism for dealing with runtime errors (like division by zero, file not found, network failure) without crashing the entire program. It separates error-handling code from normal logic, making programs more robust and readable.</p>
<ul>
<li><strong>try block:</strong> Contains code that might throw an exception. If something goes wrong inside try, execution immediately jumps to the matching catch block.</li>
<li><strong>catch block:</strong> Handles a specific type of exception. Multiple catch blocks can handle different exception types. <em>Order matters:</em> put more specific exceptions before general ones. In C++, <code>catch(...)</code> catches any exception.</li>
<li><strong>finally block (Java):</strong> Executes ALWAYS, regardless of whether an exception occurred or not. Used for cleanup (closing files, releasing resources). C++ uses RAII (Resource Acquisition Is Initialization) pattern instead of finally.</li>
<li><strong>throw/throws:</strong> <code>throw</code> raises an exception. In Java, <code>throws</code> in the method signature declares which checked exceptions the method might throw — callers must handle them.</li>
<li><strong>Java Checked vs Unchecked:</strong>
  <ul>
  <li><strong>Checked exceptions</strong> (subclasses of Exception but not RuntimeException): MUST be handled (try-catch) or declared (throws). Examples: IOException, SQLException. The compiler enforces this.</li>
  <li><strong>Unchecked exceptions</strong> (subclasses of RuntimeException): NOT required to be handled. Indicate programming errors. Examples: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException.</li>
  </ul>
</li>
<li><strong>Custom Exceptions:</strong> Create your own exception classes by extending Exception (checked) or RuntimeException (unchecked) in Java, or std::exception in C++.</li>
</ul>

<h4>4.9 File Processing</h4>
<p>Both C++ and Java provide file I/O capabilities for reading from and writing to files. Understanding file streams and their operations is important for practical coding questions.</p>
<ul>
<li><strong>C++ File I/O:</strong> Uses <code>ifstream</code> (input — reading), <code>ofstream</code> (output — writing), <code>fstream</code> (both). Part of the <code>&lt;fstream&gt;</code> header.</li>
<li><strong>Java File I/O:</strong> <strong>Byte streams:</strong> FileInputStream, FileOutputStream (for binary data). <strong>Character streams:</strong> FileReader, FileWriter (for text). <strong>Buffered:</strong> BufferedReader, BufferedWriter (efficient I/O with internal buffer). <strong>PrintWriter:</strong> Convenient formatted text output.</li>
<li><strong>Serialization (Java):</strong> The process of converting an object's state into a byte stream so it can be saved to a file or transmitted over a network. Implement the <code>Serializable</code> interface (it's a marker interface with no methods). Use <code>ObjectOutputStream</code> to write and <code>ObjectInputStream</code> to read. Mark fields as <code>transient</code> to exclude them from serialization.</li>
</ul>

<h4>4.10 Java Applets</h4>
<p>Applets are small Java programs designed to be embedded in web pages and run inside a browser. Though <strong>deprecated</strong> since Java 9, they remain in the syllabus and are frequently tested.</p>
<ul>
<li><strong>Lifecycle methods</strong> (called automatically by the browser in this order):
  <ol>
  <li><code>init()</code>: Called ONCE when applet is first loaded. Initialize variables, load images, set layout.</li>
  <li><code>start()</code>: Called each time the applet becomes visible (page loaded or revisited). Start threads, begin animation.</li>
  <li><code>paint(Graphics g)</code>: Called whenever the applet needs to be drawn/redrawn. All drawing code goes here.</li>
  <li><code>stop()</code>: Called when user leaves the page. Pause threads and animation.</li>
  <li><code>destroy()</code>: Called once when applet is unloaded. Final cleanup.</li>
  </ol>
</li>
<li><strong>Applet class:</strong> Extends <code>java.applet.Applet</code> (AWT) or <code>javax.swing.JApplet</code> (Swing).</li>
<li><strong>Graphics methods:</strong> drawString(), drawLine(), drawRect(), drawOval(), fillRect(), fillOval(), setColor(), setFont().</li>
<li><strong>Repainting:</strong> Call <code>repaint()</code> to request a screen update → this calls <code>update()</code> → which calls <code>paint()</code>.</li>
</ul>

<div class="diagram-block">
APPLET LIFECYCLE:
┌──────┐   ┌───────┐   ┌───────┐   ┌──────┐   ┌─────────┐
│ init │──▶│ start │──▶│ paint │──▶│ stop │──▶│ destroy │
└──────┘   └───┬───┘   └───────┘   └──┬───┘   └─────────┘
               │                       │
               └──────◀────────────────┘
               (Applet revisited)</div>

<h4>4.11 Java Features</h4>
<p>Java has several distinctive features that differentiate it from C++:</p>
<ul>
<li><strong>Platform Independent (WORA):</strong> "Write Once, Run Anywhere." Java code compiles to platform-neutral <strong>bytecode</strong> (.class files), not native machine code. The JVM (Java Virtual Machine) on each platform interprets/JIT-compiles the bytecode. This is why Java runs on Windows, Linux, Mac, and Android without recompilation.</li>
<li><strong>Compilation process:</strong> <code>.java</code> (source) → <code>javac</code> compiler → <code>.class</code> (bytecode) → JVM → machine code. The bytecode is the key to portability.</li>
<li><strong>Strongly Typed:</strong> Every variable must have a declared type, and type checking is strict. Prevents many common errors at compile time.</li>
<li><strong>Automatic Garbage Collection:</strong> The JVM automatically reclaims memory from objects that are no longer referenced. Eliminates memory leaks and dangling pointers that plague C/C++ programs.</li>
<li><strong>No multiple inheritance of classes:</strong> Java deliberately omits this C++ feature — it uses interfaces instead to achieve similar flexibility without the diamond problem.</li>
<li><strong>No pointers:</strong> Java has references (which are safer than pointers) instead of raw memory pointers. You can't do pointer arithmetic, which eliminates an entire class of bugs.</li>
<li><strong>Built-in multithreading:</strong> Unlike C++, Java has built-in language support for creating and managing threads.</li>
</ul>

<h4>4.12 Java Special Classes</h4>
<p>Java provides several utility classes that are frequently tested in exams:</p>
<ul>
<li><strong>Wrapper Classes:</strong> Integer, Double, Character, Boolean, Float, Long, Short, Byte. These "wrap" primitive types as objects, needed because Java collections (like ArrayList) can only hold objects, not primitives.</li>
<li><strong>Autoboxing/Unboxing:</strong> Java automatically converts between primitives and their wrapper classes. <code>Integer num = 42;</code> (autoboxing: int → Integer). <code>int x = num;</code> (unboxing: Integer → int). This happens transparently in method calls, assignments, and expressions.</li>
<li><strong>String:</strong> Immutable in Java — once created, cannot be changed. Operations like concatenation create new String objects. Use <code>StringBuilder</code> for mutable strings (not thread-safe) or <code>StringBuffer</code> (thread-safe but slower).</li>
<li><strong>Vector:</strong> Dynamic array, synchronized (thread-safe), legacy collection class. Replaced by ArrayList in modern Java (not synchronized, faster).</li>
<li><strong>Stack:</strong> Extends Vector, provides LIFO operations (push, pop, peek). Legacy class — use Deque in modern Java.</li>
<li><strong>StringTokenizer:</strong> Breaks a string into tokens based on delimiters. Legacy — modern Java uses String.split() or Scanner.</li>
</ul>

<h4>4.13 Java Multithreading</h4>
<p><strong>Multithreading</strong> allows concurrent execution of multiple threads within a single program. This is crucial for responsive GUIs, server applications handling multiple clients, and leveraging multi-core processors.</p>
<ul>
<li><strong>Thread Creation</strong> — two ways:
  <ol>
  <li><strong>Extend Thread class:</strong> <code>class MyThread extends Thread { public void run() {...} }</code>. Start with <code>new MyThread().start()</code>. Limitation: Java doesn't allow multiple class inheritance, so your class can't extend anything else.</li>
  <li><strong>Implement Runnable interface:</strong> <code>class MyTask implements Runnable { public void run() {...} }</code>. Start with <code>new Thread(new MyTask()).start()</code>. <em>Preferred approach</em> because it allows extending other classes.</li>
  </ol>
</li>
<li><strong>Thread States:</strong> New (created but not started), Runnable (ready to run, waiting for CPU), Running (actively executing), Blocked/Waiting (waiting for a lock, I/O, or signal), Terminated (run() method completed or exception thrown).</li>
<li><strong>Important Thread methods:</strong>
  <ul>
  <li><code>start()</code>: Begins thread execution (calls run() in new thread).</li>
  <li><code>run()</code>: Contains the actual task code — don't call directly (that runs it in the CURRENT thread).</li>
  <li><code>sleep(ms)</code>: Pauses current thread for specified milliseconds. Throws InterruptedException.</li>
  <li><code>join()</code>: Current thread waits until the specified thread completes.</li>
  <li><code>yield()</code>: Hints the scheduler to let other threads run (not guaranteed).</li>
  <li><code>interrupt()</code>: Interrupts a waiting/sleeping thread.</li>
  </ul>
</li>
<li><strong>Synchronization:</strong> The <code>synchronized</code> keyword prevents race conditions by ensuring only one thread can execute a synchronized method/block at a time. Each object has an intrinsic lock (monitor) — a thread must acquire this lock before entering a synchronized section.</li>
<li><strong>Inter-thread communication:</strong> <code>wait()</code> (releases lock and waits), <code>notify()</code> (wakes up one waiting thread), <code>notifyAll()</code> (wakes up all waiting threads). Must be called from within a synchronized context.</li>
<li><strong>Thread priorities:</strong> MIN_PRIORITY = 1, NORM_PRIORITY = 5 (default), MAX_PRIORITY = 10. Higher priority threads get more CPU time, but it's not guaranteed (depends on the OS scheduler).</li>
</ul>

<h4>4.14 Java I/O & GUI Classes</h4>
<ul>
<li><strong>I/O Streams:</strong> Java I/O is built on the concept of streams:
  <ul>
  <li><strong>Byte streams:</strong> InputStream/OutputStream hierarchy — for raw binary data (images, audio).</li>
  <li><strong>Character streams:</strong> Reader/Writer hierarchy — for text data (automatically handles character encoding).</li>
  <li><strong>Buffered I/O:</strong> BufferedReader (readLine()), BufferedWriter — wrap other streams to buffer I/O for efficiency (fewer actual disk/network calls).</li>
  </ul>
</li>
<li><strong>GUI (AWT/Swing):</strong>
  <ul>
  <li><strong>AWT (Abstract Window Toolkit):</strong> Original Java GUI toolkit. Heavyweight — uses native OS components. Classes: Frame, Panel, Button, Label, TextField, TextArea.</li>
  <li><strong>Swing:</strong> Newer, lightweight (pure Java rendering). More consistent across platforms. Classes start with J: JFrame, JPanel, JButton, JLabel. <em>Extends and replaces AWT.</em></li>
  </ul>
</li>
<li><strong>Event Handling:</strong> Java uses the <strong>delegation event model</strong>. Events (button click, key press, mouse move) are generated by <strong>source</strong> objects and handled by <strong>listener</strong> objects. Listeners implement specific interfaces: ActionListener (button clicks), MouseListener (mouse events), KeyListener (keyboard events). Use anonymous inner classes or lambda expressions (Java 8+) for concise event handling.</li>
</ul>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">FOUR PILLARS OF OOP:
1. Abstraction — Hide complexity, show essentials
2. Encapsulation — Bundle data + methods, control access
3. Inheritance — Reuse code from parent class
4. Polymorphism — Same interface, different behavior</div>

<div class="formula-box">INHERITANCE ACCESS:
           | private | protected | public
Base priv  | No      | No        | No
Base prot  | private | protected | protected
Base pub   | private | protected | public</div>

<div class="formula-box">JAVA THREAD PRIORITY:
• MIN_PRIORITY = 1
• NORM_PRIORITY = 5 (default)
• MAX_PRIORITY = 10
• Higher priority = more CPU time (not guaranteed)</div>

<div class="formula-box">EXCEPTION HIERARCHY:
Throwable
├── Error (JVM errors, not catchable normally)
│   ├── OutOfMemoryError
│   └── StackOverflowError
└── Exception
    ├── Checked (IOException, SQLException)
    └── RuntimeException (Unchecked)
        ├── NullPointerException
        ├── ArrayIndexOutOfBoundsException
        └── ArithmeticException</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
OOP CONCEPTS OVERVIEW:
┌─────────────────────────────────────────────┐
│              OBJECT-ORIENTED                │
│              PROGRAMMING                    │
├──────────┬──────────┬──────────┬────────────┤
│ABSTRACTION│ENCAPSUL-│INHERIT- │POLYMORPHISM│
│          │ATION    │ANCE     │            │
│Hide impl.│Bundle   │Reuse    │Many forms  │
│Show essen│data+fn  │parent   │Same name   │
│          │Control  │code     │Diff behav  │
│Abstract  │access   │extends/ │Overload/   │
│class/    │private/ │implements│Override    │
│Interface │public   │         │            │
└──────────┴──────────┴──────────┴────────────┘</div>

<div class="diagram-block">
JAVA COMPILATION & EXECUTION:
┌──────────┐   javac   ┌──────────┐   JVM    ┌──────────┐
│ .java    │─────────▶│ .class   │────────▶│ Machine  │
│ Source   │ compiler │ Bytecode │interpret│ Code     │
└──────────┘          └──────────┘         └──────────┘
                                    │
                              ┌─────┴─────┐
                              │ ANY OS    │
                              │ with JVM  │
                              └───────────┘</div>

<div class="diagram-block">
THREAD LIFECYCLE:
┌─────┐  start()  ┌──────────┐  scheduler  ┌─────────┐
│ NEW │──────────▶│ RUNNABLE │────────────▶│ RUNNING │
└─────┘           └──────────┘             └────┬────┘
                       ▲                        │
                       │         sleep()/wait() │
                       │         ┌──────────────▼──┐
                    notify()     │ BLOCKED/WAITING  │
                       │         └─────────────────┘
                       │                   │
                       └───────────────────┘
                                │ run() completes
                         ┌──────▼──────┐
                         │ TERMINATED  │
                         └─────────────┘</div>
`,

    examples: [
        {title:"Constructor Overloading", question:"Show constructor overloading in C++.", solution:"class Rectangle {\n  int w, h;\npublic:\n  Rectangle() : w(0), h(0) {}           // Default\n  Rectangle(int s) : w(s), h(s) {}       // Square\n  Rectangle(int w, int h) : w(w), h(h){} // Full\n  int area() { return w * h; }\n};\nRectangle r1;        // 0×0\nRectangle r2(5);     // 5×5\nRectangle r3(3, 7);  // 3×7"},
        {title:"Virtual Function", question:"Demonstrate runtime polymorphism.", solution:"class Animal {\npublic:\n  virtual void speak() { cout << \"...\"; }\n};\nclass Dog : public Animal {\npublic:\n  void speak() override { cout << \"Woof!\"; }\n};\nclass Cat : public Animal {\npublic:\n  void speak() override { cout << \"Meow!\"; }\n};\nAnimal* a = new Dog(); a->speak(); // Woof!\na = new Cat(); a->speak();          // Meow!"},
        {title:"Java Interface", question:"Implement an interface in Java.", solution:"interface Drawable {\n  void draw();\n  default void color() { System.out.println(\"Blue\"); }\n}\nclass Circle implements Drawable {\n  public void draw() {\n    System.out.println(\"Drawing Circle\");\n  }\n}\n// Circle c = new Circle(); c.draw(); c.color();"},
        {title:"Exception Handling", question:"Write Java code with try-catch-finally.", solution:"try {\n  int[] arr = {1, 2, 3};\n  System.out.println(arr[5]); // Exception!\n} catch (ArrayIndexOutOfBoundsException e) {\n  System.out.println(\"Index out of bounds: \" + e);\n} catch (Exception e) {\n  System.out.println(\"General error: \" + e);\n} finally {\n  System.out.println(\"Always executes\");\n}\n// Output: Index out of bounds... \\n Always executes"},
        {title:"Java Thread", question:"Create a thread using Runnable interface.", solution:"class MyTask implements Runnable {\n  public void run() {\n    for(int i=0; i<5; i++)\n      System.out.println(Thread.currentThread().getName()+\": \"+i);\n  }\n}\nThread t1 = new Thread(new MyTask(), \"T1\");\nThread t2 = new Thread(new MyTask(), \"T2\");\nt1.start(); t2.start();\n// Both threads execute concurrently"},
        {title:"Template Function", question:"Write a C++ template function to find maximum of two values.", solution:"template <typename T>\nT findMax(T a, T b) {\n  return (a > b) ? a : b;\n}\n// Usage:\nfindMax(10, 20);      // returns 20\nfindMax(3.14, 2.71);  // returns 3.14\nfindMax('a', 'z');    // returns 'z'"},
        {title:"Diamond Problem", question:"Explain diamond problem and its solution in C++.", solution:"class A { public: int data; };\nclass B : virtual public A {};  // virtual inheritance\nclass C : virtual public A {};  // virtual inheritance\nclass D : public B, public C {};\nWithout 'virtual': D has TWO copies of A::data (ambiguous)\nWith 'virtual': D has ONE shared copy of A::data"},
        {title:"Java Wrapper Classes", question:"Demonstrate autoboxing and unboxing in Java.", solution:"// Autoboxing: primitive → Wrapper\nInteger num = 42;    // int 42 → Integer object\nDouble d = 3.14;     // double → Double object\n\n// Unboxing: Wrapper → primitive\nint x = num;         // Integer → int\ndouble y = d;        // Double → double\n\n// Collections require objects:\nArrayList<Integer> list = new ArrayList<>();\nlist.add(10);  // autoboxing\nint val = list.get(0);  // unboxing"},
        {title:"Java Applet", question:"Write a simple Java applet that displays text.", solution:"import java.applet.Applet;\nimport java.awt.Graphics;\nimport java.awt.Color;\n\npublic class HelloApplet extends Applet {\n  public void init() { setBackground(Color.CYAN); }\n  public void paint(Graphics g) {\n    g.setColor(Color.RED);\n    g.drawString(\"Hello PSC Exam!\", 50, 50);\n    g.drawRect(40, 30, 200, 40);\n  }\n}\n// HTML: <applet code=\"HelloApplet\" width=300 height=200></applet>"},
        {title:"Operator Overloading", question:"Overload + operator for a Complex number class in C++.", solution:"class Complex {\n  double real, imag;\npublic:\n  Complex(double r=0, double i=0) : real(r), imag(i) {}\n  Complex operator+(const Complex& c) {\n    return Complex(real+c.real, imag+c.imag);\n  }\n  void display() { cout << real << \"+\" << imag << \"i\"; }\n};\nComplex c1(3,4), c2(1,2);\nComplex c3 = c1 + c2;  // 4+6i"}
    ],

    practiceQuestions: [
        {question: "Explain the four pillars of OOP with real-world examples.", answer: "1. Encapsulation: Bundle data + methods, hide internals. Example: Bank account — balance is private, access via deposit/withdraw.\n2. Abstraction: Show essential features, hide complexity. Example: Car steering — you turn wheel, don't care about rack & pinion.\n3. Inheritance: Derive new class from existing. Example: Vehicle → Car, Bike.\n4. Polymorphism: Same interface, different behaviors. Example: Shape.area() — Circle calculates πr², Rectangle does l×w."},
        {question: "Difference between abstraction and encapsulation.", answer: "Abstraction: WHAT the object does. Design-level concept. Achieved through abstract classes/interfaces. Hides complexity from user.\nEncapsulation: HOW it's protected. Implementation-level concept. Achieved through access modifiers (private/protected). Hides data from outside.\nExample: ATM is abstraction (you see withdraw/deposit). Encapsulation is the private variables inside that prevent direct access."},
        {question: "Compare constructors and destructors in C++.", answer: "Constructor: Called when object is created. Initializes data. Can be overloaded. Same name as class. No return type.\nTypes: Default, Parameterized, Copy constructor.\nDestructor: Called when object is destroyed. Cleans up resources (close files, free memory). ~ClassName(). Cannot be overloaded. Only one per class.\nOrder: Constructor called in creation order; Destructor in reverse order."},
        {question: "Explain deep copy vs shallow copy.", answer: "Shallow copy: Copies pointer values — both objects point to SAME memory. Default behavior of assignment operator.\nProblem: If one deletes the memory, other has dangling pointer.\n\nDeep copy: Allocates NEW memory and copies actual data. Both objects have independent copies.\nImplement via: Copy constructor and overloaded assignment operator.\nRule of Three: If you define destructor, copy constructor, or assignment operator — define all three."},
        {question: "What is the diamond problem? How do C++ and Java resolve it?", answer: "Diamond problem: Class D inherits from B and C, both inherit from A. D gets two copies of A's members — ambiguity.\nC++ solution: Virtual inheritance — 'class B : virtual public A'. Ensures only one copy of A.\nJava solution: Java doesn't allow multiple class inheritance. Uses interfaces instead (a class can implement multiple interfaces). Default methods in interfaces can cause diamond, resolved with explicit override."},
        {question: "Function overloading vs function overriding.", answer: "Overloading (Compile-time polymorphism):\n- Same name, different parameters\n- Same class\n- Resolved at compile time\n- Example: add(int), add(double), add(int,int)\n\nOverriding (Runtime polymorphism):\n- Same name AND same parameters\n- Parent-child classes\n- Resolved at runtime using vtable\n- Requires 'virtual' keyword in C++, '@Override' in Java"},
        {question: "Pure virtual functions and abstract classes.", answer: "Pure virtual function: virtual void draw() = 0; — no implementation in base class. Forces derived classes to implement it.\nAbstract class: Contains at least one pure virtual function. Cannot be instantiated directly — only through derived classes.\nUse: Define interface/contract that all subclasses must follow.\nJava equivalent: abstract method in abstract class, or interface methods."},
        {question: "Write C++ program demonstrating multiple inheritance.", answer: "class Printable { public: void print() { cout << \"Printing\"; } };\nclass Scannable { public: void scan() { cout << \"Scanning\"; } };\nclass Copier : public Printable, public Scannable {\npublic:\n    void copy() { print(); scan(); cout << \"Copying\"; }\n};\nint main() { Copier c; c.print(); c.scan(); c.copy(); }"},
        {question: "Explain virtual destructor.", answer: "Without virtual destructor, deleting derived object through base pointer only calls base destructor — memory leak!\nclass Base { public: virtual ~Base() { } };\nclass Derived : public Base { int* data; public: ~Derived() { delete data; } };\nBase* ptr = new Derived(); delete ptr; // Correctly calls ~Derived() then ~Base()\nRule: If a class has virtual functions, it MUST have a virtual destructor."},
        {question: "C++ templates vs Java generics.", answer: "C++ Templates: Code generation at compile time. Creates separate copy for each type (code bloat). Works with primitives. No type erasure.\nJava Generics: Type erasure at compile time — uses Object at runtime. No separate copies. Cannot use primitives (use Integer, not int). Type checks at compile time only.\nC++ is more powerful (template metaprogramming); Java is simpler but more limited."},
        {question: "Checked vs unchecked exceptions in Java.", answer: "Checked (Compile-time): Must be caught or declared (throws). Compiler enforces handling.\nExamples: IOException, SQLException, FileNotFoundException.\n\nUnchecked (Runtime): Not required to handle. Extend RuntimeException.\nExamples: NullPointerException, ArrayIndexOutOfBoundsException, ArithmeticException.\n\nRule of thumb: Checked for recoverable errors (file not found), Unchecked for programming errors (null reference)."},
        {question: "Write Java Observer pattern implementation.", answer: "interface Observer { void update(String msg); }\ninterface Subject { void addObserver(Observer o); void notifyAll(String msg); }\nclass NewsChannel implements Observer {\n    public void update(String msg) { System.out.println(\"News: \" + msg); }\n}\nclass NewsAgency implements Subject {\n    List<Observer> observers = new ArrayList<>();\n    public void addObserver(Observer o) { observers.add(o); }\n    public void notifyAll(String msg) { for(Observer o : observers) o.update(msg); }\n}"},
        {question: "Compare Vector and ArrayList in Java.", answer: "ArrayList: Not synchronized (not thread-safe). Faster in single-threaded. Grows by 50% when full.\nVector: Synchronized (thread-safe). Slower due to synchronization overhead. Grows by 100% (doubles). Legacy class.\nBoth: Implement List, use dynamic array internally, allow random access O(1).\nPreference: Use ArrayList + explicit synchronization when needed. Vector is legacy."},
        {question: "Explain Java garbage collection.", answer: "GC automatically reclaims memory of unreferenced objects. No explicit delete/free.\nProcess: 1) Mark — identify live objects from GC roots (stack, static vars). 2) Sweep — remove unmarked objects. 3) Compact — defragment memory.\nGenerations: Young (Eden + Survivor), Old (Tenured), Permanent/Metaspace.\nAlgorithms: Serial, Parallel, CMS, G1, ZGC.\nCannot be forced — System.gc() is only a suggestion. finalize() called before collection (deprecated)."},
        {question: "Wrapper classes and why needed in Java.", answer: "Wrapper classes: Integer, Double, Character, Boolean — wrap primitives as objects.\nNeeded because: 1) Collections (ArrayList, HashMap) only work with objects, not primitives.\n2) Null values — primitives can't be null, wrappers can.\n3) Utility methods — Integer.parseInt(), Double.toString().\nAutoboxing: int → Integer (automatic). Unboxing: Integer → int (automatic).\nCaution: Autoboxing creates objects — avoid in tight loops for performance."},
        {question: "Describe the applet lifecycle.", answer: "init(): Called once when applet loads. Initialize variables, load images.\nstart(): Called when applet becomes visible (after init, or when user returns to page).\nstop(): Called when applet becomes invisible (user leaves page). Pause threads.\ndestroy(): Called when browser closes. Clean up resources.\npaint(Graphics g): Called whenever applet needs to be drawn.\nNote: Applets are deprecated since Java 9. Replaced by JavaFX, web technologies."},
        {question: "Write multithreaded producer-consumer in Java.", answer: "Use synchronized + wait/notify:\nclass Buffer {\n    Queue<Integer> q = new LinkedList<>();\n    int capacity;\n    synchronized void produce(int val) {\n        while (q.size() == capacity) wait();\n        q.add(val); notifyAll();\n    }\n    synchronized int consume() {\n        while (q.isEmpty()) wait();\n        int val = q.poll(); notifyAll(); return val;\n    }\n}\nModern: Use BlockingQueue (handles synchronization automatically)."},
        {question: "Explain synchronized keyword in Java.", answer: "synchronized provides mutual exclusion — only one thread can execute synchronized code on an object at a time.\nMethod level: synchronized void method() { } — lock on 'this' object.\nBlock level: synchronized(lockObj) { } — lock on specific object. More granular.\nStatic: synchronized static void method() { } — lock on Class object.\nMonitor: Each object has a monitor. Thread acquires monitor → enters critical section → releases on exit.\nReentrant: Thread that holds lock can re-enter synchronized blocks on same object."},
        {question: "What is serialization in Java?", answer: "Serialization: Converting object state to byte stream (for storage/network transfer).\nImplement Serializable interface (marker interface — no methods).\nObjectOutputStream.writeObject(obj) — serialize\nObjectInputStream.readObject() — deserialize\ntransient keyword: Fields marked transient are NOT serialized (passwords, temp data).\nserialVersionUID: Version control for serialized classes.\nUse cases: Session persistence, distributed systems (RMI), caching."},
        {question: "Compare C++ and Java.", answer: "Memory: C++ manual (new/delete). Java automatic (GC).\nInheritance: C++ multiple class inheritance. Java single class + multiple interfaces.\nPointers: C++ has pointers. Java has references (no pointer arithmetic).\nPlatform: C++ compiled to native code (platform-specific). Java compiled to bytecode (platform-independent via JVM).\nOther: C++ has operator overloading, templates. Java has built-in threading, richer standard library.\nC++ for system programming, games. Java for enterprise, Android, web services."}
    ],

    examTips: [
        "Know the four OOP pillars with examples — guaranteed question",
        "Understand virtual functions and vtable concept for C++",
        "Java applet lifecycle is a common direct-recall question",
        "Thread states and synchronization are high-probability topics",
        "Practice output prediction for inheritance and polymorphism code"
    ],

    commonMistakes: [
        "Confusing overloading (compile-time) with overriding (runtime)",
        "Forgetting that Java doesn't support multiple inheritance of classes",
        "Not understanding that abstract class CAN have constructors",
        "Thinking final method means abstract — final prevents overriding",
        "Forgetting super() call in derived class constructor"
    ],

    memoryTricks: [
        "OOP Pillars: 'A PIE' = Abstraction, Polymorphism, Inheritance, Encapsulation",
        "Inheritance types: 'SMMHH' = Single, Multilevel, Multiple, Hierarchical, Hybrid",
        "Applet lifecycle: 'I Start Painting, Stop Destroying' = init, start, paint, stop, destroy",
        "Thread: 'New Ready Running Blocked Terminated' = same as process states!",
        "Access: 'PriPrPu' = Private (class), Protected (subclass), Public (everyone)"
    ]
};
