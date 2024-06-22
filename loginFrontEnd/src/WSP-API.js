// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBO0bfmYHdp2AJnM1izzz6qyFw0ZBrBmE91YiiT9YGkKsucPDUuvGqDW947Q6VQcv6Q1kaFSTUogSp4XvUBEUPgJGx52vFwdmp4ZBRifpKD4evYZBIc3UGN8WDB8xP4KcMgoZB0HfDXbOpE4ZAbUstCnfEhhwPRT75GZAiZAy3VuTnqEn23NphhABrmpfPFr4vWy7FQSrT9nLB8cp2D0EUhZBvhZAUZD'
const version = 'v20.0'

const url = 'https://graph.facebook.com/' + version + '/' + phone_id + '/messages'

function sendNotification(phone, deliveryType, language) {
    const templates = {
        'delivery': 'delivery_arrived',
        'package': 'package_arrived',
        'mail': 'mail_arrived'
    };

    const messageTemplate = templates[deliveryType];

    const message = {
        'messaging_product':'whatsapp',
        'to': phone,
        'type': 'template',
        'template': {
            'name': messageTemplate,
            language: { code: language }
        }
    }
    
    const request = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message),
        json: true
    };
    
    return fetch(url, request)
        .then(response => response.json())
        .then(res => {
            // console.log(res)
            return res;
        })
        .catch(error => {
            console.error(error)
            throw error;
        });
}

export { sendNotification };