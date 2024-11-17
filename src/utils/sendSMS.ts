import * as url from "url"
import ky from 'ky'
import logger from "../config/logger.js"

export const sendSms = async (otp: string, mobile_no: string) => {
    const smsurl = "https://connectsms.vodafone.com.qa/SMSConnect/SendServlet?application=http_gw1055&password=dt4couw7&content=Test+Test&destination=97477893679&source=97657&mask=ALHAYAT+MED"

    const urlparse = new url.URL(smsurl)
    urlparse.searchParams.set('content', `Your OTP for ALHAYAT is ${otp}. Please use this code to complete your verification.`)
    urlparse.searchParams.set('destination', mobile_no)
    try {
        const res = await ky.get(urlparse.href)
        return res
    } catch (error) {
        logger.error(error)
        return "Error in sending otp"
    }
}