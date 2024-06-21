import { Request, Response } from 'express';
import { readDatabase, writeDatabase } from '../utils/database';


export const ping = (req: Request, res: Response) => {
    res.json({ success: true });
};

export const submit = (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // console.log(req.body);
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    try {
        const submissions = readDatabase();
        submissions.push(newSubmission);
        writeDatabase(submissions);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error writing to database file' });
    }
};

export const read = (req: Request, res: Response) => {
    const { index } = req.query;
    if (index === undefined || isNaN(Number(index))) {
        return res.status(400).json({ error: 'Invalid or missing index parameter' });
    }
    try {
        const submissions = readDatabase();
        const idx = Number(index);
        if (idx < 0 || idx >= submissions.length) {
            return res.status(404).json({ error: 'Index out of range' });
        }
        res.json(submissions[idx]);
    } catch (err) {
        res.status(500).json({ error: 'Error reading database file' });
    }
};

export const edit = (req: Request, res: Response)=>{
    const { email } = req.params;
    const obj = req.body;
    try {
        let submissions = readDatabase();
        let submissionFound = false;
        submissions = submissions.map((submission) => {
            if ( submission.email === email ) {
                submissionFound = true;
                for( let o in submission ){
                    if( obj[o] ) submission[o] = obj[o];
                }
            }
            return submission;
        });
        if (!submissionFound) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        writeDatabase(submissions);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error writing to database file' });
    }
}

export const del = (req: Request, res: Response)=>{
    const { email } = req.params;
    try {
        const submissions = readDatabase();
        const filteredSubmissions = submissions.filter((submission) => submission.email !== email);
        if (submissions.length === filteredSubmissions.length) {
            return res.status(404).json({ error: 'Submission not found' });
        }
        writeDatabase(filteredSubmissions);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Error writing to database file' });
    }
}

export const search = (req: Request, res: Response) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: 'Missing email parameter' });
    }
    let submissions = readDatabase();
    submissions = submissions.filter((submission) => submission.email === email);
    if (submissions.length === 0) {
        return res.status(404).json({ error: 'No submissions found for the provided email' });
    }
    res.json(submissions[0]);
};