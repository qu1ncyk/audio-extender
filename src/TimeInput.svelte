<script lang="ts">
    import { timeToSeconds, secondsToTime } from "./convert-time";

    import Grid, { Cell, InnerGrid } from "@smui/layout-grid";
    import Button, { Label } from "@smui/button";
    import Textfield from "@smui/textfield";
    import { untrack } from "svelte";

    interface Props {
        value: number;
        min?: number;
        max?: number;
        title?: string;
    }

    let {
        value = $bindable(),
        min = -Infinity,
        max = Infinity,
        title = "",
    }: Props = $props();

    const spanFull = { desktop: 12, tablet: 8, phone: 4 };
    const spanHalf = { desktop: 6, tablet: 4, phone: 2 };
    const spanButton = { desktop: 6, tablet: 4, phone: 4 };

    let valueString = $state("");

    // `value` -> `valueString` update
    $effect(() => {
        let timeString = secondsToTime(value);
        let _valueString = untrack(() => valueString);
        if (timeToSeconds(_valueString) !== value) {
            valueString = timeString;
        }
    });

    // `valueString` -> `value` update
    $effect(() => {
        let seconds = timeToSeconds(valueString);
        let _value = untrack(() => value);
        if (!isNaN(seconds) && _value !== seconds) {
            value = seconds;
        }
    });

    function adjustValue(difference: number) {
        let newValue = value + difference;
        if (newValue < min) value = min;
        else if (newValue > max) value = max;
        else value = newValue;
    }
</script>

<Grid>
    <Cell spanDevices={spanFull}>
        <Textfield bind:value={valueString} label={title} />
    </Cell>

    <Cell spanDevices={spanHalf}>
        <InnerGrid class="small-gap">
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(-0.001)} color="secondary">
                    <Label>-1ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(-0.01)} color="secondary">
                    <Label>-10ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(-0.1)} color="secondary">
                    <Label>-0.1s</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(-1)} color="secondary">
                    <Label>-1s</Label>
                </Button>
            </Cell>
        </InnerGrid>
    </Cell>

    <Cell spanDevices={spanHalf}>
        <InnerGrid class="small-gap">
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(0.001)}>
                    <Label>+1ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(0.01)}>
                    <Label>+10ms</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(0.1)}>
                    <Label>+0.1s</Label>
                </Button>
            </Cell>
            <Cell spanDevices={spanButton}>
                <Button onclick={() => adjustValue(1)}>
                    <Label>+1s</Label>
                </Button>
            </Cell>
        </InnerGrid>
    </Cell>
</Grid>
