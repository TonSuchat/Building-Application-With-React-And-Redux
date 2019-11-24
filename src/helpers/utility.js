export function isLoading(state) {
  return state && state.apiCallInProgress && state.apiCallInProgress > 0
    ? true
    : false;
}
