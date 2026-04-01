import apiClient from "./apiClient";

class InterviewService {
  async analyzeResume(file: File): Promise<any> {
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
      throw new Error(error.message || "Failed to analyze resume");
    }
  }
}

const interviewService = new InterviewService();
export default interviewService;
