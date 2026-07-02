# BlogIT UI

The frontend for BlogIT — a blogging platform built with Angular 21 and Bootstrap 5.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v11.6.2+
- [Angular CLI](https://angular.io/cli) v21

Install Angular CLI globally if you don't have it:
```bash
npm install -g @angular/cli
```

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/alexfitzkane-02/BlogIT-UI.git
   cd BlogIT-UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the API URL**

   Open `src/environments/environment.development.ts` and point it at your running BlogIT API:
   ```typescript
   export const environment = {
     production: false,
     apiBaseUrl: 'https://localhost:7001' // update this to match your API port
   };
   ```

   For production builds, update `src/environments/environment.ts` with your deployed API URL.

4. **Run the development server**
   ```bash
   npm start
   ```

   Navigate to `http://localhost:4200`. The app reloads automatically when you save changes.

---

## 🔗 Connecting to the API

This app expects the [BlogIT API](https://github.com/alexfitzkane-02/BlogIT-API) to be running.

| Environment | UI URL | API URL |
|-------------|--------|---------|
| Development | `http://localhost:4200` | `https://localhost:{port}` |
| Production | Your deployed URL | Your Azure-hosted API URL |

> Make sure the API has CORS configured to allow `http://localhost:4200` in development. This is already set up in the API's `Program.cs`.

Authentication uses **JWT tokens stored in HTTP-only cookies** — ensure the API and UI are on compatible origins so cookies are sent correctly (`withCredentials: true` is already set on protected requests).

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the dev server at `http://localhost:4200` |
| `npm run build` | Production build (output to `dist/`) |
| `npm run watch` | Development build that rebuilds on file changes |
| `npm test` | Run unit tests with Vitest |

---

## 🧪 Running Tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev/) via the Angular build pipeline.

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                  # App-wide services, guards, interceptors
│   ├── features/
│   │   ├── blog/              # Blog list, detail, add, edit
│   │   │   ├── models/        # TypeScript interfaces (BlogPostDto, etc.)
│   │   │   └── services/      # BlogService, CategoryService, AuthorService
│   │   ├── admin/             # Admin dashboard and management pages
│   │   └── public/            # Public-facing pages (home, blog view)
│   └── app.routes.ts          # Route definitions
├── environments/
│   ├── environment.ts          # Production environment config
│   └── environment.development.ts  # Development environment config
└── styles.css                 # Global styles
```

---

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| Angular | 21 |
| Bootstrap | 5.3 |
| ngx-markdown | 21 | 
| RxJS | 7.8 |
| TypeScript | 5.9 |
| Vitest | 4 |

---

## 🔐 Authentication

Protected admin routes require a **Writer** role JWT token issued by the BlogIT API. Log in via the API's auth endpoint — the token is stored as an HTTP-only cookie and sent automatically with requests.
