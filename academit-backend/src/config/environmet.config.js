import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()

export const environment = {
  port: process.env.PORT || 3000
}

export const servicesApisEnvironment = {
  tbx_echo_server: {
    url: process.env.TBX_ECHO_SERVER || 'https://echo-serv.tbxnet.com',
    BearerToken: process.env.TBX_ECHO_SERVER_TOKEN || 'aSuperSecretKey'
  }
}
