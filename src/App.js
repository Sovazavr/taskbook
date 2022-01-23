import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable';
import './App.css';


function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items]);


  const newItem = () => {
    if (item.trim() !== '') {
      const newTask = {
        id: uuidv4(),
        item,
        timeAdd:  new Date().getFullYear()+" "+new Date().getDate()+" "+new Date().toLocaleDateString('default', { month: 'short', weekday: 'short',}) +" "+ new Date().getHours().toLocaleString()+":"+ new Date().getMinutes().toLocaleString(),
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPosition: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newTask])
      setItem('')
    } else {
      alert('Заполни инпут мразь')
      setItem('')
    }
  }

  const deleteTask = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updatePosition=(data,index)=>{
    let newArrayItems=[...items]
    newArrayItems[index].defaultPosition={x:data.x, y:data.y}
    setItems(newArrayItems)
  }

  const pressEnter=(e)=>{
    const keyCode= e.keyCode || e.which
    if(keyCode===13) {
      newItem()
    }
  }

  return (
    <div className="App">
       <div className='wrapper'>
        <input value={item} className='inputtask' type='text'
          placeholder='Enter'
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e)=>pressEnter(e)}></input>
        <button className='enter' onClick={newItem}>Enter</button>
      </div>
      {items.map((item, index) => {
        return (
          <Draggable key={index} defaultPosition={item.defaultPosition} onStop={(_, data)=>{updatePosition(data, index)}}>
            <div className='todo' style={{ backgroundColor: item.color }}>
              {`${item.item}`}
              <div className='timeAdd'>добавлено: {`${item.timeAdd}`}</div>
              <button className='delete' onClick={() => deleteTask(item.id)}>x</button>
            </div>

          </Draggable>
        )
      })} 
      
    </div>
  );
}

export default App;
