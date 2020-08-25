import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getReturns } from '../utils/API';

// helper funciont to calculate cumulative return for each year based on start of data set
// assign cumulative values to obj[year] for efficient data access
const calculateCumulative = (returns) => {
    let cumulativeObj = []
    let cumulativeVal = 0;
    for (let i = 0; i < returns.length; i++) {
        let currentEl = returns[i];
        cumulativeVal = cumulativeVal + parseFloat(currentEl.totalReturn);
        cumulativeObj[currentEl.year] = cumulativeVal;
    }
    return cumulativeObj;
}

// initialize slider
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
    const [ annualReturns, setAnnualReturns ] = useState([]);
    const [ cumulativeVals, setCumulativeVals] = useState({});
    const [ sliderRange, setSliderRange ] = useState([0,0]);
    const [ dataStartYear, setDataStartYear ] = useState(0);
    const [ dataEndYear, setDataEndYear ] = useState(0);;

    useEffect(()=>{
        // make initial api call to get all returns data
        if (annualReturns.length === 0) {
            getReturns()
            .then(res => {
                setAnnualReturns(res.data);
                setCumulativeVals(calculateCumulative(res.data));
                setDataStartYear(res.data[0].year); // set start year of data set - used to determine relative index of values and set slider min
                setDataEndYear(res.data[res.data.length - 1].year); // set end year of data set - set slider max
                setSliderRange([res.data[0].year, res.data[res.data.length - 1].year]);
            })
            .catch(err => console.log(err));
        }
    }, [sliderRange, dataStartYear, dataEndYear, annualReturns]);

    return (
        <div className='home-page'>
            <Container>
                <Container>
                    <h3 className="text-center">S&P 500 Annual Returns</h3>
                    <div className="year-slider">
                        <Range 
                            min={dataStartYear} 
                            max={dataEndYear} 
                            defaultValue={[dataStartYear, dataEndYear]} 
                            allowCross={false} 
                            onChange={(value) => setSliderRange(value)}
                        />
                    </div>
                </Container>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Total Returns</th>
                            <th>Cumulative Returns</th>
                        </tr>
                    </thead>
                    <tbody>
                        { annualReturns.length !== 0 
                            ? annualReturns.map((data, index) => {
                                // initialize starting point for cumulative calculation
                                const startVal = sliderRange[0] === dataStartYear ? parseFloat(annualReturns[0].totalReturn) : cumulativeVals[sliderRange[0]] - cumulativeVals[sliderRange[0] - 1];
                                if (index >= sliderRange[0] - dataStartYear && index <= sliderRange[1] - dataStartYear) {
                                    // display table data for values with returns data array index between the indices of range start and end
                                    // cummulative value is relative to cummulative value of range start
                                    return (
                                        <tr key={ data.year }>
                                            <td>{ data.year }</td>
                                            <td>{ data.totalReturn }</td>
                                            <td>{ (cumulativeVals[data.year] - cumulativeVals[sliderRange[0]] + startVal).toFixed(2) }</td>
                                        </tr>
                                    )
                                }
                                return null;
                            }) 
                            : <></> 
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Home;
