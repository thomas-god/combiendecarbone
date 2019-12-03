const { pool } = require('./db_utils');
const { resetDB, populateDB } = require('./db_utils');

async function getAllGes(res) {
    let conn;
    res.setHeader('Content-Type', 'application/json');
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * from gesRoute;");
        res.write(JSON.stringify(rows));
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.statusMessage = 'Internal server error occured.'
    } finally {
        res.end();
        if (conn) return conn.release();
    }
}

async function getSingleGes(res, id) {
    let conn;
    res.setHeader('Content-Type', 'application/json');
    try {
        conn = await pool.getConnection();
        const row = await conn.query("SELECT * FROM gesRoute WHERE id = ?", [id]);
        if (row.length == 1) {
            res.write(JSON.stringify(row))
        } else {
            res.body = '';
            res.statusCode = 404;
            res.statusMessage = 'Requested Id not found.'
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.statusMessage = 'Internal server error occured.'
    } finally {
        res.end();
        if (conn) return conn.release();
    }
}

async function addSingleGes(body, res) {
    let conn;
    let params = JSON.parse(body);
    try {
        conn = await pool.getConnection();
        let keys = ["name", "name_short", "intensity_g_km", "source_name", "source_url"];
        let vals = getCorrectKeysOrder(params, keys);
        const rows = await conn.query(`
            INSERT INTO gesRoute 
            (name, name_short, intensity_g_km, source_name, source_url)
            VALUES ?;`,
            [vals]
        );
        res.statusCode = 204;
    } catch (err) {
        console.log(err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.statusCode = 409;
            res.statusMessage = 'Error, trying to insert a record that already exists.'
        } else {
            res.statusCode = 500;
            res.statusMessage = 'Internal servert error occured, sorry.'
        }
    } finally {
        res.end();
        if (conn) return conn.release();
    }
}

async function deleteSingleGes(res, id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const row = await conn.query("DELETE FROM gesRoute WHERE id=?", [id]);
        if (row.affectedRows == 0) {
            res.statusCode = 404;
            res.statusMessage = 'Requested id not found.'
        } else {
            res.statusCode = 204;
        }
    } catch (err) {
        console.log(err)
    } finally {
        res.end();
        if (conn) return conn.release();
    }
}

function getCorrectKeysOrder(params, keys) {
    let val = [];
    for (let idx = 0; idx < keys.length; idx++) {
        val.push(params[keys[idx]] === undefined ? '' : params[keys[idx]])
    }
    return val;
}

module.exports = {
    getAllGes: getAllGes,
    addSingleGes: addSingleGes,
    getSingleGes: getSingleGes,
    deleteSingleGes: deleteSingleGes
}
