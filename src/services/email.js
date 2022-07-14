const nodemailer = require("nodemailer");

const mailSender = async (email, products) => {
    
    const transport = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        service:'outlook',
        secure:false,
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        debug: false,
        logger: true
    })

    const message = {
        from: process.env.EMAIL,
        to: email,
        subject: "CHÁ DE COZINHA DA ESTER - Produtos reservados",
        text: "Plaintext version of the message",
        html: `<p>${products}</p>`
      };
   
      await transport.sendMail(message, (err,_info) =>{
        if (err) return true
    })
}

module.exports = {
    mailSender
}
