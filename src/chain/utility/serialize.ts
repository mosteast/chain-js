import debug from 'debug';
import stringify, { Element } from 'json-stable-stringify';
import { cloneDeep } from 'lodash';
import { Invalid_argument } from '../../error/invalid_argument';
import { T_block } from '../../type/block';

const _ = debug('chain');

/**
 * Serialize a block stably
 */
export function serialize(block: T_block, props?: (keyof T_block)[], debug = false): string {
  if (typeof block !== 'object') {
    throw new Invalid_argument('Invalid block data');
  }

  const copy = cloneDeep(block);
  props = props || (Object.keys(copy) as (keyof T_block)[]);
  for (const key of props) {
    if (copy[key] === undefined) {
      (copy as any)[key] = null;
    }
  }

  _('before stringify: %O', copy);
  return stringify(copy, (a: Element, b: Element) => (a.key > b.key ? 1 : -1));
}
