import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useCounterContract } from './hooks/useCounterContract'
import { useTonConnect } from './hooks/useTonConnect';

function App() {
  const {connected} = useTonConnect();
  console.log(`isConnected ${connected}`);
  const {
    value,
    address,
    sendIncrement,
  } = useCounterContract();

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton/>
      </div>

      <div>
        value {value}
      </div>

      <div>
        address {address}
      </div>
      
      <div className='Card'>
        <b>Counter Address</b>
        <div className='Hint'>
          {address?.slice(0, 30) + '...'}
        </div>
      </div>

      <div className='Card'>
        <b>Counter Value</b>
        <div>{value ?? 'Loading'}</div>
      </div>

      <a className={
        `Button ${connected ? 'Active' : 'Disabled'}`
      }
      onClick={() => {
        sendIncrement();
      }}>Increment</a>
    </div>
  )
}

export default App
