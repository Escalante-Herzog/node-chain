const Blockchain = require('./index');
const Block = require('./block');
describe('Blockchain', () => {
  let bc, bc2; // New instance of Blockchain class

  //starts on every test
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('start with gensis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('start with genesis block', () => {
    expect(bc2.chain[0]).toEqual(Block.genesis());
  });
  it('adds a new block' , () => {
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidates a chain with a corrupt genisis block', () => {
      bc2.chain[0].data = 'Bad data';
      expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidates a corrupt chain',  () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'Not foo';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('Replaces the chain with a valid chain', () => {
    bc2.addBlock('goof');
    bc.replaceChain(bc2.chain); //The bc1 is replaced with bc2

    expect(bc.chain).toEqual(bc2.chain);
  });
  it('Chain is not replaced when the chain is less than or not equal to lenght', () => {
    bc.addBlock('foog');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  })
});
