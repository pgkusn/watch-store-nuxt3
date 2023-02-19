<template>
  <div>
    <div class="hero bg-cover" style="background-image: url(/hero.jpg)">
      <div class="container flex h-[480px] items-center md:h-[870px]">
        <div
          class="mx-auto max-w-[350px] text-white md:mr-0 md:ml-auto md:max-w-[445px]"
          data-aos="fade-left"
        >
          <h2 class="text-[32px] md:text-[40px]">Watch your day</h2>
          <p class="text-xl md:text-2xl">
            A watch is like a piece of clothing, a message, a way of presenting oneself a costume
            that according to the person who wears it.
          </p>
          <nuxt-link to="/products" class="home-btn mt-4 border-white text-[28px]">
            Shop now
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="products container my-10 md:my-15">
      <section class="flex flex-col items-center md:flex-row" data-aos="fade-right">
        <div class="w-[382px] md:order-1 md:w-0 md:flex-grow" />
        <div class="flex items-center justify-center md:w-0 md:flex-grow">
          <div class="max-w-[382px] p-4">
            <h1 class="text-[32px]">法式優雅手寫體時標時尚腕錶</h1>
            <p class="mt-2 text-xl">
              法國知名品牌agnes
              b.以獨特的風格設計風靡全球，品牌風格結合藝術與文化上的陶冶，加大霧銀色面綴以品牌創辦人Agnes
              Trouble 手寫體時標，搭配咖啡色皮質錶帶，體現品牌的法式優雅
            </p>
            <nuxt-link to="/product/1" class="mt-2 inline-block font-bold text-coral-black md:mt-4">
              查看更多
            </nuxt-link>
          </div>
        </div>
      </section>
      <section class="flex flex-col items-center md:flex-row" data-aos="fade-left">
        <div class="w-[382px] md:w-0 md:flex-grow" />
        <div class="flex items-center justify-center md:w-0 md:flex-grow">
          <div class="max-w-[382px] p-4">
            <h1 class="text-[32px]">CK經典線條簡約腕錶</h1>
            <p class="mt-2 text-xl">
              源自美國的品牌<br />強調純粹簡單，輕鬆優雅的設計款式<br />是重視極簡迷人魅力的你不可錯過的一款錶
            </p>
            <nuxt-link
              to="/product/12"
              class="mt-2 inline-block font-bold text-coral-black md:mt-4"
            >
              查看更多
            </nuxt-link>
          </div>
        </div>
      </section>
      <section class="flex flex-col items-center md:flex-row" data-aos="fade-right">
        <div class="w-[382px] md:order-1 md:w-0 md:flex-grow" />
        <div class="flex items-center justify-center md:w-0 md:flex-grow">
          <div class="max-w-[382px] p-4">
            <h1 class="text-[32px]">耀眼迷人時尚晶鑽腕錶</h1>
            <p class="mt-2 text-xl">
              經典Logo面盤，時尚品牌，致力於經典與流行之間，並展現品牌企圖心，用以結合時尚與現代美感，簡約時尚設計，流露出優雅大方的亮采風情，搭配心情或場所，怡然呈現！
            </p>
            <nuxt-link
              to="/product/13"
              class="mt-2 inline-block font-bold text-coral-black md:mt-4"
            >
              查看更多
            </nuxt-link>
          </div>
        </div>
      </section>
      <section class="flex flex-col items-center md:flex-row" data-aos="fade-left">
        <div class="w-[382px] md:w-0 md:flex-grow" />
        <div class="flex items-center justify-center md:w-0 md:flex-grow">
          <div class="max-w-[382px] p-4">
            <h2 class="text-2xl">1. Move. Exercise. Stand. Track all the ways you're active.</h2>
            <p class="mt-2">
              Activity rings show your daily activity. Make it your goal to close them every day. To
              keep you motivated there are awards, personalized coaching, and Activity competitions.
            </p>
            <h2 class="mt-5 text-2xl lg:mt-[52px]">2. A healthy number of workouts.</h2>
            <p class="mt-2">
              From running to cycling to high intensity interval training, Apple Watch tracks all
              your favorite ways to work out, with the metrics you most want to see.
            </p>
            <h2 class="mt-5 text-2xl lg:mt-[52px]">3. Make a splash with your watch.</h2>
            <p class="mt-2">
              Apple Watch is water resistant 50 meters.1 Perfect for swimming, surfing, or water
              balloon fights. Quick, duck!
            </p>
            <a
              href="https://support.apple.com"
              target="_blank"
              class="home-btn mt-5 text-xl lg:mt-15"
              >Get help buying</a
            >
          </div>
        </div>
      </section>
    </div>

    <div class="bg-gray py-8 md:py-10">
      <div class="container flex flex-col items-center md:flex-row md:items-start">
        <div class="relative w-[345px] md:w-0 md:flex-grow" data-aos="fade-up">
          <nuxt-link to="/product/2" class="block">
            <div
              class="bg-cover bg-center pt-[101%] md:pt-[150%]"
              style="
                background-image: url(https://images.unsplash.com/photo-1617265859824-46910d1ad447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODYyNXwwfDF8c2VhcmNofDJ8fHdyaXN0d2F0Y2h8ZW58MHwyfHx8MTYyNTgxNjg5Mw&ixlib=rb-1.2.1&q=80&w=1080);
              "
            />
          </nuxt-link>
          <div>
            <p class="mt-1 text-2xl leading-9">法式藝術風情時尚腕錶</p>
            <p>agnes b.</p>
            <ul class="flex">
              <li>NT$5,760</li>
              <li class="ml-[6px] text-dark-gray line-through">NT$7,200</li>
            </ul>
          </div>
        </div>
        <div
          class="relative mt-8 w-[345px] md:mt-0 md:ml-[30px] md:w-0 md:flex-grow"
          data-aos="fade-up"
          :data-aos-delay="isMediumScreen ? 50 : 0"
        >
          <nuxt-link to="/product/15" class="block">
            <div
              class="bg-cover bg-center pt-[101%] md:pt-[150%]"
              style="
                background-image: url(https://images.unsplash.com/photo-1590087023009-2ec09f26a9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODYyNXwwfDF8c2VhcmNofDE1fHx3cmlzdHdhdGNofGVufDB8Mnx8fDE2MjU4MTY4OTM&ixlib=rb-1.2.1&q=80&w=1080);
              "
            />
          </nuxt-link>
          <div>
            <p class="mt-1 text-2xl leading-9">Chronos 奢華時尚真皮日期腕錶</p>
            <p>Folli Follie</p>
            <ul class="flex">
              <li>NT$7,490</li>
            </ul>
          </div>
        </div>
        <div
          class="mt-8 w-[345px] md:mt-0 md:ml-[30px] md:w-0 md:flex-grow"
          data-aos="fade-up"
          :data-aos-delay="isMediumScreen ? 100 : 0"
        >
          <div class="relative">
            <div
              class="bg-cover bg-center pt-[101%] md:pt-[150%]"
              style="
                background-image: url(https://images.unsplash.com/photo-1562157646-4303261af91e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxODYyNXwwfDF8c2VhcmNofDMxMHx8d3Jpc3R3YXRjaHxlbnwwfDJ8fHwxNjI1ODE3MTk5&ixlib=rb-1.2.1&q=80&w=1080);
              "
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-2xl text-white"
            >
              Sold out
            </div>
          </div>
          <div>
            <p class="mt-1 text-2xl leading-9">GUESS 現代摩登時尚晶鑽腕錶</p>
            <p>Tonik</p>
            <ul class="flex">
              <li>NT$5,850</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <section
      class="container flex flex-col items-center py-10 md:flex-row md:py-15"
      data-aos="zoom-in"
    >
      <div class="w-[345px] md:w-0 md:flex-grow-[5] lg:flex-grow-[7]">
        <div
          class="bg-cover bg-center pt-[150%] md:pt-[70%]"
          style="
            background-image: url(https://images.unsplash.com/photo-1568010213205-81f253b9a040?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80);
          "
        />
      </div>
      <div class="w-[345px] md:w-0 md:flex-grow-[5] md:pl-[30px] lg:flex-grow-[3]">
        <h1 class="text-[32px]">It goes on to help the planet.</h1>
        <p class="mt-2">
          You may be done with your device, but chances are it still has more to give. If it’s in
          good shape, we’ll help it go to a new owner, diverting electronic waste from landfills. If
          not, we’ll send it to our recycling partner, so we can save more precious materials and
          take less from the earth.
        </p>
        <a
          href="https://www.apple.com/environment/"
          target="_blank"
          class="mt-2 inline-block font-bold text-coral-black"
        >
          查看更多
        </a>
      </div>
    </section>

    <Subscribe />
  </div>
</template>

<script setup>
import { useMediaQuery } from '@vueuse/core'

const isMediumScreen = useMediaQuery('(min-width: 768px)')
const { $AOS } = useNuxtApp()

onMounted(() => {
  setTimeout(() => {
    $AOS.init()
  }, 1000)
})
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import '@/assets/scss/common';
.hero {
  background-position: 10% 50%;
  @media (min-width: #{$screen-md}px) {
    background-position: 50%;
  }
  @media (min-width: #{$screen-2xl}px) {
    background-position: 80% 50%;
    background-size: 110% auto;
  }
}
.products > section {
  + section {
    margin-top: 32px;
    @media (min-width: #{$screen-md}px) {
      margin-top: 0;
    }
  }
  @each $name, $value in $home-illust {
    &:nth-child(#{$name}) > div:first-child:before {
      display: block;
      padding-top: percentage(math.div(map-get($value, height), map-get($value, width)));
      background-image: url(map-get($value, url));
      background-position: map-get($value, pos-x) map-get($value, pos-y);
      background-size: cover;
      content: '';
      @media (min-width: #{$screen-md}px) {
        padding-top: percentage(math.div(map-get($value, md-height), map-get($value, md-width)));
      }
    }
  }
}
</style>
