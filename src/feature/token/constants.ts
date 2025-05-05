export const TOKEN_COSTS = {
  EVALUATE_ESSAY: 2,
  SUBMIT_ESSAY: 5,
  CHAT: 1,
} as const;

export type TokenCostType = keyof typeof TOKEN_COSTS;
