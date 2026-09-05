export type FactIconId = "graduates" | "teachers" | "courses";

export interface KeyFact {
  id: FactIconId;
  /** Sanoq animatsiyasi shu songacha boradi */
  value: number;
  /** Raqamdan keyin qo'shiladi: "+", "k+" va h.k. */
  suffix: string;
  labelKey: string;
  textKey: string;
}

export const KEY_FACTS: KeyFact[] = [
  {
    id: "graduates",
    value: 500,
    suffix: "+",
    labelKey: "keyFacts.graduatesLabel",
    textKey: "keyFacts.graduatesText",
  },
  {
    id: "teachers",
    value: 12,
    suffix: "+",
    labelKey: "keyFacts.teachersLabel",
    textKey: "keyFacts.teachersText",
  },
  {
    id: "courses",
    value: 15,
    suffix: "+",
    labelKey: "keyFacts.coursesLabel",
    textKey: "keyFacts.coursesText",
  },
];