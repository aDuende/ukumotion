export type Instrument = 'ukulele' | 'guitar' | 'piano' | 'flute' | 'violin' | 'saxophone' | 'handpan' | 'drums'
export type Chord = 'C' | 'G' | 'Am' | 'F' | 'Dm' | 'Em' | 'Gm' | 'F7' | 'A7'

export const INSTRUMENTS: Record<Instrument, { label: string; name: string; letter: string; detail: string }> = {
  ukulele: { label: 'UKULELE', name: 'Ukulele', letter: 'U', detail: 'Bright four-string' },
  guitar: { label: 'GUITAR', name: 'Acoustic Guitar', letter: 'G', detail: 'Warm six-string' },
  piano: { label: 'PIANO', name: 'Piano', letter: 'P', detail: 'Soft keyboard' },
  flute: { label: 'FLUTE', name: 'Flute', letter: 'L', detail: 'Airy melodic voice' },
  violin: { label: 'VIOLIN', name: 'Violin', letter: 'V', detail: 'Warm bowed strings' },
  saxophone: { label: 'SAXOPHONE', name: 'Saxophone', letter: 'S', detail: 'Smooth reed tone' },
  handpan: { label: 'HANDPAN', name: 'Handpan', letter: 'H', detail: 'Resonant metallic pan' },
  drums: { label: 'DRUMS', name: 'Drum Kit', letter: 'D', detail: 'Acoustic percussion' },
}

// Drum piece triggered by each left-hand gesture (matches GESTURES order).
export const DRUM_MAP: Record<Chord, 'kick' | 'snare' | 'hihat' | 'tom-low' | 'crash'> = {
  C: 'kick', G: 'snare', Am: 'hihat', F: 'tom-low', Dm: 'crash',
  Em: 'kick', Gm: 'snare', F7: 'tom-low', A7: 'crash',
}

export const CHORDS: Chord[] = ['C', 'G', 'Am', 'F', 'Dm', 'Em', 'Gm', 'F7', 'A7']
export const GESTURES: Chord[] = ['C', 'G', 'Am', 'F', 'Dm', 'Em']
export const SCORE: Chord[] = ['C', 'G', 'Am', 'F', 'C', 'G', 'F', 'G']

const ROOTS: Record<Chord, number> = {
  C: 60, G: 55, Am: 57, F: 53, Dm: 50, Em: 52, Gm: 55, F7: 53, A7: 57,
}

// Fingerpicking patterns — each step is a note index (or [indices] for simultaneous).
// Guitar uses 6-note array from notesFor; ukulele uses 4-note array.
export type PickStep = number | number[]
export const PICK_PATTERNS: Record<string, { label: string; guitar: PickStep[]; ukulele: PickStep[] }> = {
  strum: { label: 'Down · Up Strum', guitar: [], ukulele: [] },
  p1: { label: 'P1 · Root 3-2-1', guitar: [0, 3, 4, 5], ukulele: [0, 1, 2, 3] },
  p2: { label: 'P2 · Root 3-2-1-3-2-3', guitar: [0, 3, 4, 5, 3, 4, 3], ukulele: [0, 1, 2, 3, 1, 2, 1] },
  p3: { label: 'P3 · Root 3-(2+1)-3', guitar: [0, 3, [4, 5], 3], ukulele: [0, 1, [2, 3], 1] },
  p4: { label: 'P4 · Walking Bass', guitar: [0, 3, 4, 0, 3, 4, 5], ukulele: [0, 1, 2, 0, 1, 2, 3] },
}

export function notesFor(chord: Chord, instrument: Instrument) {
  const intervals = chord.endsWith('7') ? [0, 4, 7, 10] : chord.endsWith('m') ? [0, 3, 7] : [0, 4, 7]
  // Sustained wind/bowed voices: play a clean triad within the sampled range (C4-A4),
  // avoiding the plucked octave jumps that pitch-shift the samples too far.
  if (instrument === 'flute' || instrument === 'saxophone' || instrument === 'violin') {
    const root = ROOTS[chord] < 60 ? ROOTS[chord] + 12 : ROOTS[chord]
    return intervals.map((interval) => root + interval)
  }
  const pattern = instrument === 'ukulele' ? [0, 1, 2, 0] : [0, 2, 0, 1, 2, 0]
  return pattern.map((tone, index) => {
    const octave = instrument === 'ukulele'
      ? 12 + (index === 3 ? 12 : 0)
      : -12 + (index > 1 ? 12 : 0) + (index > 4 ? 12 : 0)
    return ROOTS[chord] + intervals[tone] + octave
  })
}
