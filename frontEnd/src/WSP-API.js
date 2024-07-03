// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBO5ZBDGm2FQ7YgZA6zyIlZCeoqrkLjx0h2agoWQRcYWYgrartbZCyHIkF8KrfSMkaQ6VZCjTrezToZCpCTgMFdnBZAX4PgHMq2wMFtgvOKtkJRTQnhdV3uQJMpPd40rNFqFeWaorExa5JjEnYM5CL5ZA0bqPdNkDCgYo9JC3IFDRX48MLoAoeZBKw43j0u7xKdg5We5BG4KBQZA3kZAey7ok43HtK5gZD'
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