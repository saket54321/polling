const express = require('express');
const Question = require('../controllers/questionController');
const router = express.Router();

router.post('/questions/create',Question.create);
router.post('/questions/:id/options/create',Question.addOptions);
router.get('/questions/:id/delete',Question.deleteQuestion);
router.get('/options/:id/delete',Question.deleteOption);
router.get('/options/:id/add_vote',Question.addVote);
router.get('/questions/:id',Question.viewDetails);



module.exports = router ;