import { Router } from 'express';
import { ping, submit, read, edit, del, search } from '../Controllers/submissionController';

const router = Router();

router.get('/ping', ping);
router.post('/submit', submit);
router.get('/read', read);
router.put('/edit/:email', edit);
router.delete('/delete/:email',del);
router.get('/search',search);

export default router;
