import { pool } from "../../db";
import type { Iissues } from "./issues.interface";

const createIssueService = async (paylod: Iissues) => {
  console.log("checking issue creat", paylod);

  const { title, description, type, reporter_id } = paylod;

  const result = await pool.query(
    `
        INSERT INTO issues (title,description,type,reporter_id) 
        VALUES($1, $2,$3,$4 ) RETURNING *
        
        `,
    [title, description, type, reporter_id],
  );

  return result.rows[0];
};

const getAllIssueServise = async () => {
  const result = await pool.query(`
        SELECT * FROM issues
        
        `);
  return result.rows;
};

const getIssuesByIdServise = async (id: number) => {
  const result = await pool.query(
    `
        SELECT * FROM issues  WHERE id=$1
        
        `,
    [id],
  );

  return result.rows[0];
};

const updateIssueServise = async (paylod: Iissues, id: number) => {
  const { title, description, type } = paylod;

  const result = await pool.query(
    `
        UPDATE issues  SET 
        title=COALESCE($1,title),
        description=COALESCE($2,description),
        type=COALESCE($3,type),
        updated_at = NOW() WHERE id=$4
        RETURNING *
        
        `,
    [title, description, type, id],
  );

  return result.rows[0];
};

const deleteIssueService = async (id: number) => {
  const result = await pool.query(
    `
        DELETE FROM issues  WHERE id=$1
        RETURNING *`,
    [id],
  );

  return result.rows[0];
};

export const issuesServise = {
  createIssueService,
  getAllIssueServise,
  getIssuesByIdServise,
  updateIssueServise,
  deleteIssueService,
};
