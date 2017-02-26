/// <reference path="../../../typings/index.d.ts" />
/// <amd-dependency path="bootstrap" />
/// <amd-dependency path="bootstrap_validator" />

import * as $ from 'jquery';

 class Dashboard {
    constructor(){
        const _this = this;

        $(document).ready(() => {
            _this.createPromo();
        });
    }

    createPromo(): void {
        $('#create-promo-form').validator().on('submit', (e: JQueryEventObject) => {
            const is_valid = !e.isDefaultPrevented();

            if (!is_valid) return;

            $(this).find(':submit').attr('disabled', 'disabled');

            const file = e.target[3].files[0];

            const form_data = new FormData();
            form_data.append('audio', file, file.name);

            $.ajax({
                url: '/dashboard/create/promo',
                method: 'POST',
                data: form_data,
                processData: false,
                contentType: false
            }).then((res) => {
                alert(res);
                console.log(res);
            }).catch((err) => {
                alert(err);
                console.log(err);
            })

            return false;
            //$(this).submit();
        });
    }
 }

 export = Dashboard;