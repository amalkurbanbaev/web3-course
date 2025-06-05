import {
  QueryProvider,
  RainbowKitProvider,
  RouterProvider,
  WagmiProvider,
} from "./components/providers"

function App() {
  return (
    <WagmiProvider>
      <QueryProvider>
        <RainbowKitProvider>
          <RouterProvider />
        </RainbowKitProvider>
      </QueryProvider>
    </WagmiProvider>
  )
}

export default App
