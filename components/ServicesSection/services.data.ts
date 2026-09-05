export type ServiceIconId =
  | "massage"
  | "children"
  | "hijama"
  | "face"
  | "fire";

export interface ServiceItem {
  id: string;
  image: string;
  icon: ServiceIconId;
  titleKey: string;
  textKey: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "adults",
    image: "/images/service-adults.jpg",
    icon: "massage",
    titleKey: "services.massageTitle",
    textKey: "services.massageText",
  },
  {
    id: "children",
    image: "/images/service-children.jpg",
    icon: "children",
    titleKey: "services.childrenTitle",
    textKey: "services.childrenText",
  },
  {
    id: "hijama",
    image: "/images/service-hijama.jpg",
    icon: "hijama",
    titleKey: "services.hijamaTitle",
    textKey: "services.hijamaText",
  },
  {
    id: "face",
    image: "/images/service-face.jpg",
    icon: "face",
    titleKey: "services.faceTitle",
    textKey: "services.faceText",
  },
  {
    id: "fire",
    image: "/images/service-fire.jpg",
    icon: "fire",
    titleKey: "services.fireTitle",
    textKey: "services.fireText",
  },
];