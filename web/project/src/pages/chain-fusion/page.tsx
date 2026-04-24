import { useEffect } from 'react';
import i18n from '../../i18n';
import ChainFusionEN from '../chain-fusion-en/page';

export default function ChainFusionZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <ChainFusionEN />;
}
