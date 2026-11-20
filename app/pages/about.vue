<!-- app/pages/about.vue -->
<script setup lang="ts">
useHead({
  title: 'Meet the Photographer — Picture It by Terry',
  meta: [
    {
      name: 'description',
      content:
        "I am not a professional photographer. I just love capturing what I see in order to show people how I see the world.",
    },
  ],
})
</script>

<template>
  <div class="pb-16">
    <header class="page-header">
      <h1>Meet the Photographer</h1>
      <div class="space-y-4">
        <p>
          I am not a professional photographer. I just love capturing what I see
          in order to show people how I see the world. I only hope that people
          like what I see. I will have some decent pictures in all of this and
          some bad, but either way, I hope to get better as I go.
        </p>
        <p>
          So now you know the reason I have the saying&hellip; Seeing the world
          through the eye of my lens.
        </p>
        <hr class="mx-auto my-6 w-24 border-paper/15" />
        <p lang="de">
          Ich bin kein professioneller Fotograf. Ich liebe es einfach,
          festzuhalten, was ich sehe, um den Menschen zu zeigen, wie ich die Welt
          sehe. Ich hoffe nur, dass den Leuten gefällt, was ich sehe. Ich werde ein
          paar gute und ein paar schlechte Bilder machen, aber so oder so, ich
          hoffe, dass ich immer besser werde.
        </p>
        <p lang="de">
          Jetzt wisst ihr also, warum ich die Seite&hellip; habe. Ich sehe die
          Welt durch das Auge meiner Linse.
        </p>
      </div>
    </header>

    <div class="mx-auto max-w-[600px] px-[5%] sm:px-0">
      <img
        src="/images/terry.jpg"
        alt="Terry C Lombardi on Eastbourne Pier"
        width="600"
        height="474"
        class="h-auto w-full"
      />
    </div>

    <div class="mt-12 flex flex-wrap justify-center gap-3">
      <NuxtLink to="/collection" class="btn-primary">See the collection</NuxtLink>
      <NuxtLink to="/contact" class="btn-outline">Get in touch</NuxtLink>
    </div>
  </div>
</template>
