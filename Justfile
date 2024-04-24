export WEBSITE_DIR:="website"

default: dev

install:
    cd ${WEBSITE_DIR} && yarn install
   
format:
    cd ${WEBSITE_DIR} && yarn format

dev:
    cd ${WEBSITE_DIR} && yarn dev
