import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Modal, ModalHeader } from "reactstrap";

const NotificationHome = () => {
  const [model, setModel] = useState(true);
  return (
    <Modal size="md" isOpen={model} toggle={() => setModel(!model)}>
      <ModalHeader>
        <div className=" ">
          <div className="col-12 ">
            <div className="col-12">
              <h4>
                whould you like to receive notifications on latest updates?
              </h4>
              <div className="col-12 mt-3 ">
                <div className="col-12 d-flex justify-content-between">
                  <Button
                    variant="contained"
                    color="error"
                    className="mx-1"
                    onClick={() => setModel(false)}
                  >
                    NOT YET
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className="mx-1"
                    // onClick={(e) => deleteCatClick(e)}
                  >
                    YES
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalHeader>
    </Modal>
  );
};

export default NotificationHome;
