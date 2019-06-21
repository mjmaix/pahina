import 'styled-components';
import { Theme } from '../src/core/themes/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
  export interface ThemedComponentProps {
    theme: DefaultTheme;
  }
}
