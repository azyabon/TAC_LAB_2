import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {AlternativesProps, IntegralProps} from "../../utils/propsTypes";
import reverse2DArray from "../../utils/reverse2DArray";

const IntegralIndicatorsTable: FC<IntegralProps> = ({criteria, alternativesVectors, criteriaVector, alternativesCount}) => {

    const tableHead = criteria.map(elem => <td>{elem}</td>)

    const [alternativesWeightTable, setAlternativesWeightTable] = useState<number[][]>([])

    useEffect(() => {
        const array = [...alternativesVectors]
        alternativesVectors.forEach((elem, indexY) => {

            if (elem.length > 0) {
                const sum = elem.reduce((accumulator, currentValue) => accumulator + currentValue)

                elem.forEach((num, indexX) => {

                    array[indexY][indexX] = num / sum
                })
            }
        })
        if (array.length > 0) {
            setAlternativesWeightTable(reverse2DArray(array))
        }

    }, [alternativesVectors])


    const table = alternativesWeightTable.map((elem, indexTr) =>
        <tr>{[-1, ...elem].map((number, indexTd) => indexTd === 0 ? <td>{`Вариант ${indexTr + 1}`}</td> :
            <td>{number}</td>)}
        </tr>)
    const marks = alternativesWeightTable.map((elem, indexTr) => {
        let sum = 0
        elem.forEach((num: number, index: number) => {
            sum = sum + (num * criteriaVector[index])
        })
        return <td>{sum}</td>
    })
    const marksHead = Array(alternativesCount+1).fill(0).map((_, index) => index === 0 ? <td></td> : <td>{`Вариант ${index}`}</td> )

    return <div>
        <table border={1}>
            <tr>
                <td></td>
                {tableHead}
            </tr>
            {table}
        </table>
        <table border={1}>
            <tr>
                {marksHead}
            </tr>
            <tr>
                <td>Показатли</td>
                {marks}
            </tr>
        </table>
    </div>
}

export default IntegralIndicatorsTable