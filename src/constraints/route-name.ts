export enum RouteNames {
  EMPTY = "",
  Landing = "/",
  Home = "/home",
  About = "/about",
  Blog = "/blog",

  Auth = "/auth",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  ME = "/settings/me",
  Settings = "/settings",
  SettingsAppearance = "/settings/appearance",
  SettingsAccount = "/settings/account",
  SettingsNotifications = "/settings/notifications",
  SettingsPayment = "/settings/payment",
  SettingsHistory = "/settings/history",
  Logout = "/logout",
  ForgotPassword = "/forgot-password",
  Lesson = "/lesson/writing",
  MyVocabulary = "/my-vocabulary",

  Writing = "/lesson/writing",
  WritingCreate = "/lesson/writing/create",
  WritingEdit = "/lesson/writing/edit/:id",
  WritingDetail = "/lesson/writing/detail/:id",

  Vocabulary = "/lesson/vocabulary",
  VocabularyCreate = "/lesson/vocabulary/create",
  VocabularyEdit = "/lesson/vocabulary/edit/:id",
  VocabularyDetail = "/lesson/vocabulary/detail/:id",

  Speaking = "/lesson/speaking",
  SpeakingCreate = "/lesson/speaking/create",
  SpeakingEdit = "/lesson/speaking/edit/:id",
  SpeakingDetail = "/lesson/speaking/detail/:id",

  Reading = "/lesson/reading",
  ReadingCreate = "/lesson/reading/create",
  ReadingEdit = "/lesson/reading/edit/:id",
  ReadingResult = "/lesson/reading/:id/result",

  Listening = "/lesson/listening",
  ListeningCreate = "/lesson/listening/create",
  ListeningEdit = "/lesson/listening/edit/:id",
  ListeningDetail = "/lesson/listening/detail/:id",
}

export function replaceRouteName(
  routeName: RouteNames,
  params: Record<string, string>,
) {
  console.log(routeName, params);
  return routeName.replace(/:id/g, params.id);
}

//example
// const routeName = RouteNames.WritingAgentDetail;
// const params = { id: "123" };
// const newRouteName = replaceRouteName(routeName, params);
// console.log(newRouteName); // "/writing-agent/detail/123"
