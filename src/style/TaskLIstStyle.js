import styled from "styled-components";

export const Wrapper = styled.div`
.task-maincontainer{
    display: flex;
    align-items:center;
    justify-content: space-between;
    // background:grey;
    // padding:20px;
    border-radius:20px;
}
.table-style{
 padding:20px;
//  border:1px solid gray;
 border-radius:20px;
}
.btn-edit{
    margin-left:10px;
}
.pending-task{
   color: red
}
.completed-task{
    color:green;
}
.filter-container{
    display:flex;
    align-items:center;
    justify-content:center;
}
.empty-div{
  text-align:center;
  font-size:16px;
  font-weight:bold;
  margin-top:10px;
}
`;


