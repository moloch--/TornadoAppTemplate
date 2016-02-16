# General Coding Style
* As a general rule of thumb, functions should be fewer than ~15-20 lines of code, if a function is longer consider refactoring the code.
* No functions should exceed a [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) of 8-10.
* Do not use single character variable names.
* All non-trival functions and classes should contain docstrings or comments.
* Please create a new branch for your edits (bug fixes, features, etc) and choose an appropriate branch name so we can keep everything nice and organized.

### Python Coding Style
* [PEP8](https://www.python.org/dev/peps/pep-0008/) is the standard coding style, and should rarely be deviated from. It is recommended that you use a development environment that supports a PEP8 linter to keep your code clean as you work, and will remove the need for refactoring code later. However, do not sacrifice code readability for the sake of PEP8 conformity, remember it's a guide not a law.
* Four space indents, never use hard-tabs.
* Alphabetically sort imports, use [isort](https://github.com/timothycrosley/isort) to do this automatically.

### JavaScript Coding Style
* [ESLint](http://eslint.org/) is used for the standard coding style, noting the exceptions in `.eslintrc`.
* Four space indents, this is to discourage highly nested code blocks.
* Line lengths should not exceed approximately 79 characters, longer lines are fine so long as the code is readable.

# Secure Coding Practices
### Cross-domain Security
* All HTTP requests (even GETs) must include the `X-APP` HTTP header.  Requests that do not contain this header (even unauthenticated requests) will be dropped.
* WebSockets *must* implement the `check_origin` method. This method is implemented by `WebSocketBaseHandler` by default.
* All `POST` and `PUT` HTTP request handlers must implement a [JSON Schema](http://json-schema.org/documentation.html) and drop requests that do not validate.

### Content Security
* All HTTP responses *must* implement a `Content-Security-Policy` (CSP).
* The CSP may *never* allow unsafe content sources (e.g. `unsafe-inline`).
* The CSP may *never* contain wildcard sources (e.g. `*.googleapis.com`)
* Data URIs (`data:`) may *never* be allowed as an active content source by the CSP.
* Avoid placing user controlled variables within HTML tag attributes, even when escaped.
* Raw output may *never* be used when constructing templates.
* All HTTP responses *must* implement standard HTTP security-headers (e.g. `Content-Type-Options`, etc).
* *Never* use single quotes `'` inside HTML templates, instead use the HTLM entity version `&#x27;` this is to help prevent contextual HTML encoding errors and limit potential dangling markup injection attacks.

### Database Security
* *Never* directly query the database, always use SQLAlchemy for database access.
* Avoid unscoped database queries (e.g. `by_id`, `by_uuid`) and similar methods. These methods should only ever be called from handlers that require the `admin` permission. Use the most narrowly scoped query methods whenever possible (e.g. `by_user_and_uuid` instead of `by_uuid`).

### Filesystem Security
* *Never* include user controlled data when constructing file paths (no don't try to sanitize it).
* *Always* assume the file system will be read-only at runtime.
* *Never* alter the application's current working directory.
