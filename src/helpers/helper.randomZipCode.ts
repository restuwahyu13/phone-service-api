export const randomZipCode = (): string => {
  const phone = 16417
  return '16'.concat(String(Math.random() * phone).substr(2, 4)).replace(/[.]/gi, '')
}
