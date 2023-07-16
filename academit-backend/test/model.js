import { expect } from 'chai'
import { describe, it } from 'mocha'
import { secretFileService } from '../src/services/index.js'

describe('secretFileService', () => {
  describe('getAll', () => {
    it('should return an array of secret files', async () => {
      const { files } = await secretFileService.getAll()
      expect(files).to.be.an('array')
      // Aquí puedes agregar más aserciones para verificar la estructura de los archivos secretos devueltos
    })
  })

  describe('getOne', () => {
    it('should return a secret file object', async () => {
      const filename = 'test1.csv'
      const result = await secretFileService.getOne(filename)
      expect(result).to.be.an('object')
      expect(result.file).to.equal(filename)
      expect(result.line).to.be.a('string')
    })
  })

  describe('filterByFullFilled', () => {
    it('should return an array of fulfilled promises', () => {
      const promiseResult = [
        {
          status: 'fulfilled',
          value: { file: 'test1.csv', line: 'text1,number1,hex1' }
        },
        { status: 'rejected', reason: 'Error occurred' },
        {
          status: 'fulfilled',
          value: { file: 'test2.csv', line: 'text2,number2,hex2' }
        }
      ]
      const result = secretFileService.filterByFullFilled(promiseResult)
      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(2)
      // Agrega más aserciones si es necesario
    })
  })

  describe('filterByEmptyFile', () => {
    it('should return an array of files with non-empty lines', () => {
      const formatFiles = [
        { file: 'test1.txt', line: 'text1,number1,hex1' },
        { file: 'test2.txt', line: '' },
        { file: 'test3.txt', line: 'text3,number3,hex3' }
      ]
      const result = secretFileService.filterByEmptyFile(formatFiles)
      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(2)
      // Agrega más aserciones si es necesario
    })
  })

  describe('filterByCountFields', () => {
    it('should return a promise that resolves to a file object with valid lines', async () => {
      const file = 'test1.csv'
      const line =
        'header1,text1,number1,hex1\nline2,text2,number2,hex2\nline3,text3,number3,hex3'
      const result = await secretFileService.filterByCountFields({
        file,
        line
      })
      expect(result).to.be.an('object')
      expect(result.file).to.equal(file)
      expect(result.line).to.be.an('array')
      // Agrega más aserciones si es necesario
    })
  })
})
