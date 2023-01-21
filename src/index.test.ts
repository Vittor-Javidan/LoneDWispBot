import { expect, it } from 'vitest'
import { sum } from './index.js'

it(`Should work`, () => {

    expect(sum(2, 2)).toBe(4)
})
