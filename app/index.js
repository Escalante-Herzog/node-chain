const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

/**
  Web API for BLockchain

  Thinking of this class as the core
  way that users wanting to use the BLockchain will interact

*/
//enviorment variable for port
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc); //Throw in bc to constsr

app.use(bodyParser.json());
//First endpoint of API
//endpoint => /blocks
app.get('/blocks', (req, res) => {
  res.json(bc.chain); //sends chain to user
});

/*
  Body -> any data send along json with body-parser
  endpoint => /mine
*/
app.post('/mine', (req,res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added; ${block.toString()}`);

  //Emits signal when mined
  p2pServer.syncChains();

  res.redirect('./blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen(); //Starts the webServer within the blockchain
