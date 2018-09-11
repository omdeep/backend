import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyparser.json());

mongoose.connect('') //url to mongo db

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });

});

router.route('/issues/:id').get((req, res) => {
    Issue.ById(req.params.id, (err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });

});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({
                'issue': 'Added successfully'
            });
        })
        .catch(err => {
            res.status(400).send({
                'failed': 'Failed to add new record'
            });

        });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
        return next (new Error('Could not load document'));
        else
        issue.tittle = req.body.tittle;
        issue.responsible = req.body.responsible;
        issue.description = req.body.description;
        issue.severity = req.body.severity;
        issue.status = req.body.status;
    })
})

app.use('/', router);

app.listen(4000, () => {
    console.log('App listening on port 4000!, Express server is running');
});


//40 minutes 