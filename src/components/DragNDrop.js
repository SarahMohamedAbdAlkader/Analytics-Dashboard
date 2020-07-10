import React, {useState, useRef, useEffect} from 'react'
import { getByRole } from '@testing-library/react';
import AddChart from './charts/Charts'
import SecondChart from './charts/SecondChart'
import PieChart from './charts/PieChart'
function DragNDrop({data}) {

    const [list, setList] = useState(data); 
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
        console.log("data",data)
    }, [setList, data])

    const dragItem = useRef();
    const dragItemNode = useRef();
    
    const handletDragStart = (e, item) => {
        console.log('Starting to drag', item)

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true); 
        },0)       
    }
    const handleDragEnter = (e, targetItem) => {
        console.log('Entering a drag target', targetItem)
        if (dragItemNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                console.log("newList",newList)
          newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI,1)[0])
                dragItem.current = targetItem;
                localStorage.setItem('List', JSON.stringify(newList));
                return newList
            })
        }
    }
    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }
    const getStyles = (item) => {
  
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "dnd-item current"
        }
    
        
        return "dnd-item"
    }

    if (list) {
        return (        
            
                   
            <div className="drag-n-drop">
            {list.map((grp, grpI) => (console.log(grp.style),
              <div key={grp.title} onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grpI, itemI: 0}):null} className='dnd-group'style = {{width: grp.width}}>
                {grp.items.map((item, itemI) => (
                  <div draggable key={item}  onDragStart={(e) => handletDragStart(e, {grpI, itemI})} onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, itemI})}:null} className={dragging?getStyles({grpI, itemI}):"dnd-item"} >
                    <span draggable  style={{width:"100%",height:"300px",textAlign:"center",justifyContent:"center"}}> { item=='1' ? <AddChart /> : item=='2'?<PieChart/>:   <i className="fa fa-plus"></i>  } 
          
                    </span>
                  </div>
                ))}
              </div>
            ))}
            </div>
        )
    } else { return null}

}

export default DragNDrop;