const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer{
  /**
    Each server has its own blockchain
  */
  constructor(blockchain){
    this.blockchain = blockchain
    this.sockets = [];
  }

  listen(){
    const server = new Websocket.Server({port : P2P_PORT});
    server.on('connection', socket => this.connectSocket(socket));
    this.connectToPeers();
    console.log(`Listening for peer-top-peer connection on ${P2P_PORT}`);
  }
  connectToPeers(){
    peers.forEach(peer => {
      //example: ws:localhost:5001
      const socket = new Websocket(peer);

      socket.on('open', () => this.connectSocket(socket));
    });
  }
  //Helper method for connection protoc
  connectSocket(socket){
    this.sockets.push(socket);
    console.log(`Connection made with: ${socket}`);
    //Throw socket in handler
    this.messageHandler(socket);
    //nth sockets gets the blockchain
    this.sendChain(socket);
  }

  messageHandler(socket){
    //Message object
    socket.on('message', message => {
      const data = JSON.parse(message);
      //console.log('data', data);
      this.blockchain.replaceChain(data);
    });
  }

  //Helper function that sends JSON data through the socket
  sendChain(socket){
    socket.send(JSON.stringify(this.blockchain.chain));
  }
  /**
    Function handles sending out the current instances chain
    Distributing it amonst its peers
  */
  syncChains(){
    this.sockets.forEach(socket => this.sendChain(socket));
  }
}
module.exports = P2pServer;
