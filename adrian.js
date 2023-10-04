/*
   Created By sfBotDev
   My Contact wa.me/6289513081052
   Rxzy-MD V1.1.0
*/

require('./settings')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc')
const { default: sfBotConnect, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@WhiskeySockets/Baileys")
         
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
async function startAdrian() {
    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(`./session`)

    const sfBot = sfBotConnect({
        logger: pino({
            level: 'silent'
        }),
        printQRInTerminal: true,
        browser: ['SF-MDV1.1', 'Safari', '1.0.0'],
        patchMessageBeforeSending: (message) => {

            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        auth: state
    })

    store.bind(sfBot.ev)
    
    // anticall auto block
    sfBot.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    let pa7rick = await sfBot.sendContact(callerId, global.owner)
    sfBot.sendMessage(callerId, { text: `*Sistem otomatis block!*\n*Jangan menelpon bot*!\n*Silahkan Hubungi Owner Untuk Dibuka !*`}, { quoted : pa7rick })
    await sleep(8000)
    await sfBot.updateBlockStatus(callerId, "block")
    }
    })

    sfBot.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return
            if (!sfBot.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            if (mek.key.id.startsWith('FatihArridho_')) return
            m = smsg(sfBot, mek, store)
            require("./sfBot")(sfBot, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

// detect group update
	sfBot.ev.on("groups.update", async (json) => {
			console.log(json)
			const res = json[0];
			    try {
                    ppgroup = await sfBot.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://tinyurl.com/yx93l6da'
                }
			if (res.announce == true) {
				await sleep(2000)
				let a = `「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admin can send messages !`
				sfBot.sendMessage(res.id, {
                    text: a, 
                    contextInfo: {
                        externalAdReply: {
                            title: `${namabot}`,
                            body: `${namaowner}`,
                            thumbnailUrl: ppgroup,
                            sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }
            );
			} else if (res.announce == false) {
				await sleep(2000)
				let a = `「 Group Settings Change 」\n\nGroup has been opened by admin, Now participants can send messages !`
				sfBot.sendMessage(res.id, {
                    text: a, 
                    contextInfo: {
                        externalAdReply: {
                            title: `${namabot}`,
                            body: `${namaowner}`,
                            thumbnailUrl: ppgroup,
                            sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }
            );
			} else if (res.restrict == true) {
				await sleep(2000)
				let a = `「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !`
				sfBot.sendMessage(res.id, {
                    text: a, 
                    contextInfo: {
                        externalAdReply: {
                            title: `${namabot}`,
                            body: `${namaowner}`,
                            thumbnailUrl: ppgroup,
                            sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }
            );
			} else if (res.restrict == false) {
				await sleep(2000)
				let anu = `「 Group Settings Change 」\n\nGroup info has been opened, Now participant can edit group info !`
				sfBot.sendMessage(res.id, {
                    text: a, 
                    contextInfo: {
                        externalAdReply: {
                            title: `${namabot}`,
                            body: `${namaowner}`,
                            thumbnailUrl: ppgroup,
                            sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }
            );
			} else if(!res.desc == ''){
				await sleep(2000)
				let a = `「 Group Settings Change 」\n\n*Group desk has been changed to*\n\n${res.desc}`
				sfBot.sendMessage(res.id, {
                    text: a, 
                    contextInfo: {
                        externalAdReply: {
                            title: `${namabot}`,
                            body: `${namaowner}`,
                            thumbnailUrl: ppgroup,
                            sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }
            );
            } else {
				await sleep(2000)
				let a = `「 Group Settings Change 」\n\n*Group Subject has been changed to*\n\n*${res.subject}*`
				sfBot.sendMessage(res.id, {
                    text: a, 
                    contextInfo: {
                        externalAdReply: {
                            title: `${namabot}`,
                            body: `${namaowner}`,
                            thumbnailUrl: ppgroup,
                            sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                });
			}
        });
	 
        sfBot.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await sfBot.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await sfBot.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://tinyurl.com/yx93l6da'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await sfBot.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://tinyurl.com/yx93l6da'
                }
               if (anu.action == 'add') {
                 let a = `Hallo @${num.split("@")[0]}, Selamat Datang Di ${metadata.subject} Semoga betah`
                    sfBot.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
                } else if (anu.action == 'remove') {
                    let a = `Sayonaraa @${num.split("@")[0]} jangan balik lagi ya`
      sfBot.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
                } else if (anu.action == 'promote') {
                    let a = `Congratulations @${num.split("@")[0]}, anda telah menjadi admin di ${metadata.subject} 🎉`
                    sfBot.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
                } else if (anu.action == 'demote') {
                    let a = `nice try @${num.split("@")[0]}, anda bukan admin lagi di ${metadata.subject}`
                    sfBot.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://chat.whatsapp.com/DIngmG5O8W53nsHevEPXhS",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
              }
            }
        } catch (err) {
            console.log("Eror Di Bagian Welcome Group "+err)
        }
    })
    
    	
   
    sfBot.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    sfBot.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = sfBot.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    sfBot.getName = (jid, withoutContact = false) => {
        id = sfBot.decodeJid(jid)
        withoutContact = sfBot.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = sfBot.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === sfBot.decodeJid(sfBot.user.id) ?
            sfBot.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    sfBot.public = true

    sfBot.serializeM = (m) => smsg(sfBot, m, store)

    sfBot.ev.on('connection.update', async (update) => {
        const {
            connection,
            lastDisconnect
        } = update
        try {
            if (connection === 'close') {
                let reason = new Boom(lastDisconnect?.error)?.output.statusCode
                if (reason === DisconnectReason.badSession) {
                    console.log(`Bad Session File, Please Delete Session and Scan Again`);
                    startAdrian()
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log("Connection closed, reconnecting....");
                    startAdrian();
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log("Connection Lost from Server, reconnecting...");
                    startAdrian();
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                    startAdrian()
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(`Device Logged Out, Please Scan Again And Run.`);
                    startAdrian();
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...");
                    startAdrian();
                } else if (reason === DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...");
                    startAdrian();
                } else sfBot.end(`Unknown DisconnectReason: ${reason}|${connection}`)
            }
            if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
                console.log(`[Sedang mengkoneksikan]`)
            }
            if (update.connection == "open" || update.receivedPendingNotifications == "true") {
                console.log(`[Connecting to] WhatsApp web`)
                console.log(`[Connected] ` + JSON.stringify(sfBot.user, null, 2))
            }

        } catch (err) {
            console.log('Error Di Connection.update ' + err)
            startAdrian();
        }

    })

    sfBot.ev.on('creds.update', saveCreds)

    sfBot.sendText = (jid, text, quoted = '', options) => sfBot.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    sfBot.sendTextWithMentions = async (jid, text, quoted, options = {}) => sfBot.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    sfBot.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await sfBot.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    sfBot.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await sfBot.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    sfBot.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    sfBot.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    return sfBot
}

startAdrian()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})