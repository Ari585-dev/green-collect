import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service'; // importa NotificationsService
import { connection } from '../../config/database.connection'; // tu conexión MySQL

@Injectable()
export class RequestsService {
  constructor(private notificationsService: NotificationsService) {}

  async createRequest(data: any) {
    const { user_id, residue_type, company_name, scheduled_date, weight_kg } = data;

    if (!user_id || !residue_type || !company_name || !scheduled_date || !weight_kg) {
      throw new Error('Todos los campos son requeridos');
    }

    const formattedScheduledDate = new Date(scheduled_date).toISOString().slice(0, 19).replace('T', ' ');

    // 1. Insertamos la solicitud
    await connection.promise().query(
      `INSERT INTO collection_requests 
        (user_id, scheduled_date, weight_kg, residue_type, company_name) 
        VALUES (?, ?, ?, ?, ?);`,
      [user_id, formattedScheduledDate, weight_kg, residue_type, company_name]
    );

    // 2. Buscamos el número de teléfono del usuario
    const [rows]: any = await connection.promise().query(
      'SELECT phone_number FROM users WHERE id = ?;',
      [user_id]
    );

    if (rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const phone = rows[0].phone_number;
    const msg= `Se ha recibido tu petición de recolección para el día ${formattedScheduledDate}, recoger residuo: ${residue_type}, peso: ${weight_kg}kg`
    
    await this.notificationsService.sendWhatssappMessage({ phone, msg });
    return { message: 'Solicitud de recolección creada exitosamente y mensaje enviado' };
  }

  async getMyRequests(userId: number) {
    const [requests] = await connection.promise().query(
      `SELECT id, user_id, residue_type, company_name, scheduled_date, status, weight_kg 
       FROM collection_requests 
       WHERE user_id = ? 
       ORDER BY scheduled_date DESC`,
      [userId]
    ) as any[];

    return requests;
  }
}
