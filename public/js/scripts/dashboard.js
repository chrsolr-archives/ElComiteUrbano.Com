define(["require", "exports", "jquery", "bootstrap", "bootstrap_validator"], function (require, exports, $) {
    "use strict";
    var Dashboard = (function () {
        function Dashboard() {
            var _this = this;
            $(document).ready(function () {
                _this.createPromo();
            });
        }
        Dashboard.prototype.createPromo = function () {
            var _this = this;
            $('#create-promo-form').validator().on('submit', function (e) {
                var is_valid = !e.isDefaultPrevented();
                if (!is_valid)
                    return;
                $(_this).find(':submit').attr('disabled', 'disabled');
                var file = e.target[3].files[0];
                var form_data = new FormData();
                form_data.append('audio', file, file.name);
                $.ajax({
                    url: '/dashboard/create/promo',
                    method: 'POST',
                    data: form_data,
                    processData: false,
                    contentType: false
                }).then(function (res) {
                    alert(res);
                    console.log(res);
                }).catch(function (err) {
                    alert(err);
                    console.log(err);
                });
                return false;
            });
        };
        return Dashboard;
    }());
    return Dashboard;
});
