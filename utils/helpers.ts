export const getTomorrowDate = () => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 1)
  return currentDate
}

export const variants = [
  { value: 'short', label: 'Krátkodobé poistenie' },
  { value: 'long', label: 'Celorčné poistenie' },
]
