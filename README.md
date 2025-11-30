# AI Fashion Studio Generator

An interactive web application that allows users to generate fashion designs using AI. The platform enables users to upload base images, apply AI-powered transformations, and preview styled outputs in real time. The project is built with a modern front-end stack using Vite, React, TypeScript, Tailwind CSS, and Supabase for backend services.


## Features

### Core Functionality

* AI-powered fashion design generation
* Upload garment or model images
* Apply style prompts to generate new fashion concepts
* View results instantly within the studio UI

### Front-End

* **Vite** for fast development and optimized builds
* **React + TypeScript** for scalable component architecture
* **Tailwind CSS** for responsive and modern UI
* Clean routing and state management patterns

### Backend / Cloud

* **Supabase** for authentication, storage, and database
* Secure handling of user uploads stored in Supabase buckets
* Environment variables handled via `.env`

## Project Structure

/
├── public/                     # Static assets
├── src/                        # Front-end source code
│   ├── components/             # UI components
│   ├── pages/                  # Application pages
│   ├── services/               # API and Supabase clients
│   ├── styles/                 # Tailwind and global styles
│   └── main.tsx                # App entry point
├── supabase/                   # Supabase configuration and migrations
├── index.html                  # Root HTML
├── package.json                # Dependencies and scripts
├── tailwind.config.ts          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── eslint.config.js            # Linting rules
├── tsconfig.json               # TypeScript configuration
└── .env                        # Environment variables (not committed)


## Tech Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Framework        | React + TypeScript |
| Build Tool       | Vite               |
| UI               | Tailwind CSS       |
| Backend          | Supabase           |
| Package Manager  | npm or Bun         |
| Linting          | ESLint             |
| Styling Pipeline | PostCSS            |

## Environment Variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_public_anon_key
VITE_AI_API_KEY=your_ai_model_key_if_any
```

Never commit real credentials.

## Installation

### 1. Clone the repository

```
git clone <your-repo-url>
cd AI-Fashion-Studio
```

### 2. Install dependencies

Using npm:

```
npm install
```

Using Bun:

```
bun install
```

### 3. Run development server

```
npm run dev
```

### 4. Build for production


npm run build

## How It Works

1. User uploads a base clothing or model image
2. App sends the image + prompt to the AI service (configured inside `src/services/`)
3. AI returns generated variations
4. Images are stored in Supabase Storage
5. Generated designs appear in the UI for download or reuse

## Future Enhancements

* Export options for design sheets
* More style presets
* User accounts and saved design history
* Mobile-optimized studio UI
