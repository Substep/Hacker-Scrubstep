// Discord.js bot
const Discord = require("discord.js");
const client = new Discord.Client();
const newUsers = new Discord.Collection();
const config = require("./config.json");
const fs = require("fs")

//Sets the activity of the bot
client.on('ready', () => {
  client.user.setActivity('Hackernight | ' + config.prefix + 'help', {type: 'PLAYING'});

//Sends message into the channel with the id that bot has started
  client.channels.get('439819029797142538').send({
        embed: {
        "color": 3447003,
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

//Gives/Removes the role with the id when playing/quitting MINDNIGHT
client.on('presenceUpdate', (OldMember, NewMember) => {
    if (NewMember.presence.game != null && NewMember.presence.game.name == "MINDNIGHT") {
        NewMember.addRole('439954976018530325').catch(console.error);
    }
    else if (OldMember.presence.game !== null && OldMember.presence.game.name == "MINDNIGHT"
                && NewMember.presence.game == null || NewMember.presence.game.name != "MINDNIGHT") {
        if (OldMember.roles.has('439954976018530325')) {
            OldMember.removeRole('439954976018530325').catch(console.error);
        }
    }
});

//A simple help command
client.on("message", (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "help")) {
    message.channel.send({
      embed: {
    "title": "Commands",
    "color": 3447003,
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
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(config.prefix + "ping")) {
    message.channel.send({
      embed: {
        "color": 3447003,
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
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if(message.content.startsWith(config.prefix + "prefix")) {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newPrefix = message.content.split(" ").slice(1, 2)[0];
  // change the configuration in memory
  config.prefix = newPrefix;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    message.channel.send({
      embed: {
        "color": 3447003,
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