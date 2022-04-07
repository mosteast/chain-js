export interface T_block {
  /**
   * Creation timestamp
   */
  ts?: number;

  /**
   * Block hash
   */
  hash?: string | null;

  /**
   * Previous block hash
   */
  prev?: string | null;

  /**
   * Parent block hash
   */
  parent?: string | null;

  [key: string]: any;
}
