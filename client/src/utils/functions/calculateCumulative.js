// Helper function to calculate the cumulative returns of a given data set

// inputReturns = [{ year, totalReturn}]
// returns obj[year] = cumulativeValue
const calculateCumulative = (inputReturns) => {
    if ( inputReturns.length === 0) return undefined;
    if ( !inputReturns[0].year ) return undefined;
    let cumulativeObj = []
    let cumulativeVal = 0;
    for (let i = 0; i < inputReturns.length; i++) {
        let currentEl = inputReturns[i];
        cumulativeVal = cumulativeVal + parseFloat(currentEl.totalReturn);
        cumulativeObj[currentEl.year] = cumulativeVal;
    }
    return cumulativeObj;
}

export default calculateCumulative;