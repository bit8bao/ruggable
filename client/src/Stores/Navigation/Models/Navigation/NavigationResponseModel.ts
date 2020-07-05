import { BaseModel } from 'sjs-base-model';
import NavigationModel from './NavigationModel';

/*
    // Returned Api Data Sample
    {
      "data": [],
      "success": true,
      "errors": []
    }
 */
export default class NavigationResponseModel extends BaseModel {
  public readonly data: NavigationModel[] = [NavigationModel as any];
  public readonly success: boolean = true;
  public readonly errors: string[] = [];

  /*
   * Client-Side properties (Not from API)
   */

  constructor(data: Partial<NavigationResponseModel>) {
    super();

    this.update(data);
  }

  public update(data: Partial<NavigationResponseModel>): void {
    super.update(data);
  }
}
