this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["Home"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"container\">\n<div class=\"page-header\">\n<h1>\n<i class=\"fa fa-fw fa-home\"></i>\nHome\n</h1>\n</div>\n<div class=\"row\">\n<div class=\"col-md-12\">\n\n</div>\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["AlertError"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n<span aria-hidden=\"true\">&times;</span>\n</button>\n<h4 class=\"alert-heading\">\n<i class=\"fa fa-fw fa-exclamation-circle\"></i>\n"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "\n</h4>\n"
    + alias2(alias1((depth0 != null ? depth0.message : depth0), depth0))
    + "\n";
},"useData":true});

this["Handlebars"]["templates"]["AlertSuccess"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n<span aria-hidden=\"true\">&times;</span>\n</button>\n<h4 class=\"alert-heading\">\n<i class=\"fa fa-fw fa-check\"></i>\n"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "\n</h4>\n"
    + alias2(alias1((depth0 != null ? depth0.message : depth0), depth0))
    + "\n";
},"useData":true});

this["Handlebars"]["templates"]["DeactivateButton"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button class=\"btn btn-xs btn-danger\">\n<i class=\"fa fa-fw fa-user-times\"></i>\nDeactivate\n</button>\n";
},"useData":true});

this["Handlebars"]["templates"]["DetailsButton"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<button id=\"details-button\" class=\"btn btn-xs btn-primary\">\n<i class=\"fa fa-fw fa-info-circle\"></i>\nView Details\n</button>\n";
},"useData":true});

this["Handlebars"]["templates"]["AdminMenu"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n<i class=\"fa fa-fw fa-users\"></i>\nAdministration\n<i class=\"fa fa-fw fa-caret-down\"></i>\n</a>\n<ul class=\"dropdown-menu\">\n<li>\n<a href=\"#manage-users\">\n<i class=\"fa fa-fw fa-users\"></i>\nManage Users\n</a>\n</li>\n</ul>\n";
},"useData":true});

