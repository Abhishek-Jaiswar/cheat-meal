import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from './EmailHtml';
import { client, sender } from './mailtrap'

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipients = [{ email, }];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            html: htmlContent.replace('{verificationToken}', verificationToken),
            subject: "Verify your email!",
            category: "Email Verification"
        })
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification")
    }
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipients = [{ email, }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Welcome To Cheat Meal!",
            html: htmlContent,
            template_variables: {
                company_info_name: "Cheat Meal",
                name: name
            }
        })
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification")
    }
}

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipients = [{ email, }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            html: htmlContent,
            subject: "Reset your Password!",
            category: "Reset Password"
        })
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send reset email")
    }
}

export const sendResetSuccessEmail = async (email: string) => {
    const recipients = [{ email, }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            html: htmlContent,
            subject: "Password reset successfully!",
            category: "password reset"
        })
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email for successfull password")
    }
}