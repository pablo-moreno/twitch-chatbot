const dotenv = require('dotenv')
const tmi = require('tmi.js')


try {
  dotenv.config()
} catch (error) {
  console.info('.env file not found')  
}

function run() {
  const username = process.env.USERNAME
  const password = process.env.OAUTH_TOKEN
  const channelName = process.env.CHANNEL_NAME

  if (!username || !password || !channelName) {
    throw new Error('Username, password or channel name not found. Exiting.')
  }

  const options = {
    identity: {
      username,
      password,
    },
    channels: [
      process.env.CHANNEL_NAME,
    ]
  }

  const client = new tmi.client(options)
  
  client.on('message', (channel, userState, message, self) => {
    if (self) {
      return
    }

    client.say(channel, `Hello ${userState.username}`)
  })

  client.on('connected', (address, port) => {
    console.log(`Bot connected to ${address}:${port}`)
  })

  client.connect()  
}

run()
