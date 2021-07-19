import { useState } from "react";
import classes from "./Upcomming.module.css";
import Modal from "../../components/Modal";
import Backdrop from "../../components/Backdrop";
import TableContent from "../TableContent/TableContent";
import Auxillary from "../../hoc/Auxillary/Auxillary";
function Upcomming(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState({})

  /* handle the popup on click of view pricing */
  function priceHandler(data) {
    setModalData(data);
    setModalIsOpen(true);
  }

  /* close the view pricing popup */
  function closeModalHandler() {
    setModalIsOpen(false);
  }
  /* Render the table data */
  function renderTableData() {
    return props.upcommingData.map((CampaignData, index) => {
      return (
        <tr key={index}>
          <TableContent displayData={CampaignData} index={index} dateChangeHandler={props.dateChangeHandler} priceHandler={priceHandler} type='upcommingCampaign' languageData={props.languageData}></TableContent>
        </tr>
      );
    });
  }
  function renderTableHeader() {
      return (
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
        
      );
  }

  return (
    <div>
      {props.upcommingData.length ? (
        <table id="CampaignData" className={classes.CampaignData}>
          <tbody>
            <tr>{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      ) : null}
      {!props.upcommingData.length ? <h2>No campaign is scheduled</h2> : null}
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

export default Upcomming;
