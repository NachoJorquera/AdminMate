// const phone = '56973869648'
const phone_id = '351028438091698'
const token = 'EAAOUFh6fl5MBOwQypniVNZCneR5bskDe09gHeeb9Cy1hQy50byu2frghoUZCZBcVOkfVzI8BNW0hBcZASOeg1ZBiZAUhFrrUuSAdAWAdTmnPBHl0ZAGaIYL1H60DV6w18i1g3ZBtkiq8FS70QzufF4WrLeVxl0bB5jkzVHAP0yBtU6IfQnYTWCUq2wSvZBxF9TZBE8kD9MUU17QuDEZAIZA3HRfEPlK8gRSWd9BBl0YZD'
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