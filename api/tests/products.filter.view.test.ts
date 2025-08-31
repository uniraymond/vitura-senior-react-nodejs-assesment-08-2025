import type { Product } from '../src/types'

const byView = (p: Product, view: 'admin' | 'doctor') =>
  Array.isArray(p.visibleTo) ? p.visibleTo.includes(view) : true

describe('visibleTo view filter', () => {
  const base: Product = {
    id: 'x',
    publicName: 'Any',
    createdAt: '2025-06-01T00:00:00Z',
    visibleTo: ['doctor']
  }

  it('allows items visible to doctor when view=doctor', () => {
    expect(byView(base, 'doctor')).toBe(true)
  })

  it('hides items not visible to admin when view=admin', () => {
    expect(byView(base, 'admin')).toBe(false)
  })

  it('works when both roles present', () => {
    const p = { ...base, visibleTo: ['doctor', 'admin'] as ('doctor'|'admin')[] }
    expect(byView(p, 'doctor')).toBe(true)
    expect(byView(p, 'admin')).toBe(true)
  })
})
