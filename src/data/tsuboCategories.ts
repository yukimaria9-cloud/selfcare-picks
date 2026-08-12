export type BodyPart = { id: string; label: string };
export type Symptom = { id: string; label: string };

// ツボ検索の「部位から探す」カテゴリー（計7）
export const bodyParts: BodyPart[] = [
  { id: "head-face", label: "頭・顔" },
  { id: "neck-shoulder", label: "首・肩" },
  { id: "arm-hand", label: "腕・手" },
  { id: "back-waist", label: "背中・腰" },
  { id: "abdomen", label: "お腹" },
  { id: "leg-knee", label: "脚・膝" },
  { id: "ankle-foot", label: "足首・足裏" },
];

// ツボ検索の「症状から探す」カテゴリー（計10）
export const symptoms: Symptom[] = [
  { id: "stiff-shoulder", label: "肩こり" },
  { id: "headache", label: "頭痛" },
  { id: "eye-fatigue", label: "眼精疲労" },
  { id: "cold-sensitivity", label: "冷え性" },
  { id: "swelling", label: "むくみ" },
  { id: "lower-back-pain", label: "腰痛" },
  { id: "insomnia", label: "不眠・自律神経" },
  { id: "stomach-trouble", label: "胃腸の不調" },
  { id: "stress", label: "ストレス" },
  { id: "menstrual", label: "生理痛・PMS" },
];

export function findBodyPart(id: string) {
  return bodyParts.find((b) => b.id === id);
}

export function findSymptom(id: string) {
  return symptoms.find((s) => s.id === id);
}
