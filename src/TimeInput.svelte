<div class="input-container">
    <button class="row1 col1">-1ms</button>
    <button class="row1 col2">-10ms</button>
    <button class="row2 col1">-0.1s</button>
    <button class="row2 col2">-1s</button>

    <input type="text" />

    <button class="row1 col3">+1ms</button>
    <button class="row1 col4">+10ms</button>
    <button class="row2 col3">+0.1s</button>
    <button class="row2 col4">+1s</button>
</div>

<style>
    .input-container {
        display: grid;
        grid-template-columns: repeat(2, [button] 1fr) [input] minmax(4em, 6em) repeat(2, [button] 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 0.2em;
    }

    input {
        width: 100%;
        margin: 0;
        grid-column: input;
        grid-row: 1 / span 2;
        place-self: center;
    }

    button {
        margin: 0;
        padding: 0.3em;
    }

    .row1 {
        grid-row: 1;
    }
    .row2 {
        grid-row: 2;
    }

    .col1 {
        grid-column: button 1;
    }
    .col2 {
        grid-column: button 2;
    }
    .col3 {
        grid-column: button 3;
    }
    .col4 {
        grid-column: button 4;
    }
</style>
