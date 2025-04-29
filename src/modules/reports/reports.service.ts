import { Injectable } from '@nestjs/common';
import { connection } from '../../config/database.connection'; // tu conexión MySQL

@Injectable()
export class ReportsService {
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
