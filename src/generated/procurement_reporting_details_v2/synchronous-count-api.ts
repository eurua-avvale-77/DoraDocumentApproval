/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { CountAPIResponse } from './schema';
/**
 * Representation of the 'SynchronousCountApi'.
 * This API is part of the 'procurement_reporting_details_v2' service.
 */
export const SynchronousCountApi = {
  _defaultBasePath: undefined,
  /**
   * synchronous API to get records count of procurement transaction data
   * @param viewTemplateName - view template name
   * @param queryParameters - Object containing the following keys: realm, filters.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getCount: (
    viewTemplateName: string,
    queryParameters: { realm: string; filters?: string }
  ) =>
    new OpenApiRequestBuilder<CountAPIResponse>(
      'get',
      '/views/{viewTemplateName}/count',
      {
        pathParameters: { viewTemplateName },
        queryParameters
      },
      SynchronousCountApi._defaultBasePath
    )
};
