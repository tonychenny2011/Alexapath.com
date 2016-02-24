'use strict';

var expect = require('expect.js');
var userRepo = require('../../../repositories/UserRepository');
var bcrypt = require('bcrypt-nodejs');

describe('User Repository', function() {

  describe('Basic Stuff', function() {
    it('should create properly a local account', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };

      userRepo.createUser(sampleUser)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.password).to.not.be(null);
          expect(user.email).to.be(sampleUser.email);

          bcrypt.compare(sampleUser.password, user.password, function(err, res) {
            expect(res).to.be(true);
            done();
          });
        })
        .catch(function() {
          expect().fail('It should not happen');
          done();
        });
    });

    it('should properly change password in DB', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };
      var newPassword = 'admin2';

      userRepo.createUser(sampleUser)
        .then(function(user) {
          return userRepo.changeUserPassword(user.id, newPassword);
        })
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.password).to.not.be(null);

          bcrypt.compare(newPassword, user.password, function(err, res) {
            expect(res).to.be(true);
            done();
          });
        })
        .catch(function() {
          expect().fail('It should not happen');
          done();
        });
    });

    it('should handle properly creation of account with an existing email', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-l1-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };

      userRepo.createUser(sampleUser)
        .then(function() {
          return userRepo.createUser(sampleUser);
        })
        .then(function() {
          expect().fail('It should not happen');
          done();
        })
        .catch(function(err) {
          expect(err).to.be('Account with that email address already exists.');
          done();
        });
    });

    it('should successfully change profile data', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };

      var newProfile = {
        email: sampleUser.email,
        name: 'Test name',
        gender: 'male',
        location: 'Helsinki',
        website: 'http://microsoft.com',
      };

      userRepo.createUser(sampleUser)
        .then(function(user) {
          expect(user.email).to.be(sampleUser.email);

          return userRepo.changeProfileData(user.id, newProfile);
        })
        .then(function(user) {
          expect(user.email).to.be(newProfile.email);
          expect(user.profile.name).to.be(newProfile.name);
          expect(user.profile.gender).to.be(newProfile.gender);
          expect(user.profile.location).to.be(newProfile.location);
          expect(user.profile.website).to.be(newProfile.website);

          done();
        })
        .catch(function() {
          expect().fail('It should not happen');
          done();
        });
    });

    it('should successfully change e-mail to the different one', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };

      var newProfile = {
        email: 'new-test-local-' + uniqueness + '@puredev.eu',
      };

      userRepo.createUser(sampleUser)
        .then(function(user) {
          expect(user.email).to.be(sampleUser.email);

          return userRepo.changeProfileData(user.id, newProfile);
        })
        .then(function(user) {
          expect(user.email).to.be(newProfile.email);
          done();
        })
        .catch(function() {
          expect().fail('It should not happen');
          done();
        });
    });
  });

  describe('Facebook OAuth', function() {
    function createUser() {
      var uniqueness = Date.now();

      return {
        uniqueness: uniqueness,
        email: 'test-fb-' + uniqueness + '@puredev.eu',
        accessToken: 'accToken' + uniqueness,
        refreshToken: 'refToken' + uniqueness,
        profile: { id: uniqueness }
      };
    }

    it('should create properly a new user from facebook', function (done) {
      var $u = createUser();
      $u.profile._json = {email: $u.email};

      userRepo.createAccFromFacebook($u.accessToken, $u.refreshToken, $u.profile)
        .then(function (user) {
          expect(user).to.be.a('object');
          expect(user.facebookId).to.be($u.uniqueness.toString());
          expect(user.password).to.be(null);
          expect(user.email).to.be($u.email);
          done();
        })
        .catch(function() {
          expect().fail('It should not happen');
          done();
        });
    });

    it('should handle properly situation when email returned from facebook is empty', function (done) {
      var $u = createUser();
      $u.profile._json = { email: null };

      userRepo.createAccFromFacebook($u.accessToken, $u.refreshToken, $u.profile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.facebookId).to.be($u.uniqueness.toString());
          expect(user.password).to.be(null);
          expect(user.email).to.be(user.facebookId + '@facebook.com');
          done();
        });
    });

    it('should create properly a new user from facebook with a full profile', function (done) {
      var $u = createUser();

      //structure of the profile is from the actual request, yet data is totally randomized
      //Sorry, Garrett Alexion!
      var sampleProfile = {
        id: $u.uniqueness.toString(),
        username: undefined,
        displayName: 'Garrett Alexion',
        name: {
          familyName: 'Alexion',
          givenName: 'Garrett',
          middleName: undefined
        },
        gender: 'male',
        profileUrl: 'http://www.facebook.com/297638351',
        emails: [
          {
            value: $u.email
          }
        ],
        provider: 'facebook',
        _json: {
          id: $u.uniqueness.toString(),
          email: $u.email,
          first_name: 'Garrett',
          gender: 'male',
          last_name: 'Alexion',
          link: 'http://www.facebook.com/297638351',
          locale: 'en_US',
          name: 'Garrett Alexion',
          timezone: 2,
          updated_time: '2015-06-06T15:55:07+0000',
          verified: true
        }
      };

      userRepo.createAccFromFacebook($u.accessToken, $u.refreshToken, sampleProfile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.facebookId).to.be(sampleProfile.id);
          expect(user.email).to.be($u.email);
          expect(user.profile).to.be.a('object');
          expect(user.profile.name).to.be(sampleProfile.displayName);
          expect(user.profile.gender).to.be(sampleProfile.gender);
          done();
        });
    });

    it('should properly link facebook account to the existing local account', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };
      var $u = createUser();

      userRepo.createUser(sampleUser)
        .then(function(user) {
          $u.profile._json = {email: $u.email};
          $u.profile.displayName = "Test FB UserName";

          return userRepo.linkFacebookProfile(user.id, $u.accessToken, $u.refreshToken, $u.profile);
        })
        .then(function(fbUser) {
          expect(fbUser).to.be.a('object');
          expect(fbUser.email).to.be(sampleUser.email);
          expect(fbUser.profile).to.be.a('object');
          expect(fbUser.profile.name).to.be($u.profile.displayName);
          expect(fbUser.tokens).to.be.a('object');
          expect(fbUser.tokens.facebook).to.be($u.accessToken);
          done();
        });
    });

    it('should properly unlink linked facebook account', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };
      var $u = createUser();
      userRepo.createUser(sampleUser)
        .then(function(user) {
          $u.profile._json = {email: $u.email};

          return userRepo.linkFacebookProfile(user.id, $u.accessToken, $u.refreshToken, $u.profile);
        })
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.facebookId).to.not.be(null);
          expect(user.tokens).to.be.a('object');
          expect(user.tokens.facebook).to.be($u.accessToken);

          return userRepo.unlinkProviderFromAccount('facebook', user.id);
        })
        .then(function(user) {
          expect(user.tokens.facebook).to.be(null);
          expect(user.facebookId).to.be(null);

          done();
        });
    });
  });

  describe('Google OAuth', function() {
    function createUser() {
      var uniqueness = Date.now();
      var email = 'test-gg-' + uniqueness + '@puredev.eu';

      return {
        uniqueness: uniqueness,
        email: email,
        accessToken: 'accToken' + uniqueness,
        tokenSecret: 'secToken' + uniqueness,
        profile: { id: uniqueness, emails: [{ value: email }], _json: {} }
      };
    }

    it('should create properly a new user from google', function (done) {
      var $u = createUser();

      userRepo.createAccFromGoogle($u.accessToken, $u.tokenSecret, $u.profile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.facebookId).to.be(null);
          expect(user.googleId).to.be($u.uniqueness.toString());
          expect(user.password).to.be(null);
          expect(user.email).to.be($u.email);
          expect(user.tokens).to.be.a('object');
          expect(user.tokens.google).to.be($u.accessToken);
          done();
        });
    });

    it('should create properly a new user from google with picture', function (done) {
      var $u = createUser();
      $u.profile._json.image = {url: 'PICTURE_URL'};

      userRepo.createAccFromGoogle($u.accessToken, $u.tokenSecret, $u.profile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.profile).to.be.a('object');
          expect(user.profile.picture).to.be('PICTURE_URL');
          done();
        });
    });

    it('should create properly a new user from a full google profile', function (done) {
      var $u = createUser();
      $u.profile._json.picture = 'PICTURE_URL';

      var sampleProfile = {
        provider: 'google',
        id: '864852638' + $u.uniqueness,
        displayName: 'Lacy Hucks',
        name: { familyName: 'Hucks', givenName: 'Lacy' },
        emails: [ { value: $u.email, type: 'account' } ],
        photos: [ { value: 'https://biota.com/kolobus/overcondensation?a=kidneyroot&b=sear#mataeologue' } ],
        gender: 'male',
        _json: {
          kind: 'plus#person',
          etag: '"6de4a3e9-645e-4044-87ba-2c25689b58c9"',
          gender: 'male',
          emails: [ [Object] ],
          urls: [ [Object] ],
          objectType: 'person',
          id: '864852638' + $u.uniqueness,
          displayName: 'Lacy Hucks',
          name: { familyName: 'Hucks', givenName: 'Lacy' },
          braggingRights: 'unaffrighted',
          url: 'https://plus.google.com/+LacyHucks',
          image:
          {
            url: 'https://biota.com/kolobus/overcondensation?a=kidneyroot&b=sear#mataeologue',
            isDefault: false
          },
          placesLived: [ [Object], [Object] ],
          isPlusUser: true,
          language: 'en_GB',
          verified: false,
          cover: {
            layout: 'banner', coverPhoto: [Object], coverInfo: [Object]
          }
        }
      };

      userRepo.createAccFromGoogle($u.accessToken, $u.tokenSecret, sampleProfile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.profile).to.be.a('object');
          expect(user.profile.picture).to.be(sampleProfile._json.image.url);
          expect(user.profile.name).to.be(sampleProfile.displayName);
          expect(user.profile.gender).to.be(sampleProfile.gender);
          done();
        });
    });

    it('should properly link google account to the existing local account', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local2-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };
      var $u = createUser();

      userRepo.createUser(sampleUser)
        .then(function(user) {
          $u.profile.displayName = "Test GG UserName";

          return userRepo.linkGoogleProfile(user.id, $u.accessToken, $u.tokenSecret, $u.profile);
        })
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.email).to.be(sampleUser.email);
          expect(user.profile).to.be.a('object');
          expect(user.profile.name).to.be($u.profile.displayName);
          expect(user.tokens).to.be.a('object');
          expect(user.tokens.google).to.be($u.accessToken);
          done();
        });
    });
  });

  describe('LinkedIn OAuth', function() {
    function createUser() {
      var uniqueness = Date.now();
      var email = 'test-li-' + uniqueness + '@puredev.eu';

      return {
        uniqueness: uniqueness,
        email: email,
        accessToken: 'accToken' + uniqueness,
        tokenSecret: 'secToken' + uniqueness,
        profile: { id: uniqueness, _json: { emailAddress: email } }
      };
    }

    it('should create properly a new user from linkedin', function (done) {
      var $u = createUser();

      userRepo.createAccFromLinkedIn($u.accessToken, $u.tokenSecret, $u.profile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.facebookId).to.be(null);
          expect(user.linkedInId).to.be($u.uniqueness.toString());
          expect(user.password).to.be(null);
          expect(user.email).to.be($u.email);
          expect(user.tokens).to.be.a('object');
          expect(user.tokens.linkedin).to.be($u.accessToken);
          done();
        });
    });

    it('should create properly a new user from linkedin with picture', function (done) {
      var $u = createUser();
      $u.profile._json.pictureUrl = 'PICTURE_URL';
      $u.profile._json.location = { name: 'Warsaw' };

      userRepo.createAccFromLinkedIn($u.accessToken, $u.tokenSecret, $u.profile)
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.profile).to.be.a('object');
          expect(user.profile.picture).to.be('PICTURE_URL');
          expect(user.profile.location).to.be('Warsaw');
          done();
        });
    });

    it('should properly link linkedin account to the existing local account', function (done) {
      var uniqueness = Date.now();
      var sampleUser = {
        email: 'test-local2-' + uniqueness + '@puredev.eu',
        password: 'admin1' //:D
      };
      var $u = createUser();

      userRepo.createUser(sampleUser)
        .then(function(user) {
          $u.profile.displayName = "Test TW UserName";

          return userRepo.linkLinkedInProfile(user.id, $u.accessToken, $u.tokenSecret, $u.profile);
        })
        .then(function(user) {
          expect(user).to.be.a('object');
          expect(user.email).to.be(sampleUser.email);
          expect(user.profile).to.be.a('object');
          expect(user.profile.name).to.be($u.profile.displayName);
          expect(user.tokens).to.be.a('object');
          expect(user.tokens.linkedin).to.be($u.accessToken);
          done();
        });
    });
  });

  describe('Reset Password Functionality', function() {
    it('should password be changed properly', function(done) {
      var uniqueness = Date.now();
      var newPassword = 'admin2';
      var token = 'abcdef0123456789' + uniqueness;
      var sampleUser = {
        email: 'test-local123-' + uniqueness + '@puredev.eu',
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 36000000,
        password: 'admin1' //:D
      };

      userRepo.createUser(sampleUser)
        .then(function() {
          return userRepo.changeUserPswAndResetToken(token, newPassword);
        })
        .then(function(user) {
          expect(user).to.not.be(null);
          expect(user.resetPasswordToken).to.be(null);
          expect(user.resetPasswordExpires).to.be(null);

          bcrypt.compare(newPassword, user.password, function(err, res) {
            expect(res).to.be(true);
            done();
          });
        });
    });
  });

});