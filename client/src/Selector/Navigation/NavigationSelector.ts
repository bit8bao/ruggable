import { createSelector, Selector } from 'reselect';
import IStore from '../../Models/IStore';
import { Location } from 'history';
import NavigationModel from '../../Stores/Navigation/Models/Navigation/NavigationModel';
import INavigation from './Models/INavigation';
import { oc } from 'ts-optchain';

export class NavigationSelector {
  public static getTopNavigation(topLevels: NavigationModel[], location: Location): INavigation[] {
    return topLevels.map(
      (model: NavigationModel, index): INavigation => {
        const groupNav: NavigationModel[] = oc(model).children[0].children([]);
        const childUrls: string[] = groupNav.map((childModel: NavigationModel) => childModel.url);

        const isActive: boolean = [location.pathname.includes(model.url), childUrls.includes(location.pathname)].some(Boolean);

        return {
          name: model.name,
          url: model.url,
          icon: model.icon,
          description: model.description,
          children: model.children,
          isActive,
        };
      }
    );
  }

  public static getLandingNavigation(topLevels: INavigation[]): NavigationModel[] {
    const activeTopLevelNav: INavigation | undefined = topLevels.find((model: INavigation) => model.isActive);
    if (activeTopLevelNav) {
      return activeTopLevelNav.children;
    }

    return [];
  }
}

export const getTopNavigation: Selector<IStore, INavigation[]> = createSelector(
  (state: IStore) => state.navigation.allNavItems,
  (state: IStore) => state.router.location,
  NavigationSelector.getTopNavigation
);

export const getLandingNavigation: Selector<IStore, NavigationModel[]> = createSelector(
  getTopNavigation,
  NavigationSelector.getLandingNavigation
);
