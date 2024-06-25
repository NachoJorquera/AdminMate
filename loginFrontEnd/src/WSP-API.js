// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBO6vwTkqtVwKrXVSMAdFgqEvqxps1TNl9Nc8GZCZBrgHZAhplZBKa3to8UaD1tIL7ndS1gqfZAsUYxSw6i6xTRCilFOQ9JcBOZCEwdTvMu8qQFFRassr4QWDbapwcRCvvAY4RCSCZCP0b5neVHNlK0CmZCv7rR5rlxM3K7Cu6lIa8h8ppkD4VtmOq43WaZBvjkcHxN9oRpMGZBNr5iFOMTLQZAlGnAsZD'
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