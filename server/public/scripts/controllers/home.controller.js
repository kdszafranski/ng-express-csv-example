myApp.controller('HomeController', function($http) {
  console.log('home controller running');

  var self = this;

  self.message = "Welcome to the Home View";

  self.download = function() {
    $http.get('/getcsv').then(function(result) {
      // create an object and a new DOM element and then make the browser 'click' on it
      // https://developer.mozilla.org/en-US/docs/Web/API/Blob
      var blob = new Blob([result.data], { type: result.config.dataType });
      var windowUrl = (window.URL || window.webkitURL);
      var downloadUrl = windowUrl.createObjectURL(blob);

      // create new <a> tag
      var anchor = document.createElement("a");
      // URL is just our object from above
      anchor.href = downloadUrl;
      // name the file to download
      anchor.download = "mydownloadedfile.csv";

      document.body.appendChild(anchor);

      // simulate a click event on this a tag
      anchor.click();

      // destroy the created URL Object from above to clean up
      windowUrl.revokeObjectURL(blob);
    });
  }

});
