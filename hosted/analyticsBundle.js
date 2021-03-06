"use strict";

// haleper method to handle errors
var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

// ajax request
var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

// create the canvas for charts
var ChartCanvas = function ChartCanvas(props) {
    return React.createElement("canvas", { id: "chart", width: "1000", height: "500" });
};

// renders the chart and loads the skin data
var createBarChartCanvas = function createBarChartCanvas(data) {
    ReactDOM.render(React.createElement(ChartCanvas, null), document.querySelector("#charts"));
 
    loadSkinsFromServer();
};

// creates the bar chart
const createBarChart = (ctx, data) => {

  // stores the labels and the data
  var labels = [];
  var vbuckData = [ 0, 0, 0, 0, 0, 0 ];

  labels.push(`0`);
  labels.push(`800`);
  labels.push(`1200`);
  labels.push(`1500`);
  labels.push(`2000`);
  labels.push(`Other`);
    
  for (var i = 0; i < data.length; i++) {
    if(data[i].vBucks == 0) {
      vbuckData[0] = vbuckData[0] + 1;
    }
    else if(data[i].vBucks == 800) {
      vbuckData[1] = vbuckData[1] + 1; 
    }
    else if(data[i].vBucks == 1200) {
      vbuckData[2] = vbuckData[2] + 1; 
    }
    else if(data[i].vBucks == 1500) {
      vbuckData[3] = vbuckData[3] + 1;
    }
    else if(data[i].vBucks == 2000) {
      vbuckData[4] = vbuckData[4] + 1; 
    } else {
      vbuckData[5] = vbuckData[5] + 1;  
    }
  }
    
  const lineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: vbuckData,
        borderColor: '#ba68c8',
        borderWidth: 2,
        backgroundColor: '#e1bee7'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of Skins',
            fontSize: 15
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'V-buck Cost',
            fontSize: 15
          }
        }]
      },
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Value of Owned Skins',
        fontSize: 28
      }
    }
  });
};

// loads skin data from the server
var loadSkinsFromServer = function loadSkinsFromServer(csrf) {
  sendAjax('GET', '/getSkins', null, function (data) {
    var skinData = data.skins;

    if (skinData.length == 0) {
      M.toast({html: 'No Skins Yet!', displayLength: 2500});
      return;
    } else {
      createBarChart(document.querySelector("#chart"), skinData);
    }
  });
};

var setup = function setup(csrf) {
  createBarChartCanvas();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});