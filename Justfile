export WEBSITE_DIR:="website"

default: dev

install:
    cd ${WEBSITE_DIR} && yarn install
   
dev:
    cd ${WEBSITE_DIR} && yarn dev
