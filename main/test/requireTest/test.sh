pm2 start baseAppRequirePseudo.js
pm2 start baseAppRequire.js
pm2 start baseAppRequireIndex.js

sleep 10
pm2 list
sleep 10

pm2 delete baseAppRequireIndex
pm2 delete baseAppRequire
pm2 delete baseAppRequirePseudo
