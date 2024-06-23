// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBOze4eZCpJrlfZC8zWbhBcqs9a0ZBiGBqe9j2kfFjNSqNcNuwWAIWZBNho30d5x48pqSa1K2ZCxQdGpgSye5E0R3rAgcdudiJVX2hVpHNFmPH1UyiU69Vr7lCdelIZAzuotfLIC9ZBeUcWpYmJwGZCz7bkH9MlaabRUG6v6ZCn1AdsWbUMUB1LhKZCgZCED95FQpcV76KGkHZAlTH43Gay9OTyZCQtX0sZD'
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