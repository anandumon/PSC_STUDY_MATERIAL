// Chapter 6: Client Server Architecture & Web Programming
const CH6 = {
    id: 5,
    title: "Client Server Architectures & Web Programming",
    icon: "🌐",
    marks: 12,
    color: "#f43f5e",
    topics: "2-tier, 3-tier Architecture, HTML, XML, CSS, JavaScript, VBScript, PHP, JSP, ASP.NET, AJAX, SignalR",

    overview: {
        importance: "12 marks covering web technologies end-to-end. Very practical chapter — questions on HTML/CSS/JS are straightforward scoring. Server-side scripting (PHP, JSP, ASP.NET) requires basic understanding.",
        weightage: "12 out of 100 marks (12%)",
        focusAreas: [
            "Two-tier vs Three-tier architecture",
            "HTML tags and forms",
            "CSS selectors and properties",
            "JavaScript basics and DOM",
            "Server-side scripting concepts",
            "AJAX and real-time (SignalR)"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>6.1 Two-Tier Client Server Architecture</h4>
<p>In a <strong>two-tier architecture</strong>, the application is divided into just two layers: the client and the database server. The client directly communicates with the database — there's no intermediary.</p>
<ul>
<li><strong>Client (Tier 1):</strong> Handles both the <em>user interface</em> AND the <em>business logic</em>. This is called a "fat client" or "thick client" because it does most of the work. The client application (e.g., a desktop app) contains the code that processes data, validates input, applies business rules, AND renders the UI.</li>
<li><strong>Server (Tier 2):</strong> Only the database server — it manages data storage, retrieval, and integrity (running SQL queries, enforcing constraints).</li>
<li><strong>Communication:</strong> Client sends SQL queries directly to the database and receives result sets back over a database-specific protocol (like JDBC, ODBC).</li>
<li><strong>Pros:</strong> Simple to develop for small applications, fast for few users (direct connection), good for single-user or LAN applications.</li>
<li><strong>Cons:</strong> Poor scalability (each client maintains its own database connection), business logic duplication (if multiple clients exist), security concerns (SQL injection if business logic is exposed), difficult maintenance (updates must be deployed to every client machine), thick client requires installation on each computer.</li>
</ul>

<div class="diagram-block">
TWO-TIER ARCHITECTURE:
┌─────────────┐          ┌─────────────┐
│   CLIENT    │          │  DATABASE   │
│ ┌─────────┐ │  SQL     │   SERVER    │
│ │   UI    │ │◀────────▶│ ┌─────────┐ │
│ ├─────────┤ │ Results  │ │  DBMS   │ │
│ │Business │ │          │ └─────────┘ │
│ │ Logic   │ │          │             │
│ └─────────┘ │          └─────────────┘
└─────────────┘
  Tier 1 (Fat Client)      Tier 2</div>

<h4>6.2 Three-Tier Client Server Architecture</h4>
<p>The <strong>three-tier architecture</strong> adds a middle layer that separates business logic from both the client and the database. This is the standard architecture for modern web applications.</p>
<ul>
<li><strong>Presentation Tier (Tier 1):</strong> The client — typically a web browser. It handles ONLY the user interface. HTML/CSS/JS render the pages. This is a "thin client" because it does minimal processing — just displays what the server sends.</li>
<li><strong>Application/Logic Tier (Tier 2):</strong> The web/application server. Contains ALL business logic — form validation, data processing, calculation, workflow management. Technologies: PHP, JSP, ASP.NET, Node.js. This is the "brain" of the system.</li>
<li><strong>Data Tier (Tier 3):</strong> The database server. Stores and retrieves data. Only communicates with the application tier, never directly with the client. Technologies: MySQL, PostgreSQL, Oracle, SQL Server.</li>
<li><strong>Pros:</strong> <strong>Scalability</strong> (add more app servers to handle more users), <strong>Security</strong> (clients never touch the database directly), <strong>Maintainability</strong> (change business logic without touching clients), <strong>Thin client</strong> (only needs a browser), <strong>Reusability</strong> (same logic serves web, mobile, API clients).</li>
<li><strong>Cons:</strong> More complex architecture, higher initial development cost, requires network for every operation (latency).</li>
</ul>

<div class="diagram-block">
THREE-TIER ARCHITECTURE:
┌──────────┐     ┌──────────────┐     ┌──────────┐
│  CLIENT  │     │  APPLICATION │     │ DATABASE │
│ (Browser)│     │   SERVER     │     │  SERVER  │
│          │     │              │     │          │
│   UI     │◀──▶│Business Logic│◀──▶│   DBMS   │
│  (HTML/  │HTTP │  (PHP/JSP/  │ SQL │ (MySQL/  │
│   CSS/JS)│     │  ASP.NET)   │     │  Oracle) │
└──────────┘     └──────────────┘     └──────────┘
  Tier 1           Tier 2              Tier 3
(Thin Client)   (Middle Tier)       (Data Tier)</div>

<h4>6.3 Web Servers</h4>
<p>A <strong>web server</strong> is software that accepts HTTP requests from clients (browsers) and serves HTTP responses (web pages, data). It's the gateway between the client's browser and the application:</p>
<ul>
<li><strong>Apache HTTP Server:</strong> The most widely used open-source web server. Cross-platform (Linux, Windows, Mac). Highly configurable with modules (.htaccess). Used with PHP (via mod_php).</li>
<li><strong>IIS (Internet Information Services):</strong> Microsoft's web server, tightly integrated with Windows Server and ASP.NET. Best choice for .NET applications.</li>
<li><strong>Nginx:</strong> High-performance, event-driven web server. Excellent as a <strong>reverse proxy</strong> and <strong>load balancer</strong>. Handles many concurrent connections efficiently. Often used in front of application servers.</li>
<li><strong>Tomcat (Apache Tomcat):</strong> Not a general-purpose web server — it's a <strong>Java servlet container</strong> that runs JSP and Java Servlets. Implements Java EE web specifications.</li>
<li><strong>Core functions:</strong> Handle HTTP requests/responses, serve static files (HTML, CSS, JS, images), route requests to server-side scripts, manage sessions and cookies, handle SSL/TLS encryption, logging and access control.</li>
</ul>

<h4>6.4 HTML (HyperText Markup Language)</h4>
<p><strong>HTML</strong> is the standard markup language for creating web pages. It defines the <em>structure and content</em> of a web page using <strong>tags</strong>. HTML is NOT a programming language — it doesn't have logic, loops, or variables. It simply describes what elements should appear and in what order.</p>

<h5>Essential Tags</h5>
<div class="code-block">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Heading&lt;/h1&gt; to &lt;h6&gt;
    &lt;p&gt;Paragraph&lt;/p&gt;
    &lt;a href="url"&gt;Link&lt;/a&gt;
    &lt;img src="img.jpg" alt="desc"&gt;
    &lt;table&gt;&lt;tr&gt;&lt;th&gt;Header&lt;/th&gt;&lt;td&gt;Data&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
    &lt;form action="/submit" method="POST"&gt;
        &lt;input type="text" name="name"&gt;
        &lt;input type="submit" value="Send"&gt;
    &lt;/form&gt;
    &lt;ul&gt;&lt;li&gt;Unordered&lt;/li&gt;&lt;/ul&gt;
    &lt;ol&gt;&lt;li&gt;Ordered&lt;/li&gt;&lt;/ol&gt;
    &lt;div&gt;Block container&lt;/div&gt;
    &lt;span&gt;Inline container&lt;/span&gt;
&lt;/body&gt;
&lt;/html&gt;</div>
<p><strong>Semantic HTML5 tags:</strong> &lt;header&gt;, &lt;footer&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;section&gt;, &lt;article&gt;, &lt;aside&gt;. These give meaning to the structure (vs generic &lt;div&gt;). Important for accessibility and SEO.</p>

<p><strong>Form input types:</strong> text, password, email, number, date, checkbox, radio, file, hidden, submit, reset, button. HTML5 added: color, range, search, url, tel.</p>

<h4>6.5 XML (eXtensible Markup Language)</h4>
<p><strong>XML</strong> is a markup language designed to <em>store and transport data</em>, NOT to display it (that's HTML's job). XML uses custom, self-describing tags that you define yourself. It's platform and language independent, making it ideal for data exchange between different systems.</p>
<ul>
<li><strong>Self-describing:</strong> Tags describe the data: <code>&lt;price&gt;599&lt;/price&gt;</code> — you know it's a price without documentation.</li>
<li><strong>Well-formed rules:</strong> Must have a single root element, tags properly nested, case-sensitive (unlike HTML), all tags must be closed, attribute values must be quoted.</li>
<li><strong>DTD (Document Type Definition):</strong> Defines the valid structure of an XML document — what elements can appear, their order, and attributes. Internal or external.</li>
<li><strong>XML Schema (XSD):</strong> More powerful alternative to DTD — supports data types, namespaces, and more complex constraints. Written in XML itself.</li>
<li><strong>HTML vs XML:</strong> HTML has predefined tags, is case-insensitive, and is for display. XML has custom tags, is case-sensitive, and is for data storage/transport.</li>
</ul>

<h4>6.6 Style Sheets (CSS)</h4>
<p><strong>CSS (Cascading Style Sheets)</strong> controls the <em>visual presentation</em> of HTML elements — colors, fonts, sizes, spacing, layout, animations. The "cascading" refers to the priority rules that determine which styles apply when multiple rules target the same element.</p>

<h5>Types of CSS</h5>
<ul>
<li><strong>Inline:</strong> <code>style="..."</code> attribute directly on the element. Highest specificity but worst maintainability — avoid for real projects.</li>
<li><strong>Internal (Embedded):</strong> <code>&lt;style&gt;</code> tag in the <code>&lt;head&gt;</code>. Good for single-page styles.</li>
<li><strong>External:</strong> Separate .css file linked with <code>&lt;link rel="stylesheet" href="styles.css"&gt;</code>. Best practice — separation of concerns, cacheable, reusable across pages.</li>
</ul>

<h5>Selectors</h5>
<p>Selectors determine WHICH elements a CSS rule applies to:</p>
<ul>
<li><strong>Element:</strong> <code>p { }</code> — all paragraphs. <strong>Class:</strong> <code>.cls { }</code> — all elements with class="cls". <strong>ID:</strong> <code>#id { }</code> — the single element with id="id".</li>
<li><strong>Descendant:</strong> <code>div p { }</code> — p elements INSIDE div (any depth). <strong>Child:</strong> <code>div > p { }</code> — p elements that are DIRECT children of div.</li>
<li><strong>Pseudo-classes:</strong> <code>a:hover { }</code> (mouse over), <code>:first-child</code>, <code>:nth-child(n)</code>, <code>:focus</code>, <code>:active</code>.</li>
<li><strong>Pseudo-elements:</strong> <code>p::first-line { }</code>, <code>::before</code>, <code>::after</code> — target parts of elements or insert generated content.</li>
</ul>

<h5>Box Model</h5>
<p>Every HTML element is treated as a rectangular box with four layers (from inside out):</p>
<div class="diagram-block">
CSS BOX MODEL:
┌─────────────────────────────────┐
│          MARGIN                 │  (space outside the border)
│   ┌───────────────────────┐     │
│   │      BORDER           │     │  (visible line around the element)
│   │  ┌───────────────┐    │     │
│   │  │   PADDING     │    │     │  (space between content and border)
│   │  │  ┌─────────┐  │    │     │
│   │  │  │ CONTENT │  │    │     │  (text, images, etc.)
│   │  │  └─────────┘  │    │     │
│   │  └───────────────┘    │     │
│   └───────────────────────┘     │
└─────────────────────────────────┘
Total width = content + 2×padding + 2×border + 2×margin
(With box-sizing: border-box, width includes padding + border)</div>

<h5>CSS Specificity</h5>
<p><strong>Specificity</strong> determines which CSS rule wins when multiple rules target the same element. Calculated as a 4-digit number (a,b,c,d): <strong>!important</strong> overrides all > <strong>Inline style</strong> (1,0,0,0) > <strong>ID</strong> (0,1,0,0) > <strong>Class/attribute/pseudo-class</strong> (0,0,1,0) > <strong>Element/pseudo-element</strong> (0,0,0,1). Higher specificity wins. Equal specificity → later rule wins.</p>

<h4>6.7 Client-Side Scripting — JavaScript</h4>
<p><strong>JavaScript (JS)</strong> is the programming language of the web browser. It makes web pages dynamic and interactive — responding to user actions, modifying page content, validating forms, and communicating with servers. Every modern browser has a built-in JavaScript engine.</p>
<ul>
<li><strong>Variables:</strong> <code>var</code> (function scope, hoisted — avoid in modern JS), <code>let</code> (block scope — use for values that change), <code>const</code> (block scope, can't reassign — use by default).</li>
<li><strong>Data Types:</strong> Primitive: Number, String, Boolean, null, undefined, Symbol, BigInt. Reference: Object, Array, Function. JS is <em>dynamically typed</em> — variables don't have fixed types.</li>
<li><strong>Functions:</strong> <code>function name() {}</code> (declaration), <code>const fn = function() {}</code> (expression), <code>const fn = () => {}</code> (arrow function — shorter syntax, lexical <code>this</code>).</li>
<li><strong>DOM Manipulation:</strong> JavaScript interacts with the HTML page through the <strong>Document Object Model (DOM)</strong> — a tree representation of the page's elements. Key methods: <code>document.getElementById()</code>, <code>document.querySelector()</code>, <code>element.innerHTML</code> (get/set HTML content), <code>element.style.property</code> (change CSS), <code>element.classList.add/remove()</code>.</li>
<li><strong>Events:</strong> JS responds to user actions: <code>onclick</code> (mouse click), <code>onload</code> (page loaded), <code>onsubmit</code> (form submitted), <code>onchange</code> (input value changed), <code>onkeypress</code> (key pressed), <code>onmouseover</code> (mouse hover). Events can be attached inline (<code>onclick="fn()"</code>) or via JS (<code>element.addEventListener('click', fn)</code>).</li>
</ul>

<div class="code-block">// JavaScript Example: Form Validation
function validateForm() {
    var name = document.getElementById("name").value;
    if (name === "") {
        alert("Name must be filled!");
        return false;
    }
    return true;
}</div>

<h4>6.8 VBScript (Client-Side)</h4>
<p><strong>VBScript</strong> was Microsoft's client-side scripting language for Internet Explorer. It's now <strong>deprecated</strong> and unsupported in modern browsers, but remains in the syllabus as a historical topic and for its server-side use with ASP.</p>
<ul>
<li>Syntax similar to Visual Basic — case-insensitive, uses keywords like Dim, Function, Sub, If...Then...End If.</li>
<li>Only worked in Internet Explorer — never cross-browser.</li>
<li>Declared variables with <code>Dim x</code>. No explicit types (variant type).</li>
<li><strong>Server-side VBScript</strong> remained relevant longer through Classic ASP (Active Server Pages) — ASP files (.asp) used VBScript for server logic before ASP.NET replaced it.</li>
</ul>

<h4>6.9 Server-Side Scripting — PHP</h4>
<p><strong>PHP (PHP Hypertext Preprocessor)</strong> is the most widely used server-side scripting language. It's embedded within HTML, executed on the server, and the result (HTML) is sent to the client's browser. The client never sees PHP code.</p>
<ul>
<li>Code goes between <code>&lt;?php ... ?&gt;</code> tags.</li>
<li>Variables start with <code>$</code>: <code>$name = "John";</code>. Dynamically typed (no type declaration needed).</li>
<li>Widely used with MySQL databases via <code>mysqli</code> (improved MySQL extension) or <code>PDO</code> (PHP Data Objects — database-agnostic).</li>
<li><strong>Superglobals:</strong> <code>$_GET</code> (URL parameters), <code>$_POST</code> (form data), <code>$_SESSION</code> (session data), <code>$_COOKIE</code> (cookies), <code>$_SERVER</code> (server info), <code>$_FILES</code> (uploaded files).</li>
<li>Popular frameworks: Laravel, Symfony, CodeIgniter. Powers WordPress, Facebook (originally), Wikipedia.</li>
</ul>
<div class="code-block">&lt;?php
// PHP Database Example
$conn = new mysqli("localhost", "user", "pass", "db");
$result = $conn->query("SELECT * FROM students");
while($row = $result->fetch_assoc()) {
    echo $row["name"] . " - " . $row["grade"] . "&lt;br&gt;";
}
$conn->close();
?&gt;</div>

<h4>6.10 JSP (JavaServer Pages)</h4>
<p><strong>JSP</strong> is Java's server-side web technology. Like PHP, it embeds code within HTML, but the code is Java. JSP pages are compiled into Java Servlets by the web container (Tomcat), which makes them very efficient after the first request.</p>
<ul>
<li>Java code embedded using <code>&lt;% ... %&gt;</code> (scriptlet) tags.</li>
<li><strong>Directives:</strong> <code>&lt;%@ page ... %&gt;</code> (page settings like import, content type), <code>&lt;%@ include ... %&gt;</code> (include another file).</li>
<li><strong>Scriptlets:</strong> <code>&lt;% Java code %&gt;</code> — executes Java code on the server.</li>
<li><strong>Expressions:</strong> <code>&lt;%= expression %&gt;</code> — evaluates and outputs the result directly into the HTML.</li>
<li><strong>Declarations:</strong> <code>&lt;%! declaration %&gt;</code> — declare variables or methods that become part of the servlet class.</li>
<li>JSP → compiled to Servlet (.java) → compiled to .class → executed by JVM. First request is slower (compilation), subsequent requests are fast.</li>
<li><strong>Implicit objects:</strong> request, response, session, application, out, config, pageContext, page, exception.</li>
</ul>

<h4>6.11 ASP.NET</h4>
<p><strong>ASP.NET</strong> is Microsoft's web application framework, part of the .NET ecosystem. It replaced Classic ASP and provides a rich, component-based model for building web applications. Languages: primarily C#, also VB.NET.</p>
<ul>
<li><strong>Web Forms:</strong> Event-driven model similar to desktop applications. Drag-and-drop server controls (TextBox, Button, GridView) that generate HTML automatically. Uses <strong>ViewState</strong> (hidden form field that maintains control state across postbacks) and <strong>PostBack</strong> (form submission back to the same page).</li>
<li><strong>MVC (Model-View-Controller):</strong> Separation of concerns — Model (data), View (UI), Controller (logic). More control over HTML output, better testability, URL routing.</li>
<li><strong>ASP.NET Core:</strong> Modern, cross-platform, open-source rewrite. Runs on Windows, Linux, Mac. Higher performance than traditional ASP.NET.</li>
<li><strong>Page Lifecycle:</strong> Init → Load → PostBack event handling → PreRender → Render → Unload.</li>
</ul>

<h4>6.12 Forms and Sessions</h4>
<p>Web applications need to handle user input (forms) and maintain state across requests (sessions/cookies), since HTTP is inherently <strong>stateless</strong> (each request is independent).</p>
<ul>
<li><strong>GET method:</strong> Data appended to URL as query parameters (<code>?name=John&age=25</code>). Visible in address bar, limited to ~2048 characters, bookmarkable, cacheable. Use for non-sensitive data retrieval (searches, navigation).</li>
<li><strong>POST method:</strong> Data sent in the HTTP request body. Not visible in URL, no size limit, not cached. Use for sensitive data (passwords), large data (file uploads), and data modification.</li>
<li><strong>Sessions:</strong> Server-side storage that persists across requests for a specific user. The server creates a unique <strong>Session ID</strong> (sent to client via cookie or URL rewriting), and stores data associated with that ID in memory or a database. Sessions expire on browser close (session cookie) or after a timeout.</li>
<li><strong>Cookies:</strong> Small data stored on the <strong>client's browser</strong>. Sent with every HTTP request to the server. <strong>Persistent cookies</strong> have an expiry date and survive browser restarts. <strong>Session cookies</strong> expire when the browser closes. Limited to ~4KB per cookie.</li>
</ul>

<h4>6.13 AJAX (Asynchronous JavaScript and XML)</h4>
<p><strong>AJAX</strong> is a technique for creating dynamic web pages that update content <em>without reloading the entire page</em>. It sends requests to the server in the background, receives data, and updates only the relevant part of the page. This creates a smoother, app-like user experience (Google Maps, Gmail, and Facebook all use AJAX extensively).</p>
<ul>
<li>Originally used <strong>XMLHttpRequest (XHR)</strong> object; modern JavaScript uses the <strong>Fetch API</strong> (cleaner, Promise-based).</li>
<li><strong>Asynchronous:</strong> The browser sends the request and continues working (doesn't freeze). When the response arrives, a callback function processes it.</li>
<li><strong>Data formats:</strong> Despite the name, modern AJAX typically uses <strong>JSON</strong> (JavaScript Object Notation) instead of XML — it's lighter, easier to parse, and natively supported by JavaScript.</li>
<li><strong>Flow:</strong> 1) User action triggers JS → 2) JS creates XHR/fetch request → 3) Request sent to server asynchronously → 4) Server processes and responds → 5) JS callback receives response → 6) JS updates specific DOM elements (not the whole page).</li>
</ul>
<div class="code-block">// AJAX Example using Fetch
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
      document.getElementById('result').innerHTML = data.message;
  })
  .catch(error => console.error('Error:', error));</div>

