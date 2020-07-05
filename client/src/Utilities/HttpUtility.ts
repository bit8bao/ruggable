import environment from 'environment';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import HttpErrorResponseModel from '../Models/API/HttpErrorResponseModel';
import { oc } from 'ts-optchain';

/* istanbul ignore next */
const REQUEST_OPTIONS =
  environment.isDevelopment && !environment.isTesting
    ? {
        headers: {
          Authorization: `bearer ${environment.token.auth}`,
        },
      }
    : { withCredentials: true };

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Options = 'OPTIONS',
  Head = 'HEAD',
  Patch = 'PATCH',
}

export default class HttpUtility {
  private constructor() {}

  public static async get(endpoint: string, params?: any, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse | HttpErrorResponseModel> {
    const paramsConfig: AxiosRequestConfig | undefined = params ? { params } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Get,
      },
      {
        ...paramsConfig,
        ...requestConfig,
      }
    );
  }

  public static async post(endpoint: string, data?: any): Promise<AxiosResponse | HttpErrorResponseModel> {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Post,
      },
      config
    );
  }

  public static async put(endpoint: string, data?: any): Promise<AxiosResponse | HttpErrorResponseModel> {
    const config: AxiosRequestConfig | undefined = data ? { data } : undefined;

    return HttpUtility._request(
      {
        url: endpoint,
        method: RequestMethod.Put,
      },
      config
    );
  }

  public static async delete(endpoint: string): Promise<AxiosResponse | HttpErrorResponseModel> {
    return HttpUtility._request({
      url: endpoint,
      method: RequestMethod.Delete,
    });
  }

  private static async _request(restRequest: Partial<Request>, config?: AxiosRequestConfig): Promise<AxiosResponse | HttpErrorResponseModel> {
    if (!Boolean(restRequest.url)) {
      throw new Error(`Received ${restRequest.url} which is invalid for a endpoint url`);
    }

    try {
        const axiosRequestConfig: AxiosRequestConfig = {
        ...config,
        ...REQUEST_OPTIONS,
            // @ts-ignore
            method: restRequest.method,
        url: restRequest.url,
        headers: {
          ...oc(config).headers(undefined),
          ...oc(REQUEST_OPTIONS).headers(undefined),
          // Fixes ie11 caching api issue:
          Pragma: 'no-cache',
          'Cache-Control': 'no-cache',
          Expires: 0,
        },
      };
      const axiosResponse: AxiosResponse = await axios(axiosRequestConfig);

      const { status, data, request } = axiosResponse;

      if (data && data.success === false) {
        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: data.errors.join(' - '),
            errors: data.errors,
            url: request ? request.responseURL : restRequest.url,
            raw: axiosResponse,
          },
          restRequest
        );
      }

      return {
        ...axiosResponse,
      };
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        const { status, statusText, data } = error.response;
        const errors: string[] = data && data.hasOwnProperty('errors') ? [statusText, ...data.errors] : [statusText];

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: errors.filter(Boolean).join(' - '),
            errors,
            url: error.request.responseURL,
            raw: error.response,
          },
          restRequest
        );
      } else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        const { status, statusText, responseURL } = error.request;

        return HttpUtility._fillInErrorWithDefaults(
          {
            status,
            message: statusText,
            errors: [statusText],
            url: responseURL,
            raw: error.request,
          },
          restRequest
        );
      }

      // Something happened in setting up the request that triggered an Error
      return HttpUtility._fillInErrorWithDefaults(
        {
          status: 0,
          message: error.message,
          errors: [error.message],
          url: restRequest.url!,
          raw: error,
        },
        restRequest
      );
    }
  }

  private static _fillInErrorWithDefaults(error: Partial<HttpErrorResponseModel>, request: Partial<Request>): HttpErrorResponseModel {
    const model = new HttpErrorResponseModel();

    model.status = error.status || 0;
    model.message = error.message || 'Error requesting data';
    /* istanbul ignore next */
    model.errors = error.errors!.length ? error.errors! : ['Error requesting data'];
    model.url = error.url || request.url!;
    model.raw = error.raw;

    // Remove anything with undefined or empty strings.
    model.errors = model.errors.filter(Boolean);

    return model;
  }
}
