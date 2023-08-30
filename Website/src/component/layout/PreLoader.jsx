import React from "react";

function PreLoader() {
  return (
    <div id="preloader">
      <div id="ctn-preloader" className="ctn-preloader">
        <div className="animation-preloader">
          <div className="spinner" />
          <div className="txt-loading">
            <span data-text-preloader="A" className="letters-loading">
              A
            </span>
            <span data-text-preloader="L" className="letters-loading">
              L
            </span>
            <span data-text-preloader="T" className="letters-loading">
              T
            </span>
            <span data-text-preloader="R" className="letters-loading">
              R
            </span>
            <span data-text-preloader="O" className="letters-loading">
              O
            </span>
            <span data-text-preloader="Z" className="letters-loading">
              Z
            </span>
            <span data-text-preloader=" " className="letters-loading">
              &nbsp;
            </span>
            <span data-text-preloader="N" className="letters-loading">
              N
            </span>
            <span data-text-preloader="E" className="letters-loading">
              E
            </span>
            <span data-text-preloader="W" className="letters-loading">
              W
            </span>
            <span data-text-preloader="S" className="letters-loading">
              S
            </span>
          </div>
        </div>
        <div className="loader">
          <div className="row">
            <div className="col-3 loader-section section-left">
              <div className="bg" />
            </div>
            <div className="col-3 loader-section section-left">
              <div className="bg" />
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg" />
            </div>
            <div className="col-3 loader-section section-right">
              <div className="bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreLoader;
