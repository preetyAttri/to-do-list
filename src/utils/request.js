/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return response;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
    try {
        if ((response.status >= 200 && response.status < 300) || (response.status >= 400 && response.status <= 500)) {
            return response;
        } 
        const error = new Error(response?.statusText);
        error.response = response;
        throw error;
    } catch(error) {
        throw error;
    }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url, options) {
  let option = Object.assign({}, options);
  if (!option.headers) {
    option.headers = {
      'Content-Type': 'application/json',
    };

    if (typeof option.body != 'string') {
    option.body = JSON.stringify(option.body);
    }
  }
  // eslint-disable-next-line no-undef
  return fetch(url, option)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
        return error;
    });
}
