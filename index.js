// Discord.js bot
const Discord = require("discord.js");
const snekfetch = require("snekfetch")
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

client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "help") {
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
      },
      {
        "name": config.prefix + "roles",
        "value": "Shows you all addable/removable roles."
      },
      {
        "name": config.prefix + "addrole",
        "value": "Gives you a certain role."
      },
      {
        "name": config.prefix + "removerole",
        "value": "Removes a certain role."
        }]
      }
    });
  }
  if(command === "roles") {
    message.channel.send({
      embed: {
    "title": "Self-Assignable Roles",
    "color": 49663,
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": client.user.username
    },
    "fields": [
      {
        "name": "Warframe",
        "value": "Role for Warframe."
        }]
      }
    });
  }
  if (command === "addrole") {
    let role = args[0];
    if(!role)
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "Please specify a role."
        }]
      }
    });
    let aRole = message.guild.roles.find(`name`, role);
    if(!aRole) {
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "That role does not exist."
        }]
      }
    });
    }
    else if(message.member.roles.has(aRole.id)) {
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You already have that role."
        }]
      }
    });
    }
    if(role != "Warframe") {
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You can't add yourself to this role."
        }]
      }
    });
    }
    else if(!message.member.roles.has(aRole.id)) {
    message.react('✅'),
    message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Success!",
          "value": `Added to ${role} role.`
        }]
      }
    });
    message.member.addRole(aRole.id).catch(console.error);
  }
  }
  if (command === "removerole") {
    let role = args[0]
    if(!role)
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "Please specify a role."
        }]
      }
    });
    let aRole = message.guild.roles.find(`name`, role);
    if(!aRole)
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "That role does not exist."
        }]
      }
    });
    if(!message.member.roles.has(aRole.id))
    message.react('❌'),
    message.channel.send({
      embed: {
        "color": 16711680,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Error!",
          "value": "You do not have that role."
        }]
      }
    });
    if(message.member.roles.has(aRole.id))
    message.react('✅'),
    message.channel.send({
      embed: {
        "color": 49663,
        "footer": {
          "icon_url": client.user.avatarURL,
          "text": client.user.username
        },
        "fields": [{
          "name": "Success!",
          "value": `Removed ${role} role.`
        }]
      }
    })
    message.member.removeRole(aRole.id).catch(console.error);
  }
  if (message.content.toLowerCase().startsWith(config.prefix + "baro")) {
  const api = "https://api.warframestat.us/pc"
    snekfetch.get(api).then(r => {
    var voidTrader = r.body.voidTrader
    var voidstart = voidTrader.startString.replace(/40s/, "")
  if (voidTrader.active != true)
    message.channel.send({embed: {
    color: 49663,
    author: {
      name: voidTrader.character,
    },
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": client.user.username
    },
    title: "Location:",
    description: voidTrader.location,
    fields: [{
        name: "Arrival:",
        value: voidstart
      }]
  }
                           });
  else if (voidTrader.active == true)
    message.channel.send({embed: {
    color: 49663,
    author: {
      name: voidTrader.character,
    },
    "footer": {
      "icon_url": client.user.avatarURL,
      "text": client.user.username
    },
    title: "Location:",
    description: voidTrader.location,
    fields: [
    {
        name: "Expiration:",
        value: voidTrader.endString
    },
    {
    	  name: "Inventory:",
      	value: voidTrader.inventory
    }
      ]
  }
                           });
                           })
                            }
});

//Sends a oof gif when someone starts a message with "oof"
client.on("message", (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("oof")) {
    message.channel.send({
      embed: {
        "color": 2588365,
        "image": {
        "url": "https://media1.tenor.com/images/68b4a3e2a4bded23f88bba28223c81a1/tenor.gif"
    },
        },
    });
  }
});

//I am a noob
client.on('message', (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("i am")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/i am/gi, "");
    message.channel.send(message1 + name + message2);
  }
});

//Im a noob
client.on('message', (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("im")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/im/gi, "");
    message.channel.send(message1 + name + message2);
  }
});

//I'm a noob
client.on('message', (message) => {
  if (message.author.bot) return; // this blocks the bot from responding to other bots
  if (message.channel.type === "dm") return; // this prevents dm commands
  if (message.content.toLowerCase().startsWith("i'm")) {
    var message1 = "Hello";
    var message2 = ", my name is Scrubstep.";
    var name = message.content.replace(/i'm/gi, "");
    message.channel.send(message1 + name + message2);
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
        "color": 16711680,
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