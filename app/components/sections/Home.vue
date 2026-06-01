<template>
  <section class="px-10 pt-20  lg:p-24 flex flex-col lg:flex-row gap-y-9 lg:gap-y-0 lg:gap-x-10 font-bebas  ">
    <div class=" w-full lg:w-1/2">
      <SectionsBanner
          class="shadow-dark-sm"
          src="images/home/1.png"
          :subject="$t('home.tryItToday')"
          :title="$t('home.mostPopular')"
      />
    </div>
    <div class="flex flex-col flex-wrap justify-between gap-y-9 lg:gap-y-0 w-full lg:w-1/2">
      <SectionsBanner
          class="shadow-dark-sm"
          src="images/home/2.png"
          :subject="$t('home.tryItToday')"
          :title="$t('home.moreFun')"/>
      <SectionsBanner
          class="shadow-dark-sm"
          src="images/home/3.png"
          :subject="$t('home.tryItToday')"
          :title="$t('home.freshChili')"/>
    </div>
  </section>
</template>
