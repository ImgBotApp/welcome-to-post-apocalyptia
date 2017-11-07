
//////OBJECTS for examining. ITEM INDEX MUST MATCH DESCRIPTION INDEX!!!
var ObjExamine = {
  "items": [

    // "CRYOTUBE1", // viewobj1

    "CRYOTUBE2", // viewobj2

    // "CORPSE", //viewobj3

    "SCANNER", //viewobj4

    "DOOR"], //viewobj5

  "description":[

    // "The cryotube looks as though it is filled with blue raspberry Jell-O. It looks like it's falling apart, and the guy inside looks none too happy. You notice a loose PIPE that you might be able to pry off", //desc 1

    "This is a cryotube, but a different one. Flavvvvvvor-text!", //desc 2

    // "He's dead, but he may still be useful to you. Could that be a KEYCARD sticking out of his pocket?", //desc 3

    "A typical g-34t keycard SCANNER. Useless to you, unless of course you have a KEYCARD..", //desc 4

    "A old door. Somewhat rusted, but clearly built to last. You'll need to use a KEYCARD on the SCANNER to have any hope of getting through."] // desc 5
};



//////LIST OF ARRAYS
var inventoryArray = [];
var useArray = ["DOOR", "BUTTON"]; //interaction objects
var examineArray = ["CRYOTUBE1", "CRYOTUBE2", "CORPSE", "SCANNER", "DOOR"];    //array for reference only. these can be DESCRIBED with EXAMINE

var takeArray = []; //these can be removed from takeArray and placed in inventoryArray
                    //objects to be added via examine: PIPE, KEYCARD

/////CHANGES SCENE
var unlock = function(useInput) {
  if (useInput === "DOOR" && inventoryArray.includes("SCREWDRIVER")) {
    alert("You manage to wriggle the door open with help from your trusty screwdriver.  SCENE CHANGE TIME!");
  }
}


////CRYO ROOM BOOLEANS
var doorLocked = true;
var tubeSmashed = false;

////LIST OF FUNCTIONS that empower USER ACTIONS
var useFeature = function(useInput) {     ///USE STUFF
  for (i = 0; i < useArray.length; i++) {
    if ((useInput === "CRYOTUBE2") && (inventoryArray.includes("PIPE")) && (tubeSmashed === false)) {
      tubeSmashed = true;
      return "You smash open the tube, revealing the CORPSE within";

    } else if ((useInput === "SCANNER") && (inventoryArray.includes("KEYCARD")) && (doorLocked === true)) {
      doorLocked = false;
      return "After a short delay, the heavy door manages to creak open.";
    }

    else if (useArray[i] === useInput) {
      return "TEMPORARY CONFIRMATION MESSAGE (but no change in world)";
    }
  }//end for loop
  return "nothing you can do";
}//end examineFeature function

var examineFeature = function(examineInput) {   ///VIEW STUFF
  for (i = 0; i < ObjExamine.items.length; i++) {
    if ((examineInput === "CRYOTUBE1") && !(takeArray.includes("PIPE"))) {
      takeArray.push("PIPE");
      return "The cryotube looks as though it is filled with blue raspberry Jell-O. You notice a loose PIPE that you might be able to pry off.";
    } else if ((examineInput === "CORPSE") && !(takeArray.includes("KEYCARD")) && (tubeSmashed === true)) {
      takeArray.push("KEYCARD");
      return "He's dead, but he may still be useful to you. Could that be a KEYCARD sticking out of his pocket?";
    } else if (ObjExamine.items[i] === examineInput) {
      return ObjExamine.description[i];
    }
  }//end for loop
  return "nothing noteworthy";
}//end examineFeature function

var takeFeature = function(takeInput) {    ///TAKE STUFF
  for (i = 0; i < takeArray.length; i++) {
    if ((takeArray[i] === takeInput) && !(inventoryArray.includes(takeArray[i]))) {
      inventoryArray.push(takeArray[i]);
      // var removeItem = takeInput;
      // takeArray.splice( $.inArray(removeItem,takeArray) ,1 ); //jquery remove from takeArray
      takeArray.splice(takeArray.indexOf(takeInput),1); //javascript remove from takeArray
      return "YOU TOOK SOMETHING";
    }
  }//end for loop
  return "you took nothing";
}//end examineFeature function



////FRONT END
$(document).ready(function(){



  $("#use").click(function(){
    // debugger
    // event.preventDefault();
    var useInput = $("#user-command").val().toUpperCase();
    var useResult = useFeature(useInput);
    alert(useResult);
    unlock(useInput);
  });//end use function
  $("#examine").click(function(){
    // event.preventDefault();
    var examineInput = $("#user-command").val().toUpperCase();
    var examineResult = examineFeature(examineInput);
    alert(examineResult);
  });//end examine function
  $("#take").click(function(){
    // event.preventDefault();
    var takeInput = $("#user-command").val().toUpperCase();
    var takeResult = takeFeature(takeInput);
    alert(takeResult);
    alert(inventoryArray);
    alert(takeArray);
  });//end take function
  $('#help').click(function(){
    $('.card').show();
    $(".card-text").text("In this area there are things you can 'look' at. If you find an item you may 'take' it for your inventory, you may also 'use' your items on certain features in this area.");
  });
  $('.card').click(function(){
    $('.card').hide();
  });
});//end doc ready function
