import React, { Component } from 'react';
import Casino from '../abis/Casino.json';
import Web3 from 'web3'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            winnerNumber: 0,
            casino: '',
            account: '',
            minBetPrice: 0,
            maxBets: 0,
            noOfBets: 0,
            totalBetAmount: 0,
            contractAddress: ''
        }
        this.bet = this.bet.bind(this);
      }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        await this.updateState()
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({
            account: accounts[0]
        })
        const networkId = await web3.eth.net.getId()
        const networkData = Casino.networks[networkId]
        this.setState({ contractAddress: networkData.address})
        if(networkData) {
          const casino = web3.eth.Contract(Casino.abi, networkData.address)
          this.setState({ casino })
        } else {
          window.alert('Contract not deployed to detected network.')
        }
      }

      async updateState() {

        const minBetPrice = parseInt(await this.state.casino.methods.minBetPrice.call())
        const maxBets = parseInt(await this.state.casino.methods.maxBets.call())
        const noOfBets = parseInt(await this.state.casino.methods.noOfBets.call())
        const totalBetAmount = parseInt(await this.state.casino.methods.totalBetAmount.call())
        const winnerNumber = parseInt(await this.state.casino.methods.winnerNumber.call())

        this.setState({
            minBetPrice,
            maxBets,
            noOfBets,
            totalBetAmount,
            winnerNumber
        })
        console.log(this.state.maxBets)
        console.log(this.state.noOfBets)
      }

      async bet(number) {
         console.log(number);
         this.state.casino.methods.bet(number).send({from: this.state.account, value: 1, gas :21000})
         .once('receipt', reciept => {
             console.log(reciept)
         })
      }
    
    render() { 
        return ( 
            <div className="main-container">
             <h1>Bet for your best number and win huge amounts of Ether</h1>
 <div className="block">
                <h4>Minimum Bet Price:</h4> &nbsp;
                <h5> {JSON.stringify(this.state.minBetPrice)}</h5>
             </div>
        <div className="block">
                <h4>Last winner:</h4> &nbsp;
                <h5>{JSON.stringify(this.state.winnerNumber)}</h5>
             </div> 
<div className="block">
                <h4>No of Bets:</h4> &nbsp;
                <h5> {JSON.stringify(this.state.noOfBets)}</h5>
             </div>
 <div className="block">
                <h4>Maximum Bets:</h4> &nbsp;
                <h5>{JSON.stringify(this.state.maxBets)}</h5>
             </div>
<hr/>
<h2>Vote for the next number</h2>
            <ul>
               <li onClick={() => {this.bet(1)}}>1</li>
               <li onClick={() => {this.bet(2)}}>2</li>
               <li onClick={() => {this.bet(3)}}>3</li>
               <li onClick={() => {this.bet(4)}}>4</li>
               <li onClick={() => {this.bet(5)}}>5</li>
               <li onClick={() => {this.bet(6)}}>6</li>
               <li onClick={() => {this.bet(7)}}>7</li>
               <li onClick={() => {this.bet(8)}}>8</li>
               <li onClick={() => {this.bet(9)}}>9</li>
               <li onClick={() => {this.bet(10)}}>10</li>
            </ul>
         </div>
         );
    }
}
 
export default Main;