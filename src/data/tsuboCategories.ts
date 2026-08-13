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

// 検索でヒットする言葉を広げるための同義語・言い換え辞書。
// カテゴリーのラベル("肩こり"など)だけでなく、日常的な言い回しでも
// ツボが見つかるように、検索インデックス(buildSearchIndex)に含めて使う。
export const SYMPTOM_SYNONYMS: Record<string, string[]> = {
  "stiff-shoulder": ["肩の張り", "肩が重い", "肩がこる", "肩甲骨のはり", "スマホ首", "巻き肩"],
  headache: ["頭が痛い", "偏頭痛", "片頭痛", "頭が重い", "こめかみが痛い", "頭がすっきりしない"],
  "eye-fatigue": ["目の疲れ", "目が疲れる", "目がしょぼしょぼ", "ドライアイ", "スマホ疲れ", "眼の疲れ"],
  "cold-sensitivity": ["冷え", "手足の冷え", "足先が冷たい", "体が冷える", "末端冷え性"],
  swelling: ["むくむ", "足のむくみ", "顔のむくみ", "腫れぼったい", "足がパンパン"],
  "lower-back-pain": ["腰が痛い", "ぎっくり腰", "腰のだるさ", "腰が重い"],
  insomnia: ["眠れない", "寝つきが悪い", "自律神経の乱れ", "夜中に目が覚める", "睡眠の質"],
  "stomach-trouble": ["胃もたれ", "お腹の張り", "食欲不振", "胃の不快感", "消化不良"],
  stress: ["イライラ", "緊張", "気分が落ち着かない", "ストレス解消", "リラックスしたい"],
  menstrual: ["生理痛", "PMS", "月経痛", "生理前のイライラ", "生理不順"],
};

export const BODY_PART_SYNONYMS: Record<string, string[]> = {
  "head-face": ["頭", "顔", "こめかみ", "おでこ", "頬"],
  "neck-shoulder": ["首", "肩", "うなじ", "肩甲骨"],
  "arm-hand": ["腕", "手", "手首", "ひじ", "指"],
  "back-waist": ["背中", "腰", "背骨"],
  abdomen: ["お腹", "胃", "腸", "おへそ"],
  "leg-knee": ["脚", "膝", "太もも", "すね"],
  "ankle-foot": ["足首", "足の裏", "かかと", "土踏まず", "足"],
};
