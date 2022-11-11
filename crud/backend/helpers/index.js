import nodemailer from 'nodemailer';

export const kirimEmail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'ppskdos@gmail.com',
            pass: 'xvkyywlxyujzbjrt',
        },
    });
    return (
        transporter.sendMail(dataEmail)
        .then(info => console.log(` Email Terkirim : ${info.message}`))
        .catch(err => console.log(` Email tidak terkirim${err}`))
    )
}