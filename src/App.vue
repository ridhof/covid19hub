<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="mr-2">
          <strong>COVID-19 HUB</strong>
        </span>
      </div>

      <v-spacer></v-spacer>

      <router-link :to="{ name: 'statistik' }">
        <v-btn
          :key="headerLinks[0].name"
          target="_blank"
          color="white"
          text
          rounded
          class="my-2"
        >
          <span class="mr-2">{{ headerLinks[0].name }}</span>
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'berita' }">
        <v-btn
          :key="headerLinks[1].name"
          target="_blank"
          color="white"
          text
          rounded
          class="my-2"
        >
          <span class="mr-2">{{ headerLinks[1].name }}</span>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer color="primary lighten-l" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in footerLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          color="white"
          text
          rounded
          class="my-2"
          >{{ link.name }}</v-btn
        >
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    footerLinks: [
      {
        name: "API",
        url: "https://github.com/ridhof/covid19hub-api"
      },
      {
        name: "Github",
        url: "https://github.com/ridhof/covid19hub"
      }
    ],
    headerLinks: [
      {
        name: "Statistik",
        url: "statistik"
      },
      {
        name: "Berita",
        url: "berita"
      }
    ]
  })
};
</script>
