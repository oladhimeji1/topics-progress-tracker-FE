$(document).ready(() => {
  
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  if(!userdata){
    window.location.assign('/')
  }
  $('#username').text(userdata.name + ` (${userdata.id})`)
})


  var jsonData;
  
async function getClassTopicData(className, subjectName, termName) {
  try {
    // $('.loader-cont').fadeIn(300);
    const response = await fetch('http://localhost:3000/topics');
    jsonData = await response.json();
    // console.log(jsonData)
    // $('.loader-cont').delay(1000);
    // $('.loader-cont').fadeOut(300);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
  // Check if the specified class exists in the JSON data
  if (className in jsonData.classes) {
    const classData = jsonData.classes[className];

    // Check if the specified subject exists within the class data
    if (subjectName in classData.subjects) {
      const subjectData = classData.subjects[subjectName];

      // Check if the specified term exists within the subject data
      if (termName in subjectData) {
        const termData = subjectData[termName];

        // Prepare an array to store labels and chartData objects
        const topicData = [];

        // Iterate over each topic object in the specified term data
        termData.forEach(topic => {
          // Extract labels and chartData for the current topic
          const { labels, chartData } = topic;
          
          // Push an object containing labels and chartData to the topicData array
          topicData.push({ labels, chartData });
          
          localStorage.setItem('labels', JSON.stringify(topicData[0]))
          
        });

        // console.log(typeOf(termName));
        plotChart(topicData[0].labels, topicData[0].chartData, className, termName, subjectName)
      } else {
        return []; // Term not found for the specified subject
      }
    } else {
      return []; // Subject not found for the specified class
    }
  } else {
    return []; // Class not found in the JSON data
  }
}

// Example usage:
var selectedClass = 'Year 7';
var subjectSelect = 'Mathematics';
var selectedTerm = 'firstTerm';

getClassTopicData(selectedClass, subjectSelect, selectedTerm);

$('#selected-class').change(function() {
  selectedClass = $(this).val();
  document.getElementById('termSelect').innerHTML = ''
  document.getElementById('subjectSelect').innerHTML = ''

  if (selectedClass === 'Year 7' || selectedClass === 'Year 8' || selectedClass === 'Year 9') {
    // Populate first term subjects
    document.getElementById('subjectSelect').innerHTML += `
      <option>-- Subject --</option>
      <option value="EnglishLanguage">English Language</option>
      <option value="Mathematics">Mathematics</option>
      <option value="Science">Science</option>
      <option value="InformationTechnology">Information Technology</option>
      <option value="IslamicReligionStudies">Islamic Religion Studies</option>
      <option value="ArabicLanguage">Arabic Language</option>
      <option value="Quran">Qur'an</option>
      <option value="AzkarHadith">Azkar & Hadith</option>
      <option value="BusinessStudies">Business Studies</option>
      <option value="CreativeArt">Creative Art</option>
      <option value="NationalValues">National Values</option>
      <option value="PreVocationalStudies">Pre-vocational studies</option>
      <option value="History">History</option>
      <option value="Hausa">Hausa</option>
      `
    
  } else if (selectedClass === 'Year 10' || selectedClass === 'Year 12' || selectedClass === 'Year 13') {
    // Populate second term subjects
    document.getElementById('subjectSelect').innerHTML += `
      <option>-- Subject --</option>
      <option value="">Select subject</option>
      <option value=”EnglishLanguage">English Language</option>
      <option value=”Mathematics">Mathematics</option>
      <option value=”ComputerScience">Computer Science</option>
      <option value=”DataProcessing">Data Processing</option>
      <option value=”Civic">Civic</option>
      <option value=”Biology">Biology</option>
      <option value=”Physics">Physics</option>
      <option value=”Chemistry">Chemistry</option>
      <option value=”Economics">Economics</option>
      <option value=”Account">Account</option>
      <option value=”Commerce">Commerce</option>
      <option value=”BusinessStudies">Business Studies</option>
      <option value=”Geography">Geography</option>
      <option value=”IslamicReligiousStudies">Islamic &amp; Religious Studies</option>
      <option value=”FurtherMathematics">Further Mathematics</option>
      <option value=”History">History</option>
      <option value=”LiteratureInEnglish">Literature In English</option>
      <option value=”Government">Government</option>
      <option value=”ArtDesign">Art &amp; Design</option>
      <option value=”ArabicLanguage">Arabic Language</option>
      <option value=”Quran">Qur'an</option>
      <option value=”TechnicalDrawing">Technical Drawing</option>`
    
  }

  // Show appropriate Term options based on selected class
  if (selectedClass != '') {

    // Populate Year 7 term options
    document.getElementById('termSelect').innerHTML += `
      <option value="">-- Term --</option>
      <option value="firstTerm">First Term</option>
      <option value="secondTerm">Second Term</option>
      <option value="thirdTerm">Third Term</option>`
    // ).prop('disabled', false);
  }
});

// Event handler for Term select box change
$('#termSelect').change(function() {
  selectedTerm = $(this).val();
});

$('#subjectSelect').change(function() {
  subjectSelect = $(this).val()
  // console.log(subjectSelect.)
  getClassTopicData(selectedClass, subjectSelect, selectedTerm);
  // console.log(selectedClass, subjectSelect, selectedTerm)
})


function plotChart(labels, chartData, chartClass, chartTerm, subjectName){
  // console.log(labels, chartData, chartClass, chartTerm, subjectName)
  const ctx = document.getElementById('report-bar-chart');

  var chartTerm;
  if(chartTerm === 'firstTerm'){
    chartTerm = 'First'
  } else if(chartTerm === 'secondTerm'){
    chartTerm = 'Second'
  } else if(chartTerm === 'thirdTerm'){
    chartTerm = 'Third'
  }

  const existingChart = Chart.getChart(ctx);

  if (existingChart) {
    existingChart.destroy();
  }

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: subjectName + ' topics progress for ' + chartClass + ', ' + chartTerm + ' term',
        data: chartData,
        borderWidth: 1,
        backgroundColor: ['Blue', 'Green']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

async function getSubmittedTopics() {
  try {
    const response = await fetch('http://localhost:3000/submitted');
    jsonData = await response.json();

    jsonData.submittedTopics.map(subject => {
      const subjectString = JSON.stringify(subject);
      
      document.getElementById('tbody').innerHTML +=
      `<tr data-tw-merge="" class="intro-x">
      <td data-tw-merge="" class="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
          <div class="flex">
              <a class="whitespace-nowrap font-medium" href="">
                  ${subject.id}
              </a>
          </div>
      </td>
      <td data-tw-merge="" class="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
          <a class="whitespace-nowrap font-medium" href="">
              ${subject.name}
          </a>
          <div class="mt-0.5 whitespace-nowrap text-xs text-slate-500">
          ${subject.year}
          </div>
      </td>
      <td data-tw-merge="" class="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
        ${subject.topic}
      </td>
      <td data-tw-merge="" class="px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
        ${subject.newChartDataValue}
      </td>
      <td data-tw-merge="" class="px-5 py-3 border-b dark:border-darkmode-300 box w-40 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600">
          <div class="flex items-center justify-center ${subject.status === 'Pending' ? 'text-warning' : subject.status === 'Rejected' ? 'text-danger' : 'text-success'}">
          ${subject.status}
          </div>
      </td>
      <td data-tw-merge="" class="px-5 py-3 border-b dark:border-darkmode-300 box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400">
          <div class="flex items-center justify-center">
              <a onclick='updateStatus(${subjectString}, "approve")' class="mr-3 ico flex items-center text-success" title="Approve">
                  <i data-tw-merge="" data-lucide="check-square" class="stroke-1.5 mr-1 h-4 w-4"></i>
               </a>
              <a onclick='updateStatus(${subjectString}, "reject")' class="flex ico items-center text-danger" title="Reject">
                  <i data-tw-merge="" data-lucide="trash" class="stroke-1.5 mr-1 h-4 w-4"></i>
              </a>
          </div>
      </td>
    </tr>`
    })
    // $('.loader-cont').delay(1000);
    // $('.loader-cont').fadeOut(300);
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
}

// Approve and Reject
function updateStatus(subject, action){
  try {

    if (action === 'approve') {
      subject.status = 'Approved'

      fetch('http://localhost:3000/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subject)
        })
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
            $('.toast').css("border-left", "5px solid red");
            $('.toast').css("color", "red");
            $('#toast-p').text("Error!");
            $('#toast-span').text(error);
    
            $('.toast-cont').fadeIn(500);
            setTimeout(() => {
              $('.toast-cont').fadeOut(500);
              window.location.reload()
            }, 5000);
        });
      // console.log('Approving subject:', subject, action);
    } else if (action === 'reject') {
      subject.status = 'Rejected'
      
      fetch('http://localhost:3000/update-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subject)
        })
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
            // console.error('Error:', error);
            $('.toast').css("border-left", "5px solid red");
            $('.toast').css("color", "red");
            $('#toast-p').text("Error!");
            $('#toast-span').text(error);
    
            $('.toast-cont').fadeIn(500);
            setTimeout(() => {
              $('.toast-cont').fadeOut(500);
              window.location.reload()
            }, 5000);
        });
      // console.log('Rejecting subject:', subject, action);
    }
  } catch (error) {
    console.error('Error parsing subject:', error);
  }
}

function checkConnection(){
  // console.log('Initially ' + (window.navigator.onLine ? 'on' : 'off') + 'line');
  if(window.navigator.onLine){
    $('.toast').css("border-left", "5px solid red");
    $('.toast').css("color", "red");
    $('#toast-p').text("Network Status");
    $('#toast-span').text('Your are connected to the internet');

    $('.toast-cont').fadeIn(500);
    setTimeout(() => {
      $('.toast-cont').fadeOut(500);
      // window.location.reload()
    }, 5000);
  }
 
}


getSubmittedTopics();
// checkConnection();