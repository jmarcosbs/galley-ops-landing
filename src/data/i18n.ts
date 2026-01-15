import { brandInfo, brandMenu, formatAddress, type SupportedLocale } from './brand';

const env = (import.meta.env ?? {}) as Record<string, string | undefined>;

const getEnv = (key: string, fallback: string) => {
  const value = env[key];
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : fallback;
};

const buildMenuStrings = (locale: SupportedLocale) => {
  switch (locale) {
    case 'en-US':
      return {
        eyebrow: getEnv(
          'PUBLIC_EN_US_MENU_EYEBROW',
          brandMenu.heroEyebrow || 'Menu',
        ),
        back: getEnv('PUBLIC_EN_US_MENU_BACK', 'Back'),
        navLabel: getEnv(
          'PUBLIC_EN_US_MENU_NAV_LABEL',
          brandMenu.navLabel || 'Menu categories',
        ),
      };
    case 'es-ES':
      return {
        eyebrow: getEnv(
          'PUBLIC_ES_ES_MENU_EYEBROW',
          brandMenu.heroEyebrow || 'Menú',
        ),
        back: getEnv('PUBLIC_ES_ES_MENU_BACK', 'Volver'),
        navLabel: getEnv(
          'PUBLIC_ES_ES_MENU_NAV_LABEL',
          brandMenu.navLabel || 'Categorías del menú',
        ),
      };
    default:
      return {
        eyebrow: brandMenu.heroEyebrow || 'Cardápio',
        back: brandMenu.backLabel || 'Voltar',
        navLabel: brandMenu.navLabel || 'Categorias do cardápio',
      };
  }
};

export const languages = {
  'pt-BR': {
    brandLine1: getEnv('PUBLIC_PT_BR_BRAND_LINE1', 'Restaurante'),
    brandLine2: getEnv('PUBLIC_PT_BR_BRAND_LINE2', brandInfo.shortName),
    eyebrow: getEnv('PUBLIC_PT_BR_EYEBROW', brandInfo.tagline),
    buttonLabel: getEnv('PUBLIC_PT_BR_CTA', 'Acessar menu'),
    buttonAria: getEnv('PUBLIC_PT_BR_CTA_ARIA', 'Ir para o menu principal'),
    languageLabel: getEnv('PUBLIC_PT_BR_LANGUAGE_LABEL', 'Idioma'),
    handle: brandInfo.handle,
    phone: brandInfo.phone,
    address: formatAddress('pt-BR'),
    flag: '🇧🇷',
    menuEyebrow: buildMenuStrings('pt-BR').eyebrow,
    menuHeroTitle: brandMenu.heroTitle,
    menuBack: buildMenuStrings('pt-BR').back,
    menuAll: 'Tudo',
    menuHint: 'Arraste para ver mais',
    menuStatusLoading: 'Carregando cardápio...',
    menuStatusError:
      'Não foi possível carregar o cardápio agora. Tente novamente em instantes.',
    menuStatusMissing: 'Configuração do menu ausente.',
    menuEmpty:
      'Nenhum prato encontrado no momento. Em instantes atualizamos o cardápio por aqui.',
    menuUnavailable: 'Indisponível',
    menuNavLabel: buildMenuStrings('pt-BR').navLabel,
  },
  'en-US': {
    brandLine1: getEnv('PUBLIC_EN_US_BRAND_LINE1', brandInfo.shortName),
    brandLine2: getEnv('PUBLIC_EN_US_BRAND_LINE2', 'Restaurant'),
    eyebrow: getEnv(
      'PUBLIC_EN_US_EYEBROW',
      'Signature cuisine & hospitality, anywhere.',
    ),
    buttonLabel: getEnv('PUBLIC_EN_US_CTA', 'View menu'),
    buttonAria: getEnv('PUBLIC_EN_US_CTA_ARIA', 'Open the restaurant menu'),
    languageLabel: getEnv('PUBLIC_EN_US_LANGUAGE_LABEL', 'Language'),
    handle: brandInfo.handle,
    phone: brandInfo.phone,
    address: formatAddress('en-US'),
    flag: '🇺🇸',
    menuEyebrow: buildMenuStrings('en-US').eyebrow,
    menuHeroTitle: brandMenu.heroTitle,
    menuBack: buildMenuStrings('en-US').back,
    menuAll: 'All',
    menuHint: 'Swipe to see more',
    menuStatusLoading: 'Loading menu...',
    menuStatusError:
      'Unable to load the menu right now. Please try again shortly.',
    menuStatusMissing: 'Missing menu configuration.',
    menuEmpty: 'No dishes available at the moment. We will refresh the menu shortly.',
    menuUnavailable: 'Unavailable',
    menuNavLabel: buildMenuStrings('en-US').navLabel,
  },
  'es-ES': {
    brandLine1: getEnv('PUBLIC_ES_ES_BRAND_LINE1', 'Restaurante'),
    brandLine2: getEnv('PUBLIC_ES_ES_BRAND_LINE2', brandInfo.shortName),
    eyebrow: getEnv(
      'PUBLIC_ES_ES_EYEBROW',
      'Gastronomía de autor para todas las mesas.',
    ),
    buttonLabel: getEnv('PUBLIC_ES_ES_CTA', 'Ver menú'),
    buttonAria: getEnv('PUBLIC_ES_ES_CTA_ARIA', 'Ir al menú principal'),
    languageLabel: getEnv('PUBLIC_ES_ES_LANGUAGE_LABEL', 'Idioma'),
    handle: brandInfo.handle,
    phone: brandInfo.phone,
    address: formatAddress('es-ES'),
    flag: '🇪🇸',
    menuEyebrow: buildMenuStrings('es-ES').eyebrow,
    menuHeroTitle: brandMenu.heroTitle,
    menuBack: buildMenuStrings('es-ES').back,
    menuAll: 'Todo',
    menuHint: 'Desliza para ver más',
    menuStatusLoading: 'Cargando menú...',
    menuStatusError:
      'No pudimos cargar el menú ahora. Inténtalo nuevamente en unos instantes.',
    menuStatusMissing: 'Falta la configuración del menú.',
    menuEmpty:
      'No hay platos disponibles por ahora. En breve actualizaremos el menú aquí.',
    menuUnavailable: 'No disponible',
    menuNavLabel: buildMenuStrings('es-ES').navLabel,
  },
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'pt-BR';

export const languageNames: Record<Language, string> = {
  'pt-BR': 'Português (Brasil)',
  'en-US': 'English',
  'es-ES': 'Español',
};
