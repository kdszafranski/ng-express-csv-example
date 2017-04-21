myApp.controller('HomeController', function($http) {
  console.log('home controller running');

  var self = this;

  self.message = "Welcome to the Home View";

  self.download = function() {
    $http.get('/getcsv').then(function(result) {
      var blob = new Blob([result.data], { type: result.config.dataType });
      var windowUrl = (window.URL || window.webkitURL);
      var downloadUrl = windowUrl.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.href = downloadUrl;
      // var fileNamePattern = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      // anchor.download = fileNamePattern.exec(headers['content-disposition'])[1]
      anchor.download = "distributions.csv";
      document.body.appendChild(anchor);
      anchor.click();
      windowUrl.revokeObjectURL(blob);
    });
  }

});
