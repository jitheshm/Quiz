import nodemailer from 'nodemailer'

const mailerConfig = {
    nodemailerEmail: process.env.NODEMAILER_EMAIL,
    nodemailerPassword: process.env.NODEMAILER_PASSWORD
}
export default (email: string, score: number, quizName: string) => {
    console.log(email);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: mailerConfig.nodemailerEmail,
            pass: mailerConfig.nodemailerPassword,
        }
    })
    const mailOptions = {
        from: mailerConfig.nodemailerEmail,
        to: email,
        subject: "Congratulations on completing the quiz!",
        html: generateText(score, quizName)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const generateText = (score: number, quizName: string): string => {

    let msg = `
<!DOCTYPE html>
<html>
<head>
    <title>score</title>
</head>
<body>
    <p>Hi ,</p>
    <p>Thankyou for participation in quiz ${quizName}</p>
    <p> your score is ${score}</a></p>
    
</body>
</html>
`;

    return msg

}