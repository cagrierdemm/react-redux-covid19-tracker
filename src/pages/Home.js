import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatas } from '../redux/covidSlice';
import { fetchTotal } from '../redux/totalSlice';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip } from 'victory';


function Covid() {
    const countries = useSelector((state) => state.covid.items.result);
    const total = useSelector((state) => state.total.items);
    const status = useSelector(state => state.covid.status);
    const [selectedCountry, setSelectedCountry] = useState(-1);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchDatas());
            dispatch(fetchTotal());
        }

    }, [dispatch, status])


    if (status === 'loading') return <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}><div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
    </div></div>


    if (!countries || countries.length === 0) {
        return <div>No data available</div>;
    }

    const data = [
        {
          quarter: 1,
          person: selectedCountry === -1 ? (parseInt(total.result.totalCases.replace(/,/g, ''), 10) || 0) : (parseInt(countries[selectedCountry]?.totalCases.replace(/,/g, ''), 10) || 0),
          label: selectedCountry === -1 ? total.result.totalCases : countries[selectedCountry]?.totalCases || "N/A"
        },
        {
          quarter: 2,
          person: selectedCountry === -1 ? (parseInt(total.result.totalDeaths.replace(/,/g, ''), 10) || 0) : (parseInt(countries[selectedCountry]?.totalDeaths.replace(/,/g, ''), 10) || 0),
          label: selectedCountry === -1 ? total.result.totalDeaths : countries[selectedCountry]?.totalDeaths || "N/A"
        },
        {
          quarter: 3,
          person: selectedCountry === -1 ? (parseInt(total.result.totalRecovered.replace(/,/g, ''), 10) || 0) : (parseInt(countries[selectedCountry]?.totalRecovered.replace(/,/g, ''), 10) || 0),
          label: selectedCountry === -1 ? total.result.totalRecovered : countries[selectedCountry]?.totalRecovered || "N/A"
        },
      ];
      

    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col-md-3 col-8 mx-auto'>
                    <div className='row d-flex'>
                        <div className="col-10 d-flex align-items-center justify-content-center">
                            <img src="./covid.png" className="img-fluid" alt="Covid Logo" />
                        </div>
                        <div className="col-2 d-flex align-items-center justify-content-center">
                           <a href='https://github.com/cagrierdemm'> <img src="./github.png" className="hover" alt="GitHub Logo" style={{ height: "32px", width: "32px" }} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='mx-auto'>
                    {status === 'succeeded' &&
                        <div className=''>
                            <div className='row col-md-12 col-lg-8 d-flex justify-content-center mx-auto'>
                                <div className="card text-center col-md-3 mb-3 mx-2 mb-md-0 bg-info border-0 border-bottom text-white">
                                    <h5 className="card-body ">
                                        <b>{selectedCountry === -1 ? "Total Cases" : "Cases"}</b>
                                    </h5>
                                    <div className="card-body my-4">
                                        <h3 className="card-title mb-5">{
                                            selectedCountry === -1 ? total.result.totalCases : countries[selectedCountry].totalCases
                                        }</h3>
                                    </div>

                                </div>
                                <div className="card text-center col-md-3 mb-3 mx-2 mb-md-0 border-0 bg-danger text-white">
                                    <h5 className="card-body">
                                        <b>{selectedCountry === -1 ? "Total Deaths" : "Deaths"}</b>
                                    </h5>
                                    <div className="card-body my-4">
                                        <h3 className="card-title mb-5">{
                                            selectedCountry === -1 ? total.result.totalDeaths : countries[selectedCountry].totalDeaths
                                        }</h3>
                                    </div>
                                </div>
                                <div className="card text-center col-md-3 mb-3 mx-2 mb-md-0 border-0 bg-opacity-75 bg-success text-white">
                                    <h5 className="card-body">
                                        <b>{selectedCountry === -1 ? "Total Recovered" : "Recovered"}</b>
                                    </h5>
                                    <div className="card-body my-4">
                                        <h3 className="card-title mb-5">{
                                            selectedCountry === -1 ? total.result.totalRecovered : countries[selectedCountry].totalRecovered
                                        }</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='row col-md-9 col-lg-6 col-12 mx-auto mt-4'>
                                <h3>Select Country:</h3>
                                <select className="form-select mt-2" aria-label="Default select example" onChange={(e) => setSelectedCountry(e.target.selectedIndex-1)}>
                                <option key={-1}>All</option>
                                    {countries.map((i, k) => (
                                    <option key={k-1} value={i.country}>{i.country}</option>
                                ))}</select>
                                <div className='mx-auto col-lg-9 col-md-9 col-12'>
                                    <VictoryChart
                                        // adding the material theme provided with Victory
                                        theme={VictoryTheme.material}
                                        domainPadding={25}
                                    >
                                        <VictoryAxis
                                            tickValues={[1, 2, 3]}
                                            tickFormat={["Cases", "Deaths", "Recovered"]}
                                        />
                                        <VictoryAxis
                                            dependentAxis
                                            tickFormat={(x) => (`${x / 1000000}M`)}
                                        />
                                        <VictoryBar
                                            data={data}
                                            labelComponent={<VictoryTooltip />}
                                            x="quarter"
                                            y="person"
                                            style={{
                                                data: { fill: "red", width: 20 }
                                            }}
                                        />
                                    </VictoryChart>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Covid;