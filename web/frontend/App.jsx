import { BrowserRouter } from 'react-router-dom'
import { NavigationMenu } from '@shopify/app-bridge-react'
import Routes from './Routes'
import { Provider, ResourcePicker } from '@shopify/app-bridge-react'

import { AppBridgeProvider, QueryProvider, PolarisProvider } from './components'

const config = {
  // The client ID provided for your application in the Partner Dashboard.
  apiKey: '5ecc3bd79d9a1ce59c9200b363f954f0',
  // The host of the specific shop that's embedding your app. This value is provided by Shopify as a URL query parameter that's appended to your application URL when your app is loaded inside the Shopify admin.
  host: new URLSearchParams(location.search).get('host'),
  forceRedirect: true
}

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)')

  return (
    <PolarisProvider>
      <Provider config={config}>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </Provider>
    </PolarisProvider>
  )
}
