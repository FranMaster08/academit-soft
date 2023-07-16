const regexSeparatorHeaders = /file,text,number,hex/g
const regexSeparatorColumn = /,/g
const regexSeparatorColumnEmpty = /,,/g

export const isLineValid = (item) => {
  if ((item.match(regexSeparatorHeaders) || []).length > 0) {
    return false
  }
  const conteoComas = (item.match(regexSeparatorColumn) || []).length
  if ((item.match(regexSeparatorColumnEmpty) || []).length > 0) {
    return false
  }
  return conteoComas === 3
}
