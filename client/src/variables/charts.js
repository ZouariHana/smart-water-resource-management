function generateRandomColors(n) {
  const colorPalette = ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157", "#6bd098","#407d25","#b4a7d6","0b5394"]
  const colors = colorPalette.splice(0,n);
  return colors;
}

const lacherChart=(date, value1, value2) => {
  const formattedDate = date.toLocaleDateString('en-GB').replace(/\//g, '-');
  const dateParts = formattedDate.split('-');
    const month = dateParts[1];
    const day = dateParts[0];
    const Ytitle = `${day}-${month}`
  return{
  data: (canvas) => {
    return {
      
      labels: [Ytitle],
      datasets: [
        {
          label: date.getFullYear(),
          data: [value1],
          backgroundColor:"#e3e3e3" ,
        },
        {
          label: date.getFullYear() - 1,
          data: [value2],
          backgroundColor: "#4acccd",
        },
      ],
    };
  },
  options: {
    responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  }
  
}
};


const exploitationPieChart=(exploitation) => {
  const keys = Object.keys(exploitation);
  const values = Object.values(exploitation);
  return{
  data: (canvas) => {
    return {
      
      labels: keys,
      datasets: [
        {
          label: "Pourcentage de l'utilisation",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: generateRandomColors(keys.length),
          borderWidth: 0,
          data: values
        }
      ]
    };
  },
  
}
};

const evolutionLineChart = (labels, dataset1)=> {

  return{
  data: (canvas) => {
    return {
      labels: labels,
      datasets: [
        {
          data: dataset1,
          label: '',
          id: 1,
          fill: false,
          borderColor: "#fbc658",
          backgroundColor: "transparent",
          pointBorderColor: "#fbc658",
          pointRadius: 2,
          pointHoverRadius: 2,
          pointBorderWidth: 1,
          tension: 0.4
        }

      ]
    };
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          parser: 'MM-DD',
          unit: 'day',
          displayFormats: {
            month: 'MMM'
          },
          tooltipFormat: 'll'
        },
      
      }],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }
  }
}
};

module.exports = {
  exploitationPieChart,
  evolutionLineChart,
  lacherChart
};