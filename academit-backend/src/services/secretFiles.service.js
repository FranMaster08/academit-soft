import { axiosUtil } from '../utils/axios.utils.js'
import { servicesApisEnvironment as env } from '../config/environmet.config.js'
import { isLineValid } from '../utils/validator/lines.validator.js'
import { formatLines } from '../utils/format/lines.format.js'

export const secretFileService = {
  getAll: async () => {
    return await axiosUtil({
      method: 'get',
      url: `${env.tbx_echo_server.url}/v1/secret/files`,
      headers: {
        Authorization: `Bearer ${env.tbx_echo_server.BearerToken}`
      }
    })
  },
  getOne: async (filename) => {
    const content = await axiosUtil({
      method: 'get',
      url: `${env.tbx_echo_server.url}/v1/secret/file/${filename}`,
      headers: {
        Authorization: `Bearer ${env.tbx_echo_server.BearerToken}`
      }
    })
    return { file: filename, line: content }
  },
  filterByFullFilled: (promiseResult) => {
    return promiseResult
      .filter((item) => item.status !== 'rejected')
      .map((files) => files.value)
  },
  filterByEmptyFile: (formatFiles) => {
    return formatFiles.filter((item) => item.line.length > 0)
  },
  filterByCountFields: ({ file, line }, notfilter = null) => {
    return new Promise((resolve, reject) => {
      try {
        const dataLines = line.split('\n')
        const lineas = notfilter ? dataLines : dataLines.filter(isLineValid)
        const resultLines = lineas.map(formatLines)
        resolve({ file, line: resultLines })
      } catch (error) {
        reject(error)
      }
    })
  }
}
