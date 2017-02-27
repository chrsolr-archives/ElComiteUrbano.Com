/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../libs/firebase/firebase.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="bootstrap_validator" />

import * as $ from 'jquery';
import * as firebase from 'firebase';


class Dashboard {
    constructor(opts) {
        const _this = this;

        $(document).ready(() => {
            _this.initializeFirebase(opts);
            _this.initializeCreatePromo();
        });
    }

    initializeFirebase(opts): void {
        firebase.initializeApp(opts.FIREBASE);
        firebase.auth().getRedirectResult().then((response) => {
            const result = response;
            const session = JSON.parse(window.sessionStorage.getItem('fb_usc'));

            if (session && session.credential) {
                result = session;
            }

            if (!result.credential) {
                firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
            }

            window.sessionStorage.setItem('fb_usc', JSON.stringify(result));
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
                const form_data = `${$($form).serialize()}`;

                ajax(form_data);

                return false;
            }

            $($form).find(':submit').attr('disabled', 'disabled');

            const uploadTask = firebase.storage().ref().child(`media/${file.name}`).put(file, { contentType: file.type });

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $($form).find(':submit').html(`Uploading... ${parseInt(progress, 10)}%`);
            }, error => console.log(error), () => {
                $($form).find(':submit').html(`Saving...`);

                const form_data = `${$($form).serialize()}&downloadUrl=${uploadTask.snapshot.downloadURL}`;

                ajax(form_data);
            });

            function ajax(data) {
                $.ajax({
                    url: '/dashboard/create/promo',
                    method: 'post',
                    data: data
                }).then(res => {
                    $($form).find(':submit').html(`Done`);
                    window.location.replace('/dashboard');
                });
            }
        });
    }
}

export = Dashboard;