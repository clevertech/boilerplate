import {executeDbQuery} from './'
import {mockDbClient} from '../../__mocks__/pg'

jest.mock('pg')

describe('Db helper', () => {
  it('makes queries', () => {
    executeDbQuery('somequery')
    expect(mockDbClient.query).toHaveBeenCalled()
  })
})