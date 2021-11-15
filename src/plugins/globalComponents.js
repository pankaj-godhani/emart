import Badge from "../components/Badge";
import BaseButton from "../components/BaseButton";
import BaseCheckbox from "../components/Inputs/BaseCheckbox";
import BaseDropdown from "../components/BaseDropdown";
import BaseHeader from "../components/BaseHeader";
import BaseInput from "../components/Inputs/BaseInput";
import BaseNav from "../components/Navbar/BaseNav";
import BasePagination from "../components/BasePagination";
import BaseProgress from "../components/BaseProgress";
import BaseRadio from "../components/Inputs/BaseRadio";
import BaseSwitch from "../components/BaseSwitch";
import Card from "../components/Cards/Card";
import StatsCard from "../components/Cards/StatsCard";
import Input from "../components/Input";
import Toggle from "../components/Toggle";
import Table from "../components/Table";
import ConfirmModal from "../components/ConfirmModal";
import DashboardDateRangePicker from "../components/DashboardDateRangePicker"
import DataModal from "../components/dataModal"
import DateInput from "../components/Date"
import { ElTooltip, ElPopover, ElLoading } from "element-plus";


const GlobalComponents = {
  install(app) {
    app.component("badge", Badge);
    app.component("base-button", BaseButton);
    app.component("base-checkbox", BaseCheckbox);
    app.component("base-dropdown", BaseDropdown);
    app.component("base-input", BaseInput);
    app.component("base-nav", BaseNav);
    app.component("base-header", BaseHeader);
    app.component("base-pagination", BasePagination);
    app.component("base-progress", BaseProgress);
    app.component("base-radio", BaseRadio);
    app.component("base-switch", BaseSwitch);
    app.component("card", Card);
    app.component("stats-card", StatsCard);
    app.component("Input",Input);
    app.component("Toggle",Toggle);
    app.component("Table",Table);
    app.component("ConfirmModal",ConfirmModal);
    app.component("DashboardDateRangePicker",DashboardDateRangePicker);
    app.component("DateInput",DateInput);
    app.component("DataModal",DataModal);
    app.use(ElTooltip);
    app.use(ElPopover);
    app.use(ElLoading);
  },
};

export default GlobalComponents;
