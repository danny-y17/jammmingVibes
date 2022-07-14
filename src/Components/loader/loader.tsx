import React from "react";
import {BarLoader} from "react-spinners";
import './loader.css'

const override: React.CSSProperties = {
  display: "flow-root", 
  margin: "0 auto",
  borderColor: "#010c3f",
};

class Preloader extends React.Component {

  render() {
    return (
      <div className="sweet-loading">
        <BarLoader
          height={5}
          width={3333}
          color={"#6c41ec"}
          loading={true}
          speedMultiplier={1}
          cssOverride = {override}
        />
      </div>
    );
  }
}

export default Preloader