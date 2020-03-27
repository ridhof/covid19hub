<template>
  <div>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in items" :key="index" cols="12" md="4">
            <v-item>
              <v-card class="mx-auto" max-width="300" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="headline mb-1"
                      v-html="item.judul"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                    class="ma-2"
                    outlined
                    color="info"
                    :href="item.url"
                    target="_blank"
                    >Kunjungi</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          judul: "Hello World!?",
          url: "http://google.com/"
        },
        {
          judul: "Hello World!?",
          url: "http://google.com/"
        },
        {
          judul: "Hello World!?",
          url: "http://google.com/"
        },
        {
          judul: "Hello World!?",
          url: "http://google.com/"
        },
        {
          judul: "Hello World!?",
          url: "http://google.com/"
        }
      ]
    };
  }
};
</script>
