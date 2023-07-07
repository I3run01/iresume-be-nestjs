import axios from 'axios'
import { createTransport } from 'nodemailer';

export const apiRequest = {
    async googleLogin(token: string): Promise<any> {
        let googleUser = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })

        return JSON.stringify(googleUser.data)
    },
}

export const mailServices = {
    
    sendConfirmationEmail(email: string, link: string,  name?: string) {
        
        const user = process.env.EMAIL_USER as string;
        const pass = process.env.EMAIL_PASS as string;

        const transport = createTransport({
            service: "outlook",
            auth: {
                user: user,
                pass: pass,
            },
        });

        try {
            transport.sendMail({
              from: user,
              to: email,
              subject: "Resume Code",
              html: `<h1>Email Confirmation</h1>
              <h2>Hello ${name ? name : ''}</h2>
              <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
              <a href=${link}> Click here</a>
              </div>`,
            })
        } catch (error) {
            console.log(error)
        }
    },
      
}