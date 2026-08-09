// Databases & SQL: from designing tables, to querying them, to joining them.
export default {
  title: 'Databases & SQL',
  description: 'Learn how relational databases store data in tables, how to query that data with SQL, and how to combine tables with joins.',
  topics: [
    {
      topic: 'tables',
      lessons: {
        easy: {
          title: 'What a Table Is',
          body: `A relational database stores data in tables. A table is a grid: each column has a name and a type, and each row is one record. A "users" table might have columns id, name and email, and one row per person. Columns describe the shape of the data; rows hold the actual values.

You create a table by naming its columns and their types:

    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT
    );

INTEGER and TEXT are types. PRIMARY KEY means the id uniquely identifies a row. NOT NULL means the column must always have a value.

A common beginner mistake is thinking a table is like a spreadsheet where any cell can hold anything. It is not. Every value in a column must match that column's type, and a column you declared NOT NULL will reject a row that leaves it empty. The database enforces this for you, and that is a feature, not an obstacle.

Key takeaway: a table is columns (the shape) plus rows (the data), and the database enforces the shape.`,
          questions: [
            {
              text: 'In a relational table, what does a single row represent?',
              options: ['One record', 'One column type', 'One database'],
              correct_index: 0,
            },
            {
              text: 'What does a column definition mainly describe?',
              options: [
                'The number of rows the table can hold',
                'The order in which rows are inserted',
                'The name and data type of a field',
              ],
              correct_index: 2,
            },
            {
              text: 'Which SQL statement creates a new table?',
              options: ['CREATE TABLE', 'INSERT INTO', 'MAKE TABLE', 'SELECT FROM'],
              correct_index: 0,
            },
            {
              text: 'What does NOT NULL on a column mean?',
              options: [
                'The column can only hold the number zero',
                'Every row must supply a value for that column',
                'The column is automatically indexed',
              ],
              correct_index: 1,
            },
            {
              text: 'What is a PRIMARY KEY used for?',
              options: [
                'Sorting the table alphabetically',
                'Storing the largest value in a column',
                'Uniquely identifying each row',
              ],
              correct_index: 2,
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

The customer_id column holds the id of a row in customers. The database refuses to insert an order pointing at a customer that does not exist. That is referential integrity.

The classic mistake is over-trusting duplication for convenience: copying the customer email into orders "so the query is simpler". Now an email change has to be applied in two places, and sooner or later it is not. Store each fact once and reference it.

Another trap is forgetting UNIQUE. A PRIMARY KEY is unique, but a column like email is not unless you say so, and duplicate accounts will creep in.

Key takeaway: split data into tables so each fact lives once, and link them with foreign keys.`,
          questions: [
            {
              text: 'What is a foreign key?',
              options: [
                'A password used to connect to a remote database',
                'A column that references the primary key of another table',
                'A key that automatically sorts rows across tables',
              ],
              correct_index: 1,
            },
            {
              text: 'Why avoid storing the customer name on every order row?',
              options: [
                'The duplicated values can drift out of sync when one is updated',
                'Text columns are not allowed in an orders table',
                'Foreign keys make the orders table read-only',
              ],
              correct_index: 0,
            },
            {
              text: 'A FOREIGN KEY constraint prevents which of these?',
              options: [
                'Inserting two orders for the same customer',
                'Inserting an order with a NULL total',
                'Inserting an order whose customer_id matches no customer',
              ],
              correct_index: 2,
            },
            {
              text: 'You want to guarantee no two users share an email. What do you add to the email column?',
              options: ['A UNIQUE constraint', 'A second PRIMARY KEY', 'A NOT NULL constraint'],
              correct_index: 0,
            },
            {
              text: 'Which pair of tables best models "a customer can have many orders"?',
              options: [
                'orders, and customers holding an order_id',
                'one table containing both customers and orders as columns',
                'customers, and orders holding a customer_id',
              ],
              correct_index: 2,
            },
          ],
        },
        hard: {
          title: 'Constraints, NULLs and Schema Changes',
          body: `Constraints are the rules the database will not let you break, and their edge cases surprise people. NULL means "unknown", not "empty" and not "zero". Two NULLs are not considered equal, so a UNIQUE column can usually hold many NULL rows even though it rejects two identical values.

Comparisons with NULL are not true or false but unknown, so a filter never matches them:

    SELECT * FROM users
    WHERE email <> 'a@b.com';

That query drops every user whose email is NULL, because comparing NULL to a value yields unknown, not true. You need IS NULL or IS NOT NULL to test for NULL at all.

Deleting a referenced row raises the next question: what happens to the children? ON DELETE CASCADE deletes them too, ON DELETE SET NULL orphans them by nulling the foreign key, and the default RESTRICT simply refuses the delete. Choosing CASCADE casually is how people lose data.

Finally, adding a NOT NULL column to a table that already has rows fails unless you supply a default, because the existing rows have no value to put there.

Key takeaway: NULL is unknown, and constraints decide what the database refuses to do.`,
          questions: [
            {
              text: 'A column is UNIQUE and nullable. What does the database usually allow?',
              options: [
                'Several rows with the same non-null value',
                'Exactly one row in the whole table',
                'Several rows with NULL in that column',
              ],
              correct_index: 2,
            },
            {
              text: "Why does WHERE email <> 'a@b.com' exclude rows where email is NULL?",
              options: [
                'NULL is treated as the empty string, which equals the value',
                'The comparison evaluates to unknown, so the row is not kept',
                'The optimizer skips nullable columns in WHERE clauses',
              ],
              correct_index: 1,
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
            },
            {
              text: 'You delete a customer that still has orders, and the foreign key uses ON DELETE CASCADE. What happens?',
              options: [
                'The delete is rejected because orders still reference the customer',
                'The orders remain but their customer_id becomes NULL',
                'The customer and their orders are both deleted',
              ],
              correct_index: 2,
            },
            {
              text: 'Adding a NOT NULL column to a table that already contains rows fails unless you also:',
              options: [
                'Provide a DEFAULT value for the new column',
                'Drop the primary key first',
                'Make the column UNIQUE as well',
              ],
              correct_index: 0,
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

Read that as: take the users table, keep only rows where country is GH, sort what remains by name, return the first ten, and show just the name and email columns. SELECT * means "every column", which is fine while exploring but wasteful in real code.

The gotcha that catches everyone once is quoting. Single quotes wrap text values; they do not wrap column names. Writing WHERE 'country' = 'GH' compares the literal word country to the literal word GH, which is never true, so you get zero rows and no error to explain why.

Also note that a table has no inherent order. Without ORDER BY, the order you get back is not guaranteed, even if it looks stable today.

Key takeaway: SELECT chooses columns, WHERE chooses rows, and ORDER BY is the only thing that guarantees order.`,
          questions: [
            {
              text: 'Which clause decides which ROWS come back?',
              options: ['WHERE', 'SELECT', 'ORDER BY'],
              correct_index: 0,
            },
            {
              text: 'What does SELECT * mean?',
              options: ['Return every table', 'Return only distinct rows', 'Return every column'],
              correct_index: 2,
            },
            {
              text: 'How do you write a text value in a WHERE clause?',
              options: [
                'In square brackets, like [GH]',
                "In single quotes, like 'GH'",
                'With no quotes at all, like GH',
              ],
              correct_index: 1,
            },
            {
              text: 'What does LIMIT 10 do?',
              options: [
                'Returns at most 10 rows',
                'Returns only the first 10 columns',
                'Searches only the first 10 rows of the table',
              ],
              correct_index: 0,
            },
            {
              text: 'Without an ORDER BY clause, what order are rows returned in?',
              options: [
                'Always the order they were inserted',
                'No guaranteed order',
                'Always sorted by the primary key',
              ],
              correct_index: 1,
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

That counts active users per country and keeps only countries with more than five. Note the two filters. WHERE runs before grouping and filters individual rows. HAVING runs after grouping and filters the groups. Putting an aggregate in WHERE is an error, because at that point the groups do not exist yet.

The other classic trap is COUNT(*) versus COUNT(column). COUNT(*) counts rows. COUNT(email) counts only rows where email is not NULL, so the two disagree whenever the column has missing values. AVG and SUM ignore NULLs too, which means an average is over the non-null rows only.

Key takeaway: WHERE filters rows before grouping, HAVING filters groups after, and aggregates skip NULLs.`,
          questions: [
            {
              text: 'What does GROUP BY country do?',
              options: [
                'Sorts the output rows by country',
                'Collapses rows into one output row per distinct country',
                'Removes rows where country is NULL',
              ],
              correct_index: 1,
            },
            {
              text: 'Which clause filters groups rather than individual rows?',
              options: ['HAVING', 'WHERE', 'LIMIT'],
              correct_index: 0,
            },
            {
              text: 'A table has 100 rows, and 30 of them have a NULL email. What does COUNT(email) return?',
              options: ['70', '100', '30', '0'],
              correct_index: 0,
            },
            {
              text: 'Why is WHERE COUNT(*) > 5 invalid?',
              options: [
                'COUNT can only be used inside SELECT',
                'WHERE is evaluated before grouping, so aggregates do not exist yet',
                'Comparison operators are not allowed with aggregates',
              ],
              correct_index: 1,
            },
            {
              text: 'AVG(score) is computed over a column with some NULLs. Those NULL rows are:',
              options: [
                'Treated as zero, dragging the average down',
                'Causing the whole result to be NULL',
                'Ignored entirely, so the average is over non-null rows',
              ],
              correct_index: 2,
            },
          ],
        },
        hard: {
          title: 'Subqueries, Order of Evaluation and Performance',
          body: `SQL is declarative: you describe the result, not the steps. But the logical order of evaluation is fixed, and knowing it explains most confusing errors. It is FROM, then WHERE, then GROUP BY, then HAVING, then SELECT, then ORDER BY. Because SELECT runs late, an alias you define there is unavailable in WHERE, though most engines do let ORDER BY use it.

A subquery is a query nested inside another. It can produce a single value, a list, or a whole table:

    SELECT name FROM users
    WHERE id IN (
      SELECT customer_id FROM orders
      WHERE total > 100
    );

The dangerous edge case is NOT IN with NULLs. If the subquery returns even one NULL, NOT IN yields unknown for every row and the outer query returns nothing at all. IN is safe; NOT IN is not. Prefer NOT EXISTS, which handles NULLs correctly.

Performance-wise, a correlated subquery re-runs once per outer row, and a function wrapped around an indexed column, such as lower(email) in a WHERE clause, usually prevents the index from being used.

Key takeaway: know the evaluation order, and never trust NOT IN against a nullable column.`,
          questions: [
            {
              text: 'What is the logical order of evaluation?',
              options: [
                'FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY',
                'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY',
                'FROM, SELECT, WHERE, ORDER BY, GROUP BY, HAVING',
              ],
              correct_index: 0,
            },
            {
              text: 'Why can a column alias defined in SELECT usually not be used in WHERE?',
              options: [
                'Aliases are only valid inside subqueries',
                'WHERE is evaluated before SELECT, so the alias does not exist yet',
                'WHERE only accepts literal values, never identifiers',
              ],
              correct_index: 1,
            },
            {
              text: 'A subquery used with NOT IN returns one NULL among its values. What does the outer query return?',
              options: [
                'All rows, because the NULL is ignored',
                'An error about incompatible types',
                'No rows at all',
              ],
              correct_index: 2,
            },
            {
              text: 'Which construct handles NULLs safely when excluding matching rows?',
              options: ['NOT EXISTS', 'NOT IN', 'NOT LIKE'],
              correct_index: 0,
            },
            {
              text: "Why can WHERE lower(email) = 'a@b.com' be slow even with a plain index on email?",
              options: [
                'lower() is not a valid SQL function in a WHERE clause',
                'Indexes are only used by ORDER BY, never by WHERE',
                'Wrapping the column in a function prevents the plain index from being used',
              ],
              correct_index: 2,
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

For every order, the database finds the user whose id matches that order's user_id, and produces one output row holding columns from both. The word JOIN on its own means INNER JOIN, which keeps only rows that found a match on both sides. A user with no orders simply does not appear.

The mistake to avoid is forgetting the ON clause. Without it you get a cross join: every row of the first table paired with every row of the second. Ten users and ten orders become a hundred meaningless rows, and nothing warns you.

When both tables have a column with the same name, such as id, qualify it as users.id so the database knows which one you mean.

Key takeaway: a JOIN matches rows via ON, and INNER JOIN keeps only the matches.`,
          questions: [
            {
              text: 'What does a JOIN do?',
              options: [
                'Appends the rows of one table below the rows of another',
                'Combines rows from two tables based on a matching condition',
                'Copies one table into a new table',
              ],
              correct_index: 1,
            },
            {
              text: 'Which clause specifies how the two tables are matched?',
              options: ['ON', 'WHERE', 'GROUP BY'],
              correct_index: 0,
            },
            {
              text: 'A plain JOIN with no keyword in front of it is which kind of join?',
              options: ['LEFT JOIN', 'INNER JOIN', 'FULL OUTER JOIN'],
              correct_index: 1,
            },
            {
              text: 'In an INNER JOIN of users and orders, a user with no orders will:',
              options: [
                'Appear once with NULL order columns',
                'Appear once for every other user',
                'Not appear in the result at all',
              ],
              correct_index: 2,
            },
            {
              text: 'You join two tables of 10 rows each and forget the ON clause. Roughly how many rows come back?',
              options: ['100', '10', '20', '0'],
              correct_index: 0,
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

Every user appears. A user with three orders appears three times; a user with none appears once, with a NULL order id. That NULL is how you find them: add WHERE orders.id IS NULL and you get exactly the users who have never ordered.

The subtle bug is putting a condition on the right table in WHERE instead of ON. Writing WHERE orders.total > 100 after a LEFT JOIN throws away the unmatched rows, because their total is NULL and that comparison is never true. You have quietly turned your LEFT JOIN back into an INNER JOIN. Put such conditions in the ON clause instead.

Key takeaway: LEFT JOIN preserves unmatched left rows as NULLs, and a WHERE on the right table destroys them.`,
          questions: [
            {
              text: 'In a LEFT JOIN, a left row with no match gets:',
              options: [
                'Dropped from the results',
                'A row where the right table columns are zero',
                'A row where the right table columns are NULL',
              ],
              correct_index: 2,
            },
            {
              text: 'How do you find users who have never placed an order?',
              options: [
                'LEFT JOIN orders and keep rows where orders.id IS NULL',
                'INNER JOIN orders and keep rows where orders.id IS NULL',
                'LEFT JOIN orders and keep rows where orders.id IS NOT NULL',
              ],
              correct_index: 0,
            },
            {
              text: 'After a LEFT JOIN, adding WHERE orders.total > 100 has what effect?',
              options: [
                'It keeps unmatched rows, since NULL passes any comparison',
                'It causes a syntax error, as WHERE cannot reference the right table',
                'It removes the unmatched rows, making the join behave like an INNER JOIN',
              ],
              correct_index: 2,
            },
            {
              text: 'You want to keep all users but only join their orders over 100. Where does the total > 100 condition belong?',
              options: ['In the WHERE clause', 'In a HAVING clause', 'In the ON clause of the LEFT JOIN'],
              correct_index: 2,
            },
            {
              text: 'A user has 3 orders. How many rows does that user produce in a LEFT JOIN with orders?',
              options: ['3', '1', '4'],
              correct_index: 0,
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

That sum is wrong. The fix is to aggregate each side separately in a subquery, then join the already-summarised results. If a number looks inflated after adding a join, suspect fan-out first.

COUNT behaves badly here too. After a LEFT JOIN, COUNT(*) counts the NULL placeholder row, so a user with no orders gets a count of 1 rather than 0. COUNT(orders.id) counts non-null ids and correctly returns 0.

Finally, a join condition never matches NULL to NULL, since NULL equals nothing, not even itself. Joining on a nullable column silently drops those rows.

Key takeaway: joins multiply rows, so aggregate before you join, and count a column rather than star.`,
          questions: [
            {
              text: 'Joining users to both orders and logins, then summing order totals, gives an inflated number because:',
              options: [
                'SUM counts NULL values as their column maximum',
                'Each order is repeated once per matching login row',
                'GROUP BY re-adds each group to the total',
              ],
              correct_index: 1,
            },
            {
              text: 'What is the standard fix for join fan-out corrupting an aggregate?',
              options: [
                'Aggregate each table separately in subqueries, then join the results',
                'Add DISTINCT to the SELECT list',
                'Replace the joins with a HAVING clause',
              ],
              correct_index: 0,
            },
            {
              text: 'After a LEFT JOIN, a user with no orders gets what from COUNT(*) grouped by user?',
              options: ['0', '1, because the NULL placeholder row is still a row', 'NULL'],
              correct_index: 1,
            },
            {
              text: 'Which expression correctly returns 0 orders for a user with none, after a LEFT JOIN?',
              options: ['COUNT(*)', 'SUM(1)', 'COUNT(orders.id)'],
              correct_index: 2,
            },
            {
              text: 'Two rows both have NULL in the column being joined on. Do they match?',
              options: [
                'No, because NULL is never equal to NULL',
                'Yes, because both values are identical',
                'Yes, but only in a LEFT JOIN',
              ],
              correct_index: 0,
            },
          ],
        },
      },
    },
  ],
};
