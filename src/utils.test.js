import { describe, it, expect } from 'vitest'
import { decodeHTML, shuffleArray } from './utils'

describe('utils', () => {
  it('decodes HTML entities', () => {
    const encoded = 'Tom &amp; Jerry &lt;3'
    expect(decodeHTML(encoded)).toBe('Tom & Jerry <3')
  })

  it('shuffleArray returns same elements', () => {
    const arr = [1,2,3,4,5]
    const out = shuffleArray(arr)
    expect(out.sort()).toEqual(arr.sort())
  })
})
