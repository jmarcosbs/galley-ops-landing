const FALLBACK_URL = 'https://restaurantemarinheiros.com.br';

const normalizeUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.origin + parsed.pathname.replace(/\/$/, '');
  } catch {
    return FALLBACK_URL;
  }
};

const rawSiteUrl = import.meta.env.PUBLIC_SITE_URL ?? FALLBACK_URL;
const normalizedSiteUrl = normalizeUrl(rawSiteUrl);

export const absoluteUrl = (path = '/') => {
  try {
    return new URL(path, `${normalizedSiteUrl}/`).toString().replace(/\/$/, path === '/' ? '/' : '');
  } catch {
    return normalizedSiteUrl;
  }
};

const restaurantId = `${normalizedSiteUrl}#restaurant`;
const menuId = `${normalizedSiteUrl}/menu#menu`;

export const siteConfig = {
  name: "Restaurante Marinheiro's",
  shortName: "Marinheiro's",
  tagline: 'Família no tempero. Amor no prato.',
  title: "Restaurante Marinheiro's | Gastronomia autoral na Praia Brava",
  description:
    "Restaurante familiar na Praia Brava em Florianópolis com pratos autorais, frutos do mar frescos e atendimento acolhedor. Confira o cardápio digital e venha nos visitar.",
  keywords: [
    'Restaurante Marinheiro',
    'restaurante Praia Brava',
    'frutos do mar Florianópolis',
    'restaurante familiar Florianópolis',
    'cardápio digital restaurante',
  ],
  handle: '@restaurantemarinheiros',
  locale: 'pt-BR',
  alternateLocales: ['en-US', 'es-ES'],
  siteUrl: normalizedSiteUrl,
  themeColor: '#1b120a',
  image: absoluteUrl('/logo.png'),
  ogImageAlt: "Marca do Restaurante Marinheiro's",
  telephone: '+55 48 3269-7295',
  priceRange: '$$',
  cuisines: ['Culinária brasileira', 'Frutos do mar', 'Pratos autorais'],
  address: {
    street: 'Avenida Epitácio Bittencourt, 640',
    neighborhood: 'Praia Brava',
    locality: 'Florianópolis',
    region: 'SC',
    postalCode: '88056-780',
    country: 'BR',
  },
  geo: {
    latitude: -27.3987629,
    longitude: -48.4191731,
  },
  sameAs: ['https://www.instagram.com/restaurantemarinheiros'],
  siteSections: {
    home: normalizedSiteUrl,
    menu: absoluteUrl('/menu'),
  },
};

export const buildRestaurantSchema = () => {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': restaurantId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    image: siteConfig.image,
    priceRange: siteConfig.priceRange,
    telephone: siteConfig.telephone,
    servesCuisine: siteConfig.cuisines,
    sameAs: siteConfig.sameAs,
    areaServed: ['Praia Brava', 'Florianópolis'],
    menu: siteConfig.siteSections.menu,
    hasMenu: {
      '@type': 'Menu',
      '@id': menuId,
      name: "Cardápio do Restaurante Marinheiro's",
      url: siteConfig.siteSections.menu,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
  };

  if (siteConfig.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    };
  }

  return schema;
};

export const buildMenuSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  '@id': menuId,
  name: "Cardápio do Restaurante Marinheiro's",
  inLanguage: 'pt-BR',
  description:
    'Selecione categorias e descubra pratos autorais, frutos do mar e opções vegetarianas preparados pela equipe Marinheiro’s.',
  url: siteConfig.siteSections.menu,
  mainEntityOfPage: siteConfig.siteSections.menu,
  isPartOf: {
    '@type': 'Restaurant',
    '@id': restaurantId,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
});
