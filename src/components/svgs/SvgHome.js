import c from "./SvgHome.module.css";
import { SvgLoader, SvgProxy } from "react-svgmt";

const SvgHome = (p) => {
  return (
    <div className={c.container}>
      <SvgLoader path="path-to-your-svg-file.svg">
        <SvgProxy selector="#some-element" fill="red" />
        <SvgProxy selector=".some-class" stroke="blue" />
      </SvgLoader>
    </div>
  );
};
export default SvgHome;
