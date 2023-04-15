import { Box, Button, TextField, Typography } from '@mui/material'
import { ResourcePicker } from '@shopify/app-bridge-react'

import axios from 'axios'
import React, { useState } from 'react'
import { useAuthenticatedFetch } from '../hooks'
// import fetch from '../hooks/useAuthenticatedFetch'

const PopUp = () => {
  const [select, setSelect] = useState(false)
  const [selectProduct, setSelectProduct] = useState(null)
  const [tColor, setTColor] = useState('#fff')
  const [bgColor, setBgColor] = useState('#000')

  const fetch = useAuthenticatedFetch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const textColor = form.textColor.value
    const bgColor = form.bgColor.value

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

      console.log(popUpInfo)

      fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(popUpInfo)
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
  }

  return (
    <Box display={'flex'} gap={4} alignItems={'center'}>
      <form onSubmit={handleSubmit}>
        <Box>
          <Box display={'flex'} gap={2} marginY={1}>
            <input
              onChange={(e) => setTColor(e.target.value)}
              type={'color'}
              name='textColor'
            />
            <Typography fontSize={20} fontWeight={'bold'}>
              Text Color
            </Typography>
          </Box>
          <Box display={'flex'} gap={2} marginY={1}>
            <input
              onChange={(e) => setBgColor(e.target.value)}
              type={'color'}
              name='bgColor'
            />
            <Typography fontSize={20}>bg Color</Typography>
          </Box>
          <Box marginY={2}>
            <Button variant='outlined' onClick={() => setSelect(true)}>
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
      <br />
      <Box
        display={'flex'}
        bgcolor={bgColor}
        alignItems={'center'}
        justifyContent={'center'}
        gap={4}
        paddingX={2}
        width={'auto'}
        height={115}
        borderRadius={2}>
        <Box>
          <img width={80} src={'../assets/home-trophy.png'} alt='img' />
        </Box>
        <Box>
          <Typography color={tColor} fontWeight={'bold'}>
            Empty waterfall
          </Typography>
          <Typography color={tColor} fontSize={'15px'}>
            $5.00
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PopUp
