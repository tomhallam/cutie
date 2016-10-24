(function(window, angular) {

  angular.module('cutie', [
    'ui.router'
  ])

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'layout.html',
        controller: 'RootController as vm'
      })
      .state('app.welcome', {
        url: '/welcome',
        templateUrl: 'welcome.html',
        controller: 'WelcomeController as vm'
      });

  })

  .controller('RootController', function() {})
  .controller('WelcomeController', function() {});

}(window, window.angular));
