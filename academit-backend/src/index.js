import { environment } from './config/environmet.config.js'
import { app } from './server/index.js'

app.listen(environment.port, (err) => {
  if (!err) {
    console.log('Running in Port', environment.port)
    return
  }
  console.log(err)
})
