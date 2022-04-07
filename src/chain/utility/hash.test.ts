import { T_block } from '../../type/block';
import { N_block_format } from '../../type/enum';
import { hash } from './hash';
import { serialize } from './serialize';

describe('calc_hash', () => {
  it('common', async () => {
    const block: T_block = { ts: 1634634273184, content: 'a', format: N_block_format.text };
    const serialized = serialize(block);
    expect(hash(serialized)).toBe('dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b');
  });
});
