import { DialogueLine, CharacterVoiceCast } from '../types';

// Curated voice banks per provider
export const PROVIDER_VOICE_BANKS: Record<string, {
  narrator: string;
  female: string[];
  male: string[];
  neutral: string[];
}> = {
  gemini: {
    narrator: 'Kore',
    female: ['Aoede', 'Kore'],
    male: ['Fenrir', 'Charon'],
    neutral: ['Puck'],
  },
  openai: {
    narrator: 'alloy',
    female: ['nova', 'shimmer'],
    male: ['onyx', 'echo'],
    neutral: ['fable'],
  },
  pollinations: {
    narrator: 'alloy',
    female: ['nova', 'shimmer'],
    male: ['onyx', 'echo'],
    neutral: ['fable'],
  },
};

// Common speech reporting verbs in English literature
const SPEECH_VERB_REGEX = /\b(said|asked|replied|whispered|shouted|exclaimed|murmured|cried|demanded|gasped|growled|snapped|muttered|breathed|called|yelled|responded|cheered|pleaded|commanded|warned|chuckled|sighed|laughed)\b/i;

// Female and male name clues for voice pitch heuristic
const FEMALE_INDICATORS = /\b(she|her|hers|queen|princess|girl|lady|witch|mother|sister|maiden|daughter|madam|woman|heroine)\b/i;
const MALE_INDICATORS = /\b(he|him|his|king|prince|boy|lord|wizard|father|brother|knight|son|sir|man|hero)\b/i;

/**
 * Sanitizes and cleans dialogue text
 */
