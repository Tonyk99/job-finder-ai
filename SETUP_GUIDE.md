# Setup Guide - Job Finder AI

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd job-finder-ai
npm install
```

### Step 2: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it!** The app now works with mock data.

---

## Adding AI (Google Gemini - FREE)

### Step 1: Get Gemini API Key

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your key

### Step 2: Add to Environment

Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env` and add your key:
```
GEMINI_API_KEY=your_actual_key_here
```

### Step 3: Install Gemini Package

```bash
npm install @google/generative-ai
```

### Step 4: Enable Gemini Integration

1. Open `src/lib/gemini.ts`
2. **Uncomment all the code** (remove the `/*` and `*/`)
3. **Delete or comment out** the placeholder exports at the bottom

2. Open `src/app/api/process-resume/route.ts`
3. Replace the TODO section with:

```typescript
import { parseResumeWithGemini, findMatchingJobs } from '@/lib/gemini';

// Replace the mock data section with:
const profile = await parseResumeWithGemini(cvText);
const jobMatches = await findMatchingJobs(profile);
```

### Step 5: Test It

1. Restart your dev server (`npm run dev`)
2. Paste a resume and click "Find Jobs For Me"
3. AI will now analyze the resume!

---

## PDF Upload Support

The CV input component already supports file upload (drag & drop or click to upload).
Currently supports .txt files. For PDF parsing, install:

```bash
npm install pdfjs-dist
```

Then update the file handling in `src/components/CVInput.tsx` to parse PDFs.

---

## Adding Real Job Data

### Option 1: Adzuna API (Free Tier)

1. Sign up at [https://developer.adzuna.com/](https://developer.adzuna.com/)
2. Get your App ID and API Key
3. Add to `.env`:
   ```
   ADZUNA_APP_ID=your_app_id
   ADZUNA_API_KEY=your_api_key
   ```

### Option 2: Job Board Scraping

Use Puppeteer or Cheerio to scrape job boards (research local regulations first).

---

## Common Issues

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Gemini API errors
- Check your API key in `.env`
- Verify you're not exceeding rate limits (15 req/min free tier)
- Restart dev server after changing `.env`

---

## What's Next?

1. **Deploy to Vercel** (free)
   - Push to GitHub
   - Import to Vercel
   - Add environment variables

2. **Add Database**
   - Set up Supabase (free PostgreSQL)
   - Install Prisma ORM
   - Save user searches

3. **Enhance AI**
   - Better prompts
   - Resume scoring
   - Cover letter generation

---

## Need Help?

- Check the main README.md
- Review the code comments
- Google Gemini docs: [https://ai.google.dev/](https://ai.google.dev/)
- Next.js docs: [https://nextjs.org/docs](https://nextjs.org/docs)
