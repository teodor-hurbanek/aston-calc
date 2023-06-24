import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
import { Data } from '../types/general'

interface DataInterface {
  data: Data
  setTasks: Dispatch<SetStateAction<Data>>
}
const DataContext = createContext<any>(null)

const useProvidedData = () => {
  const [data, setData] = useState<Data | null>()

  const getDays = (startDate: string, endDate: string) => {
    const start = Number(startDate)
    const end = Number(endDate)
    const miliseconds = 24 * 60 * 60 * 1000
    return Math.round(Math.abs((start - end) / miliseconds)) + 1
  }

  const getSum = () => {
    let days = 1
    let productPackage = 1
    let storno = 1
    let sportActivities = 1
    let customersCount = 1
    if (data?.variant === 'long') {
      if (data.productPackage === 'basic') productPackage = 39
      if (data.productPackage === 'extended') productPackage = 49
      if (data.productPackage === 'extra') productPackage = 59
      if (data.storno) storno = 1.2
      if (data.sportActivities) sportActivities = 1.1
      customersCount = data?.customersCount
    }
    if (data?.variant === 'short') {
      days = getDays(data.startDate, data.endDate)
      if (data.productPackage === 'basic') productPackage = 1.2
      if (data.productPackage === 'extended') productPackage = 1.8
      if (data.productPackage === 'extra') productPackage = 2.4
      if (data.storno) storno = 1.5
      if (data.sportActivities) sportActivities = 1.3
      customersCount = data?.customersCount
    }
    return (
      Math.round((days * productPackage * storno * sportActivities * customersCount + Number.EPSILON) * 100) / 100 +
      ' €'
    )
  }

  const getText = () => {
    let productPackage = ''
    let days = 0
    let customersCount = 0
    if (data) {
      if (data?.productPackage === 'basic') productPackage = 'Základný'
      if (data?.productPackage === 'extended') productPackage = 'Rozšírený'
      if (data?.productPackage === 'extra') productPackage = 'Extra'
      if (data.variant === 'long') {
        days = 365
      } else {
        days = getDays(data.startDate, data.endDate)
      }
      customersCount = data.customersCount
    }
    return `${productPackage} / ${days} dni / ${customersCount} osôb ${data?.storno ? '/ Storno' : ''} ${
      data?.sportActivities ? '/ Aktivity' : ''
    }`
  }

  return { data, setData, getSum, getText }
}

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const data = useProvidedData()
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}
