// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});



readline.question(
    'What is your location?\n > ',
    (answer) => {
        let location = answer;
        const apiKey = '91556740e328e69e20d8c8030a76112f'
        const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
        fetch(weatherURL)
            .then((response) => response.json())
            .then((data) => {
                let temperature = data.main.temp.toLocaleString();
                console.log(`The temperature in ${location} is ${temperature} degrees Celsius.`)
                readline.question(
                    'What is your vehicles MPGe?\n > ',
                    (answer2) => {
                        let MPGe = answer2
                        readline.question(
                            'What is your vehicles battery percentage right now?\n > ',
                            (answer3) => {
                                let finalMPGe = MPGe * (answer3/100)
                                if (temperature > 5) {
                                let equation = 4*-0.0262*(temperature-20)**2+107.5
                                if (equation > 100) {
                                    let equationDecimal = equation / 100
                                    let finalRange = finalMPGe * equationDecimal
                                    console.log(`You can expect ${finalRange.toLocaleString()}km of range with ${finalMPGe}% battery.`)
                                } else {

                                
                                let equationPercentageConversion = 100-equation
                        
                                
                                let equationDecimal = equationPercentageConversion/100

                                
                                let finalRange = finalMPGe * equationDecimal
                                console.log(`You can expect ${finalRange.toLocaleString()}km of range with ${finalMPGe}% battery.`)
                                }

                            } else {
                                let equation = -0.0262*(temperature-26)**2+95.6
                                
                                let equationDecimal = equation/100
                                
                                let finalRange = finalMPGe * equationDecimal
                                console.log(`You can expect ${finalRange.toLocaleString()}km of range with ${answer3}% battery charge`)
                            }
                            readline.close()
                            })
                    
                    }
                )

            });
    },
);