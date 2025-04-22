import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import connection from 'src/config/database.connection';

@Injectable()
export class AuthService {
  async register(data: any) {
    const { name, email, password, phone_number, address, locality } = data;

    const [user] = await connection.promise().query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as any[];

    if (user.length > 0) {
      throw new Error('El correo ya está registrado');
    }

    const hash = await bcrypt.hash(password, 10);
    await connection.promise().query(
      `INSERT INTO users (name, email, password_hash, phone_number, address, locality, role) VALUES (?, ?, ?, ?, ?, ?, 'USER')`,
      [name, email, hash, phone_number, address, locality]
    );

    return { message: 'Usuario registrado correctamente' };
  }

  async login(data: any) {
    try {
      const { email, password } = data;
  
      const [user] = await connection.promise().query(
        'SELECT id, name, email, phone_number, role, password_hash FROM users WHERE email = ?',
        [email]
      ) as any[];
  
      if (user.length === 0) {
        throw new Error('Credenciales incorrectas');
      }
  
      // Comparamos passwd con hash
      const valid = await bcrypt.compare(password, user[0].password_hash);
      if (!valid) {
        throw new Error('Credenciales incorrectas');
      }
  
      // Token JWT
      const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
  
      return {
        message: 'Login exitoso',
        user: {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          role: user[0].role,
          phone_number: user[0].phone_number
        }
      };
    } catch (error) {
      throw new Error(`Error en el login: ${error.message}`);
    }
  }
  
}
