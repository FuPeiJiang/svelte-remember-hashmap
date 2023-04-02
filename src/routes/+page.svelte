<svelte:head>
    <title>svelte-remember-hashmap</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap" rel="stylesheet">
</svelte:head>

<script>
    let fromToBoth
    let userArr = []
    let incorrectCount
    let incorrectLeft

    let arrOfTuple1 = []
    const sizeOfSide1 = [15, 15]
    let arrOfTuple2
    let sizeOfRightSide2 = 15
    let visible = true
    let permaVisible = true

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function update_fromToBoth() {
        const lines = arrOfTuple1.filter(tuple=>tuple[0].trim() && tuple[1].trim())

        fromToBoth = {}
        const arrOfObj = []
        for (const line_ of lines) {
            const from = line_[0].trim()
            const to = line_[1].trim()
            const both = {from,to,line_:`${from} : ${to}`}
            arrOfObj.push(both)
            fromToBoth[both.from] = both
        }

        return arrOfObj
    }

    function bruh1() {
        userArr = []

        const arrOfObj = update_fromToBoth()
        const testArr = arrOfObj.map(obj=>[obj.from,""])
        shuffleArray(testArr)

        arrOfTuple2 = testArr
        visible = false
        permaVisible = false
    }
    function keyDown1(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            bruh1()
        }
    }

    function bruh2() {

        update_fromToBoth()
        const lines = arrOfTuple2

        const arrOfObj = []
        for (const line_ of lines) {
            const from = line_[0].trim()
            const to = line_[1].trim()
            arrOfObj.push({from,to,line_:`${from} : ${to}`})
        }

        const tempArr = []
        let tempIncorrectCount = 0
        for (const idx in arrOfObj) {
            const line_ = arrOfObj[idx].line_
            const obj = arrOfObj[idx]

            const correct = fromToBoth[obj.from].to === obj.to
            if (!correct) {
                ++tempIncorrectCount
            }
            tempArr.push({line_, obj, correct})
        }
        userArr = tempArr
        incorrectLeft = incorrectCount = tempIncorrectCount

    }

    function keyDown2(event) {
        if (event.key === "Enter") {
            event.preventDefault()
            bruh2()
        }
    }

    function handleGuessWhat(idx) {
        const {line_, obj, correct} = userArr[idx]
        if (correct) {
            userArr[idx].surely = "right"
        } else {
            userArr[idx].surely = "wrong"
            --incorrectLeft
        }
    }

    function handleInput1(event,idx1,idx2) {
        if (idx1 >= arrOfTuple1.length) {
            const arr = []
            if (idx2 === 0) {
                arr.push(event.target.value, "")
            } else {
                arr.push("", event.target.value)
            }
            arrOfTuple1.push(arr)
            arrOfTuple1 = arrOfTuple1
        } else {
            arrOfTuple1[idx1][idx2] = event.target.value
        }

        if (idx2 === 0) {
            sizeOfSide1[0] = Math.max(15, Math.max(...arrOfTuple1.map(tuple=>tuple[0].length))-2)
        } else {
            sizeOfSide1[1] = Math.max(15, Math.max(...arrOfTuple1.map(tuple=>tuple[1].length))-2)
        }

    }

    function handleInput2(event,idx1,idx2) {
        arrOfTuple2[idx1][idx2] = event.target.value
        sizeOfRightSide2 = Math.max(15, Math.max(...arrOfTuple2.map(tuple=>tuple[1].length))-2)

    }

</script>

<div style="display: flex; flex-direction: row;">
    <table style="align-self: flex-start;{visible?"": " visibility: hidden;"}">
    <tbody>
    {#each {length:arrOfTuple1.length+1} as _, idx1}
    <tr>
    {#each {length:2} as _, idx2}
    <td><input type="text" size={sizeOfSide1[idx2]} on:input={event=>handleInput1(event,idx1,idx2)} value={idx1 < arrOfTuple1.length ? arrOfTuple1[idx1][idx2] : ""} on:keydown={keyDown1}></td>
    {/each}
    </tr>
    {/each}
    </tbody>
    </table>
    <button on:click={bruh1}>Test</button>
    {#if arrOfTuple2}
    <button on:click={()=>permaVisible=visible=true} on:mouseenter={()=>visible=true} on:mouseleave={()=>permaVisible || (visible=false)}>Peek</button>
    <table style="align-self: flex-start;">
    <tbody>
    {#each {length:arrOfTuple2.length} as _, idx1}
    <tr>
    {#each {length:2} as _, idx2}
    <td><input type="text" size={idx2 === 0 ? sizeOfSide1[idx2] : sizeOfRightSide2} readonly={idx2 === 0} on:input={event=>handleInput2(event,idx1,idx2)} value={idx1 < arrOfTuple2.length ? arrOfTuple2[idx1][idx2] : ""} on:keydown={keyDown2}></td>
    {/each}
    </tr>
    {/each}
    </tbody>
    </table>
    <button on:click={bruh2}>Check</button>
    {/if}
    {#if userArr.length}
    <div style="display: flex; flex-direction: column;">
        <p>incorrect count:{incorrectCount}</p>
        <p>incorrect left:{incorrectLeft}</p>
        {#each userArr as obj, idx}

            {#if obj.surely}
                {#if obj.surely === "right"}
                    <p style="background-color: lightgreen;">{obj.line_}</p>
                {:else}
                    <p style="background-color: red;">{obj.line_}</p>
                    <p style="background-color: lightgreen;">{fromToBoth[obj.obj.from].line_}</p>
                {/if}
            {:else}
                <button on:click={()=>handleGuessWhat(idx)}>{obj.line_}</button>
            {/if}


        {/each}
    </div>
    {/if}
</div>

<style>
    * {
        font-family: 'Fira Code', monospace;
        white-space: pre;
    }
    p {
        margin-top: 0.1em;
        margin-bottom: 0.1em;
    }

    table {
        border-collapse: collapse;
    }
    input, td {
        padding: 0px;
    }
    input {
        box-sizing: border-box;
    }
</style>
