import create from 'http-errors'
export const verificationToken = (req, res, next) => {
  try {
    // const Token = req.headers.authorization?.split(' ')[1]
    // if (!Token) throw create.Unauthorized('Token no Ingresado')
    // if (Token !== 'aSuperSecretKey') { throw create.Unauthorized('Token Invalido') }
    next()
  } catch (error) {
    next(error)
  }
}
