import Layout from "./hoc/Layout/Layout.js";
import TabSlider from "./components/TabSlider/TabSlider.js";
function App() {


  return (
    <div>
      <Layout>
        <h1 className="offset-1 col-10">Manage Campaigns</h1> 
        <TabSlider></TabSlider>
      </Layout>
    </div>
  );
}

export default App;
