import { useEffect } from 'react';
import i18n from '../../i18n';
import ColdWalletEN from '../cold-wallet-en/page';

export default function ColdWalletZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <ColdWalletEN />;
}
