const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.GES_DB_HOST,
    port: 3306,
    user: process.env.GES_USER,
    password: process.env.GES_PWD,
    database: process.env.GES_DB,
    multipleStatements: true
});

async function resetDB() {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query(`
            DROP TABLE IF EXISTS gesRoute;
            CREATE TABLE IF NOT EXISTS gesRoute (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(128) NOT NULL UNIQUE,
                name_short CHAR(50) NOT NULL UNIQUE,
                intensity_g_km FLOAT NOT NULL,
                source_name VARCHAR(128),
                source_url TEXT,
                source_date DATE DEFAULT NULL,
                PRIMARY KEY (id)
            );

            CREATE OR REPLACE FUNCTION isStringNull (str TEXT) RETURNS INT RETURN
                (SELECT UPPER(TRIM(str)) IN ('NULL', ''));

            CREATE TRIGGER setCurdateStrNull BEFORE INSERT ON gesRoute
            FOR EACH ROW
            BEGIN
                IF NEW.source_date is NULL THEN
                    SET NEW.source_date = CURDATE();
                END IF;
                IF isStringNull(NEW.source_name) = 1 THEN
                    SET NEW.source_name = NULL;
                END IF;
                IF isStringNull(NEW.source_url) = 1 THEN
                    SET NEW.source_url = NULL;
                END IF;
            END;
        `)
        console.log(`Table gesRoute created in database ${process.env.GES_DB}.`);
    } catch (err) {
        console.log(err)
    } finally {
        if (conn) return conn.release();
    }
}

async function populateDB() {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = conn.query(`
            INSERT INTO gesRoute (name, name_short, intensity_g_km)
            VALUES 
                ('Voiture électrique', 'voiture_elec', 10),
                ('Voiture essence', 'voiture_essence', 150),
                ('Vélo', 'velo', 1);
        `);
        console.log(`Table gesRoute from DB ${process.env.GES_DB} was populated with dummy data.`);
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.release();
    }
}

module.exports = {
    resetDB: resetDB,
    populateDB: populateDB,
    pool: pool
};