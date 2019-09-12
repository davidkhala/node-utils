CURRENT=$(cd $(dirname ${BASH_SOURCE}) && pwd)

pm2 start $CURRENT/baseAppRequirePseudo.js
pm2 start $CURRENT/baseAppRequire.js
pm2 start $CURRENT/baseAppRequireIndex.js

sleep 10
pm2 list
sleep 10

pm2 delete baseAppRequireIndex
pm2 delete baseAppRequire
pm2 delete baseAppRequirePseudo
