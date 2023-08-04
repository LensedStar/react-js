import "./todoStyle.css"
import { useRef, useEffect} from "react"
import {
    addTask,
    deleteTask,
    toggleComplete,
    fetchTodo,
    updateList
} from '../../Store/Slices/todoSlice'
import { useDispatch, useSelector} from "react-redux"
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd'


export default function Todo () {
    
    const inputValue = useRef('')
    const store = useSelector(state=> state.todo.todo)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchTodo())
    },[dispatch])

  
    const tasks = store.map((task,id) => 
        <Draggable key = {task.id} draggableId = {`${task.id}`} index={id}>
            {(provided)=>{
               return( 
            <span ria-label="task"  className={task.completed ? "task-complete":"task"} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                <input type="checkbox" checked={task.completed ? true : false} onChange={()=>dispatch(toggleComplete(task.id))}></input>
                <p> { task.title } </p>
                <p className="closeTask" onClick={()=> dispatch(deleteTask(task.id))}> ✖ </p>
            </span>
            )}}
        </Draggable>)

        
        const handleClick = task =>{
            task.length === 0 ? alert('You need to enter task!') : dispatch(addTask({
                title:task,
                id: Date.now(),
                completed:false    
            }))
            inputValue.current.value = ""
        }
        
        function handleEnd(result){
            if(!result.destination){
                return
            }
            
            const newStore = [...store]
            let [element] = newStore.splice(result.source.index ,1)
            newStore.splice(result.destination.index,0,element)
            dispatch(updateList(newStore))
        }
    
    return(
        <div className="gradient">
        <DragDropContext onDragEnd={handleEnd}>
            <div className="todo-block">
                <div className="todo-input-block">
                    <input type="text" placeholder="Enter your task" className="todo-input" ref={ inputValue }></input>
                    <button className="add-task-button" onClick={()=> handleClick(inputValue.current.value)}>ADD</button>
                </div>
                    <Droppable droppableId="dnd-Todos">
                        {(provided,snapshot) => ( 
                            <div style={{backgroundColor: snapshot.isDraggingOver ? "" : ""}} className="task-field" {...provided.droppableProps} ref={provided.innerRef}>
                                { tasks }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
            </div>
        </DragDropContext>
        </div>
    )
}