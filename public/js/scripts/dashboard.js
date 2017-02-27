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
            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
            }).catch(function (error) {
                console.log(error);
            });
        };
        Dashboard.prototype.initializeCreatePromo = function () {
            var _this = this;
            $('#create-promo-form').validator().on('submit', function (e) {
                var is_valid = !e.isDefaultPrevented();
                if (!is_valid)
                    return;
                $(_this).find(':submit').attr('disabled', 'disabled');
                var file = e.target[3].files[0];
                var uploadTask = firebase.storage().ref().child('media/' + file.name).put(file, { contentType: file.type });
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload is running');
                            break;
                    }
                }, function (error) {
                    console.log(error);
                }, function () {
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log(downloadURL);
                });
                return false;
            });
        };
        return Dashboard;
    }());
    return Dashboard;
});
