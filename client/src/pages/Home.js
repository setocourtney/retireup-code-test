import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import RangeSlider from '../components/RangeSlider';
import { getReturns } from '../utils/API';
import calculateCumulative from '../utils/functions/calculateCumulative';

const Home = () => {
    const [ annualReturns, setAnnualReturns ] = useState([]);
    const [ cumulativeVals, setCumulativeVals] = useState({});
    const [ sliderRange, setSliderRange ] = useState([0,0]);
    const [ dataStartYear, setDataStartYear ] = useState(1926);
    const [ dataEndYear, setDataEndYear ] = useState(2019);

    useEffect(()=>{
        // make initial api call to get all returns data
        if (annualReturns.length === 0) {
            getReturns()
            .then(res => {
                setAnnualReturns(res.data);
                setCumulativeVals(calculateCumulative(res.data));
                setDataStartYear(res.data[0].year); // set start year of data set - used to determine relative index of values and set slider min
                setDataEndYear(res.data[res.data.length - 1].year); // set end year of data set - set slider max
                setSliderRange([res.data[0].year, res.data[res.data.length - 1].year]); // initilize range
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
                        <RangeSlider
                            min={dataStartYear} 
                            max={dataEndYear}
                            defaultValue={[dataStartYear, dataEndYear]}
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
                                
                                // display table data for values with returns data array index between the indices of range start and end
                                if (index >= sliderRange[0] - dataStartYear && index <= sliderRange[1] - dataStartYear) {
                                    
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
