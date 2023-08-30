import React from "react";
import { Helmet } from "react-helmet";

function Error404() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Alikidi.com - Error 404 </title>
        <meta name="description" content="react_helmet demo by manoj" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <section className="utf_block_wrapper">
        <div className="container">
          <div className="row">
            <div className="error-page text-center col">
              <div className="error-code">
                <h2>
                  <strong>404</strong>
                </h2>
              </div>
              <div className="error-message">
                <h3>Error 404 Page Not Found</h3>
              </div>
              <div className="error-body">
                We're sorry, the page you have looked for does not exist!
                <br />
                home page or try to use a search?
                <br />
                <a href="index.html" className="btn btn-primary">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error404;
