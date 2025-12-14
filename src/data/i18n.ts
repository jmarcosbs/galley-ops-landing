export const languages = {
  pt: {
    brandLine1: 'Restaurante',
    brandLine2: "Marinheiro's",
    eyebrow: 'Família no tempero. Amor no prato.',
    buttonLabel: 'Acessar menu',
    buttonAria: 'Ir para o menu principal',
    languageLabel: 'Idioma',
    handle: '@restaurantemarinheiros',
    phone: '(48) 3269-7295',
    address: 'Avenida Epitácio Bittencourt, 640. Praia Brava - Florianópolis - SC',
  },
  en: {
    brandLine1: "Marinheiro's",
    brandLine2: 'Restaurant',
    eyebrow: 'Family in the seasoning. Love on the plate.',
    buttonLabel: 'View menu',
    buttonAria: 'Open the restaurant menu',
    languageLabel: 'Language',
    handle: '@restaurantemarinheiros',
    phone: '+55 48 3269-7295',
    address: '640 Epitácio Bittencourt Ave. Praia Brava - Florianópolis - SC',
  },
  es: {
    brandLine1: 'Restaurante',
    brandLine2: 'Marinheiro\'s',
    eyebrow: 'Familia en el sazón. Amor en el plato.',
    buttonLabel: 'Ver menú',
    buttonAria: 'Ir al menú principal',
    languageLabel: 'Idioma',
    handle: '@restaurantemarinheiros',
    phone: '(48) 3269-7295',
    address: 'Avenida Epitácio Bittencourt, 640. Praia Brava - Florianópolis - SC',
  },
} as const;

export type Language = keyof typeof languages;
export const defaultLanguage: Language = 'pt';

export const languageNames: Record<Language, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};
