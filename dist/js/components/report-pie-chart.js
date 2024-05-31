(() => {
  (function () {
    "use strict";
    if ($("#report-pie-chart").length) {
      let e = () => [
          getColor("pending", 0.9),
          getColor("warning", 0.9),
          getColor("primary", 0.9),
        ],
        t = $("#report-pie-chart")[0].getContext("2d"),
        r = new Chart(t, {
          type: "pie",
        //   type: "doughnut",
          data: {
            labels: ['Surd', 'Indeces', 'P.T', 'Q.E', 'Surd', 'Indeces', 'P.T', 'Q.E', 'division'],
            datasets: [
              {
                data: [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
                backgroundColor: e,
                hoverBackgroundColor: e,
                borderWidth: 2,
                borderColor: () =>
                  $("html").hasClass("dark")
                    ? getColor("darkmode.700")
                    : getColor("white"),
              },
            ],
          },
          options: {
            maintainAspectRatio: !1,
            plugins: { legend: { display: !1 } },
          },
        });
      helper.watchClassNameChanges($("html")[0], (o) => {
        r.update();
      });
    }
  })();
})();
