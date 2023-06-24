import { Box, Text, Title } from '@mantine/core'
import React from 'react'
import { useData } from '../hooks/useData'
import { Data } from '../types/general'

const ProductFooter = () => {
  const { data, getSum, getText } = useData()

  const getFormattedData = (data: Data) => {
    return ''
  }

  return (
    <footer>
      <Box
        sx={theme => ({
          position: 'fixed',
          bottom: '0px',
          width: '100%',
          textAlign: 'center',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          padding: theme.spacing.xl,
        })}
      >
        {data && (
          <div>
            <Text>{getText()}</Text>
            <Title c={'blue'} order={3}>
              {getSum()}
            </Title>
          </div>
        )}
      </Box>
    </footer>
  )
}

export default ProductFooter
