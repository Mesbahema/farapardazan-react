import DataTable from "./components/DataTable/DataTable";
import Container from '@material-ui/core/Container';
import SetRtl from "./components/SetRtl";

function App() {
  return (
    <SetRtl>
      <Container maxWidth="lg">
        <DataTable />
      </Container>
    </SetRtl>
  );
}

export default App;
