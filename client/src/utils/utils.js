export const formatPrice = (n) => {
  return new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(n/100)
}
