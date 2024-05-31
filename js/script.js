



$(document).ready(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
  if(!userdata){
    window.location.assign('/')
  }
});
    $('#newcourse-class').change(function() {
        selectedClass = $(this).val();
        // document.getElementById('termSelect').innerHTML = ''
        document.getElementById('newcourse-subject').innerHTML = ''
      
        if (selectedClass === 'Year 7' || selectedClass === 'Year 8' || selectedClass === 'Year 9') {
          // Populate first term subjects
          document.getElementById('newcourse-subject').innerHTML += `
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
          document.getElementById('newcourse-subject').innerHTML += `
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
        // if (selectedClass != '') {
      
        //   // Populate Year 7 term options
        //   document.getElementById('termSelect').innerHTML += `
        //     <option value="">-- Term --</option>
        //     <option value="firstTerm">First Term</option>
        //     <option value="secondTerm">Second Term</option>
        //     <option value="thirdTerm">Third Term</option>`
        //   // ).prop('disabled', false);
        // }
      });

$('#newuser-btn').on('click', () => {

    const year = $('#newcourse-class').val();
    const subject = $('#newcourse-subject').val();
    const term = $('#newcourse-term').val();
    const labels = document.getElementById('newcourse-topic').value.split(',').map(label => label.trim());
    const chartData = Array(labels.length).fill(0);

    const newTopic = {
        labels: labels,
        chartData: chartData
    };

    fetch('http://localhost:3000/update-topics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ year, subject, term, newTopic })
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
});

        
// });
    var year = ''
    var subject = ''
    var term = ''
    var newChartDataValue = ''
    var topicToFind = ''

    $('#updatecourse-class').change(function() {
        year = $(this).val();
        document.getElementById('updatecourse-topic').innerHTML = `
                <option value="">-- Topics --</option>`
        
        document.getElementById('updatecourse-subject').innerHTML = ''
      
        if (year === 'Year 7' || year === 'Year 8' || year === 'Year 9') {
          // Populate first term subjects
          document.getElementById('updatecourse-subject').innerHTML += `
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
          
        } else if (year === 'Year 10' || year === 'Year 12' || year === 'Year 13') {
          // Populate second term subjects
          document.getElementById('updatecourse-subject').innerHTML += `
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
    })

    $('#updatecourse-term').change(function() {
        term = $(this).val();
    })

    $('#updatecourse-subject').change(function() {
        subject = $(this).val();
        document.getElementById('updatecourse-topic').innerHTML = ''

        if (subject != '') {

            fetch('http://localhost:3000/get-topics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ year, subject, term })
            })
            .then(response => response.json())
            .then(data => {
                data.labels.map(i => {
                    document.getElementById('updatecourse-topic').innerHTML += `
                    <option value="${i}">${i}</option>`
                })
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
        }
    });

    $('#updatecourse-btn').on('click', () => {

        year = $('#updatecourse-class').val();
        subject = $('#updatecourse-subject').val();
        const term = $('#updatecourse-term').val();

        const newChartDataValue = $('#updatecourse-level').val();

        const topics = JSON.parse(localStorage.getItem('labels'));
        // console.log(topics)

        const topicToFind = $('#updatecourse-topic').val().toString(); 
        const labelIndex = topics.labels.indexOf(topicToFind);

        // console.log('year: ' + year, 'subject: ' + subject, 'term: ' + term, 'level: ' + newChartDataValue, 'Topic: ' + topicToFind);
        var topicIndex = topicToFind;

        fetch('http://localhost:3000/update-chartData-index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ year, subject, term, topicIndex, labelIndex, newChartDataValue })
        })
        .then(response => response.text())
        .then(data => {
            

            $('.toast').css("border-left", "5px solid green");
            $('.toast').css("color", "green");
            $('#toast-p').text("Success!");
            $('#toast-span').text(data);
    
            $('.toast-cont').fadeIn(500);
            setTimeout(() => {
                submitTopic(year, subject, term, newChartDataValue, topicToFind);
              $('.toast-cont').fadeOut(500);
              window.location.reload()
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

function submitTopic(year, subject, term, newChartDataValue, topicToFind){
  
    const userdata = JSON.parse(localStorage.getItem('userdata'));

    var name = userdata.name;
    var id = userdata.id;
    var topic = topicToFind;
    var status = "Pending";

    fetch('http://localhost:3000/submit-topic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, topic, year, status, subject, term, newChartDataValue })
    })
    .then(response => response.text())
    .then(data => {
        // console.log(data);
        // alert(data);
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
    });
}
 
