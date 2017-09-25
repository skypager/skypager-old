FROM datapimp/skypager-node
MAINTAINER jonathan.soeder@gmail.com
EXPOSE 3000-3020
EXPOSE 4000-4020
EXPOSE 5000-5020
RUN mkdir -p /app/bin
RUN ln -sf /app/bin/* /usr/local/bin
RUN mkdir -p /app/public
RUN yarn add skypager-runtimes-react
CMD sky serve
