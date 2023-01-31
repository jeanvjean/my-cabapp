// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable @typescript-eslint/camelcase */
// import {commonTemplate} from './templates/common.template';
// import * as smtpTransport from 'nodemailer-sendgrid-transport';
// import * as nodemailer from 'nodemailer';


// const MailService = async (subject: string, messageType: any, data: any, copiedUsers = []) => {
//   const transporter = nodemailer.createTransport(smtpTransport({
//     service: `${process.env.MAIL_SERVICE}`,
//     auth: {
//       api_key: `${process.env.SENDGRID_API_KEY}`,
//     },
//   }));
//   const msg = {
//     to: data.email,
//     cc: copiedUsers,
//     from: process.env.MAIL_FROM,
//     subject,
//     html: commonTemplate(messageType, data),
//   };
//   transporter.sendMail(msg, function(error: any, info: any) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(`using ${msg.from}`);
//       console.log('Message sent: ' + info.response);
//     }
//   });
// };

// export default MailService;
