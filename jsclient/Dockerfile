####################################
#
#  Dockerfile App/Web
#  v0.1.0 - By Moloch
#
####################################
FROM app_nginx
MAINTAINER moloch


#
# > Copy Code and Configs
#
RUN mkdir -p /var/www
ADD . /var/www
WORKDIR /var/www


#
# > Nginx Configs
#
RUN mv ./nginx/nginx.conf /etc/nginx/conf/nginx.conf
RUN mv ./nginx/app /etc/nginx/sites-available/app
RUN rm -rf ./nginx/
RUN ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app



#
# > Build the JSClient
#
RUN npm install
RUN bower install --allow-root
RUN grunt


#
# > Expose volumes
#
VOLUME ["/etc/nginx/ssl", "/var/www/", "/var/ngx_pagespeed_cache"]


#
# > Expose ports
#
EXPOSE 80
EXPOSE 443
