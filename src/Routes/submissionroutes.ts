import { Router } from 'express';
import { ping, submit, read } from '../Controllers/submissionController';

const router = Router();

router.get('/ping', ping);
router.post('/submit', submit);
router.get('/read', read);

export default router;
