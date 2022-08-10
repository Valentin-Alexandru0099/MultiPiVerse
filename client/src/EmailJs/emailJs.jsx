import emailjs from '@emailjs/browser';

const accountKey = "9At7SeQMTFYs8y2Sl";
const service = "gmail";

const sendEmail = (template, data) => {

    emailjs.sendForm(service, template, data, accountKey)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};

export { sendEmail };
