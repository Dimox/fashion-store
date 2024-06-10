export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  colors?: string[]
  tag?: string
}

export interface CartProduct extends Product {
  quantity: number
}

export interface ButtonTab {
  label: string
  value: string
}

export interface FiltersT {
  name: string
  items: { label?: string; value: string; checked: boolean }[] | Prices[]
}

export interface Prices {
  min: number
  max: number
  checked: boolean
}

export interface FAQ {
  question: string
  answer: string
  openClass?: boolean
  open?: boolean
}

export interface Testimonial {
  name: string
  status: string
  img: string
  img2x: string
  rating: number
  quote: string
}

export interface CartItem {
  id: number
  quantity: number
}

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum Tag {
  Button = 'button',
  RouterLink = 'RouterLink',
}
