<script>
    import Pay from './subModals/pay.svelte';
    import Signin from './subModals/signin.svelte';
    import EditName from './subModals/editName.svelte';
    import Creating from './subModals/creating.svelte';
    import { userModal } from '$lib/stores/userCreate';
</script>

<!-- Depending on what $userModal.type is, show the corresponding modal -->
{#if $userModal.type === 'pay'}
    <Pay />
{:else if $userModal.type === 'signin'}
    <Signin />
{:else if $userModal.type === 'editName'}
    <EditName />
{:else if $userModal.type === 'creating'}
    <Creating />
{/if}
