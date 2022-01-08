import auth from './middleware/auth';
import guest from './middleware/guest';
//Projects main views

import Alternative from "../views/Dashboard/AlternativeDashboard";
import DashboardLayout from "@/views/Layout/DashboardLayout";
import Users from "../views/users/index";
import UserCreate from "../views/users/create";
import UserEdit from "../views/users/edit";
import Profile from "../views/users/profileIndex";
import Products from "../views/masterProducts/products/index";
import ProductCreate from "../views/masterProducts/products/create";
import Schemes from "../views/masterProducts/schemes/index";
import SchemesCreate from "../views/masterProducts/schemes/create";
import SchemesEdit from "../views/masterProducts/schemes/edit";
import Invoice from "../views/invoices/invoice/index";
import InvoiceCreate from "../views/invoices/invoice/create";
import InvoiceEdit from "../views/invoices/invoice/edit";
import PaymentReport from "../views/invoices/paymentReport/index";
import PaymentCreate from "../views/invoices/paymentReport/create";
import OutstandingReport from "../views/invoices/outstandingReport/index";
import PurchaseReturns from "../views/invoices/purchaseReturns/index";
import Debit from "../views/invoices/debit/index";
import DebitCreate from "../views/invoices/debit/create";
import DebitEdit from "../views/invoices/debit/edit";
import Credit from "../views/invoices/credit/index";
import CreditCreate from "../views/invoices/credit/create";
import CreditEdit from "../views/invoices/credit/edit";
import PurchaseOrders from "../views/purchaseOrders/purchaseOrders/index";
import PurchaseOrdersCreate from "../views/purchaseOrders/purchaseOrders/create";
import DispatchNote from "../views/purchaseOrders/dispatchNote/index";
import DispatchNoteCreate from "../views/purchaseOrders/dispatchNote/create";
import DispatchNoteEdit from "../views/purchaseOrders/dispatchNote/edit";
import Example from "../views/example";
import Login from "../views/auth/Login";
import Logout from "../views/auth/Logout";
import Register from "../views/auth/Register";
import ResetPassword from "../views/auth/ResetPassword";
import ForgetPassword from "../views/auth/ForgetPassword";


export default [
  {
    path: "/",
    redirect: "/dashboard",
    component:  DashboardLayout ,
    meta: {
      middleware: [auth],
      navbarType: "light",
    },
    name: "Dashboard",

    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        components: { default: Alternative },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/users",
        name: "Users",
        components: { default: Users },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },
      {
        path: "/users/create",
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
        path: "/profile/:id",
        name: "Profile",
        components: { default: Profile },
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
        path: "/invoices/payment-report",
        name: "PaymentReport",
        components: { default: PaymentReport },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/payment/create",
        name: "PaymentCreate",
        components: { default: PaymentCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/vendorwise-outstanding-report",
        name: "OutstandingReport",
        components: { default: OutstandingReport },
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
        path: "/invoices/debit/create",
        name: "DebitCreate",
        components: { default: DebitCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/debit/edit/:id",
        name: "DebitEdit",
        components: { default: DebitEdit },
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
        path: "/invoices/credit/create",
        name: "CreditCreate",
        components: { default: CreditCreate },
        meta: {
          middleware: [auth],
          navbarType: "light",
        },
      },

      {
        path: "/invoices/credit/edit/:id",
        name: "CreditEdit",
        components: { default: CreditEdit },
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
      {
        path: "/logout",
        name: "Logout",
        components: {default: Logout },
        meta:{middleware: [auth],navbarType: "light",}
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
