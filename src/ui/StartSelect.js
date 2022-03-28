import React from "react";
import {Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setStartPoint} from "../bll/createRoute";

const {Option} = Select;

export const StartSelect = () => {

    const dispatch = useDispatch()
    const routs = useSelector(state => state.createRoute.routs)
    const route = useSelector(state => state.createRoute.route)
    const editingKey = useSelector(state => state.createRoute.editingKey)

    function handleChange(value) {
        dispatch(setStartPoint(value.label, value.key))
    }

    return (
        <Select
            labelInValue
            defaultValue={{value: route[editingKey - 1].start}}
            style={{width: 150}}
            onChange={handleChange}
        >
            {routs.map(m => <Option key={m.id} value={m.name}>{m.name}</Option>)}
        </Select>
    )
}