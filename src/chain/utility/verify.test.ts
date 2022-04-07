import { pick } from 'lodash';
import { T_block } from '../../type/block';
import { N_block_format } from '../../type/enum';
import { verify } from './verify';

describe('verify', () => {
  describe('should succeed', () => {
    it('common', async () => {
      const block: T_block = { ts: 1634634273184, content: 'a', format: N_block_format.text };
      expect(verify(block, 'dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b')).toBeTruthy();
      expect(verify(block, 'invalid')).toBeFalsy();
    });

    it('role2 1st block', async () => {
      const block: T_block = {
        prev: null,
        parent: null,
        ts: 1645625800722,
        tid: '5569',
        type: 'post',
        format: N_block_format.json,
        content: '{"content":{"text":"生生不息。"},"id":5569,"owner_id":2,"reply_id":null,"type":"activity"}',
      };

      expect(verify(block, '17a54ea93574eefba6d030cbee25c97ec718d55852384b0a870547bcd7ff6447')).toBeTruthy();
    });

    it('role2 2nd block', async () => {
      const block: T_block = {
        hash: '7149c03fd45c3fffe01c965e2f69a0de78254bcb30dba1e93e43999e692d5dad',
        prev: '17a54ea93574eefba6d030cbee25c97ec718d55852384b0a870547bcd7ff6447',
        parent: null,
        ts: 1645704476273,
        tid: '5609',
        type: 'post',
        format: N_block_format.json,
        content:
          '{"content":{"text":"✅公链测试完毕，于本帖发布后正式启用\\n#施工成果"},"id":5609,"owner_id":89,"reply_id":null,"type":"activity"}',
      };

      const filtered = pick(block, ['prev', 'parent', 'ts', 'tid', 'type', 'format', 'content']);
      expect(verify(filtered, block.hash as string)).toBeTruthy();
    });
  });

  describe('should fail', () => {
    it('common', async () => {
      const block: T_block = { tid: '1', ts: 1634634273184, content: 'a', format: N_block_format.text };
      expect(verify(block, 'invalid')).toBeFalsy();
    });

    it('role2 1st block (tampered)', async () => {
      const block: T_block = {
        hash: '17a54ea93574eefba6d030cbee25c97ec718d55852384b0a870547bcd7ff6447',
        prev: null,
        parent: null,
        ts: 1645625800722,
        tid: '5569',
        type: 'post',
        format: N_block_format.json,
        content:
          '{"content":{"text":"WRONG DATA WRONG DATA WRONG DATA WRONG DATA "},"id":5569,"owner_id":2,"reply_id":null,"type":"activity"}',
      };

      const filtered = pick(block, ['prev', 'parent', 'ts', 'tid', 'type', 'format', 'content']);
      expect(verify(filtered, block.hash as string)).toBeFalsy();
    });
  });
});
