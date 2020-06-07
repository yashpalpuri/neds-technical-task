import { ApiClient } from "../api-client/ApiClient";

export type NextToGoEndpointGetRacesParams = {
  method: string;
  count?: number;
};

export class NextToGoEndpoint {
  static getRaces(params: NextToGoEndpointGetRacesParams) {
    params = params || {};
    params.method = "nextraces";
    params.count = params.count || 10;
    console.log(ApiClient.getInstance().defaults.baseURL);
    return ApiClient.getInstance().get("racing/", { params });
  }
}
