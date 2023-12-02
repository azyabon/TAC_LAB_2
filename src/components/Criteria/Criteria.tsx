import {FC, useEffect} from "react";
import {CriteriaProps} from "../../utils/propsTypes";
import styles from "./Criteria.module.css"
import {useRef} from "react";

const Criteria: FC<CriteriaProps> = ({criteria, setCriteria}) => {
    const criteriaElems = criteria.map((elem, index) => <span key={index} className={styles.criterion}>
        {elem} <span className={styles.deleteCriterion} onClick={() => onClickDelete(index)}>✖</span>
    </span>)
    const input = useRef<HTMLInputElement>(null)

    const onClickAdd = () => {
        const criterion = input.current?.value
        if (criterion) {
            setCriteria(prevState => [...prevState, criterion])
        }
    }

    const onClickDelete = (index: number) => {
        setCriteria(prevState => prevState.filter((elem, i) => i !== index))
    }

    return <div>
        <div className={styles.criteria}>
            {criteriaElems}
        </div>
        <div>
            <input ref={input} type={"text"}/>
            <button onClick={onClickAdd}>Добавить</button>
        </div>
    </div>
}

export default Criteria