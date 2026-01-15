import { brandInfo, brandMenu } from './brand';

const FALLBACK_URL = 'https://example.galleyops.com';

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
  name: brandInfo.name,
  shortName: brandInfo.shortName,
  tagline: brandInfo.tagline,
  title: `${brandInfo.name} | ${brandInfo.titleSuffix}`,
  description: brandInfo.description,
  keywords: brandInfo.keywords,
  handle: brandInfo.handle,
  locale: 'pt-BR',
  alternateLocales: ['en-US', 'es-ES'],
  siteUrl: normalizedSiteUrl,
  themeColor: '#1b120a',
  image: absoluteUrl(brandInfo.imagePath),
  ogImageAlt: brandInfo.ogImageAlt || `Marca do ${brandInfo.shortName}`,
  telephone: brandInfo.phone,
  priceRange: brandInfo.priceRange,
  cuisines: brandInfo.cuisines,
  address: brandInfo.address,
  geo: brandInfo.geo,
  sameAs: brandInfo.socialLinks,
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
    areaServed: [
      siteConfig.address.neighborhood,
      siteConfig.address.locality,
      siteConfig.address.region,
    ].filter(Boolean),
    menu: siteConfig.siteSections.menu,
    hasMenu: {
      '@type': 'Menu',
      '@id': menuId,
      name: `Cardápio do ${siteConfig.shortName}`,
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

  const hasGeo =
    typeof siteConfig.geo?.latitude === 'number' &&
    typeof siteConfig.geo?.longitude === 'number';

  if (hasGeo) {
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
  name: `Cardápio do ${siteConfig.shortName}`,
  inLanguage: 'pt-BR',
  description: brandMenu.metaDescription,
  url: siteConfig.siteSections.menu,
  mainEntityOfPage: siteConfig.siteSections.menu,
  isPartOf: {
    '@type': 'Restaurant',
    '@id': restaurantId,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  },
});
