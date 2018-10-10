export const authMiddleWare = function(req, res, next) {
  if ((req.session && req.session.user) || req.session.admin) {
    return next();
  } else {
    res.status(401).send('Unauthorized');
  }
};