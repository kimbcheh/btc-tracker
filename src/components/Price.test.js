import { render, screen } from '@testing-library/react'
import Price from './Price'

test('renders price component with data received in props', () => {
  render(
    <Price price="50000.00" time="Monday June 7 2021, 12:00:00 PM" symbol="€" />
  )
  expect(
    screen.getByText('as at Monday June 7 2021, 12:00:00 PM')
  ).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '€50000.00' })).toBeInTheDocument()
})
