import axios from 'axios'

const client = axios.create({
  baseURL: process.env.HOST
})

client.all = axios.all
client.spread = axios.spread

export default client
