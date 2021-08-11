import DataTable from "./components/DataTable/DataTable";
import Container from '@material-ui/core/Container';
import SetRtl from "./components/SetRtl";
import { DataProvider } from "./store/GlobalState";

function App() {
  return (
    // <DataProvider>
      <SetRtl>
        <DataProvider>
        <Container maxWidth="lg">
          <DataTable />
        </Container>
        </DataProvider>
      </SetRtl>
      
    // </DataProvider>
  );
}

export default App;
