# Job Finder AI - Project Structure

## Directory Overview

```
job-finder-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── process-resume/ # Resume processing API endpoint
│   │   │       └── route.ts
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page (main app)
│   ├── components/             # Reusable React components
│   │   ├── CVInput.tsx         # Resume input with file upload
│   │   ├── Header.tsx          # Navigation header
│   │   ├── JobCard.tsx         # Job listing card
│   │   └── ProfileCard.tsx     # User profile display
│   ├── lib/                    # Utility functions
│   │   └── gemini.ts           # Google Gemini AI integration
│   └── types/                  # TypeScript type definitions
│       └── index.ts
├── public/                     # Static assets
│   └── robots.txt
├── .env.example                # Environment variables template
├── .gitignore
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # Main documentation
├── SETUP_GUIDE.md              # Quick setup guide
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## Key Files Explained

### Components

- **CVInput.tsx**: Handles both text input and file uploads (drag & drop supported)
- **Header.tsx**: Top navigation with logo and links
- **JobCard.tsx**: Displays individual job matches with "Apply Now" buttons
- **ProfileCard.tsx**: Shows AI-extracted resume information (skills, location, etc.)

### API Routes

- **process-resume/route.ts**: POST endpoint that processes resume text and returns matches
  - Currently uses mock data
  - Ready to integrate with Gemini AI

### Configuration

- **tailwind.config.ts**: Custom brand colors configured from your original design
- **tsconfig.json**: TypeScript strict mode enabled
- **next.config.ts**: Next.js 15 configuration

## Features Built-In

✅ Responsive design (mobile-friendly)
✅ Dark theme with custom colors
✅ File upload (drag & drop)
✅ TypeScript for type safety
✅ ESLint for code quality
✅ Mock data for testing
✅ API route structure ready
✅ Tailwind CSS configured

## Ready to Add

🔲 Google Gemini AI integration (commented code ready in gemini.ts)
🔲 PDF parsing (install pdfjs-dist)
🔲 Real job board APIs (Adzuna, etc.)
🔲 User authentication (NextAuth.js)
🔲 Database (PostgreSQL + Prisma)

## Running the Project

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Next Steps

1. Test the app with mock data
2. Get Gemini API key and integrate AI
3. Add real job data sources
4. Deploy to Vercel

See SETUP_GUIDE.md for detailed instructions!
