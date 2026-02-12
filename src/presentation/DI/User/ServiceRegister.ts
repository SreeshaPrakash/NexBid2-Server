import { container } from "tsyringe";
import { OtpService } from "../../../application/services/otpService";
import { GoogleAuthService } from "../../../application/services/googleAuthService";
import { JwtService } from "../../../application/services/jwtService";


export class ServiceRegistrar {
    static registerService() {

        container.register("IOtpService", { useClass : OtpService })

        container.register("IGoogleAuthservice" , { useClass : GoogleAuthService })

        container.register("IJwtService" , {useClass : JwtService })
        
    }
}