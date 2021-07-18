// import React from 'react';
import { useState, React, useEffect } from "react";
import Tabs, { TabPane } from "rc-tabs";
import "../../../node_modules/rc-tabs/assets/index.css";
import "./TabSlider.css";
import Upcomming from "../../pages/Upcomming/Upcomming";
import Live from "../../pages/Live/Live";
import Past from "../../pages/Past/Past";

function TabSlider() {
  function callback(e) {
    console.log(e);
  }
  let [upcommingData, setupcommingData] = useState([]);
  let [liveData, setliveData] = useState([]);
  let [pastData, setpastData] = useState([]);

  let [campaignData, setCampaignData] = useState([]);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setCampaignData(res["data"])
      });
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setupcommingData(
      campaignData.filter(
        (ele) =>
          new Date().setHours(0, 0, 0, 0) <
          new Date(ele.createdOn).setHours(0, 0, 0, 0)
      )
    );
    setliveData(
      campaignData.filter(
        (ele) =>
          new Date().setHours(0, 0, 0, 0) ===
          new Date(ele.createdOn).setHours(0, 0, 0, 0)
      )
    );
    setpastData(
      campaignData.filter(
        (ele) =>
          new Date().setHours(0, 0, 0, 0) >
          new Date(ele.createdOn).setHours(0, 0, 0, 0)
      )
    );
  }, [campaignData]);

  function dateChange(event, index, type) {
    if (type === "pastCampaign") {
      if (new Date(event.target.value).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        pastData[index].createdOn = event.target.value;
        upcommingData.push(pastData[index]);
      }
      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        pastData[index].createdOn = event.target.value;
        pastData.push(pastData[index]);
      }

      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        pastData[index].createdOn = event.target.value;
        liveData.push(pastData[index]);
      }
      pastData.splice(index, 1);
    }
    else if (type === "liveCampaign"){
      if (new Date(event.target.value).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        liveData[index].createdOn = event.target.value;
        upcommingData.push(liveData[index]);
      }
      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        liveData[index].createdOn = event.target.value;
        pastData.push(liveData[index]);
      }

      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        liveData[index].createdOn = event.target.value;
        liveData.push(liveData[index]);
      }
      liveData.splice(index, 1);
    }
    else if (type === "upcommingCampaign"){
      if (new Date(event.target.value).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        upcommingData[index].createdOn = event.target.value;
        upcommingData.push(upcommingData[index]);
      }
      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) <
        new Date().setHours(0, 0, 0, 0)
      ) {
        upcommingData[index].createdOn = event.target.value;
        pastData.push(upcommingData[index]);
      }

      if (
        new Date(event.target.value).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        upcommingData[index].createdOn = event.target.value;
        liveData.push(upcommingData[index]);
      }
       upcommingData.splice(index, 1);
    }

    setpastData([...pastData]);
    setupcommingData([...upcommingData]);
    setliveData([...liveData]);

  }
  return (
    <div className="offset-1 col-10">
      <Tabs onChange={callback} tabBarGutter={20} className="scrollX">
        <TabPane tab="Upcomming Campaigns" key="1">
          <Upcomming
            upcommingData={upcommingData}
            dateChangeHandler={dateChange}
          ></Upcomming>
        </TabPane>
        <TabPane tab="Live Campaigns" key="2">
          <Live liveData={liveData} dateChangeHandler={dateChange}></Live>
        </TabPane>
        <TabPane tab="Past Campaigns" key="3">
          <Past pastData={pastData} dateChangeHandler={dateChange}></Past>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default TabSlider;
