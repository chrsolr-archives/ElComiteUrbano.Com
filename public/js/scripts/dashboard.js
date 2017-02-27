define(["require", "exports", "jquery", "firebase", "bootstrap", "bootstrap_validator"], function (require, exports, $, firebase) {
    "use strict";
    var Dashboard = (function () {
        function Dashboard() {
            var _this = this;
            $(document).ready(function () {
                _this.initializeFirebase();
                _this.initializeCreatePromo();
            });
        }
        Dashboard.prototype.initializeFirebase = function () {
            firebase.initializeApp({
                apiKey: "AIzaSyDBNvhShiLf_shh7aWm9IqLtof-Muwr_4s",
                authDomain: "elcomiteurbano-dev.firebaseapp.com",
                databaseURL: "https://elcomiteurbano-dev.firebaseio.com",
                storageBucket: "elcomiteurbano-dev.appspot.com",
                messagingSenderId: "1002857289292"
            });
            firebase.auth().getRedirectResult().then(function (response) {
                var result = response;
                if (JSON.parse(window.sessionStorage.getItem('fb_usc'))
                    && JSON.parse(window.sessionStorage.getItem('fb_usc')).credential) {
                    result = JSON.parse(window.sessionStorage.getItem('fb_usc'));
                }
                if (!result.credential) {
                    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
                }
                window.sessionStorage.setItem('fb_usc', JSON.stringify(result));
                firebase.auth(result);
            }).catch(function (error) { return console.log(error); });
        };
        Dashboard.prototype.initializeCreatePromo = function () {
            var $form = $('#create-promo-form');
            $form.validator().on('submit', function (e) {
                var is_valid = !e.isDefaultPrevented();
                if (!is_valid) {
                    return;
                }
                e.preventDefault();
                var file = e.target[3].files[0];
                if (!file) {
                    alert('Something went wrong with select file');
                    return;
                }
                $($form).find(':submit').attr('disabled', 'disabled');
                var uploadTask = firebase.storage().ref().child("media/" + file.name).put(file, { contentType: file.type });
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $($form).find(':submit').html("Uploading... " + parseInt(progress, 10) + "%");
                }, function (error) { return console.log(error); }, function () {
                    $($form).find(':submit').html("Saving...");
                    var form_data = $($form).serialize() + "&downloadUrl=" + uploadTask.snapshot.downloadURL;
                    $.ajax({
                        url: '/dashboard/create/promo',
                        method: 'post',
                        data: form_data
                    }).then(function (res) {
                        $($form).find(':submit').html("Done");
                        window.location.replace('/dashboard');
                    });
                });
            });
        };
        return Dashboard;
    }());
    return Dashboard;
});
