<script>
    import { onMount } from 'svelte';
    import {
        connectWallet,
    } from "$lib/wallet";

    import { sentences } from '$lib';

    function typeSentences(sentences, speed, delayBetweenSentences) {
        let sentenceIndex = 0;
        let charIndex = 0;
        const element = document.getElementById("sentence");
        let typingInterval;

        const typeChar = () => {
            if (charIndex < sentences[sentenceIndex].length) {
                element.innerHTML += sentences[sentenceIndex].charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    element.innerHTML = "";
                    sentenceIndex = (sentenceIndex + 1) % sentences.length;
                    charIndex = 0;
                    typingInterval = setInterval(typeChar, speed);
                }, delayBetweenSentences);
            }
        };

        typingInterval = setInterval(typeChar, speed);
    }

    // Trigger the typing effect when the component mounts
    onMount(() => {
        
        typeSentences(sentences, 60, 3000);
    });
</script>

<style>
    #sentence {
        height: 40px; /* Adjust the height as needed */
        overflow: hidden;
        white-space: nowrap;
    }
</style>

<div class="w-full h-screen flex flex-col gap-4 justify-center items-center">
    <h1 class="text-6xl font-bold">Get Started</h1>
    <p id="sentence" class="text-2xl font-semibold"></p>
    <button class="btn text-lg font-black bg-orange-100/70" on:click={connectWallet}>Connect</button>
</div>
