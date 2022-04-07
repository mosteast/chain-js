# Mosteast general data chain SDK for JavaScript

## Usage

```shell
npm i @mosteast/chain
```

### JavaScript/TypeScript

```typescript
import { verify, serialize /*...*/ } from '@mosteast/chain';
```

### CLI

```bash
$ chain verify '{"ts":1634634273184,"content":"a","format":"text"}' dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b
```

```bash
$ chain hash '{"ts":1634634273184,"content":"a","format":"text"}'
dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b
```

## API

### `verify` - Verify a block with a given hash string

#### Verify a simple block

```typescript
// Block data
const block: T_block = {
  ts: 1634634273184,
  content: 'a',
  format: N_block_format.text,
};
// Block hash
const hash = 'dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b';
verify(block, 'dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b'); // true
verify(block, 'invalid_hash'); // false
```

#### Verify Role2 chain block

```typescript
// see: https://www.role2.com/chain/block/17a54ea93574eefba6d030cbee25c97ec718d55852384b0a870547bcd7ff6447
const block: T_block = {
  prev: null,
  parent: null,
  ts: 1645625800722,
  tid: '5569',
  type: 'post',
  format: N_block_format.json,
  content: '{"content":{"text":"生生不息。"},"id":5569,"owner_id":2,"reply_id":null,"type":"activity"}',
};

verify(block, '17a54ea93574eefba6d030cbee25c97ec718d55852384b0a870547bcd7ff6447'); // true
verify(block, 'invalid_hash'); // false
```

### `serialize` - Serialize a block into a stable string for later use (like hashing)

```typescript
const block: T_block = {
  ts: 1634634273184,
  content: 'a',
  format: N_block_format.text,
};
serialize(block); // '{"content":"a","format":"text","ts":1634634273184}'
```

### `hash_block` - Hash a block object

```typescript
const block: T_block = {
  ts: 1634634273184,
  content: 'a',
  format: N_block_format.text,
};
hash_block(block); // 'dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b'
```

### `hash` - Calculate hash from a serialized block

```typescript
const block: T_block = { ts: 1634634273184, content: 'a', format: N_block_format.text };
const serialized = serialize(block);
hash(serialized); // 'dd69cc70c38242cfca1ddcb67d2d19fe3cfc3bd1868b3dbb176dfcfde8909e8b'
```
