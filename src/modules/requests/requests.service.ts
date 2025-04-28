import { Injectable } from '@nestjs/common';
import connection from 'src/config/database.connection';

@Injectable()
export class RequestsService {
  async createRequest(data: any) {
    const { user_id, residue_type, company_name, scheduled_date, weight_kg } = data;

    if (!user_id || !residue_type || !company_name || !scheduled_date || !weight_kg) {
      throw new Error('Todos los campos son requeridos');
    }


    const formattedScheduledDate = new Date(scheduled_date).toISOString().slice(0, 19).replace('T', ' ');

    await connection.promise().query(
      `INSERT INTO collection_requests 
        (user_id, scheduled_date, weight_kg, residue_type, company_name) 
        VALUES (?, ?, ?, ?, ?);`,
      [user_id, formattedScheduledDate, weight_kg, residue_type, company_name]
    );

    return { message: 'Solicitud de recolección creada exitosamente' };
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
