import { Injectable } from '@nestjs/common';
import { connection } from '../../config/database.connection'; // tu conexión MySQL

@Injectable()
export class ReportsService {
  async getMyReport(userId: number, startDate: string, endDate: string) {
    
    const [requests] = await connection.promise().query(
      `SELECT scheduled_date, status, weight_kg, residue_type, company_name, weight_kg as points
       FROM collection_requests 
       WHERE user_id = ? AND scheduled_date between ? and ?
       ORDER BY scheduled_date DESC`,
      [userId, startDate, endDate]
    ) as any[];

    return requests;
  }
}
