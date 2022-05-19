import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import swal from "sweetalert2";
// import $ from "jquery";

const item = {
  id: v4(),
  name: "Buy medicines",
  
  
}

const item2 = {
  id: v4(),
  name: "Go to the dentist",
}
const item3 = {
  id: v4(),
  name: "complete work report"
}

const item4 = {
  id: v4(),
  name: "Book the table"
}
function App() {
  
 
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item,item2],
    },
    "in-progress": {
      title: "In Progress",
      items: [ item3]
    },
    "done": {
      title: "Done",
      items: [item4]
    }
  })

 const handleDragEnd = ({destination,source}) => {
  console.log("from" ,source);
  console.log("to" ,destination);

  if(!destination){
     console.log('not dropped');
     return
   }
   if(destination.index === source.index && destination.droppableId === source.droppableId){
    console.log('dropped');
    return
   }
   const itemCopy = state[source.droppableId].items[source.index];
   setState(prev =>{
     prev = {...prev}
     prev[source.droppableId].items.splice(source.index,1)
     prev[destination.droppableId].items.splice(destination.index,0,itemCopy)

     return prev
   })
 }

  
  function addItem (){
    swal.fire({
      title: "enter yor task",
      input: 'textarea',
    }).then(function(e){
      
      setState(prev => {
        return{
          ...prev,
          todo: {
            title: 'title',
            items : [
              {
                id: v4(),
                name: e.value,
              },
              ...prev.todo.items
            ]
          }
        }
      })
     
    })
    
  }
  const deleteItem = (id) => {
    setState(state.filter((x) => x.id !== id));
  };

  return (
    <div className="App">
      <div>
        
        <button className='button' onClick={addItem}>New Task</button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd} >
        {_.map(state, (data, key) => {
          return(
            
            <div key={key} className={"column"}>
              
              <h3 className={'hedding'}>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      
                      
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided) => {
                              
                              return(
                                
                                <div
                                  className={'item'}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  
                                  {el.name}
                                  
                                  {/* <button className='delete' onClick={()=>deleteItem(el.id)}>x</button> */}
                                  
                                </div>
                              )
                            }}
                            
                          </Draggable>
                        )
                      })}
                      
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
