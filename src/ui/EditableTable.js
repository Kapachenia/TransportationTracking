import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Popconfirm, Form, Typography, Button} from 'antd';
import {StartSelect} from "./StartSelect";
import {EndSelect} from "./EndSelect";
import {useDispatch, useSelector} from "react-redux";
import {setEditingKeyRow, setEndPath, setStartPath} from "../bll/createRoute";
import useWindowDimensions from "../hooks/useWindowDimensions/useWindowDimensions";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'start' ? <StartSelect/> : <EndSelect/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const EditableTable = (props) => {

    let originData = useSelector(state => state.createRoute.route)

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState(0);
    const [rowIndex, setRowIndex] = useState()
    const dispatch = useDispatch()
    const isEditing = (record) => record.key === editingKey;
    const {width} = useWindowDimensions();
    const widthL = (width / 2) / width * 100
    const result = props.position / width * 100
    let setWidthL
    result === 0 ? setWidthL = 0 : setWidthL = 50 - result

    const edit = (record) => {
        form.setFieldsValue({
            key: 'key',
            start: '',
            end: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey(0);
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...originData];
            const index = newData.findIndex((item) => key === item.key);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setEditingKey(0);
            } else {
                newData.push(row);
                setEditingKey(0);
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: '№',
            dataIndex: 'key',
        },
        {
            title: 'Начало маршрута',
            dataIndex: 'start',
            width: '35%',
            editable: true,
        },
        {
            title: 'Пункт назначения',
            dataIndex: 'end',
            width: '35%',
            editable: true,
        },
        {
            title: 'Редактировать',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => {
                    return save(record.key)
                }}
                style={{
                    marginRight: 8,
                }}
            >
              Сохранить
            </Typography.Link>
            <Popconfirm title="Уверены, что хотите отменить изменения?" onConfirm={cancel}>
              <a>Отменить</a>
            </Popconfirm>
          </span>
                ) : (
                    <Button disabled={editingKey !== 0} size={'small'} onClick={() => edit(record)}>
                        Изменить
                    </Button>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'start' ? 'start' : 'end',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div className={'wrapperTable'} style={{width: `${widthL - setWidthL}%`}}>

            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={originData}
                    columns={mergedColumns}
                    pagination={{
                        onChange: cancel,
                    }}
                    rowClassName={(record, index) => {
                        return index === rowIndex ? 'selectRow' : ''
                    }}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                dispatch(setEditingKeyRow(rowIndex + 1))
                                dispatch(setStartPath(record.start))
                                dispatch(setEndPath(record.end))
                                setRowIndex(rowIndex)
                            }
                        }
                    }}
                />
            </Form>
        </div>
    )
}