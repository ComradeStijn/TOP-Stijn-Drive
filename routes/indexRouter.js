import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
  res.render('index', { title: "Stijn Drive" });
})
router.get('/browse', (req, res) => {
  res.render('browse', { title: "Stijn Drive"})
})

export default router