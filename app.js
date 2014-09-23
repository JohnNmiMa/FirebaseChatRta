angular.module('firebaseApp', ['firebase'])

.constant('FIREBASE_URL', 'https://sizzling-inferno-7191.firebaseio.com/') // change this to your Firebase URL

.factory('firebaseReference', function(FIREBASE_URL){
    return new Firebase( FIREBASE_URL );
})

.controller('FireCtrl', function($scope, $firebase, firebaseReference){
    $scope.myData = $firebase(firebaseReference).$asObject();
})

.directive('chat', function( ) {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: "chatTemplate.html",
        scope: true,
        controllerAs: 'ctrl',
        controller: function ($scope, $firebase, firebaseReference) {
            $scope.messages=$firebase(
                firebaseReference.child('messages')
            ).$asArray();
            this.sendMessage=function (send) {
                if (!send.message) return false; // do some validation
                $scope.messages.$add({ // save the message
                    message: send.message.trim(),
                    userName: send.userName,
                    datetime: Date.now()
                });
                $scope.send.message="";
            }
        }
    };
});
