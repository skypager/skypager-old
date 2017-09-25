FROM datapimp/skypager-env
MAINTAINER jonathan.soeder@gmail.com
EXPOSE 3000-3020
EXPOSE 4000-4020
EXPOSE 5000-5020
RUN ln -sf /app/bin/* /usr/local/bin
RUN mkdir -p /app/public
CMD sky serve
