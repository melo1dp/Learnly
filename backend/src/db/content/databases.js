// Databases & SQL: from designing tables, to querying them, to joining them.
export default {
  title: 'Databases & SQL',
  description: 'Learn how relational databases store data in tables, how to query that data with SQL, and how to combine tables with joins.',
  category: 'Computing',
  level: 'intermediate',
  rating: 4.7,
  topics: [
    {
      topic: 'tables',
      lessons: {
        easy: {
          title: 'What a Table Is',
          body: `A relational database stores data in tables. A table is a grid: each column has a name and a type, and each row is one record. A "users" table might have columns id, name and email, and one row per person. Columns describe the shape of the data; rows hold the actual values. Once you can see a table this way — a fixed set of labeled slots, repeated once per record — most of what follows in SQL is just different ways of asking questions about those grids.

You create a table by naming its columns and their types:

    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT
    );

INTEGER and TEXT are types. PRIMARY KEY means the id uniquely identifies a row. NOT NULL means the column must always have a value. Reading this statement step by step: CREATE TABLE users tells the database to build a new grid named "users"; each line inside the parentheses defines one column, in the order it will appear; the database records this shape once, and every row inserted afterward must fit it.

A second example makes the same idea concrete for a different kind of table:

    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC NOT NULL,
      in_stock BOOLEAN DEFAULT TRUE
    );

Here price is NUMERIC rather than TEXT, because you plan to do arithmetic with it — sum it, compare it, sort by it — and text does not support that. in_stock is BOOLEAN with a DEFAULT, so if you insert a new product without mentioning in_stock at all, the database quietly fills in TRUE rather than leaving the column empty. Walking through an insert against this table: INSERT INTO products (name, price) VALUES ('Mug', 8.50); supplies only two of the four columns. The id is generated automatically because it is the primary key, and in_stock becomes TRUE from the default. The row that lands in the table has all four columns filled, even though the statement only mentioned two.

A common beginner mistake is thinking a table is like a spreadsheet where any cell can hold anything. It is not. Every value in a column must match that column's type, and a column declared NOT NULL will reject a row that leaves it empty. Trying to insert the text 'free' into a NUMERIC price column fails outright rather than silently storing something odd, and that failure is doing you a favor by catching the problem immediately instead of letting it surface later as a bug in a report.

A second mistake is picking a type because it "looks right" for the first row you happen to imagine. Storing a phone number as INTEGER seems reasonable until someone has a number starting with 0, which an integer silently drops, or one with a plus sign or dashes, which an integer cannot hold at all. Phone numbers are TEXT, even though they are made of digits, because you are storing a label, not a quantity you intend to do math on.

A third mistake is confusing PRIMARY KEY with "any column that looks unique right now." A PRIMARY KEY is enforced by the database — it rejects duplicates and NULLs automatically, at the moment you try to insert them. A column that merely happens not to repeat yet, like a name, offers no such guarantee, and the first duplicate name inserted will slide right in unless the column is actually declared unique.

This matters beyond the exercise of writing CREATE TABLE statements. Every application built on a database — a web app, a mobile app, a reporting dashboard — trusts that the shape of its tables is stable and enforced. If a column could silently hold the wrong type of value, or silently go missing, every piece of code reading that table would need its own defensive checks scattered everywhere. By making the database enforce the shape once, at write time, everything downstream can assume the data is clean, which is a large part of why relational databases remain the default choice for structured data.

Key takeaway: a table is columns (the shape) plus rows (the data), and the database enforces the shape.`,
          questions: [
            {
              text: 'In a relational table, what does a single row represent?',
              options: ['One record', 'One column type', 'One database', "The table's name"],
              correct_index: 0,
              explanation: 'A row holds one instance of whatever the table stores, like one user or one product. Column types and database names are different concepts entirely — a row is about the data, not the schema.',
            },
            {
              text: 'What does a column definition mainly describe?',
              options: [
                'The number of rows the table can hold',
                'The order in which rows are inserted',
                'The name and data type of a field',
                'How the table is displayed on screen',
              ],
              correct_index: 2,
              explanation: "A column definition names the field and states its type — that's the shape the database enforces. Tables have no built-in row limit or insertion order tied to columns.",
            },
            {
              text: 'Which SQL statement creates a new table?',
              options: ['CREATE TABLE', 'INSERT INTO', 'MAKE TABLE', 'SELECT FROM'],
              correct_index: 0,
              explanation: 'CREATE TABLE defines a new grid of columns. INSERT INTO adds rows to a table that already exists, and MAKE TABLE is not real SQL syntax.',
            },
            {
              text: 'What does NOT NULL on a column mean?',
              options: [
                'The column can only hold the number zero',
                'Every row must supply a value for that column',
                'The column is automatically indexed',
                'The column cannot be part of a PRIMARY KEY',
              ],
              correct_index: 1,
              explanation: 'NOT NULL is a constraint that rejects any row leaving that column empty. It has nothing to do with the number zero, indexing, or primary keys.',
            },
            {
              text: 'What is a PRIMARY KEY used for?',
              options: [
                'Sorting the table alphabetically',
                'Storing the largest value in a column',
                'Uniquely identifying each row',
                'Marking which column is displayed first',
              ],
              correct_index: 2,
              explanation: 'A PRIMARY KEY guarantees each row has a unique, non-null identifier, which is how other tables and queries reliably refer back to that exact row.',
            },
            {
              text: 'Why is price declared as NUMERIC instead of TEXT in a products table?',
              options: [
                'NUMERIC values print faster on screen',
                'TEXT columns cannot have a DEFAULT value',
                'NUMERIC supports arithmetic like summing and comparing',
                'PRIMARY KEY columns must be adjacent to NUMERIC columns',
              ],
              correct_index: 2,
              explanation: "You'll want to sum, compare, and sort prices, and a TEXT column doesn't support any of that reliably — '9' and '10' would even sort in the wrong order as text.",
            },
            {
              text: 'A column is declared BOOLEAN DEFAULT TRUE. You insert a row without mentioning that column. What happens?',
              options: [
                'The insert fails because the column was not supplied',
                'The column is left as NULL',
                'The column is automatically set to TRUE',
                'The column is set to FALSE, the opposite of TRUE',
              ],
              correct_index: 2,
              explanation: 'DEFAULT TRUE tells the database what value to use when none is given, so the row is filled in with TRUE automatically rather than failing or staying empty.',
            },
            {
              text: 'Why is a phone number usually stored as TEXT rather than INTEGER?',
              options: [
                'TEXT columns are always shorter to store',
                'Phone numbers can start with 0 or include symbols like + and -',
                'INTEGER columns cannot be part of a table',
                'Phone numbers must be sorted numerically',
              ],
              correct_index: 1,
              explanation: 'An INTEGER silently drops a leading zero and cannot hold a plus sign or dashes at all. Since you never do arithmetic on a phone number, TEXT is the right fit even though it looks like a number.',
            },
            {
              text: 'You insert the text \'free\' into a column declared NUMERIC NOT NULL. What should you expect?',
              options: [
                'The value is stored as the number 0',
                'The insert is rejected because the value does not match the type',
                'The value is stored as NULL',
                'The value is silently converted to TEXT',
              ],
              correct_index: 1,
              explanation: "A NUMERIC column only accepts numeric values, so a non-numeric string like 'free' fails the insert immediately rather than being coerced into something else.",
            },
            {
              text: 'Why does a PRIMARY KEY offer a stronger guarantee than "a column that just happens not to repeat yet"?',
              options: [
                'The database actively enforces uniqueness on a PRIMARY KEY at insert time',
                'A PRIMARY KEY column cannot be read by ordinary SELECT queries',
                'Only PRIMARY KEY columns can hold text values',
                'A PRIMARY KEY is recalculated every time the table is queried',
              ],
              correct_index: 0,
              explanation: "An ordinary column with no constraint will happily accept a duplicate the moment one is inserted. A PRIMARY KEY is checked and rejected automatically, so the guarantee doesn't depend on luck.",
            },
            {
              text: 'What is the main risk of treating a table like a spreadsheet where "any cell can hold anything"?',
              options: [
                'Spreadsheets are slower than databases',
                'Type and NOT NULL rules stop being enforced only in your imagination, not in reality',
                'The table will refuse to store any data at all',
                'Rows would need to be inserted in alphabetical order',
              ],
              correct_index: 1,
              explanation: 'The database always enforces column types and constraints regardless of how you picture the table — a mismatched value is rejected, it never just quietly sits in the "wrong" shape.',
            },
            {
              text: 'In CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT);, which column is allowed to be left empty?',
              options: ['id', 'name', 'email', 'None of the columns can be empty'],
              correct_index: 2,
              explanation: 'Only email has no NOT NULL constraint here. id is a PRIMARY KEY (never null) and name is explicitly NOT NULL, so email is the one column that may be left out.',
            },
            {
              text: 'Why does the database enforcing table shape benefit the application code built on top of it?',
              options: [
                'It makes the database run without needing a server',
                'It removes the need for the application to defensively re-check basic data shape everywhere it reads a row',
                'It allows every column to hold any data type',
                'It means queries never need a WHERE clause',
              ],
              correct_index: 1,
              explanation: 'Because the database rejects bad data at write time, code that reads the table later can trust its shape instead of re-validating types and required fields at every read site.',
            },
            {
              text: 'Which statement about column types is correct?',
              options: [
                'A column\'s type is only a suggestion; any value can still be stored',
                'A column\'s type restricts what values can be stored in it',
                'Column types only matter for PRIMARY KEY columns',
                'Column types are optional and can be omitted entirely',
              ],
              correct_index: 1,
              explanation: "A column's type is a real constraint the database checks on every insert or update, not a hint — that's exactly why 'free' cannot land in a NUMERIC column.",
            },
            {
              text: 'What best describes the relationship between "columns" and "rows" in a table?',
              options: [
                'Columns are the shape of the data, rows are the actual data',
                'Rows are the shape of the data, columns are the actual data',
                'Columns and rows are two names for the same thing',
                'Columns hold data only for the first row',
              ],
              correct_index: 0,
              explanation: 'Columns are defined once, in CREATE TABLE, and describe what every row must contain. Rows are the individual records that fill in those slots.',
            },
          ],
        },
        medium: {
          title: 'Designing Tables and Relationships',
          body: `Real data rarely fits in one table. If you store a customer's name on every order, you repeat it, and a typo in one row makes the data disagree with itself. Instead you split the data: customers live in one table, orders in another, and orders point back at customers with a foreign key.

    CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      customer_id INTEGER NOT NULL,
      total NUMERIC,
      FOREIGN KEY (customer_id)
        REFERENCES customers(id)
    );

The customer_id column holds the id of a row in customers. The database refuses to insert an order pointing at a customer that does not exist. That is referential integrity: the database will not let one table's data lie about another table's data.

Walking through this schema: customer_id is NOT NULL, so every order must belong to somebody; it is also constrained by FOREIGN KEY (customer_id) REFERENCES customers(id), so it must belong to somebody real. Try INSERT INTO orders (customer_id, total) VALUES (9999, 42); when no customer with id 9999 exists, and the database rejects the insert outright, rather than silently creating an order that points nowhere.

A second example shows the same idea one level deeper, with a table that references two others at once:

    CREATE TABLE enrollments (
      id INTEGER PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id),
      course_id INTEGER NOT NULL REFERENCES courses(id),
      UNIQUE (student_id, course_id)
    );

This models "a student can take many courses, and a course can have many students" — a many-to-many relationship, which cannot be captured with a single foreign key on either side. The enrollments table exists purely to record which pairs go together, and the UNIQUE constraint on (student_id, course_id) together stops the same student being enrolled in the same course twice, while still letting them enroll in many different courses.

The classic mistake is over-trusting duplication for convenience: copying the customer email into orders "so the query is simpler". Now an email change has to be applied in two places, and sooner or later it is not — a customer updates their email in their profile, but old orders still show the stale address, and a report built from orders quietly disagrees with the one built from customers. Store each fact once and reference it.

A second mistake is forgetting UNIQUE where it actually matters. A PRIMARY KEY is unique, but a column like email is not unless you say so explicitly, and duplicate accounts will creep in the moment two signups happen to use the same address.

A third, subtler mistake is modeling a many-to-many relationship as if it were one-to-many — for instance, adding a single course_id column directly to the students table. That only allows one course per student, and the day a student needs two courses, the whole design has to be reworked. Recognizing "many can have many" early, and reaching for a join table like enrollments, saves that rework.

This matters because a schema is not just a technical detail — it is a claim about how the real world is shaped, encoded so the database can check it for you. Getting the relationships right up front (one-to-many via a foreign key, many-to-many via a join table) means the constraints do real work: they catch bugs the moment bad data is attempted, rather than months later when a report doesn't add up and nobody can say why. Retrofitting a missing relationship into a live table with real data is far more painful than modeling it correctly from the start.

Key takeaway: split data into tables so each fact lives once, and link them with foreign keys — including a join table when the relationship is many-to-many.`,
          questions: [
            {
              text: 'What is a foreign key?',
              options: [
                'A password used to connect to a remote database',
                'A column that references the primary key of another table',
                'A key that automatically sorts rows across tables',
                'A backup copy of the primary key column',
              ],
              correct_index: 1,
              explanation: 'A foreign key is a column whose values must match the primary key of a row in another table, which is exactly how orders.customer_id points at customers.id.',
            },
            {
              text: 'Why avoid storing the customer name on every order row?',
              options: [
                'The duplicated values can drift out of sync when one is updated',
                'Text columns are not allowed in an orders table',
                'Foreign keys make the orders table read-only',
                'Duplicated columns slow down every CREATE TABLE statement',
              ],
              correct_index: 0,
              explanation: 'If the name changes in one place but not the other, the two copies disagree, and there is no way for the database to know which one is current.',
            },
            {
              text: 'A FOREIGN KEY constraint prevents which of these?',
              options: [
                'Inserting two orders for the same customer',
                'Inserting an order with a NULL total',
                'Inserting an order whose customer_id matches no customer',
                'Inserting an order with a negative total',
              ],
              correct_index: 2,
              explanation: 'A FOREIGN KEY only checks that the referenced value exists in the other table. It says nothing about duplicates, NULLs in unrelated columns, or the sign of a number.',
            },
            {
              text: 'You want to guarantee no two users share an email. What do you add to the email column?',
              options: ['A UNIQUE constraint', 'A second PRIMARY KEY', 'A NOT NULL constraint', 'A FOREIGN KEY to itself'],
              correct_index: 0,
              explanation: 'UNIQUE is exactly the constraint that rejects a duplicate value. A table can only have one PRIMARY KEY, and NOT NULL only requires a value, not a distinct one.',
            },
            {
              text: 'Which pair of tables best models "a customer can have many orders"?',
              options: [
                'orders, and customers holding an order_id',
                'one table containing both customers and orders as columns',
                'customers, and orders holding a customer_id',
                'two separate copies of the customers table',
              ],
              correct_index: 2,
              explanation: 'The "many" side (orders) holds the foreign key pointing back at the "one" side (customers), so each order names exactly one customer, while a customer can have many matching orders.',
            },
            {
              text: 'How would you model "a student can take many courses, and a course can have many students"?',
              options: [
                'Add a single course_id column to the students table',
                'Add a single student_id column to the courses table',
                'Create a join table like enrollments with both student_id and course_id',
                'Store a comma-separated list of course names in the students table',
              ],
              correct_index: 2,
              explanation: 'A many-to-many relationship needs a separate table recording each valid pairing. A single foreign key column on either side can only capture "one," not "many."',
            },
            {
              text: 'In the enrollments table, what does UNIQUE (student_id, course_id) prevent?',
              options: [
                'A student from ever taking more than one course',
                'The same student being enrolled in the same course twice',
                'Two different students from taking the same course',
                'A course from having any students at all',
              ],
              correct_index: 1,
              explanation: 'A UNIQUE constraint on the pair of columns blocks a duplicate combination, but each column can still repeat on its own — a student can appear in many rows, and so can a course.',
            },
            {
              text: 'You insert a new order with customer_id set to an id that does not exist in customers. With the FOREIGN KEY constraint shown, what happens?',
              options: [
                'The order is inserted and customer_id is left NULL instead',
                'The order is inserted, and a matching customer row is created automatically',
                'The insert is rejected',
                'The insert succeeds, but only the total column is saved',
              ],
              correct_index: 2,
              explanation: 'A foreign key constraint is checked at insert time, and referencing a customer that does not exist fails the whole insert rather than being silently patched up.',
            },
            {
              text: 'A customer changes their email address. In a well-designed schema, how many rows should need updating?',
              options: [
                'Just the one row in the customers table',
                'Every order that customer has ever placed',
                'Every row in every table that mentions the customer',
                'None — email changes are not stored anywhere',
              ],
              correct_index: 0,
              explanation: 'Because the email is stored once, in customers, updating it there is enough — every order still just references the customer by id, so it automatically reflects the new email whenever it is looked up.',
            },
            {
              text: 'Why is copying an email into the orders table "for convenience" considered risky?',
              options: [
                'It makes SELECT queries impossible to write',
                'It creates two copies of the same fact that can silently disagree over time',
                'It requires an additional FOREIGN KEY that is not allowed',
                'It prevents the orders table from having a PRIMARY KEY',
              ],
              correct_index: 1,
              explanation: 'The moment the email changes in one place and not the other, you have two "true" answers to the same question, and nothing forces them to match.',
            },
            {
              text: 'What is referential integrity?',
              options: [
                'The guarantee that every column has a matching type',
                'The guarantee that a foreign key value always points at a row that actually exists',
                'The guarantee that rows are always returned in insertion order',
                'The guarantee that queries run without errors',
              ],
              correct_index: 1,
              explanation: 'Referential integrity means the database will not let a foreign key point at nothing — it actively checks that the referenced row exists before allowing the change.',
            },
            {
              text: 'A students table has a single course_id column to record "the course a student is taking." What is the limitation of this design?',
              options: [
                'It cannot support more than 100 students',
                'It only allows each student to be tied to one course at a time',
                'It requires every course to have a UNIQUE constraint',
                'It prevents the students table from having a PRIMARY KEY',
              ],
              correct_index: 1,
              explanation: 'A single foreign key column can only reference one row, so a student could never be enrolled in two courses at once — the relationship needs a join table to support "many" on both sides.',
            },
            {
              text: 'Why might retrofitting a missing foreign key relationship onto a table that already has live data be painful?',
              options: [
                'FOREIGN KEY constraints cannot be added after a table is created, ever',
                'Existing rows may already violate the new constraint and need cleaning up first',
                'It requires renaming the primary key column',
                'It automatically deletes all existing rows',
              ],
              correct_index: 1,
              explanation: 'Adding the constraint later means the database checks every existing row against it, and any row that already points at a non-existent value (or has no value at all) blocks the constraint from being added until it is fixed.',
            },
            {
              text: 'Which of these is a valid reason to add a UNIQUE constraint to a column that already has a PRIMARY KEY on a different column?',
              options: [
                'PRIMARY KEY only guarantees uniqueness for one column per table',
                'To stop duplicate values from appearing in that other column, like email',
                'UNIQUE constraints are required on every column by default',
                'To let the column be referenced by a FOREIGN KEY for the first time',
              ],
              correct_index: 1,
              explanation: 'PRIMARY KEY only enforces uniqueness on the column(s) it is declared on. Any other column that also needs to be one-of-a-kind, like email, needs its own UNIQUE constraint.',
            },
            {
              text: 'What is the main purpose of a join table like enrollments?',
              options: [
                'To store a backup of the students and courses tables',
                'To record which pairs of rows from two tables are associated with each other',
                'To speed up SELECT * queries on the students table',
                'To replace the need for primary keys on students and courses',
              ],
              correct_index: 1,
              explanation: "A join table's rows exist purely to say 'this student and this course go together,' which is exactly what a many-to-many relationship needs and a single foreign key column cannot express.",
            },
          ],
        },
        hard: {
          title: 'Constraints, NULLs and Schema Changes',
          body: `Constraints are the rules the database will not let you break, and their edge cases surprise people. NULL means "unknown", not "empty" and not "zero". Two NULLs are not considered equal, so a UNIQUE column can usually hold many NULL rows even though it rejects two identical non-null values. That single fact trips up more schema designs than almost anything else in this course, so it is worth sitting with: UNIQUE does not mean "no repeats of anything," it means "no repeats of anything we can actually compare."

Comparisons with NULL are not true or false but unknown, so a filter never matches them:

    SELECT * FROM users
    WHERE email <> 'a@b.com';

That query drops every user whose email is NULL, because comparing NULL to a value yields unknown, not true, and WHERE only keeps rows where the condition is true — unknown is treated the same as false. You need IS NULL or IS NOT NULL to test for NULL at all; nothing else works, including = NULL, which is always unknown no matter what is on the left.

A second example shows the same three-valued logic biting a compound condition:

    SELECT * FROM users
    WHERE country = 'GH' AND email IS NOT NULL
    OR discount > 0;

Walking through this: if a row has NULL in discount, the comparison discount > 0 is unknown, and unknown OR true is still true, so a row can slip into the results through the OR branch even though you meant the AND branch to be the gate. Precedence and NULL logic combine here in a way that is easy to misread; parenthesizing the intended grouping explicitly — (country = 'GH' AND email IS NOT NULL) OR discount > 0 — at least makes the actual behavior visible, even if it doesn't change it.

Deleting a referenced row raises the next question: what happens to the children? ON DELETE CASCADE deletes them too, ON DELETE SET NULL orphans them by nulling the foreign key, and the default RESTRICT simply refuses the delete, leaving both rows in place until you deal with the children first. Choosing CASCADE casually is how people lose data — a script that deletes a handful of test customers can silently take out every order, payment, and login tied to them if CASCADE was set up for convenience during development and never revisited.

A second constraint mistake is assuming a CHECK constraint runs on every value ever inserted, when it actually only runs going forward. Adding CHECK (total >= 0) to an orders table does not retroactively fix rows that already have a negative total — it only stops new violations from getting in.

A third mistake is adding a NOT NULL column to a table that already has rows: it fails outright unless you supply a DEFAULT, because the existing rows have no value to put there, and the database refuses to silently invent one. Some engines let you add the column as nullable first, backfill the values, and then alter it to NOT NULL — a two-step move that avoids the immediate failure.

This matters because production databases are rarely built once and left alone; they get new columns, new constraints, and new foreign keys added to tables that already hold real, messy data. Understanding that NULL behaves as "unknown" rather than as a value, and that constraints are checked going forward rather than retroactively, is what separates a migration that runs cleanly from one that locks the table, fails halfway through, and leaves you debugging a partially-applied schema change at an inconvenient hour.

Key takeaway: NULL is unknown, not empty and not equal to itself, and constraints decide what the database refuses to do from this point forward.`,
          questions: [
            {
              text: 'A column is UNIQUE and nullable. What does the database usually allow?',
              options: [
                'Several rows with the same non-null value',
                'Exactly one row in the whole table',
                'Several rows with NULL in that column',
                'No rows at all until a value is provided',
              ],
              correct_index: 2,
              explanation: 'UNIQUE only rejects duplicate non-null values. Since NULL is never considered equal to another NULL, most databases allow many rows to hold NULL in a UNIQUE column.',
            },
            {
              text: "Why does WHERE email <> 'a@b.com' exclude rows where email is NULL?",
              options: [
                'NULL is treated as the empty string, which equals the value',
                'The comparison evaluates to unknown, so the row is not kept',
                'The optimizer skips nullable columns in WHERE clauses',
                'NULL is automatically converted to the string being compared',
              ],
              correct_index: 1,
              explanation: 'Any comparison involving NULL — equals, not-equals, greater-than — evaluates to unknown rather than true or false, and WHERE only keeps rows where the result is true.',
            },
            {
              text: 'Which is the correct way to find rows with no email?',
              options: [
                'WHERE email IS NULL',
                'WHERE email = NULL',
                "WHERE email = ''",
                'WHERE email == NULL',
              ],
              correct_index: 0,
              explanation: "IS NULL is a special test built for this exact case. WHERE email = NULL never matches anything, because comparing to NULL with = always evaluates to unknown, not true.",
            },
            {
              text: 'You delete a customer that still has orders, and the foreign key uses ON DELETE CASCADE. What happens?',
              options: [
                'The delete is rejected because orders still reference the customer',
                'The orders remain but their customer_id becomes NULL',
                'The customer and their orders are both deleted',
                'Only the customer is deleted; the orders are left pointing at a deleted row',
              ],
              correct_index: 2,
              explanation: 'ON DELETE CASCADE means deleting the parent row automatically deletes every child row that referenced it, rather than blocking the delete or leaving orphaned references.',
            },
            {
              text: 'Adding a NOT NULL column to a table that already contains rows fails unless you also:',
              options: [
                'Provide a DEFAULT value for the new column',
                'Drop the primary key first',
                'Make the column UNIQUE as well',
                'Delete all existing rows first',
              ],
              correct_index: 0,
              explanation: 'Existing rows need some value for the new column, and a DEFAULT tells the database what to fill in. Without one, there is no value to satisfy NOT NULL for rows that already exist.',
            },
            {
              text: 'In WHERE country = \'GH\' AND email IS NOT NULL OR discount > 0, a row has discount = NULL. Can it still appear in the result?',
              options: [
                'No, NULL always makes the whole condition false',
                'Yes, if the OR discount > 0 branch is somehow satisfied by another true condition',
                'Only if country is also NULL',
                'No, because OR requires both sides to be true',
              ],
              correct_index: 1,
              explanation: 'The condition is really two branches joined by OR. If country and email make the first branch false, the row still gets a chance through the second branch — NULL only makes that particular sub-condition unknown, not the whole expression.',
            },
            {
              text: 'What does a CHECK (total >= 0) constraint do to rows that were inserted before the constraint was added?',
              options: [
                'It deletes any row that violates the check',
                'It retroactively updates negative totals to zero',
                'Nothing — it only prevents new violations from being inserted going forward',
                'It converts negative totals to their absolute value',
              ],
              correct_index: 2,
              explanation: 'Adding a constraint does not rewrite existing data. Rows inserted before the CHECK existed can still violate it; the constraint only blocks new inserts or updates that would violate it from now on.',
            },
            {
              text: 'Why can adding a NOT NULL column to a large, live table be risky in a single step?',
              options: [
                'NOT NULL columns cannot hold text values',
                'Existing rows have no value for the new column, so the ALTER fails without a default, and some engines lock the table while backfilling',
                'It automatically drops the primary key',
                'It converts the table to a different storage engine',
              ],
              correct_index: 1,
              explanation: 'Every existing row needs a value the moment the constraint is applied. Without a default supplied, the operation fails outright, and even with one, filling in millions of rows can briefly lock the table.',
            },
            {
              text: 'Two rows both have NULL in a UNIQUE column. According to standard SQL NULL semantics, are they considered duplicates of each other?',
              options: [
                'Yes, because both are missing the same way',
                'No, because NULL is never equal to NULL, even itself',
                'Only if the column is also the PRIMARY KEY',
                'It depends on the order the rows were inserted in',
              ],
              correct_index: 1,
              explanation: 'NULL represents "unknown," and two unknowns are not provably the same value, so SQL treats NULL = NULL as unknown rather than true — which is why UNIQUE lets multiple NULLs through.',
            },
            {
              text: 'ON DELETE SET NULL is configured on orders.customer_id. You delete a customer with existing orders. What happens to those orders?',
              options: [
                'They are deleted along with the customer',
                'They remain, with customer_id set to NULL',
                'The delete is rejected until the orders are removed',
                'They are moved to an archive table automatically',
              ],
              correct_index: 1,
              explanation: 'SET NULL keeps the child rows but clears the foreign key, orphaning them rather than deleting or blocking. This is different from CASCADE (deletes children) and RESTRICT (blocks the delete).',
            },
            {
              text: 'What is the default behavior of a foreign key when you attempt to delete a referenced row, if no ON DELETE option is specified?',
              options: [
                'CASCADE — the children are deleted automatically',
                'SET NULL — the children are orphaned automatically',
                'RESTRICT — the delete is refused while references exist',
                'IGNORE — the delete succeeds and the reference is left dangling',
              ],
              correct_index: 2,
              explanation: 'Without an explicit ON DELETE clause, most databases default to RESTRICT (or an equivalent NO ACTION), refusing the delete rather than silently cascading or nulling anything.',
            },
            {
              text: 'A migration script deletes a handful of test customers, and ON DELETE CASCADE was left over from development. What is the realistic risk?',
              options: [
                'The script will simply fail with a permissions error',
                'Every order, payment, and login tied to those customers is silently deleted too',
                'The customers table will be locked permanently',
                'Nothing — CASCADE only applies to SELECT queries',
              ],
              correct_index: 1,
              explanation: 'CASCADE is not scoped to "just test data" — it deletes every row in every table that references the deleted row via that foreign key, which can be far more data loss than intended.',
            },
            {
              text: 'Why is it inaccurate to describe UNIQUE as "no repeated values are ever allowed" for a nullable column?',
              options: [
                'Because UNIQUE only applies to numeric columns',
                'Because NULL is exempt from the uniqueness check, so multiple NULLs typically pass',
                'Because UNIQUE constraints are disabled by default',
                'Because UNIQUE only checks the first ten rows of a table',
              ],
              correct_index: 1,
              explanation: 'UNIQUE is a comparison-based rule, and NULL cannot be meaningfully compared to another NULL, so most databases let any number of NULLs coexist in a UNIQUE column.',
            },
            {
              text: 'What is a safer two-step approach for adding a NOT NULL column to a large table with existing rows?',
              options: [
                'Add the column as nullable, backfill values, then alter it to NOT NULL',
                'Add the NOT NULL constraint first, then insert a default value into it',
                'Rename the table, add the column, then rename it back',
                'Add a second table with the same name and merge them',
              ],
              correct_index: 0,
              explanation: 'Adding the column as nullable avoids the immediate failure, backfilling gives every existing row a real value, and only then does tightening it to NOT NULL succeed without complaint.',
            },
            {
              text: 'Which best summarizes how three-valued logic (true / false / unknown) affects WHERE clauses?',
              options: [
                'WHERE keeps rows where the condition is true or unknown',
                'WHERE keeps rows only where the condition evaluates to true; unknown is excluded like false',
                'WHERE treats unknown the same as true',
                'Three-valued logic only applies inside HAVING, never WHERE',
              ],
              correct_index: 1,
              explanation: 'A WHERE clause only lets a row through when its condition is definitely true. Both false and unknown (the NULL case) are excluded, which is why NULL comparisons so often make rows disappear unexpectedly.',
            },
          ],
        },
      },
    },
    {
      topic: 'queries',
      lessons: {
        easy: {
          title: 'Reading Data with SELECT',
          body: `A query asks the database a question. The SELECT statement is how you ask it. You name the columns you want, the table they come from, and optionally a condition that rows must satisfy.

    SELECT name, email
    FROM users
    WHERE country = 'GH'
    ORDER BY name
    LIMIT 10;

Read that as: take the users table, keep only rows where country is GH, sort what remains by name, return the first ten, and show just the name and email columns. Walking through it clause by clause in the order the database actually evaluates it: FROM picks the table, WHERE filters it down to matching rows, ORDER BY sorts what's left, LIMIT trims it to ten, and only then does SELECT decide which columns of those ten rows to display. SELECT * means "every column", which is fine while exploring but wasteful in real code, since it pulls data you may never use and breaks quietly if someone adds a new column later.

A second example shows a few more pieces working together:

    SELECT name, price
    FROM products
    WHERE price BETWEEN 10 AND 50
      AND in_stock = TRUE
    ORDER BY price DESC
    LIMIT 5;

Here BETWEEN 10 AND 50 is shorthand for price >= 10 AND price <= 50 — it is inclusive on both ends, which surprises people who expect it to behave like a half-open range. AND combines two conditions, so a row only survives if both are true. DESC reverses the usual ascending sort, so this returns the five most expensive in-stock products between 10 and 50. Swap DESC for ASC, or drop it entirely, and you'd get the five cheapest instead.

The gotcha that catches everyone once is quoting. Single quotes wrap text values; they do not wrap column names. Writing WHERE 'country' = 'GH' compares the literal word country to the literal word GH, which is never true, so you get zero rows and no error to explain why — the query is syntactically valid, it just asks a different question than you meant.

A second common mistake is assuming SELECT * is harmless because "it just gets everything." In a real table with dozens of columns, some of them large text or binary blobs, SELECT * can pull far more data across the network than the application actually uses, and it silently changes shape the moment someone adds a column, which can break code that assumed a fixed set of columns in a fixed order.

A third mistake is misplacing LIMIT relative to ORDER BY, or forgetting ORDER BY altogether before applying LIMIT. LIMIT 10 without an ORDER BY does not mean "the first ten rows in some sensible order" — it means ten rows in whatever order the database happens to produce them internally, which can change between runs of the exact same query.

Also note that a table has no inherent order. Without ORDER BY, the order you get back is not guaranteed, even if it looks stable today; the database is free to change its internal storage or query plan at any time, and your "stable" order can shift without warning.

This matters because SELECT is the query you will write more than any other, in every application that touches a database. Getting comfortable with exactly which clause does which job — FROM the source, WHERE the filter, ORDER BY the sort, LIMIT the cap, SELECT the display columns — means you can read any query, however long, by breaking it into those same small, familiar pieces.

Key takeaway: SELECT chooses columns, WHERE chooses rows, and ORDER BY is the only thing that guarantees order.`,
          questions: [
            {
              text: 'Which clause decides which ROWS come back?',
              options: ['WHERE', 'SELECT', 'ORDER BY', 'LIMIT'],
              correct_index: 0,
              explanation: 'WHERE is the filter that decides, row by row, whether it belongs in the result. SELECT picks columns, ORDER BY only sorts, and LIMIT only caps a count.',
            },
            {
              text: 'What does SELECT * mean?',
              options: ['Return every table', 'Return only distinct rows', 'Return every column', 'Return every row regardless of WHERE'],
              correct_index: 2,
              explanation: 'The asterisk is shorthand for "all columns of the table(s) named in FROM." It has no effect on which rows are returned — WHERE still filters rows normally.',
            },
            {
              text: 'How do you write a text value in a WHERE clause?',
              options: [
                'In square brackets, like [GH]',
                "In single quotes, like 'GH'",
                'With no quotes at all, like GH',
                'In double quotes, like "GH"',
              ],
              correct_index: 1,
              explanation: "Single quotes mark a text literal in standard SQL. Writing GH with no quotes would be read as a column or identifier name instead of the text value.",
            },
            {
              text: 'What does LIMIT 10 do?',
              options: [
                'Returns at most 10 rows',
                'Returns only the first 10 columns',
                'Searches only the first 10 rows of the table',
                'Returns exactly 10 rows, inserting blanks if fewer match',
              ],
              correct_index: 0,
              explanation: 'LIMIT caps how many result rows come back — at most that many. If fewer rows match the query, you simply get fewer rows, not padding.',
            },
            {
              text: 'Without an ORDER BY clause, what order are rows returned in?',
              options: [
                'Always the order they were inserted',
                'No guaranteed order',
                'Always sorted by the primary key',
                'Reverse of the order they were inserted',
              ],
              correct_index: 1,
              explanation: 'A table has no inherent order. Without ORDER BY, the database is free to return rows in whatever order is convenient for it internally, and that order can change between runs.',
            },
            {
              text: "In WHERE price BETWEEN 10 AND 50, is a product priced at exactly 50 included?",
              options: [
                'Yes, BETWEEN is inclusive on both ends',
                'No, BETWEEN excludes both endpoints',
                'Only if ORDER BY is also used',
                'No, 50 would need to be written as 50.01',
              ],
              correct_index: 0,
              explanation: 'BETWEEN x AND y is shorthand for >= x AND <= y, so both endpoints are included — a price of exactly 50 passes the condition.',
            },
            {
              text: "Why does WHERE 'country' = 'GH' return zero rows even on a table full of Ghanaian users?",
              options: [
                "It compares the literal text 'country' to the literal text 'GH', which is never true",
                "It causes a syntax error that is silently swallowed",
                "Quoting a column name always excludes NULL rows",
                "'country' is treated as a number and fails to compare",
              ],
              correct_index: 0,
              explanation: "Quoting country turns it into a text value instead of a column reference, so the query compares two fixed strings that never match, rather than checking each row's country column.",
            },
            {
              text: 'In a query with WHERE, ORDER BY, and LIMIT together, in what order does the database conceptually apply them?',
              options: [
                'LIMIT, then WHERE, then ORDER BY',
                'ORDER BY, then WHERE, then LIMIT',
                'WHERE, then ORDER BY, then LIMIT',
                'All three are applied simultaneously with no defined order',
              ],
              correct_index: 2,
              explanation: 'Rows are filtered first, then the surviving rows are sorted, and only then is the row count trimmed — reversing this would give a different, usually wrong, result.',
            },
            {
              text: 'Why can SELECT * be wasteful in application code, beyond just being less precise?',
              options: [
                'It always disables ORDER BY',
                'It can pull unused columns across the network and silently changes shape if columns are added later',
                'It prevents WHERE clauses from being used at all',
                'It forces the query to scan every table in the database',
              ],
              correct_index: 1,
              explanation: "SELECT * fetches every column whether the caller needs it or not, and if a new column is added to the table later, every SELECT * query starts returning it too, which can break code expecting a fixed shape.",
            },
            {
              text: 'You run SELECT name, price FROM products WHERE price BETWEEN 10 AND 50 AND in_stock = TRUE ORDER BY price DESC LIMIT 5. What does DESC control?',
              options: [
                'It limits the query to 5 rows',
                'It sorts matching rows from highest price to lowest',
                'It filters out any product priced below 10',
                'It reverses the column order in the output',
              ],
              correct_index: 1,
              explanation: 'DESC (descending) sorts the ORDER BY column from largest to smallest. Filtering by price range is the job of WHERE, and row count is the job of LIMIT — DESC only affects sort direction.',
            },
            {
              text: 'A query has ORDER BY name ASC but no LIMIT. What happens?',
              options: [
                'The query fails, since LIMIT is required whenever ORDER BY is used',
                'Only the first row is returned',
                'All matching rows are returned, sorted by name in ascending order',
                'The query returns rows in a random order despite ORDER BY',
              ],
              correct_index: 2,
              explanation: 'LIMIT is entirely optional. Without it, ORDER BY still sorts every matching row — it just returns all of them instead of trimming to a smaller count.',
            },
            {
              text: 'Which of these correctly filters for rows where the country column equals the text "GH"?',
              options: [
                "WHERE country = 'GH'",
                "WHERE 'country' = 'GH'",
                'WHERE country = GH',
                "WHERE country == 'GH'",
              ],
              correct_index: 0,
              explanation: "country (unquoted) refers to the column, and 'GH' (quoted) is the text value being compared against it — exactly the pairing SQL expects for a text comparison.",
            },
            {
              text: 'Why might relying on LIMIT 10 without ORDER BY to "get a sample of the data" be unreliable?',
              options: [
                'LIMIT without ORDER BY always throws an error',
                'The ten rows returned are not guaranteed to be the same each time the query runs',
                'LIMIT only works with ORDER BY DESC',
                'It would return exactly 10 columns, not rows',
              ],
              correct_index: 1,
              explanation: 'Without an ORDER BY to pin down which rows come first, the database can return a different arbitrary set of ten rows on different runs, especially as the underlying data or query plan changes.',
            },
            {
              text: 'What is the effect of adding AND in_stock = TRUE to a WHERE clause that already filters on price?',
              options: [
                'It replaces the price condition entirely',
                'It requires both the price condition and the in_stock condition to be true for a row to be kept',
                'It only applies to the first matching row',
                'It sorts in-stock products before out-of-stock ones',
              ],
              correct_index: 1,
              explanation: 'AND combines two conditions so that a row must satisfy both to survive the filter — a cheap out-of-stock product, or an in-stock product outside the price range, would each be excluded.',
            },
            {
              text: 'Which statement about SELECT name, email FROM users is accurate?',
              options: [
                'It returns every column of users, but only for rows named in email',
                'It returns only the name and email columns for every row that passes the WHERE clause (or all rows, if there is none)',
                'It creates two new tables named "name" and "email"',
                'It fails unless a WHERE clause is also present',
              ],
              correct_index: 1,
              explanation: 'Listing columns after SELECT limits the output to just those columns; WHERE clauses are entirely optional, and without one every row is a candidate for the result.',
            },
          ],
        },
        medium: {
          title: 'Filtering, Grouping and Aggregates',
          body: `Beyond fetching rows, SQL can summarise them. Aggregate functions collapse many rows into one value: COUNT, SUM, AVG, MIN, MAX. GROUP BY says which rows get collapsed together.

    SELECT country, COUNT(*) AS users
    FROM users
    WHERE active = TRUE
    GROUP BY country
    HAVING COUNT(*) > 5
    ORDER BY users DESC;

That counts active users per country and keeps only countries with more than five. Note the two filters. WHERE runs before grouping and filters individual rows. HAVING runs after grouping and filters the groups. Putting an aggregate in WHERE is an error, because at that point the groups do not exist yet — WHERE only ever sees one row at a time, never a collapsed group.

A second example groups by more than one column and mixes in a different aggregate:

    SELECT country, plan, AVG(monthly_spend) AS avg_spend
    FROM subscriptions
    GROUP BY country, plan
    HAVING AVG(monthly_spend) > 20
    ORDER BY country, avg_spend DESC;

Walking through it: GROUP BY country, plan means rows are bucketed by the combination of both columns, so "GH, premium" and "GH, basic" become two separate groups even though they share a country. AVG(monthly_spend) is computed once per group, HAVING then drops any group averaging 20 or less, and the final ORDER BY sorts first by country and, within each country, by spend descending. The output has one row per surviving (country, plan) pair, not one row per original subscription.

The other classic trap is COUNT(*) versus COUNT(column). COUNT(*) counts rows, full stop. COUNT(email) counts only rows where email is not NULL, so the two disagree whenever the column has missing values — a group of 10 rows where 3 have a NULL email gives COUNT(*) = 10 but COUNT(email) = 7. AVG and SUM ignore NULLs too, which means an average is computed over the non-null rows only, not over all of them with NULL treated as zero; that distinction changes the actual number, sometimes substantially, on a column with a lot of missing data.

A second mistake is selecting a column that is neither aggregated nor listed in GROUP BY. SELECT country, name, COUNT(*) FROM users GROUP BY country is ambiguous — which name should represent the whole group? Some databases reject this outright as an error; others silently pick an arbitrary row's name, which is almost never what you wanted and can look correct in testing while being wrong in general.

A third mistake is forgetting that HAVING can filter on an aggregate that isn't even in the SELECT list. HAVING AVG(monthly_spend) > 20 works whether or not avg_spend appears in the output columns, which surprises people used to thinking HAVING can only reference what's already being displayed.

This matters because grouping and aggregation are how raw transactional data becomes the summaries a business actually looks at — active users per country, average order value per month, top spenders per plan. Almost every dashboard or report you will ever build sits on top of a GROUP BY query, and a subtly wrong COUNT or an accidentally ambiguous non-aggregated column produces a number that looks entirely plausible while being quietly incorrect, which is far more dangerous than a query that simply fails to run.

It also matters that grouping is a two-step mental model, not one: first decide which rows survive at all (WHERE), then decide how the survivors get bucketed and summarised (GROUP BY plus the aggregate functions), then decide which of those buckets are interesting enough to keep (HAVING). Trying to do all three in a single clause is exactly where the "aggregate in WHERE" error and the "ambiguous column" error both come from — both mistakes are really the same misunderstanding, applied to a different clause. Once the three-step model clicks, both errors stop being mysterious and start being predictable, which is a good sign you're actually reasoning about the query rather than pattern-matching it against an example you've seen before.

Key takeaway: WHERE filters rows before grouping, HAVING filters groups after, and aggregates skip NULLs.`,
          questions: [
            {
              text: 'What does GROUP BY country do?',
              options: [
                'Sorts the output rows by country',
                'Collapses rows into one output row per distinct country',
                'Removes rows where country is NULL',
                'Filters out countries with fewer than 5 rows',
              ],
              correct_index: 1,
              explanation: 'GROUP BY buckets rows sharing the same value into a single group, producing one output row per distinct value — sorting, NULL removal, and count filtering are separate jobs done by other clauses.',
            },
            {
              text: 'Which clause filters groups rather than individual rows?',
              options: ['HAVING', 'WHERE', 'LIMIT', 'ORDER BY'],
              correct_index: 0,
              explanation: 'HAVING runs after GROUP BY has collapsed rows into groups, so it can filter on aggregate values like COUNT or AVG that only make sense once a group exists.',
            },
            {
              text: 'A table has 100 rows, and 30 of them have a NULL email. What does COUNT(email) return?',
              options: ['70', '100', '30', '0'],
              correct_index: 0,
              explanation: 'COUNT(column) only counts rows where that column is not NULL, so it skips the 30 NULL rows and counts the remaining 70.',
            },
            {
              text: 'Why is WHERE COUNT(*) > 5 invalid?',
              options: [
                'COUNT can only be used inside SELECT',
                'WHERE is evaluated before grouping, so aggregates do not exist yet',
                'Comparison operators are not allowed with aggregates',
                'COUNT(*) can only be compared to 0',
              ],
              correct_index: 1,
              explanation: 'WHERE filters one row at a time, before any grouping happens, so there is no group total for COUNT(*) to refer to yet — that filtering belongs in HAVING, which runs after grouping.',
            },
            {
              text: 'AVG(score) is computed over a column with some NULLs. Those NULL rows are:',
              options: [
                'Treated as zero, dragging the average down',
                'Causing the whole result to be NULL',
                'Ignored entirely, so the average is over non-null rows',
                'Counted twice, once as NULL and once as zero',
              ],
              correct_index: 2,
              explanation: 'AVG (like SUM, MIN, and MAX) skips NULLs rather than treating them as zero, so the average reflects only the rows that actually have a score.',
            },
            {
              text: 'In GROUP BY country, plan, how are rows with the same country but different plan values treated?',
              options: [
                'They are merged into the same group because the country matches',
                'They form separate groups, one per distinct combination of country and plan',
                'The plan column is ignored entirely',
                'An error is raised because GROUP BY only accepts one column',
              ],
              correct_index: 1,
              explanation: 'Grouping by multiple columns buckets rows by the full combination of values, so two rows must match on every grouped column — country and plan — to land in the same group.',
            },
            {
              text: 'Why is SELECT country, name, COUNT(*) FROM users GROUP BY country considered a mistake?',
              options: [
                'COUNT(*) cannot be combined with GROUP BY',
                'name is neither aggregated nor part of GROUP BY, so it is ambiguous which row\'s name to show per group',
                'GROUP BY requires at least two columns',
                'It is actually correct and unambiguous',
              ],
              correct_index: 1,
              explanation: 'Once rows are collapsed into a group, any non-aggregated, non-grouped column like name has many possible values within that group, and the database has no principled way to pick just one.',
            },
            {
              text: 'Can HAVING filter on an aggregate that does not appear in the SELECT list?',
              options: [
                'No, HAVING can only reference columns already being displayed',
                'Yes, HAVING can filter on any aggregate expression regardless of whether it is selected',
                'Only if the aggregate is also in GROUP BY',
                'Only when using SELECT *',
              ],
              correct_index: 1,
              explanation: 'HAVING evaluates its own expression against each group independently of what ends up in the output columns, so an aggregate can be used purely for filtering without being displayed.',
            },
            {
              text: 'A group has 10 rows, 3 of which have a NULL email. What do COUNT(*) and COUNT(email) return for that group, respectively?',
              options: ['10 and 10', '10 and 7', '7 and 10', '7 and 7'],
              correct_index: 1,
              explanation: 'COUNT(*) counts every row regardless of NULLs, giving 10. COUNT(email) only counts rows with a non-null email, giving 7 — the disagreement is the whole point of the distinction.',
            },
            {
              text: 'In SELECT country, plan, AVG(monthly_spend) AS avg_spend ... GROUP BY country, plan ORDER BY country, avg_spend DESC, what does the ORDER BY do?',
              options: [
                'Sorts by country only, ignoring avg_spend entirely',
                'Sorts primarily by country, and within each country, by avg_spend from highest to lowest',
                'Sorts by avg_spend only, ignoring country',
                'Randomizes the order within each country group',
              ],
              correct_index: 1,
              explanation: 'Listing multiple ORDER BY columns creates a priority: rows are sorted by the first column, and ties within that are broken by the second — here alphabetically by country, then by spend descending.',
            },
            {
              text: 'Why does putting an aggregate condition in WHERE fail, while the same condition in HAVING works?',
              options: [
                'WHERE and HAVING are just two names for the exact same clause',
                'WHERE operates on individual rows before groups are formed; HAVING operates on groups after they exist',
                'WHERE only works with text columns, HAVING only with numeric columns',
                'HAVING is deprecated and WHERE is the only valid choice',
              ],
              correct_index: 1,
              explanation: 'By the time WHERE runs, grouping has not happened yet, so there is nothing for an aggregate function to summarize. HAVING runs specifically after GROUP BY, when aggregates are meaningful.',
            },
            {
              text: 'What happens if you GROUP BY country but a query also tries to SELECT the raw (non-aggregated) monthly_spend column for each group?',
              options: [
                'It is always automatically averaged for you',
                'It raises the same ambiguity problem as selecting an ungrouped, non-aggregated column',
                'It is silently dropped from the output',
                'It works fine because monthly_spend is numeric',
              ],
              correct_index: 1,
              explanation: 'Being numeric does not exempt a column from the rule — any column that is neither in GROUP BY nor wrapped in an aggregate function has many candidate values per group, which is exactly the ambiguity that causes an error or arbitrary result.',
            },
            {
              text: 'A country has 6 active users and a HAVING COUNT(*) > 5 filter is applied after GROUP BY country. Does that country\'s group survive?',
              options: [
                'No, because 6 is not strictly greater than 6',
                'Yes, because 6 is greater than 5',
                'It depends on whether WHERE active = TRUE was also applied',
                'Both B and C are relevant to the real answer',
              ],
              correct_index: 3,
              explanation: 'COUNT(*) > 5 does let a group of 6 through on its own, but that count of 6 is computed only over rows that survived any earlier WHERE filter, like active = TRUE — both details matter to get the number right.',
            },
            {
              text: 'Which best describes what SUM(monthly_spend) returns for a group where every row has monthly_spend = NULL?',
              options: [
                '0, because SUM defaults to zero with no values',
                'NULL, because there are no non-null values to sum',
                'An error, because SUM cannot be applied to an all-NULL group',
                'The group is silently excluded from the output',
              ],
              correct_index: 1,
              explanation: 'SUM ignores NULLs, and if every value it would sum is NULL, there is nothing to add up, so the aggregate itself returns NULL rather than defaulting to 0.',
            },
            {
              text: 'Why might COUNT(*) and COUNT(some_column) matter for correctness, not just style?',
              options: [
                'They are always identical, so it never matters which is used',
                'They can disagree whenever some_column has NULLs, so choosing the wrong one silently changes the reported number',
                'COUNT(*) is always faster and should always be preferred instead',
                'COUNT(some_column) always throws an error on nullable columns',
              ],
              correct_index: 1,
              explanation: 'If the intent is "how many rows have a value here," COUNT(*) overstates it whenever there are NULLs, since it counts every row regardless of whether that specific column is filled in.',
            },
          ],
        },
        hard: {
          title: 'Subqueries, Order of Evaluation and Performance',
          body: `SQL is declarative: you describe the result, not the steps. But the logical order of evaluation is fixed, and knowing it explains most confusing errors. It is FROM, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY. Because SELECT runs late, an alias you define there is unavailable in WHERE, though most engines do let ORDER BY use it, since ORDER BY is the very last step and by then the alias has already been computed.

A subquery is a query nested inside another. It can produce a single value, a list, or a whole table:

    SELECT name FROM users
    WHERE id IN (
      SELECT customer_id FROM orders
      WHERE total > 100
    );

Read the inner query first: it produces the list of customer_ids belonging to orders over 100. The outer query then keeps any user whose id shows up in that list. This is an uncorrelated subquery — the inner query does not depend on the outer one, so conceptually it could be run once, and its result list reused for every row of users.

A second example makes the same logic correlated, which changes both its meaning and its cost:

    SELECT name FROM users u
    WHERE EXISTS (
      SELECT 1 FROM orders o
      WHERE o.customer_id = u.id
        AND o.total > 100
    );

Here the inner query references u.id from the outer row, so it cannot be computed once up front — conceptually, the database runs it once per candidate user, asking "does this specific user have a qualifying order?" EXISTS only cares whether the inner query returns any row at all, not what value it returns, which is why SELECT 1 is idiomatic: the actual selected column is irrelevant.

The dangerous edge case is NOT IN with NULLs. If the subquery returns even one NULL, NOT IN yields unknown for every row and the outer query returns nothing at all, silently, with no error to flag it — you just get an empty result set and have to know to be suspicious. IN is safe against this; NOT IN is not, because "x NOT IN (a, b, NULL)" secretly expands to "x <> a AND x <> b AND x <> NULL", and that last comparison is always unknown, poisoning the whole AND chain. Prefer NOT EXISTS, which handles NULLs correctly by asking "does no matching row exist" rather than comparing against a list that might contain an unknown.

Performance-wise, a correlated subquery re-runs (conceptually) once per outer row, which is fine for a handful of rows but can be painfully slow across millions, whereas many uncorrelated subqueries can be rewritten as a join and evaluated once. A second performance trap is wrapping an indexed column in a function inside WHERE: lower(email) = 'a@b.com' usually prevents a plain index on email from being used, because the index stores the original values, not their lowercased form, so the database cannot look up lower(email) in it directly and instead scans every row to compute the function. The fix, if you query this way often, is a function-based or expression index built on lower(email) itself.

This matters because subqueries and evaluation order are exactly where correctness bugs hide behind a query that "looks fine" and returns a plausible-looking, entirely wrong answer — an empty result from a NULL-poisoned NOT IN doesn't crash anything, it just quietly reports "nobody matches" when the real answer is "almost everybody matches." Knowing the evaluation order and the NULL rules is the difference between debugging that in five minutes and staring at a working-looking query for an hour.

Key takeaway: know the evaluation order, and never trust NOT IN against a nullable column.`,
          questions: [
            {
              text: 'What is the logical order of evaluation?',
              options: [
                'FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY',
                'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY',
                'FROM, SELECT, WHERE, ORDER BY, GROUP BY, HAVING',
                'WHERE, FROM, GROUP BY, SELECT, HAVING, ORDER BY',
              ],
              correct_index: 0,
              explanation: 'The database first picks the source table(s), filters rows, groups them, filters groups, chooses output columns, and only then sorts — SELECT and ORDER BY both run near the end, not the start.',
            },
            {
              text: 'Why can a column alias defined in SELECT usually not be used in WHERE?',
              options: [
                'Aliases are only valid inside subqueries',
                'WHERE is evaluated before SELECT, so the alias does not exist yet',
                'WHERE only accepts literal values, never identifiers',
                'Aliases can only be used with aggregate functions',
              ],
              correct_index: 1,
              explanation: 'WHERE runs early in the logical order, well before SELECT computes its aliases, so at the point WHERE is evaluated, that alias simply has not been created yet.',
            },
            {
              text: 'A subquery used with NOT IN returns one NULL among its values. What does the outer query return?',
              options: [
                'All rows, because the NULL is ignored',
                'An error about incompatible types',
                'No rows at all',
                'Only the rows that also appear in the subquery',
              ],
              correct_index: 2,
              explanation: 'NOT IN expands into a chain of AND-ed inequality comparisons, and comparing against the NULL element always yields unknown, which poisons the entire chain to unknown for every row.',
            },
            {
              text: 'Which construct handles NULLs safely when excluding matching rows?',
              options: ['NOT EXISTS', 'NOT IN', 'NOT LIKE', 'IN'],
              correct_index: 0,
              explanation: "NOT EXISTS only checks whether a matching row is present, without ever comparing directly against a list that might contain NULL, so it doesn't suffer NOT IN's poisoning problem.",
            },
            {
              text: "Why can WHERE lower(email) = 'a@b.com' be slow even with a plain index on email?",
              options: [
                'lower() is not a valid SQL function in a WHERE clause',
                'Indexes are only used by ORDER BY, never by WHERE',
                'Wrapping the column in a function prevents the plain index from being used',
                'Indexes only work on numeric columns',
              ],
              correct_index: 2,
              explanation: 'A plain index stores the raw column values, not the result of lower(email), so the database cannot use it to look up the transformed value directly and instead has to compute the function for every row.',
            },
            {
              text: 'What distinguishes a correlated subquery from an uncorrelated one?',
              options: [
                'A correlated subquery references a column from the outer query',
                'A correlated subquery can only return a single value',
                'An uncorrelated subquery must use EXISTS',
                'There is no real difference, only a naming convention',
              ],
              correct_index: 0,
              explanation: 'A correlated subquery reaches out to a column from the enclosing query (like u.id), which means it conceptually has to be re-evaluated for each outer row rather than computed once.',
            },
            {
              text: 'In WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = u.id AND o.total > 100), why is SELECT 1 used instead of a real column?',
              options: [
                'EXISTS requires the number 1 specifically for performance reasons',
                'EXISTS only cares whether any row is returned, not what values that row contains',
                'It is a typo and should be SELECT customer_id',
                'SELECT 1 forces the subquery to return exactly one row',
              ],
              correct_index: 1,
              explanation: 'EXISTS is a pure existence test — it only asks "did the inner query find at least one row?" — so the selected expression is irrelevant, and SELECT 1 is a common convention signaling that clearly.',
            },
            {
              text: 'Why is a correlated subquery often a performance concern on large tables?',
              options: [
                'It can only return boolean values',
                'It conceptually re-runs once per outer row, which grows expensive as the outer table grows',
                'It permanently locks the outer table',
                'It cannot be used with an index at all',
              ],
              correct_index: 1,
              explanation: 'Because it depends on each outer row, the inner query effectively repeats work per row instead of once, and on a table with millions of rows that repetition adds up quickly.',
            },
            {
              text: 'Why does "x NOT IN (a, b, NULL)" always evaluate to unknown, regardless of x?',
              options: [
                'It expands to x <> a AND x <> b AND x <> NULL, and comparing to NULL is always unknown',
                'NOT IN treats NULL as equal to every value',
                'The subquery fails to execute when it contains a NULL',
                'It only happens if x itself is also NULL',
              ],
              correct_index: 0,
              explanation: 'Even if x <> a and x <> b are both true, the ANDed comparison against NULL is unknown, and true AND unknown is still unknown — not true — so the row never survives the filter.',
            },
            {
              text: 'How does an uncorrelated subquery differ conceptually from a correlated one in terms of execution?',
              options: [
                'It references the outer row for every evaluation',
                'It can conceptually be computed once, since it does not depend on the outer query\'s current row',
                'It is always slower than a correlated subquery',
                'It cannot be used with IN, only with EXISTS',
              ],
              correct_index: 1,
              explanation: "Since an uncorrelated subquery doesn't reference anything from the outer query, its result doesn't change per outer row, so query engines can often evaluate it just once and reuse the result.",
            },
            {
              text: 'What is a practical fix for a WHERE clause that must filter on lower(email) frequently, without giving up index performance?',
              options: [
                'Never use lower() in a query',
                'Create a function-based (expression) index on lower(email)',
                'Add ORDER BY lower(email) to every query',
                'Store email in all uppercase instead',
              ],
              correct_index: 1,
              explanation: 'A function-based index precomputes and stores the result of the expression itself, so the database can look up lower(email) directly in the index instead of computing it row by row.',
            },
            {
              text: 'A query defines SELECT total * 1.1 AS total_with_tax, and then tries to reference total_with_tax in its own WHERE clause. What is the likely outcome?',
              options: [
                'It works, because WHERE always runs after SELECT',
                'Most engines reject it, since WHERE is evaluated before the alias is computed in SELECT',
                'It silently returns zero for every row',
                'It automatically converts to a HAVING clause',
              ],
              correct_index: 1,
              explanation: 'WHERE happens before SELECT in the logical order of evaluation, so an alias created in SELECT is not yet available when WHERE runs — most databases raise an error about an unknown column.',
            },
            {
              text: 'Why is IN generally considered safe against NULLs while NOT IN is not?',
              options: [
                'IN never checks equality, only presence',
                'A single NULL in the list can only ever turn one comparison to unknown, and OR-ing unknown with a later true still yields true; NOT IN AND-s the negated comparisons, where a single unknown poisons everything',
                'IN and NOT IN behave identically with NULLs',
                'IN always ignores subqueries that return any NULL values',
              ],
              correct_index: 1,
              explanation: 'IN effectively ORs equality checks together, so as long as one real match is true, the unknown from a NULL comparison doesn\'t matter. NOT IN ANDs the negated checks together, so a single unknown ruins the whole result for every row.',
            },
            {
              text: 'A correlated subquery inside EXISTS references o.customer_id = u.id. If it were rewritten to reference a column that does not exist on the outer table u, what would happen?',
              options: [
                'It silently returns TRUE for every row',
                'The query fails with an error about an unknown column',
                'It automatically falls back to an uncorrelated subquery',
                'It only affects the ORDER BY clause',
              ],
              correct_index: 1,
              explanation: 'A correlation relies on a real column existing on the outer table so the database can look up its value per row; referencing a nonexistent column is simply an invalid identifier and the query fails to parse or run.',
            },
            {
              text: 'Which best explains why a query using NOT IN against a subquery can return an empty result set with no error, even when you expect matches?',
              options: [
                'NOT IN always returns an empty result for subqueries with more than 100 rows',
                'If the subquery returns any NULL, every outer row evaluates to unknown and is silently excluded, producing an empty result with no warning',
                'NOT IN requires an index on the subquery\'s column or it refuses to run',
                'The database always logs an explicit warning when this happens',
              ],
              correct_index: 1,
              explanation: 'There is no error here — the SQL is entirely valid — the NULL just poisons every row\'s comparison to unknown, and an empty result set looks exactly like "no answer," which is why this bug is so easy to miss.',
            },
          ],
        },
      },
    },
    {
      topic: 'joins',
      lessons: {
        easy: {
          title: 'Combining Tables with INNER JOIN',
          body: `Once data is split across tables, you need a way to put it back together for a query. That is what a join does: it matches rows in one table against rows in another using a condition, usually a foreign key matching a primary key.

    SELECT users.name, orders.total
    FROM users
    JOIN orders
      ON orders.user_id = users.id;

For every order, the database finds the user whose id matches that order's user_id, and produces one output row holding columns from both. Walking through it: the database conceptually looks at each row of orders, finds the users row whose id equals that order's user_id, and glues the two rows together into one wider row before handing it to SELECT. The word JOIN on its own means INNER JOIN, which keeps only rows that found a match on both sides. A user with no orders simply does not appear, and an order whose user_id matched nobody (which a foreign key constraint should normally prevent) would not appear either.

A second example joins three tables at once, which is just the same idea chained:

    SELECT users.name, orders.id, order_items.quantity
    FROM users
    JOIN orders
      ON orders.user_id = users.id
    JOIN order_items
      ON order_items.order_id = orders.id;

Each JOIN adds one more ON condition, and the database applies them left to right conceptually: first match users to orders, then match that combined result to order_items. If a user has 2 orders, and each order has 3 items, that user contributes 6 rows to the final result — one per (order, item) combination — which is worth noticing before you try to sum anything across this kind of query.

The mistake to avoid is forgetting the ON clause. Without it you get a cross join: every row of the first table paired with every row of the second. Ten users and ten orders become a hundred meaningless rows, and nothing warns you — the query runs successfully and returns a result, it is just a nonsensical one.

A second mistake is joining on columns that look related by name but are not actually meant to match, such as joining two tables both containing a generic "code" column that happen to share the same name by coincidence rather than by design. The join will run and produce results; they will just be wrong, matching rows that have nothing to do with each other.

A third mistake is not qualifying column names when both tables share one. When both tables have a column with the same name, such as id, qualify it as users.id so the database knows which one you mean; leaving it unqualified either causes an "ambiguous column" error or, in a SELECT *, produces two columns both confusingly named id in the output.

This matters because normalizing data into separate tables (which the previous topic covered) is only half the story — you still need to read it back out as a single coherent view for a report, a page, or an API response, and JOIN is the only tool that reassembles it. Nearly every non-trivial query you write against a real application's database will include at least one join, so getting comfortable with exactly what rows survive, and why, pays off immediately.

It helps to think of a join as answering one very specific question per row: "does this row on the left have a partner on the right that satisfies the ON condition?" INNER JOIN only keeps the rows where the answer is yes. That framing is what makes multi-table joins tractable, too — each additional JOIN in a query is just one more "does this have a partner" question layered on top of the previous answer, evaluated one join at a time rather than all at once. Once you can trace a join query this way, table by table, even a query with four or five joins in it stops looking intimidating and starts looking like a short, readable chain of the same simple idea repeated.

Key takeaway: a JOIN matches rows via ON, and INNER JOIN keeps only the matches.`,
          questions: [
            {
              text: 'What does a JOIN do?',
              options: [
                'Appends the rows of one table below the rows of another',
                'Combines rows from two tables based on a matching condition',
                'Copies one table into a new table',
                'Deletes rows that do not match a condition',
              ],
              correct_index: 1,
              explanation: 'A JOIN pairs up rows from two tables that satisfy a matching condition, producing wider combined rows — it does not stack tables, copy them, or delete anything.',
            },
            {
              text: 'Which clause specifies how the two tables are matched?',
              options: ['ON', 'WHERE', 'GROUP BY', 'SELECT'],
              correct_index: 0,
              explanation: 'ON defines the condition a join uses to pair rows from the two tables, such as orders.user_id = users.id. WHERE, GROUP BY, and SELECT all serve different purposes.',
            },
            {
              text: 'A plain JOIN with no keyword in front of it is which kind of join?',
              options: ['LEFT JOIN', 'INNER JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'],
              correct_index: 1,
              explanation: 'Writing JOIN by itself, with no LEFT, RIGHT, or FULL, means INNER JOIN by default — only rows that match on both sides are kept.',
            },
            {
              text: 'In an INNER JOIN of users and orders, a user with no orders will:',
              options: [
                'Appear once with NULL order columns',
                'Appear once for every other user',
                'Not appear in the result at all',
                'Cause the query to raise an error',
              ],
              correct_index: 2,
              explanation: 'INNER JOIN only keeps rows that found a match on both sides. A user with zero matching orders has nothing to pair with, so that user is simply absent from the result.',
            },
            {
              text: 'You join two tables of 10 rows each and forget the ON clause. Roughly how many rows come back?',
              options: ['100', '10', '20', '0'],
              correct_index: 0,
              explanation: 'Without an ON condition, the join becomes a cross join: every row of the first table pairs with every row of the second, giving 10 x 10 = 100 rows.',
            },
            {
              text: 'In a three-table join like users JOIN orders ON ... JOIN order_items ON ..., if a user has 2 orders and each order has 3 items, how many result rows does that user contribute?',
              options: ['2', '3', '5', '6'],
              correct_index: 3,
              explanation: 'Each order pairs with each of its 3 items, so 2 orders x 3 items each = 6 combined rows for that one user — the join multiplies rather than adds.',
            },
            {
              text: 'Why is it risky to join two tables on columns that share a name, like "code", purely because the names match?',
              options: [
                'SQL forbids joining on columns with the same name',
                'The join will run successfully but may match unrelated rows whose codes happen to coincide by chance',
                'It always produces a syntax error',
                'It automatically renames one of the columns',
              ],
              correct_index: 1,
              explanation: 'A join only checks whether the ON condition is true — it has no idea whether the columns are semantically related, so a shared name with unrelated meaning produces confidently wrong matches.',
            },
            {
              text: 'Both users and orders have a column named id. What happens if you write SELECT id instead of users.id in a query joining them?',
              options: [
                'It always picks the users.id value automatically',
                'It typically raises an "ambiguous column" error, since the database cannot tell which id you mean',
                'It always picks the orders.id value automatically',
                'It merges both id values into one combined number',
              ],
              correct_index: 1,
              explanation: 'When two joined tables both have a column with the same name, referring to it unqualified is ambiguous, and most databases refuse to guess — you must qualify it as users.id or orders.id.',
            },
            {
              text: 'What is the role of the ON clause compared to WHERE, in a query like FROM a JOIN b ON a.x = b.x WHERE a.y > 5?',
              options: [
                'ON decides how rows are paired between the two tables; WHERE further filters the already-joined rows',
                'ON and WHERE always do exactly the same thing',
                'WHERE decides how rows are paired; ON filters afterward',
                'ON can only reference columns from one table',
              ],
              correct_index: 0,
              explanation: 'ON is specifically the pairing condition for the join itself, while WHERE filters the resulting combined rows afterward, the same way it would filter a single table.',
            },
            {
              text: 'Ten users and zero orders exist. What does SELECT users.name, orders.total FROM users JOIN orders ON orders.user_id = users.id return?',
              options: ['10 rows, each with a NULL total', '0 rows', '10 rows, each with total set to 0', 'An error, since orders is empty'],
              correct_index: 1,
              explanation: 'An INNER JOIN requires a match on both sides. With no rows in orders at all, nothing can match, so the result is empty — this is exactly the behavior LEFT JOIN exists to change.',
            },
            {
              text: 'Why does forgetting the ON clause not produce an error?',
              options: [
                'SQL treats a missing ON clause as an implicit request for a cross join, which is a valid (if usually unintended) query',
                'The database automatically infers the correct ON clause from column names',
                'It always produces an error in every database engine',
                'JOIN requires an ON clause and the query simply will not run',
              ],
              correct_index: 0,
              explanation: 'A cross join — every row paired with every row — is a legitimate, well-defined operation in SQL, so omitting ON does not break any rule; it just usually is not the query you meant to write.',
            },
            {
              text: 'Which of these correctly matches orders to the user who placed them?',
              options: [
                'FROM users JOIN orders ON orders.user_id = users.id',
                'FROM users JOIN orders',
                'FROM users, orders WHERE users.name = orders.total',
                'FROM users JOIN orders ON users.name = orders.id',
              ],
              correct_index: 0,
              explanation: 'The correct match links the foreign key on orders (user_id) to the primary key on users (id) — matching on name versus id, or omitting the condition, would not correctly pair each order with its owner.',
            },
            {
              text: 'What best describes the output row produced by a JOIN?',
              options: [
                'A row containing only the columns from the left table',
                'A row containing only the columns from the right table',
                'A single combined row containing columns from both matched tables',
                'Two separate rows, one from each table',
              ],
              correct_index: 2,
              explanation: 'A join glues one matching row from each side into a single wider row, which is why you can select columns from both tables in the same SELECT list.',
            },
            {
              text: 'Why do real applications rely so heavily on JOIN, given that data is normalized into separate tables?',
              options: [
                'JOIN is only used for reporting, never for regular application queries',
                'Normalization splits related facts across tables, and JOIN is what reassembles them into one coherent view for a query or page',
                'JOIN is required to insert data into a normalized table',
                'JOIN replaces the need for a WHERE clause entirely',
              ],
              correct_index: 1,
              explanation: "Splitting data into separate tables (to avoid duplication) means you almost always need to bring pieces back together to answer a real question, and JOIN is the mechanism that does that reassembly.",
            },
            {
              text: 'A query cross joins users and orders by accident. What is the practical danger?',
              options: [
                'The query fails immediately with a clear error',
                'It silently returns a large, meaningless result set that can look plausible at a glance',
                'It only affects the ORDER BY clause',
                'It automatically converts itself into an INNER JOIN',
              ],
              correct_index: 1,
              explanation: 'A cross join runs without error and returns a real result set — just one where every row is a nonsensical pairing — which is exactly why it is easy to miss unless you notice the row count is far too large.',
            },
          ],
        },
        medium: {
          title: 'LEFT JOIN and Keeping Unmatched Rows',
          body: `An INNER JOIN silently drops rows that have no partner, which is exactly wrong when the absence is the thing you care about. A LEFT JOIN keeps every row from the left table, matched or not, and fills the right table's columns with NULL where no match exists.

    SELECT users.name, orders.id
    FROM users
    LEFT JOIN orders
      ON orders.user_id = users.id;

Every user appears. A user with three orders appears three times; a user with none appears once, with a NULL order id. That NULL is how you find them: add WHERE orders.id IS NULL and you get exactly the users who have never ordered. Walking through why: the LEFT JOIN already preserved that user as a single row with NULL in every orders column, so filtering for orders.id IS NULL afterward simply picks out the rows where the join found nothing to attach.

A second example shows the same idea used for a genuinely useful report — every user alongside how many orders they've placed, including zero:

    SELECT users.name, COUNT(orders.id) AS order_count
    FROM users
    LEFT JOIN orders
      ON orders.user_id = users.id
    GROUP BY users.name;

Because COUNT(orders.id) counts non-null values, a user with no orders correctly gets 0, not 1 and not NULL. Swap that for COUNT(*) and every user would show at least 1, because COUNT(*) counts the placeholder NULL row the LEFT JOIN produced for them — a subtle, easy-to-miss mismatch between "count of orders" and "count of rows."

The subtle bug is putting a condition on the right table in WHERE instead of ON. Writing WHERE orders.total > 100 after a LEFT JOIN throws away the unmatched rows, because their total is NULL and that comparison is never true. You have quietly turned your LEFT JOIN back into an INNER JOIN, and nothing signals the mistake — the query runs, returns rows, and simply omits exactly the users you added the LEFT JOIN to keep. Put such conditions in the ON clause instead: ON orders.user_id = users.id AND orders.total > 100 keeps every user, only restricting which of their orders get attached.

A second mistake is assuming LEFT JOIN and RIGHT JOIN are interchangeable if you just swap which side the condition mentions. LEFT JOIN orders keeps every row from the table named before LEFT JOIN; writing users RIGHT JOIN orders instead keeps every row of orders, which is a different table entirely being preserved — the two are mirror images, not synonyms, and mixing them up silently changes which side's unmatched rows survive.

A third mistake is expecting a LEFT JOIN followed by GROUP BY to always produce sensible counts without thinking about which aggregate function you used. As shown above, COUNT(*) and COUNT(orders.id) disagree the moment a LEFT JOIN is involved, precisely because COUNT(*) still sees a row even when every one of its columns is NULL.

This matters because "find things that don't exist" — users with no orders, products never sold, students who never submitted an assignment — is one of the most common real business questions, and INNER JOIN structurally cannot answer it, since it drops exactly the rows you'd need to see. LEFT JOIN plus an IS NULL check is the standard pattern for this whole category of question, and getting the WHERE-versus-ON placement right is what makes the pattern actually work instead of quietly reverting to an INNER JOIN.

Key takeaway: LEFT JOIN preserves unmatched left rows as NULLs, and a WHERE on the right table destroys them.`,
          questions: [
            {
              text: 'In a LEFT JOIN, a left row with no match gets:',
              options: [
                'Dropped from the results',
                'A row where the right table columns are zero',
                'A row where the right table columns are NULL',
                'Duplicated once for every row in the right table',
              ],
              correct_index: 2,
              explanation: 'LEFT JOIN guarantees every left-table row appears at least once. When nothing on the right matches, the right-side columns are filled with NULL rather than being dropped or zeroed.',
            },
            {
              text: 'How do you find users who have never placed an order?',
              options: [
                'LEFT JOIN orders and keep rows where orders.id IS NULL',
                'INNER JOIN orders and keep rows where orders.id IS NULL',
                'LEFT JOIN orders and keep rows where orders.id IS NOT NULL',
                'INNER JOIN orders and keep rows where orders.id IS NOT NULL',
              ],
              correct_index: 0,
              explanation: 'INNER JOIN would already have dropped exactly the users you want to find, since they have no matching order. LEFT JOIN keeps them with a NULL order id, which IS NULL then isolates.',
            },
            {
              text: 'After a LEFT JOIN, adding WHERE orders.total > 100 has what effect?',
              options: [
                'It keeps unmatched rows, since NULL passes any comparison',
                'It causes a syntax error, as WHERE cannot reference the right table',
                'It removes the unmatched rows, making the join behave like an INNER JOIN',
                'It only filters rows where total is exactly 100',
              ],
              correct_index: 2,
              explanation: 'Unmatched rows have NULL for orders.total, and NULL > 100 is unknown, not true, so WHERE excludes them — silently undoing the whole point of using LEFT JOIN.',
            },
            {
              text: 'You want to keep all users but only join their orders over 100. Where does the total > 100 condition belong?',
              options: ['In the WHERE clause', 'In a HAVING clause', 'In the ON clause of the LEFT JOIN', 'In the GROUP BY clause'],
              correct_index: 2,
              explanation: 'Putting the condition in ON restricts which orders get attached during the join itself, while still preserving every user row — moving it to WHERE would filter out unmatched users entirely.',
            },
            {
              text: 'A user has 3 orders. How many rows does that user produce in a LEFT JOIN with orders?',
              options: ['3', '1', '4', '0'],
              correct_index: 0,
              explanation: 'A LEFT JOIN still pairs each matching right-side row individually, so a user with 3 matching orders produces 3 rows, one per order — the "keep unmatched rows" behavior only changes what happens when there are zero matches.',
            },
            {
              text: 'In SELECT users.name, COUNT(orders.id) AS order_count FROM users LEFT JOIN orders ... GROUP BY users.name, what does a user with zero orders get for order_count?',
              options: ['NULL', '1', '0', 'An error, since COUNT cannot handle NULL input'],
              correct_index: 2,
              explanation: 'COUNT(orders.id) only counts non-null values. A user with no orders has a NULL orders.id from the LEFT JOIN, so nothing gets counted, correctly giving 0.',
            },
            {
              text: 'Why would COUNT(*) instead of COUNT(orders.id) give a misleading order_count after a LEFT JOIN?',
              options: [
                'COUNT(*) counts the placeholder NULL row a user with no orders still produces, reporting 1 instead of 0',
                'COUNT(*) always returns the total number of users, ignoring orders entirely',
                'COUNT(*) cannot be used together with GROUP BY',
                'COUNT(*) would raise an error when orders.id is NULL',
              ],
              correct_index: 0,
              explanation: 'A LEFT JOIN still produces one row for a user with no orders (with NULL columns), and COUNT(*) counts that row regardless of its NULL contents, incorrectly reporting 1 order instead of 0.',
            },
            {
              text: 'What is the practical difference between LEFT JOIN orders and RIGHT JOIN orders in a query starting FROM users?',
              options: [
                'They are exactly equivalent and can be swapped freely',
                'LEFT JOIN preserves every row of users; RIGHT JOIN preserves every row of orders instead',
                'RIGHT JOIN only works if orders has fewer rows than users',
                'LEFT JOIN can only be used with WHERE, RIGHT JOIN only with HAVING',
              ],
              correct_index: 1,
              explanation: 'LEFT and RIGHT refer to which table\'s rows are guaranteed to survive unmatched. FROM users LEFT JOIN orders keeps every user; FROM users RIGHT JOIN orders keeps every order instead — they are mirror images, not interchangeable.',
            },
            {
              text: 'A LEFT JOIN is followed by WHERE orders.user_id IS NOT NULL. What effect does this have compared to just using the LEFT JOIN alone?',
              options: [
                'No effect at all, the results are identical',
                'It filters out the unmatched (NULL) rows, effectively behaving like an INNER JOIN',
                'It adds the unmatched rows back in a second time',
                'It changes LEFT JOIN into a RIGHT JOIN',
              ],
              correct_index: 1,
              explanation: 'Requiring orders.user_id (a right-table column) to be non-null excludes exactly the rows the LEFT JOIN was preserving with NULLs, which functionally reverts the join back to an INNER JOIN.',
            },
            {
              text: 'Why is "users with no orders" a question an INNER JOIN structurally cannot answer?',
              options: [
                'INNER JOIN is slower than LEFT JOIN for this case',
                'INNER JOIN only keeps rows with a match on both sides, so unmatched users are dropped before you could ever filter for them',
                'INNER JOIN does not support the IS NULL operator',
                'INNER JOIN requires a GROUP BY to work at all',
              ],
              correct_index: 1,
              explanation: 'The users you want are precisely the ones with no matching order, and INNER JOIN discards exactly those rows during the join itself — there is nothing left afterward to filter for.',
            },
            {
              text: 'You write FROM users LEFT JOIN orders ON orders.user_id = users.id AND orders.total > 100. What does this achieve, compared to putting total > 100 in WHERE?',
              options: [
                'It is functionally identical to putting the condition in WHERE',
                'Every user is still kept, but only orders over 100 are attached; users with no such order show NULL order columns',
                'It causes every user with any order under 100 to be dropped entirely',
                'It converts the query into an INNER JOIN automatically',
              ],
              correct_index: 1,
              explanation: "Placing the condition in ON only restricts which orders qualify to be joined, while LEFT JOIN's guarantee to keep every user row remains intact — unlike WHERE, which would filter out entire unmatched user rows.",
            },
            {
              text: 'A report needs "every product, and its total units sold, including products never sold." Which approach fits best?',
              options: [
                'INNER JOIN products to order_items, then SUM the quantity',
                'LEFT JOIN products to order_items, then SUM the quantity, treating NULL sums as zero for unsold products',
                'CROSS JOIN products and order_items with no condition',
                'Two separate unrelated queries with no join at all',
              ],
              correct_index: 1,
              explanation: 'INNER JOIN would drop unsold products, which is exactly the group the report needs. LEFT JOIN keeps every product, with SUM naturally returning NULL (interpretable as zero) for products with no matching order items.',
            },
            {
              text: 'In a LEFT JOIN, which table is guaranteed to have every one of its rows appear at least once in the result?',
              options: [
                'The right-hand table, named after the join keyword',
                'The left-hand table, named before the join keyword',
                'Both tables equally',
                'Neither, since LEFT JOIN can still drop rows',
              ],
              correct_index: 1,
              explanation: "LEFT JOIN's whole purpose is to preserve every row from the table on the left side (the one in FROM before the join), padding with NULLs when there is no match on the right.",
            },
            {
              text: 'Why does moving a right-table condition from ON to WHERE change the meaning of a LEFT JOIN query, but moving a left-table condition would not (as much)?',
              options: [
                'Because ON conditions are ignored entirely by the database',
                'Because a right-table condition in WHERE can filter out the very NULL placeholder rows LEFT JOIN was created to keep, while a left-table condition filters rows that already exist regardless of the join type',
                'Because WHERE cannot reference any table at all',
                'Because ON only accepts numeric comparisons',
              ],
              correct_index: 1,
              explanation: "A left-table filter behaves the same whether or not a match was found, since the left row always exists. A right-table filter interacts with the NULLs the LEFT JOIN introduced for unmatched rows, which is what makes WHERE placement dangerous specifically for right-table conditions.",
            },
            {
              text: 'What is the safest general rule for where to put a condition on the "kept" side of an outer join versus the "optional" side?',
              options: [
                'Always put every condition in WHERE for consistency',
                'Conditions restricting which optional-side rows match belong in ON; conditions meant to filter the final result belong in WHERE',
                'Always put every condition in ON, never in WHERE',
                'Conditions can never reference the optional-side table at all',
              ],
              correct_index: 1,
              explanation: 'ON conditions can narrow the match without discarding the required-side row; WHERE conditions apply after the join is complete and can accidentally discard required-side rows if they reference the optional side.',
            },
          ],
        },
        hard: {
          title: 'Join Nuances: Fan-out, Aggregates and NULLs',
          body: `Joins multiply rows, and that quietly corrupts aggregates. If each user has many orders and many login events, joining all three tables at once pairs every order with every login for that user. Summing order totals now double counts, because each order appears once per login.

    SELECT u.id, SUM(o.total)
    FROM users u
    JOIN orders o ON o.user_id = u.id
    JOIN logins l ON l.user_id = u.id
    GROUP BY u.id;

That sum is wrong. Walking through why: if user 7 has 2 orders and 5 logins, the join between orders and logins produces 2 x 5 = 10 rows for user 7 alone, each order total repeated 5 times over. SUM(o.total) then adds up 10 numbers where it should have added 2, inflating the true total by a factor of 5 — and that factor is different for every user, depending on how many logins each of them happens to have, which is exactly what makes the bug so hard to spot by eyeballing the output.

A second example shows the standard fix, aggregating each side before combining them:

    SELECT u.id, o.order_total, l.login_count
    FROM users u
    JOIN (
      SELECT user_id, SUM(total) AS order_total
      FROM orders GROUP BY user_id
    ) o ON o.user_id = u.id
    JOIN (
      SELECT user_id, COUNT(*) AS login_count
      FROM logins GROUP BY user_id
    ) l ON l.user_id = u.id;

Each subquery collapses its own table down to one row per user first, so by the time the two subqueries are joined to users, there is exactly one order_total and one login_count per user, and no fan-out is possible — there is nothing left to multiply. If a number looks inflated after adding a join, suspect fan-out first, particularly when the inflation factor varies unpredictably from row to row rather than being a suspiciously round multiplier.

COUNT behaves badly here too. After a LEFT JOIN, COUNT(*) counts the NULL placeholder row, so a user with no orders gets a count of 1 rather than 0, because that user still produced exactly one output row from the join, even though every orders column in it is NULL. COUNT(orders.id) counts non-null ids and correctly returns 0, since there is no real order id to count.

A second mistake, related to fan-out, is applying DISTINCT as a blanket fix without understanding why the duplication happened. DISTINCT can mask fan-out when the duplicated rows are otherwise identical, but it silently breaks the moment any joined column differs between the duplicates — for instance, if the logins table also carried a timestamp, DISTINCT would no longer collapse the fan-out at all, since each duplicated row would now be unique on that timestamp. Aggregating before joining is the fix that actually addresses the cause rather than papering over the symptom.

Finally, a join condition never matches NULL to NULL, since NULL equals nothing, not even itself. Joining on a nullable column silently drops those rows — two users each with a NULL referrer_id will never be matched to each other via ON a.referrer_id = b.referrer_id, and two orders with a NULL warehouse_id will never join to each other on that column either, even though to a human eye "both unknown" might look like a legitimate match.

This matters because fan-out is one of the most common ways a real dashboard or finance report ends up quietly wrong — not crashing, not throwing an error, just reporting a revenue number that is two or three times too high because someone added "just one more join" to pull in a loosely related table. Learning to notice the shape of the problem — an aggregate that grows suspiciously when an unrelated join is added — is often more valuable than memorizing any single fix.

Key takeaway: joins multiply rows, so aggregate before you join, and count a column rather than star.`,
          questions: [
            {
              text: 'Joining users to both orders and logins, then summing order totals, gives an inflated number because:',
              options: [
                'SUM counts NULL values as their column maximum',
                'Each order is repeated once per matching login row',
                'GROUP BY re-adds each group to the total',
                'JOIN automatically doubles every numeric column',
              ],
              correct_index: 1,
              explanation: 'Joining orders to logins pairs every order with every login for the same user, so if a user has 2 orders and 5 logins, each order total appears 5 times in the joined result before summing.',
            },
            {
              text: 'What is the standard fix for join fan-out corrupting an aggregate?',
              options: [
                'Aggregate each table separately in subqueries, then join the results',
                'Add DISTINCT to the SELECT list',
                'Replace the joins with a HAVING clause',
                'Switch every JOIN to a LEFT JOIN',
              ],
              correct_index: 0,
              explanation: 'Collapsing each table to one row per key before joining removes the duplication entirely, since there is nothing left to multiply once each side already has exactly one row per user.',
            },
            {
              text: 'After a LEFT JOIN, a user with no orders gets what from COUNT(*) grouped by user?',
              options: ['0', '1, because the NULL placeholder row is still a row', 'NULL', 'An error'],
              correct_index: 1,
              explanation: 'A LEFT JOIN still produces one output row for that user, with NULLs in the orders columns, and COUNT(*) counts that row regardless of what it contains.',
            },
            {
              text: 'Which expression correctly returns 0 orders for a user with none, after a LEFT JOIN?',
              options: ['COUNT(*)', 'SUM(1)', 'COUNT(orders.id)', 'COUNT(users.id)'],
              correct_index: 2,
              explanation: 'COUNT(orders.id) only counts rows where orders.id is not NULL, so a user whose only row has a NULL orders.id (because nothing matched) correctly counts as 0.',
            },
            {
              text: 'Two rows both have NULL in the column being joined on. Do they match?',
              options: [
                'No, because NULL is never equal to NULL',
                'Yes, because both values are identical',
                'Yes, but only in a LEFT JOIN',
                'Yes, but only if the column is the primary key',
              ],
              correct_index: 0,
              explanation: "NULL represents an unknown value, and SQL's equality comparison never considers two unknowns to be provably equal, so a join condition comparing two NULLs is always unknown, not true.",
            },
            {
              text: 'A user has 3 orders and 4 logins. Joining users to both orders and logins directly (without pre-aggregating) produces how many combined rows for that user?',
              options: ['7', '12', '3', '4'],
              correct_index: 1,
              explanation: 'Joining without aggregating first pairs every order with every login for the same user, giving 3 x 4 = 12 rows — the fan-out multiplies rather than adds the two counts.',
            },
            {
              text: 'In the fixed query that pre-aggregates orders and logins in separate subqueries before joining, why is fan-out no longer possible?',
              options: [
                'Because subqueries are always executed instantly with no rows',
                'Because each subquery already collapses its table to one row per user before the join happens',
                'Because subqueries automatically add a DISTINCT clause',
                'Because JOIN behaves differently when its input is a subquery',
              ],
              correct_index: 1,
              explanation: 'Once each side of the join already has exactly one row per user_id, joining them together produces at most one combined row per user — there are no duplicate rows left to multiply against each other.',
            },
            {
              text: 'Why can adding a blanket DISTINCT to a fanned-out query be an unreliable fix?',
              options: [
                'DISTINCT is not valid SQL syntax',
                'DISTINCT only removes rows that are fully identical across every selected column, so an extra differing column like a timestamp defeats it',
                'DISTINCT always removes too many rows, including legitimate ones',
                'DISTINCT can only be used with COUNT, never with SUM',
              ],
              correct_index: 1,
              explanation: 'Fan-out produces rows that are duplicates of each other only if every selected column happens to match; the moment one more distinguishing column is selected (like a login timestamp), the "duplicate" rows are no longer identical and DISTINCT stops helping.',
            },
            {
              text: 'Two orders both have a NULL warehouse_id. A query attempts to self-join orders on a.warehouse_id = b.warehouse_id to find "orders sharing a warehouse." What happens to these two orders?',
              options: [
                'They are matched to each other, since both are unknown',
                'They are never matched to each other, since NULL never equals NULL',
                'They are matched only if warehouse_id is also the primary key',
                'The query raises an error because of the NULL values',
              ],
              correct_index: 1,
              explanation: 'Even though both values are "the same kind of unknown" to a human, SQL equality never treats two NULLs as equal, so the join condition evaluates to unknown for that pair and they are not matched.',
            },
            {
              text: 'A revenue report joins orders to a shipping_events table and the total suddenly looks 3x too high for some users and unchanged for others. What should you suspect first?',
              options: [
                'A currency conversion bug in the SUM function',
                'Join fan-out, where users with multiple shipping events per order are having their order totals repeated',
                'A missing WHERE clause on the date range',
                'An overflow in the total column\'s numeric type',
              ],
              correct_index: 1,
              explanation: "An inflation factor that varies per user (3x for some, unchanged for others) is a strong signature of fan-out — it lines up with each user having a different number of matching rows on the newly joined table, not a global calculation bug.",
            },
            {
              text: 'Why does COUNT(*) disagree with COUNT(orders.id) specifically after an outer join, but not usually after an inner join?',
              options: [
                'INNER JOIN never produces any NULL values, so there is no placeholder row for COUNT(*) to over-count',
                'COUNT(*) is disabled by default in INNER JOIN queries',
                'COUNT(orders.id) does not work at all in INNER JOIN queries',
                'INNER JOIN always returns exactly one row per group',
              ],
              correct_index: 0,
              explanation: 'An INNER JOIN only produces rows where a real match exists, so orders.id is never NULL in its output — COUNT(*) and COUNT(orders.id) agree. An outer join introduces genuine NULL placeholder rows, which is where the two start to diverge.',
            },
            {
              text: 'What is the key structural difference between fixing fan-out with pre-aggregated subqueries versus just adding GROUP BY to the fanned-out query?',
              options: [
                'There is no difference; both approaches are mathematically equivalent',
                'GROUP BY alone still sums over the fanned-out, duplicated rows, while pre-aggregating removes the duplication before the sum happens',
                'GROUP BY always runs before the join, avoiding fan-out automatically',
                'Pre-aggregating is only needed when using COUNT, never with SUM',
              ],
              correct_index: 1,
              explanation: "Adding GROUP BY u.id to the original fanned-out query still sums over rows that were already multiplied by the join — grouping controls how rows are bucketed, not how many duplicated rows exist to sum in the first place.",
            },
            {
              text: 'A table of orders has some rows with a NULL customer_id (perhaps guest checkouts). Joining orders to customers on customer_id = customers.id will:',
              options: [
                'Match guest orders to a special "guest" customer row automatically',
                'Exclude the guest orders from the joined result, since NULL never matches',
                'Raise an error whenever a NULL customer_id is encountered',
                'Match guest orders to every customer row',
              ],
              correct_index: 1,
              explanation: 'A NULL customer_id can never satisfy an equality-based ON condition, so those guest orders simply produce no match and are dropped from an INNER JOIN (or kept with NULL customer columns from a LEFT JOIN).',
            },
            {
              text: 'Why is "the inflation factor is different for every group" a useful diagnostic clue when debugging a suspicious aggregate?',
              options: [
                'It rules out fan-out, since fan-out always inflates every group by the exact same amount',
                'It is consistent with fan-out, since the multiplier depends on how many matching rows each group has on the newly joined table, which naturally varies',
                'It means the SUM function itself is broken',
                'It indicates a missing index rather than a query logic problem',
              ],
              correct_index: 1,
              explanation: "Fan-out multiplies each group's rows by however many matches it happens to have on the other joined table, and that count is rarely the same across groups — a per-group varying multiplier is a strong tell, whereas a single global bug would usually distort every group by the same fixed amount.",
            },
            {
              text: 'Which of these queries is safest from fan-out when you need both a user\'s total order value and their login count in one row?',
              options: [
                'Directly joining users to orders and logins in the same query and summing/counting with GROUP BY',
                'Joining users to two subqueries that already aggregate orders and logins separately by user_id',
                'Joining users to orders, then to logins, then applying DISTINCT on the final result',
                'Using a single JOIN with both conditions ANDed together in one ON clause',
              ],
              correct_index: 1,
              explanation: 'Pre-aggregating each table by user_id in its own subquery guarantees one row per user on each side before any join happens, so there is no combination of orders and logins rows left to multiply against each other.',
            },
          ],
        },
      },
    },
  ],
};
