import { HOST_NAME, LOG_GETDB } from './config';

export async function getDB(endpoint, options = {}) {
  const base = HOST_NAME || '';
  const url = `${base}${endpoint}`;
  const method = options.method || 'POST';
  const body = options.body || {};

  const config = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    signal: options.signal,
  };

  if (method !== 'GET' && method !== 'HEAD' && body) {
    config.body = JSON.stringify(body);
  }

  if (LOG_GETDB) {
    // eslint-disable-next-line no-console
    console.log(`[getDB] ${method} ${url}`, config.body ? { body: config.body } : '');
  }

  try {
    const res = await fetch(url, config);
    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      const errText = await res.text();
      const msg = `[getDB] HTTP ${res.status} ${res.statusText} → ${url}\n${errText}`;

      if (res.status === 401) {
        if (LOG_GETDB) console.warn('[getDB] 401 unauthorized');
        return { status: 401, data: null };
      }
      if (LOG_GETDB) console.error(msg);
      throw new Error(msg);
    }

    if (!contentType || !contentType.includes('application/json')) {
      const raw = await res.text();
      const msg = `[getDB] Non-JSON response from ${url}:\n${raw}`;
      if (LOG_GETDB) console.warn(msg);
      throw new Error(msg);
    }

    return await res.json();
  } catch (err) {
    const msg = `[getDB] Fetch error for ${url}: ${err?.message || err}`;
    if (LOG_GETDB) console.error(msg);
    if (!String(err?.message || '').includes('401')) {
      throw new Error(msg);
    }
    return { status: 401, data: null };
  }
}

