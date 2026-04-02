// Chapter 5: Database Management Systems
const CH5 = {
    id: 4,
    title: "Database Management Systems",
    icon: "🗄️",
    marks: 12,
    color: "#06b6d4",
    topics: "Keys, E-R Model, Normalization, SQL Queries, Views, Transactions, Concurrency Control, Triggers, Stored Procedures",

    overview: {
        importance: "12 marks covering database theory and SQL. Normalization and SQL queries are almost guaranteed. This chapter has the highest predictability — questions follow standard patterns.",
        weightage: "12 out of 100 marks (12%)",
        focusAreas: [
            "Types of Keys (Primary, Foreign, Candidate, Super)",
            "E-R Model and ER diagram construction",
            "Normalization (1NF through 5NF)",
            "SQL: Joins, Subqueries, Aggregate functions",
            "Transaction ACID properties",
            "Concurrency control protocols"
        ]
    },

    theory: `
<h3><span class="section-icon">📖</span> Detailed Theory</h3>

<h4>5.1 Keys in DBMS</h4>
<p>Keys are attributes (or sets of attributes) that uniquely identify records in a table and establish relationships between tables. They are foundational to relational database design and integrity enforcement.</p>
<ul>
<li><strong>Super Key:</strong> Any set of attributes that can <em>uniquely identify</em> a tuple (row) in a relation. May contain extra (redundant) attributes. For a Students table with columns {StudentID, Name, Email, Phone}, the following are all super keys: {StudentID}, {StudentID, Name}, {Email}, {StudentID, Email, Phone}, etc. A table with n attributes has 2<sup>n</sup>-1 possible super keys at most.</li>
<li><strong>Candidate Key:</strong> A <em>minimal super key</em> — no proper subset of it is also a super key. If you remove any attribute from a candidate key, it can no longer uniquely identify tuples. In the example above, {StudentID} and {Email} might be candidate keys (assuming both are unique), but {StudentID, Name} is NOT a candidate key (removing Name still gives a super key).</li>
<li><strong>Primary Key:</strong> The candidate key <em>chosen</em> by the database designer to be the main identifier. Rules: Cannot be NULL, must be unique, only ONE primary key per table (but it can be multi-column/composite). Convention: choose the simplest, most stable candidate key.</li>
<li><strong>Alternate Key:</strong> Any candidate key that was NOT chosen as the primary key. If StudentID is the primary key and Email is also a candidate key, then Email is an alternate key.</li>
<li><strong>Foreign Key:</strong> An attribute in one table that <em>references the primary key</em> of another table. It establishes a link between two tables. Example: In an Enrollments table, StudentID is a foreign key referencing Students(StudentID). Foreign keys enforce <strong>referential integrity</strong> — you can't insert a StudentID in Enrollments that doesn't exist in Students.</li>
<li><strong>Composite Key:</strong> A primary key made of <em>two or more attributes</em> together. Example: In an Enrollment table, neither StudentID alone nor CourseID alone is unique (a student takes many courses, a course has many students), but the combination {StudentID, CourseID} uniquely identifies each enrollment record.</li>
</ul>

<h4>5.2 E-R Model (Entity-Relationship)</h4>
<p>The <strong>Entity-Relationship model</strong> is a high-level conceptual data model used to describe the structure of a database before actually implementing it. It uses a graphical notation (ER diagram) that even non-technical stakeholders can understand. The ER diagram is then converted into relational tables.</p>

<h5>Components</h5>
<ul>
<li><strong>Entity:</strong> A real-world object or concept with an independent existence. Drawn as a <strong>Rectangle</strong>. Examples: Student, Course, Employee, Department. An <strong>entity set</strong> is a collection of entities of the same type (e.g., all students).</li>
<li><strong>Attribute:</strong> A property that describes an entity. Drawn as an <strong>Oval (Ellipse)</strong> connected to its entity. Example: Student has attributes Name, Roll_No, Age, Address.</li>
<li><strong>Relationship:</strong> An association between two or more entities. Drawn as a <strong>Diamond</strong>. Example: Student "enrolls in" Course is a relationship between the Student and Course entities. Relationships can also have attributes (e.g., "enrolls in" might have a Grade attribute).</li>
<li><strong>Weak Entity:</strong> An entity that cannot be uniquely identified by its own attributes alone — it depends on a <strong>strong (owner) entity</strong> for identification. Drawn as a <strong>Double Rectangle</strong>. Example: A Dependent entity depends on Employee — the dependent's name alone isn't unique without knowing which employee they belong to. The identifying relationship is drawn as a <strong>Double Diamond</strong>.</li>
</ul>

<h5>Attribute Types</h5>
<ul>
<li><strong>Simple (Atomic):</strong> Cannot be divided further. Example: Age, Salary, StudentID.</li>
<li><strong>Composite:</strong> Can be divided into sub-parts. Example: Name → FirstName + MiddleName + LastName. Address → Street + City + State + ZIP.</li>
<li><strong>Multivalued:</strong> Can have multiple values for a single entity. Drawn as a <strong>Double Oval</strong>. Example: Phone_Numbers (a person can have multiple phone numbers).</li>
<li><strong>Derived:</strong> Computed from other attributes. Drawn as a <strong>Dashed Oval</strong>. Example: Age (derived from Date_of_Birth), TotalPrice (derived from Quantity × UnitPrice).</li>
<li><strong>Key Attribute:</strong> Uniquely identifies an entity within its entity set. Drawn with an <strong>underline</strong>. Example: StudentID, EmployeeID.</li>
</ul>

<h5>Cardinality (Mapping Constraints)</h5>
<p>Cardinality defines the number of entity instances that can participate in a relationship:</p>
<ul>
<li><strong>1:1 (One-to-One):</strong> Each entity in A relates to at most one entity in B, and vice versa. Example: Person ↔ Passport (each person has exactly one passport, each passport belongs to one person).</li>
<li><strong>1:N (One-to-Many):</strong> Each entity in A can relate to many entities in B, but each entity in B relates to at most one in A. Example: Department → Employees (one department has many employees, but each employee belongs to one department). The foreign key goes in the "many" side table.</li>
<li><strong>M:N (Many-to-Many):</strong> Entities in A can relate to many in B, and vice versa. Example: Students ↔ Courses. In relational implementation, an M:N relationship requires a <strong>junction/association table</strong> with foreign keys from both entities.</li>
</ul>

<div class="diagram-block">
E-R DIAGRAM EXAMPLE:

  ┌─────────┐                            ┌─────────┐
  │ STUDENT │──── &lt;Enrolls&gt; ────│ COURSE  │
  └────┬────┘    (M:N)          └────┬────┘
       │                              │
  ┌────┴────┐                    ┌────┴────┐
  │Roll_No  │                    │CourseID  │
  │(PK)     │                    │(PK)     │
  │Name     │                    │Title    │
  │Age      │                    │Credits  │
  └─────────┘                    └─────────┘
  
  Symbols: □ Entity  ◇ Relationship  ○ Attribute
           ═══ Weak Entity  ⊙ Multivalued</div>

<h4>5.3 Normalization</h4>
<p><strong>Normalization</strong> is the systematic process of organizing database tables to minimize data redundancy and eliminate anomalies (insertion, update, deletion anomalies). Each normal form addresses a specific type of redundancy.</p>

<h5>Functional Dependency (FD)</h5>
<p>X → Y means: "if two tuples have the same value for attributes X, they must have the same value for attributes Y." X <em>functionally determines</em> Y. Example: StudentID → Name (knowing the StudentID uniquely determines the Name). FDs are the foundation for normalization — you analyze them to determine which normal form a table satisfies.</p>

<p><strong>Armstrong's Axioms</strong> for deriving FDs: <strong>Reflexivity</strong> (if Y ⊆ X, then X → Y), <strong>Augmentation</strong> (if X → Y, then XZ → YZ), <strong>Transitivity</strong> (if X → Y and Y → Z, then X → Z). From these three, we derive: Union, Decomposition, Pseudo-transitivity.</p>

<p><strong>Attribute Closure (X+):</strong> The set of all attributes that can be determined from X using the given FDs. To find if X is a super key, compute X+ — if it contains all attributes of the relation, X is a super key.</p>

<h5>Normal Forms</h5>
<ul>
<li><strong>1NF (First Normal Form):</strong> All attribute values are <strong>atomic</strong> (indivisible) — no repeating groups, no multi-valued attributes in a single column, no nested tables. Example violation: a "PhoneNumbers" column containing "9876, 1234" — this should be split into separate rows or a separate table.</li>
<li><strong>2NF (Second Normal Form):</strong> 1NF + <strong>No partial dependency</strong>. A partial dependency occurs when a non-key attribute depends on only PART of a composite primary key. Only relevant when the PK is composite. Example: Table(StudentID, CourseID, CourseName) with PK(StudentID, CourseID) — CourseName depends only on CourseID (part of PK), not on the full PK. Fix: decompose into Students_Courses(StudentID, CourseID) and Courses(CourseID, CourseName).</li>
<li><strong>3NF (Third Normal Form):</strong> 2NF + <strong>No transitive dependency</strong>. A transitive dependency is when a non-key attribute depends on another non-key attribute: A → B → C where A is the key. Example: Table(StudentID, DeptID, DeptName) — DeptName depends on DeptID, which depends on StudentID. StudentID → DeptID → DeptName is transitive. Fix: split into Student(StudentID, DeptID) and Dept(DeptID, DeptName).</li>
<li><strong>BCNF (Boyce-Codd Normal Form):</strong> For every functional dependency X → Y, X <strong>must be a super key</strong>. Stricter than 3NF. In 3NF, the rule allows the RHS to be part of a candidate key — BCNF doesn't. Most well-designed databases are in BCNF. Difference from 3NF shows only in specific edge cases with overlapping candidate keys.</li>
<li><strong>4NF:</strong> BCNF + <strong>No multi-valued dependencies</strong>. A multi-valued dependency X →→ Y means that for each value of X, there are a set of values for Y independent of other attributes. Example: Employee →→ Skill, Employee →→ Language (an employee's skills and languages are independent — listing them in one table causes redundancy).</li>
<li><strong>5NF (PJNF):</strong> 4NF + <strong>No join dependencies</strong>. Every join dependency is implied by candidate keys. Decomposition is lossless. Rarely needed in practice.</li>
</ul>

<div class="diagram-block">
NORMALIZATION HIERARCHY:
┌─────────────────────────────────────┐
│             5NF (PJNF)              │
│  ┌───────────────────────────────┐  │
│  │           4NF                 │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │        BCNF              │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │       3NF          │  │  │  │
│  │  │  │  ┌─────────────┐  │  │  │  │
│  │  │  │  │    2NF       │  │  │  │  │
│  │  │  │  │  ┌───────┐  │  │  │  │  │
│  │  │  │  │  │  1NF  │  │  │  │  │  │
│  │  │  │  │  └───────┘  │  │  │  │  │
│  │  │  │  └─────────────┘  │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘</div>

<h4>5.4 SQL - Aggregate Functions</h4>
<p><strong>Aggregate functions</strong> perform calculations on a set of values and return a single result. They are used with SELECT and are often combined with GROUP BY to compute summaries for groups of rows.</p>
<ul>
<li><strong>COUNT(*):</strong> Counts the number of rows (including NULLs). COUNT(column) counts non-NULL values in that column. COUNT(DISTINCT column) counts unique non-NULL values.</li>
<li><strong>SUM(col):</strong> Adds up all values in the column. Ignores NULLs. Only works on numeric columns.</li>
<li><strong>AVG(col):</strong> Calculates the average. Ignores NULLs (divides sum by count of non-NULL values, not total rows).</li>
<li><strong>MAX(col), MIN(col):</strong> Find the maximum/minimum value. Works on numbers, strings (alphabetical), and dates.</li>
<li><strong>GROUP BY:</strong> Groups rows sharing the same values in specified columns, so aggregate functions work per group. Example: GROUP BY dept_id gives one row per department.</li>
<li><strong>HAVING:</strong> Filters <em>groups</em> (after GROUP BY), just as WHERE filters individual rows (before GROUP BY). <strong>Critical exam distinction:</strong> WHERE filters ROWS before grouping; HAVING filters GROUPS after grouping. You CANNOT use aggregate functions in WHERE — use HAVING instead.</li>
</ul>

<div class="code-block">-- Example: Average salary by department (>50000)
SELECT dept_id, AVG(salary) as avg_sal
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000
ORDER BY avg_sal DESC;</div>

<h4>5.5 Nested Subqueries</h4>
<p>A <strong>subquery</strong> is a SELECT statement nested inside another SQL statement. The inner query executes first, and its result feeds into the outer query. Subqueries make complex queries readable and modular.</p>
<ul>
<li><strong>Non-correlated subquery:</strong> The inner query runs independently — it doesn't reference the outer query. Runs once, result is reused. Example: Find employees earning more than the overall average salary.</li>
<li><strong>Correlated subquery:</strong> The inner query references columns from the outer query, so it re-executes for EACH row of the outer query. More powerful but slower. Example: Find employees earning more than the average salary in THEIR department.</li>
<li><strong>IN subquery:</strong> Checks if a value exists in the subquery's result set. <code>WHERE id IN (SELECT ...)</code></li>
<li><strong>EXISTS subquery:</strong> Returns TRUE if the subquery produces any rows. More efficient than IN for large result sets. <code>WHERE EXISTS (SELECT ...)</code></li>
</ul>
<div class="code-block">-- Correlated subquery: employees earning above their department average
SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary) FROM employees
    WHERE dept_id = e.dept_id
);

-- IN subquery: students enrolled in CS101
SELECT name FROM students
WHERE roll_no IN (
    SELECT student_id FROM enrollments
    WHERE course_id = 'CS101'
);

-- EXISTS subquery: departments with at least one high earner
SELECT d.dept_name FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e
    WHERE e.dept_id = d.dept_id AND e.salary > 100000
);</div>

<h4>5.6 Views</h4>
<p>A <strong>view</strong> is a <em>virtual table</em> defined by a SQL query. It doesn't store data itself — it's a saved query that's re-executed every time you access the view. Think of it as an alias for a complex query.</p>
<div class="code-block">CREATE VIEW high_earners AS
SELECT name, salary, dept_id
FROM employees WHERE salary > 75000;

-- Use like a table:
SELECT * FROM high_earners WHERE dept_id = 10;</div>
<ul>
<li><strong>Advantages:</strong> <strong>Security</strong> (restrict access to specific columns/rows — users see only what they need), <strong>Simplification</strong> (hide complex joins behind a simple name), <strong>Data independence</strong> (if the underlying table structure changes, update the view definition instead of all queries).</li>
<li><strong>Updatable views:</strong> Simple views (based on a single table, no aggregates, no GROUP BY, no DISTINCT, no joins) can be updated (INSERT/UPDATE/DELETE through the view). Complex views are generally read-only.</li>
<li><strong>Materialized views:</strong> Unlike regular views, these actually store the query result physically. Faster for reads but need refreshing when base data changes. Used for data warehousing and reporting.</li>
</ul>

<h4>5.7 Joined Relations</h4>
<p>JOINs combine rows from two or more tables based on a related column. Understanding JOINs is essential for SQL exam questions:</p>
<ul>
<li><strong>INNER JOIN:</strong> Returns only rows where there's a match in BOTH tables. Most common join type. Rows without matches in either table are excluded.</li>
<li><strong>LEFT JOIN (LEFT OUTER JOIN):</strong> Returns ALL rows from the left table + matching rows from the right table. If no match, right columns are NULL. Use when you want all items from the "main" table even if they have no related records.</li>
<li><strong>RIGHT JOIN:</strong> Returns ALL rows from the right table + matching rows from the left. Mirror of LEFT JOIN.</li>
<li><strong>FULL OUTER JOIN:</strong> Returns ALL rows from BOTH tables. Where there's no match, NULL fills the missing side. Least common but most inclusive.</li>
<li><strong>CROSS JOIN:</strong> Cartesian product — every row in A combined with every row in B. If A has m rows and B has n rows, result has m×n rows. Rarely used intentionally.</li>
<li><strong>SELF JOIN:</strong> A table joined with itself. Useful for hierarchical data (employees and their managers in the same table). Must use table aliases to distinguish the two instances.</li>
<li><strong>NATURAL JOIN:</strong> Automatically joins on ALL columns with the same name in both tables. Convenient but dangerous (might join on unintended columns).</li>
</ul>

<h4>5.8 Transactions & ACID Properties</h4>
<p>A <strong>transaction</strong> is a sequence of database operations that form a single logical unit of work. Either ALL operations succeed (commit) or NONE take effect (rollback). Transactions ensure data integrity even during failures and concurrent access.</p>
<ul>
<li><strong>Atomicity:</strong> A transaction is <em>all-or-nothing</em>. If any operation fails, all previous operations in the transaction are rolled back. Example: In a bank transfer, debiting from A and crediting to B must both happen or neither happens — you can't debit without crediting.</li>
<li><strong>Consistency:</strong> A transaction takes the database from one <em>valid state to another valid state</em>. All constraints, triggers, and rules are satisfied after the transaction completes. Example: Total money in the bank system remains the same before and after a transfer.</li>
<li><strong>Isolation:</strong> Concurrent transactions don't interfere with each other — each appears to execute in isolation. The intermediate results of one transaction are invisible to others. Isolation levels (from lowest to highest): Read Uncommitted, Read Committed, Repeatable Read, Serializable.</li>
<li><strong>Durability:</strong> Once a transaction is committed, its changes are <em>permanent</em> — they survive system crashes, power failures, etc. Achieved through write-ahead logging (WAL) and checkpointing.</li>
</ul>

<h5>Transaction States</h5>
<div class="diagram-block">
TRANSACTION STATE DIAGRAM:
┌────────┐   ┌────────┐   ┌───────────┐   ┌───────────┐
│ Active │──▶│Partial │──▶│ Committed │──▶│ Terminated│
└───┬────┘   │Commit  │   └───────────┘   └───────────┘
    │        └───┬────┘
    │            │ (failure)
    │            ▼
    │        ┌────────┐   ┌───────────┐
    └──────▶│ Failed │──▶│  Aborted  │
             └────────┘   └───────────┘</div>

<h4>5.9 Concurrency Control</h4>
<p>When multiple transactions execute simultaneously, several problems can arise if not controlled properly:</p>
<ul>
<li><strong>Lost Update:</strong> Two transactions read the same value, modify it independently, and write back — the second write overwrites the first, "losing" its update.</li>
<li><strong>Dirty Read:</strong> Transaction T1 reads data modified by T2 that hasn't committed yet. If T2 rolls back, T1 has read invalid data.</li>
<li><strong>Unrepeatable Read:</strong> Transaction T1 reads the same row twice and gets different results because T2 modified it between the two reads.</li>
<li><strong>Phantom Read:</strong> Transaction T1 reads a set of rows matching a condition, then T2 inserts/deletes rows matching that condition. T1's second read shows different rows.</li>
</ul>

<p><strong>Solutions:</strong></p>
<ul>
<li><strong>Lock-Based Protocols:</strong> <strong>Shared (S) lock</strong> — allows reading, multiple transactions can hold S locks simultaneously. <strong>Exclusive (X) lock</strong> — allows reading and writing, only one transaction can hold an X lock. Compatibility: S+S = OK, S+X = blocked, X+X = blocked.</li>
<li><strong>Two-Phase Locking (2PL):</strong> Every transaction has two phases: <strong>Growing phase</strong> (only acquire locks, never release) and <strong>Shrinking phase</strong> (only release locks, never acquire). The transition point is called the <strong>lock point</strong>. 2PL guarantees <strong>serializability</strong> (equivalent to some serial execution) but can cause deadlocks.</li>
<li><strong>Timestamp-Based:</strong> Each transaction gets a unique timestamp at start. Older transactions have priority. If a conflict arises, the younger transaction is rolled back and restarted.</li>
<li><strong>MVCC (Multi-Version Concurrency Control):</strong> Maintains multiple versions of data items. Readers don't block writers and writers don't block readers — each transaction sees a snapshot of the database at its start time. Used by PostgreSQL, Oracle, MySQL InnoDB.</li>
</ul>

<h4>5.10 Triggers</h4>
<p>A <strong>trigger</strong> is a stored program that automatically executes in response to specific events (INSERT, UPDATE, DELETE) on a table. Triggers enforce business rules, maintain audit trails, and synchronize related tables.</p>
<div class="code-block">-- Trigger example: Log salary changes
CREATE TRIGGER salary_audit
AFTER UPDATE OF salary ON employees
FOR EACH ROW
BEGIN
    INSERT INTO audit_log(emp_id, old_salary, new_salary, change_date)
    VALUES(:OLD.emp_id, :OLD.salary, :NEW.salary, SYSDATE);
END;</div>
<p><strong>Key concepts:</strong> <strong>BEFORE triggers</strong> execute before the triggering statement (can validate/modify data). <strong>AFTER triggers</strong> execute after (good for logging). <strong>:OLD</strong> refers to the row's values before the change. <strong>:NEW</strong> refers to the new values. <strong>FOR EACH ROW</strong> makes it a row-level trigger (fires once per affected row); without it, it's a statement-level trigger (fires once per SQL statement).</p>

<h4>5.11 Stored Procedures</h4>
<p>A <strong>stored procedure</strong> is a precompiled collection of SQL statements stored in the database. It accepts input parameters, executes logic, and can return output parameters or result sets.</p>
<div class="code-block">-- Stored procedure example
CREATE PROCEDURE get_dept_salary(IN dept INT, OUT total DECIMAL)
BEGIN
    SELECT SUM(salary) INTO total
    FROM employees
    WHERE dept_id = dept;
END;

-- Call: CALL get_dept_salary(10, @result);
-- SELECT @result;</div>
<p><strong>Advantages over inline SQL:</strong> <strong>Performance</strong> (precompiled, execution plan cached). <strong>Security</strong> (users can execute procedures without direct table access). <strong>Reusability</strong> (write once, call many times). <strong>Maintainability</strong> (change logic in one place, not in every application). <strong>Reduced network traffic</strong> (one procedure call instead of multiple SQL statements).</p>
`,

    formulas: `
<h3><span class="section-icon">📋</span> Formula & Concept Sheet</h3>

<div class="formula-box">KEYS HIERARCHY:
Super Key ⊇ Candidate Key ⊇ Primary Key
Foreign Key → References Primary Key of another table
Candidate Key = Minimal Super Key</div>

<div class="formula-box">NORMALIZATION QUICK CHECK:
1NF: Atomic values? No repeating groups?
2NF: 1NF + No partial dependency on composite key?
3NF: 2NF + No transitive dependency (A→B→C)?
BCNF: For all X→Y, X is super key?
4NF: BCNF + No multi-valued dependency?</div>

<div class="formula-box">SQL EXECUTION ORDER:
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
(Remember: "From Where Groups Have Selected Orders Limited")</div>

<div class="formula-box">JOIN TYPES:
INNER: A ∩ B (matching only)
LEFT:  A (all) + matching B
RIGHT: B (all) + matching A
FULL:  A ∪ B (all from both)
CROSS: A × B (cartesian product, |A|×|B| rows)</div>

<div class="formula-box">ACID:
A - Atomicity (all or nothing)
C - Consistency (valid state to valid state)
I - Isolation (no interference)
D - Durability (committed = permanent)</div>
`,

    diagrams: `
<h3><span class="section-icon">📊</span> Key Diagrams</h3>

<div class="diagram-block">
JOIN OPERATIONS (Visual):

Table A          Table B        INNER JOIN
┌────┬────┐    ┌────┬────┐    ┌────┬────┬────┐
│ id │ a  │    │ id │ b  │    │ id │ a  │ b  │
├────┼────┤    ├────┼────┤    ├────┼────┼────┤
│ 1  │ x  │    │ 1  │ p  │    │ 1  │ x  │ p  │
│ 2  │ y  │    │ 3  │ q  │    └────┴────┴────┘
│ 3  │ z  │    │ 4  │ r  │    (Only matching: 1,3)
└────┴────┘    └────┴────┘    
                              LEFT JOIN
                              ┌────┬────┬──────┐
                              │ 1  │ x  │ p    │
                              │ 2  │ y  │ NULL │
                              │ 3  │ z  │ q    │
                              └────┴────┴──────┘</div>

<div class="diagram-block">
TWO-PHASE LOCKING:
        Locks
 held     │    ╱╲
          │   ╱  ╲
          │  ╱    ╲
          │ ╱      ╲
          │╱        ╲
──────────┼──────────╲────── Time
          │ Growing   Shrinking
          │ Phase     Phase
          │
     Lock Point
(max locks acquired)</div>
`,

    examples: [
        {title:"Finding Candidate Keys", question:"R(A,B,C,D,E) with FDs: A→B, BC→D, D→E. Find candidate keys.", solution:"A+ = {A,B} (A→B)\nAC+ = {A,B,C,D,E} (A→B, BC→D, D→E) = All attributes!\nSo AC is a candidate key.\nCheck if A or C alone? A+ = {A,B} ≠ R. C+ = {C} ≠ R.\nCandidate Key = AC (minimal super key)"},
        {title:"Normalization Check", question:"R(StudentID, CourseID, CourseName, Instructor)\nPK: (StudentID, CourseID)\nFD: CourseID → CourseName, CourseID → Instructor", solution:"1NF? Yes (all atomic)\n2NF? No! CourseName depends on CourseID (part of composite PK) — partial dependency\nFix: R1(StudentID, CourseID) and R2(CourseID, CourseName, Instructor)\nR2 is in 2NF. If Instructor→? No transitive dep, so 3NF too."},
        {title:"SQL Aggregate Query", question:"Write SQL to find departments with more than 5 employees.", solution:"SELECT dept_id, COUNT(*) as emp_count\nFROM employees\nGROUP BY dept_id\nHAVING COUNT(*) > 5;"},
        {title:"Nested Subquery", question:"Find employees who earn more than the average salary.", solution:"SELECT name, salary\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;"},
        {title:"Self Join", question:"Find employees and their managers.", solution:"SELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.emp_id;"},
        {title:"View Creation", question:"Create a view of active students with GPA > 3.5.", solution:"CREATE VIEW toppers AS\nSELECT student_id, name, gpa, department\nFROM students\nWHERE status = 'Active' AND gpa > 3.5;\n\n-- Usage:\nSELECT * FROM toppers WHERE department = 'CS';"},
        {title:"Transaction ACID", question:"Show a bank transfer transaction ensuring ACID.", solution:"BEGIN TRANSACTION;\n  UPDATE accounts SET balance = balance - 1000 WHERE acc_id = 'A';\n  UPDATE accounts SET balance = balance + 1000 WHERE acc_id = 'B';\n  -- If any fails, ROLLBACK; else:\nCOMMIT;\n-- Atomicity: both update or neither\n-- Consistency: total balance unchanged\n-- Isolation: other transactions see old OR new state\n-- Durability: after commit, changes survive crash"},
        {title:"Trigger", question:"Create a trigger that prevents inserting salary < 0.", solution:"CREATE TRIGGER check_salary\nBEFORE INSERT ON employees\nFOR EACH ROW\nBEGIN\n  IF :NEW.salary < 0 THEN\n    RAISE_APPLICATION_ERROR(-20001, 'Salary cannot be negative');\n  END IF;\nEND;"},
        {title:"Stored Procedure", question:"Write a stored procedure to give 10% raise to a department.", solution:"CREATE PROCEDURE give_raise(IN dept INT)\nBEGIN\n  UPDATE employees\n  SET salary = salary * 1.10\n  WHERE dept_id = dept;\n  -- Log the change\n  INSERT INTO salary_log(dept_id, action, action_date)\n  VALUES(dept, '10% raise', NOW());\nEND;"},
        {title:"ER to Relational", question:"Convert an ER diagram with Student(M) enrolls(M:N) Course to tables.", solution:"Tables:\n1. Student(student_id PK, name, age)\n2. Course(course_id PK, title, credits)\n3. Enrollment(student_id FK, course_id FK, grade)\n   PK: (student_id, course_id)\nThe M:N relationship becomes a separate table with foreign keys from both entities."}
    ],

    practiceQuestions: [
        {question: "Difference between super key, candidate key, and primary key.", answer: "Super key: Any set of attributes that uniquely identifies a tuple. May contain extra attributes.\nCandidate key: Minimal super key — remove any attribute and it's no longer unique. A relation can have multiple.\nPrimary key: Chosen candidate key used as main identifier. Only one per table. Cannot be NULL.\nExample: Student(Roll, Email, Name, Dept) → Super keys: {Roll}, {Email}, {Roll,Name}. Candidate: {Roll}, {Email}. Primary: Roll."},
        {question: "Draw ER diagram for Library Management System.", answer: "Entities: Book(ISBN, Title, Author), Member(MemberID, Name), Librarian(EmpID, Name)\nRelationships:\n• Member BORROWS Book (M:N) — with attributes (BorrowDate, DueDate)\n• Librarian MANAGES Library (1:1)\n• Book BELONGS_TO Category (M:1)\nWeak Entity: BookCopy (CopyNo) — depends on Book\nISA: Member → {Student, Faculty}"},
        {question: "Types of attributes in ER model.", answer: "Simple: Atomic, can't be divided. Example: Age.\nComposite: Divisible into sub-parts. Example: Name → {First, Middle, Last}.\nDerived: Calculated from other attributes. Example: Age from DOB (dashed oval).\nMultivalued: Multiple values for one entity. Example: PhoneNumbers (double oval).\nKey: Uniquely identifies entity. Example: StudentID (underlined).\nStored: Base attribute from which derived attributes are computed."},
        {question: "What is a weak entity?", answer: "Weak entity: Cannot be uniquely identified by its own attributes alone. Depends on a 'strong' (owner) entity.\nHas partial key (discriminator) — uniquely identifies within the context of the owner.\nER notation: Double rectangle. Relationship with owner: Double diamond.\nExample: Dependent (Name, DOB) depends on Employee. DependentName discriminates among dependents of the SAME employee.\nAlways has total participation with its identifying relationship."},
        {question: "Normalize R(A,B,C,D,E) with FDs A→B, B→C, C→D to 3NF.", answer: "1NF: Already in 1NF (atomic values assumed).\n2NF: Check partial dependencies. If A is key → B,C,D depend on whole key → already 2NF.\n3NF: Remove transitive dependencies:\n• A→B (direct) ✓\n• A→C (transitive via B) ✗ — decompose\n• A→D (transitive via B→C) ✗\nResult: R1(A,B,E), R2(B,C), R3(C,D). Each is in 3NF — no transitive dependencies."},
        {question: "BCNF vs 3NF — when do they differ?", answer: "3NF: For every FD X→Y, either X is a superkey OR Y is part of a candidate key.\nBCNF: For every FD X→Y, X MUST be a superkey. Stricter than 3NF.\nThey differ when: A non-key attribute determines part of a candidate key.\nExample: R(Student, Course, Instructor) with FDs: {Student,Course}→Instructor, Instructor→Course.\n3NF: Satisfied (Course is part of candidate key).\nBCNF: Violated (Instructor→Course, but Instructor is not superkey). Must decompose."},
        {question: "Multi-valued dependencies.", answer: "MVD: X →→ Y means for a given X value, the set of Y values is independent of other attributes.\nExample: Employee(EmpID, Skill, Language) — an employee's skills are independent of their languages.\nEmpID →→ Skill and EmpID →→ Language\n4NF: A relation is in 4NF if it's in BCNF and has no non-trivial MVDs. Decompose into R1(EmpID,Skill) and R2(EmpID,Language)."},
        {question: "SQL to find second highest salary.", answer: "Method 1 (Subquery):\nSELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);\n\nMethod 2 (LIMIT/OFFSET):\nSELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;\n\nMethod 3 (DENSE_RANK):\nSELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk FROM employees) t WHERE rnk = 2;"},
        {question: "Explain different types of JOINs.", answer: "INNER JOIN: Only matching rows from both tables.\nLEFT JOIN: All rows from left + matching from right (NULL for no match).\nRIGHT JOIN: All rows from right + matching from left.\nFULL OUTER JOIN: All rows from both tables.\nCROSS JOIN: Cartesian product — every row of A paired with every row of B.\nSELF JOIN: Table joined with itself (for hierarchical data).\nNATURAL JOIN: Auto-join on common column names."},
        {question: "Correlated subquery vs regular subquery.", answer: "Regular subquery: Executes ONCE, result used by outer query. Inner query is independent.\nSELECT * FROM emp WHERE dept_id IN (SELECT id FROM dept WHERE location='NY');\n\nCorrelated subquery: Executes ONCE PER ROW of outer query. Inner query references outer query.\nSELECT * FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept_id = e.dept_id);\nCorrelated is slower but more powerful for row-by-row comparisons."},
        {question: "Views — when are they updatable?", answer: "View: Virtual table defined by a query. CREATE VIEW v AS SELECT col1,col2 FROM table;\nUpdatable views (can INSERT/UPDATE/DELETE) when:\n1. Based on single table\n2. No GROUP BY, HAVING, DISTINCT, aggregate functions\n3. No subqueries in SELECT\n4. All NOT NULL columns of base table are included\nNon-updatable: Views with JOINs, UNION, aggregates, computed columns.\nWITH CHECK OPTION: Ensures updates through view satisfy view's WHERE clause."},
        {question: "Transaction states diagram.", answer: "States: Active → Partially Committed → Committed (success path)\nActive → Failed → Aborted (failure path)\nAborted → can Restart (go to Active) or Kill.\n\nActive: Transaction executing normally.\nPartially Committed: Final operation executed, waiting for confirmation.\nCommitted: Changes permanently saved to database.\nFailed: Normal execution can't proceed (error/abort).\nAborted: Rolled back, changes undone."},
        {question: "Problems of concurrent transactions.", answer: "1. Lost Update: Two transactions read same data, both update, second overwrites first.\n2. Dirty Read: Transaction reads uncommitted data from another (which may rollback).\n3. Non-repeatable Read: Transaction reads same row twice, gets different values (another committed between reads).\n4. Phantom Read: Transaction re-executes query, new rows appear (another inserted/deleted).\nIsolation levels (READ UNCOMMITTED → SERIALIZABLE) prevent progressively more problems."},
        {question: "Two-Phase Locking (2PL) protocol.", answer: "Phase 1 (Growing): Transaction can acquire locks, but cannot release any.\nPhase 2 (Shrinking): Transaction can release locks, but cannot acquire new ones.\nGuarantees serializability — conflict-equivalent to some serial schedule.\nVariants:\n• Basic 2PL: May cause deadlock and cascading rollbacks.\n• Strict 2PL: Hold all exclusive locks until commit — prevents cascading rollbacks.\n• Rigorous 2PL: Hold ALL locks until commit — simplest to implement."},
        {question: "Deadlock in OS vs DBMS.", answer: "OS Deadlock: Processes wait for resources (CPU, memory, I/O). Prevention via resource ordering, detection via wait-for graph.\nDBMS Deadlock: Transactions wait for locks on data items. Same detection (wait-for graph) but DBMS can ROLLBACK transactions (victim selection).\nKey difference: In DBMS, deadlocks are resolved by aborting one transaction (less cost than killing OS processes). DBMS uses timeout-based or graph-based detection."},
        {question: "Write trigger for logging DELETEs.", answer: "CREATE TABLE delete_log (id INT, deleted_at TIMESTAMP, deleted_by VARCHAR(50));\n\nCREATE TRIGGER log_delete\nAFTER DELETE ON employees\nFOR EACH ROW\nBEGIN\n    INSERT INTO delete_log VALUES (OLD.emp_id, NOW(), CURRENT_USER());\nEND;\n\nOLD refers to the deleted row's values. AFTER ensures delete succeeded before logging."},
        {question: "Advantages of stored procedures over inline SQL.", answer: "1. Performance: Compiled and cached — faster execution on repeated calls.\n2. Security: Users call procedure without direct table access. Prevents SQL injection.\n3. Reusability: Write once, call from multiple applications.\n4. Network efficiency: One call instead of multiple SQL statements.\n5. Maintenance: Business logic in one place — easier to update.\n6. Transaction control: Can wrap multiple operations in a transaction.\nDisadvantage: Database-vendor specific, harder to debug, version control challenges."},
        {question: "DELETE vs TRUNCATE vs DROP.", answer: "DELETE: DML. Removes rows (with WHERE clause). Can rollback. Triggers fire. Slow for large tables. Space NOT immediately released.\nTRUNCATE: DDL. Removes ALL rows. Cannot rollback (usually). Triggers don't fire. Fast — deallocates data pages. Resets identity.\nDROP: DDL. Removes ENTIRE TABLE (structure + data + indexes + constraints). Cannot rollback.\nUse DELETE for selective removal, TRUNCATE to empty table keeping structure, DROP to remove table entirely."},
        {question: "Indexing — B-tree vs Hash.", answer: "B-tree Index: Balanced tree. Supports: equality (=), range (<, >, BETWEEN), ORDER BY, LIKE 'prefix%'. O(log n) search. Default in most RDBMS.\nHash Index: Hash function maps key to bucket. Supports: equality ONLY. O(1) average lookup. Cannot do range queries or sorting.\nUse B-tree for: Most queries, range searches, sorted output.\nUse Hash for: Exact match lookups (e.g., primary key lookups in memory databases)."},
        {question: "GRANT and REVOKE in SQL security.", answer: "GRANT: Gives privileges to users.\nGRANT SELECT, INSERT ON employees TO user1;\nGRANT ALL PRIVILEGES ON database.* TO admin WITH GRANT OPTION;\n\nREVOKE: Removes privileges.\nREVOKE INSERT ON employees FROM user1;\n\nWITH GRANT OPTION: Allows user to grant their privileges to others.\nCASCADE: When revoking, also revoke from users who received privileges from this user.\nRESTRICT: Revoke fails if others depend on this privilege."}
    ],

    examTips: [
        "Normalization questions are guaranteed — master 1NF through BCNF at minimum",
        "Practice ER diagram construction — common for 4-5 mark questions",
        "Know SQL aggregate functions with GROUP BY and HAVING — very frequent",
        "ACID properties are a favorite for direct-recall MCQs",
        "Difference between WHERE and HAVING is a classic trap question"
    ],

    commonMistakes: [
        "Confusing WHERE (filters rows) with HAVING (filters groups)",
        "Thinking Foreign Key must be unique — it doesn't need to be",
        "Misidentifying 2NF violations when primary key is not composite",
        "Forgetting that NULL ≠ NULL in SQL comparisons",
        "Confusing TRUNCATE (DDL, no rollback) with DELETE (DML, can rollback)"
    ],

    memoryTricks: [
        "ACID: 'All Changes Involve Durability' = Atomicity, Consistency, Isolation, Durability",
        "Normal Forms: '1234B' = 1NF(atomic), 2NF(no partial), 3NF(no transitive), BCNF(determinant=superkey)",
        "SQL Order: 'FROM WHERE GROUP HAVING SELECT ORDER' = 'Fat Whales Gobble Huge Steaks Often'",
        "Keys: 'Super Contains Candidate Contains Primary'",
        "Joins: 'INNER = both match, LEFT = all left, RIGHT = all right, FULL = everyone'"
    ]
};
