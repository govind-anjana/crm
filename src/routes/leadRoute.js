import express from 'express';
import {auth , isAdmin} from '../middleware/authMiddleware.js'
import { assignLead, createLead, getAllLeads, getLeadById, updateLeadStatus } from '../controllers/leadController.js';


const router=express.Router();

router.post("/", auth, createLead);

router.get("/", auth, getAllLeads);

router.get("/:id", auth, getLeadById);

router.patch("/:id/assign", auth, isAdmin, assignLead);

router.patch("/:id/status", auth, updateLeadStatus);


export default router