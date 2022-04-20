const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const cn = require("../database");


router.get("/", (req, res) => {

    cn.query("SELECT * FROM employee", (err, rows, fields) => {
        if (!err) {

            return res.status(201).json(rows);
        } else {
            return err
        }
    })

})



router.get("/:id", (req, res) => {
    const { id } = req.params
    cn.query("SELECT * FROM employee WHERE id = ?", [id], (err, rows, fields) => {
        if (!err) {
            return res.json(rows[0]);
        } else {
            return res.json({ message: err })
        }
    })
})


router.post("/", (req, res) => {

    const { id, name, salary } = req.body;

    console.log(id, name, salary);

    const query = `
        SET @id = ?;
        SET @name = ?;
        SET @salary = ?;

        CALL employeeAddOrEdit(@id,@name,@salary)
    `;

    cn.query(query, [id, name, salary], (err, rows, fields) => {
        if (!err) {
            return res.status(201).json({ status: "Empleado ingresado ok" });
        } else {
            return res.status(500).json({ message: err })
        }
    })
})

router.put("/:id", (req, res) => {

    const { id } = req.params
    const { name, salary } = req.body

    const query = `
    SET @id = ?;
    SET @name = ?;
    SET @salary = ?;

    CALL employeeAddOrEdit(@id,@name,@salary)
    `;

    cn.query(query, [id, name, salary], (err, rows, fields) => {
        if (!err) {
            return res.json({
                message: "Empleado actualizado",
                data: rows[0]
            });
        } else {
            res.json({ message: err })
        }
    })

})


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    cn.query("DELETE FROM employee WHERE id = ? ", [id], (err, rows, fields) => {
        if (!err) {
            return res.status(200).json({
                message: "Empleado eliminado",
                data: rows[0]
            });
        } else {
            res.json({ message: err })
        }
    })
})

module.exports = router;