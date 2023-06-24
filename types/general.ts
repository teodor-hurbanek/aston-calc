export type Data = {
  variant: Variant
  startDate: string
  endDate: string
  productPackage: ProductPackage
  storno: boolean
  sportActivities: boolean
  customersCount: number
}

type Variant = 'long' | 'short'
type ProductPackage = 'basic' | 'extended' | 'extra'
