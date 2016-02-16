// OTP Enrollemnt Model
// ----------------------
App.Models.OtpEnrollment = Backbone.Model.extend({

    urlRoot: "api/otp/enrollment",
    defaults: {
        "qrcode": "",
        "uri": "",
        "otp": ""
    }

});
