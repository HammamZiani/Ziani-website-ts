export const Images = {
  Booking_Left: "/bath4.jpeg",
  Hero_Right: "/gallery/img11.jpeg",
  Hero_Bg: "/hero-bg.jpg",
  Speciality: "/speciality.jpg",
  Salon: "/salon1.jpeg",
} as const;

export const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/gallery/img${i + 1}.jpeg`,
}));

export const servicesData = [
  {
    id: 1,
    image: "/gommage.jpeg",
    name: { fr: "Gommage", en: "Scrubbing" },
    description: {
      fr: "Un rituel purifiant qui révèle la beauté naturelle de votre peau.",
      en: "A purifying ritual that reveals the natural beauty of your skin.",
    },
  },
  {
    id: 2,
    image: "/savonnage.png",
    name: { fr: "Savonnage parfumé", en: "Soaping" },
    description: {
      fr: "Un bain de fraîcheur aromatique, pour une peau douce et délicatement parfumée.",
      en: "An aromatic bath of freshness, for soft and delicately fragranced skin.",
    },
  },
  {
    id: 3,
    image: "/massage.jpeg",
    name: {
      fr: "Massage Relaxant aux Huiles Essentielles",
      en: "Relaxing Massage with Essential Oils",
    },
    description: {
      fr: "Une évasion sensorielle pour apaiser le corps et l'esprit.",
      en: "A sensory escape to soothe the body and mind.",
    },
  },
  {
    id: 4,
    image: "/algue.jpg",
    name: {
      fr: "Enveloppement aux Algues - Spécial Dos",
      en: "Seaweed Therapy - special back",
    },
    description: {
      fr: "Un rituel revitalisant qui apaise les douleurs du dos et stimule la circulation sanguine. Les bienfaits des algues marines nourrissent votre peau en profondeur, offrant une sensation apaisante et décontractante.",
      en: "A revitalizing ritual that soothes back pain and stimulates blood circulation. The benefits of marine algae deeply nourish your skin, providing a soothing and relaxing sensation.",
    },
  },
  {
    id: 5,
    image: "/chocolate.jpeg",
    name: { fr: "Enveloppement au chocolat", en: "Chocolate body wrap" },
    description: {
      fr: "Un traitement indulgent qui allie plaisir gourmand et bienfaits hydratants, pour une peau irrésistiblement douce.",
      en: "An indulgent treatment that combines gourmet pleasure with moisturizing benefits, for irresistibly soft skin.",
    },
  },
  {
    id: 6,
    image: "/masqueCorp.jpeg",
    name: { fr: "Masques corporels", en: "Body Masks" },
    description: {
      fr: "Choisissez parmi notre large gamme de masques, comprenant des options exquises telles que café à l'orange, oud, fleur d'oranger, et bien plus encore. Chacun de nos masques est soigneusement élaboré pour revitaliser votre peau, la laissant nourrie, éclatante et délicatement parfumée.",
      en: "Choose from our wide range of masks, including exquisite options such as orange coffee, oud, orange blossom, and many more. Each of our body masks is carefully crafted to revitalize your skin, leaving it nourished, radiant, and delicately fragranced.",
    },
  },
] as any;

export const formulesData = [
  {
    id: 2,
    color: "#15803d",
    name: { fr: "Package Algues", en: "Algae Package" },
    descriptions: {
      fr: [
        "Entrée + Gommage",
        "Savonnage",
        "30 minutes de massage relaxant",
        "Algothérapie + Spécial dos",
        "Sortie de bain",
        "Nécessaire de toilette",
      ],
      en: [
        "Entry + Exfoliation",
        "Soaping",
        "30 minutes relaxing massage",
        "Algae therapy + Special back",
        "Bath exit",
        "Toiletries",
      ],
    },
    price: 350,
  },
  {
    id: 3,
    color: "#ca8a04",
    name: { fr: "Package Premium", en: "Premium Package" },
    descriptions: {
      fr: [
        "Entrée + Gommage",
        "Savonnage",
        "Une heure de massage",
        "Enveloppement aux algues ou au chocolat",
        "Masque éclat visage",
        "Masque corporel hydratant",
        "Sortie de bain + Nécessaire de toilette",
      ],
      en: [
        "Entry + Exfoliation",
        "Soaping",
        "One hour massage",
        "Algae or chocolate wrap",
        "Glowing face mask",
        "Hydrating body mask",
        "Bath exit + Toiletries",
      ],
    },
    price: 500,
    isPopular: true,
  },
  {
    id: 1,
    color: "#92400e",
    name: { fr: "Package Chocolat", en: "Chocolate Package" },
    descriptions: {
      fr: [
        "Entrée + Gommage",
        "Savonnage",
        "30 minutes de massage relaxant",
        "Enveloppement au chocolat",
        "Sortie de bain",
        "Nécessaire de toilette",
      ],
      en: [
        "Entry + Exfoliation",
        "Soaping",
        "30 minutes relaxing massage",
        "Chocolate wrap",
        "Bath exit",
        "Toiletries",
      ],
    },
    price: 400,
  },
] as any;

export const bathsData = [
  {
    img: "/bath1.jpeg",
    titleKey: "Baths.salam",
    descKey: "Baths.salamDesc",
    num: "01",
  },
  {
    img: "/bath2.jpeg",
    titleKey: "Baths.istanbul",
    descKey: "Baths.istanbulDesc",
    num: "02",
  },
  {
    img: "/bath3.jpeg",
    titleKey: "Baths.orient",
    descKey: "Baths.orientDesc",
    num: "03",
  },
  {
    img: "/bath4.jpeg",
    titleKey: "Baths.individuel",
    descKey: "Baths.individuelDesc",
    num: "04",
  },
] as any;
