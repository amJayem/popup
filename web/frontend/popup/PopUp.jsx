import { Box, Button, TextField, Typography } from '@mui/material'

import axios from 'axios'
import React from 'react'
import { useAuthenticatedFetch } from '../hooks'
// import fetch from '../hooks/useAuthenticatedFetch'

const PopUp = () => {
  const fetch = useAuthenticatedFetch()
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const subTitle = form.subTitle.value
    const popUpInfo = {
      title,
      subTitle
    }
    console.log(popUpInfo)

    fetch('/api/add', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(popUpInfo)
    })
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField name='title' label='Title' variant='outlined' />
        <TextField
          name='subTitle'
          label='SubTitle'
          variant='outlined'
        /> <br /> <br />
        <Button type={'submit'} variant='contained'>
          Submit
        </Button>
      </form>
      <br />
      <Box
        display={'flex'}
        bgcolor={'black'}
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
