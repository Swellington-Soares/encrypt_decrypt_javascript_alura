const textInput = document.getElementById('text')
const keyInput = document.getElementById('key')
const resultTarget = document.getElementById('result')

function parseText(value, key){
    const tt = []

    for (let i = 0; i<value.length; i++) {
        tt.push( value.charCodeAt( i ) ^ key )
    }

    return tt.map( a => String.fromCharCode( a ) ).join(" ");
}

function codedecode() {
    const value = textInput.value
    const key = keyInput.value
    resultTarget.value = '';

    if (value && key) {
        resultTarget.value = parseText(value, parseInt( key ))
    }  else {
        resultTarget.value = 'ERRO'
    }
}