Testing ListGroup app component,
import ListGroup from "./components/ListGroup";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => { 
    console.log(item);
  }

  return (
    <div>
      <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem}/>
    </div>
  );
}

export default App;

  return (
    <div>
      <Alert>
        Hello <span>World</span>
      </Alert>
    </div>
  );

  <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
----------------------------------------------------------------------------------------------------------------------------

import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
      { alertVisible && <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>}
      <Button color="secondary" onClick={() => setAlertVisibility(true)}>My Button</Button>
    </div>
  );
}

export default App;