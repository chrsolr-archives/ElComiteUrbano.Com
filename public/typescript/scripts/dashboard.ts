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

        firebase.auth().getRedirectResult().then(function (response) {
            const result = response;

            if (JSON.parse(window.sessionStorage.getItem('fb_usc'))
                && JSON.parse(window.sessionStorage.getItem('fb_usc')).credential) {
                result = JSON.parse(window.sessionStorage.getItem('fb_usc'))
            }

            if (!result.credential) {
                firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
            }

            window.sessionStorage.setItem('fb_usc', JSON.stringify(result));

            firebase.auth(result);
        }).catch(error => console.log(error));
    }

    initializeCreatePromo(): void {
        const $form = $('#create-promo-form');

        $form.validator().on('submit', (e: JQueryEventObject) => {
            const is_valid = !e.isDefaultPrevented();

            if (!is_valid) { 
                return; 
            }

            e.preventDefault();

            const file = e.target[3].files[0];

            if (!file) {
                alert('Something went wrong with select file');
                return;
            }

            $($form).find(':submit').attr('disabled', 'disabled');

            const uploadTask = firebase.storage().ref().child(`media/${file.name}`).put(file, { contentType: file.type });

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $($form).find(':submit').html(`Uploading... ${parseInt(progress, 10)}%`);
            }, error => console.log(error), () => {
                $($form).find(':submit').html(`Saving...`);

                const form_data = `${$($form).serialize()}&downloadUrl=${uploadTask.snapshot.downloadURL}`;

                $.ajax({
                    url: '/dashboard/create/promo',
                    method: 'post',
                    data: form_data
                }).then(res => {
                    $($form).find(':submit').html(`Done`);
                    window.location.replace('/dashboard');
                });
            });
        });
    }
}

export = Dashboard;