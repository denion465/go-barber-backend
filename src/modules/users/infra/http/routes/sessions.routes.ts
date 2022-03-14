import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';


const sessionsRouter = Router();
const seSSionsController = new SessionsController();

sessionsRouter.post('/', seSSionsController.create);

export default sessionsRouter;
