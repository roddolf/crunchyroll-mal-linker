export const request = async <T>(method: 'GET' | 'HEAD' | 'POST', url: string, headers?: Tampermonkey.RequestHeaders): Promise<T> => {
  const responseText = await new Promise<string>((resolve, reject) => {
    GM_xmlhttpRequest({
      method,
      url,
      fetch: true,
      headers,
      onload: (response) => {
        if (response.status !== 200) {
          reject(response);
        }
        else {
          resolve(response.responseText);
        }
      },
    });
  });

  const body = JSON.parse(responseText);
  return body;
};
