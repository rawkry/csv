import { Router } from "express";
import multer from "multer";
import uploadHandler from "./upload";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.get("/", require("./datamodel/list"));
router.post("/upload", upload.single("csvFile"), uploadHandler);

export default router;
