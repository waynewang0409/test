import {db} from "../db.js";

export const addTest = (_, res) => {

    return res.status(200).json("addTest ok");

};

export const updateTest = (req, res) => {

    return res.status(200).json("updateTest ok");

};

export const deleteTest = (req, res) => {

    return res.status(200).json("deleteTest ok");

};

export const insertTest = (req, res) => {

    return res.status(200).json("insertTest ok");

};

export const getTest = (_, res) => {

    var strSQL = "Select * From Employee";

    db.query(strSQL, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.status(200).json(data);
        }
    });

};

export const getAllEmployees = (_, res) => {

    var strSQL = "Select * From Employee";

    db.query(strSQL, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.status(200).json(data);
        }
    });

};

export const getEmployee = (req, res) => {

    const strSQL = "Select * From Employee Where ID=?";

    db.query(strSQL, [req.query.id], (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.status(200).json(data);
        }
    });

    

};