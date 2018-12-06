const ChartCanvas = (props) => {
    return (
        <canvas id="chart" width="1000" height="500"></canvas>
    );
};

var createBarChartCanvas = function createBarChartCanvas(data) {
    ReactDOM.render(
        <ChartCanvas />,
        document.querySelector("#charts")
    );
 
    loadSkinsFromServer();
};

const createBarChart = (ctx, data) => {

  var labels = [];
  var vbuckData = [];
    
  for (var i = 0; i < data.length; i++) {
     labels.push(`Skin${i+1}`);
     vbuckData.push(data[i].vBucks);
  }
    
  const lineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            data: vbuckData
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  });
};

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
