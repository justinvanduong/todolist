import * as React from 'react';
import AddForm from '../src/AddForm';
import List from '../src/List';
import ListArchive from '../src/ListArchive'

function App() {
  const [list, setList] = React.useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  localStorage.setItem("list", JSON.stringify(list));

  const [archivedList, setArchivedList] = React.useState(
    JSON.parse(localStorage.getItem("archivedList")) || []
  );
  localStorage.setItem("archivedList", JSON.stringify(archivedList));

  const nextId = React.useRef(
    parseInt(localStorage.getItem("nextId")) || 0
  );
  localStorage.setItem("nextId", nextId.current);

  return (
    <div>
      <AddForm list={list} setList={setList} nextId={nextId} />
      <List
        list={list}
        nextId={nextId}
        archivedList={archivedList}
        archived={false}
        setList={setList}
        setArchivedList={setArchivedList} />
      <ListArchive
        list={list}
        archivedList={archivedList}
        archived={true}
        setList={setList}
        setArchivedList={setArchivedList} />
    </div>
  )
}

export default App
