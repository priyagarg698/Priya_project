
import React from "react";
import classes from "./TableContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCsv,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import Auxillary from "../../hoc/Auxillary/Auxillary";
function TableContent(props){
  function formatDate(data) {
    let d = new Date(data);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${ye}, ${da}`;
  }
  function calculateDays(data) {
    
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(data).setHours(0,0,0,0);
    let secondDate = new Date().setHours(0,0,0,0);
   
    let diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  }
    return(
        <Auxillary>
            <td>
            <div className="row">
              <div className="col-12">{formatDate(props.displayData.createdOn)}</div>
              <div className="col-12">
                 {props.type === 'pastCampaign'?calculateDays(props.displayData.createdOn)+' days ago' : null} {props.type === 'upcommingCampaign'? calculateDays(props.displayData.createdOn) + ' days ahead' : null} {props.type === 'liveCampaign'?'Today' : null}
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                src={`${process.env.PUBLIC_URL}/${props.displayData.image_url}`}
                alt={props.displayData.name}
                width="40"
                height="40"
              ></img>
              <div className="col-10 ">
                <div>{props.displayData.name}</div>
                <div className="text-muted">{props.displayData.region}</div>
              </div>
            </div>
          </td>
          <td>
            <div className={[classes.custom_pointer,"d-flex"].join(' ')} onClick={()=>props.deleteHandler(props.displayData)}>
              <div className={classes.cssCircle}>&#36;</div>
              <div className="pl-1">View pricing</div>
            </div>
          </td>
          <td>
            <div className="d-flex col-12">
              <div className="d-flex col-2">
                <div>
                  <FontAwesomeIcon
                    icon={faFileCsv}
                    className="fa-2x"
                    color="#21a008"
                  />
                </div>

                <div className="pl-2 pt-1">CSV</div>
              </div>
              <div className="d-flex col-2">
                <div>
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="fa-2x "
                    color="#f3680b"
                  />
                </div>
                <div className="pl-2 pt-1">Report</div>
              </div>
              <div className="d-flex">
                {/* <div className="pl-4"> */}
                  <input className={classes.date}
                    type="date"
                    onChange={(event) =>
                      props.dateChangeHandler(event, props.index, props.type)
                    }
                  ></input>
                {/* </div> */}
                <div className="pl-2 pt-1">Schedule Again</div>
              </div>
            </div>
          </td>
        </Auxillary>
    )

}
export default TableContent;