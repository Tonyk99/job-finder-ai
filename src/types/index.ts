export interface Education {
  degree: string;
  institution: string;
  year?: string;
  field?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  duration: string;
  description?: string;
}

export interface UserProfile {
  // Existing required fields
  skills: string[];
  location: string;
  experienceLevel: string;
  summary: string;

  // NEW optional fields for comprehensive parsing
  yearsOfExperience?: number;
  education?: Education[];
  languages?: string[];
  visaStatus?: string;
  certifications?: string[];
  workHistory?: WorkExperience[];
  contact?: {
    email?: string;
    phone?: string;
  };
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchReasons: string[];
  url?: string;
}

export interface ResumeData {
  profile: UserProfile;
  jobMatches: JobMatch[];
}
