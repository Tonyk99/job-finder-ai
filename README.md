# Job Finder AI

An AI-powered job matching platform that analyzes resumes and finds tailored job opportunities.

## Features

- **AI Resume Parsing**: Automatically extracts skills, experience, and location from resumes
- **Smart Job Matching**: Finds jobs that actually match your profile
- **Beautiful UI**: Clean, modern interface with dark theme
- **Free to Start**: No signup required for first 3 searches

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (free tier)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   cd job-finder-ai
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Get your free Gemini API key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key (completely free)
   - Add it to your `.env` file:
     ```
     GEMINI_API_KEY=your_actual_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
job-finder-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── process-resume/    # API endpoint for resume processing
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── CVInput.tsx             # Resume input component
│   │   ├── ProfileCard.tsx         # User profile display
│   │   └── JobCard.tsx             # Job listing card
│   ├── lib/
│   │   └── gemini.ts               # Gemini AI integration
│   └── types/
│       └── index.ts                # TypeScript types
├── public/                         # Static files
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

## Integrating Google Gemini API

The Gemini integration is set up in `src/lib/gemini.ts`. To activate it:

1. Install the Google Generative AI package:
   ```bash
   npm install @google/generative-ai
   ```

2. Uncomment the code in `src/lib/gemini.ts`

3. Update `src/app/api/process-resume/route.ts` to use the Gemini functions:
   ```typescript
   import { parseResumeWithGemini, findMatchingJobs } from '@/lib/gemini';

   const profile = await parseResumeWithGemini(cvText);
   const jobMatches = await findMatchingJobs(profile);
   ```

## Next Steps

### Phase 1: Core Functionality (Current)
- [x] Basic UI setup
- [x] Component structure
- [ ] Gemini API integration
- [ ] PDF upload support

### Phase 2: Job Data
- [ ] Integrate job board API (Adzuna, Reed, etc.)
- [ ] Web scraping for additional sources
- [ ] Real-time job matching

### Phase 3: User Features
- [ ] User authentication (NextAuth.js)
- [ ] Save favorite jobs
- [ ] Search history
- [ ] Database integration (PostgreSQL + Prisma)

### Phase 4: Enhanced AI
- [ ] Better job matching algorithm
- [ ] Salary insights
- [ ] Resume improvement suggestions
- [ ] Cover letter generation

## Adding PDF Upload

Install required packages:
```bash
npm install react-dropzone pdf-parse
```

Update CVInput component to handle file uploads (implementation guide in the code comments).

## Deployment

### Deploy to Vercel (Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (GEMINI_API_KEY)
5. Deploy

## API Limits (Free Tier)

- **Gemini 1.5 Flash**: 15 requests/min, 1M tokens/day
- **Gemini 1.5 Pro**: 2 requests/min

This is more than enough for development and initial users!

## Contributing

Feel free to submit issues and pull requests.

## License

MIT
