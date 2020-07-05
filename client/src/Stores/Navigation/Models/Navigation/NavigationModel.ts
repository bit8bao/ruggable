import { BaseModel } from 'sjs-base-model';

/*
    // Returned Api Data Sample
    {
      "id": "0000-0000-1111-1111",
      "parentId": null,
      "name": "Ensodata",
      "url": "/",
      "icon": "Ensodata",
      "description": null
      "children": []
    }
 */
export default class NavigationModel extends BaseModel {
  public readonly id: string = '';
  public readonly parentId: string = '';
  public readonly name: string = '';
  public readonly url: string = '';
  public readonly icon: string = '';
  public readonly description: string = '';
  public readonly children: NavigationModel[] = [NavigationModel as any];

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<NavigationModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<NavigationModel>): void {
    super.update(data);
  }
}
