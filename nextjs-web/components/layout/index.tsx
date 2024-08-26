import React, { useState } from 'react';
import { GlobalStyle, LayoutBase } from './_style';
import { useTheme } from '../../hooks/useTheme';
import { Footer } from '../footer';
import '@fortawesome/fontawesome-free/css/all.css';
import { useRouter } from 'next/router';
import { UserService } from '../../utils/services/userService';
import { verifyJwtToken } from '../../lib/verifyJwt';
import { DrawerMenu } from '../drawer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const user = UserService.getUser();
    if (user) {
      verifyJwtToken(user.token)
        .then((isVerify) => {
          setIsLogin(isVerify);

          if (!isVerify) {
            router.replace('/login');
          }
        })
        .catch((error) => {
          setIsLogin(false);
          router.replace('/login');
        });
    }
  }, [router]);

  return isLogin ? (
    <LayoutBase>
      <DrawerMenu>
        <GlobalStyle
          backgroundColor={theme.colors.primaryBackgroundColor as string}
        />
        {children}
        <Footer />
      </DrawerMenu>
    </LayoutBase>
  ) : (
    <LayoutBase>{children}</LayoutBase>
  );
};

export default Layout;
