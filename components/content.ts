const maps = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const locations = [
  {
    name: "ONNI House Jakarta", area: "Tanjung Duren, Jakarta Barat",
    address: "Jl. Tanjung Duren Utara V No. 242, Jakarta Barat 11470",
    hours: "Every day · 10.00–22.00 WIB", phone: "021-2295-6116", tel: "+622122956116",
    maps: maps("ONNI House Jakarta, Jl. Tanjung Duren Utara V No. 242"), menu: "https://jakartamenu.onni.co.id/",
    instagram: "https://www.instagram.com/onnihouse.jkt/",
  },
  {
    name: "ONNI House Surabaya", area: "Darmo, Surabaya",
    address: "Jl. Opak No. 56, Wonokromo, Surabaya 60261",
    hours: "Every day · 10.00–22.00 WIB", phone: "031-5689-812", tel: "+62315689812",
    maps: maps("ONNI House Surabaya, Jl. Opak No. 56, Surabaya"), menu: "https://surabayamenu.onni.co.id/",
    instagram: "https://www.instagram.com/onnihouse.sby/",
  },
  {
    name: "ONNI Garden House", area: "Lebak Bulus, Jakarta Selatan",
    address: "Jl. Lebak Bulus I No. 9, Cilandak, Jakarta Selatan 12440",
    hours: "Every day · 10.00–22.00 WIB", phone: "0812-1222-2419", tel: "+6281212222419",
    maps: maps("ONNI Garden House, Jl. Lebak Bulus I No. 9, Jakarta"), menu: "https://onnigardenhousemenu.onni.co.id/",
    instagram: "https://www.instagram.com/onnigardenhouse/",
    whatsapp: "https://wa.me/6281212222419",
  },
];

export const menu = [
  { label: "To share", title: "Loaded Bolognese Fries", description: "French fries, bolognese and mozzarella.", price: "Rp55.000", image: "fries", alt: "Illustration of fries topped with bolognese and mozzarella" },
  { label: "From the kitchen", title: "Beef Rice Bulgogi", description: "A dish from our opening menu, with Japanese fried rice and a soft-poached egg.", image: "rice", alt: "Illustration of bulgogi and a soft-poached egg over rice" },
  { label: "Coffee & cake", title: "An afternoon pause", description: "Take the window seat and stay a little longer over coffee and cake.", image: "coffee", alt: "Illustration of coffee and a slice of cake by a window" },
];

export const scenes = [
  { image: "interior", title: "Around the table", alt: "Illustrative dining room with cane chairs and flowers" },
  { image: "florist", title: "At the flower studio", alt: "Illustrative arrangement of roses and cosmos on a worktable" },
  { image: "coffee", title: "By the window", alt: "Illustrative window table with coffee, cake and flowers" },
];
