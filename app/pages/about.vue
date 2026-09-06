<!-- app/pages/about.vue -->
<script setup lang="ts">
useHead({
  title: 'About — Lombardi Photography',
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
  <div class="pb-24 pt-24 sm:pt-32">
    <div class="container-wide">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <NuxtImg
            src="/images/streets-heidelberg-church.jpg"
            alt="Banded red sandstone arches inside the Church of the Holy Spirit in Heidelberg"
            sizes="xs:100vw lg:640px"
            width="1000"
            height="1250"
            class="w-full rounded-sm object-cover"
          />
        </div>

        <div>
          <p class="eyebrow">About</p>
          <h1 class="mt-3 font-serif text-4xl text-paper sm:text-5xl">
            I'm Terry. I photograph places.
          </h1>

          <div class="mt-8 space-y-5 text-lg leading-relaxed text-paper/70">
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
              Everything in the gallery is printed to order, by a lab I've used
              for years, on archival paper and canvas. If you'd like something in
              a size or finish that isn't listed, or you're after a print for a
              wall you're trying to fill,
              <NuxtLink to="/contact" class="text-clay underline-offset-4 hover:underline">
                get in touch</NuxtLink>.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-2 gap-4">
            <NuxtImg
              src="/images/about-flags.jpg"
              alt="A busy shopping street in Lucerne's old town with a painted building and a Swiss flag"
              sizes="xs:50vw lg:340px"
              width="800"
              height="800"
              class="aspect-square w-full rounded-sm object-cover"
            />
            <NuxtImg
              src="/images/about-market.jpg"
              alt="A London Christmas market at night, wooden chalets strung with warm lights and people walking between them"
              sizes="xs:50vw lg:340px"
              width="800"
              height="800"
              class="aspect-square w-full rounded-sm object-cover"
            />
          </div>
          <p class="mt-4 text-xs text-paper/40">
            Left: a Saturday in Lucerne. Right: Leicester Square, mid-December —
            the reason my winter photos are all blue.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
