<template>
  <div>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in items" :key="index" cols="12" md="4">
            <v-item>
              <div>
                <v-lazy v-if="index == items.length - 1" v-model="isActive">
                  <v-card class="mx-auto" max-width="344">
                    <v-card-text>
                      <p class="title text--primary" v-html="item.judul"></p>
                      <p v-html="item.tanggal"></p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="deep-purple accent-4"
                        :href="item.url"
                        target="_blank"
                        >Kunjungi</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-lazy>
                <v-card class="mx-auto" max-width="344" v-else>
                  <v-card-text>
                    <p class="title text--primary" v-html="item.judul"></p>
                    <p v-html="item.tanggal"></p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color="deep-purple accent-4"
                      :href="item.url"
                      target="_blank"
                      >Kunjungi</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </div>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import BeritaService from "@/services/BeritaService.js";

export default {
  data() {
    return {
      items: [
        {
          judul: "Hello World!?",
          url: "http://google.com/"
        }
      ],
      bulan: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ],
      isActive: false,
      page: 1
    };
  },
  watch: {
    isActive: function(newVal) {
      if (newVal) {
        this.isActive = !this.isActive;
        this.page++;
        BeritaService.getNews(this.page)
          .then(response => {
            response["data"].forEach(element => {
              const tanggal = element["update"].split("T")[0].split("-");
              const waktu = element["update"]
                .split("T")[1]
                .split(".")[0]
                .split(":");
              const terakhirUpdate = new Date(
                tanggal[0],
                tanggal[1] - 1,
                tanggal[2],
                waktu[0],
                waktu[1],
                waktu[2]
              );
              terakhirUpdate.setHours(terakhirUpdate.getHours() + 7);
              const temp = {
                judul: element["judul"],
                url: element["sumber"],
                tanggal:
                  terakhirUpdate.getDate() +
                  " " +
                  this.bulan[terakhirUpdate.getMonth()] +
                  " " +
                  terakhirUpdate.getFullYear() +
                  " " +
                  (terakhirUpdate.getHours().toString().length != 1
                    ? terakhirUpdate.getHours()
                    : "0" + terakhirUpdate.getHours()) +
                  ":" +
                  (terakhirUpdate.getMinutes().toString().length != 1
                    ? terakhirUpdate.getMinutes()
                    : "0" + terakhirUpdate.getMinutes()) +
                  " WIB"
              };
              if (!this.items.includes(temp)) {
                this.items.push(temp);
              }
            });
          })
          .catch(error => {
            console.log("There was an error:", error.response);
          });
      }
    }
  },
  created() {
    this.items = [];
    BeritaService.getNews()
      .then(response => {
        response["data"].forEach(element => {
          const tanggal = element["update"].split("T")[0].split("-");
          const waktu = element["update"]
            .split("T")[1]
            .split(".")[0]
            .split(":");
          const terakhirUpdate = new Date(
            tanggal[0],
            tanggal[1] - 1,
            tanggal[2],
            waktu[0],
            waktu[1],
            waktu[2]
          );
          terakhirUpdate.setHours(terakhirUpdate.getHours() + 7);
          const temp = {
            judul: element["judul"],
            url: element["sumber"],
            tanggal:
              terakhirUpdate.getDate() +
              " " +
              this.bulan[terakhirUpdate.getMonth()] +
              " " +
              terakhirUpdate.getFullYear() +
              " " +
              (terakhirUpdate.getHours().toString().length != 1
                ? terakhirUpdate.getHours()
                : "0" + terakhirUpdate.getHours()) +
              ":" +
              (terakhirUpdate.getMinutes().toString().length != 1
                ? terakhirUpdate.getMinutes()
                : "0" + terakhirUpdate.getMinutes()) +
              " WIB"
          };
          this.items.push(temp);
        });
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
