import { GoogleCloudTTSOptions, GoogleCloudTTSResponse } from './types';

export async function tts(api: string, text: string, options?: GoogleCloudTTSOptions) {
  const response = await fetch(api, {
    method: 'POST',
    body: JSON.stringify({ text, options }),
  });

  if (response.ok) {
    const data = (await response.json()) as GoogleCloudTTSResponse;
    return data;
  } else {
    throw new Error(`[${response.status}] ${response.statusText}`);
  }
}
