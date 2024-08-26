import { Icon } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { CollapsibleButton } from './collapsible-button';
import { useRouter } from 'next/router';
import {
  Body,
  ButtonContainer,
  Container,
  Content,
  Drawer,
  Logo,
  LogoContainer,
  LogoTitle1,
  LogoTitle2,
  MenuItem,
  MenuText,
  ParentContent,
  MenuIcon
} from './_styles';
import { Header } from '../header';

export const DrawerMenu = ({ children }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [openButton, setOpenButton] = useState<number | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleButtonClick = (index: number) => {
    if (openButton === index) {
      setOpenButton(null);
    } else {
      setOpenButton(index);
    }
  };

  const array: any[] = [
    {
      name: t('header.simulators'),
      icon: 'fa-microchip',
      children: [
        {
          name: t('header.simulatorList'),
          icon: 'fa-microchip',
          link: '/data-generator'
        },
        {
          name: t('header.addDataGenerator'),
          baseClass: 'fa-brands',
          icon: 'fa-creative-commons-sampling-plus',
          link: '/add-data-generator'
        }
      ]
    },
    {
      name: t('header.realDataset'),
      icon: 'fa-database',
      link: '/real-word-dataset'
    },
    {
      name: t('header.failureTypes'),
      icon: 'fa-bug',
      link: '/anomaly-types'
    },
    {
      name: t('header.runAlgorithm'),
      icon: 'fa-rocket',
      link: '/ml-model-trainer'
    },
    {
      name: t('header.algorithmResult'),
      icon: 'fa-check-double',
      link: '/ml-model-analysis'
    }
  ];

  return (
    <Container>
      <Drawer open={drawerOpen}>
        <LogoContainer>
          <Logo src={'/assets/logo_icon.png'} />
          <LogoTitle1>{t('header.title1')}</LogoTitle1>&nbsp;
          <LogoTitle2>{t('header.title2')}</LogoTitle2>
        </LogoContainer>
        <ButtonContainer>
          {array.map((item, index) =>
            item.children?.length ? (
              <CollapsibleButton
                key={item.name}
                name={item.name}
                child={item.children}
                icon={item.icon}
                isOpen={openButton === index}
                onClick={() => handleButtonClick(index)}
                baseClass={item?.baseClass}
              />
            ) : (
              <MenuItem
                key={item.name}
                onClick={() => router.replace(item.link)}
              >
                <MenuIcon
                  baseClassName={item?.baseClass ? item.baseClass : 'fa-solid'}
                  className={item.icon}
                />

                <MenuText>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </MenuText>
              </MenuItem>
            )
          )}
        </ButtonContainer>
      </Drawer>
      <ParentContent className={drawerOpen ? 'w-calc' : 'w-100'}>
        <Header toggleDrawer={toggleDrawer}></Header>
        <Content>
          <Body>{children}</Body>
        </Content>
      </ParentContent>
    </Container>
  );
};
