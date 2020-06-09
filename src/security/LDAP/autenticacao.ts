import {Client} from 'ldapts';

const userName = 'fabiano.nascimento';
//ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;
const client = new Client({
    url: `ldaps://ldap.jumpcloud.com/cn=${userName}, ou=users, ou=compton, dc=batman, dc=com`,
    timeout: 0,
    connectTimeout: 0,
    strictDN: true,
});

var opts = {
    filter: `(&(objectclass=user)(samaccountname=${userName}))`,
    scope: 'sub',
    //attributes: ['objectGUID']
    // This attribute list is what broke your solution
    attributes: ['objectGUID', 'sAMAccountName', 'cn', 'mail', 'manager', 'memberOf'],
};

export async function autenticar(login: string, senha: string) {
    console.log('--- going to try to connect user ---');

    try {
        await client.bind(userName, 'password');
        console.log('connected');
        /*client.search('ou=users, ou=compton, dc=batman, dc=com', opts, function (error, search) {
                console.log('Searching.....');

                search.on('searchEntry', function (entry) {
                    if (entry.object) {
                        console.log('entry: %j ' + JSON.stringify(entry.object));
                    }
                    client.unbind(function (error) {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log('client disconnected');
                        }
                    });
                });

                search.on('error', function (error) {
                    console.error('error: ' + error.message);
                    client.unbind(function (error) {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log('client disconnected');
                        }
                    });
                });

                // don't do this here
                //client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
            });
        });*/
    } catch (err) {
        //console.log(error);
        client.unbind();
    }
}
