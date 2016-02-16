# -*- coding: utf-8 -*-
"""
@author: moloch
Copyright 2015
"""

import logging
import smtplib
from datetime import datetime, timedelta
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.Utils import formatdate

from tornado.options import options

import mandrill
import sendgrid


class EmailCarrier(object):

    """
    Base class for all EmailCarriers. EmailCarriers are responsible for sending
    mail post-render.
    """

    NAME = "EmailCarrier"

    def sendmail(self, to_mail, from_mail, from_name, subject, body):
        raise NotImplementedError()


class NullEmailCarrier(EmailCarrier):

    """
    Logs messages, doesn't send anything.
    """

    NAME = "null"

    def sendmail(self, *args, **kwargs):
        logging.info("NullEmailCarrier: %r %r", args, kwargs)


class MandrillCarrier(EmailCarrier):

    """
    Mandrill EmailCarrier Implemenation
    Docs: https://mandrillapp.com/api/docs/messages.python.html
    """

    NAME = "mandrill"

    def __init__(self, api_key=None):
        """ If no api key is provided fallback to the cli args """
        api_key = options.mandrill_api_key if api_key is None else api_key
        logging.debug("Mandrill carrier started with api key: %r", api_key)
        self.client = mandrill.Mandrill(options.mandrill_api_key)
        self.defaults = {
            "async": False,
            "ip_pool": 'Main Pool',
            "return_path_domain": None
        }

    def send_at(self, delay=None):
        """ Returns UTC date/time + delay (default is 5 seconds) """
        delay = delay if delay is not None else timedelta(seconds=5)
        _send_at = datetime.utcnow() + delay
        return _send_at.strftime("%Y-%m-%d %H:%M:%S %z")

    def sendmail(self, to_mail, from_mail, from_name, subject, body):
        """ Send email """
        try:
            result = self.client.messages.send_raw(
                raw_message=body,
                from_email=from_mail,
                from_name=from_name,
                to=to_mail,
                **self.defaults)
            return result
        except mandrill.Error as error:
            logging.error("Error sending email: %s", error)


class SendGridCarrier(EmailCarrier):

    """
    SendGrid EmailCarrier Implemenation
    Docs: https://sendgrid.com/docs
    """

    NAME = "sendgrid"

    def __init__(self, user=None, api_key=None):
        api_key = api_key if api_key is not None else options.sendgrid_api_key
        user = user if user is not None else options.sendgrid_api_user
        self.sendgrid = sendgrid.SendGridClient(user, api_key)

    def sendmail(self, to_mail, from_mail, from_name, subject, body):
        message = sendgrid.Mail()
        message.add_to(to_mail)
        message.set_from(from_mail)
        message.set_subject(subject)
        message.set_html(body)
        self.sendgrid.send(message)


class MailgunCarrier(EmailCarrier):

    NAME = "mailgun"

    def __init__(self):
        pass

    def sendmail(self, to_mail, from_mail, from_name, subject, body):
        pass


class SMTPCarrier(EmailCarrier):

    """
    Sends email using raw SMTP, great for spoofing emails.
    """

    NAME = "smtp"

    def __init__(self, host=None, port=None):
        self.host = options.smtp_host if host is None else host
        self.port = options.smtp_port if port is None else port

    def sendmail(self, to_mail, from_mail, from_name, subject, body):
        """
        Sends an email object / attachment objects as a normal email message
        """
        try:
            msg = self.create_message(to_mail, from_mail, from_name,
                                      subject, body)
            smtp = smtplib.SMTP(self.host)
            smtp.sendmail(from_mail, to_mail, msg.as_string())
            smtp.close()
            return True
        except:
            logging.exception("Failed to send email to '%s'", to_mail[0])
            return False

    def create_message(self, to_mail, from_mail, from_name, subject, body):
        """ Constructs the proper MIME/HTML email data """
        msg = MIMEMultipart('alternative')
        msg['From'] = from_mail
        msg['To'] = to_mail[0]
        msg['Date'] = formatdate(localtime=True)
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'html'))
        return msg

# Exports
DEFAULT_CARRIER = NullEmailCarrier.NAME
EMAIL_CARRIERS = {
    NullEmailCarrier.NAME: NullEmailCarrier,
    SendGridCarrier.NAME: SendGridCarrier,
    MandrillCarrier.NAME: MandrillCarrier,
    SMTPCarrier.NAME: SMTPCarrier
}
