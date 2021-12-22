<template>
  <card>
    <div class="container ct-example-row">
      <form @submit="submit" >
        <div>
<!--          <h3><b>Group Heading 1</b></h3>-->
          <div class="row mt-3">
            <div class="col-sm form-group">
              <label class="form-control-label">Product Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="Product Name"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Vendor Invoice Reference & Date</label>
              <input
                class="form-control"
                type="date"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">E Metro PO reference & Date</label>
              <input
                class="form-control"
                type="date"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label class="form-control-label">Description</label>
              <input
                type="text"
                class="form-control"
                placeholder="Description"

              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Item Quantity</label>
              <input
                type="text"
                class="form-control"
                placeholder="Item Quantity"

              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">HSN Code</label>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Free Quantity"

              />
            </div>
          </div>
        </div>
        <div class="mt-4">
<!--          <h3><b>Group Heading 2</b></h3>-->
          <div class="row mt-3">
            <div class="col-sm">
              <label class="form-control-label">Unit Price</label>
              <input
                type="text"
                class="form-control"
                placeholder="Unit Price"

              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Tax Rate</label>
              <input
                type="text"
                class="form-control"
                placeholder="Tax Rate"

              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">CGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="CGST"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-sm">
              <label class="form-control-label">SGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="SGST"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">IGST</label>
              <input
                type="text"
                class="form-control"
                placeholder="IGST"
              />
            </div>
            <div class="col-sm">
              <label class="form-control-label">Amount</label>
              <input
                type="text"
                class="form-control"
                placeholder="Amount"
              />
            </div>
          </div>
        </div>
        <div class="d-flex mt-3 float-right">
          <div class="pr-2">
            <router-link :to="{ name: 'Schemes' }">
              <base-button outline type="default">Cancel</base-button>
            </router-link>
          </div>
          <div>
            <button
              type="button"
              class="btn base-button btn-default"
              @click.prevent="update"

            >
              Save
            </button>
            <button
              type="button"
              class="btn base-button btn-default"
              @click.prevent="submit"

            >
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
  </card>
</template>
