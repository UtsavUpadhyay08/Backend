# Express TypeScript Backend Server

This is a simple Express server built with TypeScript that handles form submissions and retrieves stored submissions using a JSON file as a database.

## Endpoints

- **GET: `/ping`**: Always returns `{ success: true }`
- **POST: `/submit`**: Accepts `name`, `email`, `phone`, `github_link`, and `stopwatch_time` in the request body and stores the submission.
- **GET: `/read?index=<number>`**: Retrieves the (index+1)th submission from the JSON file.
- **PUT: `/edit/:email`**: Updates the submission identified by `email` with the provided fields (`name`, `phone`, `github_link`, `stopwatch_time`).
- **DELETE: `/delete/:email`**: Deletes the submission identified by `email`.
- **GET: `/search?email=<email>`**: Searches for submissions matching the provided `email`.

## Running the Server

### Prerequisites

Ensure you have npm installed.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/UtsavUpadhyay08/Backend.git
   cd Backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the server in development mode:
   ```sh
    npm run dev
   ```
4. Build and run the server in production mode:
   ```sh
    npm run build
    npm start
   ```

The server will start at http://localhost:3000.
