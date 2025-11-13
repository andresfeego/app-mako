import { HOST_NAME } from './config';

export async function setDB(endpoint, data = {}, options = {}) {
  const base = HOST_NAME || '';
  const url = `${base}${endpoint}`;

  const method = data.method || 'POST';
  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
  const body = isFormData ? data : data.body ?? data;

  try {
    const res = await fetch(url, {
      method,
      headers: isFormData
        ? { Accept: 'application/json', ...(options.headers || {}) }
        : { Accept: 'application/json', 'Content-Type': 'application/json', ...(options.headers || {}) },
      body: isFormData ? body : JSON.stringify(body ?? {}),
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        const errorText = await res.text();
        errorData = { error: errorText };
      }
      throw errorData;
    }

    const json = await res.json();

    if (json && json.ok === false) {
      throw new Error(`[setDB] Backend error: ${JSON.stringify(json)}`);
    }

    return json;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[setDB] Fetch failed: ${url}`, error);
    throw error;
  }
}

