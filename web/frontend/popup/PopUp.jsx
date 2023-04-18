import {
  Alert,
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import { ResourcePicker } from '@shopify/app-bridge-react'

import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import React, { useState } from 'react'
import { useAppQuery, useAuthenticatedFetch } from '../hooks'
// import fetch from '../hooks/useAuthenticatedFetch'

const PopUp = () => {
  const [select, setSelect] = useState(false)
  const [selectProduct, setSelectProduct] = useState(null)
  const [tColor, setTColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#4234b2')
  const [theme, setTheme] = useState('')
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  // console.log(theme.id)

  const fetch = useAuthenticatedFetch()
  const { data, isLoading } = useAppQuery({ url: '/api/theme' })

  const handleTheme = (e) => {
    const id = e.target.value.id
    console.log(id)

    fetch(`/api/theme-files?id=${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' }
      // body: JSON.stringify(id)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          handleOpen()
        }
        console.log(data)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const textColor = form.textColor.value
    const bgColor = form.bgColor.value
    // const theme = form.theme.value
    // console.log(theme)

    if (selectProduct) {
      console.log(selectProduct.selection)
    }

    if (selectProduct) {
      const product = selectProduct.selection.map((p) => ({
        id: p.id,
        title: p.title,
        image: p.images[0].originalSrc,
        price: p.variants[0].price
      }))

      const popUpInfo = {
        textColor,
        bgColor,
        product
      }

      // console.log(popUpInfo)

      fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(popUpInfo)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            handleOpen()
          }
          console.log(data)
        })
    }
  }

  const action = (
    <IconButton color='inherit' onClick={handleClose}>
      <CloseIcon />
    </IconButton>
  )

  return (
    <Box
      display={'flex'}
      gap={4}
      padding={2}
      alignItems={'center'}
      justifyContent={'space-evenly'}>
      <Stack gap={5}>
        <Typography variant='h1' gutterBottom fontSize={30} fontWeight={'bold'}>
          Preview popup
        </Typography>
        <Box
          display={'flex'}
          bgcolor={bgColor}
          alignItems={'center'}
          justifyContent={'center'}
          gap={4}
          paddingX={2}
          width={500}
          height={200}
          borderRadius={2}>
          <Box>
            <img width={120} src={'../assets/home-trophy.png'} alt='img' />
          </Box>
          <Box>
            <Typography color={tColor} fontWeight={'bold'} fontSize={30}>
              Empty waterfall
            </Typography>
            <Typography color={tColor} fontSize={'15px'}>
              $5.00
            </Typography>
          </Box>
        </Box>
      </Stack>
      <Stack gap={5}>
        <Typography fontSize={30} variant='h1' gutterBottom>
          Customize PopUp
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              gap={2}
              marginY={1}>
              <Typography fontSize={20} fontWeight={'bold'}>
                Text Color
              </Typography>
              <input
                onChange={(e) => setTColor(e.target.value)}
                type={'color'}
                name='textColor'
                style={{ border: 'none', width: '100px', height: '50px' }}
                defaultValue={tColor}
              />
            </Box>
            <Box
              display={'flex'}
              gap={2}
              marginY={1}
              justifyContent={'space-between'}>
              <Typography fontSize={20}>bg Color</Typography>
              <input
                style={{ border: 'none', width: '100px', height: '50px' }}
                onChange={(e) => setBgColor(e.target.value)}
                type={'color'}
                name='bgColor'
                defaultValue={bgColor}
              />
            </Box>
            {/* theme selector */}
            <Box>
              <InputLabel id='demo-simple-select-label'>
                Select a Theme
              </InputLabel>
              <Select
                name='theme'
                fullWidth
                // value={theme} //{data?.result?.data[0].name}
                label='Select a theme'
                onChange={(e) => handleTheme(e)}>
                {data?.result?.data?.map((theme, i) => (
                  <MenuItem key={i} value={theme}>
                    {theme.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box marginY={2}>
              <Button
                fullWidth
                variant='outlined'
                onClick={() => setSelect(true)}>
                Select Product
              </Button>
            </Box>
            <Button type={'submit'} variant='contained'>
              Save
            </Button>
            <ResourcePicker
              open={select}
              onCancel={() => setSelect(false)}
              resourceType={'Product'}
              selectMultiple={true}
              showDraft={false}
              onSelection={(e) => {
                setSelectProduct(e)
                setSelect(false)
              }}
            />
          </Box>
        </form>
      </Stack>
      {/* <Button onClick={handleOpen}>Open simple snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message='Note archived'
        action={action}>
        <Alert variant='filled' severity='success'>
          Data saved!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default PopUp
