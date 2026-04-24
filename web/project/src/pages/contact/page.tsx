import { useEffect } from 'react';
import i18n from '../../i18n';
import ContactEN from '../contact-en/page';

export default function ContactZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <ContactEN />;
}
