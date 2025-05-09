// Amazing enterprise level tactic to avoid typos in route names
const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  ASK_QUESTION: '/ask-question',
  COLLECTION: '/collection',
  COMMUNITY: '/community',
  TAGS: '/tags',
  JOBS: '/jobs',
  TAG: (id: string) => `/tags/${id}`, // /tags/1
  PROFILE: (id: string) => `/profile/${id}`, // /profile/1
  QUESTION: (id: string) => `/questions/${id}`, // /question/1
  SETTINGS: '/settings',
  NOT_FOUND: '/404',
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};
export default ROUTES;

// why we need to create a constants/routes.ts file?
// To avoid typos in route names
// To avoid hardcoding of route names
// To avoid duplication of route names
// To avoid confusion in route names
// To avoid errors in route names
// To avoid inconsistency in route names
// To avoid repetition of route names
// To avoid misuse of route names
// To avoid misunderstanding of route names
// To avoid misinterpretation of route names
