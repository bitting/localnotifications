
var app = angular.module('NotifyApp', ['ionic', 'ngCordova'])

app.controller('NotifyCtrl', function($scope, $filter, $ionicPopup, $timeout, $window, $ionicPlatform, $cordovaLocalNotification){



  $scope.showPopup = function() {


       var day = $filter('date')(new Date(), 'EEEE');

       //var manana = $filter('date')(new Date()+1, 'EEEE');



      var week =[
          {
            "name": "Monday",
            "value": 1
          } ,
          {
            "name": "Tuesday",
            "value": 2
          },
          {
            "name": "Wednesday",
            "value": 3
          }, 
          {
            "name": "Thursday", 
            "value": 4
          },
          {
            "name": "Friday",
            "value": 5
          },
          {
            "name": "Saturday",
            "value": 6
          },
          {
            "name": "Sunday",
            "value": 7
          }
          ];


       var selectedHour = document.getElementById('time').value; 
       if(selectedHour == ""){
        alert("Seleciconar hora");
        return;
       } 

       // Recibir el día
       var diaSel = "Fri";

       var numDiaSel = $filter('filter')(week,{"name":diaSel})[0].value;

      // Calcula diferencia días entre hoy y el próximo día 

       var hoy = new Date();
       var today = $filter('date')(hoy, 'EEEE');
       var numHoy = $filter('filter')(week,{"name":today})[0].value;
       var diff = (7 - numHoy + numDiaSel)%7;
       
      // Si dif == 0 (es hoy) mirar si paso la hora. Si paso sumar 7 días

       if(diff==0){
         var todayText = $filter('date')(hoy, 'yyyy-MM-dd');
         var compareTime = new Date((todayText + " " + selectedHour).replace(/-/g, "/")).getTime();
         var compareDateTime = new Date(compareTime);

         if(hoy > compareDateTime){
            diff = diff + 7;
         }
       }

       // calcula próxima fecha 
       var prox = new Date();
       prox.setDate(hoy.getDate()+diff);
       var proxDayText = $filter('date')(prox, 'yyyy-MM-dd');
       var proxDayTime = new Date((proxDayText + " " + selectedHour).replace(/-/g, "/")).getTime();
       var proxDay = new Date(proxDayTime);

       var diaHoy = $filter('date')(hoy, 'EEEE');

       alert("Ahora "+ hoy +" compateTime "+ compareDateTime + " dif "+ diff +" // prox "+ proxDay);


    

     

     cordova.plugins.notification.local.registerPermission(function (granted) {});


      var check = 'window.cordova NOT available';
      if (cordova.plugins.notification.local) {
            check = 'window.cordova YES is available';

            var date = document.getElementById('date').value;
            var time = document.getElementById('time').value;

            console.log('date ' + date);
            console.log('time ' + time);

            if(date == "" || time == ""){
              alert("Please enter all details");
              return;
            }

            var schedule_time = new Date((date + " " + time).replace(/-/g, "/")).getTime();
            schedule_time = new Date(schedule_time);

            var d= new Date();
            d.setHours(20);
            d.setMinutes(40);
            d.setSeconds(0);


            window.cordova.plugins.notification.local.schedule({
              id: 1,
              text: "Single Notification. jueves 20:40",
              //at: schedule_time
              at: hoy
              //every: "thursday",
              //every: 5,
              //sound: sound
            });

            if(cordova.plugins.notification.local.getScheduledIds){
               console.log("Hay shedules "+cordova.plugins.notification.local.getScheduledIds.length);
            }else{
              console.log('no hay shedules');
            }



          // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Check',
            subTitle: check,
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
            ]
          });


          // Al clicar en la notificación
          cordova.plugins.notification.local.on("click", function(notification) 
          {
              alert("clicked: " + notification.id);
          });

    }
   

}


  $ionicPlatform.ready(function(){

    if (window.cordova) {
      console.log('window.cordova IS available');
    } else {
      console.log('window.cordova NOT available');
    }
      console.log("antes de notificacion");

      /*
      $cordovaLocalNotification.schedule({
          id: 0,
          message: "verga",
          title: "gorda",
          autoCancel: true
      });*/
      console.log("despues de notificacion");
  });

});
