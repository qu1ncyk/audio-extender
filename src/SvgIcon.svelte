<script lang="ts">
    import { Icon } from "@smui/common";

    interface Props {
        viewBox?: string;
        fill?: string;
        icon: string;
        width?: number;
        height?: number;
        class?: string;
    }

    let {
        viewBox = "0 0 24 24",
        fill = "currentColor",
        icon,
        width = 24,
        height = 24,
        class: className = ""
    }: Props = $props();
</script>

<Icon class={className} {width} {height} tag="svg" {viewBox}>
    <path {fill} d={icon} />
</Icon>
