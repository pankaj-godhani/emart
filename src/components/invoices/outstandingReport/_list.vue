<template>

  <div>
    <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
      <div>
        <Table>
          <template v-slot:thead>
            <tr>
              <th>Vendor Code</th>
              <th>Vendor Name</th>
              <th>Invoice Total</th>
              <th>Payment Total</th>
              <th>Balance Total</th>

            </tr>
          </template>

          <template v-slot:tbody>
            <tr v-for="data in pagedData" :key="data._id">
              <td>{{data.userId._id}}</td>
              <td>{{data.invoiceNumber}}</td>
              <td>{{data.userId.GST}}</td>
              <td>{{data.userId.firstName}} {{data.userId.lastName}}</td>
              <td>{{changeDateFormat(data.paymentDate)}}</td>
              <td>{{data.paymentMode}}</td>
              <td>{{data.amount}}</td>
              <td>{{data.Remarks}}</td>
              <!--              <td>
                              <div class="d-flex">
                                <div class="pr-2">
                                  <router-link
                                    :to="{ name: 'InvoiceEdit', params: { id: data._id } }"
                                  >
                                    <button
                                      type="button"
                                      class="btn base-button btn-icon btn-fab btn btn-default btn-sm edit"
                                    >
                                      <i class="text-white ni ni-ruler-pencil"></i>
                                    </button>
                                  </router-link>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    class="btn base-button btn-icon btn-fab btn-danger btn-sm remove btn-link"
                                    data-toggle="modal"
                                    data-target="#myModal"
                                    @click.prevent="confirmDelete(data)"
                                  >
                                    <i class="text-white ni ni-fat-remove"></i>
                                  </button>
                                </div>
                              </div>
                            </td>-->
            </tr>

          </template>
        </Table>

      </div>
    </card>
  </div>

</template>
