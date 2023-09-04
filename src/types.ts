import { google } from '@google-cloud/text-to-speech/build/protos/protos';

export const DEFAULT_VOICE_LANGUAGE = 'en-GB';
export const DEFAULT_VOICE_NAME = 'en-GB-Neural2-A';

export interface GoogleCloudTTSOptions {
  voice?: google.cloud.texttospeech.v1.IVoiceSelectionParams;
  audioConfig?: google.cloud.texttospeech.v1.IAudioConfig;
  credential?: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  };
}

export interface GoogleCloudTTSResponse {
  audioContent: string;
}
