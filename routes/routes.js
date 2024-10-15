import express from "express";

import { addTest, updateTest, deleteTest, insertTest, getTest, getAllEmployees, getEmployee } from "../controller/audig.js";
import { authentication, verifyTokenTest } from "../controller/userManagement.js";
import { verifyToken } from "../controller/userManagement.js";

const router = express.Router();

router.get("/test/addTest", addTest);
router.get("/test/updateTest", updateTest);
router.get("/test/deleteTest", deleteTest);
router.get("/test/insertTest", insertTest);
router.get("/test/getTest", getTest);
router.get("/test/getAllEmployees", getAllEmployees);
router.get("/test/getEmployee", getEmployee);

router.post("/test/authentication", authentication);
router.post("/test/verifyTokenTest", verifyToken, verifyTokenTest);

export default router;