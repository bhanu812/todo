const express = require('express')
const Note = require('../../models/note');
const _ = require('lodash');
const router = new express.Router();
const auth = require('../../middleware/auth');
// const { check, validationResult } = require('express-validator/check');


router.post('/notes', auth, async (req, res) => {
    
    const note = new Note({
        text: req.body.text,
        author: req.user._id,
    })

    try {
        await note.save()
        res.status(201).send(note)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/notes', auth, async(req, res) => {
    Note.find({
      author: req.user._id
    }).then((note) => {
      res.send({note});
    }, (e) => {
      res.status(400).send(e);
    });
});

router.get('/notes/:id', auth, (req, res) => {
    var id = req.params.id;
  
    Note.findOne({
      _id: id,
      author: req.user._id
    }).then((note) => {
      if (!note) {
        return res.status(404).send();
      }
  
      res.send({note});
    }).catch((e) => {
      res.status(400).send();
    });
});


router.patch('/notes/:id', auth, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
 
  
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
  
    Note.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((note) => {
      if (!note) {
        return res.status(404).send(e);
      }
  
      res.send({note});
    }).catch((e) => {
      res.status(400).send(e);
    })
});
  
router.delete('/notes/:id', auth, (req, res) => {
    var id = req.params.id;
  
  
    Note.findOneAndRemove({
      _id: id,
      author: req.user._id
    }).then((note) => {
      if (!note) {
        return res.status(404).send();
      }
  
      res.send({note});
    }).catch((e) => {
      res.status(400).send();
    });
});
  


module.exports = router;