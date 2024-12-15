import css from './card.module.scss';
import {useParams, useNavigate} from 'react-router-dom'
import {Button} from "../../shared/buttons/button/button";
import {IconDelete} from "../../shared/icons/icon-delete";
import {useTasks} from "../../../hooks/task/use-task";
import {useEffect, useState} from "react";

export const Card = () => {
    const navigate = useNavigate();
    const {getTaskById, updateTask} = useTasks();
    const {cardId} = useParams();
    const [task, setTask] = useState();

    useEffect(() => {
        if (cardId) {
            setTask(getTaskById(cardId))
        }
    }, [cardId, getTaskById])

    const navigateBack = () => navigate(-1);

    return (
        <div className={css.card}>
            {task &&
            <div  className={css.body}>
                <h3>TASK</h3>
                <textarea className={css.name}
                          value={task.name}
                          onChange={(e) =>
                              setTask({
                                  ...task,
                                  name: e.target.value
                              })}
                />
                <h3>DESCRIPTION</h3>
                <textarea className={css.description}
                          onChange={(e) =>
                              setTask({
                                  ...task,
                                  description: e.target.value
                              })}
                          value={task.description}

                />
            </div>
            }
            <Button className={css.button_close} onClick={navigateBack}>
                <IconDelete/>
            </Button>
            <div className={css.footer}>
                <button className={css.btn_save} onClick={() => {
                    updateTask(task);
                    navigateBack();
                }}>Save</button>
            </div>
        </div>
    )
}