import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// constants
const manifestFileUrl: string = 'https://newbalanse.github.io/GOD_OF_TOWER/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestFileUrl}>
    <App/>
  </TonConnectUIProvider>,
)
