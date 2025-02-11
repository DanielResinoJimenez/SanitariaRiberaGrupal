const nodemailer = require('nodemailer');

// Configura el transporter con tus credenciales de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Puedes usar otros servicios como Outlook, Yahoo, etc.
  auth: {
    user: 'danielresinojimenez@gmail.com',  // Cambia esto por tu correo
    pass: 'gyla idon zhsb bwpv'  // Usa una contraseña de aplicación si usas Gmail
  }
});

// Función para enviar el correo
const sendPasswordResetEmail = async (toEmail, newPassword) => {
  const mailOptions = {
    from: '"Tu Aplicación" danielresinojimenez@gmail.com',  // Remitente
    to: toEmail,  // Destinatario
    subject: 'Cambio de Contraseña',
    text: `Tu nueva contraseña temporal es: ${newPassword}`,
    html: `<p>Tu nueva contraseña temporal es: <strong>${newPassword}</strong></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
    return true;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return false;
  }
};

module.exports = {
  sendPasswordResetEmail
};
