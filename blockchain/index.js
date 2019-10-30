/**

*/
const Block = require('./block');

class Blockchain{
  constructor(){
    //Sets the arr to start with genesis block
    this.chain = [Block.genesis()];

  }

  addBlock(data){
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    //Adds block
    this.chain.push(block);
    return block;
  }


  isValidChain(chain){
    //Converts JS to Strings
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
    for(let i = 1; i < chain.length; i++){
      const currBlock = chain[i];
      const prevBlock = chain[i-1];
      //Checks hashes for tampering
      if(currBlock.lastHash !== prevBlock.hash ||
      currBlock.hash !== Block.blockHash(currBlock) ){
        return false;
      }
      return true;
    }
  }

  /**
    Helper function that handles checking
    the longest chain amonst the user-nodes
  */
  replaceChain(newChain){
    if(newChain.lenght <= this.chain.length){
      console.log('Received chain is not longer than current chain');
      return;
    } else if(!this.isValidChain(newChain)){
      return;
    }

    //Replace chain --- Passed conditions
    console.log('Replaced blockchain with new chain');
    this.chain = newChain;

  }

}

module.exports = Blockchain;
