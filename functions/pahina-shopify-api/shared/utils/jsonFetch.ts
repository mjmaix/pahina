import fetch from 'node-fetch';

export function jsonPost(resourceUrl: string, body: string) {
  console.log(
    `[INFO] post body URL: ${process.env.ENV !== 'prod' ? resourceUrl : ''}`,
    body,
  );
  return fetch(resourceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export function jsonPut(resourceUrl: string, body: string) {
  console.log(
    `[INFO] put body URL: ${process.env.ENV !== 'prod' ? resourceUrl : ''}`,
    body,
  );
  return fetch(resourceUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}
