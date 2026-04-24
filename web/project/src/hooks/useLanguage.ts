import i18n from '../i18n';

export function useLanguage() {
  const switchToZh = () => i18n.changeLanguage('zh');
  const switchToEn = () => i18n.changeLanguage('en');
  const currentLang = i18n.language;
  return { switchToZh, switchToEn, currentLang };
}
