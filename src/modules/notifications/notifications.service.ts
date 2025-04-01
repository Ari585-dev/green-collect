import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {

    sendWhatssappMessage() {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilionumber = process.env.TWILIONUMBER
        const content_sid = process.env.CONTENT_SID
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: 'Mensaje de prueba',
                from: `whatsapp:+14${twilionumber}`,
                contentSid: content_sid,
                to: 'whatsapp:+573107511845'
            })
            .then(message => console.log(message.sid))
          
    }
}
