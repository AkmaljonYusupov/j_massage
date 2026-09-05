export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const FAQ_IMAGE = "/images/faq.jpg";

export const FAQ_ITEMS: FaqItem[] = [
  { id: "q1", questionKey: "faq.q1", answerKey: "faq.a1" },
  { id: "q2", questionKey: "faq.q2", answerKey: "faq.a2" },
  { id: "q3", questionKey: "faq.q3", answerKey: "faq.a3" },
  { id: "q4", questionKey: "faq.q4", answerKey: "faq.a4" },
  { id: "q5", questionKey: "faq.q5", answerKey: "faq.a5" },
];