type StartViewTransition = (callback?: () => void) => void;

interface Document {
  startViewTransition: StartViewTransition;
}
