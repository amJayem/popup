import { Page } from '@shopify/polaris'
import { Box } from '@mui/material'
import { TitleBar } from '@shopify/app-bridge-react'
import PopUp from '../popup/PopUp'

export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title='Sales Popup App' primaryAction={null} />
      <Box>
        <PopUp />
      </Box>
    </Page>
  )
}
