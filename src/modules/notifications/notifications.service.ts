import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationsService {
    sendWhatssappMessage(data:any) {
        const phone = data.phone;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNumber = process.env.TWILIONUMBER; // Asegúrate de que sea un número válido de Twilio
        const client = Twilio(accountSid, authToken);
        const userPhone= process.env.TWILIO_PHONE_NUMBER;

        client.messages
            .create({
                body: 'Mensaje de prueba desde NestJS',
                from: `whatsapp:+14${twilioNumber}`,
                to: `whatsapp:+57${phone}`,
            })
            .then(message => console.log('Mensaje enviado:', message.sid))
            .catch(error => console.error('Error enviando mensaje:', error));
    }
}
