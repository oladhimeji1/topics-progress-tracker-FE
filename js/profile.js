$(document).ready(() => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  if(!userdata){
    window.location.assign('/')
  }

  var url = 'http://localhost:3000/'
  var onlineUrl = 'https://topics-progress-tracker-be.onrender.com/'
  
  const pass = generatePass();
  $('#gen-psw').text(`Password: ${pass}`);

  $('#newuser-btn').on('click', () => {

    if(!$('#newuser-name').val()){
      $('.toast').css("border-left", "5px solid red");
      $('.toast').css("color", "red");
      $('#toast-p').text("Error!");
      $('#toast-span').text("User name must be fille!");

      $('.toast-cont').fadeIn(500);
      setTimeout(() => {
        $('.toast-cont').fadeOut(500);
      }, 3000)      
    } else if(!$('#newuser-id').val()){
      $('.toast').css("border-left", "5px solid red");
      $('.toast').css("color", "red");
      $('#toast-p').text("Error!");
      $('#toast-span').text("User ID must be fille!");

      $('.toast-cont').fadeIn(500);
      setTimeout(() => {
        $('.toast-cont').fadeOut(500);
      }, 3000) 
    }else if(!$('#newuser-class').val()){
      $('.toast').css("border-left", "5px solid red");
      $('.toast').css("color", "red");
      $('#toast-p').text("Error!");
      $('#toast-span').text("Class(es) must be assign to user");

      $('.toast-cont').fadeIn(500);
      setTimeout(() => {
        $('.toast-cont').fadeOut(500);
      }, 3000) 
    } else {
      
      const arrayOfSubjects = $('#newuser-class').val().split(',').map(subject => subject.trim());
      const url = url + 'users';
      
      const _data = {
        "id": $('#newuser-id').val(),
        "name": $('#newuser-name').val(),
        "usertype": "user",
        "psw": pass,
        "class": arrayOfSubjects
      }
      
      const requestOptions = {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(_data)
      };

      fetch(url, requestOptions)
      .then(response => response.text())
      .then(data => {
        $('.toast').css("border-left", "5px solid green");
        $('.toast').css("color", "green");
        $('#toast-p').text("Success!");
        $('#toast-span').text(data);

        $('.toast-cont').fadeIn(500);
        setTimeout(() => {
          $('.toast-cont').fadeOut(500);
          window.location.reload()
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      })
    }
  })  
})

async function getUser(userId){
  fetch(`https://topics-progress-tracker-be.onrender.com/getUser/${userId}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
    const subjectsString = data.class.join(", ");
    $('#newuser-id').val(data.id)
    $('#newuser-name').val(data.name)
    $('#newuser-class').val(subjectsString)
    $('#gen-psw').text('Password: ' + data.psw)
  })
  .catch(error => {
      document.getElementById('userDetails').innerText = `Error: ${error.message}`;
  });

}

async function getAllUsers() {
    try {
      // $('.loader-cont').fadeIn(300);
      const response = await fetch(url + 'users');
      jsonData = await response.json();
  
      setTimeout(() => {
        $('.loader-cont').fadeOut(300);
      }, 1500)
    //   $(".loader-cont").delay(1000);
      
      jsonData.users.map(user => {
        
        document.getElementById('users-container').innerHTML +=
        `<div class="intro-x" onclick="getUser('${user.id}')">
            <div class="box zoom-in mb-3 flex items-center px-5 py-3">
                <div class="side-menu__icon">
                    <i data-tw-merge="" data-lucide="users" class="stroke-1.5 w-5 h-5"></i>
                </div>
                <div class="ml-4 mr-auto">
                    <div class="font-medium">${user.name}</div>
                    <div class="mt-0.5 text-xs text-slate-500">
                        ${user.id}
                    </div>
                </div>
            </div>
        </div>`
      })
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
    }
}

getAllUsers();
// updateUsers();

function generatePass() {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789@#$';

  for (let i = 1; i <= 8; i++) {
      let char = Math.floor(Math.random()
          * str.length + 1);

      pass += str.charAt(char)
  }

  return pass;
}