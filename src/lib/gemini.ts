import { GoogleGenAI } from '@google/genai';
import { UserProfile } from '@/types';

let ai: GoogleGenAI | null = null;

/**
 * Initialize the Gemini AI client (singleton pattern)
 * @returns GoogleGenAI instance
 * @throws Error if GEMINI_API_KEY is not configured
 */
function initializeGemini(): GoogleGenAI {
  if (!ai) {
    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }
    // Initialize with explicit API key
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

const RESUME_PARSING_PROMPT = `You are an expert resume parser that extracts structured information from resumes in both English and Japanese.

TASK: Extract ALL information from the following resume and return it as a JSON object.

SCHEMA:
{
  "skills": string[],
  "location": string,
  "experienceLevel": string,
  "summary": string,
  "yearsOfExperience": number,
  "education": [{"degree": string, "institution": string, "year": string, "field": string}],
  "languages": string[],
  "visaStatus": string,
  "certifications": string[],
  "workHistory": [{"title": string, "company": string, "duration": string, "description": string}],
  "contact": {"email": string, "phone": string}
}

INSTRUCTIONS:
1. Extract information in the language provided (preserve Japanese characters)
2. For experienceLevel, use: "Entry Level", "Junior", "Mid Level", "Senior", "Lead", or "Executive"
3. Calculate years of experience from work history if not stated
4. For languages, include proficiency (e.g., "Japanese (N2)", "English (Native)")
5. Identify visa keywords: "PR", "Permanent Resident", "Work Visa", "Citizen", "Spouse Visa"
6. If information missing, use defaults:
   - location: "Not specified"
   - experienceLevel: "Not specified"
   - summary: "Professional with diverse experience and skills"
   - Empty arrays [] for missing collections
7. For Japanese resumes, translate summary to English but preserve names/locations in Japanese
8. Keep skill names concise (e.g., "React" not "React.js development")

RESUME TEXT:
{resumeText}

Return ONLY the JSON object, no additional text.`;

/**
 * Parse a resume using Google Gemini AI
 * @param cvText - The resume text to parse
 * @returns Promise<UserProfile> - Structured profile data
 * @throws Error if parsing fails
 */
export async function parseResumeWithGemini(cvText: string): Promise<UserProfile> {
  try {
    const ai = initializeGemini();

    const prompt = RESUME_PARSING_PROMPT.replace('{resumeText}', cvText);

    // Get model name from env or use default
    const modelName = process.env.GEMINI_MODEL || "models/gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.2,  // Low temperature for consistent extraction
        responseMimeType: "application/json"
      }
    });

    // New API has .text property directly on response
    const text = response.text;

    if (!text) {
      throw new Error('No response text from Gemini API');
    }

    // Parse and validate JSON
    const parsed = JSON.parse(text);

    // Validate and return with defaults for missing data
    const profile: UserProfile = {
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      location: parsed.location || 'Not specified',
      experienceLevel: parsed.experienceLevel || 'Not specified',
      summary: parsed.summary || 'Professional with diverse experience and skills',
      yearsOfExperience: parsed.yearsOfExperience,
      education: parsed.education,
      languages: parsed.languages,
      visaStatus: parsed.visaStatus,
      certifications: parsed.certifications,
      workHistory: parsed.workHistory,
      contact: parsed.contact
    };

    return profile;
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Gemini API error:', error);
    }
    throw new Error('Failed to parse resume with AI');
  }
}
