//database references
var teamRef = firebase.database().ref();

//pre-match inputs
var teamTextP = document.getElementById("teamTextP");
var conesText = document.getElementById("conesText");
var mogoZoneText = document.getElementById("mogoZoneText");
var driveText = document.getElementById("driveText");
var liftText = document.getElementById("liftText");
var intakeText = document.getElementById("intakeText");
var overallNotesTextP = document.getElementById("overallNotesTextP");

//in-match inputs
var teamTextI = document.getElementById("teamTextI");
var conesStackedText = document.getElementById("conesStackedText");
var mogosText = document.getElementById("mogosText");
var highestStackText = document.getElementById("highestStackText");
var overallNotesTextI = document.getElementById("overallNotesTextI");

//Test Function
function test() {
    alert("Test works");
}

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
    alert("submitInMatch");
    var teamI = teamTextI.value;
    var conesStacked = conesStackedText.value;
    var mogos = mogosText.value;
    var highestStack = highestStackText.value;
    var overallNotesI = overallNotesTextI.value;
    var matchRef = firebase.database().ref("in-match/"+teamI);
    var countRef = firebase.database().ref("in-match/"+teamI+"/matchCount");
    var count = 0;

    countRef.once('value').then(function(snapshot){
        count = snapshot.val();
    });
    
    matchRef.once('value').then(function(snapshot) {
        teamRef.child("in-match/"+teamI).update({
            "match-counter": snapshot.numChildren()-1
        });
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
        
        document.getElementById("team-name").innerText = teamP;
        document.getElementById("cones").innerText = cones;
        document.getElementById("mogo").innerText = mogoZone;
        document.getElementById("drive").innerText = drive;
        document.getElementById("lift").innerText = lift;
        document.getElementById("intake").innerText = intake;
        document.getElementById("comments").innerText = overallNotes;
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