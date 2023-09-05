# Google Cloud Text to Speech

## Install

```
npm i @nospoon/text-to-speech
```

## Usage

### Serverless Function

```typescript
// /pages/api/xxx

import { handler } from '@nospoon/text-to-speech/build/server';

export default handler;
```

### Client

```typescript
import { tts } from '@nospoon/text-to-speech/build/main';

const { audioContent } = await tts('/api/xxx', content);
const player = new Audio(audioContent);
player.play();
```
