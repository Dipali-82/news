import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./redux/Athentication/AuthSlice";
import categoryreducer from "./redux/category/CategorySlice";
import subCategoryreducer from "./redux/subCategory/SubCategorySlice";
import universaltagreducer from "./redux/universalTag/UniversalTagSlice";
import categoryTagreducer from "./redux/categoryTag/CategoryTagSlice";
import newsreducer from "./redux/news/NewsSlice";
import reporterreducer from "./redux/reporters/ReporterSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categoryreducer,
    subCategory: subCategoryreducer,
    universaltag: universaltagreducer,
    categoryTag: categoryTagreducer,
    news: newsreducer,
    reporter: reporterreducer,
  },
});
