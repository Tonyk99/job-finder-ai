import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserProfile } from '@/types';

let genAI: GoogleGenerativeAI | null = null;

/**
 * Initialize the Gemini AI client (singleton pattern)
 * @returns GoogleGenerativeAI instance
 * @throws Error if GEMINI_API_KEY is not configured
 */
function initializeGemini(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

/**
 * Comprehensive prompt for extracting structured data from resumes
 * Supports both English and Japanese resumes
 */
const RESUME_PARSING_PROMPT = `
You are an expert resume parser that extracts structured information from resumes in both English and Japanese.

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

Return ONLY the JSON object, no additional text.
`;

/**
 * Parse a resume using Google Gemini AI
 * @param cvText - The resume text to parse
 * @returns Promise<UserProfile> - Structured profile data
 * @throws Error if parsing fails
 */
export async function parseResumeWithGemini(cvText: string): Promise<UserProfile> {
  try {
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.2,  // Low temperature for consistent extraction
        responseMimeType: "application/json"
      }
    });

    const prompt = RESUME_PARSING_PROMPT.replace('{resumeText}', cvText);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

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
    console.error('Gemini API error:', error);
    throw new Error('Failed to parse resume with AI');
  }
}
