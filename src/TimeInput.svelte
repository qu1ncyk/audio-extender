<script lang="ts">
    import { timeToSeconds, secondsToTime } from "./convert-time";
    import writableDerived from "svelte-writable-derived";
    import type { Writable } from "svelte/store";

    import Grid, { Cell, InnerGrid } from "@smui/layout-grid";
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";

    export let value: Writable<number>;
    export let min = -Infinity;
    export let max = Infinity;
    export let title = "";

    const spanFull = { desktop: 12, tablet: 8, phone: 4 };
    const spanHalf = { desktop: 6, tablet: 4, phone: 2 };
    const spanButton = { desktop: 6, tablet: 4, phone: 4 };

    let valueString = writableDerived(value, secondsToTime, {
        withOld(x, old) {
            let seconds = timeToSeconds(x);
            if (!isNaN(seconds)) return seconds;
            else return old;
        },
    });

    function adjustValue(difference: number) {
        let newValue = $value + difference;
        if (newValue < min) $value = min;
        else if (newValue > max) $value = max;
        else $value = newValue;
    }
</script>

<Grid>
    <Cell spanDevices={spanFull}>
        <Textfield
            bind:value={$valueString}
            label={title}
        />
    </Cell>

    <Cell spanDevices={spanHalf}>
        <InnerGrid class="small-gap">
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(-0.001)} color="secondary">
                    <Label>-1ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(-0.01)} color="secondary">
                    <Label>-10ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(-0.1)} color="secondary">
                    <Label>-0.1s</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(-1)} color="secondary">
                    <Label>-1s</Label>
                </Button>
            </Cell>
        </InnerGrid>
    </Cell>

    <Cell spanDevices={spanHalf}>
        <InnerGrid class="small-gap">
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(0.001)}>
                    <Label>+1ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(0.01)}>
                    <Label>+10ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(0.1)}>
                    <Label>+0.1s</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button on:click={() => adjustValue(1)}>
                    <Label>+1s</Label>
                </Button>
            </Cell>
        </InnerGrid>
    </Cell>
</Grid>
