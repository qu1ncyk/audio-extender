<script lang="ts"></script>

<p>Choose an audio file to extend</p>
<div class="input-container">
    <input type="file" accept="audio/*" />
    <span>or</span>
    <input type="url" placeholder="Enter a URL" />
</div>
<button>Extend</button>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        max-width: 80%;
        width: 20em;
        height: 2.5em;
        margin: 0;
    }

    span {
        margin: 0.5em;
    }

    button {
        margin: 0.5em;
    }

    @media (min-width: 640px) {
        .input-container {
            flex-direction: row;
        }

        input {
            max-width: 40%;
        }
    }
</style>
