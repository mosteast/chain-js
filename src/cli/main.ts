import yargs from 'yargs';
import { hash } from '../chain/utility/hash';
import { serialize } from '../chain/utility/serialize';
import { verify } from '../chain/utility/verify';
import { json_parse } from './utility/json_parse';

yargs
  .command({
    command: 'verify <block> <hash>',
    describe: 'Verify a block with hash',
    builder(argv) {
      return argv
        .positional('block', {
          describe: 'Block json',
          type: 'string',
        })
        .positional('hash', {
          describe: 'Block hash to compare',
          type: 'string',
        });
    },
    handler({ hash, block }: any) {
      let parsed = json_parse(block);
      const r = verify(parsed, hash);
      if (!r) {
        console.error('FAIL: Invalid block or hash');
        process.exit(1);
      }
    },
  })
  .command({
    command: 'hash <block>',
    describe: 'Calculate hash from serialized block',
    builder(argv) {
      return argv.positional('block', {
        describe: 'Block json',
        type: 'string',
      });
    },
    handler({ block }: any) {
      let parsed = json_parse(block);
      console.info(hash(serialize(parsed)));
    },
  })
  .demandCommand().argv;
