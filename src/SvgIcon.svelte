<script lang="ts">
    import { Icon } from "@smui/common";
    import { Svg } from "@smui/common/elements";

    export let viewBox = "0 0 24 24";
    export let fill = "currentColor";
    export let icon: string;
    export let width = 24;
    export let height = 24;
    export { className as class };
    let className = "";
</script>

<Icon class={className} {width} {height} component={Svg} {viewBox}>
    <path {fill} d={icon} />
</Icon>
