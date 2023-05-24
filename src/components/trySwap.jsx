//import { useEffect } from 'react';
//import { getQuote } from '../redux/quotes.js';
//import Web3 from 'web3';
//import BigNumber from 'bignumber.js';

//const TrySwap = (selectedToken) => {
//  useEffect(() => {
//    const executeSwap = async () => {
//      const erc20abi = [
//        {
//          "inputs": [
//            { "internalType": "string", "name": "name", "type": "string" },
//            { "internalType": "string", "name": "symbol", "type": "string" },
//            { "internalType": "uint256", "name": "max_supply", "type": "uint256" }
//          ],
//          "stateMutability": "nonpayable",
//          "type": "constructor"
//        },
//        // Rest of the ABI...

//        {
//          "inputs": [],
//          "name": "name",
//          "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
//          "stateMutability": "view",
//          "type": "function"
//        }
//      ];

//      console.log("trying swap");

//      // Only work if MetaMask is connected
//      // Connecting to Ethereum: Metamask
//      const web3 = new Web3(window.ethereum);

//      // The address, if any, of the most recently used account that the caller is permitted to access
//      const accounts = await window.ethereum.request({ method: "eth_accounts" });
//      const takerAddress = accounts[0];
//      console.log("takerAddress: ", takerAddress);

//      const swapQuoteJSON = await getQuote(takerAddress);

//      // Set Token Allowance
//      // Set up approval amount
//      const fromTokenAddress = selectedToken.from.address;
//      const maxApproval = new BigNumber(2).pow(256).minus(1);
//      console.log("approval amount: ", maxApproval);
//      const ERC20TokenContract = new web3.eth.Contract(erc20abi, fromTokenAddress);
//      console.log("setup ERC20TokenContract: ", ERC20TokenContract);

//      // Grant the allowance target an allowance to spend our tokens.
//      const tx = await ERC20TokenContract.methods.approve(
//        swapQuoteJSON.allowanceTarget,
//        maxApproval.toString()
//      )
//        .send({ from: takerAddress })
//        .then(tx => {
//          console.log("tx: ", tx)
//        });

//      // Perform the swap
//      const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
//      console.log("receipt: ", receipt);
//    };

//    executeSwap();
//  }, [selectedToken]);

//  return null; // Or you can return a JSX component if needed
//};

//export default TrySwap;
