"use client";

import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  TranslateDto,
  CheckGrammarDto,
  TextToSpeechDto,
  ChatRequestDto,
  StartSpeakingDto,
  SpeakingDto,
  EvaluateEssayDto,
  RecommendAnswerResponseDto,
} from "@/services/swagger-types";
import aiApi from "@/feature/ai/services/aiApi";

const AI_BASE = ["ai"] as const;

export const AI_KEY_FACTORY = {
  all: AI_BASE,
  translate: [...AI_BASE, "translate"] as const,
  grammar: [...AI_BASE, "grammar"] as const,
  topics: [...AI_BASE, "topics"] as const,
  tts: [...AI_BASE, "tts"] as const,
  chat: [...AI_BASE, "chat"] as const,
  speaking: [...AI_BASE, "speaking"] as const,
  essay: [...AI_BASE, "essay"] as const,
  answer: [...AI_BASE, "answer"] as const,
} as const;

// Translation hooks
export const useTranslate = () => {
  return useMutation({
    mutationFn: (data: TranslateDto) => aiApi.translate(data),
  });
};

// Grammar check hooks
export const useCheckGrammar = () => {
  return useMutation({
    mutationFn: (data: CheckGrammarDto) => aiApi.checkGrammar(data),
  });
};

// Text to Speech hooks
export const useTextToSpeechTest = () => {
  return useMutation({
    mutationFn: () => aiApi.textToSpeechTest(),
  });
};

export const useTextToSpeech = () => {
  return useMutation({
    mutationFn: (data: TextToSpeechDto) => aiApi.textToSpeech(data),
  });
};

export const useTextToSpeechAll = (options?: UseQueryOptions<any>) => {
  return useQuery({
    queryKey: AI_KEY_FACTORY.tts,
    queryFn: () => aiApi.textToSpeechAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

// Chat hooks
export const useChat = () => {
  return useMutation({
    mutationFn: (data: ChatRequestDto) => aiApi.chat(data),
  });
};

// Speaking hooks
export const useStartSpeaking = () => {
  return useMutation({
    mutationFn: (data: StartSpeakingDto) => aiApi.startSpeaking(data),
  });
};

export const useChatSpeaking = () => {
  return useMutation({
    mutationFn: (data: SpeakingDto) => aiApi.chatSpeaking(data),
  });
};

// Essay evaluation hooks
export const useEvaluateEssay = () => {
  return useMutation({
    mutationFn: (data: EvaluateEssayDto) => aiApi.evaluateEssay(data),
  });
};

export const useRecommendAnswer = (
  sessionId: string,
  options?: UseQueryOptions<RecommendAnswerResponseDto>,
) => {
  return useQuery({
    queryKey: [AI_KEY_FACTORY.tts, sessionId],
    queryFn: () => aiApi.recommendAnswer(sessionId),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    ...(typeof options === "object" ? options : {}),
  });
};



