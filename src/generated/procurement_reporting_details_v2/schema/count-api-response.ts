/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'CountAPIResponse' schema.
 * @example {
 *   "TotalRecords": 25000,
 *   "TotalPages": 3,
 *   "MaxRecordsInEachPage": 10000
 * }
 */
export type CountAPIResponse = {
  /**
   * @example 25000
   */
  TotalRecords?: number;
  /**
   * @example 3
   */
  TotalPages?: number;
  /**
   * @example 10000
   */
  MaxRecordsInEachPage?: number;
} & Record<string, any>;
