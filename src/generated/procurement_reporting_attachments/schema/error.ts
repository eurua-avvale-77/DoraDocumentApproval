/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

/**
 * Representation of the 'Error' schema.
 */
export type Error = {
  /**
   * @example "Unauthorized/API key not found"
   */
  code: string;
  /**
   * @example "Token Expired/ API Key not found"
   */
  message: string;
} & Record<string, any>;
