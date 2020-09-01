const express = require('express');
const Posts = require('../data/db.js');
const { findCommentById, findPostComments } = require('../data/db.js');
const router = express.Router();

// POST
router.post('/', (req, res) => {
const {title, contents} = req.body;
if (!title | !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
} else {
    Posts.insert(req.body)
        .then(res.status(201).json({ data: req.body }))
        .catch(res.status(500).json({ error: "There was an error while saving the post to the database" }))
}
});

router.post('/:id/comments', (req, res) => {
const {id} = req.params;
const {text} = req.body;
if (!Posts.findById(id)) {
    res.status(404).json({ message: "The post with the specified ID does not exist." })
} else if (!text) {
    res.status(400).json({ errorMessage: "Please provide text for the comment." })
} else {
    Posts.insertComment(text)
        .then(res.status(201).json({ data: text }))
        .catch(res.status(500).json({ error: "There was an error while saving the comment to the database" }))
}
});

// GET
router.get('/', (req, res) => {
Posts.find()
    .then(posts => res.status(200).json({ data: posts }))
    .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

router.get('/:id', (req, res) => {
const {id} = req.params;
Posts.findById(id)
    .then(result => result[0] ? res.status(200).json({ data: result }) : res.status(404).json({ message: "The post with the specified ID does not exist." }))
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
})

router.get('/:id/comments', (req, res) => {
const {id} = req.params;
findPostComments(id)
    .then(result => result[0] ? res.status(200).json({ data: result }) : res.status(404).json({ message: "The post with the specified ID does not exist." }))
    .catch(err => res.status(500).json({ error: "The comments information could not be retrieved." }))
})

// DELETE
router.delete('/:id', (req, res) => {
const {id} = req.params;
Posts.remove(id)
    .then(result => result ? res.status(200).json({ data: result }) : res.status(404).json({ message: "The post with the specified ID does not exist." }))
    .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

// PUT
router.put('/:id', (req, res) => {
const {id} = req.params;
const {title, contents} = req.body;

if (!title | !contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
} else {
    Posts.update(id, req.body)
        .then(result => result ? res.status(200).json({ data: req.body }) : res.status(404).json({ message: "The post with the specified ID does not exist." }))
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
}
})

module.exports = router;