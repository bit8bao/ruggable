import environment from 'environment';
import RuggableReportResponseModel from './Models/RuggableReportResponseModel';
import HttpErrorResponseModel from '../../Models/API/HttpErrorResponseModel';
import EffectsUtility from '../../Utilities/EffectsUtility';
import OrdersByProductionResponseModel from "./Models/OrdersByProductionResponseModel";
import RuggableCitiesResponseModel from "./Models/RuggableCitiesResponseModel";

export default class RuggableReportEffects {

  public static async getCities(): Promise<RuggableCitiesResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.graphql.default;
    return EffectsUtility.postToModel(RuggableCitiesResponseModel, endpoint, {
      query: `query {
            cities(offset: 0, limit: 5) {
              id,
              city_name
            }
          }`
     });
  }

  public static async loadRuggableTableReport(city_id: string): Promise<RuggableReportResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.graphql.default;

    return EffectsUtility.postToModel(RuggableReportResponseModel, endpoint, {
      query: `query {
                productionByCity(city_id: "${city_id}") {
                id,
                prod_line,
                prod_type,
                city_id,
              }
          }`
    });
  }

  public static async loadOrderByProduction(request: String): Promise<OrdersByProductionResponseModel | HttpErrorResponseModel> {
    const endpoint: string = environment.graphql.default;
    return EffectsUtility.postToModel(OrdersByProductionResponseModel, endpoint,
        {query: `
          query {
            orderByProduction(production_id: "${request}") {
              id,
              product_id,
              customer_id,
              production_id,
            }
          }`});
  }
}
