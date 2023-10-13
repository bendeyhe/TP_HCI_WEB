<template>
    <AppBar/>
    <h1>Crear Cuenta</h1>
    <v-row justify="center">
        <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
        >
            <v-card ref="form">
                <v-card-text>
                    <v-text-field
                        ref="name"
                        v-model="name"
                        :rules="[() => !!name || 'Campo requerido']"
                        :error-messages="errorMessages"
                        label="Nombre"
                        required
                    ></v-text-field>
                    <v-text-field
                        ref="surname"
                        v-model="surname"
                        :rules="[() => !!surname || 'Campo requerido']"
                        :error-messages="errorMessages"
                        label="Apellido"
                        required
                    ></v-text-field>


                    <div>
                        <v-menu
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ props }">
                                <v-text-field
                                    v-bind="props"
                                    :value="dateFormatted"
                                    variant="outlined"
                                    append-inner-icon="mdi-calendar"
                                    @change="onChange"
                                    @input="updateDate"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                :value="getDate"
                                @change="onChange"
                                @input="updateDate"
                            ></v-date-picker>
                        </v-menu>
                    </div>



                    <v-text-field
                        ref="address"
                        v-model="address"
                        :rules="[
              () => !!address || 'Campo requerido',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              addressCheck
            ]"
                        label="Dirección"
                        counter="25"
                        required
                    ></v-text-field>
                    <v-text-field
                        ref="city"
                        v-model="city"
                        :rules="[() => !!city || 'Campo requerido', addressCheck]"
                        label="City"
                        required
                    ></v-text-field>
                    <v-text-field
                        ref="zip"
                        v-model="zip"
                        :rules="[() => !!zip || 'Campo requerido']"
                        label="Codigo Postal"
                        required
                    ></v-text-field>
                    <v-autocomplete
                        ref="country"
                        v-model="country"
                        :rules="[() => !!country || 'Campo requerido']"
                        :items="countries"
                        label="Nacionalidad"
                        placeholder="Seleccione..."
                        required
                    ></v-autocomplete>
                </v-card-text>
                <v-divider class="mt-12"></v-divider>
                <v-card-actions>
                    <v-btn class="cancel" variant="text" >
                        Cancelar
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-slide-x-reverse-transition>
                        <v-tooltip
                            v-if="formHasErrors"
                            location="left"
                        >
                            <v-btn
                                icon
                                class="my-0"
                                v-bind="attrs"
                                @click="resetForm"
                                v-on="on"
                                >
                                <v-icon>mdi-refresh</v-icon>
                                </v-btn>

                            <span>Refresh form</span>
                        </v-tooltip>
                    </v-slide-x-reverse-transition>
                    <v-btn
                        class="registrarse"
                        variant="text"
                        @click="submit"
                    >
                        Registrarse
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import storage from '../storage/storage.js'
import GoBack from "@/components/GoBack.vue"; //esto hay que cambiarlo cuando tengamos Pinia
import AppBar from '@/components/AppBar.vue'
import { VDatePicker } from 'vuetify/labs/VDatePicker'

const username = ref(null)
const password = ref(null)
const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.registrarse{
    color: #8efd00;
    background-color: #000000;
    margin-right : 10px;
    margin-left : 10px;
}

.v-sheet{
    padding-top: 5%;
}

.cancel{
    color: #000000;
    margin-right : 10px;
    margin-left : 10px;
}

h1{
    text-align: center;
    padding-top:25px;
    padding-bottom: 25px;
}
</style>

<script>
 export default {
     data: () => ({
     countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', `Timor L'Este`, 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
 errorMessages: '',
 name: null,
 address: null,
 city: null,
 state: null,
 zip: null,
 country: null,
 formHasErrors: false,
 }),

 computed: {
     form () {
     return {
         name: this.name,
         address: this.address,
         city: this.city,
         state: this.state,
         zip: this.zip,
         country: this.country,
     }
 },
 },

 watch: {
     name () {
     this.errorMessages = ''
 },
 },

 methods: {
     addressCheck () {
     this.errorMessages = this.address && !this.name
 ? `Campo requerido`
 : ''

 return true
 },
 resetForm () {
     this.errorMessages = []
 this.formHasErrors = false

 Object.keys(this.form).forEach(f => {
     this.$refs[f].reset()
 })
 },
 submit () {
     this.formHasErrors = false

 Object.keys(this.form).forEach(f => {
     if (!this.form[f]) this.formHasErrors = true

 this.$refs[f].validate(true)
 })
 },
 },
 }
 </script>