function cleanQuote(text: string): string {
  return text.replace(/^["'“”«»]/, '').replace(/["'“”«»]$/, '').trim();
}

/**
 * Resolves a potential speaker name against known characters or capitalized words
 */
function resolveSpeaker(candidate: string, knownCharacters: string[]): string {
  const clean = candidate.trim().replace(/[.,!?:;]$/, '');
  if (!clean || clean.length < 2) return 'Narrator';

  // Check known characters match (case-insensitive)
  const matched = knownCharacters.find(c => c.toLowerCase() === clean.toLowerCase());
  if (matched) return matched;

  // Stop-word check
  const stopWords = new Set(['The', 'A', 'An', 'It', 'There', 'Then', 'Suddenly', 'Meanwhile', 'Next', 'Finally', 'He', 'She', 'They', 'Someone']);
  if (stopWords.has(clean)) return 'Narrator';

  return clean;
}

/**
 * Generates a consistent voice cast mapping for characters across the story
 */
export function getVoiceCastMap(
  characters: string[],
  provider: 'gemini' | 'openai' | 'pollinations' = 'gemini',
  defaultNarratorVoice?: string
): Record<string, CharacterVoiceCast> {
  const bank = PROVIDER_VOICE_BANKS[provider] || PROVIDER_VOICE_BANKS.gemini;
  const narratorVoice = defaultNarratorVoice || bank.narrator;

  const castMap: Record<string, CharacterVoiceCast> = {
    Narrator: {
      characterName: 'Narrator',
      voice: narratorVoice,
      genderOrPitch: 'neutral',
      color: '#94a3b8',
    },
  };

  const colors = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#f43f5e'];
  const allVoices = [...bank.female, ...bank.male, ...bank.neutral].filter(v => v !== narratorVoice);

  characters.forEach((charName, idx) => {
    if (!charName || charName.toLowerCase() === 'narrator') return;

    let selectedVoice: string;
    let gender: 'male' | 'female' | 'neutral' = 'neutral';

    if (FEMALE_INDICATORS.test(charName)) {
      gender = 'female';
      selectedVoice = bank.female[idx % bank.female.length] || allVoices[idx % allVoices.length];
    } else if (MALE_INDICATORS.test(charName)) {
      gender = 'male';
      selectedVoice = bank.male[idx % bank.male.length] || allVoices[idx % allVoices.length];
    } else {
      selectedVoice = allVoices[idx % allVoices.length] || bank.neutral[0] || narratorVoice;
    }

    castMap[charName] = {
      characterName: charName,
      voice: selectedVoice,
      genderOrPitch: gender,
      color: colors[idx % colors.length],
    };
  });

  return castMap;
}

/**
 * Parses a story paragraph into narrative segments and character dialogue lines.
 * Uses regular expressions to extract quotes and attributed speakers.
 */
export function parseParagraphDialogue(
  paragraph: string,
  knownCharacters: string[] = [],
  provider: 'gemini' | 'openai' | 'pollinations' = 'gemini',
  defaultNarratorVoice?: string
): DialogueLine[] {
  if (!paragraph || paragraph.trim().length === 0) return [];

  const castMap = getVoiceCastMap(knownCharacters, provider, defaultNarratorVoice);
  const lines: DialogueLine[] = [];

  // Match double quotes, curved quotes, and single quotes with speech
  const quoteRegex = /(["'“”«»][^"'“”«»]+["'“”«»])/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let counter = 0;

  while ((match = quoteRegex.exec(paragraph)) !== null) {
    const quoteIndex = match.index;
    const quoteRaw = match[0];
    const quoteText = cleanQuote(quoteRaw);

    // Text between last match and this quote (pre-quote narrative prose)
    if (quoteIndex > lastIndex) {
      const prose = paragraph.substring(lastIndex, quoteIndex).trim();
      if (prose.length > 0) {
        // Check if prose ends with an introductory attribution (e.g. "Elena whispered:")
        const preSpeechMatch = prose.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:said|whispered|shouted|replied|exclaimed|asked|called|cried|murmured)[\s,:]*$/i);
        
        lines.push({
          id: `line_${counter++}`,
          speaker: 'Narrator',
          text: prose,
          isDialogue: false,
          voice: castMap.Narrator.voice,
        });

        if (preSpeechMatch && preSpeechMatch[1]) {
          const speaker = resolveSpeaker(preSpeechMatch[1], knownCharacters);
          lines.push({
            id: `line_${counter++}`,
            speaker,
            text: quoteText,
            isDialogue: true,
            voice: castMap[speaker]?.voice || castMap.Narrator.voice,
          });
          lastIndex = quoteIndex + quoteRaw.length;
          continue;
        }
      }
    }

    // Determine speaker from post-quote attribution (e.g. '"...", said Marcus.')
    const postQuoteSlice = paragraph.substring(quoteIndex + quoteRaw.length, quoteIndex + quoteRaw.length + 80);
    const postSpeechMatch = postQuoteSlice.match(/^[\s,]*(?:said|whispered|shouted|replied|exclaimed|asked|called|cried|murmured|gasped|growled)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i)
      || postQuoteSlice.match(/^[\s,]*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:said|whispered|shouted|replied|exclaimed|asked|called|cried|murmured|gasped|growled)/i);

    let speaker = 'Narrator';
    if (postSpeechMatch && postSpeechMatch[1]) {
      speaker = resolveSpeaker(postSpeechMatch[1], knownCharacters);
    } else {
      // Look back for nearest character in known characters
      const preContext = paragraph.substring(Math.max(0, quoteIndex - 60), quoteIndex);
      const foundChar = knownCharacters.find(c => preContext.includes(c));
      if (foundChar) {
        speaker = foundChar;
      }
    }

    lines.push({
      id: `line_${counter++}`,
      speaker,
      text: quoteText,
      isDialogue: true,
      voice: castMap[speaker]?.voice || castMap.Narrator.voice,
    });

    lastIndex = quoteIndex + quoteRaw.length;
  }

  // Trailing narrative prose after the final quote
  if (lastIndex < paragraph.length) {
    const trailingProse = paragraph.substring(lastIndex).trim();
    if (trailingProse.length > 0) {
      lines.push({
        id: `line_${counter++}`,
        speaker: 'Narrator',
        text: trailingProse,
        isDialogue: false,
        voice: castMap.Narrator.voice,
      });
    }
  }

  // If no quotes were found, entire paragraph is single narrator line
  if (lines.length === 0) {
    lines.push({
      id: `line_0`,
      speaker: 'Narrator',
      text: paragraph.trim(),
      isDialogue: false,
      voice: castMap.Narrator.voice,
    });
  }

  return lines;
}
