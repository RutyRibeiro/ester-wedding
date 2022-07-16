const nodemailer = require("nodemailer");

const mailSender = async (email, products) => {
    let htmlProducts = "" 
    console.log(products)  
    
    products.forEach(product => htmlProducts += `<li style="text-align:left; color: #f7f7f7" >${product} </li> \n`) 
    
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
        html: 
        `<div style="width:100%;background:#cbd8b6;padding:25px 0">
        <table style=" 
          border:2px solid #f7f7f7;
          font-family: sans-serif;
          border-bottom:none;
          margin:0 auto;
          padding:25px 5px;
          text-align:center;
          max-width:620px;
          width:80%;
          background:#9aaa7e;    
          box-shadow: 4px 4px 15px -10px;
          table-layout: fixed;">
            <tr>
              <td>
              <h4 style="color:#f7f7f7; font-weight:bold; font-family:sans-serif; margin: 0 0 0 6px">| Chá de Cozinha | Ester</h4>
              </td>
            </tr>
          <tr>
            <td>
              <span style="font-size: 0.875rem; color: #f7f7f7;" >Olá, você acabou de reservar os seguintes produtos para o chá de cozinha 
              </span>
            </td>
          </tr>
            <tr>
            <td style="display:flex; margin-top: 8px">
              <ul style="margin: 0 auto; padding:0;">
                ${htmlProducts}
              </ul>
            </td>
          </tr>
          
        </table>
          </div>`
      };
   
      await transport.sendMail(message, (err,_info) =>{
        if (err) return true
    })
}

module.exports = {
    mailSender
}
