import styled from "styled-components";
import KanbanNav from "./KanbanNav";
import KanbanBoard from "./KanbanBoard";

const Kanban = () => {
  return (
    <Container>
      <KanbanNav />
      <KanbanBoard />
    </Container>
  );
};

export default Kanban;

const Container = styled.div`
  margin: 0;
  background-color: grey;
  width: 100%;
  height: 100vh;
`;
