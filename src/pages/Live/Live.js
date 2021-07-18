import { useState } from "react";
import classes from "./Live.module.css";
import Modal from "../../components/Modal";
import Backdrop from "../../components/Backdrop";
import TableContent from "../TableContent/TableContent";
import Auxillary from "../../hoc/Auxillary/Auxillary";

function Live(props) {
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
    return props.liveData.map((CampaignData, index) => {
      return (
        <tr key={index}>
          <TableContent displayData={CampaignData} index={index} dateChangeHandler={props.dateChangeHandler} deleteHandler={deleteHandler} languageData={props.languageData} type='liveCampaign'></TableContent>
        </tr>
      );
    });
  }
  function renderTableHeader() {
    <Auxillary>
          <th >
            <div className="pl-2">{props.languageData.date.value}</div>
          </th>
          <th >
            <div className="pl-2">{props.languageData.campaign.value}</div>
          </th>
          <th >
            <div className="pl-2">{props.languageData.view.value}</div>
          </th>
          <th >
            <div className="pl-4 ml-3">{props.languageData.actions.value}</div>
          </th>
        </Auxillary>
  }

  return (
    <div>
      {props.liveData.length ? (
        <table id="CampaignDatas" className={classes.CampaignDatas}>
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      ) : null}
      {!props.liveData.length ? <h2>No campaign is scheduled</h2> : null}
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

export default Live;
