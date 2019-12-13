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

export function customSort(source, key, isAscending = true) {
  return isAscending
    ? source.sort((a, b) => {
        return innerSort(a[key], b[key]);
      })
    : source.sort((a, b) => {
        return innerSort(b[key], a[key]);
      });
}

function innerSort(a, b) {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
}
