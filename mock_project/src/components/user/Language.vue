<template>
    <div>
        <button class="multi-language" v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
        <flag :iso="entry.flag" v-bind:squared=false />
        {{entry.title}}
      </button>
    </div>
</template>

<script>
import i18n from '../../config/i18n';

export default {
  data() {
    return {
      languages: [
        { flag: 'gb', language: 'en' },
        { flag: 'jp', language: 'jp' },
        { flag: 'vn', language: 'vi' }
      ]
    }
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
    }
  }
    
}
</script>
