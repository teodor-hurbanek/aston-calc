import React from 'react'
import { Box, Button, Checkbox, Group, List, NumberInput, Radio, Select, Text, ThemeIcon } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { variants, getTomorrowDate } from '../utils/helpers'
import { useData } from '../hooks/useData'

const ProductForm = () => {
  const { setData } = useData()

  const form = useForm({
    initialValues: {
      variant: '',
      startDate: null,
      endDate: null,
      productPackage: 'basic',
      storno: false,
      sportActivities: false,
      customersCount: 1,
    },

    validate: {
      variant: value => (value.length === 0 ? 'Variant poistenia je povinné pole' : null),
      startDate: value => (!value ? 'Začiatok poistenia je povinné pole' : null),
      // TODO: cannot be sooner than startDate  endDate: value => (!value ? 'Koniec poistenia je povinné pole' : null),
      productPackage: value => (value.length === 0 ? 'Koniec poistenia je povinné pole' : null),
      customersCount: value => (value < 1 || value > 3 ? 'Počet osôb musí byť od 1 do 3' : null),
    },
  })

  const handleSubmit = () => {
    console.log(form.values)
    setData({ ...form.values })
    // form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <List spacing={'xl'} center>
        <List.Item
          icon={
            <ThemeIcon size={35} radius={'xl'}>
              1
            </ThemeIcon>
          }
        >
          <Select
            label={'Variant poistenia'}
            placeholder={'Vyberte jednu z možností'}
            data={variants}
            withAsterisk
            {...form.getInputProps('variant')}
          />
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon size={35} radius={'xl'}>
              2
            </ThemeIcon>
          }
        >
          <DatePickerInput
            label={'Začiatok poistenia'}
            placeholder={'Vyberte začiatok poistenia'}
            minDate={new Date()}
            withAsterisk
            sx={{ marginBottom: '.5rem' }}
            {...form.getInputProps('startDate')}
          />
          {form.getInputProps('variant').value === 'short' && (
            <DatePickerInput
              label={'Koniec poistenia'}
              placeholder={'Vyberte koniec poistenia'}
              minDate={getTomorrowDate()}
              withAsterisk
              {...form.getInputProps('endDate')}
            />
          )}
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon size={35} radius={'xl'}>
              3
            </ThemeIcon>
          }
        >
          <Radio.Group
            name="productProductPackage"
            label="Vyberte si balík"
            withAsterisk
            {...form.getInputProps('productPackage')}
          >
            <Group>
              <Box
                sx={theme => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.sm,
                })}
              >
                <Radio value="basic" label="Základný" />
                {form.getInputProps('variant').value === 'long' ? (
                  <Text align="center" size={'xl'} c={'blue'}>
                    39 €
                  </Text>
                ) : (
                  <Text align="center" size={'xl'} c={'blue'}>
                    1.2 € / deň
                  </Text>
                )}
              </Box>
              <Box
                sx={theme => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.sm,
                })}
              >
                <Radio value="extended" label="Rozšírený" />
                {form.getInputProps('variant').value === 'long' ? (
                  <Text align="center" size={'xl'} c={'blue'}>
                    49 €
                  </Text>
                ) : (
                  <Text align="center" size={'xl'} c={'blue'}>
                    1.8 € / deň
                  </Text>
                )}
              </Box>
              <Box
                sx={theme => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.sm,
                })}
              >
                <Radio value="extra" label="Extra" />
                {form.getInputProps('variant').value === 'long' ? (
                  <Text align="center" size={'xl'} c={'blue'}>
                    59 €
                  </Text>
                ) : (
                  <Text align="center" size={'xl'} c={'blue'}>
                    2.4 € / deň
                  </Text>
                )}
              </Box>
            </Group>
          </Radio.Group>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon size={35} radius={'xl'}>
              4
            </ThemeIcon>
          }
        >
          <Text size={'sm'} sx={{ marginBottom: '.2rem' }}>
            Pripojistenie
          </Text>
          <Box
            sx={theme => ({
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
              padding: theme.spacing.xl,
              borderRadius: theme.radius.sm,
            })}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
              <Checkbox label={'Storno cesty'} sx={{ marginBottom: '.5rem' }} {...form.getInputProps('storno')} />
              {form.getInputProps('variant').value === 'short' ? (
                <Text align="center" size={'md'} c={'blue'}>
                  50 % prirážka k sadzbe
                </Text>
              ) : (
                <Text align="center" size={'md'} c={'blue'}>
                  20 % prirážka k sadzbe
                </Text>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
              <Checkbox label={'Športové aktivity'} {...form.getInputProps('sportActivities')} />
              {form.getInputProps('variant').value === 'short' ? (
                <Text align="center" size={'md'} c={'blue'}>
                  30 % prirážka k sadzbe
                </Text>
              ) : (
                <Text align="center" size={'md'} c={'blue'}>
                  10 % prirážka k sadzbe
                </Text>
              )}
            </div>
          </Box>
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon size={35} radius={'xl'}>
              5
            </ThemeIcon>
          }
        >
          <NumberInput
            label={'Počet osôb'}
            type={'number'}
            min={1}
            max={3}
            withAsterisk
            {...form.getInputProps('customersCount')}
          />
        </List.Item>
      </List>

      <Button
        style={{
          position: 'fixed',
          bottom: '7rem',
          right: '1rem',
        }}
        type={'submit'}
        disabled={false}
      >
        Vypočítať cenu
      </Button>
    </form>
  )
}

export default ProductForm
