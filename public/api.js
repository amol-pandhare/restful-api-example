var getButton = document.getElementById('user_form');
getButton.addEventListener('submit', getRequest);

function getRequest(event) {
    event.preventDefault();
    var id = event.target.noteID.value;

    fetch(`/api/notes/${id}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(JSON.stringify(data));
            var notesText = "";

            if(id) {
                notesText += data.noteTitle + "<br />";
            } else {
                for(var i in data) {
                    notesText += data[i].noteTitle + "<br />";
                }
            }
            document.getElementById("results").innerHTML = notesText;
        })
}

var getButton = document.getElementById('post_form');
getButton.addEventListener('submit', postRequest);

function postRequest(event) {
    event.preventDefault();
    var title = event.target.noteTitle.value;
    var content = event.target.noteContent.value;

    post = {
        title:title,
        content: content
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch('/api/notes', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .then(error => console.error('error', error)) 
}

var getButton = document.getElementById('del_form');
getButton.addEventListener('submit', delRequest);

function delRequest(event) {
    event.preventDefault();
    var id = event.target.noteID.value;
    
    const options = {
        method: 'DELETE',
        body: JSON.stringify({id:id}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`/api/notes/${id}`, options)
        .then(res => res.json())
        .then(data => console.log('movie deleted: ', data))
        .then(error => console.error('error', error)) 
}


var getButton = document.getElementById('update_form');
getButton.addEventListener('submit', updateRequest);

function updateRequest(event) {
    event.preventDefault();
    var id = event.target.noteID.value;
    var title = event.target.noteTitle.value;
    var content = event.target.noteContent.value;

    post = {
        title:title,
        content: content
    }

    const options = {
        method: 'PATCH',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }

    return fetch(`/api/notes/${id}`, options)
        .then(res => res.json())
        .then(data => console.log('movie updated: ', data))
        // .then(error => console.error('error', error)) 
}