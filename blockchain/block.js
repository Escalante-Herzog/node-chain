const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block {

  /**
    Following the bare-min defenition of a
    hash the constructor acts as the base line
    for creating a single block
  */
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
      this.timestamp = timestamp;
      this.lastHash = lastHash;
      this.hash = hash;
      this.data = data;
      this.nonce = nonce;
      this.difficulty = difficulty || DIFFICULTY;
  }


 /**
    Notice (``) backticks, used to EC6 interpolation with vars
 */
  toString(){
    return `Block =
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash.substring(0,10)}
      Hash      : ${this.hash.substring(0,10)}
      Nonce     : ${this.nonce}
      Difficulty: ${this.difficulty}
      Data      : ${this.data}`;
  }
  // called without instance
  static genesis(){
      return new this('Genesis time', '------', 'f1r57 h45h', [], 0, DIFFICULTY);
  }

  static mineBlock(lastBlock, data){
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let {difficulty} = lastBlock; //Gets lastBlock.difficulty field
    let nonce = 0;

    do {
        nonce++;
        timestamp = Date.now();
        difficulty = Block.adjustDifficulty(lastBlock, timestamp);
        hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);

    }while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    //Loop acts as a moniter,
    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }
  //Driver hash function
  static blockHash(block){
    const {timestamp, lastHash, data, nonce, difficulty} = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }
  //Helper function using SHA256
  static hash(timestamp, lastHash, data, nonce, difficulty){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
  }

  static adjustDifficulty(lastBlock, currentTime){
    let {difficulty} = lastBlock;
    difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
    difficulty + 1 : difficulty - 1;
    return difficulty;
  }
}


//Module is "sharable"
module.exports = Block;
