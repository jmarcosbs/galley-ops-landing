type SupportedLocale = 'pt-BR' | 'en-US' | 'es-ES';

const env = (import.meta.env ?? {}) as Record<string, string | undefined>;

const getEnv = (key: string, fallback = ''): string => {
  const value = env[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback;
};

const splitList = (value: string | undefined, fallback: string[]) => {
  if (!value) return fallback;
  const items = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : fallback;
};

const parseNumber = (value: string | undefined, fallback?: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const fallbackAddress = {
  street: 'Rua Exemplo, 123',
  neighborhood: 'Centro',
  locality: 'Sua Cidade',
  region: 'SC',
  postalCode: '00000-000',
  country: 'BR',
};

export const brandInfo = {
  name: getEnv('PUBLIC_BRAND_NAME', 'Seu Restaurante'),
  shortName: getEnv('PUBLIC_BRAND_SHORT_NAME', 'Seu Restaurante'),
  tagline: getEnv('PUBLIC_BRAND_TAGLINE', 'Personalize o slogan da casa'),
  titleSuffix: getEnv(
    'PUBLIC_BRAND_TITLE_SUFFIX',
    'Gastronomia autoral em qualquer lugar',
  ),
  description: getEnv(
    'PUBLIC_BRAND_DESCRIPTION',
    'Restaurante autoral com menu digital, operação enxuta e atendimento acolhedor. Edite este texto para contar a história da sua casa.',
  ),
  keywords: splitList(getEnv('PUBLIC_BRAND_KEYWORDS'), [
    'restaurante autoral',
    'cardápio digital restaurante',
    'operações gastronômicas',
  ]),
  handle: getEnv('PUBLIC_BRAND_SOCIAL_HANDLE', '@seurestaurante'),
  socialLinks: splitList(getEnv('PUBLIC_BRAND_SOCIAL_LINKS'), [
    'https://www.instagram.com/seurestaurante',
  ]),
  phone: getEnv('PUBLIC_BRAND_PHONE', '(00) 0000-0000'),
  priceRange: getEnv('PUBLIC_BRAND_PRICE_RANGE', '$$'),
  cuisines: splitList(getEnv('PUBLIC_BRAND_CUISINES'), [
    'Culinária brasileira',
    'Pratos autorais',
  ]),
  imagePath: getEnv('PUBLIC_BRAND_LOGO_PATH', '/logo.png'),
  ogImagePath: getEnv('PUBLIC_BRAND_OG_IMAGE_PATH', '/logo.png'),
  ogImageAlt: getEnv('PUBLIC_BRAND_OG_IMAGE_ALT', 'Marca do restaurante'),
  address: {
    street: getEnv('PUBLIC_BRAND_ADDRESS_STREET', fallbackAddress.street),
    neighborhood: getEnv(
      'PUBLIC_BRAND_ADDRESS_NEIGHBORHOOD',
      fallbackAddress.neighborhood,
    ),
    locality: getEnv('PUBLIC_BRAND_ADDRESS_CITY', fallbackAddress.locality),
    region: getEnv('PUBLIC_BRAND_ADDRESS_STATE', fallbackAddress.region),
    postalCode: getEnv(
      'PUBLIC_BRAND_ADDRESS_POSTAL_CODE',
      fallbackAddress.postalCode,
    ),
    country: getEnv('PUBLIC_BRAND_ADDRESS_COUNTRY', fallbackAddress.country),
  },
  geo: {
    latitude: parseNumber(getEnv('PUBLIC_BRAND_GEO_LAT')),
    longitude: parseNumber(getEnv('PUBLIC_BRAND_GEO_LONG')),
  },
};

export const brandMenu = {
  metaDescription: getEnv(
    'PUBLIC_MENU_META_DESCRIPTION',
    `Navegue pelo menu atualizado do ${brandInfo.shortName} com pratos autorais, bebidas e opções para compartilhar.`,
  ),
  keywords: splitList(getEnv('PUBLIC_MENU_META_KEYWORDS'), [
    'cardapio digital',
    'menu restaurante autoral',
    'frutos do mar',
  ]),
  heroEyebrow: getEnv('PUBLIC_MENU_EYEBROW', 'Cardápio'),
  heroTitle: getEnv('PUBLIC_MENU_HERO_TITLE', brandInfo.shortName),
  backLabel: getEnv('PUBLIC_MENU_BACK_LABEL', 'Voltar'),
  navLabel: getEnv('PUBLIC_MENU_NAV_LABEL', 'Categorias do cardápio'),
};

const buildAddress = (locale: SupportedLocale) => {
  const { street, neighborhood, locality, region, postalCode, country } =
    brandInfo.address;

  if (locale === 'en-US') {
    return `${street}, ${locality} - ${region} · ${country}`;
  }

  const neighborhoodPart = neighborhood ? `${neighborhood} - ` : '';
  return `${street}. ${neighborhoodPart}${locality} - ${region} - ${country}`;
};

export const formatAddress = (locale: SupportedLocale) => buildAddress(locale);

export type { SupportedLocale };
