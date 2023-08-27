import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASS,
    },
  });



  export async function sendMailRegister(recipient,name) {
  console.log("llega a enviar el mail")
    const result = await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: recipient,
      subject: "Welcome to ecommerce " + name,
      html: `
                <div>
                    <h1>Hi you are registered</h1>
                    <p>welcome!!!!</p>
                </div>
            `,
      attachments: [
        {
       //   filename: "image1.gif",
        //  path: __dirname + "/images/image1.gif",
        //  cid: "image1",
        },
      ],
    });
  
    console.log(result);
    //res.send("Email sent");
  };

  export default sendMailRegister;