const convertFactorToAPR = (factor) => {
    const loanAmount = 100000
    const factorRate = factor
    const weeks = 52
    
    const totalPayback = loanAmount * (1 + factorRate)
    const totalInterest = loanAmount * factorRate
    const weeklyPayment = totalPayback / weeks
    const avgInterest = totalInterest / weeks
    const avgPrincipal = weeklyPayment - avgInterest
    
    const weekNumbers = []
    
    for (let i = 0; i < weeks; i++) {
        weekNumbers.push(i+1)
    }
        
    const openingBalances = []
    
    weekNumbers.forEach((week, index) => {
        if (index === 0) {
            openingBalances.push(100000)
        }
        openingBalances.push(openingBalances[index] - avgPrincipal)
    })
    
    const sum = (total, num) => {
        return total + num
    }
    
    const balancesSum = openingBalances.reduce(sum)
    const weeklyAPR = (totalInterest * .935 ) / balancesSum
    
    const createSchedule = (weeklyAPR, weeks, loanAmount, weeklyPayment) => {
        const result = []
    
        for (let i=0; i<weeks; i++) {
            if (i === 0) {
                result.push([loanAmount, loanAmount*weeklyAPR, weeklyPayment-(loanAmount*weeklyAPR)])
            } else {
                const openingBalance = [result[i-1][0]] - [result[i-1][2]]
                result.push([openingBalance, openingBalance*weeklyAPR, (weeklyPayment-(openingBalance*weeklyAPR))])
            }
        }
    
        return result
    }
    
    const getAPR = (weeklyAPR, weeks, loanAmount, weeklyPayment, totalInterest) => {
        let accuracy = 0, count = 1, result = 0;
        
        while ( count <= 500 && (accuracy < .9999999 || accuracy > 1.0000001 )) {
            const schedule = createSchedule(weeklyAPR, weeks, loanAmount, weeklyPayment)
            
            const interestPayments = schedule.map(week => week[1])
    
            accuracy = interestPayments.reduce(sum) / totalInterest
            
            accuracy < .9999 ? weeklyAPR += (.00001 / count) : weeklyAPR -= (.00001 / count)
            count += 1
            result = ( weeklyAPR * 100 ).toFixed(2) + '%'
        }
        return result
    }
    
    return (getAPR(weeklyAPR, weeks, loanAmount, weeklyPayment, totalInterest))
}

module.exports = convertFactorToAPR