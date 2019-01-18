const assert = require('assert');
const Database_Import = require('../../lib/database').Database;
const NodeCollection_Import = require('../../lib/database').NodeCollection;
const _ = require('underscore');

const NodeCollection = new NodeCollection_Import();
const Database = new Database_Import();

before((done) => {
    NodeCollection.connect((database) => {
        database.dropCollection('node_auth', function(err, result) {
            done();
        })
    })
});

it('must recreate collection when dropped', done => {
    NodeCollection.connect((database) => {
        database.dropCollection('node_auth', function(err, result) {
            NodeCollection.checkCollection(result => {
                assert.equal(result, "AuthCollection not found, initialized new collection.");
                done();
            });
        });
    });
});

it('successfully connects to mongo in the parent class', done => {
    Database.connect((client) => {
        assert.ok(client);
        done();
    })
});
it('successfully connects to mongo in the child class', done => {
    NodeCollection.connect((client) => {
        assert.ok(client);
        done();
    });
});

it('rejects a token that is too short', (done) => {
    NodeCollection.newAuthRequest('shortToken', (result) => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Token failed validation');
        done();
    });
});

it('rejects a token that has invalid characters', (done) => {
    NodeCollection.newAuthRequest('kJHlkjhlkfhadsi983983kljfhasdghfasdkjfhkJH!', (result) => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Token failed validation');
        done();
    });
});

it('successfully adds a valid token', (done) => {
    NodeCollection.newAuthRequest('kJHlkjhlkfhadsi983983kljfhasdghfasdkjfhkJH', (result) => {
        assert.equal(result.status, true);
        assert.equal(result.message, 'Successfully Inserted');
        done();
    });
});

it('fails when trying to add a duplicate token', done => {
    NodeCollection.newAuthRequest('kJHlkjhlkfhadsi983983kljfhasdghfasdkjfhkJH', (result) => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Duplicate Token');
        done();
    });
});

it('successfully authorizes a token', done => {
    NodeCollection.newAuthRequest('lkfdsahlfdsiufdsajshgddfdfjdnmeeirjdmdnmieudhjd', result => {
        NodeCollection.authorizeAuthRequest('lkfdsahlfdsiufdsajshgddfdfjdnmeeirjdmdnmieudhjd', result => {
            assert.equal(result.status, true);
            assert.equal(result.message, 'Successfully authorized token');
            done();
        });
    });
});

it('successfully denies a token', done => {
    NodeCollection.newAuthRequest('kdksjahaiuxyuckvmblkbjbksmekdjsdksjskwmed', result => {
        NodeCollection.denyAuthRequest('kdksjahaiuxyuckvmblkbjbksmekdjsdksjskwmed', result => {
            assert.equal(result.status, true);
            assert.equal(result.message, 'Successfully denied token');
            done();
        });
    });
});

it('can\'t authorize a non-existent token', done => {
    NodeCollection.authorizeAuthRequest('thistokendoesnotexistinthedatabase', result => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Token not found');
        done();
    });
});

it('can\'t deny a non-existent token', done => {
    NodeCollection.denyAuthRequest('thistokendoesnotexistinthedatabase', result => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Token not found');
        done();
    });
});

it('can\'t authorize an invalid token', done => {
    NodeCollection.authorizeAuthRequest('invalid!', result => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Token failed validation');
        done();
    });
});

it('can\'t deny an invalid token', done => {
    NodeCollection.denyAuthRequest('invalid!', result => {
        assert.equal(result.status, false);
        assert.equal(result.message, 'Token failed validation');
        done();
    });
});