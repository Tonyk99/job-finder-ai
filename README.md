# Job Finder AI

> **Project Status**: This project is currently under active development. The UI is being refined and a production-ready job board API integration is in progress.

An AI-powered job matching platform that analyzes resumes and finds tailored job opportunities.

## Current Status

**In Progress:**
- Evaluating and integrating production-grade job board APIs (Adzuna, The Muse, JSearch, etc.)
- UI/UX improvements and refinements
- Core feature optimization

**Completed:**
- Basic application structure
- AI-powered resume parsing with Google Gemini
- Component architecture
- Dark theme interface

## Features

- **AI Resume Parsing**: Automatically extracts skills, experience, and location from resumes
- **Smart Job Matching**: Finds jobs that match your profile using advanced AI analysis
- **Modern UI**: Clean, professional interface with dark theme
- **Free to Start**: No signup required for first 3 searches

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (free tier)
- **Job Data**: API integration in progress
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tonyk99/job-finder-ai.git
   cd job-finder-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Get your free Gemini API key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key (completely free)
   - Add it to your `.env` file:
     ```
     GEMINI_API_KEY=your_actual_key_here
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
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

## AI Integration

The Gemini integration is configured in `src/lib/gemini.ts`. To activate it:

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

## Development Roadmap

### Phase 1: Core Functionality
- [x] Basic UI setup
- [x] Component structure
- [x] Gemini API integration
- [ ] PDF upload support
- [ ] UI refinements

### Phase 2: Job Data (In Progress)
- [ ] Integrate production job board API (evaluating providers)
- [ ] Real-time job matching
- [ ] Job data caching and optimization
- [ ] Multi-source job aggregation

### Phase 3: User Features
- [ ] User authentication (NextAuth.js)
- [ ] Save favorite jobs
- [ ] Search history
- [ ] Job alerts
- [ ] Database integration (PostgreSQL + Prisma)

### Phase 4: Enhanced AI
- [ ] Advanced job matching algorithm
- [ ] Salary insights and predictions
- [ ] Resume improvement suggestions
- [ ] Cover letter generation
- [ ] Interview preparation tips

## Job Board API Options

Currently evaluating the following providers:
- **Adzuna API**: Comprehensive job listings, free tier available
- **The Muse API**: Curated tech and creative jobs
- **JSearch (RapidAPI)**: Aggregated job data from multiple sources
- **Reed API**: UK-focused job board
- **Arbeitnow API**: Remote job listings

## Adding PDF Upload

Install required packages:
```bash
npm install react-dropzone pdf-parse
```

Update CVInput component to handle file uploads (implementation guide in the code comments).

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `GEMINI_API_KEY`
   - Job board API keys (when integrated)
5. Deploy

### Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
# Additional API keys will be added as features are integrated
```

## API Rate Limits (Free Tier)

- **Gemini 1.5 Flash**: 15 requests/min, 1M tokens/day
- **Gemini 1.5 Pro**: 2 requests/min

This is sufficient for development and initial production use.

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Known Issues

- Job board API integration pending
- PDF upload feature not yet implemented
- User authentication not available

## License

MIT License - see LICENSE file for details

## Contact

For questions or suggestions, please open an issue on GitHub.

---

**Note**: This project is under active development. Features and documentation are subject to change.