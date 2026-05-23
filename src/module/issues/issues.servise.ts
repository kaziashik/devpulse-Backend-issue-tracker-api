import { pool } from "../../db";
import type { Iissues } from "./issues.interface";

const createIssueService = async (paylod: Iissues, reporter_id: number) => {
  const { title, description, type } = paylod;

  const userVeryfy = await pool.query(
    `
    SELECT id FROM users WHERE id=$1
    `,
    [reporter_id],
  );

  if (userVeryfy.rows.length === 0) {
    return null;
  }

  const result = await pool.query(
    `
        INSERT INTO issues (title,description,type,reporter_id) 
        VALUES($1, $2,$3,$4 ) RETURNING *
        
        `,
    [title, description, type, reporter_id],
  );
  return result.rows[0];
};

const getAllIssueServise = async (query: {
  sort?: string;
  type?: string;
  status?: string;
}) => {
  const { sort = "newest", type, status } = query;

  let sql = `
  SELECT *
  FROM issues
  WHERE 1=1
  `;

  const values = [];

  if (type) {
    values.push(type);

    sql += `
    AND type = $${values.length}
    `;
  }

  if (status) {
    values.push(status);

    sql += `
    AND status =
    $${values.length}
    `;
  }

  sql += `
  ORDER BY
  created_at
  `;

  sql += sort === "oldest" ? "ASC" : "DESC";

  const result = await pool.query(sql, values);

  const issues = await Promise.all(
    result.rows.map(async (issue) => {
      const reporter = await pool.query(
        `
          SELECT
          id,
          name,
          role
          FROM users
          WHERE id=$1
          `,
        [issue.reporter_id],
      );

      return {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,
        reporter: reporter.rows[0],
        created_at: issue.created_at,
        updated_at: issue.updated_at,
      };
    }),
  );

  return issues;
};

const getIssuesByIdServise = async (id: number) => {
  const issueResult = await pool.query(
    `
    SELECT *
    FROM issues
    WHERE id = $1
    `,
    [id],
  );

  const issue = issueResult.rows[0];

  if (!issue) {
    return null;
  }

  const reporterResult = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id = $1
    `,
    [issue.reporter_id],
  );

  const reporter = reporterResult.rows[0];

  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporter,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
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

const updateIssueStatusService = async (
  id: number,

  status: string,
) => {
  const result = await pool.query(
    `
UPDATE issues
SET
status=$1,
updated_at=
NOW()
WHERE id=$2
RETURNING *
`,
    [status, id],
  );
  if (result.rows.length === 0) {
    return null;
  }
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

const getMetricsService = async () => {
  const totalIssues = await pool.query(`SELECT COUNT(*) FROM issues`);

  const openIssues = await pool.query(
    `SELECT COUNT(*) FROM issues WHERE status='open'`,
  );

  const inProgressIssues = await pool.query(
    `SELECT COUNT(*) FROM issues WHERE status='in_progress'`,
  );

  const resolvedIssues = await pool.query(
    `SELECT COUNT(*) FROM issues WHERE status='resolved'`,
  );

  const totalUsers = await pool.query(`SELECT COUNT(*) FROM users`);

  return {
    total_users: Number(totalUsers.rows[0].count),
    total_issues: Number(totalIssues.rows[0].count),
    open_issues: Number(openIssues.rows[0].count),
    in_progress_issues: Number(inProgressIssues.rows[0].count),
    resolved_issues: Number(resolvedIssues.rows[0].count),
  };
};

export const issuesServise = {
  createIssueService,
  getAllIssueServise,
  getIssuesByIdServise,
  updateIssueServise,
  deleteIssueService,
  updateIssueStatusService,
  getMetricsService,
};
