/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/openapi';
import type { SynchronousAPIResponse } from './schema';
/**
 * Representation of the 'OperationalProcurementSynchronousApi'.
 * This API is part of the 'procurement_reporting_details_v2' service.
 */
export const OperationalProcurementSynchronousApi = {
  _defaultBasePath: undefined,
  /**
   * Synchronous API to get procurement transaction data, appropriate for smaller results sets
   * @param viewTemplateName - view template name
   * @param queryParameters - Object containing the following keys: realm, filters.
   * @returns The request builder, use the `execute()` method to trigger the request.
   */
  getDetails: (
    viewTemplateName: string,
    queryParameters: { realm: string; filters?: string }
  ) =>
    new OpenApiRequestBuilder<SynchronousAPIResponse>(
      'get',
      '/views/{viewTemplateName}',
      {
        pathParameters: { viewTemplateName },
        queryParameters
      },
      OperationalProcurementSynchronousApi._defaultBasePath
    )
};
