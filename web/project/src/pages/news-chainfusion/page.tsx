import { useEffect } from 'react';
import i18n from '../../i18n';
import NewsChainFusionEN from '../news-chainfusion-en/page';

export default function NewsChainFusionZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <NewsChainFusionEN />;
}
