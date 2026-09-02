# Revoza — Navbar + HomeHero (Next.js + shadcn/ui)

Screenshotdagi spa saytining Navbar va Hero qismini 1:1 takrorlaydigan Next.js 14 (App Router) loyihasi. UZ/RU tillari, shadcn/ui, Tailwind CSS va Framer Motion animatsiyalari bilan.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:3000` ni oching.

## Fayl strukturasi

```
app/
  layout.tsx          → Root layout, font va LanguageProvider shu yerda ulanadi
  page.tsx             → Bosh sahifa: Navbar + HomeHero ni chaqiradi
  globals.css          → Tailwind + shadcn CSS o'zgaruvchilari

components/
  Navbar/
    Navbar.tsx          → Desktop navbar (pill shakl, scroll holatida qorayadi, dropdown menyu)
    MobileNav.tsx        → Offcanvas (Sheet) — mobil hamburger menyu
    navbar.data.ts       → Menyu punktlari konfiguratsiyasi

  HomeHero/
    HomeHero.tsx          → Hero bo'limi: fon rasm, sarlavha, CTA, feature qatorlar
    HeroStats.tsx          → Mijozlar avatarlari + reyting bloki
    hero.data.ts            → Avatar va fon rasm manzillari

  LanguageSwitcher/
    LanguageSwitcher.tsx  → UZ/RU almashtirgich tugmasi

  ui/
    button.tsx, sheet.tsx, avatar.tsx  → shadcn/ui bazaviy komponentlari

lib/
  utils.ts                → cn() klass birlashtiruvchi
  i18n/
    LanguageContext.tsx    → Til holati uchun React Context + localStorage
    translations/
      uz.json, ru.json     → Barcha matnlar shu yerda

types/
  index.ts                 → Umumiy TypeScript tiplar
```

## Muhim jihatlar

- **Responsivlik**: `lg:` breakpointgacha desktop menyu ko'rinadi, undan pastda hamburger tugma orqali **offcanvas** (shadcn `Sheet`, o'ngdan slайд qiladi) ochiladi.
- **Animatsiya**: Navbar yuklanganda yuqoridan tushib keladi (Framer Motion). Hero matnlari stagger (ketma-ket) tarzda pastdan yuqoriga chiqadi. Dropdown menyu va offcanvas o'z animatsiyasiga ega.
- **UZ/RU**: Har ikkala tilga oid barcha matnlar `lib/i18n/translations/*.json` faylida. Yangi til qo'shish uchun `types/index.ts` dagi `Locale` tipiga kodini qo'shing va yangi JSON fayl yarating.
- **Rasm**: `components/HomeHero/hero.data.ts` dagi `HERO_IMAGE` — Unsplash'dan olingan namuna rasm. O'zingizning litsenziyalangan/haqiqiy foto bilan almashtiring (`public/images/` papkasiga qo'yib, yo'lni shu yerda o'zgartirsangiz bo'ladi).
- **Ranglar**: `tailwind.config.ts` ichidagi `revoza` palette (`ink`, `sage`, `cream`) — logotip/tugmalar shu ranglardan foydalanadi, markazlashgan joyda o'zgartirish uchun shu yerga qarang.

## Keyingi qadamlar

- Qolgan sahifalarni (`About`, `Services`, `Blog`, `Contact`) xuddi shu naqshda (har biri o'z papkasida) qo'shish.
- `next/font` orqali ulangan Manrope shriftini xohlasangiz boshqa shrift bilan almashtirish mumkin.
