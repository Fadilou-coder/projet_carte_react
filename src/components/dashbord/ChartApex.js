import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartApex extends Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ["Janvier", "Fevrier", " Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]
                    // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [0, 40, 45, 50, 49, 60, 70, 91, 11],
                }
            ],

        };
    }

    chargerValue(){
    
    }
    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ChartApex;
