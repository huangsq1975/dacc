import { useEffect } from 'react';
import i18n from '../../i18n';
import HotWalletEN from '../hot-wallet-en/page';

export default function HotWalletZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <HotWalletEN />;
}
