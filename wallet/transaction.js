const ChainUtil = require('../chain-util');


class Transaction {

  constructor(){
    this.id = ChainUtil.id();
    this.input = null;
    this.outputs = [];
  }

  /*
    sendersWallet = WalletA representing the sender will
    be accessed and withdrawn the AMOUNT to the recipient or WalletB
    recipient = WalletB
    amount = currency equivalent
  */
  static newTransaction(sendersWallet, recipient, amount){
      const transaction = new this();
      if(amount > sendersWallet.balance){
        console.log(`Amount: ${amount} exceeds balace.`);
        return;
      }
      transaction.outputs.push (... [
        {amount: sendersWallet.balance - amount, address: sendersWallet.publicKey},
        {amount, address: recipient}
      ])
      return transaction;
  }

  toString(){
    return `Transaction -
      address     : ${this.id}
      amount      : ${this.amount}
      interactions: ${this.outputs}
    `;
  }
}
module.exports = Transaction;
