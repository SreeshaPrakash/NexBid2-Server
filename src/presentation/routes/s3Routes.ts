import express from "express";
import { container } from "tsyringe";
import { S3Service } from "../../application/services/s3Service";

const router = express.Router();

router.get("/presigned-url", async (req, res) => {
  const { fileName, fileType } = req.query;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: "fileName and fileType are required" });
  }

  try {
    const s3Service = container.resolve(S3Service);
    const result = await s3Service.getPresignedUrl(fileName as string, fileType as string);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;