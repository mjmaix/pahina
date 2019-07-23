import fetch from 'node-fetch';

export function jsonPost(resourceUrl: string, body: string) {
  return fetch(resourceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export function jsonPut(resourceUrl: string, body: string) {
  return fetch(resourceUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export function jsonGet(resourceUrl: string) {
  return fetch(resourceUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function jsonDelete(resourceUrl: string) {
  return fetch(resourceUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
