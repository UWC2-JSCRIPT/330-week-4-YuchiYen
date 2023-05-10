const { Router } = require("express");

const router = Router();

router.use("/login", require('./login'));
router.use("/notes", require('./notes'));


// Error handling middleware
router.use((err, req, res, next) => {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid note id' });
    }
    //console.log(err);
    return next(err);
    
  });


module.exports = router;