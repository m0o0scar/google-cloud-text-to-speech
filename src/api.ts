import { NextApiRequest, NextApiResponse } from 'next';

import textToSpeech from '@google-cloud/text-to-speech';
import { google } from '@google-cloud/text-to-speech/build/protos/protos';

import { DEFAULT_VOICE_LANGUAGE, DEFAULT_VOICE_NAME, GoogleCloudTTSOptions } from './types';

export async function tts(text: string, options?: GoogleCloudTTSOptions) {
  const {
    voice: { languageCode = DEFAULT_VOICE_LANGUAGE, name = DEFAULT_VOICE_NAME, ...restVoice } = {},

    audioConfig: { audioEncoding = 'MP3', ...restAudioConfig } = {},

    credential: {
      projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || '',
      clientEmail: client_email = process.env.GOOGLE_CLOUD_CLIENT_EMAIL || '',
      privateKey: private_key = (process.env.GOOGLE_CLOUD_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    } = {},
  } = options || {};

  // create a google cloud text to speech client
  const client = new textToSpeech.TextToSpeechClient({
    projectId,
    credentials: { client_email, private_key },
  });

  const request: google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { text },
    voice: {
      languageCode,
      name,
      ...restVoice,
    },
    audioConfig: {
      audioEncoding,
      ...restAudioConfig,
    },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  // send the binary audio content back to client
  return response.audioContent;
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, options } = req.body;
  const audioContent = await tts(text, options);

  // send the binary audio content back to client
  if (audioContent) {
    const encoded = Buffer.from(audioContent).toString('base64');
    const base64 = `data:audio/mp3;base64,${encoded}`;
    res.status(200).json({ audioContent: base64 });
  } else {
    res.status(500).send('No audio content');
  }
}
