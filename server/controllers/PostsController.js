'use strict'
const express = require('express')
require('dotenv').config()
const db = require('../lib/db')

exports.postadd = (req, res, next) =>{
    const title = req.body.title
    const text = req.body.text
    const visible = req.body.visible
    const creator_id = req.body.creator_id
    db.query(`INSERT INTO posts (title, text, visible, creator_id) VALUES ('${title}','${text}', '${visible}', '${creator_id}')`,
        (err, result) => {
        if(err) {
            return res.status(400).send({
                message: "Ошибка добавления записи"
            })
        } else {
            return res.status(200).send({
                message: "Запись добавлена"
            })
        }

        })
}

exports.deletepost = (req, res, next) =>{
    const delpost_id = req.params.id
    db.query(`DELETE FROM posts WHERE id=?`, delpost_id, (err, result) => {
        if(err){
            return res.status(400).send({
                message: 'Ошибка удаления'
            })
        } else {
            return res.status(200).send({
                message: "Пост успешно удален"
            })
        }
    })
}

exports.moderposts = (req, res, next)=> {
    db.query(`SELECT * FROM posts WHERE in_moderation = 1`, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: "Ошибка сервера"
            })
        }
        if(result) {
            return res.status(200).send({
                posts: result
            })
        }
    })
}

exports.posts = (req, res) =>{
    db.query(`SELECT * FROM posts WHERE in_moderation = 0`, (err, result) =>{
        if(err) {
            return res.status(400).send({
                message: err
            })
        }
        if(result) {
            return res.status(200).send({
                posts: result
            })
        }
    })
}

exports.post = (req, res) =>{
    const post_id = req.params.id
    db.query(`SELECT * FROM posts WHERE id=?`,post_id, (err, result) =>{
        if(err) {
            return res.status(400).send({
                message: err
            })
        }
        if(result) {
            return res.status(200).send({
                post: result
            })
        }
    })
}

exports.moder_good = (req, res) =>{
    const moder_id = req.params.id
    db.query(`SELECT * FROM posts WHERE id=?`, moder_id, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: err
            })
        } else {
            db.query(`UPDATE posts SET result_moder=?, in_moderation=? WHERE id=?`, [1, 0, moder_id], (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: err
                    })
                } else {
                    return res.status(200).send({
                        message: 'Пост успешно одобрен'
                    })
                }
            })
        }
    })
}

exports.moder_bad = (req, res) =>{
    const moder_id = req.params.id
    db.query(`SELECT * FROM posts WHERE id=?`, moder_id, (err, result)=>{
        if(err){
            return res.status(400).send({
                message: err
            })
        }
        if(result.length === 0) {
            return res.status(400).send({
                message: 'Записи с таким id нет'
            })
        } else {
            db.query(`UPDATE posts SET result_moder=?, in_moderation=? WHERE id=?`, [0, 0, moder_id], (err, result)=>{
                if(err){
                    return res.status(400).send({
                        message: err
                    })
                } else {
                    return res.status(200).send({
                        message: 'Пост успешно отклонен'
                    })
                }
            })
        }
    })
}