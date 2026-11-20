<!-- app/pages/about.vue -->
<script setup lang="ts">
useHead({
  title: 'Meet the Photographer — Lombardi Photography',
  meta: [
    {
      name: 'description',
      content:
        'Terry Lombardi is a travel and place photographer. A short, personal introduction.',
    },
  ],
})
</script>

<template>
  <div class="pb-16">
    <header class="page-header">
      <h1>Meet the Photographer</h1>
      <div class="space-y-4 text-left sm:text-center">
        <p>
          For about ten years I've been carrying a camera through the older
          parts of European cities — Heidelberg, Lucerne, Strasbourg,
          Rothenburg, a dozen towns along the Rhine — and photographing what's
          actually there rather than what the guidebook promises.
        </p>
        <p>
          That usually means turning off the main square. The picture I want
          is on the street behind it: the parked bicycles, the ivy eating a
          facade, the one narrow lane with a red turret at the end. And in
          spring it means the flower beds — I lose whole mornings at
          Keukenhof and regret none of them.
        </p>
        <p>
          I shoot in the light that's already there. No lighting rigs, not
          much gear — a body, two lenses, and a lot of standing around
          waiting for a cyclist to arrive in the right place.
        </p>
        <p>
          Everything in the collection is printed to order, by a lab I've used
          for years, on archival paper and canvas. If you'd like something in
          a size or finish that isn't listed,
          <NuxtLink to="/contact" class="text-clay underline underline-offset-4 hover:text-paper">
            get in touch</NuxtLink>.
        </p>
      </div>
    </header>

    <div class="mx-auto max-w-[1000px] space-y-[5px] px-[5%] lg:px-0">
      <NuxtImg
        src="/images/streets-heidelberg-church.jpg"
        alt="Banded red sandstone arches inside the Church of the Holy Spirit in Heidelberg"
        sizes="xs:100vw lg:1000px"
        width="1000"
        height="1250"
        class="mx-auto w-full max-w-[600px] object-cover"
      />
      <div class="mx-auto grid max-w-[600px] grid-cols-2 gap-[5px]">
        <NuxtImg
          src="/images/about-flags.jpg"
          alt="A busy shopping street in Lucerne's old town with a painted building and a Swiss flag"
          sizes="xs:50vw lg:300px"
          width="800"
          height="800"
          class="aspect-square w-full object-cover"
        />
        <NuxtImg
          src="/images/about-market.jpg"
          alt="A London Christmas market at night, wooden chalets strung with warm lights and people walking between them"
          sizes="xs:50vw lg:300px"
          width="800"
          height="800"
          class="aspect-square w-full object-cover"
        />
      </div>
      <p class="pt-3 text-center text-sm text-clay-deep">
        Left: a Saturday in Lucerne. Right: Leicester Square, mid-December —
        the reason my winter photos are all blue.
      </p>
    </div>

    <div class="mt-12 text-center">
      <NuxtLink to="/contact" class="btn-primary">Get in touch</NuxtLink>
    </div>
  </div>
</template>
