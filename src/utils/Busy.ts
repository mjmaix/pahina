import { NavigationService } from './NavigationService';

export class Busy {
  public static readonly start = () => NavigationService.navigate('Busy');
  public static readonly stop = () => NavigationService.goBack();
}
