// data/navigation.ts
export type NavItem = {
  title: string;
  description: string;
  href: string;
};

export type NavCategory = {
  trigger: string;
  items: NavItem[];
};

export const navigationData: NavCategory[] = [
  {
    trigger: "Erkek",
    items: [
      {
        title: "Ayakkabı",
        description: "Spor, günlük ve klasik erkek ayakkabıları",
        href: "/erkek/ayakkabi",
      },
      {
        title: "Spor",
        description: "Koşu, antrenman ve outdoor ürünleri",
        href: "/erkek/spor",
      },
      {
        title: "Klasik",
        description: "Ofis ve özel günler için şık modeller",
        href: "/erkek/klasik",
      },
      {
        title: "Yeni Gelenler",
        description: "En yeni sezon ürünleri",
        href: "/erkek/yeni-gelenler",
      },
    ],
  },
  {
    trigger: "Kadın",
    items: [
      {
        title: "Ayakkabı",
        description: "Günlük, topuklu ve spor modeller",
        href: "/kadin/ayakkabi",
      },
      {
        title: "Spor",
        description: "Aktif yaşam için rahat tasarımlar",
        href: "/kadin/spor",
      },
      {
        title: "Özel Gün",
        description: "Davet ve şık kombinler için",
        href: "/kadin/ozel-gun",
      },
      {
        title: "Yeni Gelenler",
        description: "Sezonun en trend ürünleri",
        href: "/kadin/yeni-gelenler",
      },
    ],
  },
  {
    trigger: "Çocuk",
    items: [
      {
        title: "Ayakkabı",
        description: "Kız ve erkek çocuklar için rahat modeller",
        href: "/cocuk/ayakkabi",
      },
      {
        title: "Spor",
        description: "Oyun ve aktiviteler için spor ürünleri",
        href: "/cocuk/spor",
      },
      {
        title: "Okul",
        description: "Okul için uygun ve dayanıklı ürünler",
        href: "/cocuk/okul",
      },
      {
        title: "Yeni Gelenler",
        description: "Çocuklar için yeni sezon ürünleri",
        href: "/cocuk/yeni-gelenler",
      },
    ],
  },
];
