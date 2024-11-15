import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/', passport.authenticate('local', {
  successRedirect: '/browse',
  failureRedirect: '/'
}))

router.all('/logout', (req, res) => {
  req.logout(() => res.redirect('/'))
})

export default router;