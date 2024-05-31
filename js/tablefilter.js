$('#search').keyup(() => { 
    
    var keyword = $('#search').val().toUpperCase();
    var table_2 = document.getElementById("tbody");
    var all_tr = table_2.getElementsByTagName("tr");

    for(var i=0; i<all_tr.length; i++){
        var id_column = all_tr[i].getElementsByTagName("td")[0];
        var name_column = all_tr[i].getElementsByTagName("td")[1];
        var topic_column = all_tr[i].getElementsByTagName("td")[2];
        var status_column = all_tr[i].getElementsByTagName("td")[4];

        if(id_column && name_column && status_column && topic_column){
            var id_value = id_column.textContent || id_column.innerText;
            var name_value = name_column.textContent || name_column.innerText;
            var status_value = status_column.textContent || status_column.innerText;
            var topic_value = topic_column.textContent || topic_column.innerText;

            id_value = id_value.toUpperCase();
            name_value = name_value.toUpperCase();
            status_value = status_value.toUpperCase();
            topic_value = topic_value.toUpperCase();

            if((id_value.indexOf(keyword) > -1) || (status_value.indexOf(keyword) > -1) || (name_value.indexOf(keyword) > -1) ||
            (topic_value.indexOf(keyword) > -1)
            ){
                all_tr[i].style.display = ""; // show
            }else{
                all_tr[i].style.display = "none"; // hide
            }
        }
    }
})
  