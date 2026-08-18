# Kari

A server-rendered blog platform. Visitors read articles; registered users leave comments.
Built for a digital-literacy project ("Piensa Antes de Compartir").

## Tech stack

- Node.js, Express 5 (ES modules)
- EJS templates, server-side rendered
- PostgreSQL through `pg` — raw SQL, no ORM
- `express-session` for session auth, `bcrypt` for password hashing
- `dotenv` for configuration
- Static CSS served from `public/`, no build step

## Structure

Requests move through four layers:

```
routes/        URL -> controller
controllers/   HTTP: read req, render a view or redirect
services/      business logic + SQL, throws errors with a code
db/            single pg Client
views/         EJS templates + partials
```

Services never touch `res`. They throw an `Error` carrying a `code`
(`USERNAME_ALREADY_IN_USE`, `USER_NOT_EXISTS`, `DB_INTERNAL_ERROR`, …) and the controller
decides what the user sees. All SQL uses parameterised queries (`$1`), never string
concatenation.

Auth is session-based: `express-session` stores the user in the session, a `connect.sid`
cookie identifies it, and a small middleware copies `req.session.user` into `res.locals.user`
so every template can render the logged-in state. Logout destroys the session and clears the
cookie. Passwords are hashed with bcrypt (`genSalt` + `hash`) and checked with `compare` —
plaintext is never stored.

## Routes

```
GET  /                              home
GET  /about                         about page

GET  /auth/login                    login form
GET  /auth/register                 register form
POST /auth/login
POST /auth/register
POST /auth/logout

GET  /articles                      article list
GET  /articles/:id                  single article + its comments

POST /c/articles/:id/comments       post a comment (redirects to login if signed out)
```

## Running it

### Database

Create a PostgreSQL database, then apply the schema:

```bash
psql "$DATABASE_URL" -f backend/db/db_script.sql
```

Read the note under *Known gaps* first — the checked-in script does not match what the code
actually writes.

### Environment

Create `backend/.env`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/kari
DB_SSL=false          # "true" in hosted environments such as Render
```

### Start

```bash
npm install
npm start             # node backend/server.js -> http://localhost:3000
```

Articles are not authored through the app; insert rows into the `articles` table directly.

## Known gaps

- The session secret is hardcoded in `backend/app.js` (`"un_secreto_x"`). `SESSION_SECRET`
  exists in `.env` but nothing reads it.
- `backend/db/db_script.sql` is out of sync with the code: it declares `comments` twice, and
  marks `users.email` as `NOT NULL UNIQUE` even though registration never inserts an email.
- `views/articles.ejs` renders `article.description`, but the `articles` table has no such
  column, so every card description is blank.
- No helmet, no CORS, no input validation — all three are still on the TODO list in
  `vamosen.txt`.
- `getSingleArticleService` runs one extra query per comment to resolve usernames (N+1); a
  JOIN would replace the loop.
- `node_modules/` is committed to the repository.
