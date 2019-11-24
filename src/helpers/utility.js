export function isLoading(state) {
  return state && state.apiCallInProgress && state.apiCallInProgress > 0
    ? true
    : false;
}

export function objectFilter(source, query, properties) {
  return source.filter(record => {
    return properties.some(
      key => record[key].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  });
}
