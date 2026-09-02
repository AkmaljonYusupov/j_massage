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

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop";
