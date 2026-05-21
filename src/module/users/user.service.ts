import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserService = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)
     RETURNING 
    id, name, email, role, created_at, updated_at
        `,
    [name, email, password, role],
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

  const matchPassword = password === user.password;

  if (!matchPassword) {
    throw new Error("Invalid  password");
  }
  return {
    id: user.id,
    name: user.name,
    email: user.emai,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

export const UserServise = {
  createUserService,
  loginUserService,
};
