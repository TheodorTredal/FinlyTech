
// Testdata for Pie Chart
export const PortfolioTestData = {
    labels: ["Apple", "Microsoft", "Google", "Amazon", "Tesla"], // Sektorenavnene
    datasets: [
      {
        label: "Market Share",
        data: [30, 25, 20, 15, 10], // Dataene for markedandeler
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ], // Farger for pie chartet
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ], // Randfarger for pie chartet
        borderWidth: 1,
      },
    ],
  };