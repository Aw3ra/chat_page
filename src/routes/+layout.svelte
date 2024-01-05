<script>
    import "../app.css";
    import Navbar from "../lib/components/navbar.svelte";
</script>

<div class="flex flex-col gap-2 justify-top bg-black h-screen items-center">
    <Navbar />
    <slot />
</div>
