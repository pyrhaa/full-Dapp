import { useState } from 'react';
import { ethers } from 'ethers';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import './App.css';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const App = () => {
  const [greeting, setGreetingValue] = useState('');

  const reqAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  };

  ///window.ethereum verify that metamask is active in navigator
  const fetchGreeting = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log('data: ', data);
      } catch (e) {
        console.log('Error: ', e);
      }
    }
  };

  const setGreeting = async () => {
    if (!greeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await reqAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setGreeting('');
      await transaction.wait();
      fetchGreeting();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          type={'text'}
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
          value={greeting}
        />
      </header>
    </div>
  );
};

export default App;
