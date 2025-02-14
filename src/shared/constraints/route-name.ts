export enum RouteNames {
  EMPTY = "",
  Home = "/",
  Dashboard = "/app",
  About = "/about",
  Blog = "/blog",

  Auth = "/auth",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  ME = "/me",
  Logout = "/logout",

  WritingAgent = "/writing-agent",
  WritingAgentCreate = "/writing-agent/create",
  WritingAgentEdit = "/writing-agent/edit/:id",
  WritingAgentDetail = "/writing-agent/detail/:id",


  VoiceAgent = "/voice-agent",
  VoiceAgentCreate = "/voice-agent/create",
  VoiceAgentEdit = "/voice-agent/edit/:id",
  VoiceAgentDetail = "/voice-agent/detail/:id",
}

export function replaceRouteName(
  routeName: RouteNames,
  params: Record<string, string>
) {
  console.log(routeName, params);
  return routeName.replace(/:id/g, params.id);
}

//example
// const routeName = RouteNames.WritingAgentDetail;
// const params = { id: "123" };
// const newRouteName = replaceRouteName(routeName, params);
// console.log(newRouteName); // "/writing-agent/detail/123"
