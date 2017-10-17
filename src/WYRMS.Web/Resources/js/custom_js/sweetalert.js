"use strict";

$(document).ready(function () {

    $('.basicalert').on('click', function (e) {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            confirmButtonColor: "#FB8678"
        });
    });

    $('.success_alert').on('click', function (e) {
        e.preventDefault();
        swal({
            title: "Success",
            text: "You have successfully clicked",
            type: "success",
            confirmButtonColor: "#22D69D"
        });
    });

    $('.ok_message').on('click', function (e) {
        swal({
            title: 'Are you sure?',
            text: "You will not be able to recover this imaginary file!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#22D69D',
            cancelButtonColor: '#FB8678',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonClass: 'btn',
            cancelButtonClass: 'btn'
        }).then(function () {
            swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        }, function (dismiss) {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                );
            }
        })
    });
    $('.custom_icon').on('click', function (e) {
        e.preventDefault();
        swal({
            title: "Sweet!",
            text: "Here's a custom image.",
            imageUrl: "img/authors/avatar1.jpg",
            imageWidth: 100,
            imageHeight: 100,
            animation: false
        });
    });

    $('.custom_html').on('click', function (e) {
        e.preventDefault();
        swal({
            title: "HTML Title!",
            text: 'A custom <span style="color:#F8BB86">html<span> message.',
            html: true
        });
    });

    $('.auto_close').on('click', function (e) {
        e.preventDefault();
        swal({
            title: "Auto close alert!",
            text: "I will close in 3 seconds.",
            timer: 3000,
            showConfirmButton: false
        });
    });
    $('.prom_alert').on('click', function (e) {
        swal({
            title: 'Input something',
            input: 'text',
            showCancelButton: true,
            inputPlacehokder: 'write something!',
            cancelButtonColor: '#fb8678',
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                    if (value) {
                        resolve();
                    } else {
                        reject('You need to write something!');
                    }
                });
            }
        }).then(function (result) {
            swal({
                type: 'success',
                html: 'You entered text is: ' + result
            });
        })
    });
    $('.ip_alert').on('click', function (e) {
        swal.queue([{
            title: 'Your IP Address',
            confirmButtonText: 'Show my IP',
            text: 'Your public IP will be received ' +
            'via  request',
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve) {
                    $.get('https://api.ipify.org?format=json')
                        .done(function (data) {
                            swal.insertQueueStep(data.ip);
                            resolve();
                        });
                });
            }
        }]).then(function () {
            swal(
                'Good job!',
                'Successfully checked your Ip',
                'success'
            )
        })
    });
    //Info
    $('#info-alert').on('click', function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "info",
            confirmButtonClass: 'btn',
            confirmButtonText: 'Info!',
            confirmButtonColor: '#4fc1e9'
        });
    });

    //Success
    $('#success-alert').on('click', function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "success",
            confirmButtonClass: 'btn',
            confirmButtonText: 'Success!',
            confirmButtonColor: '#22d69d'
        });
    });

    //Warning
    $('#warning-alert').on('click', function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",           
            confirmButtonClass: 'btn',
            confirmButtonText: 'Warning!',
            confirmButtonColor: '#ffb65f'
        });
    });

    //Danger
    $('#danger-alert').on('click', function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "error",
            confirmButtonClass: 'btn',
            confirmButtonText: 'Danger!',
            confirmButtonColor: '#fb8678'
        });
    });
    
});