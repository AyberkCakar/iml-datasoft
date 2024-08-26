import { Baloo_Chettan_2 } from 'next/font/google';

export const font = {
  span: 'OpenSans-Regular',
  text: 'OpenSans-Regular',
  h1: 'OpenSans-Regular',
  h2: 'OpenSans-Regular',
  h3: 'OpenSans-SemiBold',
  h4: 'OpenSans-SemiBold',
  h5: 'OpenSans-Bold',
  p: 'OpenSans-Regular',

  thin: 'OpenSans-Light',
  extralight: 'OpenSans-Light',
  light: 'OpenSans-Light',
  normal: 'OpenSans-Regular',
  medium: 'OpenSans-SemiBold',
  semibold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
  extrabold: 'OpenSans-ExtraBold',
  black: 'OpenSans-ExtraBold'
};

export const typeScale = {
  h1: '96px',
  h2: '60px',
  h3: '48px',
  h4: '34px',
  h5: '24px',
  p: '20px',
  span: '12px',
  text: '16px'
};

const balooChettan2FontFamily = Baloo_Chettan_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin']
});

export const fontFamily = balooChettan2FontFamily.style.fontFamily;
