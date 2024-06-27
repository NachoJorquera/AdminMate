// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBO6zs6b914qZBtw2HZB3UhPZCyJU0fG7XEAy6YBkFGVP6jDr3uYELsK7JX3oDuuToxthoe8yEaPLRZAHL3By9Jhj8ueZB18fYgbmE7YiIPPbytluAlDLLEbMIq13iZBaJc6nun3wEnsvqL3ocVbGS9GK7KV2MnNAJXib9dudHntHQZBrM5ZA3R7YFL0vOUqerh73BZAHZCXEUmLL3yIeUiZAWMdxAw6p'
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