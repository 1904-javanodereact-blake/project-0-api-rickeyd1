import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as reimburseDao from '../daos/reimbursement.dao';

/**
 * Reimbursement router will handle all requests starting with
 * /reimbursements
 */
 export const reimbursementRouter = express.Router();

 /**
  * Finds all reimbursements that share a common status
  * endpoint: /reimbursements/status/:statusid/date-submitted
  */
 reimbursementRouter.get('/status/:statusid/date-submitted',
 [authMiddleware(['admin', 'finance-manager']), async (req, res) => {
   console.log(`Server is getting reimbursements with status: ${req.params.statusid}...`);
   const statusid = +req.params.statusid;
   const { start, end } = req.query;
   const startDate = new Date(+start);
   const endDate = new Date(+end);

   const reimburse = await reimburseDao.findReimbursementByStatus(statusid, startDate.toJSON(), endDate.toJSON());

   if (reimburse) {
      res.json(reimburse);
   } else {
      res.sendStatus(404);
   }

 }]);

 reimbursementRouter.get('/author/userId/:userId/date-submitted', [
   /*(req, res, next) => {
   const userID: number = req.session.user.userId;
   const userRole: string = req.session.user.role.role;
   if ( userID === +req.params.userId ) {
      next();
   } else if ( userRole === 'admin' || userRole === 'finance-manager') {
      next();
   } else {
      const resp = {
         message: 'The incoming token has expired'
      };
      res.status(401).json(resp);
   }
},*/ async (req, res) => {
   const userID = +req.params.userId;
   const { start, end } = req.query;
   const startDate = new Date(+start);
   const endDate = new Date(+end);

   const reimburse = await reimburseDao.findReimbursementByUser(userID, startDate.toJSON(), endDate.toJSON());

    if (reimburse) {
      res.json(reimburse);
   } else {
      res.sendStatus(404);
   }

 }]);

 reimbursementRouter.post('', async (req, res) => {
   const { reimbursementID } = req.body;

   if ( reimbursementID === 0 ) {
      const { author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = req.body;

      const newImburse = await reimburseDao.submitReimbursement(author, amount, dateSubmitted, dateResolved, description,
         resolver, status, type);

      res.status(201).json(newImburse);

      console.log(`New reimbursement added`);
   } else {
      res.send('Could not create new reimbursement. Please include reimbursement id of 0');
      console.log('Failed to create new record.');
   }
 });

 reimbursementRouter.patch('',
 [authMiddleware(['finance-manager', 'admin']), async (req, res) => {
   const { reimbursementID } = req.body;
   const currReim = await reimburseDao.findReimbursementByID(reimbursementID);
   const newReim = currReim;

   for (const field in newReim) {
      if ( (newReim[field] !== req.body[field]) && (req.body[field] !== undefined)) {
         newReim[field] = req.body[field];
      }
   }
   await reimburseDao.updateReimbursement(newReim.reimbursementID, newReim.author, newReim.amount, newReim.dateSubmitted,
      newReim.dateResolved, newReim.description, newReim.resolver, newReim.status, newReim.type);
   const updatedReim = await reimburseDao.findReimbursementByID(reimbursementID);
   res.send(updatedReim);
   console.log(`Finished updating reimbursement information...`);
 }]);