export const ABOUT_IMAGE_LARGE = "/images/about-1.jpg";
export const ABOUT_IMAGE_CARD = "/images/about-3.jpg";
export const ABOUT_IMAGE_SMALL = "/images/about-2.jpg";

export const ABOUT_PHONE_DISPLAY = "+998 97 715 51 82";
export const ABOUT_PHONE_HREF = "tel:+998977155182";

export interface AboutStat {
  value: string;
  key: string;
}

export const ABOUT_STATS: AboutStat[] = [
  { value: "500+", key: "aboutIntro.statGraduates" },
  { value: "12+", key: "aboutIntro.statCourses" },
];