this["Handlebars"]["templates"]["UserMenu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-fw fa-bug\"></i>\nDEBUG\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-fw fa-eye\"></i>\nApp\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"navbar navbar-inverse navbar-fixed-top\">\n<div class=\"container\">\n<div class=\"navbar-header\">\n<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n<span class=\"icon-bar\"></span>\n</button>\n<a class=\"navbar-brand\" href=\"#home\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.debug : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</a>\n</div>\n<div class=\"collapse navbar-collapse\">\n<ul class=\"nav navbar-nav\">\n\n<li>\n<a href=\"#home\">\n<i class=\"fa fa-fw fa-home\"></i>\n</a>\n</li>\n\n</ul>\n<!-- Right Hand Menu -->\n<ul id=\"top-menu-rightnav\" class=\"nav navbar-nav navbar-right\">\n<li class=\"dropdown\">\n<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n<i class=\"fa fa-fw fa-user\"></i>\n"
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "\n<i class=\"fa fa-fw fa-caret-down\"></i>\n</a>\n<ul class=\"dropdown-menu\">\n<li>\n<a href=\"#settings\">\n<i class=\"fa fa-fw fa-cogs\"></i>\nSettings\n</a>\n</li>\n<li role=\"presentation\" class=\"divider\"></li>\n<li>\n<a href=\"#logout\">\n<i class=\"fa fa-fw fa-sign-out\"></i>\nLogout\n</a>\n</li>\n</ul>\n</li>\n</ul>\n</div><!--/.nav-collapse -->\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["Login"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n<div class=\"col-md-4 col-md-offset-4\">\n<form class=\"form-signin\">\n<h2 class=\"form-signin-heading\">\n<i class=\"fa fa-fw fa-lock\"></i>\nLogin\n</h2>\n<div id=\"login-errors\"></div>\n<div class=\"input-group\">\n<div class=\"input-group-addon\">\n<i class=\"fa fa-fw fa-user\"></i>\n</div>\n<input autofocus id=\"login-username\" class=\"form-control\" type=\"text\" placeholder=\"Username\">\n</div>\n<div class=\"input-group\">\n<div class=\"input-group-addon\">\n<i class=\"fa fa-fw fa-key\"></i>\n</div>\n<input id=\"login-password\" class=\"form-control\" type=\"password\" placeholder=\"Password\" autocomplete=\"off\">\n</div>\n<div class=\"input-group\">\n<div class=\"input-group-addon\">\n<i class=\"fa fa-fw fa-shield\"></i>\n</div>\n<input id=\"login-otp\" class=\"form-control\" type=\"password\" placeholder=\"2FA Token (Optional)\" autocomplete=\"off\">\n</div>\n<button id=\"login-button\" class=\"btn btn-primary btn-block\" type=\"button\">\n<i class=\"fa fa-fw fa-sign-in\"></i>\nAuthenticate\n</button>\n</form>\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["EnableOTP"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<p class=\"text-center\">\nOTP is already enabled for your account.\n</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"row\">\n<div id=\"otp-enrollment\" class=\"col-md-12 animated\">\n<button id=\"confirm-enable-otp\" type=\"button\" class=\"btn btn-info\">\n<i class=\"fa fa-fw fa-shield\"></i>\nEnable 2FA for "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + "\n</button>\n</div>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"container\">\n<div class=\"page-header\">\n<h1>\n<i class=\"fa fa-fw fa-shield\"></i>\nEnable 2FA/OTP\n</h1>\n</div>\n<div class=\"row\">\n<div id=\"alerts\" class=\"col-md-12\"></div>\n</div>\n<div class=\"row\">\n<div class=\"col-md-12\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.otp_enabled : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["ManageUsers"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"add-user-modal\" class=\"modal fade\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-header\">\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n<span aria-hidden=\"true\">&times;</span>\n</button>\n<h4 class=\"modal-title\">\n<i class=\"fa fa-fw fa-user-plus\"></i>\nAdd New User\n</h4>\n</div>\n<div class=\"modal-body\">\n<div id=\"add-user-alerts\"></div>\n<form id=\"add-user-form\">\n<div class=\"form-group\">\n<label for=\"user-name\">Name</label>\n<input type=\"text\" class=\"form-control\" id=\"add-user-name\" placeholder=\"Username\">\n</div>\n<div class=\"form-group\">\n<label for=\"user-email-address\">Email Address</label>\n<input type=\"email\" class=\"form-control\" id=\"add-user-email-address\" placeholder=\"Email Address\">\n</div>\n<div class=\"form-group\">\n<label for=\"user-password\">Password</label>\n<input type=\"password\" class=\"form-control\" id=\"add-user-password\" placeholder=\"Password\">\n</div>\n<div class=\"form-group\">\n<label for=\"user-confirm-password\">Confirm Password</label>\n<input type=\"password\" class=\"form-control\" id=\"add-user-confirm-password\" placeholder=\"Confirm Password\">\n</div>\n</form>\n</div>\n<div class=\"modal-footer\">\n<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\nClose\n</button>\n<button id=\"add-user-save\" type=\"button\" class=\"btn btn-primary\">\n<i class=\"fa fa-fw fa-user-plus\"></i>\nAdd New User\n</button>\n</div><!-- /.model-footer -->\n</div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<div id=\"lock-user-modal\" class=\"modal fade\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-header\">\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n<span aria-hidden=\"true\">&times;</span>\n</button>\n<h4 class=\"modal-title\">\n<i class=\"fa fa-fw fa-user-times\"></i>\nLock User Account\n</h4>\n</div>\n<div class=\"modal-body text-center\">\nAre you sure you want to <strong>lock</strong> this user account?\n<input id=\"lock-user-id\" type=\"hidden\" />\n</div>\n<div class=\"modal-footer\">\n<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\nClose\n</button>\n<button id=\"lock-user-save\" type=\"button\" class=\"btn btn-danger\">\n<i class=\"fa fa-fw fa-user-times\"></i>\nLock Account\n</button>\n</div><!-- /.model-footer -->\n</div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n<div id=\"unlock-user-modal\" class=\"modal fade\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n<div class=\"modal-header\">\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n<span aria-hidden=\"true\">&times;</span>\n</button>\n<h4 class=\"modal-title\">\n<i class=\"fa fa-fw fa-user\"></i>\nUnlock User Account\n</h4>\n</div>\n<div class=\"modal-body text-center\">\nAre you sure you want to <strong>unlock</strong> this user account?\n<input id=\"unlock-user-id\" type=\"hidden\" />\n</div>\n<div class=\"modal-footer\">\n<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\nClose\n</button>\n<button id=\"unlock-user-save\" type=\"button\" class=\"btn btn-success\">\n<i class=\"fa fa-fw fa-unlock\"></i>\nUnlock Account\n</button>\n</div><!-- /.model-footer -->\n</div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<div class=\"container\">\n<div class=\"page-header\">\n<h1>\n<i class=\"fa fa-fw fa-group\"></i>\nManage Users\n</h1>\n</div>\n<div class=\"row\">\n<div class=\"col-md-12\">\n<button class=\"btn btn-success\" type=\"button\" data-toggle=\"modal\" data-target=\"#add-user-modal\">\n<i class=\"fa fa-fw fa-user-plus\"></i>\nAdd New User\n</button>\n</div>\n</div>\n<div class=\"row\">\n<div id=\"alerts\" class=\"col-md-12\"></div>\n</div>\n<br />\n<div class=\"row\">\n<div class=\"col-md-12\">\n<table class=\"table table-hover\">\n<thead>\n<tr>\n<th>Created</th>\n<th>Last Login</th>\n<th>Name</th>\n<th>Email Address</th>\n<th>2FA Enabled</th>\n<th>Admin Permission</th>\n<th><!-- Buttons --></th>\n</tr>\n</thead>\n<tbody id=\"users-table\">\n</tbody>\n</table>\n</div>\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["OTPEnrollment"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row\">\n<div class=\"col-md-6\">\n<img src=\""
    + alias4(((helper = (helper = helpers.qrcode || (depth0 != null ? depth0.qrcode : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qrcode","hash":{},"data":data}) : helper)))
    + "\" class=\"img-thumbnail\" />\n<br />\n<br />\n<pre>"
    + alias4(((helper = (helper = helpers.uri || (depth0 != null ? depth0.uri : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uri","hash":{},"data":data}) : helper)))
    + "</pre>\n</div>\n<div class=\"col-md-6\">\n<form>\n<div class=\"form-group\">\n<label for=\"otp-code\">\nTest Code\n</label>\n<input id=\"otp-code\" type=\"text\" class=\"form-control\" placeholder=\"OTP Code\" autocomplete=\"off\">\n</div>\n<button id=\"test-otp-code\" type=\"submit\" class=\"btn btn-default\">\nSubmit\n</button>\n</form>\n<br />\n<br />\n<div id=\"otp-alerts\"></div>\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["UserSettings"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "checked";
},"3":function(container,depth0,helpers,partials,data) {
    return "<button id=\"show-disable-otp\" type=\"button\" class=\"btn btn-danger\">\n<i class=\"fa fa-fw fa-unlock-alt\"></i>\nDisable 2FA\n</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<button id=\"show-enable-otp\" type=\"button\" class=\"btn btn-info\">\n<i class=\"fa fa-fw fa-shield\"></i>\nEnable 2FA\n</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"container\">\n<div class=\"page-header\">\n<h1>\n<i class=\"fa fa-fw fa-gears\"></i>\n"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n<small>Settings</small>\n</h1>\n</div>\n<div class=\"row\">\n<div id=\"alerts\" class=\"col-md-12\"></div>\n</div>\n<div class=\"row\">\n<div class=\"col-md-12\">\n<form>\n<div class=\"form-group\">\n<label for=\"me-new-password\">\nChange Password\n</label>\n<input type=\"password\" class=\"form-control\" id=\"me-new-password1\" placeholder=\"Password\" />\n</div>\n<div class=\"form-group\">\n<label for=\"me-current-password\">\nConfirm New Password\n</label>\n<input type=\"password\" class=\"form-control\" id=\"me-new-password2\" placeholder=\"Password\" />\n</div>\n<div class=\"form-group\">\n<label for=\"me-current-password\">\nCurrent Password\n</label>\n<input type=\"password\" class=\"form-control\" id=\"me-current-password\" placeholder=\"Password\" />\n</div>\n<br />\n<div class=\"form-group\">\n<label for=\"me-email-address\">\nEmail Address\n</label>\n<input type=\"email\" class=\"form-control\" id=\"me-email-address\" placeholder=\"Email Address\" value=\""
    + alias4(((helper = (helper = helpers.email_address || (depth0 != null ? depth0.email_address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email_address","hash":{},"data":data}) : helper)))
    + "\" />\n</div>\n<div class=\"checkbox\">\n<label>\n<input id=\"me-email-updates\" type=\"checkbox\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.email_updates : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n<i class=\"fa fa-fw fa-paper-plane-o\"></i>\nEnable Email Updates\n</label>\n</div>\n<hr />\n<button id=\"save-settings\" type=\"button\" class=\"btn btn-primary\">\n<i class=\"fa fa-fw fa-save\"></i>\nSave Settings\n</button>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.otp_enabled : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "</form>\n</div>\n</div>\n</div>\n";
},"useData":true});

this["Handlebars"]["templates"]["UserTableRow"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.timestamp || (depth0 && depth0.timestamp) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.created : depth0),{"name":"timestamp","hash":{},"data":data}))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-spinner fa-pulse\"></i>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.last_login : depth0), depth0))
    + "\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "Never\n";
},"9":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "\n";
},"11":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda((depth0 != null ? depth0.email_address : depth0), depth0))
    + "\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "None\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-fw fa-check-square-o\"></i>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "<i class=\"fa fa-fw fa-square-o\"></i>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "<button id=\"unlock-user-button\" type=\"button\" class=\"btn btn-success btn-xs\" data-user=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n<i class=\"fa fa-fw fa-unlock\"></i>\n</button>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "<button id=\"lock-user-button\" type=\"button\" class=\"btn btn-danger btn-xs\" data-user=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\n<i class=\"fa fa-fw fa-user-times\"></i>\n</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.created : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.last_login : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.email_address : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.otp_enabled : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.is_admin : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n<td>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.account_locked : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n";
},"useData":true});