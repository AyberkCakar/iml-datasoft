import { useTranslation } from '../../hooks/useTranslation';
import { SettingsBase, Flag, ThemeIcon, Hr } from './_style';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../models';

const Settings = () => {
  const { locale } = useTranslation();
  const { pathname } = useRouter();
  const { isTheme, toggleTheme } = useTheme();

  return (
    <SettingsBase>
      <Link
        style={{ marginTop: 6 }}
        href={pathname}
        locale={locale === 'tr' ? 'en' : 'tr'}
      >
        <Flag src={`/assets/flags/${locale === 'tr' ? 'en' : 'tr'}.svg`} />
      </Link>
      <Hr />
      <ThemeIcon
        onClick={() => toggleTheme()}
        icon={isTheme == Theme.DARK ? faSun : faMoon}
      />
    </SettingsBase>
  );
};

export default Settings;
