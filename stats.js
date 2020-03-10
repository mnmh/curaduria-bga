var bot = require('nodemw');

// pass configuration object
var client = new bot({
    protocol: 'https', // Wikipedia now enforces HTTPS
    server: 'es.wikipedia.org', // host name of MediaWiki-powered site
    path: '/w', // path to api.php script
    debug: false // is more verbose when set to true
});

client.getArticleRevisions('Conflicto_armado_interno_de_Colombia', function (err, data) {
    // error handling
    if (err) {
        console.error(err);
        return;
    }
    if (data) {
        console.log(data);
    }
});