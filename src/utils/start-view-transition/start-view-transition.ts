export function startViewTransition(callback?: StartViewTransition) {
  if (!document.startViewTransition) {
    return callback?.();
  }

  document.startViewTransition(callback);
}
