const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: '<Place your token here>',
  name: 'jokebot'
});

// start handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smily'
  };

  bot.postMessageToChannel('general', 'Get ready to laugh with @jokebot',
    params
  );
});

// error handle
bot.on('error', (err) => console.log(err));

// message handler
bot.on('message', (data) => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// respond to data
function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.includes(' yomama')) {
    youMomaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' help')) {
    runhelp();
  }
}

// tell chuck norris joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random')
    .then(res => {
      const joke = res.data.value.joke;
      const params = {
        icon_emoji: ':laughing'
      };

      bot.postMessageToChannel('general',
        `Chuck Norris: ${joke}`,
        params
      );
    })
}

// tell a you mama joke
function youMomaJoke() {
  axios.get('http://api.yomomma.info')
    .then(res => {
      const joke = res.data.joke;
      const params = {
        icon_emoji: ':laughing'
      };

      bot.postMessageToChannel('general',
        `Yo Mama: ${joke}`,
        params
      );
    })
}

// tell a random joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    youMomaJoke();
  }
}

// run help
function runhelp() {
  const params = {
    icon_emoji: ':question'
  };

  bot.postMessageToChannel('general',`Type @ jokebot with either 'chucknorris', 'yomoma' or 'random' to get a joke`,params);
}
