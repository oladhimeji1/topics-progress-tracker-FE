(() => {
  (function () {
    "use strict";
    if ($("#report-line-chart").length) {
      let t = $("#report-line-chart")[0].getContext("2d"),
        r = new Chart(t, {
          type: "bar",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "completed",
                data: [
                  0, 2, 2, 2, 3, 2, 2, 3, 2, 2, 2, 2,
                ],
                borderWidth: 2,
                borderColor: () => getColor("primary", 0.8),
                backgroundColor: () => [getColor("pending", 0.9),
                                        getColor("warning", 0.9),
                                        getColor("primary", 0.9),
                                      ],
                pointBorderColor: "transparent",
                tension: 0.4,
              },
            //   {
            //     label: "# of Votes",
            //     data: [
            //       0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010,
            //     ],
            //     borderWidth: 2,
            //     borderDash: [2, 2],
            //     borderColor: () =>
            //       $("html").hasClass("dark")
            //         ? getColor("slate.400", 0.6)
            //         : getColor("slate.400"),
            //     backgroundColor: "transparent",
            //     pointBorderColor: "transparent",
            //     tension: 0.4,
            //   },
            ],
          },
          options: {
            maintainAspectRatio: !1,
            plugins: { legend: { display: !1 } },
            scales: {
              x: {
                ticks: {
                  font: { size: 12 },
                  color: getColor("slate.500", 0.8),
                },
                grid: { display: !1 },
                border: { display: !1 },
              },
              y: {
                ticks: {
                  font: { size: 12 },
                  color: getColor("slate.500", 0.8),
                  callback: function (e, a, o) {
                    return e; // Where they added dollars
                  },
                },
                grid: {
                  color: () =>
                    $("html").hasClass("dark")
                      ? getColor("slate.500", 0.3)
                      : getColor("slate.300"),
                },
                border: { dash: [2, 2], display: !1 },
              },
            },
          },
        });
      helper.watchClassNameChanges($("html")[0], (e) => {
        r.update();
      });
    }
  })();
})();
