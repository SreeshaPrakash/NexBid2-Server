import { injectable } from "tsyringe";

import { IOtpService } from "../../domain/interfaces/serviceInterface/otpServiceInterface";
import redis from '../../config/redis'
import nodemailer from 'nodemailer'
import { logger } from "../../infrastructure/logging/logger";



@injectable()
export class OtpService implements IOtpService {
    private OTP_TTL = 120

    generateOtp(length: number = 6): string {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
    }


    async sendOtp(email: string): Promise<void> {
        const otp = this.generateOtp()
        logger.info(` otp created `)

        await redis.set(`otp:${email}`, otp, 'EX', this.OTP_TTL)


        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        })

        await transport.sendMail({
            from: `"NEXBID" ,  ${process.env.NODEMAILER_EMAIL}`,
            to: email,
            subject: 'Your NexBid OTP Code',
            // html : `<h2>${otp}</h2><p>valid for 10 minutes</p>`
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`

        })
        logger.info(`OTP send & stored for : ${email}`)
        console.log(`otp to input : ${otp}`)
    }


    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const storedOtp = await redis.get(`otp:${email}`)

        if (!storedOtp) {
            throw new Error('OTP expired of not found')
        }

        if (storedOtp !== otp) {
            throw new Error('Invalild otp')
        }

        await redis.del(`otp:${email}`)
        return true;
    }


    async resendOtp(email: string): Promise<void> {

        await redis.del(`otp:${email}`)
        logger.info(`old otp cleared`)
        await this.sendOtp(email)
    }


}
