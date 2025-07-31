const connection = require("../models/db");

// fungsi untuk menyimpan listAkun ke database listAkun

const saveListAkun = async (listAkun) => {
  try {
    const sql = `
        INSERT INTO listakun (client_account, platform, kategori, username)
        values (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            client_account = IF(
                        FIND_IN_SET(VALUES(client_account), client_account) > 0, 
                        client_account, 
                        CONCAT_WS(',', client_account, VALUES(client_account))
                    ),
            platform = VALUES(platform),
            kategori = IF(
                        FIND_IN_SET(VALUES(kategori), kategori) > 0, 
                        kategori, 
                        CONCAT_WS(',', kategori, VALUES(kategori))
                    ),
            username = VALUES(username)
    `;
    connection.query(
      sql,
      [
        listAkun.client_account,
        listAkun.platform,
        listAkun.kategori,
        listAkun.username,
      ],
      (err, result) => {
        if (err) {
          console.error(
            `Error saving listAkun ${listAkun.username} to database:`,
            err.message
          );
        } else {
          consoler.log(`Saved listAkun ${listAkun.username} to database`);
        }
      }
    );
  } catch (error) {
    console.error("Error saving listAkun to database:", error);
  }
};

const saveDataUser = async (kategori, platform, startDate, endDate) => {
  try {
    console.log(startDate, endDate);
    if (typeof startDate === "string") startDate = new Date(startDate);
    if (typeof endDate === "string") endDate = new Date(endDate);

    if (isNaN(startDate) || isNaN(endDate)) {
      throw new Error("Invalid startDate or endDate");
    }

    const [accounts] = await connection.query(
      "SELECT * FROM listakun WHERE kategori = ? AND platform = ?",
      [kategori, platform]
    );

    const dates = [];
    for (
      let dt = new Date(startDate);
      dt <= endDate;
      dt.setDate(dt.getDate() + 1)
    ) {
      dates.push(new Date(dt).toISOString().split("T")[0]);
    }

    console.log(
      `Processing ${accounts.length} accounts for ${dates.length} dates.`
    );

    // Use individual inserts instead of bulk insert with ON DUPLICATE KEY UPDATE
    const insertSqlDaily = `
      INSERT INTO fairscoresdaily (list_id, kategori, platform, username, date)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
          kategori = VALUES(kategori),
          platform = VALUES(platform),
          username = VALUES(username),
          date = VALUES(date)
    `;

    const insertSqlMonthly = `
      INSERT INTO fairscoresmonthly (list_id, kategori, platform, username, date)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
          kategori = VALUES(kategori),
          platform = VALUES(platform),
          username = VALUES(username),
          date = VALUES(date)
    `;

    let dailyAffectedRows = 0;
    let monthlyAffectedRows = 0;

    for (const account of accounts) {
      for (const date of dates) {
        const values = [
          account.list_id,
          account.kategori,
          account.platform,
          account.username,
          date,
        ];

        const [resultDaily] = await connection.query(insertSqlDaily, values);
        const [resultMonthly] = await connection.query(
          insertSqlMonthly,
          values
        );

        dailyAffectedRows += resultDaily.affectedRows;
        monthlyAffectedRows += resultMonthly.affectedRows;
      }
    }

    console.log(`Daily Rows affected: ${dailyAffectedRows}`);
    console.log(`Monthly Rows affected: ${monthlyAffectedRows}`);
  } catch (error) {
    console.error("Error saving user data to fairscoresdaily:", error.message);
  }
};

module.exports = {
  saveListAkun,
  saveDataUser,
};
