import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

var secret = speakeasy.generateSecret({ length: 20 });
qrcode.toDataURL(secret.otpauth_url, function(err, data_url) {
    if (err) 
        throw err;
})