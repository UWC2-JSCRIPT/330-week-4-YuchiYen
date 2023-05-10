const {getUserIdFromToken, isValidToken } = require('../daos/token');

// Middleware to check if user is logged in
const isLoggedIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {

        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
   
        if(!regexExp.test(token)){         
            return res.status(401).json({ error: 'Invalid token' });
        }        
        const userId = await getUserIdFromToken(token);
        if (!userId)
            res.status(401).json({ error: 'userId does not exist' })

        req.userId = userId;
        req.token = token;

        return next();
      } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    return res.status(401).json({ error: 'Authorization header required' });
  };

module.exports = { isLoggedIn };