# Muhammad-innovaxel-Abdullah


## Folder Structure

```
URL shortner/
│
├── backend/                # Node.js/Express/MongoDB backend
│   ├── controllers/        # Route handler logic (urlController.js)
│   ├── models/             # Mongoose models (urlModel.js)
│   ├── providers/          # MongoDB connection logic (mongoProvider.js)
│   ├── routes/             # Express route definitions (urlRoutes.js)
│   ├── utils/              # Utility functions (shortCodeGenerator.js)
│   └── index.js            # Main Express app entry point
│
├── frontend/               # Next.js + Tailwind CSS frontend
│   ├── app/                # Next.js app directory (page.tsx, globals.css)
│   ├── components/         # React components (CreateShortUrlForm.tsx)
│   └── ...                 # Other Next.js config and public files
│
└── README.md               # This file
```

---

## Installation & Running

### 1. Clone the repository
```bash
git clone <your-repo-url>
```

### 2. Backend Setup
```bash
cd backend
npm install
```

- Create a `.env` file in `backend/` with your MongoDB credentials:
  ```env
  MONGO_USERNAME=root
  MONGO_PASSWORD=example
  MONGO_HOST=localhost
  MONGO_PORT=27017
  MONGO_DB=urlshortener
  MONGO_URI=mongodb://root:example@localhost:27017/urlshortener?authSource=admin
  ```
- Start MongoDB if running locally.
- Start the backend server:
  ```bash
  npm run dev
  # or
  node index.js
  ```
- The backend will run on `http://localhost:3000` by default.

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
- The frontend will run on `http://localhost:3000` (or next available port if 3000 is in use).

---

## How Everything is Implemented

### Backend (Node.js, Express, MongoDB)
- **Express** serves as the web server and API layer.
- **Mongoose** is used for MongoDB object modeling and schema validation.
- **Controllers** handle business logic for each endpoint (create, retrieve, update, delete, stats).
- **Routes** define RESTful API endpoints under `/shorten`.
- **Providers** manage the MongoDB connection using credentials from `.env`.
- **Utils** include a random short code generator ensuring uniqueness.
- **Endpoints:**
  - `POST   /shorten`           - Create a new short URL
  - `GET    /shorten/:code`     - Retrieve the original URL
  - `PUT    /shorten/:code`     - Update the original URL
  - `DELETE /shorten/:code`     - Delete a short URL
  - `GET    /shorten/:code/stats` - Get statistics for a short URL

### Frontend (Next.js, Tailwind CSS)
- **Single-page UI** with a large, centered card for all actions.
- **One main input** for URL or short code, and a second input appears for update.
- **Action buttons** (Create, Retrieve, Update, Delete, Stats) in a single row, styled with Tailwind.

- **All API calls** are made to the backend endpoints described above.

---
