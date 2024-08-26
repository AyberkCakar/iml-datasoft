import { useRouter } from 'next/router';
import React from 'react';
import { CollapsibleIcon, MenuItem, MenuChildItem, MenuText } from './_styles';
import { MenuIcon } from '../_styles';

export const CollapsibleButton = ({
  child,
  name,
  icon,
  isOpen,
  onClick,
  baseClass
}: any) => {
  const router = useRouter();

  const toggleExpansion = () => {
    onClick();
  };

  const childElements = child.map((child: any) => (
    <MenuChildItem key={child.name} onClick={() => router.replace(child.link)}>
      <MenuIcon
        baseClassName={child?.baseClass ? child.baseClass : 'fa-solid'}
        className={child.icon}
      />

      <MenuText>
        {child.name.charAt(0).toUpperCase() + child.name.slice(1)}
      </MenuText>
    </MenuChildItem>
  ));

  return (
    <div>
      <MenuItem onClick={toggleExpansion}>
        <MenuIcon baseClassName="fa-solid" className={icon} />
        <MenuText>{name.charAt(0).toUpperCase() + name.slice(1)}</MenuText>
        <CollapsibleIcon
          baseClassName={baseClass ? baseClass : 'fa-solid'}
          className={isOpen ? 'fa-chevron-down' : 'fa-chevron-left'}
        />
      </MenuItem>
      {isOpen && <div>{childElements}</div>}
    </div>
  );
};
