interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

interface AnalyzedResume {
  resumeText: string;
  role: string;
  experience: string;
  projects: string[];
  skills: string[];
}

interface InterviewQuestion {
  question: string;
  difficulty: string;
  timeLimit: number;
  answer: string | null;
  feedback: string | null;
  score: number;
  confidence: number;
  communication: number;
  correctness: number;
}

interface Interview {
  _id: string;
  userId: string;
  role: string;
  experience: string;
  resumeText: string;
  mode: "HR" | "Technical";
  status: "incomplete" | "complete";
  finalScore: number;
  questions: InterviewQuestion[];
  createdAt: string;
  updatedAt: string;
}

export type { User, AnalyzedResume, InterviewQuestion, Interview };
