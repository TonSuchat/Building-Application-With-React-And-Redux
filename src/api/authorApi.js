import { handleResponse, handleError, tempBaseUrl } from "./apiUtils";
const baseUrl = process.env.API_URL
  ? `${process.env.API_URL}/authors/`
  : `${tempBaseUrl}/authors/`;

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
