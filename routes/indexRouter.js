import { Router } from "express";

const router = Router()

const data = [
  {
    folder: "Default",
    title: "test.png",
    size: "5kb",
    uploadAt: "23-4-5",
    link: "https://www.google.com"
  },
  {
    folder: "Default",
    title: "test2.jpg",
    size: "5kb",
    uploadAt: "23-4-5",
    link: "https://www.google.com"
  },
  {
    folder: "Main",
    title: "main.png",
    size: "5kb",
    uploadAt: "23-4-5",
    link: "https://www.google.com"
  },
  {
    folder: "Secondary",
    title: "Secondary.jpg",
    size: "5kb",
    uploadAt: "23-4-5",
    link: "https://www.google.com"
  }
]
const folders = ["Default", "Main", "Secondary", "Third"]

router.get('/', (req, res) => {
  res.render('index', { title: "Stijn Drive" });
})
router.get('/browse', (req, res) => {
  res.render('browse', { title: "Stijn Drive", data: data, folders: folders })
})

export default router