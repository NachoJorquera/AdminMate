// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBO076hC0tZA7uzUQ5T4KTShmGnIjnHThIC2ZBO2rR7nrpqURDi1jxJWyORTScHoEaAAZBbZCo9zykUZAZBmmrBxfIZANpNN9lQcG0EnEw3i7Gl5bc2LW3uZCAOGHwVX5ZBqwFNwvj12JSEMyBL6Y2tcZCnd6kp3xaZBFr8CDJICYPkpcZC9R3JmlXH2oYflb936nOSVPFEnP81q8uPC7njYSYJy02g0oZD'
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