# SekawanMedia Test Project

A React-based web application built with Vite, TypeScript, and TailwindCSS.

Deployed at [sekawanmedia-fe.djie.cloud](https://sekawanmedia-fe.djie.cloud/)

Api source is from https://github.com/ajinata84/Sekawan-Media-Test-Simple-API accessed from [sekawanmedia-be.djie.cloud](https://sekawanmedia-be.djie.cloud/)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ajinata84/Sekawan-Media-Test-Simple-API.git
cd FrontendDevReactjs-SoalTeknis-PrashTrisulaAjinata
```

1. Install dependencies:

```bash
npm install
# or
yarn
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Locally preview production build

## Project Structure

```

FrontendDevReactjs-SoalTeknis-PrashTrisulaAjinata/
├── src/
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
└── tailwind.config.js
```

## Tech Stack

- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.10
- **Language:** TypeScript 5.6.2
- **Styling:**
    - TailwindCSS 3.4.14
    - tailwind-merge
    - tailwindcss-animate
- **UI Components:**
    - shadcn
    - Radix UI Primitives
    - Lucide React icons
- **Routing:** React Router DOM 6.28.0
- **HTTP Client:** Axios 1.7.7
- **Development Tools:**
    - ESLint
    - TypeScript ESLint
    - Various React-specific ESLint plugins

## Dependencies

### Core Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0",
  "axios": "^1.7.7"
}
```

### UI Dependencies

```json
{
  "@radix-ui/react-checkbox": "^1.1.2",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-dropdown-menu": "^2.1.2",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-slot": "^1.1.0",
  "lucide-react": "^0.455.0"
}
```