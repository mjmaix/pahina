import { IconProps, IconType } from 'react-native-elements';

export type IconType = IconType;

export interface IconObject extends IconProps {
  name: string;
  type: IconType;
}

export * from './HeaderIcon';
export * from './IconWithBadge';
