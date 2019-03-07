const mariadb = require('mariadb');
var POOL = require('../config/config').POOL;
const pool = mariadb.createPool(POOL);


// const mariadb = require('mariadb');
// const pool = mariadb.createPool({ host: 'mydb.com', user: 'myUser' });
// pool
//     .query("SELECT NOW()")
//     .then(rows => {
//         console.log(rows); //[ { 'NOW()': 2018-07-02T17:06:38.000Z }, meta: [ ... ] ]
//     })
//     .catch(err => {
//         //handle error
//     });

function getProvince(req, res) {

    pool.getConnection()
        .then(conn => {
            console.log('conxecion', conn.threadId);

            conn.query("CALL getProvince(?)", 'B')
                .then(rows => {
                    console.log(rows); //[ { 'NOW()': 2018-07-02T17:06:38.000Z }, meta: [ ... ] ]
                    conn.end();
                    return res.status(200).json({
                        ok: true,
                        rows
                    });
                })
                .catch(err => {

                    return res.status(200).json({
                        ok: true,
                        err
                    });

                });

            // pool
            // //.query("SELECT * FROM province")
            //     .query("CALL getProvince(?)", 'B')
            //     .then(rows => {
            //         console.log(rows); //[ { 'NOW()': 2018-07-02T17:06:38.000Z }, meta: [ ... ] ]
            //         res.status(200).json({
            //             ok: true,
            //             rows
            //         });
            //     })
            //     .catch(err => {

            //         return res.status(200).json({
            //             ok: true,
            //             err
            //         });

            //     });
        });

}


module.exports = {
    getProvince
};