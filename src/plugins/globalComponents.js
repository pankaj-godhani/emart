import Badge from "../components/Badge";
import BarcodeGenerator from "../components/BarcodeGenerator";
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
import Table from "../components/Table";
import DataModal from "../components/dataModal";
import NewModal from "../components/newModal";
import SingleSelect from "../components/SingleSelect";
//import MultiSelect from "../components/MultiSelect"
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
    app.component("Table", Table);
    app.component("DataModal", DataModal);
    app.component("NewModal", NewModal);
    app.component("SingleSelect", SingleSelect);
    app.component("BarcodeGenerator", BarcodeGenerator);

    //app.component("MultiSelect", MultiSelect);
    app.use(ElTooltip);
    app.use(ElPopover);
    app.use(ElLoading);
  },
};

export default GlobalComponents;
