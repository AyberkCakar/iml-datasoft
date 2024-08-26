import { Language } from './language';

export interface ITranslationProvider {
  locale: Language;
  t(scope: string): string;
  translate(scope: string): string;
}
