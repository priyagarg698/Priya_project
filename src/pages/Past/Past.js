import { useState } from "react";
import classes from "./Past.module.css";
import Modal from "../../components/Modal";
import Backdrop from "../../components/Backdrop";
import TableContent from "../TableContent/TableContent";
import Auxillary from "../../hoc/Auxillary/Auxillary";

function Past(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({})

  function deleteHandler(data) {
    setModalData(data);
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }
  
  function renderTableData() {
    return props.pastData.map((CampaignData, index) => {
      return (
        <tr key={index}>
          <TableContent displayData={CampaignData} index={index} dateChangeHandler={props.dateChangeHandler} deleteHandler={deleteHandler} type='pastCampaign'></TableContent>
        </tr>
      );
    });
  }
  function renderTableHeader() {
    <Auxillary>
          <th >
            <div className="pl-2">Date</div>
          </th>
          <th >
            <div className="pl-2">campaign</div>
          </th>
          <th >
            <div className="pl-2">view</div>
          </th>
          <th >
            <div className="pl-4 ml-3">actions</div>
          </th>
        </Auxillary>
  }

  return (
    <div>
      {props.pastData.length ? (
        <table id="CampaignDatas" className={classes.CampaignDatas}>
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      ) : null}
      {!props.pastData.length ? <h2>No campaign is scheduled</h2> : null}
      {modalIsOpen && (
        <Modal
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler} data={modalData}
        ></Modal>
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler}></Backdrop>}
    </div>
  );
}

export default Past;
