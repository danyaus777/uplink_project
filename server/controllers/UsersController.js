'use strict'
const express = require('express')
require('dotenv').config()
const db = require('../lib/db')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    db.query(`SELECT id FROM users WHERE LOWER(email) = LOWER(${req.body.email})`, (err, result) => {
        if (result && result.length) { //error
            return res.status(409).send({
                message: 'Этот email уже используется'
            })
        } else { //email not in use
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) { //error
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    // photo = req.file.buffer.toString('base64')
                    db.query(`INSERT INTO users (name, surname, position, photo, department, manager, role, email,
                    password) VALUES (${db.escape(req.body.name)},
                    ${db.escape(req.body.surname)},
                    ${db.escape(req.body.position)},
                    null,
                    ${db.escape(req.body.department)},
                    ${db.escape(req.body.manager)},
                    ${db.escape(req.body.role)},
                    ${db.escape(req.body.email)},
                    '${hash}')`, (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: err
                            })
                        }
                        return res.status(201).send({
                            message: 'Регистрация прошла успешно'
                        })
                    })
                }
            })
        }
    })
}

exports.login = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE email = ${db.escape(req.body.email)}`, (err, result) => {
        if (err) {
            return res.status(400).send({
                message: err
            })
        }
        if (!result.length) {
            return res.status(400).send({
                message: 'Неверный Email или пароль'
            })
        }
        const validpassword = bcrypt.compareSync(req.body.password, result[0]['password'])
            if (!validpassword) {
                return res.status(400).send({
                    message: 'Неверный Email или пароль'
                })
            }
            if(validpassword) {
                const token = jwt.sign({
                    email: result[0].email,
                    userId: result[0].id,
                    roleId: result[0].role
                }, process.env.SECRETKEY, {expiresIn: "7d"})
                return res.status(200).send({
                    message: 'Вы вошли',
                    token,
                    user: result[0]
                })
            }
        })
}

exports.users = (req, res, next) => {
    db.query(`SELECT * FROM users`, (err, result) => {
        if(err) {
            return res.status(400).send({
                message: err
            })
        }
        if(result) {
            if (req.userData.roleId === "Администратор") {
                return res.status(200).send({
                    users: result
                })
            }else {
                return res.status(400).send({
                    message: "У вас нет прав"
                })
            }
        }
    })
}

exports.user = (req, res, next) => {
    const usid = req.params.id
    db.query(`SELECT * FROM users WHERE id=?`, usid, (Eerr, result) => {
        if(Eerr) {
            return res.status(400).send({
                message: Eerr
            })
        }
        if(result) {
            if (req.userData.roleId === "Администратор") {
                return res.status(200).send({
                    users: result
                })
            }else {
                return res.status(400).send({
                    message: "У вас нет прав"
                })
            }
        }
    })
}

exports.delete = (req, res) => {
    const delid = req.params.id
    db.query(`DELETE FROM users WHERE id=?`,delid,(err,result)=>{
        if(err){
            return res.status(400).send({
                message:err
            })
        } else {
            if (result.affectedRows===0) {
                res.status(400).send({
                    message:"Id не найден"
                })
            }else {
                res.status(200).send({
                    message: "Пользователь удален"
                })
            }
        }
    })
}

exports.update = (req, res) => {
    const updateid = req.params.id
    const name = req.body.name
    const surname = req.body.surname
    const position = req.body.position
    const department = req.body.department
    const manager = req.body.manager
    const role = req.body.role
    const email = req.body.email
    const password = req.body.password
    db.query(`SELECT id FROM users WHERE LOWER(email) = LOWER(email) AND id != updateid`, (err, result) => {
        if (result && result.length) { //error
            return res.status(409).send({
                message: result
            })
        } else { //email not in use
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) { //error
                    return res.status(500).send({
                        message: err
                    })
                } else {
                    const passwordHash = hash
                    db.query(`UPDATE users SET name=?,surname=?, position=?, department=?, manager=?, role=?, email=?, password=?
                    WHERE id=?`, [name, surname, position, department, manager, role, email, passwordHash, updateid], (err, result) => {
                        if (err) {
                            return res.status(400).send({
                                message: "Ошибка обновления"
                            })
                        } else {
                            return res.status(200).send({
                                message: "Данные обновлены"
                            })
                        }
                    })
                }
            })
        }
    })
}
