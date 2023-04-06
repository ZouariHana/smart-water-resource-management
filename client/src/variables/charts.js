function generateRandomColors(n) {
  const colorPalette = ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"]
  const colors = [];
  for (let i = 0; i < n; i++) {
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    if (!colors.includes(color)) {
      colors.push(color);
    }
  }
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


const dashboardEmailStatisticsChart=(exploitation) => {
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

const dashboardNASDAQChart = (labels, dataset1)=> {

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
          pointRadius: 0.25,
          pointHoverRadius: 0.25,
          pointBorderWidth: 0.5,
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
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
  lacherChart
};