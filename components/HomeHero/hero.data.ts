export interface TrustAvatar {
  id: string;
  src: string;
  alt: string;
}

// Replace with your own client photos.
export const TRUST_AVATARS: TrustAvatar[] = [
  {
    id: "client-1",
    src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop",
    alt: "Revoza client",
  },
  {
    id: "client-2",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    alt: "Revoza client",
  },
];

// Diqqat: "public/" papkasidagi lokal rasm uchun manzil albatta "/" bilan
// boshlanishi kerak (masalan "./images/..." emas, "/images/..." bo'lishi shart) —
// aks holda next/image "Failed to parse src" xatosini beradi.
export const HERO_IMAGE = "/images/hero-home.jpg";