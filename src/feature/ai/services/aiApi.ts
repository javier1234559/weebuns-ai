import api from "@/services/baseApi";
import {
  EvaluateEssayDto,
  TranslateDto,
  CheckGrammarDto,
  TextToSpeechDto,
  ChatRequestDto,
  StartSpeakingDto,
  SpeakingDto,
} from "@/services/swagger-types";
import { handleApiError } from "@/lib/utils";
import { se } from "date-fns/locale";

const aiApi = {
  //check
  checkSession: (sessionId: string) => {
    return api
      .aiControllerCheckSession(sessionId)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Translation
  translate: (data: TranslateDto) => {
    return api
      .aiControllerTranslate(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Grammar Check
  checkGrammar: (data: CheckGrammarDto) => {
    return api
      .aiControllerCheckGrammar(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Text to Speech
  textToSpeechTest: () => {
    return api
      .aiControllerTextToSpeechTest()
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  textToSpeech: (data: TextToSpeechDto) => {
    return api
      .aiControllerTextToSpeech(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  textToSpeechAll: () => {
    return api
      .aiControllerTextToSpeechAll()
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Chat
  chat: (data: ChatRequestDto) => {
    return api
      .aiControllerChat(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  chatStreaming: (data: ChatRequestDto) => {
    return api
      .aiControllerChatStreaming(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Speaking
  startSpeaking: (data: StartSpeakingDto) => {
    return api
      .aiControllerStartSpeaking(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  chatSpeaking: (data: SpeakingDto) => {
    return api
      .aiControllerChatSpeaking(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  checkSpeakingSession: (sessionId: string) => {
    return api
      .aiControllerCheckSpeakingSession(sessionId)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  clearSpeakingSession: (sessionId: string) => {
    return api
      .aiControllerClearSpeakingSession(sessionId)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Essay Evaluation
  evaluateEssay: (data: EvaluateEssayDto) => {
    return api
      .aiControllerEvaluateEssay(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Answer Recommendation
  recommendAnswer: (sessionId: string) => {
    return api
      .aiControllerRecommendAnswer(sessionId)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Answer Recommendation
  speakingStreaming: (data: SpeakingDto) => {
    return api
      .aiControllerChatSpeakingStreaming(data)
      .then((res: any) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default aiApi;
