import type { AnalyzedResume, Interview } from "../types";
import apiClient from "./apiClient";

class InterviewService {
  async analyzeResume(file: File): Promise<AnalyzedResume | null> {
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await apiClient.post("/interview/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      return null;
    }
  }

  async startInterview(
    role: string,
    experience: string,
    mode: "HR" | "Technical",
    resumeText: string,
    projects: string[],
    skills: string[],
  ): Promise<Interview | null> {
    try {
      const response = await apiClient.post("/interview/start", {
        role,
        experience,
        mode,
        resumeText,
        projects,
        skills,
      });
      return response.data;
    } catch (error: any) {
      console.error("Error starting interview:", error);
      return null;
    }
  }
}

const interviewService = new InterviewService();
export default interviewService;
