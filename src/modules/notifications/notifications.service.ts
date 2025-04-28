import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationsService {
    async sendWhatssappMessage(data: { phone: string, msg: string }) {
        const { phone, msg } = data;
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNumber = process.env.TWILIONUMBER; // ¡Asegúrate que esté bien en .env!

        const client = Twilio(accountSid, authToken);

        try {
            const message = await client.messages.create({
                body: msg,
                from: `whatsapp:+14${twilioNumber}`,
                to: `whatsapp:+57${phone}`,
            });
            console.log('Mensaje enviado:', message.sid);
        } catch (error) {
            console.error('Error enviando mensaje:', error);
        }
    }
}
