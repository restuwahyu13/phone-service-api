export const randomPhoneNumber = (): string => {
  const phone: number = 87887242891
  return '87'.concat(String(Math.random() * phone).substr(2, 10)).replace(/[.]/gi, '')
}
