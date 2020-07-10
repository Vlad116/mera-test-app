import React from 'react';
import DisplayArray from "../components/DashboardPage/DisplayArray";
import DisplayObject from "../components/DashboardPage/DisplayObject";
import JsonNode from "../components/DashboardPage/JsonNode";
import css from "../components/DashboardPage/DashboardPage.module.css";

export const prepareJson = (data) => {
    if (data !== null) {
        const dataKeys = Object.keys(data);
        const dataValues = Object.values(data);
        const newArray = dataKeys.map((element, index) => {
            const { className, value, isObject, type } = checkValueForStyle(dataValues[index]);
            return <JsonNode className={className} value={value} element={element} index={index} length={dataKeys.length} isObject={isObject} valueType={type} />
        });
        return newArray;
    }
}

const checkValueForStyle = (value) => {
    switch (typeof (value)) {
        case 'string':
            return { className: css.string, value: "\"" + value + "\"", isObject: false, type: "string" };
        case 'number':
            return { className: css.number, value, isObject: false, type: "number" }
        case 'boolean':
            return { className: css.boolean, value, isObject: false, type: "boolean" }
        default:
            if (Array.isArray(value)) {
                return { className: css.array, value: (value.length === 0 ? "[]" : <DisplayArray data={value} />), isObject: true, type: "array" }
            }
            if (value === null) return { className: css.null, value: "" + null, isObject: false, type: "null" }
            return { className: css.object, value: (Object.keys(value).length === 0 ? "{}" : <DisplayObject data={value} />), isObject: true, type: "object" }
    }
}