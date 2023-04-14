import { Box, Button, TextField, Typography } from '@mui/material'
import { ResourcePicker } from '@shopify/app-bridge-react'

import axios from 'axios'
import React, { useState } from 'react'
import { useAuthenticatedFetch } from '../hooks'
// import fetch from '../hooks/useAuthenticatedFetch'

const PopUp = () => {
  const [select, setSelect] = useState(false)
  const [selectProduct, setSelectProduct] = useState(null)

  const fetch = useAuthenticatedFetch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const subTitle = form.subTitle.value
    // console.log(popUpInfo)

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
        title,
        subTitle,
        product
      }

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
    <Box>
      <form onSubmit={handleSubmit}>
        <Box marginY={2}>
          <Button variant='contained' onClick={() => setSelect(true)}>
            Select Product
          </Button>
        </Box>
        <TextField name='title' label='Title' variant='outlined' />
        <TextField
          name='subTitle'
          label='SubTitle'
          variant='outlined'
        /> <br /> <br />
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
      </form>
      <br />
      <Box
        display={'flex'}
        bgcolor={'#0E1B4D'}
        alignItems={'center'}
        gap={4}
        width={350}
        height={115}
        borderRadius={5}>
        <Box>
          <img width={80} src={'../assets/home-trophy.png'} alt='img' />
        </Box>
        <Box color={'white'}>
          <Typography fontWeight={'bold'}>Title</Typography>
          <Typography fontSize={'15px'}>SubTitle</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PopUp
