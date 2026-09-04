export interface ApproachCard {
  id: "mission" | "vision" | "values";
  /** Ikonka rasmi - "public/abouticon/" papkasidan */
  icon: string;
  titleKey: string;
  textKey: string;
  noteKey: string;
}

export const APPROACH_CARDS: ApproachCard[] = [
  {
    id: "mission",
    icon: "/abouticon/mission.png",
    titleKey: "approach.missionTitle",
    textKey: "approach.missionText",
    noteKey: "approach.missionNote",
  },
  {
    id: "vision",
    icon: "/abouticon/vision.png",
    titleKey: "approach.visionTitle",
    textKey: "approach.visionText",
    noteKey: "approach.visionNote",
  },
  {
    id: "values",
    icon: "/abouticon/values.png",
    titleKey: "approach.valuesTitle",
    textKey: "approach.valuesText",
    noteKey: "approach.valuesNote",
  },
];