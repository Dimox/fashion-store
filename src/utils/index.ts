export const generateUniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 9)

export const scrollIntoView = (element: HTMLElement) => {
  element.scrollIntoView({ behavior: 'smooth' })
}
