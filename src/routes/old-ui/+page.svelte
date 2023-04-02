<svelte:head>
    <title>svelte-remember-hashmap</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap" rel="stylesheet">
</svelte:head>

<script>
    let textArea1Value
    let textArea2Value
    let fromToBoth
    let userArr = []
    let incorrectCount
    let incorrectLeft

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
        const lines = textArea1Value.split("\n").map(line=>line.trimEnd()).filter(line=>line.length)

        fromToBoth = {}
        const arrOfObj = []
        for (const line_ of lines) {
            const pos_colon = line_.indexOf(" : ")
            const both = {from:line_.slice(0,pos_colon),to:line_.slice(pos_colon + 3),line_}
            arrOfObj.push(both)
            fromToBoth[both.from] = both
        }

        return arrOfObj
    }

    function bruh1() {
        userArr = []

        const arrOfObj = update_fromToBoth()
        const testArr = arrOfObj.map(obj=>`${obj.from} : `)
        shuffleArray(testArr)

        textArea2Value = testArr.join("\n")

    }
    function keyDown1(event) {
        if (event.key === "Enter") {
            if (!event.shiftKey) {
                event.preventDefault()
                bruh1()
            }
        }
    }

    function bruh2() {

        update_fromToBoth()

        const lines = textArea2Value.split("\n").map(line=>line.trimEnd()).filter(line=>line.length)

        const arrOfObj = []
        for (const line_ of lines) {
            const pos_colon = line_.indexOf(" : ")
            arrOfObj.push({from:line_.slice(0,pos_colon),to:line_.slice(pos_colon + 3)})
        }

        const tempArr = []
        let tempIncorrectCount = 0
        for (const idx in arrOfObj) {
            const line_ = lines[idx]
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
            if (!event.shiftKey) {
                event.preventDefault()
                bruh2()
            }
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

</script>

<div style="display: flex; flex-direction: row;">
    <textarea on:paste={()=>setTimeout(bruh1,1)} on:keydown={keyDown1} bind:value={textArea1Value} rows="20"></textarea>
    <button on:click={bruh1}>Button</button>
    {#if textArea2Value}
        <textarea on:paste={()=>setTimeout(bruh2,1)} on:keydown={keyDown2} bind:value={textArea2Value} rows="20"></textarea>
    {/if}
    <div style="display: flex; flex-direction: column;">
        {#if userArr.length}
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
        {/if}
    </div>
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
</style>
