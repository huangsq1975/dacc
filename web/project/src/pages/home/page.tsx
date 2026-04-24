import { useEffect } from 'react';
import i18n from '../../i18n';
import HomeEN from '../home-en/page';

export default function HomeZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      // Reset to English when leaving ZH route
      i18n.changeLanguage('en');
    };
  }, []);

  return <HomeEN />;
}
