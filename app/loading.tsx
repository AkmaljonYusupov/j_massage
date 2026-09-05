import Image from "next/image";

/**
 * Sahifalar orasida o'tganda ko'rinadigan yengil yuklanish holati.
 * (app/loading.tsx - Next.js buni avtomatik ishlatadi)
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-revoza-ink">
      <div className="flex flex-col items-center">
        <Image
          src="/logo-white.png"
          alt="J Massage School"
          width={1756}
          height={652}
          priority
          quality={100}
          unoptimized
          className="h-12 w-auto animate-pulse sm:h-14"
        />

        <div className="relative mt-7 h-[3px] w-32 overflow-hidden rounded-full bg-white/15">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[loaderSlide_1.4s_ease-in-out_infinite] rounded-full bg-revoza-sage" />
        </div>
      </div>
    </div>
  );
}