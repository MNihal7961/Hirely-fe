interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

interface AnalyzedResume {
  role: string;
  experience: string;
  projects: string[];
  skills: string[];
}

export type { User, AnalyzedResume };
