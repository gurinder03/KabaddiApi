
const admin = require('firebase-admin');
const serviceAccount = require('./json');

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: serviceAccount.project_id, // I get no error here
        clientEmail: serviceAccount.client_email, // I get no error here
        privateKey: serviceAccount.private_key.replace(/\\n/g, '\n') // NOW THIS WORKS!!!
    })
});

module.exports.admin = admin;

