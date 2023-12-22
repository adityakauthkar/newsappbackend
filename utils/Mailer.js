var _ = require('lodash');

const nodemailer = require('nodemailer');

var config = {
  host: 'smtp.gmail.com',
  port: 465,
  secure:true,
  auth: {
    user: 'adityakauthkar123@gmail.com',
    pass: 'bdsc octl ukdv vgog'
  }
};

var transport = nodemailer.createTransport(config);

var defaultMail = {
  from: 'adityakauthkar123@gmail.com',
  text: 'test test'
}

const send = (to, subject, html) => {
  mail = _.merge({ html }, defaultMail, to);

  transport.sendMail(mail, function (error, info) {
    if (error) return console.log(error);
    console, log('mail sent ', info.response);
  })
}



module.exports = {
  send
}