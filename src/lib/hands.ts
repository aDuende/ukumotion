export type Landmark = { x: number; y: number; z: number }
export type HandResults = {
  multiHandLandmarks?: Landmark[][]
  multiHandedness?: Array<{ label: 'Left' | 'Right' }>
}
export type HandsInstance = {
  setOptions: (value: Record<string, number>) => void
  onResults: (callback: (value: HandResults) => void) => void
  send: (value: { image: HTMLVideoElement }) => Promise<void>
  close?: () => void
}

export const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15],
  [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17],
]

export function fingerCount(hand: Landmark[]) {
  if (hand.length < 21) return 0
  const extended = [[8, 6], [12, 10], [16, 14], [20, 18]].map(
    ([tip, joint]) => hand[tip].y < hand[joint].y - 0.025,
  )
  const [index, middle, ring, pinky] = extended
  const thumbTip = Math.hypot(hand[4].x - hand[0].x, hand[4].y - hand[0].y)
  const thumbJoint = Math.hypot(hand[3].x - hand[0].x, hand[3].y - hand[0].y)
  const thumb = thumbTip > thumbJoint + 0.035

  // Shaka / "hang loose" sign (thumb + pinky only) maps to 6
  if (thumb && pinky && !index && !middle && !ring) return 6

  return extended.filter(Boolean).length + (thumb ? 1 : 0)
}
