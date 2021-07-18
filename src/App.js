import Layout from "./hoc/Layout/Layout.js";
import { useState, React, useEffect } from "react";

import TabSlider from "./components/TabSlider/TabSlider.js";
function App() {
  let [selectValue, setSelectValue]= useState('en')
  let [languageData, setLanguageData] = useState([]);

  function handleChange(e){
    setSelectValue(e.target.value)
    getData();
  }

  const getData = () => {
    fetch("Localization/locale-"+selectValue+".json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setLanguageData(res);
      });
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <label htmlFor="language">Choose a language:</label>
      <select id="language" name="language" onChange={handleChange} value={selectValue}>
        <option value="en" >English</option>
        <option value="gn">German</option>
      </select>
      <Layout>
        {Object.keys(languageData).length > 0 && (
          <h1 className="offset-1 col-10">
            {languageData.manageCampaigns.value}
          </h1>
        )}
        {Object.keys(languageData).length > 0 && <TabSlider languageData={languageData}></TabSlider>}
      </Layout>
    </div>
  );
}

export default App;
