<template>
  <section class="px-10 pt-20 font-bebas lg:p-24 flex flex-col lg:flex-row lg:h-[700px] gap-y-9 lg:gap-y-0 lg:gap-x-10">
    <div class="w-full lg:w-1/2 lg:h-full">
      <SectionsBanner
          class="shadow-dark-sm h-full"
          src="images/home/1.png"
          :subject="$t('home.tryItToday')"
          :title="$t('home.mostPopular')"
          alt="most popular"
      />
    </div>
    <div class="flex flex-col justify-between gap-y-9 lg:gap-y-12 w-full lg:w-1/2 lg:h-full">
      <SectionsBanner
          class="shadow-dark-sm flex-1"
          src="images/home/2.png"
          :subject="$t('home.tryItToday')"
          :title="$t('home.moreFun')"
           alt="try it today"/>
      <SectionsBanner
          class="shadow-dark-sm flex-1"
          src="images/home/3.png"
          :subject="$t('home.tryItToday')"
          :title="$t('home.freshChili')"
          alt="fresh chili"/>
    </div>
  </section>
</template>
