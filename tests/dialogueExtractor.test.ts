import { describe, it, expect } from 'vitest';
import { parseParagraphDialogue, getVoiceCastMap, PROVIDER_VOICE_BANKS } from '../services/dialogueExtractor';

describe('dialogueExtractor - Multi-Voice Character Dialogue Engine', () => {
  it('correctly parses narrative prose and attributed dialogue quotes', () => {
    const paragraph = 'The rain lashed against the tower. "We must find the gate before sunrise," whispered Elena. Marcus nodded grimly.';
    const lines = parseParagraphDialogue(paragraph, ['Elena', 'Marcus'], 'gemini');

    expect(lines.length).toBeGreaterThan(1);

    // First line should be narrative prose
    expect(lines[0].isDialogue).toBe(false);
    expect(lines[0].speaker).toBe('Narrator');
    expect(lines[0].text).toContain('The rain lashed');

    // Second line should be Elena's dialogue
    const elenaLine = lines.find(l => l.speaker === 'Elena');
    expect(elenaLine).toBeDefined();
    expect(elenaLine?.isDialogue).toBe(true);
    expect(elenaLine?.text).toBe('We must find the gate before sunrise,');
  });

  it('handles pre-quote speaker attributions (Name shouted: "...")', () => {
    const paragraph = 'Cassian shouted: "Take cover behind the stone wall!" The arrows whistled overhead.';
    const lines = parseParagraphDialogue(paragraph, ['Cassian'], 'gemini');

    const cassianLine = lines.find(l => l.speaker === 'Cassian');
    expect(cassianLine).toBeDefined();
    expect(cassianLine?.isDialogue).toBe(true);
    expect(cassianLine?.text).toBe('Take cover behind the stone wall!');
  });

  it('returns a single narrator line when no quotes are present', () => {
    const paragraph = 'The quiet forest stretched endlessly under the starry sky.';
    const lines = parseParagraphDialogue(paragraph, ['Elena'], 'gemini');

    expect(lines.length).toBe(1);
    expect(lines[0].isDialogue).toBe(false);
    expect(lines[0].speaker).toBe('Narrator');
    expect(lines[0].text).toBe(paragraph);
  });

  it('assigns consistent and distinct voices to characters in cast map', () => {
    const cast = getVoiceCastMap(['Elena', 'Marcus', 'Theresa'], 'gemini', 'Kore');

    expect(cast.Narrator.voice).toBe('Kore');
    expect(cast.Elena.voice).toBeDefined();
    expect(cast.Marcus.voice).toBeDefined();

    // Elena and Marcus should have different voices
    expect(cast.Elena.voice).not.toBe(cast.Marcus.voice);
  });

  it('handles empty or whitespace strings gracefully', () => {
    expect(parseParagraphDialogue('')).toEqual([]);
    expect(parseParagraphDialogue('   \n  ')).toEqual([]);
  });
});
