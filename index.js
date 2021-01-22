const tmi = require('tmi.js')
const dotenv = require('dotenv')
const axios = require('axios')


try {
  dotenv.config()
} catch (error) {
  console.info('.env file not found')  
}

async function parseMessage(message, user) {
  if (message.trim() === '!pokemon') {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(Math.random() * 255)}`)
    const { name, sprites } = response.data

    return sprites.front_shiny
  }

  switch (message.trim()) {
    case '!welcome':
      return `Welcome, ${user.username}`
    case '!dice':
      return `${parseInt(Math.random() * 6 + 1)}`
    default:
      return ''
  }
}

function run() {
  const username = process.env.USERNAME
  const password = process.env.OAUTH_TOKEN
  const channelName = process.env.CHANNEL_NAME

  if (!username || !password || !channelName) {
    throw new Error('Username, password or channel name not found. Exiting.')
  }

  const options = {
    connection: {
      reconnect: true,
      secure: true
    },
    identity: {
      username,
      password,
    },
    channels: [
      channelName,
    ]
  }

  const client = new tmi.client(options)

  client.on('message', async (channel, userState, message, self) => {
    try {
      if (self) {
        return
      }

      if (message.includes('bot')) {
        client.say(channel, 'Como te metas conmigo te reviento.')
      }
      else {
        const response = await parseMessage(message, userState)

        if (response) {
          client.say(channel, response)
        }
      }
    } catch (error) {
      console.error(`Something went wrong :(`, error)
    }
  })

  client.on('connected', (address, port) => {
    console.log(`Bot connected to ${address}:${port}`)
  })

  client.connect()
}

run()
