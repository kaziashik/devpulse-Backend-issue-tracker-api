import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../../config";

const RegistrationUserService = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hasPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,COALESCE($4, 'contributor'))
     RETURNING 
    id, name, email, role, created_at, updated_at
        `,
    [name, email, hasPassword, role],
  );

  return result.rows[0];
};

const loginUserService = async (paylod: {
  email: string;
  password: string;
}) => {
  const { email, password } = paylod;
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        
        `,
    [email],
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email ");
  }

  const user = result.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid  password");
  }

  const jwtpayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });

  return {
    token: accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const UserServise = {
  RegistrationUserService,
  loginUserService,
};
