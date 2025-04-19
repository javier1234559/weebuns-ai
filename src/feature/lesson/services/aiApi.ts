import api from "@/services/baseApi";
import { EvaluateEssayDto } from "@/services/swagger-types";

const aiApi = {
  //global
  chat: (data: any) => {
    return api.aiControllerChat(data);
  },
  //writing
  evaluateEssay: (data: EvaluateEssayDto) => {
    return api.aiControllerEvaluateEssay(data);
  },
};

export default aiApi;
