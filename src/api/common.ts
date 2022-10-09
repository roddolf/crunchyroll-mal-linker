export const request = async <T>(method: 'GET' | 'HEAD' | 'POST', url: string, headers?: Tampermonkey.RequestHeaders): Promise<T> => {
  const request = await GM.xmlHttpRequest({
    method,
    url,
    fetch: true,
    headers,
  });

  if (request.status !== 200) {
    return Promise.reject(request);
  }

  const body = JSON.parse(request.responseText);
  return body;
};
