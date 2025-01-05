import {Router} from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/current', (req, res) => {
  res.render('current');
});
// router.get('/', (req, res) => {
//   res.render('view1');
// });

export default router;