<h4>6.14 SignalR</h4>
<p><strong>SignalR</strong> is a Microsoft library that adds <strong>real-time web functionality</strong> to applications. Unlike traditional HTTP (client requests, server responds), SignalR enables the <em>server to push updates to connected clients instantly</em> without the client asking.</p>
<ul>
<li><strong>Bidirectional communication:</strong> Both server and client can initiate communication — not just request-response.</li>
<li><strong>Transport selection:</strong> SignalR automatically chooses the best available transport:
  <ul>
  <li><strong>WebSockets</strong> (preferred): Full-duplex, persistent connection. Lowest latency. Requires modern browser + server support.</li>
  <li><strong>Server-Sent Events (SSE):</strong> Server-to-client only. Good fallback.</li>
  <li><strong>Long Polling:</strong> Client repeatedly makes requests that the server holds open until data is available. Works everywhere but highest overhead.</li>
  </ul>
</li>
<li><strong>Hub:</strong> The central programming model — a server-side class that clients connect to. The hub exposes methods that clients can call, and can call methods on connected clients. Like a message broker.</li>
<li><strong>Use cases:</strong> Live chat applications, real-time dashboards (stock prices, monitoring), collaborative editing (Google Docs-style), live notifications, multiplayer games, live sports scores.</li>
</ul>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">ARCHITECTURE COMPARISON:
Two-tier: Client ↔ DB (fat client, simple, limited scalability)
Three-tier: Client ↔ App Server ↔ DB (thin client, scalable, maintainable)</div>

