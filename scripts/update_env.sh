sed -i "s/PLACE_AUTH0_CLIENT_ID_HERE/$1/g" dist/env-webext.js
sed -i "s/PLACE_AUTH0_CLIENT_ID_HERE/$2/g" src/lib/auth/env-safari-app-ext.js

