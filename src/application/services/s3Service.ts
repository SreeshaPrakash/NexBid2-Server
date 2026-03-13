import { injectable } from "tsyringe";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/s3";

export interface PresignedUrlResponse {
  url: string;
  key: string;
}

@injectable()
export class S3Service {
 
  async getPresignedUrl(fileName: string, fileType: string): Promise<PresignedUrlResponse> {
    const sanitizedFileName = fileName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.-]/g, "");
    
    const key = `profiles/${Date.now()}-${sanitizedFileName}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    try {
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      const bucket = process.env.AWS_BUCKET_NAME;
      const region = process.env.AWS_REGION 
      
      const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      
      console.log(`[S3Service] Generated Public URL: ${publicUrl}`);
      
      return { url, key: publicUrl };
    } catch (error: any) {
      console.error("Error generating presigned URL:", error);
      throw new Error(`Could not generate presigned URL: ${error.message}`);
    }
  }
}