let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();

function saveNote(){

let name = document.getElementById("name").value;

let course = document.getElementById("course").value;

let date = document.getElementById("date").value;

let note = document.getElementById("note").value;

if(name=="" || course=="" || date=="" || note==""){
alert("Please Fill All Fields");
return;
}

let newNote={
name:name,
course:course,
date:date,
note:note
};

notes.push(newNote);

localStorage.setItem("notes",JSON.stringify(notes));

document.getElementById("name").value="";
document.getElementById("course").value="";
document.getElementById("date").value="";
document.getElementById("note").value="";

displayNotes();

}

function displayNotes(list=notes){

let container=document.getElementById("notesContainer");

container.innerHTML="";

if(list.length==0){
container.innerHTML="<h3>No Notes Found</h3>";
return;
}

list.forEach((item,index)=>{

container.innerHTML+=`

<div class="noteCard">

<h3>${item.name}</h3>

<p><b>Course:</b> ${item.course}</p>

<p><b>Date:</b> ${item.date}</p>

<p>${item.note}</p>

<button onclick="deleteNote(${index})">Delete</button>

</div>

`;

});

}

function deleteNote(index){

notes.splice(index,1);

localStorage.setItem("notes",JSON.stringify(notes));

displayNotes();

}

function filterNotes(){

let searchDate=document.getElementById("searchDate").value;

if(searchDate==""){
displayNotes();
return;
}

let filtered=notes.filter(item=>item.date===searchDate);

displayNotes(filtered);

}
