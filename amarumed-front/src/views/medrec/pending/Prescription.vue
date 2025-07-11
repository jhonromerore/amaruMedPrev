<template>
  <v-form ref="form" v-model="isValidForm" lazy-validation>
    <v-card color="grey lighten-4" class="particle">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="12">
            <v-textarea
              v-model="element.reason"
              background-color="white"
              label="Descripción"
              :rules="rules.reason"
              outlined
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="update()" text>
          Siguiente <v-icon right>fa-angle-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import service from '@/services/MedicalRecordService'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Prop } from 'vue-property-decorator'
import { createMedicalRecord } from '@/models'
import validate from '@/utils/validations'
import { MedicalRecord } from '@/models'
import alert from '@/utils/alert'

@Component({})
export default class PrescriptionComponent extends Vue {
    @Prop() medRec!: MedicalRecord


}
</script>