<div class="formula-box">HTML FORM METHODS:
GET: Data in URL (?key=value), 2048 char limit, bookmarkable
POST: Data in body, no limit, secure for sensitive data
Action: URL where form data is sent</div>

<div class="formula-box">CSS SPECIFICITY (Priority Order):
!important > Inline style (1000) > ID (100) > Class (10) > Element (1)
Example: #nav .item a → 100 + 10 + 1 = 111</div>

<div class="formula-box">SESSION vs COOKIE:
Session: Server-side, secure, expires on close/timeout
Cookie: Client-side, 4KB limit, persistent or session-based</div>

<div class="formula-box">AJAX FLOW:
1. Event triggers (user action)
2. JS creates XMLHttpRequest
3. XHR sends async request to server
4. Server processes and responds
5. JS callback updates DOM</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
AJAX REQUEST FLOW:
┌──────────┐   1. Event    ┌──────────┐
│  BROWSER │───trigger─────▶│JavaScript│
│   (UI)   │               │  Engine  │
│          │◀──5.Update────│          │
│          │    DOM         │          │
└──────────┘               └──┬───▲───┘
                              │   │
                    2.XHR     │   │ 4.Response
                    Request   │   │   (JSON/XML)
                              │   │
                           ┌──▼───┴───┐
                           │  WEB     │
                           │  SERVER  │
                           │  (PHP/   │
                           │  JSP)    │
                           └──────────┘
                           3.Process</div>

