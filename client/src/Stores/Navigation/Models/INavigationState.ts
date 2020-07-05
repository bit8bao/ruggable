import NavigationModel from './Navigation/NavigationModel';

export default interface INavigationState {
  readonly allNavItems: NavigationModel[];
  readonly isFirstRendering: boolean;
}
