import '@walletconnect/react-native-compat';
import { WagmiProvider } from 'wagmi';
import { sepolia } from '@wagmi/core/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    createWeb3Modal,
    defaultWagmiConfig,
    Web3Modal,
} from '@web3modal/wagmi-react-native';
import Home from './src/screens/Home';
import { SafeAreaView } from 'react-native';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '4e40e16c0222af7ddd5f7cd15ef431ce';

// 2. Create config
const metadata = {
    name: 'AppKit RN',
    description: 'AppKit RN Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
    redirect: {
        native: 'YOUR_APP_SCHEME://',
        universal: 'YOUR_APP_UNIVERSAL_LINK.com',
    },
};

const chains = [sepolia] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
    projectId,
    wagmiConfig,
});

export default function App() {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaView>
                    <Home />
                </SafeAreaView>
                <Web3Modal />
            </QueryClientProvider>
        </WagmiProvider>
    );
}
