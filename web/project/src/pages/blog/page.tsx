import { useEffect } from 'react';
import i18n from '../../i18n';
import BlogEN from '../blog-en/page';

export default function BlogZH() {
  useEffect(() => {
    i18n.changeLanguage('zh');
    return () => {
      i18n.changeLanguage('en');
    };
  }, []);

  return <BlogEN />;
}
