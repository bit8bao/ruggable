import NavigationModel from '../../../Stores/Navigation/Models/Navigation/NavigationModel';

export default interface INavigation {
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly icon: string;
  readonly children: NavigationModel[];
  readonly isActive: boolean;
}
