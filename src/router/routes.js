import auth from './middleware/auth';
import guest from './middleware/guest';
//Projects main views

import Alternative from "../views/Dashboard/AlternativeDashboard";
import DashboardLayout from "@/views/Layout/DashboardLayout";
import Users from "../views/users/index";

import UserCreate from "../views/users/create";
import UserEdit from "../views/users/edit";
import Profile from "../views/users/profileIndex";
import ProfileEdit from "../views/users/profileEdit";

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
import Register from "../views/auth/Register";
import ResetPassword from "../views/auth/ResetPassword";
import ForgetPassword from "../views/auth/ForgetPassword";


export default [
  {
    path: "/",
    component: DashboardLayout,
    meta: {
      middleware: [auth],
      navbarType: "light",
    },
    name: "Dashboards",

    children: [
      {
        path: "/",
        name: "Dashboard",
        components: { default: Alternative },
        meta: {
          navbarType: "light",
        },
      },
      {
        path: "/Users",
        name: "Users",
        components: { default: Users },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/Users/create",
        name: "UserCreate",
        components: { default: UserCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/Users/edit/:id",
        name: "UserEdit",
        components: { default: UserEdit },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/profile",
        name: "Profile",
        components: { default: Profile },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/profile/edit/:id",
        name: "ProfileEdit",
        components: { default: ProfileEdit },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/master-products/products",
        name: "Products",
        components: { default: Products },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/master-products/products/product-details",
        name: "ProductCreate",
        components: { default: ProductCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/master-products/schemes",
        name: "Schemes",
        components: { default: Schemes },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/master-products/schemes/create",
        name: "SchemesCreate",
        components: { default: SchemesCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/master-products/schemes/edit/:id",
        name: "SchemesEdit",
        components: { default: SchemesEdit },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/invoice",
        name: "Invoice",
        components: { default: Invoice },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/invoice/create",
        name: "InvoiceCreate",
        components: { default: InvoiceCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/invoice/edit/:id",
        name: "InvoiceEdit",
        components: { default: InvoiceEdit },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/purchase-returns",
        name: "PurchaseReturns",
        components: { default: PurchaseReturns },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/debit",
        name: "Debit",
        components: { default: Debit },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/invoices/credit",
        name: "Credit",
        components: { default: Credit },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders",
        name: "PurchaseOrders",
        components: { default: PurchaseOrders },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/details/:id",
        name: "PurchaseOrdersCreate",
        components: { default: PurchaseOrdersCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/dispatch-note",
        name: "DispatchNote",
        components: { default: DispatchNote },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/dispatch-note/create",
        name: "DispatchNoteCreate",
        components: { default: DispatchNoteCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/purchase-orders/dispatch-note/edit/:id",
        name: "DispatchNoteEdit",
        components: { default: DispatchNoteEdit },
        meta: {
          middleware: [auth],
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
    components: {default: Login },
    meta:{middleware: [guest]}
  },
  {
    path: "/register",
    name: "Register",
    components: {default: Register },
    meta:{middleware: [guest]}
  },
  {
    path: "/forgot-password",
    name: "ForgetPassword",
    components: {default: ForgetPassword },
    meta:{middleware: [guest]}
  },
  {
    path: "/password-reset/:id",
    name: "ResetePassword",
    components: {default: ResetPassword },
    meta:{middleware: [guest]}
  }
];
