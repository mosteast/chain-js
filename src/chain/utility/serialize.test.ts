import { T_block } from '../../type/block';
import { N_block_format } from '../../type/enum';
import { serialize } from './serialize';

describe('serialize', () => {
  describe('should succeed', () => {
    it('common', async () => {
      const block: T_block = { ts: 1634634273184, content: 'a', format: N_block_format.text };
      const r = serialize(block);
      expect(r).toBe('{"content":"a","format":"text","ts":1634634273184}');
    });
  });
});
