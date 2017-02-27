/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../libs/firebase/firebase.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="bootstrap_validator" />

import * as $ from 'jquery';
import * as firebase from 'firebase';


class Dashboard {
    constructor() {
        const _this = this;

        $(document).ready(() => {
            _this.initializeFirebase();
            _this.initializeCreatePromo();
        });
    }

    initializeFirebase(): void {
        firebase.initializeApp({
            apiKey: "AIzaSyDBNvhShiLf_shh7aWm9IqLtof-Muwr_4s",
            authDomain: "elcomiteurbano-dev.firebaseapp.com",
            databaseURL: "https://elcomiteurbano-dev.firebaseio.com",
            storageBucket: "elcomiteurbano-dev.appspot.com",
            messagingSenderId: "1002857289292"
        });

        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {

            }).catch((error) => console.log(error));

    }

    initializeCreatePromo(): void {
        $('#create-promo-form').validator().on('submit', (e: JQueryEventObject) => {
            const is_valid = !e.isDefaultPrevented();

            if (!is_valid) return;

            $(this).find(':submit').attr('disabled', 'disabled');

            const file = e.target[3].files[0];

            const uploadTask = firebase.storage().ref().child('media/' + file.name).put(file, { contentType: file.type });

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, (error) => {
                console.log(error);
            }, () => {
                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);

            });

            return false;

            // $.ajax({
            //     url: '/dashboard/create/promo',
            //     method: 'POST',
            //     data: form_data,
            //     processData: false,
            //     contentType: false
            // }).then((res) => {
            //     alert(res);
            //     console.log(res);
            // }).catch((err) => {
            //     alert(err);
            //     console.log(err);
            // })


            //$(this).submit();
        });
    }
}

export = Dashboard;