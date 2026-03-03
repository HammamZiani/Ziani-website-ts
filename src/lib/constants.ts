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
    name: { fr: "Gommage", en: "Exfoliation" },
    description: {
      fr: "Un rituel purifiant qui révèle la beauté naturelle de votre peau.",
      en: "A purifying ritual that reveals the natural beauty of your skin.",
    },
  },
  {
    id: 2,
    image: "/savonnage.png",
    name: { fr: "Savonnage parfumé", en: "Scented Soap" },
    description: {
      fr: "Un bain de fraîcheur aromatique, pour une peau douce et delicately parfumée.",
      en: "An aromatic freshness bath, for soft and delicately scented skin.",
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
      en: "A sensory escape to soothe body and mind.",
    },
  },
  {
    id: 4,
    image: "/algue.jpg",
    name: {
      fr: "Enveloppement aux Algues - Spécial Dos",
      en: "Algae Wrap - Special Back",
    },
    description: {
      fr: "Un rituel revitalisant qui apaise les douleurs du dos et stimule la circulation sanguine.",
      en: "A revitalizing ritual that soothes back pain and stimulates blood circulation.",
    },
  },
  {
    id: 5,
    image: "/chocolate.jpeg",
    name: { fr: "Enveloppement au chocolat", en: "Chocolate Wrap" },
    description: {
      fr: "Un traitement indulgent qui allie plaisir gourmand et bienfaits hydratants.",
      en: "An indulgent treatment that combines sweet pleasure with hydrating benefits.",
    },
  },
  {
    id: 6,
    image: "/masqueCorp.jpeg",
    name: { fr: "Masques corporels", en: "Body Masks" },
    description: {
      fr: "Choisissez parmi notre large gamme de masques: café à l'orange, oud, fleur d'oranger, et bien plus encore.",
      en: "Choose from our wide range of masks: orange coffee, oud, orange blossom, and more.",
    },
  },
] as any;

export const formulesData = [
  {
    id: 2,
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
