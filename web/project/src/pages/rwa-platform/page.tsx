import { useEffect } from 'react';
import i18n from '../../i18n';
import RWAPlatformEN from '../rwa-platform-en/page';

export default function RWAPlatformZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <RWAPlatformEN />;
}
