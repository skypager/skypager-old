FROM datapimp/skypager-react
RUN mkdir -p /app/public
RUN mkdir -p /root/.skypager/log
RUN touch /app/skypager.js
ADD packages /app/public/packages
ADD src /app/public/src
ADD public/*.html /app/public/
ADD public/bootstrap-themes /app/public/themes
CMD sky serve --port 4000
EXPOSE 4000
