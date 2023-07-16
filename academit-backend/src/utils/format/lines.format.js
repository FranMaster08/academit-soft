export const formatLines = (validLine) => ({
  text: validLine.split(',')[1] || '',
  number: validLine.split(',')[2] || '',
  hex: validLine.split(',')[3] || ''
})
