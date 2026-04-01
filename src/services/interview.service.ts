import type { AnalyzedResume } from "../types";
import apiClient from "./apiClient";

class InterviewService {
  async analyzeResume(file: File): Promise<AnalyzedResume | null> {
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await apiClient.post(
        "/interview/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      return null;
    }
  }
}

const interviewService = new InterviewService();
export default interviewService;
