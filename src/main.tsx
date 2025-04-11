import "@mantine/core/styles.css";
import {
  createTheme,
  MantineProvider,
  MantineColorsTuple,
} from "@mantine/core";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// 🟤 Shades of #7E4005 (light to dark)
const primaryColor: MantineColorsTuple = [
  "#fef4ec",
  "#fbe1cb",
  "#f7c5a0",
  "#f1a871",
  "#eb8c49",
  "#e47127",
  "#c55f1e",
  "#a14d18",
  "#7e4005",
  "#5a2d00",
];

const theme = createTheme({
  colors: {
    primary: primaryColor,
  },
  primaryColor: "primary",
  primaryShade: { light: 8, dark: 8 },
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
