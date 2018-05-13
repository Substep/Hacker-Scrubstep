// Discord.js bot
const Discord = require("discord.js");
const client = new Discord.Client();
const newUsers = new Discord.Collection();
const config = require("./config.json");
const fs = require("fs")

//Sets the activity of the bot
client.on('ready', () => {
  client.user.setActivity('Scrubstep | ' + config.prefix + 'help', {type: 'PLAYING'});

//Sends message into the channel with the id that bot has started
  client.channels.get('439819029797142538').send({
        embed: {
        "color": 49663,
        "timestamp": new Date(),
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [
      {
        "name": "Bot Status:",
        "value": "Successfully booted up."
        }]
      }
    });
});

//Gives/Removes the role with the id when playing/quitting Warframe
client.on('presenceUpdate', (OldMember, NewMember) => {
    if (NewMember.presence.game != null && NewMember.presence.game.name == "Warframe") {
        NewMember.addRole('439947347724730378').catch(console.error);
    }
    else if (OldMember.presence.game !== null && OldMember.presence.game.name == "Warframe"
                && NewMember.presence.game == null || NewMember.presence.game.name !== "Warframe") {
        if (OldMember.roles.has('439947347724730378')) {
            OldMember.removeRole('439947347724730378').catch(console.error);
        }
    }
});

//Warframe role adder
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  if (message.content.toLowerCase().startsWith(config.prefix + "addrole warframe") && (!message.member.roles.has('439895350799630346'))) {
    message.react('✅')
    message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Success!",
          "value": "Added to Warframe role."
        }]
      }
    })
     .then(msg => {
      msg.delete(5000)
    message.member.addRole('439895350799630346').catch(console.error);
  })
  }
  else if (message.content.toLowerCase().startsWith(config.prefix + "addrole warframe") && (message.member.roles.has('439895350799630346'))) {
    message.react('❌')
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You already have that role. Try " + config.prefix + "removerole warframe"
        }]
      }
    })
     .then(msg => {
      msg.delete(5000).catch(console.error);
        })
  }
});

//Warframe role remover
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  
  if (message.content.toLowerCase().startsWith(config.prefix + "removerole warframe") && (message.member.roles.has('439895350799630346'))) {
    message.react('✅')
    message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Success!",
          "value": "Removed from Warframe role."
        }]
      }
    })
     .then(msg => {
      msg.delete(5000)
    message.member.removeRole('439895350799630346').catch(console.error);
  })
  }
  else if (message.content.toLowerCase().startsWith(config.prefix + "removerole warframe") && (!message.member.roles.has('439895350799630346'))) {
    message.react('❌')
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You don't have that role. Try " + config.prefix + "addrole warframe"
        }]
      }
    })
     .then(msg => {
      msg.delete(5000).catch(console.error);
        })
  }
});

//A simple help command
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "help")) {
    message.channel.send({
      embed: {
    "title": "Commands",
    "color": 49663,
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": client.user.username
    },
    "fields": [
      {
        "name": config.prefix + "help",
        "value": "Shows this message of all available commands."
      },
      {
        "name": config.prefix + "ping",
        "value": "Tells you your current ping."
      },
      {
        "name": config.prefix + "prefix",
        "value": "Changes the bots prefix to specified prefix."
        }]
      }
    });
  }
});

//Tells you your ping to the bot
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "ping")) {
    message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Ping Calculator",
          "value": new Date().getTime() - message.createdTimestamp + " ms"
        }]
      }
    });
  }
});

//Changes the prefix of the bot
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.author.id !== config.ownerID) return message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You do not have permission to use this command!"
        }]
      }
    });

  if (message.content.startsWith(config.prefix + "prefix")) {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
  config.prefix = newPrefix;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Success!",
          "value": "Prefix has been changed to " + config.prefix
        }]
      }
    });
}
});

client.login(process.env.TOKEN);