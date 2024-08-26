import { useTranslation } from '../../hooks/useTranslation';
import {
  FooterContainer,
  FooterDescription,
  VersionContainer,
  VersionText,
  Version
} from './_style';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterDescription>{t('footer.description')}</FooterDescription>
      <VersionContainer>
        <VersionText>{t('footer.version')}</VersionText>
        <Version>{process.env.version}</Version>
      </VersionContainer>
    </FooterContainer>
  );
};
