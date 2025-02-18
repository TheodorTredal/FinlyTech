const BarChartData = {
  labels: ["Januar", "Februar", "Mars", "April", "Mai"],
  datasets: [
    {
      label: "Inntekter",
      data: [5000, 7000, 8000, 6000, 9000],
      backgroundColor: "#0284c7", // Blå
    },
    {
      label: "Utgifter",
      data: [4000, 5000, 7500, 5500, 7200], // Andre verdier
      backgroundColor: "#be123c", // Rød
    },
  ],
};

export default BarChartData;
