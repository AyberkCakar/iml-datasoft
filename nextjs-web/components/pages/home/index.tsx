import { HomepageBase } from './_style';
import Settings from '../../settings';
import { NextSeo } from 'next-seo';
import { useTranslation } from '../../../hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();
  return (
    <HomepageBase>
      <NextSeo title={t('header.mergeTitle') + ' - ' + t('header.home')} />
      <Settings />
    </HomepageBase>
  );
}
