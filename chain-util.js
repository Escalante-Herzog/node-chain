const EC = require('elliptic').ec; //Class in module
const ec = new EC('secp256k1');
const uuidV1 = require('uuid/v1');


class ChainUtil{
  static genKeyPair(){
    return ec.genKeyPair();
  }
  //returns uuid object
  static id(){
    return uuidV1();
  }
}
module.exports = ChainUtil;
