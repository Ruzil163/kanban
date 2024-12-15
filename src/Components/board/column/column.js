import css from './column.module.scss';
import { Task } from "./task/task";
import Scrollbars from 'react-custom-scrollbars-2';
import { useTasks } from "../../../hooks/task/use-task";
import { useLayout } from "../../../hooks/layout/use-layout";
import { useState } from 'react';

export const Column = (props) => {

    const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
    const [inputCardName, setInputCardName] = useState();

    const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(undefined);

    const {mainContentHeight} = useLayout();
    const {getTasksByState, getTasksByExcludedState, addNewTask, moveTask, removeTask } = useTasks();

    const tasks = getTasksByState(props.state);
    const hasTasks = tasks.length > 0;

    const onInputCard = (e) => {
        setInputCardName(e.target.value);
    }


    return (
       <div className={css.column}>
            <div className={css.header}>{props.name}</div>
                <div className={css.wrapper}>
                    <div className={css.body}>
                        {hasTasks &&
                        <Scrollbars autoHeightMax = {mainContentHeight} autoHide autoHeight>
                            {
                            tasks.map((task) => 
                                <Task key={task.id} id={task.id} name={task.name} onRemove={(id) => {
                                    removeTask(id);
                        }
                        } />)
                            } 
                        </Scrollbars>
                        }

                        {isNewTaskInputShown &&
                        <div>
                            <input className={css.inp_task} placeholder='please enter a task' onInput={onInputCard} />
                        </div>
                        }

                        {isNewTaskSelectShown && <select className={css.sel_task} onChange= {
                            (e) => setSelectedTaskId(e.target.value)}>
                            <option>Select Task</option>
                            {getTasksByExcludedState(props.state).map((task) =>
                        <option key={task.id} value={task.id}>{task.name}</option>
                        )}
                        </select>}
                    </div>
                    <div className={css.footer}>
                    {(!isNewTaskInputShown && !isNewTaskSelectShown) &&
                    <button className={css.btn_card} onClick={() => props.state === 'backlog'
                         ? setIsNewTaskInputShown(true)
                         : setIsNewTaskSelectShown(true)  
                    }
                    >+Add card</button>}

                    {(isNewTaskInputShown || isNewTaskSelectShown) &&
                    <button className={css.btn_sub} onClick={() => {
                        if (props.state === 'backlog') {
                            setIsNewTaskInputShown(false);
                            if(inputCardName !== "" && inputCardName !== undefined){
                            addNewTask(inputCardName)
                        };
                            setInputCardName(undefined);
                        } else {
                            setIsNewTaskSelectShown(false);
                            moveTask(selectedTaskId, props.state);
                        }
                    }}
                    >Submit</button>
                    }
                </div>
            </div>
        </div> 
    )
}