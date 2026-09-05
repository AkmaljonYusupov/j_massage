export type WhyIconId = "care" | "holistic";

export interface WhyFeature {
  id: WhyIconId;
  titleKey: string;
  textKey: string;
}

export const WHY_IMAGE = "/images/why-choose.jpg";

export const WHY_FEATURES: WhyFeature[] = [
  {
    id: "care",
    titleKey: "whyChoose.careTitle",
    textKey: "whyChoose.careText",
  },
  {
    id: "holistic",
    titleKey: "whyChoose.holisticTitle",
    textKey: "whyChoose.holisticText",
  },
];