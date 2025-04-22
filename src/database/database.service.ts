import { Injectable } from '@nestjs/common';
import connection from '../config/database.connection';

@Injectable()
export class DatabaseService {
  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      connection.query(query, (err, results) => {
        if (err) {
          reject('❌ Error consulting Users: ' + err.message);
        } else {
          resolve(results);
        }
      });
    });
  }
}
