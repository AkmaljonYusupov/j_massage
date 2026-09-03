export interface GalleryImage {
  src: string;
  alt: string;
}

/**
 * Karusel rasmlari. Rasmlar "public/images/" papkasida turadi.
 * Yangi rasm qo'shish uchun shu ro'yxatga bitta qator qo'shsangiz kifoya -
 * karusel avtomatik moslashadi.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/gallery-1.jpg", alt: "J Massage School" },
  { src: "/images/gallery-2.jpg", alt: "J Massage School" },
  { src: "/images/gallery-3.jpg", alt: "J Massage School" },
  { src: "/images/gallery-4.jpg", alt: "J Massage School" },
  { src: "/images/gallery-5.jpg", alt: "J Massage School" },
  { src: "/images/gallery-6.jpg", alt: "J Massage School" },
];