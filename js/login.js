$(document).ready(() => {

    localStorage.clear();
    var username = '', password = '';

    $('#username').blur(() => {
        username = $('#username').val();
    });

    $('#password').blur(() => {
        password = $('#password').val()
    });

    $('#btn').click(() => {
        if(!password || !username){
            $('.toast').css("border-left", "5px solid red");
            $('.toast').css("color", "red");
            $('#toast-p').css("color", "red");
            $('#toast-p').text("Error!");
            $('#toast-span').text('Please make sure the form is filled!');
    
            $('.toast-cont').fadeIn(500);
            setTimeout(() => {
              $('.toast-cont').fadeOut(500);
              window.location.reload()
            }, 3000);
        } else {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                if(data.err){
                    $('.toast').css("border-left", "5px solid red");
                    $('.toast').css("color", "red");
                    $('#toast-p').css("color", "red");
                    $('#toast-p').text("Error!");
                    $('#toast-span').text(data.err);
            
                    $('.toast-cont').fadeIn(500);
                    setTimeout(() => {
                        $('.toast-cont').fadeOut(500);
                        window.location.reload();
                    }, 3000);
                } else if(data.id){
                    localStorage.setItem('userdata', JSON.stringify(data));
                    $('.toast').css("border-left", "5px solid green");
                    $('.toast').css("color", "green");
                    $('#toast-p').css("color", "green");
                    $('#toast-p').text("Success!");
                    $('#toast-span').text('Login successful, you will be redirected to the dashboard');
            
                    $('.toast-cont').fadeIn(500);
                    setTimeout(() => {
                        $('.toast-cont').fadeOut(500);
                        window.location.assign('./home/')
                    }, 3000);
                    // console.log(data)
                }
            })
            .catch(error => {
                // console.error('Error:', error);
                $('.toast').css("border-left", "5px solid red");
                $('.toast').css("color", "red");
                $('#toast-p').css("color", "red");
                $('#toast-p').text("Error!");
                $('#toast-span').text(error);
        
                $('.toast-cont').fadeIn(500);
                setTimeout(() => {
                    $('.toast-cont').fadeOut(500);
                    window.location.reload()
                }, 3000);
                });
        }
       
    });
})
