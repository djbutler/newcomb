angular.module('newcombApp', [])
  .controller('NewcombController', function($scope,$timeout) {

    var newcomb = this;

    newcomb.rounds = 0;
    // invariant: total = previousTotal + gains
    newcomb.total = 0;
    newcomb.gains = 0;
    newcomb.previousTotal = 0;

    newcomb.thinking = false;

    newcomb.boxes = [
      {text:'Box 1: [$1mil if I predicted you\'ll only take this box, otherwise $0]', selected:true, contents:0, fixed:true},
      {text:'Box 2: [$100]', selected:false, contents:100, fixed:false }
];
 
    newcomb.takeBoxes = function() {
      newcomb.previousTotal = newcomb.total;
      newcomb.gains = 0;
      // calculate gains
      for (var i = 0; i < newcomb.boxes.length; i++) {
        newcomb.gains = newcomb.gains + (newcomb.boxes[i].selected ? newcomb.boxes[i].contents : 0);
      }
      // update box contents based on prediction
      newcomb.boxes[0].contents = newcomb.boxes[1].selected ? 0 : 1000000;
      // reset selection
/*
      for (var i = 0; i < newcomb.boxes.length; i++) {
        newcomb.boxes[i].selected = newcomb.boxes[i].fixed ? newcomb.boxes[i].selected : false;
      }
*/
      newcomb.total = newcomb.previousTotal + newcomb.gains;
      newcomb.rounds += 1;
      newcomb.thinking = true;
      $timeout(function() { newcomb.thinking = false; }, 3000);
    };
  });


