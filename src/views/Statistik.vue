<template>
  <div>
    <div>
      <v-data-table
        v-if="is_loading"
        :headers="headers"
        class="elevation-1"
        loading
        loading-text="Sedang memuat data... Mohon bersabar"
      ></v-data-table>
      <v-data-table
        v-else
        :headers="headers"
        :items="items"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table>
    </div>
  </div>
</template>

<script>
import NasionalService from "@/services/NasionalService.js";
import ProvinsiService from "@/services/ProvinsiService.js";

export default {
  data() {
    return {
      headers: [
        {
          text: "Nasional/Nama Provinsi",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Kasus Kumulatif", value: "kasus" },
        { text: "Dalam Perawatan", value: "perawatan" },
        { text: "Total Sembuh", value: "sembuh" },
        { text: "Meninggal", value: "meninggal" },
        { text: "Terakhir Update", value: "update" }
      ],
      items: [],
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
      is_loading: true
    };
  },
  created() {
    this.is_loading = true;
    this.items = [];
    NasionalService.getToday()
      .then(response => {
        const tanggal = response.data["update"].split("T")[0].split("-");
        const waktu = response.data["update"]
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
          name: "Nasional",
          kasus: response.data["kumulatif"],
          perawatan: response.data["perawatan"],
          sembuh: response.data["sembuh"],
          meninggal: response.data["meninggal"],
          update:
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
        ProvinsiService.getAllProvinceToday()
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
                name: element["nama"],
                kasus: element["kumulatif"],
                perawatan: "tidak diketahui",
                sembuh: element["sembuh"],
                meninggal: element["meninggal"],
                update:
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
            this.is_loading = false;
          })
          .catch(() => {
            this.is_loading = false;
          });
      })
      .catch(() => {
        this.is_loading = false;
      });
  }
};
</script>
