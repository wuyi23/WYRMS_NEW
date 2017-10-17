"use strict";

$(document).ready(function () {

// bootstrap wizard//
    $(".select21").select2({
        theme: "bootstrap",
        placeholder: "",
        width: '100%'
    });
    $('input[type="checkbox"].custom-checkbox, input[type="radio"].custom-radio').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%'
    });
    $("#dob").datetimepicker({
        widgetPositioning: {
            vertical: 'bottom'
        },
        format: 'DD/MM/YYYY',
        useCurrent: false,
        maxDate: 'now'
    });
    $("#adduser_form").bootstrapValidator({
        fields: {
            first_name: {
                validators: {
                    notEmpty: {
                        message: 'The first name is required'
                    }
                },
                required: true,
                minlength: 3
            },
            last_name: {
                validators: {
                    notEmpty: {
                        message: 'The last name is required'
                    }
                },
                required: true,
                minlength: 3
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'Password is required'
                    },
                    different: {
                        field: 'first_name,last_name',
                        message: 'Password should not match first or last name'
                    }
                }
            },
            password_confirm: {
                validators: {
                    notEmpty: {
                        message: 'Confirm Password is required'
                    },
                    identical: {
                        field: 'password'
                    },
                    different: {
                        field: 'first_name,last_name',
                        message: 'Confirm Password should match with password'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required'
                    },
                    regexp: {
                        regexp: /^\S+@\S{1,}\.\S{1,}$/,
                        message: 'The input is not a valid email address'
                    }
                }
            },
            bio: {
                validators: {
                    notEmpty: {
                        message: 'Bio is required and cannot be empty'
                    }
                },
                minlength: 20
            },

            gender: {
                validators: {
                    notEmpty: {
                        message: 'Please select a gender'
                    }
                }
            },
            activate: {
                validators: {
                    notEmpty: {
                        message: 'Please check the checkbox to activate'
                    }
                }
            },
            group: {
                validators: {
                    notEmpty: {
                        message: 'You must select a group'
                    }
                }
            }
        }
    });

    $('#activate').on('ifChanged', function (event) {
        $('#adduser_form').bootstrapValidator('revalidateField', $('#activate'));
    });

    $('#pager_wizard').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        'onNext': function (tab, navigation, index) {
            var $validator = $('#adduser_form').data('bootstrapValidator').validate();
            return $validator.isValid();
        },
        onTabClick: function (tab, navigation, index) {
            return false;
        },
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            var pager_wizard = $('#pager_wizard');
            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                pager_wizard.find('.pager .next').hide();
                pager_wizard.find('.pager .finish').show();
                pager_wizard.find('.pager .finish').removeClass('disabled');
            } else {
                pager_wizard.find('.pager .next').show();
                pager_wizard.find('.pager .finish').hide();
            }
            pager_wizard.find('.finish').click(function () {
                var $validator = $('#adduser_form').data('bootstrapValidator').validate();
                if ($validator.isValid()) {
                    $('#myModal').modal('show');
                    return $validator.isValid();
                    $('#pager_wizard').find("a[href='#tab1']").tab('show');
                }
            });
            $('#myModal').on('hide.bs.modal', function (e) {
                location.reload();
            });

        }
    });
});
