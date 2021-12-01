import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "@/views/Layout/DashboardLayout";

//Projects main views

import Products from "../views/masterProducts/products/index";
import ProductCreate from "../views/masterProducts/products/create";
import Schemes from "../views/masterProducts/schemes/index";
import SchemesCreate from "../views/masterProducts/schemes/create";
import SchemesEdit from "../views/masterProducts/schemes/edit";
import Invoice from "../views/invoices/invoice/index";
import InvoiceCreate from "../views/invoices/invoice/create";
import InvoiceEdit from "../views/invoices/invoice/edit";
import PurchaseReturns from "../views/invoices/purchaseReturns/index";
import Debit from "../views/invoices/debit/index";
import Credit from "../views/invoices/credit/index";
import PurchaseOrders from "../views/purchaseOrders/purchaseOrders/index";
import PurchaseOrdersCreate from "../views/purchaseOrders/purchaseOrders/create";
import DispatchNote from "../views/purchaseOrders/dispatchNote/index";
import DispatchNoteCreate from "../views/purchaseOrders/dispatchNote/create";
import DispatchNoteEdit from "../views/purchaseOrders/dispatchNote/edit";
import Example from "../views/example";
import Login from "../views/auth/Login";

// Dashboard pages

//import Dashboard from "../views/Dashboard/AlternativeDashboard.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    meta: {
      navbarType: "light",
    },
    name: "Dashboard",

    children: [
      {
        path: "/master-products/products",
        name: "Products",
        components: { default: Products },
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "/master-products/products/product-details",
        name: "ProductCreate",
        components: { default: ProductCreate },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/master-products/schemes",
        name: "Schemes",
        components: { default: Schemes },
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "/master-products/schemes/create",
        name: "SchemesCreate",
        components: { default: SchemesCreate },
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "/master-products/schemes/edit/:id",
        name: "SchemesEdit",
        components: { default: SchemesEdit },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/invoices/invoice",
        name: "Invoice",
        components: { default: Invoice },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/invoices/invoice/create",
        name: "InvoiceCreate",
        components: { default: InvoiceCreate },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/invoices/invoice/edit/:id",
        name: "InvoiceEdit",
        components: { default: InvoiceEdit },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/invoices/purchase-returns",
        name: "PurchaseReturns",
        components: { default: PurchaseReturns },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/invoices/debit",
        name: "Debit",
        components: { default: Debit },
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "/invoices/credit",
        name: "Credit",
        components: { default: Credit },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders",
        name: "PurchaseOrders",
        components: { default: PurchaseOrders },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/details/:id",
        name: "PurchaseOrdersCreate",
        components: { default: PurchaseOrdersCreate },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/dispatch-note",
        name: "DispatchNote",
        components: { default: DispatchNote },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/dispatch-note/create",
        name: "DispatchNoteCreate",
        components: { default: DispatchNoteCreate },
        meta: {
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/dispatch-note/edit/:id",
        name: "DispatchNoteEdit",
        components: { default: DispatchNoteEdit },
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "/example",
        name: "Example",
        components: { default: Example },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    components: { default: Login },
  }
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
