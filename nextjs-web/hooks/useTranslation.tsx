import * as languages from '../utils/lang';
import { ITranslationProvider, Language } from '../models';
//import { useRouter } from 'next/router';
import { useContext, ReactNode, createContext } from 'react';

export const TranslationContext = createContext({});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  //const { locale } = useRouter();
  const locale = 'en';

  const translate = (scope: string) => {
    const keys: string[] = scope.split('.');
    let translation: any = languages[locale as Language];

    for (const key of keys) {
      if (translation && translation[key]) {
        translation = translation[key];
      } else {
        return scope;
      }
    }

    return translation;
  };

  return (
    <TranslationContext.Provider value={{ locale, t: translate, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () =>
  useContext(TranslationContext) as ITranslationProvider;