<div class="diagram-block">
CSS BOX MODEL (with values):
┌──────────────────────────────────────────┐
│ margin: 10px                             │
│  ┌────────────────────────────────────┐  │
│  │ border: 2px solid                  │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │ padding: 15px                │  │  │
│  │  │  ┌────────────────────────┐  │  │  │
│  │  │  │ content               │  │  │  │
│  │  │  │ width × height        │  │  │  │
│  │  │  └────────────────────────┘  │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
Total width = content + 2×padding + 2×border + 2×margin</div>
`,

    examples: [
        {title:"HTML Form", question:"Create an HTML form with name, email, and submit button.", solution:"<form action='/submit' method='POST'>\n  <label>Name: <input type='text' name='name' required></label><br>\n  <label>Email: <input type='email' name='email' required></label><br>\n  <input type='submit' value='Register'>\n</form>"},
        {title:"CSS Selectors", question:"Write CSS to style all paragraphs inside a div with class 'content'.", solution:".content p {\n  color: #333;\n  font-size: 16px;\n  line-height: 1.6;\n  margin-bottom: 10px;\n}\n.content p:first-child {\n  font-weight: bold;\n}\n.content p:hover {\n  color: #0066cc;\n}"},
        {title:"JavaScript DOM", question:"Write JS to change text of an element on button click.", solution:"<button onclick=\"changeText()\">Click Me</button>\n<p id=\"demo\">Original Text</p>\n<script>\nfunction changeText() {\n  document.getElementById('demo').innerHTML = 'Changed!';\n  document.getElementById('demo').style.color = 'red';\n}\n</script>"},
        {title:"PHP with Database", question:"Write PHP to display students from MySQL database.", solution:"<?php\n$conn = mysqli_connect('localhost','root','','school');\n$sql = 'SELECT * FROM students ORDER BY name';\n$result = mysqli_query($conn, $sql);\necho '<table><tr><th>Name</th><th>Grade</th></tr>';\nwhile($row = mysqli_fetch_assoc($result)) {\n  echo '<tr><td>'.$row['name'].'</td><td>'.$row['grade'].'</td></tr>';\n}\necho '</table>';\nmysqli_close($conn);\n?>"},
        {title:"JSP Scriptlet", question:"Write a JSP page that displays current date.", solution:"<%@ page import=\"java.util.Date\" %>\n<html><body>\n<h1>Current Date</h1>\n<p>Today is: <%= new Date() %></p>\n<%\n  int hour = new Date().getHours();\n  if(hour < 12)\n    out.println(\"Good Morning!\");\n  else\n    out.println(\"Good Afternoon!\");\n%>\n</body></html>"},
        {title:"AJAX Request", question:"Write AJAX code to fetch user data from an API.", solution:"var xhr = new XMLHttpRequest();\nxhr.open('GET', '/api/users', true);\nxhr.onreadystatechange = function() {\n  if(xhr.readyState === 4 && xhr.status === 200) {\n    var data = JSON.parse(xhr.responseText);\n    document.getElementById('users').innerHTML = \n      data.map(u => '<p>' + u.name + '</p>').join('');\n  }\n};\nxhr.send();"},
        {title:"Session Handling (PHP)", question:"Demonstrate PHP session management.", solution:"<?php\nsession_start();\n// Set session\n$_SESSION['username'] = 'John';\n$_SESSION['login_time'] = time();\n\n// Read session\necho 'Welcome, ' . $_SESSION['username'];\n\n// Destroy session (logout)\nsession_destroy();\n?>"},
        {title:"Cookie Example", question:"Write JavaScript to set and read a cookie.", solution:"// Set cookie (expires in 7 days)\nfunction setCookie(name, value, days) {\n  var d = new Date();\n  d.setTime(d.getTime() + (days*24*60*60*1000));\n  document.cookie = name+'='+value+';expires='+d.toUTCString()+';path=/';\n}\n// Read cookie\nfunction getCookie(name) {\n  var cookies = document.cookie.split(';');\n  for(var c of cookies) {\n    c = c.trim();\n    if(c.startsWith(name+'=')) return c.substring(name.length+1);\n  }\n  return '';\n}\nsetCookie('user', 'John', 7);"},
        {title:"XML Document", question:"Write a well-formed XML for a bookstore.", solution:"<?xml version='1.0'?>\n<bookstore>\n  <book category='CS'>\n    <title>Data Structures</title>\n    <author>Tanenbaum</author>\n    <price>599.00</price>\n  </book>\n  <book category='CS'>\n    <title>Algorithms</title>\n    <author>Cormen</author>\n    <price>750.00</price>\n  </book>\n</bookstore>"},
        {title:"2-tier vs 3-tier", question:"Compare two-tier and three-tier architectures.", solution:"Two-tier:\n- Client directly connects to DB\n- Business logic on client (fat client)\n- Simple but not scalable\n- Example: MS Access application\n\nThree-tier:\n- Client → App Server → DB Server\n- Thin client (just UI)\n- Scalable, maintainable, secure\n- Example: Web applications (browser → PHP → MySQL)"}
    ],

    practiceQuestions: [
        {question: "Compare two-tier and three-tier client-server architectures.", answer: "Two-tier: Client communicates directly with database. Simple, fast for small apps. Client has business logic + UI. Tight coupling, hard to scale.\nThree-tier: Client → Application Server → Database. Business logic on middle tier. Loose coupling, better security, easier scaling, reusable logic.\nExample: Two-tier = MS Access with direct SQL. Three-tier = Web app with browser (UI), Node.js server (logic), PostgreSQL (data)."},
        {question: "List five web servers and their features.", answer: "1. Apache HTTP: Open source, modular, .htaccess, most popular. Cross-platform.\n2. Nginx: Event-driven, reverse proxy, load balancer. Excellent for high concurrency.\n3. IIS (Microsoft): Windows-only, ASP.NET integration, GUI management.\n4. LiteSpeed: Drop-in Apache replacement, faster performance, built-in cache.\n5. Apache Tomcat: Java servlet container, JSP support, not full web server.\nOthers: Node.js (JS-based), Caddy (auto HTTPS)."},
        {question: "Create HTML page with table, form, and image.", answer: "<table border='1'><tr><th>Name</th><th>Age</th></tr><tr><td>Alice</td><td>25</td></tr></table>\n<form action='/submit' method='POST'>\n  <input type='text' name='name' placeholder='Name'>\n  <input type='email' name='email' placeholder='Email'>\n  <input type='submit' value='Submit'>\n</form>\n<img src='photo.jpg' alt='Profile Photo' width='200'>"},
        {question: "Difference between HTML and XML.", answer: "HTML: Predefined tags (<p>, <div>). For displaying data. Case-insensitive. Loose syntax (unclosed tags OK). Browser renders visually.\nXML: User-defined tags (<student>, <price>). For storing/transporting data. Case-sensitive. Strict syntax (must close all tags). Needs parser to process.\nXHTML: Strict HTML following XML rules. HTML5 is the modern standard."},
        {question: "Explain CSS Box Model.", answer: "Every HTML element is a rectangular box with 4 layers:\n1. Content: Actual text/image. Set by width/height.\n2. Padding: Space between content and border. Transparent.\n3. Border: Surrounds padding. Has width, style, color.\n4. Margin: Space outside border. Transparent. Collapses vertically.\nbox-sizing: content-box (default — width = content only). border-box (width includes padding + border — easier to work with)."},
        {question: "CSS specificity calculation.", answer: "Specificity determines which CSS rule applies when multiple rules target same element.\nCalculation (a, b, c, d):\na = inline styles (1000)\nb = IDs (#header) (100)\nc = classes, attributes, pseudo-classes (.nav, [type], :hover) (10)\nd = elements, pseudo-elements (div, p, ::before) (1)\n\nExample: #nav .item a:hover = 0,1,2,1 = 121\nHigher specificity wins. If equal, last rule wins. !important overrides all (avoid using it)."},
        {question: "JavaScript form validation.", answer: "function validateForm() {\n  let name = document.getElementById('name').value;\n  let email = document.getElementById('email').value;\n  let pass = document.getElementById('password').value;\n  if (name.length < 2) { alert('Name too short'); return false; }\n  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { alert('Invalid email'); return false; }\n  if (pass.length < 8) { alert('Password must be 8+ chars'); return false; }\n  return true;\n}"},
        {question: "Compare var, let, and const in JavaScript.", answer: "var: Function-scoped. Hoisted (undefined). Can redeclare. Pre-ES6. Problematic in loops.\nlet: Block-scoped. Hoisted but NOT initialized (temporal dead zone). Cannot redeclare in same scope. ES6+.\nconst: Block-scoped. Must be initialized at declaration. Cannot reassign. But object/array properties CAN be modified.\nBest practice: Use const by default, let when reassignment needed, avoid var."},
        {question: "What is the DOM? JavaScript interaction.", answer: "DOM (Document Object Model): Tree representation of HTML document. Browser parses HTML → creates DOM tree of nodes.\nAccess: document.getElementById(), querySelector(), getElementsByClassName()\nModify: element.innerHTML, textContent, style.color, setAttribute()\nCreate: document.createElement('div'), appendChild(), removeChild()\nEvent handling: element.addEventListener('click', function() { })\nDOM is live — changes reflect immediately in the browser."},
        {question: "Compare GET and POST methods.", answer: "GET: Data in URL query string. Cached. Bookmarkable. Limited size (~2KB). Visible in URL. Idempotent.\nUse for: Retrieving data, search queries, pagination.\n\nPOST: Data in request body. Not cached. Not bookmarkable. No size limit. Hidden from URL. Not idempotent.\nUse for: Submitting forms, uploading files, sensitive data (login).\n\nSecurity: Neither is inherently 'secure' — both need HTTPS for encryption."},
        {question: "PHP session management.", answer: "session_start(); // Must be first line, before any output\n$_SESSION['user'] = 'John'; // Set session variable\necho $_SESSION['user']; // Read session variable\n\nSession stored on SERVER, identified by session ID cookie (PHPSESSID).\nsession_destroy(); // Destroy all session data\nunset($_SESSION['user']); // Remove specific variable\n\nSecurity: Regenerate ID on login: session_regenerate_id(true);\nConfigure: session.cookie_httponly=1, session.cookie_secure=1 for HTTPS."},
        {question: "Client-side vs server-side scripting.", answer: "Client-side (JavaScript, HTML, CSS): Runs in browser. Fast response (no server roundtrip). Form validation, DOM manipulation, animations.\nLimitations: Source visible, can be disabled, no database access.\n\nServer-side (PHP, Java, Python, Node.js): Runs on server. Database access, authentication, business logic.\nLimitations: Requires server roundtrip, slower UI response.\n\nModern apps use both: Client handles UI, Server handles data/security."},
        {question: "Write JSP page connecting to database.", answer: "<%@ page import='java.sql.*' %>\n<%\n  Class.forName('com.mysql.jdbc.Driver');\n  Connection con = DriverManager.getConnection('jdbc:mysql://localhost/db', 'user', 'pass');\n  Statement stmt = con.createStatement();\n  ResultSet rs = stmt.executeQuery('SELECT * FROM employees');\n  while(rs.next()) {\n    out.println(rs.getString('name') + ' - ' + rs.getInt('salary') + '<br>');\n  }\n  con.close();\n%>\nNote: In production, use connection pooling and prepared statements."},
        {question: "ASP.NET page lifecycle.", answer: "1. PreInit: Set master page, themes dynamically\n2. Init: Initialize controls, set unique IDs\n3. InitComplete: Initialization complete\n4. PreLoad: Before ViewState/postback processing\n5. Load: Load page content (Page_Load event). Check IsPostBack.\n6. Control Events: Handle button clicks, etc.\n7. LoadComplete: All controls loaded\n8. PreRender: Final changes before rendering\n9. SaveStateComplete: ViewState saved\n10. Render: Generate HTML output\n11. Unload: Clean up resources"},
        {question: "ViewState in ASP.NET — limitations.", answer: "ViewState: Hidden form field (__VIEWSTATE) that preserves control values between postbacks.\nBase64-encoded, serialized data stored in HTML.\nAdvantages: No server memory used, automatic state preservation.\nLimitations:\n1. Increases page size (heavy pages → slow load)\n2. Not secure — can be decoded (use ViewStateEncryptionMode)\n3. Only works with postbacks (not cross-page)\n4. Not for sensitive data\n5. Disabled controls don't retain ViewState\nAlternative: Session state for server-side storage."},
        {question: "AJAX with example.", answer: "AJAX (Asynchronous JavaScript and XML): Updates parts of page without full reload.\nModern approach using fetch:\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => document.getElementById('result').innerHTML = data.name)\n  .catch(error => console.error(error));\n\nOld approach: XMLHttpRequest object.\nBenefits: Faster UX, reduced server load, partial updates.\nUsed in: Search suggestions, infinite scroll, form submission, live chat."},
        {question: "Same-Origin Policy and CORS.", answer: "Same-Origin Policy: Browser prevents scripts from accessing resources on different origins (protocol + domain + port must match).\nPurpose: Security — prevents malicious sites from reading your bank data.\n\nCORS (Cross-Origin Resource Sharing): Server-side mechanism to allow cross-origin requests.\nServer sends header: Access-Control-Allow-Origin: https://example.com\nPreflight: OPTIONS request for non-simple requests.\nCredentials: Access-Control-Allow-Credentials: true for cookies."},
        {question: "Explain SignalR and transport mechanisms.", answer: "SignalR: Microsoft library for real-time web communication. Server can push data to clients (not just respond to requests).\nTransport fallback (best to worst):\n1. WebSocket: Full-duplex, persistent connection. Best performance.\n2. Server-Sent Events: Server → Client only. HTTP-based.\n3. Long Polling: Client sends request, server holds until data available. Fallback.\nUse cases: Chat, live notifications, dashboards, gaming, collaborative editing.\nGroups: Hub.Clients.Group('room').SendAsync() for targeted messaging."},
        {question: "Cookies vs Sessions.", answer: "Cookies: Stored on CLIENT browser. Small (4KB limit). Sent with every request (overhead). Can be persistent (expires date) or session (browser close). Visible/editable by user.\n\nSessions: Stored on SERVER. No size limit. Only session ID sent as cookie. Expire on timeout/logout. More secure.\n\nUse cookies for: User preferences, remember me, analytics tracking.\nUse sessions for: Login state, shopping cart, sensitive data.\nBest practice: Session for auth, cookie for preferences."},
        {question: "Advantages of three-tier over two-tier.", answer: "1. Scalability: Scale middle tier independently — add more app servers.\n2. Security: Database not exposed to client. Business logic validates all requests.\n3. Maintainability: Change business logic without affecting client or database.\n4. Reusability: Middle tier serves multiple client types (web, mobile, API).\n5. Load balancing: Distribute requests across multiple app servers.\n6. Technology independence: Each tier can use different technology.\n7. Testing: Each tier can be tested independently.\nDisadvantage: More complex architecture, higher initial cost."}
    ],

    examTips: [
        "HTML tags and form elements are easy marks — know all input types",
        "CSS Box Model diagram is a frequently asked question",
        "JavaScript DOM manipulation is commonly tested",
        "Know the difference between GET and POST — classic MCQ topic",
        "AJAX flow diagram is important — understand asynchronous concept"
    ],

    commonMistakes: [
        "Confusing HTML (structure) with CSS (styling) with JS (behavior)",
        "Forgetting that XML tags are case-sensitive unlike HTML",
        "Mixing up session (server-side) with cookies (client-side)",
        "Not understanding that AJAX doesn't reload the page",
        "Confusing JSP (Java-based) with PHP (independent language)"
    ],

    memoryTricks: [
        "HTML = 'H-ow T-o M-ake L-ayout' (structure)",
        "CSS = 'C-olors S-izes S-tyles' (appearance)",
        "AJAX = 'Asynchronous JavaScript And XML' (partial update)",
        "PHP = runs on Server; JS = runs on Client (and server with Node)",
        "3-tier = 'PBD' = Presentation, Business logic, Data"
    ]
};
