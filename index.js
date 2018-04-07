//database references
var teamRef = firebase.database().ref();


//elements
var getTeam = document.getElementById();

//pre-match inputs
var teamTextP = document.getElementById();
var conesText = document.getElementById();
var mogoZoneText = document.getElementById();
var driveText = document.getElementById();
var liftText = document.getElementById();
var intakeText = document.getElementById();
var overallNotesTextP = document.getElementById();

//in-match inputs
var teamTextI = document.getElementById();
var conesStackedText = document.getElementById();
var mogosText = document.getElementById();
var highestStackText = document.getElementById();
var overallNotesTextI = document.getElementById();

//Input Scouting Notes
function submitPreMatch(){
    var teamP = teamTextP.value;
    var cones = conesText.value;
    var mogoZone = mogoZoneText.value;
    var drive = driveText.value;
    var lift = liftText.value;
    var intake = intakeText.value;
    var overallNotesP = overallNotesTextP.value;
    
    teamRef.child("pre-match/"+teamP).set({
        "teamP":teamP,
        "cones":cones,
        "mogoZone": mogoZone,
        "drive":drive,
        "lift":lift,
        "intake":intake,
        "overallNotesP":overallNotesP
    });
}


function submitInMatch(){
    var teamI = teamTextI.value;
    var conesStacked = conesStackedText.value;
    var mogos = mogosText.value;
    var highestStack = highestStackText.value;
    var overallNotesI = overallNotesTextI.value;
    var matchRef = firebase.database("in-match/"+teamI).ref();
    var count = firebase.database("in-match/"+teamI+"matchCount").ref().val();
    
    matchRef.once('value').then(function(snapshot) {
        teamRef.child.("in-match").set({
            "match-counter": snapshot.numChildren()-1;
    });
    
    teamRef.child("in-match/"+teamI+"/match"+count).set({
        "teamI":teamI,
        "conesStacked":conesStacked,
        "highestStack":highestStack,
        "mogos":mogos,
        "overallNotesI":overallNotesI
    });
}

//Get info

function searchPreMatch(){
    var firebaseTeamRef = firebase.database().ref().child("/pre-match/"+document.getElementById("search").value);
    firebaseTeamRef.on('value', snap => {
        var teamP = snap.child("teamP").val();
        var cones = snap.child("cones").val();
        var mogoZone = snap.child("mogoZone").val();
        var drive = snap.child("drive").val();
        var lift = snap.child("lift").val();
        var intake = snap.child("intake").val();
        var overallNotes = snap.child("overallNotesP").val();
    });
}

function searchInMatch(){
    var team = document.getElementById("search").value
    var count = firebase.database("in-match/"+team+"matchCount").ref().val();
    
    var i;
    for(i = 0; i<count; i++){
        var firebaseTeamRef = firebase.database().ref().child("/in-match/"+team+"match"+count);
        firebaseTeamRef.on('value', snap => {
            var conesStacked = snap.child("conesStacked").val();
            var mogos = snap.child("mogos").val();
            var highestStack = snap.child("highestStack").val();
            var overallNotesI = snap.child("overallNotesI").val();
        });
    }
}