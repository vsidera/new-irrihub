
export function authHeaders() {
    const tokenKey = JSON.parse(localStorage.getItem('key'));
    const authToken = `Bearer ${tokenKey}`;
    return {
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: authToken,
      },
    };
  }